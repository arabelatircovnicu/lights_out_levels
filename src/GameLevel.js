import { Component } from "react";

class GameLevel extends Component {
  static defaultProps = {
    numberOfLines: 4,
    numberOfColumns: 4,
    table: [],
    levelNumber: 0
  };

  constructor(numberOfColumns, numberOfLines, table, levelNumber) {
    super(numberOfColumns, numberOfLines, table);
    this.numberOfColumns = numberOfColumns;
    this.numberOfLines = numberOfLines;
    this.table = table;
    this.levelNumber = levelNumber;
  }
}

export default GameLevel;
