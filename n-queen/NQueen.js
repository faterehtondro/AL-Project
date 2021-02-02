
 class NQueen {
   Board
   T

  constructor(Board, T) {
    this.Board = Board;
    this.T = T;
  }
  start = () => {
    this.hillClimbing();
    return this.Board;
  };
  Heuristic = (Board) => {
    let queenPositions = [];
    for (let i = 0; i < Board.length; i++) {
      for (let j = 0; j < Board[i].length; j++) {
        if (Board[i][j] === 1) {
          queenPositions.push({ i, j });
        }
      }
    }
    let tempBoxes = _.cloneDeep(Board);
    let outputH = 0;
    while (queenPositions.length > 0) {
      let target = queenPositions.pop();
      if (!target) {
        break;
      }
      tempBoxes[target.i][target.j] = 0;
      outputH += this.calculateHeuristicOfAnElement(
        _.cloneDeep(tempBoxes),
        target.i,
        target.j
      );
    }
    return outputH;
  };
  calculateHeuristicOfAnElement = (
    Board,
    i,
    j
  ) => {
    let h = 0;
    for (let k = 0; k < Board.length; k++) {
      if (Board[i][k] === 1) {
        h++;
        Board[i][k] = 0;
      }
      if (Board[k][j] === 1) {
        h++;
        Board[k][j] = 0;
      }
    }
    for (let i1 = 0; i1 < Board.length; i1++) {
      for (let j1 = 0; j1 < Board.length; j1++) {
        if (i + j === i1 + j1 && Board[i1][j1] === 1) {
          h++;
          Board[i1][j1] = 0;
        }
        if (i - j === i1 - j1 && Board[i1][j1] === 1) {
          h++;
          Board[i1][j1] = 0;
        }
      }
    }
    return h;
  };
  RandomTwo = () => {
    let n = this.Board.length;
    let i = Math.floor(Math.random() * n);
    let j = Math.floor(Math.random() * n);
    for (let k = 0; k < n; k++) {
      this.Board[k][j] = 0;
    }
    this.Board[i][j] = 1;
  };
  hillClimbing = () => {
    let H = this.Heuristic(this.Board);
    while (this.Heuristic(this.Board) !== 0) {
       
      this.RandomTwo();
      let newH = this.Heuristic(this.Board);
      var p = Math.pow( Math.E , (newH - H)/ this.T )
      
      if (newH > H) {
       
       
        let RandNum = Math.random();
        this.T--;
        if (RandNum < p) {
          H = newH;
          if (this.T === 0) {
            break;
          }
        }
         
      }
      console.log(p);
    }
    
  };
}
