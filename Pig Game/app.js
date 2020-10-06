/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Random number
        var dice1 = Math.floor((Math.random() * 6)) + 1;
        var dice2 = Math.floor((Math.random() * 6)) + 1;

        //2. Display the result
        var dice1DOM = document.querySelector('.dice1');
        var dice2DOM = document.querySelector('.dice2');
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number is not a 1
        if ((dice1 > 1 && dice2 > 1) && !(prevRoll === 6 && dice1 === 6 || prevRoll === 6 && dice2 === 6)) {
            // Add to round score
            prevRoll = dice1 === 6 ? dice1 : dice2;
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else if (prevRoll === 6 && dice1 === 6 || prevRoll === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            switchActivePlayer();
        } else {
            // Next player's turn
            switchActivePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Add round score to total score
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //2. Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            //1. Reset round score
            roundScore = 0;

            //2. Next player's turn
            switchActivePlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function switchActivePlayer() {
    prevRoll = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';
    roundScore = 0;
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer = (activePlayer + 1) % 2;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    prevRoll = 0;
    activePlayer = 0;
    gamePlaying = true;
    winningScore = 100;
    if (document.getElementById('text-limit').value) {
        winningScore = document.getElementById('text-limit').value;
    }
    //document.querySelector('#current-' + activePlayer).textContent = dice;
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}










