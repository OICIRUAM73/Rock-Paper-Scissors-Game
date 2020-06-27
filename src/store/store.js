import { writable } from "svelte/store";

const expirationDuration = 1000 * 60 * 60;
export const scoreCount = writable(getScore());
scoreCount.subscribe(val => localStorage.setItem("scoreCount", val));
export const showModal = writable(false);

const initPicked = {}
export const userPicked = writable(initPicked);

export function initUserPicked() {
  userPicked.update(current => {
    return {};
  });
}

function getScore() {

  const prevAccepted = localStorage.getItem("count_accepted");
  const currentTime = new Date().getTime();

  const notAccepted = prevAccepted == undefined;
  const prevAcceptedExpired = prevAccepted != undefined && currentTime - prevAccepted > expirationDuration;
  if (notAccepted || prevAcceptedExpired) {
    localStorage.setItem("count_accepted", currentTime);
    return 0;
  } else {
    return parseInt(localStorage.getItem("scoreCount")) || 0;
  }
}
