var playerImg = new Image();
playerImg.src= "imgs/o-player.png";
var computerImg = new Image();
computerImg.src = "imgs/x-computer.png";
var table = new Array();
var table_SIZE = 9;
var vacant = ' ';
var player = 'O';
var computer = 'X';
var turn = "Player";
var choice;


function NewGame() {
    for (i = 0; i < table_SIZE; i++)
    {
        table[i] = vacant;
        document.images[i].src = "imgs/blank.png";
    }

    var alert = document.getElementById("turnInfo");
    turn = "Player";
    alert.innerHTML = "";
    document.getElementById("pop-up").style.display='none'
}

function MakeMove(pos) {
    if (!GameOver(table) && table[pos] === vacant)
    {
        table[pos] = player;
        document.images[pos].src = playerImg.src;
        if (!GameOver(table))
        {
            var alert = document.getElementById("turnInfo");
            turn = "Computer";
            
            MakeComputerMove();
        }
    }
}

function MakeComputerMove()
{

    alphaBetaMinimax(table, 0, -Infinity, +Infinity);
    var move = choice;
    table[move] = computer;
    document.images[move].src = computerImg.src;
    choice = [];
    turn = "Player";
    if (!GameOver(table))
    {
        var alert = document.getElementById("turnInfo");
            
    }
}

function GameScore(game, depth) {
    var score = CheckForWinner(game);
    if (score === 1)
        return 0;
    else if (score === 2)
        return depth-10;
    else if (score === 3)
        return 10-depth;
}

function alphaBetaMinimax(node, depth, alpha, beta) {
    if (CheckForWinner(node) === 1 || CheckForWinner(node) === 2 
            || CheckForWinner(node) === 3)
        return GameScore(node, depth);
    
    depth+=1;
    var availableMoves = GetAvailableMoves(node);
    var move, result, possible_game;
    if (turn === "Computer") {
        for (var i = 0; i < availableMoves.length; i++) {
            move = availableMoves[i];
            possible_game = GetNewState(move, node);
            result = alphaBetaMinimax(possible_game, depth, alpha, beta);
            node = UndoMove(node, move);
            if (result > alpha) {
                alpha = result;
                if (depth == 1)
                    choice = move;
            } else if (alpha >= beta) {
                return alpha;
            }
        }
        return alpha;
    } else {
        for (var i = 0; i < availableMoves.length; i++) {
            move = availableMoves[i];
            possible_game = GetNewState(move, node);
            result = alphaBetaMinimax(possible_game, depth, alpha, beta);
            node = UndoMove(node, move);
            if (result < beta) {
                beta = result;
                if (depth == 1)
                    choice = move;
            } else if (beta <= alpha) {
                return beta;
            }
        }  
        return beta;
    }
}

function UndoMove(game, move) {
    game[move] = vacant;
    ChangeTurn();
    return game;
}

function GetNewState(move, game) {
    var piece = ChangeTurn();
    game[move] = piece;
    return game;
}

function ChangeTurn() {
    var piece;
    if (turn === "Computer") {
        piece = 'X';
        turn = "Player";
    } else {
        piece = 'O';
        turn = "Computer";
    }
    return piece;
}

function GetAvailableMoves(game) {
    var possibleMoves = new Array();
    for (var i = 0; i < table_SIZE; i++)
    {
        if (game[i] === vacant)
            possibleMoves.push(i);
    }
    return possibleMoves;
}
function CheckForWinner(game) {
 
    for (i = 0; i <= 6; i += 3)
    {
        if (game[i] === player && game[i + 1] === player && game[i + 2] === player)
            return 2;
        if (game[i] === computer && game[i + 1] === computer && game[i + 2] === computer)
            return 3;
    }

    // Check for vertical wins
    for (i = 0; i <= 2; i++)
    {
        if (game[i] === player && game[i + 3] === player && game[i + 6] === player)
            return 2;
        if (game[i] === computer && game[i + 3] === computer && game[i + 6] === computer)
            return 3;
    }

    // Check for diagonal wins
    if ((game[0] === player && game[4] === player && game[8] === player) ||
            (game[2] === player && game[4] === player && game[6] === player))
        return 2;

    if ((game[0] === computer && game[4] === computer && game[8] === computer) ||
            (game[2] === computer && game[4] === computer && game[6] === computer))
        return 3;

    // Check for tie
    for (i = 0; i < table_SIZE; i++)
    {
        if (game[i] !== player && game[i] !== computer)
            return 0;
    }   
    return 1;
}

function GameOver(game)
{
    if (CheckForWinner(game) === 0)
    {
        return false;
    }
    else if (CheckForWinner(game) === 1)
    { document.getElementById("pop-up").style.display='block'
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "It is a tie.";
    }
    else if (CheckForWinner(game) === 2)
    { document.getElementById("pop-up").style.display='block'
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "You have won! Congratulations!";
    }
    else
    { document.getElementById("pop-up").style.display='block'
        var alert = document.getElementById("turnInfo");
        alert.innerHTML = "The computer has won.";
    }
    return true;
}