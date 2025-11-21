import {useState} from "react";
import {Layout} from "antd";

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [status, setStatus] = useState(0)
    const [winner, setWinner] = useState(null)
    const squares = history[history.length - 1]
    function handlePlay(index: number) {
        if(squares[index] || status) {
            return
        }
        const nextSquares = squares.slice();
        if(xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O"
        }
        setHistory([...history, nextSquares])
        setXIsNext(!xIsNext);

        const winner = calculateWinner(nextSquares);
        if(winner) {
            setStatus(1)
            setWinner(winner)
        }
    }
    return     <div className="game">
        <div className="game-board">
            <div className="status">{status == 0 ? "Next player: " + (xIsNext ? "X" : "O") : "Winner: " + winner}</div>
            <Board squares={squares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
            <ol>{/*TODO*/}</ol>
        </div>
    </div>
}

function Board({squares, onPlay}) {
    return <Layout>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => onPlay(0)} />
            <Square value={squares[1]} onSquareClick={() => onPlay(1)} />
            <Square value={squares[2]} onSquareClick={() => onPlay(2)} />
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => onPlay(3)} />
            <Square value={squares[4]} onSquareClick={() => onPlay(4)} />
            <Square value={squares[5]} onSquareClick={() => onPlay(5)} />
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => onPlay(6)} />
            <Square value={squares[7]} onSquareClick={() => onPlay(7)} />
            <Square value={squares[8]} onSquareClick={() => onPlay(8)} />
        </div>
    </Layout>
}

function Square({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}