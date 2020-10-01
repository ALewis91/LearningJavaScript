var markGame1Score, markGame2Score, markGame3Score, johnGame1Score, johnGame2Score, johnGame3Score;

markGame1Score = 116;
markGame2Score = 94;
markGame3Score = 123;

johnGame1Score = 110;
johnGame2Score = 120;
johnGame3Score = 103;

var markAvgScore = (markGame1Score + markGame2Score + markGame3Score) / 3;
var johnAvgScore = (johnGame1Score + johnGame2Score + johnGame3Score) / 3;

if (markAvgScore === johnAvgScore) {
    console.log('Mark and John have the same average score of ' + markAvgScore);
} else if (markAvgScore < johnAvgScore) {
    console.log('John has a higher average score of ' + johnAvgScore);
} else {
    console.log('Mark has a higher average score of ' + markAvgScore);
}