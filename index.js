const Board = () => {
  const [player, setPlayer] = React.useState(1);
  console.log(player);
  const [gameState, setGameState] = React.useState([]);
  let status = checkForWinner(gameState);

  let playerTurn = `${player == 0 ? "Player O" : "Player X"}`;

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  function renderSquare({ i, classNames = "" }) {
    return (
      <Square
        takeTurn={takeTurn}
        id={i}
        status={status}
        classNames={classNames}
      ></Square>
    );
  }

  return (
    <div className="container">
      <div className="info">
        <p>
          <span className="bold">Turn:</span> {playerTurn}
        </p>
        {status != "No Winner Yet" && (
          <button
            className="reset-button"
            onClick={() => {
              setGameState([]);
              setPlayer(1);
              document.querySelectorAll(".square").forEach((square) => {
                square.innerHTML = "";
              });
            }}
          >
            New Game
          </button>
        )}
        <p>
          <span className="bold">Winner:</span> {status}
        </p>
      </div>
      <div className="game-board">
        <div className="grid-row">
          {renderSquare({ i: 0, classNames: "right-border bottom-border" })}
          {renderSquare({ i: 1, classNames: "right-border bottom-border" })}
          {renderSquare({ i: 2, classNames: "bottom-border" })}
        </div>
        <div className="grid-row">
          {renderSquare({ i: 3, classNames: "right-border bottom-border" })}
          {renderSquare({ i: 4, classNames: "right-border bottom-border" })}
          {renderSquare({ i: 5, classNames: "bottom-border" })}
        </div>
        <div className="grid-row">
          {renderSquare({ i: 6, classNames: "right-border" })}
          {renderSquare({ i: 7, classNames: "right-border" })}
          {renderSquare({ i: 8 })}
        </div>
      </div>
    </div>
  );
};

const Square = ({ takeTurn, id, status, classNames = "" }) => {
  const mark = ["O", "X", ""];
  const [tik, setTik] = React.useState(2);

  return (
    <button
      className={`square ${
        tik === 1 ? "player1" : tik === 0 ? "player2" : ""
      } ${classNames}`}
      onClick={() => {
        setTik(takeTurn(id));
      }}
      disabled={status != "No Winner Yet"}
    >
      <h1>{mark[tik]}</h1>
    </button>
  );
};

const checkForWinner = (gameState) => {
  const winningCombinations = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  if (gameState.length < 5) return "No Winner Yet";

  let p0 = gameState.filter((item) => {
    if (item.player == 0) return item;
  });
  p0 = p0.map((item) => item.id);
  let px = gameState.filter((item) => {
    if (item.player == 1) return item;
  });
  px = px.map((item) => item.id);
  if (p0 != null && px != null) {
    var win0 = winningCombinations.filter((item) => {
      return isSuperset(new Set(p0), new Set(item));
    });
    var winX = winningCombinations.filter((item) => {
      return isSuperset(new Set(px), new Set(item));
    });
  }
  if (win0.length > 0) return "Player O";
  else if (winX.length > 0) return "Player X";
  return "No Winner Yet";
};
// check if subset is in the set
function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

// ========================================

ReactDOM.createRoot(document.getElementById("root")).render(<Board />);
