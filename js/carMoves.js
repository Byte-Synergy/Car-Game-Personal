function carMoveToTop(element1, element2) {
  function animate() {
    const newY = element1.coords.y - 5;
    if (newY < 0) {
      element1.moves.top = null;
      return;
    }
    element1.coords.y = newY;
    carMove(element1.coords.x, newY, element2);
    element1.moves.top = requestAnimationFrame(animate);
  }
  return animate;
}

function carMoveToBottom(element1, element2, element3) {
  function animate() {
    const newY = element1.coords.y + 5;

    if (newY + element1.height > element2.height) {
      element1.moves.bottom = null;
      return;
    }
    element1.coords.y = newY;
    carMove(element1.coords.x, newY, element3);
    element1.moves.bottom = requestAnimationFrame(animate);
  }
  return animate;
}

function carMoveToLeft(element1, element2, element3) {
  function animate() {
    const newX = element1.coords.x - 5;
    if (newX < -element2.width + element1.width) {
      element1.moves.left = null;
      return;
    }
    element1.coords.x = newX;
    carMove(newX, element1.coords.y, element3);
    element1.moves.left = requestAnimationFrame(animate);
  }
  return animate;
}

function carMoveToRight(element1, element2, element3) {
  function animate() {
    const newX = element1.coords.x + 5;

    if (newX > element2.width - element1.width) {
      element1.moves.right = null;
      return;
    }
    element1.coords.x = newX;
    carMove(newX, element1.coords.y, element3);
    element1.moves.right = requestAnimationFrame(animate);
  }
  return animate;
}

function carMove(x, y, element) {
  element.style.transform = `translate(${x}px, ${y}px)`;
}
