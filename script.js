document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.querySelector('.play-button');
  const backgroundMusic = document.getElementById('background-music');
  
  if (playButton) {
      playButton.addEventListener('click', () => {
      
          backgroundMusic.play().then(() => {
              window.location.href = 'index.html';
          }).catch(error => {
              console.error("Music play error: ", error);
              window.location.href = 'index.html';
          });
      });

      backgroundMusic.addEventListener('canplay', () => {
          console.log('Background music can play');
      });

      backgroundMusic.addEventListener('error', (error) => {
          console.error("Audio error: ", error);
      });
  }

  console.log("Rasclat");

  //https://youtu.be/s6LrpUTQQn0?si=j8NvWQy1Cd6XG_ND

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector(".results");
  let currentPlayerIndex = 202;
  const width = 15;
  const aliensRemoved = [];
  let aliensId;
  let naarRechts = true;
  let direction = 1;
  let results = 0;

  for (let i = 0; i < width * width; i++) {
      const vierkant = document.createElement("div");
      grid.appendChild(vierkant);
  }

  const vierkanten = Array.from(document.querySelectorAll(".grid div"));

  console.log(vierkanten);

  const aliens = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
      32, 33, 34, 35, 36, 37, 38, 39,
  ];

  function draw() {
      for (let i = 0; i < aliens.length; i++) {
          if (!aliensRemoved.includes(i)) {
              vierkanten[aliens[i]].classList.add("alien");
          }
      }
  }

  draw();

  vierkanten[currentPlayerIndex].classList.add("player");

  function remove() {
      for (let i = 0; i < aliens.length; i++) {
          vierkanten[aliens[i]].classList.remove("alien");
      }
  }

  function movePlayer(e) {
      vierkanten[currentPlayerIndex].classList.remove("player");
      switch (e.key) {
          case "ArrowLeft":
              if (currentPlayerIndex % width !== 0) currentPlayerIndex -= 1;
              break;

          case "ArrowRight":
              if (currentPlayerIndex % width < width - 1) currentPlayerIndex += 1;
              break;
      }
      vierkanten[currentPlayerIndex].classList.add("player");
  }

  document.addEventListener("keydown", movePlayer);

  function moveAliens() {
      const leftEdge = aliens[0] % width === 0;
      const rightEdge = aliens[aliens.length - 1] % width === width - 1;

      remove();

      if (rightEdge && naarRechts) {
          for (let i = 0; i < aliens.length; i++) {
              aliens[i] += width + 1;
              direction = -1;
              naarRechts = false;
          }
      }

      if (leftEdge && !naarRechts) {
          for (let i = 0; i < aliens.length; i++) {
              aliens[i] += width - 1;
              direction = 1;
              naarRechts = true;
          }
      }

      for (let i = 0; i < aliens.length; i++) {
          aliens[i] += direction;
      }

      draw();

      if (vierkanten[currentPlayerIndex].classList.contains("alien")) {
          resultDisplay.innerHTML = "GAME OVER!";
          clearInterval(aliensId);
      }

      if (aliensRemoved.length === aliens.length) {
          resultDisplay.innerHTML = "YOU WIN!";
          clearInterval(aliensId);
      }
  }

  aliensId = setInterval(moveAliens, 600);

  function shoot(e) {
      let laserId;
      let currentLaserIndex = currentPlayerIndex;

      function moveLaser() {
          vierkanten[currentLaserIndex].classList.remove("laser");
          currentLaserIndex -= width;
          vierkanten[currentLaserIndex].classList.add("laser");

          if (vierkanten[currentLaserIndex].classList.contains("alien")) {
              vierkanten[currentLaserIndex].classList.remove("laser");
              vierkanten[currentLaserIndex].classList.remove("alien");
              vierkanten[currentLaserIndex].classList.add("hit");

              setTimeout(
                  () => vierkanten[currentLaserIndex].classList.remove("hit"),
                  300
              );
              clearInterval(laserId);

              const alienRemoved = aliens.indexOf(currentLaserIndex);
              aliensRemoved.push(alienRemoved);
              results++;
              resultDisplay.innerHTML = results;
          }
      }

      if (e.key === " ") {
          laserId = setInterval(moveLaser, 100);
      }
  }

  document.addEventListener("keydown", shoot);
});


//https://youtu.be/s6LrpUTQQn0?si=j8NvWQy1Cd6XG_ND
