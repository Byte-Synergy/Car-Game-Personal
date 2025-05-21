 const trees = document.querySelectorAll(".tree");
  const treesCoords = [];

  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const coordsTree = getCoordinations(tree);
    treesCoords.push(coordsTree);
  }

    function treeAnimation(element) {
    for (let i = 0; i < trees.length; i++) {
      const tree = trees[i];
      const coords = treesCoords[i];
      let newCoordY = coords.y + element;

      if (newCoordY > window.innerHeight) {
        newCoordY = -370;
      }

      treesCoords[i].y = newCoordY;
      tree.style.transform = `translate(${coords.x}px, ${newCoordY}px)`;
    }
  }