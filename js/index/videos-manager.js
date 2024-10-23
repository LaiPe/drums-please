const videoTop = document.querySelector("#accueil video");
const videoBot = document.querySelector("#rappel-inscription video");
videos = [videoTop, videoBot];

videos.forEach((video) => {
  video.addEventListener("canplaythrough", () => {
    video.canPlayThrough = true;
    if (video === videoTop) {
      /*video.fastSeek(0);*/
      video.play();
    }
  });
});

window.addEventListener("scroll", () => {
  const positionVideoTop = videoTop.getBoundingClientRect();
  const positionVideoBot = videoBot.getBoundingClientRect();

  if (positionVideoTop.bottom <= 105) {
    videoTop.pause();
  } else if (videoTop.canPlayThrough) {
    videoTop.play();
  }

  if (positionVideoBot.top >= window.innerHeight - 105) {
    videoBot.pause();
  } else if (videoBot.canPlayThrough) {
    videoBot.play();
  }

  console.log(
    `videoTop : ${videoTop.paused ? "Pause" : "Play"} ; videoBot : ${
      videoBot.paused ? "Pause" : "Play"
    }`
  );
});
