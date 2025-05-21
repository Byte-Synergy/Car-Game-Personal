function getCoordinations(element) {
  const matrix = window.getComputedStyle(element).transform;
  if (matrix === "none") {
    return { x: 0, y: 0 };
  }
  const matrixSplitter = matrix.split(",");
  const y = matrixSplitter[matrixSplitter.length - 1];
  const x = matrixSplitter[matrixSplitter.length - 2];
  return {
    x: parseFloat(x),
    y: parseFloat(y),
  };
}
