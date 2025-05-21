(function () {
  let isPause = false;
  let animationId = null;
  let speed = 4;
  let gameScore = 0;

  const score = document.querySelector(".game-score");
  const backdrop = document.querySelector(".backdrop");
  const gameBtn = document.querySelector(".gameBtn");

  const car = document.querySelector(".car");
  const carInfo = {
    ...elInfo(car),
    moves: {
      top: null,
      bottom: null,
      left: null,
      right: null,
    },
  };
  const coin = document.querySelector(".coin");
  const coinInfo = elInfo(coin);

  const arrow = document.querySelector(".arrow");
  const arrowInfo = elInfo(arrow);

  const danger = document.querySelector(".danger");
  const dangerInfo = elInfo(danger);

  const road = document.querySelector(".road");
  const roadInfo = elInfo(road);

 
  document.addEventListener("keydown", (event) => {
    if (isPause) {
      return;
    }
    const code = event.code;

    if (code === "ArrowUp" || (code === "KeyW" && carInfo.moves.top === null)) {
      if (carInfo.moves.bottom) {
        return;
      }
      carInfo.moves.top = requestAnimationFrame(carMoveToTop(carInfo, car));
    } else if (
      code === "ArrowDown" ||
      (code === "KeyS" && carInfo.moves.bottom === null)
    ) {
      if (carInfo.moves.top) {
        return;
      }
      carInfo.moves.bottom = requestAnimationFrame(carMoveToBottom(carInfo, roadInfo, car));
    } else if (
      code === "ArrowLeft" ||
      (code === "KeyA" && carInfo.moves.left === null)
    ) {
      if (carInfo.moves.right) {
        return;
      }
      carInfo.moves.left = requestAnimationFrame(carMoveToLeft(carInfo, roadInfo, car));
    } else if (
      code === "ArrowRight" ||
      (code === "KeyD" && carInfo.moves.right === null)
    ) {
      if (carInfo.moves.left) {
        return;
      }
      carInfo.moves.right = requestAnimationFrame(carMoveToRight(carInfo, roadInfo, car));
    }
  });

  document.addEventListener("keyup", (event) => {
    const code = event.code;
    if (code === "ArrowUp" || code === "KeyW") {
      cancelAnimationFrame(carInfo.moves.top);
      carInfo.moves.top = null;
    } else if (code === "ArrowDown" || code === "KeyS") {
      cancelAnimationFrame(carInfo.moves.bottom);
      carInfo.moves.bottom = null;
    } else if (code === "ArrowLeft" || code === "KeyA") {
      cancelAnimationFrame(carInfo.moves.left);
      carInfo.moves.left = null;
    } else if (code === "ArrowRight" || code === "KeyD") {
      cancelAnimationFrame(carInfo.moves.right);
      carInfo.moves.right = null;
    }
  });

  animationId = requestAnimationFrame(startGame);

  function startGame() {
    elementsAnimation(danger, dangerInfo, speed, roadInfo, -600);
    if (dangerInfo.visible && hasCollision(carInfo, dangerInfo)) {
      return finishGame();
    }

    treeAnimation(speed);

    elementsAnimation(coin, coinInfo, speed, roadInfo, -100);
    if (coinInfo.visible && hasCollision(carInfo, coinInfo)) {
      gameScore++;
      score.innerHTML = gameScore;
      coin.style.display = "none";
      coinInfo.visible = false;

      if (gameScore % 3 === 0) {
        speed += 2;
      }
    }

    elementsAnimation(arrow, arrowInfo, speed, roadInfo, -350);
    if (arrowInfo.visible && hasCollision(carInfo, arrowInfo)) {
      arrowInfo.visible = false;
      arrow.style.display = "none";
      danger.style.opacity = 0.2;
      dangerInfo.visible = false;

      arrowInfo.ignoreAppearance = true;
      dangerInfo.ignoreAppearance = true;

      speed += 10;

      setTimeout(() => {
        danger.style.opacity = 1;
        speed -= 10;
        setTimeout(() => {
          dangerInfo.visible = true;
          dangerInfo.ignoreAppearance = false;
          arrowInfo.ignoreAppearance = false;
        }, 500);
      }, 1000);
    }

    animationId = requestAnimationFrame(startGame);
  }
 

  function cancelAnimations() {
    cancelAnimationFrame(animationId);
    cancelAnimationFrame(carInfo.moves.top);
    cancelAnimationFrame(carInfo.moves.bottom);
    cancelAnimationFrame(carInfo.moves.left);
    cancelAnimationFrame(carInfo.moves.right);
  }

  function finishGame() {
    cancelAnimations();
    backdrop.style.display = "flex";
    const finishScore = backdrop.querySelector(".finishScore");
    finishScore.innerText = gameScore;
    score.style.display = "none";
    gameBtn.style.display = "none";
  }

  gameBtn.addEventListener("click", () => {
    isPause = !isPause;

    if (isPause) {
      cancelAnimations();
      gameBtn.children[0].style.display = "none";
      gameBtn.children[1].style.display = "initial";
    } else {
      animationId = requestAnimationFrame(startGame);
      gameBtn.children[1].style.display = "none";
      gameBtn.children[0].style.display = "initial";
    }
  });

})();
