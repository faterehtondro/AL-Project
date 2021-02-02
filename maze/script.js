
 class Maze {

  constructor(mainMap, startPoint, endPoint) {
    this.fenceAroundMap(mainMap);
    this.mainMap = mainMap;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.minF=Infinity
  }
  start = () => {
    if (
      this.heuristicAlgorithm(
        this.startPoint.i,
        this.startPoint.j,
        0,
        this.mainMap,
        []
      )
    ) {
      return this.finalPath;
    }
    return [];
  };
  getNextSteps = (inputMap, point) => {
    let points = [];

    //check top
    if (inputMap[point.i - 1][point.j] === 0) {
      points.push({ i: point.i - 2, j: point.j });
    }
    //check right
    if (inputMap[point.i][point.j + 1] === 0) {
      points.push({ i: point.i, j: point.j + 2 });
    }
    //check bottom
    if (inputMap[point.i + 1][point.j] === 0) {
      points.push({ i: point.i + 2, j: point.j });
    }
    //check left
    if (inputMap[point.i][point.j - 1] === 0) {
      points.push({ i: point.i, j: point.j - 2 });
    }
    return points;
  };
  blockBox = (inputMap, point) => {
    inputMap = _.cloneDeep(inputMap);
    inputMap[point.i - 1][point.j] = 1;
    inputMap[point.i][point.j + 1] = 1;
    inputMap[point.i + 1][point.j] = 1;
    inputMap[point.i][point.j - 1] = 1;
    return inputMap;
  };
  heuristicAlgorithm = (
    i,
    j,
    Gn,
    inputMap,
    pathTaken
  ) => {
    if (this.endPoint.i === i && this.endPoint.j === j) {
      pathTaken.push({ ...this.endPoint });
      this.finalPath = _.cloneDeep(pathTaken);
      return true;
    } else {
      inputMap = _.cloneDeep(inputMap);
      let nextBoxes = this.getNextSteps(inputMap, { i, j });
      if (nextBoxes.length === 0) {
        return false;
      }

      let boxesForTrace = nextBoxes.map((item) => ({
        Fn:
          Math.abs(
            (this.endPoint.i - item.i) / 2 +
              Math.abs(this.endPoint.j - item.j) / 2
          ) + Gn,
        point: item,
      }));

      boxesForTrace = boxesForTrace.sort((a, b) => a.Fn - b.Fn);
      let mapWithBlockBoxes = this.blockBox(inputMap, { i, j });
      pathTaken.push({ i, j });
      for (let box of boxesForTrace) {
        let algorithmOutput = this.heuristicAlgorithm(
          box.point.i,
          box.point.j,
          Gn + 1,
          mapWithBlockBoxes,
          _.cloneDeep(pathTaken)
        );
        if (algorithmOutput) {
          return true;
        }
      }
      return false;
    }
  };
  fenceAroundMap = (inputMap) => {
    for (let i = 0; i < inputMap.length; i++) {
      for (let j = 0; j < inputMap[i].length; j++) {
        if (i === 0 || i === inputMap.length - 1) {
          inputMap[i][j] = 1;
        }
        if (j === 0 || j === inputMap[i].length - 1) {
          inputMap[i][j] = 1;
        }
      }
    }
  };
}
