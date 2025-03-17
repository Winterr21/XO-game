const board = document.getElementById("board");
        let cells = [];
        let currentPlayer = "X";
        let gameBoard = ["", "", "", "", "", "", "", "", ""];
        
        function createBoard() {
            board.innerHTML = "";
            gameBoard.forEach((cell, index) => {
                let div = document.createElement("div");
                div.classList.add("cell");
                div.dataset.index = index;
                div.addEventListener("click", handleClick);
                board.appendChild(div);
                cells.push(div);
            });
        }

        function handleClick(event) {
            let index = event.target.dataset.index;
            if (gameBoard[index] === "") {
                gameBoard[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                event.target.classList.add("taken");
                if (checkWinner()) {
                    document.getElementById("status").textContent = `${currentPlayer} Wins!`;
                    disableBoard();
                    return;
                }
                if (!gameBoard.includes("")) {
                    document.getElementById("status").textContent = "It's a Draw!";
                    return;
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winPatterns.some(pattern => {
                return pattern.every(index => gameBoard[index] === currentPlayer);
            });
        }
        
        function disableBoard() {
            cells.forEach(cell => cell.classList.add("taken"));
        }

        function resetGame() {
            gameBoard = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            document.getElementById("status").textContent = "";
            cells.forEach(cell => {
                cell.textContent = "";
                cell.classList.remove("taken");
            });
        }
        
        createBoard();