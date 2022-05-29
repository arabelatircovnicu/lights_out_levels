import { Component } from "react";
import Button from "./Button.js";
import GameLevel from "./GameLevel.js";

class Game extends Component {
  constructor(props) {
    super(props);

    let table_level_0 = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];

    let table_level_1 = [
      [1, 0, 0, 0, 0],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 0, 0],
      [1, 0, 1, 1, 0]
    ];

    let table_level_2 = [
      [0, 0, 0, 0, 0, 0, 0, 1, 0],
      [1, 0, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0],
      [1, 1, 0, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0, 1, 1],
      [1, 1, 0, 1, 1, 0, 0, 1, 1],
      [0, 1, 1, 0, 0, 1, 0, 1, 1],
      [1, 0, 1, 1, 0, 0, 0, 0, 1]
    ];

    let firstGameLevel = new GameLevel(4, 4, table_level_0, 0);
    let secondGameLevel = new GameLevel(5, 5, table_level_1, 1);
    let thirdGameLevel = new GameLevel(9, 9, table_level_2, 2);

    let levelsDefinition = [firstGameLevel, secondGameLevel, thirdGameLevel];

    this.state = {
      hasWon: false,
      levelsDefinition: levelsDefinition,
      currentGameLevel: firstGameLevel,
      counter: 0,
      numberOfLevels: levelsDefinition.length,
      gameTable: this.createGameTable(firstGameLevel)
    };
  }

  createGameTable(level) {
    let gameTable = [];

    for (let lineIndex = 0; lineIndex < level.numberOfLines; lineIndex++) {
      let row = [];
      for (
        let columnIndex = 0;
        columnIndex < level.numberOfColumns;
        columnIndex++
      ) {
        row.push(level.table[lineIndex][columnIndex]);
      }
      gameTable.push(row);
    }

    return gameTable;
  }

  RestartTheLevel() {
    let level = this.state.currentGameLevel;
    let levels = this.state.levelsDefinition;

    let newTable = this.createGameTable(levels[level.levelNumber]);

    this.setState({
      hasWon: false,
      gameTable: newTable,
      counter: 0,
      currentGameLevel: levels[level.levelNumber]
    });
  }

  MoveToTheNextLevel() {
    let level = this.state.currentGameLevel;
    let levels = this.state.levelsDefinition;

    let newTable = this.createGameTable(levels[level.levelNumber + 1]);

    this.setState({
      hasWon: false,
      gameTable: newTable,
      counter: 0,
      currentGameLevel: levels[level.levelNumber + 1]
    });
  }

  render() {
    let board = [];

    for (
      let lineIndex = 0;
      lineIndex < this.state.currentGameLevel.numberOfLines;
      lineIndex++
    ) {
      let row = [];
      for (
        let columnIndex = 0;
        columnIndex < this.state.currentGameLevel.numberOfColumns;
        columnIndex++
      ) {
        let coord = `${lineIndex}-${columnIndex}`;
        row.push(
          <Button
            key={coord}
            lineIndex={lineIndex}
            columnIndex={columnIndex}
            Text={this.state.gameTable[lineIndex][columnIndex]}
            flipCellsAroundMe={() =>
              this.FlipTheCurrentButtonAndTheButtonsAround(
                lineIndex,
                columnIndex
              )
            }
          />
        );
      }
      board.push(<tr key={lineIndex}>{row}</tr>);
    }

    return (
      <div>
        {this.state.hasWon && this.state.hasFinishedAllLevels ? (
          <div>
            <span>YOU WIN!</span>
          </div>
        ) : (
          <div>
            <div>
              You are at the level: {this.state.currentGameLevel.levelNumber}
            </div>
            <table>
              <tbody>{board}</tbody>
            </table>

            <div>The current counter is: {this.state.counter} </div>
            <button
              style={{ marginTop: "10px" }}
              onClick={() => this.RestartTheLevel()}
            >
              Restart
            </button>

            <div>
              <button
                style={{ marginTop: "10px" }}
                onClick={() => this.MoveToTheNextLevel()}
              >
                Move to the next level
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  FlipButton(lineIndex, columnIndex, table) {
    const lineIndexIsValid =
      lineIndex >= 0 && lineIndex < this.state.currentGameLevel.numberOfLines;

    const columnIndexIsValid =
      columnIndex >= 0 &&
      columnIndex < this.state.currentGameLevel.numberOfColumns;

    if (lineIndexIsValid && columnIndexIsValid) {
      table[lineIndex][columnIndex] = (table[lineIndex][columnIndex] + 1) % 2;
    }
  }

  FlipTheCurrentButtonAndTheButtonsAround(lineIndex, columnIndex) {
    let table = this.state.gameTable;

    this.FlipButton(lineIndex, columnIndex, table);
    this.FlipButton(lineIndex - 1, columnIndex, table);
    this.FlipButton(lineIndex + 1, columnIndex, table);
    this.FlipButton(lineIndex, columnIndex - 1, table);
    this.FlipButton(lineIndex, columnIndex + 1, table);

    let currentCounter = this.state.counter;
    let newCounter = currentCounter + 1;

    let hasWon = this.state.gameTable.every((row) =>
      row.every((cell) => cell === 0)
    );

    let hasFinishedAllLevels =
      this.state.currentGameLevel.levelNumber >= this.state.numberOfLevels;

    if (hasWon && !hasFinishedAllLevels) {
      let currentLevel = this.state.currentGameLevel.levelNumber;
      let nextLevel = currentLevel + 1;
      var levels = this.state.levelsDefinition;

      let newTable = this.createGameTable(levels[nextLevel]);

      this.setState({
        hasWon: false,
        gameTable: newTable,
        counter: 0,
        currentGameLevel: levels[nextLevel]
      });
    } else {
      if (!hasWon) {
        this.setState({
          hasWon: hasWon,
          gameTable: table,
          counter: newCounter
        });
      }
    }
  }
}
export default Game;
