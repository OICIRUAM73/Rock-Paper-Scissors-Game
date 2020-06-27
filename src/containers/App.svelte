<script>
  import { onMount } from 'svelte';
  import { blur } from 'svelte/transition';
  import { showModal } from '../store/store.js';
  import Header from '../components/Header.svelte';
  import Main from '../components/Main.svelte';
  import Game from '../components/Game.svelte';
  import Rules from '../components/Rules.svelte';
  import GameRules from '../components/GameRules.svelte';
  import Modal from '../components/Modal.svelte';
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600;700&display=swap');

  :global(html) {
    height: 100%;
  }

  :global(body) {
    background-image: radial-gradient(circle at center top, rgb(31, 55, 87) 20%, rgb(19, 21, 55) 100%);
    height: 100%;
    color: white;
    font-family: 'Barlow Semi Condensed', sans-serif;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  :global(h1, h2, h3) {
    margin: 0;
    padding: 0;
  }
</style>

{#if $showModal}
  <div transition:blur={{duration:90}}>
    <Modal>
      <GameRules />
    </Modal>
  </div>
{/if}
<Header></Header>
<Main>
  <Game/>
  <Rules/>
</Main>