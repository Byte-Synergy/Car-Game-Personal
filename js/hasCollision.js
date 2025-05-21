function hasCollision(element1Info, element2Info) {
  const carYTop = element1Info.coords.y;
  const carYBottom = element1Info.coords.y + element1Info.height;

  const carXLeft = element1Info.coords.x - element1Info.width;
  const carXRight = element1Info.coords.x + element1Info.width;

  const elYTop = element2Info.coords.y;
  const elYBottom = element2Info.coords.y + element2Info.height;

  const elXLeft = element2Info.coords.x - element2Info.width;
  const elXRight = element2Info.coords.x + element2Info.width;

  if (carYTop > elYBottom || carYBottom < elYTop) {
    return false;
  }

  if (carXLeft > elXRight || carXRight < elXLeft) {
    return false;
  }

  return true;
}
