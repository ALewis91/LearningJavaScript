/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct or not (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

(function() {

    // Function constructor for question objects
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.ask = function() {
        console.log(this.question);
        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(answer) {
        return this.correct === answer;
    }

    var myNameQuestion = new Question('What is my name?', ['Eric', 'Aaron', 'John', 'James'], 1);
    var firstPresidentQuestion = new Question('Who was the first president of the United States?', ['Thomas Edison', 'Benjamin Franklin', 'George Washington', 'Abraham Lincoln'], 2);
    var myProfessionQuestion = new Question('What is my profession?', ['teacher', 'translator', 'designer', 'software engineer'], 3);

    var questions = [myNameQuestion, firstPresidentQuestion, myProfessionQuestion];
    var index = Math.floor(Math.random() * questions.length);
    var question = questions[index];

    question.ask();
    var answer = prompt('Enter the correct answer');
    var score = 0;
    while (answer !== 'exit') {
        answer = parseInt(answer);
        if (question.checkAnswer(answer)) {
            console.log('Correct!');
            score++;
        } else {
            console.log('Incorrect!');
        }
        console.log('Your score: ' + score)
        console.log('------------------------------------');
        index = Math.floor(Math.random() * questions.length);
        question = questions[index];
        question.ask();
        answer = prompt('Enter the correct answer');
    }
})();
