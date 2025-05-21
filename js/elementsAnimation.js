
  function elementsAnimation(element, elInfo, speed, roadInfo, elInitialY) {
    let newY = elInfo.coords.y + speed;
    let newX = elInfo.coords.x;

    if (newY > window.innerHeight) {
      newY = elInitialY;

      const direction = parseInt(Math.random() * 2);
      const maxXcoord = roadInfo.width + 1 - elInfo.width;
      const randomXCoord = parseInt(Math.random() * maxXcoord);

      if (!elInfo.ignoreAppearance) {
        element.style.display = "initial";
        elInfo.visible = true;
      }
      newX = direction === 0 ? -randomXCoord : randomXCoord;
    }
    elInfo.coords.y = newY;
    elInfo.coords.x = newX;
    element.style.transform = `translate(${newX}px, ${newY}px)`;
  }