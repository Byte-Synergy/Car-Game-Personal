function elInfo(element) {
  return {
    width: element.clientWidth / 2,
    height: element.clientHeight,
    coords: getCoordinations(element),
    visible: true,
    ignoreAppearance: false,
  };
}
