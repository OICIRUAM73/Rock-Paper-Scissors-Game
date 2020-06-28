<script>
  import tokens from '../model/tokens';
  import Token from './Token.svelte';
  import Result from './Result.svelte';
  import { userPicked, initUserPicked, scoreCount } from '../store/store.js';

  let housePicked = {};

  $: isUserTokenPicked = $userPicked.name !== undefined;

  let isHouseTokenPicked = false;
  let gameFinished = false;
  let win = false;
  let isDraw = false;
  let isChanging = false;
  function pickHouseToken() {
    isChanging = true;
    let a = 0;
    let interval = setInterval(function() {
      getRandomToken();
      a = a + 1;
      if(a == 20) {
        clearInterval(interval);
        isHouseTokenPicked = true;
        isChanging = false;
      }
    }, 200);
  }

  function getRandomToken() {
    let selected = tokens[Math.floor(Math.random() * 3)];
    housePicked = selected;
  }

  $: if(isHouseTokenPicked & isUserTokenPicked) {
    if($userPicked.name == housePicked.name) {
      isDraw = true;
    } else {
      win = $userPicked.winTo == housePicked.name
      scoreCount.update(current => win? current + 1 : (current == 0)? current : current -1);
    }
    gameFinished = true;
  }

  $: if(($userPicked.name !== undefined) && (housePicked.name == undefined)) pickHouseToken()

  function handleReset() {
    initUserPicked();
    housePicked = {};
    isHouseTokenPicked = false;
    gameFinished = false;
    win = false;
    isDraw = false;
  }
</script>
<style>
  .Tokens {
    display: grid;
    grid-template-columns: 130px 130px;
    justify-content: center;
    justify-items: center;
    position: relative;
    gap: 30px 50px;
  }

  .Tokens .line {
    position: absolute;
    background: rgb(15,31,59);
    width: 200px;
    height: 14px;
    top: 58px;
    z-index: -1;
    display: block;
  }

  .Tokens .line:before,
  .Tokens .line:after {
    content: "";
    position: absolute;
    background: rgb(15,31,59);
    height: 14px;
    left: 0;
    top: 0;
    width: 200px;
  }

  .Tokens .line:before {
    transform: rotate(60deg);
    transform-origin: left top;
  }
  .Tokens .line:after {
    transform: rotate(-60deg);
    transform-origin: right top;
  }

  @media screen and (min-width: 768px) {
    .Tokens {
      grid-template-columns: 230px 230px;
      gap: 50px 50px;
      margin: 0;
    }

    .Tokens .line {
      width: 300px;
      top: 90px;
    }

    .Tokens .line:before,
    .Tokens .line:after {
      width: 300px;
    }
  }

  @media screen and (min-width: 1024px) {
    .Tokens.picked {
      grid-template-columns: 320px 320px;
    }

    .Tokens.finished {
      grid-template-columns: 300px 110px 110px 300px;
    }

  }

</style>
<div class="Game">
  <div class="Tokens" class:picked={isUserTokenPicked} class:finished={gameFinished}>
    {#if isUserTokenPicked}
      <Token {...$userPicked} whoPicked="user" isWinner={gameFinished && win && !isDraw}/>
      <Token {...housePicked} whoPicked="house" isWinner={gameFinished && !win && !isDraw} {isChanging}/>
    {:else}
      <span class="line"></span>
      {#each tokens as item}
        <Token {...item}/>
      {/each}
    {/if}
    {#if gameFinished}
      <Result result={isDraw? "DRAW" : win ? "YOU WIN" : "YOU LOSE"} {handleReset} />
    {/if}
  </div>
</div>