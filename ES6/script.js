//////////////////////////////////
// Lecture: let and const

/*
// ES5

var name5 = 'Jane Smith';
var age5 = 23;

console.log(name5);
console.log(age5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;

name6 = 'Jane Miller';
console.log(name6);


// ES5

function driversLicense5(passedTest) {

    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');

}

driversLicense5(true);

// ES6

function driversLicense6(passedTest) {

    let firstName;
    const yearOfBirth = 1990;

    if (passedTest) {
        firstName = 'John';
    }
    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicense6(true);



var i = 23;

for (var i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);




//////////////////////////////////
// Lecture: Blocks and IIFEs


// ES6
{
    const a = 1; 
    let b = 2;
    var c = 3;
}

//console.log(a);
//console.log(b);
console.log(c);


// ES5

(function() {
    var c = 3;
})();

//console.log(c);




////////////////////////////////////
// Lecture: Strings

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return (new Date).getFullYear() - year;
}

// ES5
console.log ('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`
console.log(n.startsWith('J'));
console.log(n.endsWith('h'));
console.log(n.includes(' Smi'));
console.log(`${firstName} `.repeat(10));




//////////////////////////////////////////////
// Lecture: Arrow Functions

const years = [1990, 1965, 1982, 1937];

// ES5
ages5 = years.map(function(current) {
    return (new Date()).getFullYear() - current;
});

console.log(ages5);


// ES6
let ages6 = years.map(current => new Date().getFullYear() - current);
console.log(ages6);

ages6 = years.map((current, index) => `Age element ${index + 1}: ${(new Date()).getFullYear() - current}.`);
console.log(ages6);

ages6 = years.map((current, index) => {
    var now = new Date().getFullYear();
    let age = now - current;
    return `Age element ${index + 1}: ${age}.`;
});
console.log(ages6);




//////////////////////////////////////////////
// Lecture: Arrow Functions 2

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {

        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}

//box5.clickMe();

// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {

        document.querySelector('.green').addEventListener('click', () => {
            
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}

//box6.clickMe();


const box66 = {
    color: 'green',
    position: 1,
    clickMe: function() {

        document.querySelector('.green').addEventListener('click', () => {
            
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}

box66.clickMe();


function Person(name) {
    this.name = name;
}


// ES5
Person.prototype.myFriends5 = function(friends) {
    var arr = friends.map(function(current) {
        return this.name + ' is friends with ' + current + '.';
    }.bind(this));
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];

new Person('John').myFriends5(friends);

Person.prototype.myFriends6 = function(friends) {
    var arr = friends.map(current => 
        `${this.name} is friends with ${current}.`
    );
    console.log(arr);
}


new Person('John').myFriends6(friends);






///////////////////////////////////////////////////
// Lecture: Destructuring

// ES5
var john = ['John', 26];
//var name = john[0];
//var age = john[1];

//ES6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
}

const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);
*/


////////////////////////////////
// Lecture: Arrays

//const boxes = document.querySelectorAll('.box');


/*
// ES5
var boxesArray5 = Array.prototype.slice.call(boxes);

boxesArray5.forEach(function(current) {
    current.style.backgroundColor = 'dodgerblue';
})

// ES6
const boxesarray6 = Array.from(boxes);

boxesarray6.forEach(current => current.style.backgroundColor = 'dodgerblue');





// ES5
for (var i = 0; i < boxesArray5.length; i++) {
    if(boxesArray5[i].className === 'box blue') {
        continue;
    } else {
        boxesArray5[i].textContent = 'I changed to blue!'
    }
}



// ES6
for(const current of boxesarray6) {
    if (current.className.includes('blue')) {
        continue;
    } else {
        current.textContent = 'I changed to blue!'       
    }
}



// ES5

var ages = [12, 17, 8, 21, 14, 11];

var fullAge = ages.map(function(current) {
    return current >= 18;
});

console.log(fullAge);
console.log(fullAge.indexOf(true));



// ES6
console.log(ages.findIndex(current => current >= 18));
*/


/*

//////////////////////////////////////////////////
// Lecture: Spread Operator

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);


// ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];

const bigFamily = [...familySmith, ...familyMiller];
console.log(bigFamily);


const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];
Array.from(all).forEach(current => current.style.color = 'purple');

*/
/*
////////////////////////////////////////////
// Lecture: Rest parameters

// ES5
function isFullAge5(limit) {
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1);
    
    argsArr.forEach(function(current) {
        console.log((new Date()).getFullYear() - current >= limit);
    });
}

//isFullAge5(23, 1990, 1999, 1965);

// ES6

function isFullAge6(limit, ...years) {
    years.forEach(current => console.log((new Date()).getFullYear() - current >= limit));
}

isFullAge6(18, 1990, 2003, 2010, 2001, 1999);
*/



//////////////////////////////////////////
// Lecture: Default parameters


// ES5
/*
function SmihPerson(firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'American' : lastName = lastName;

    this.firstName = firstName,
    this.lastName = lastName,
    this.yearOfBirth = yearOfBirth,
    this.nationality = nationality
}

var john = new SmihPerson('John', 1990);

var emily = new SmihPerson('Emily', 1983, 'Diaz', 'Spanish');
*/
/*
// ES6
function SmihPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {

    this.firstName = firstName,
    this.lastName = lastName,
    this.yearOfBirth = yearOfBirth,
    this.nationality = nationality
}

var john = new SmihPerson('John', 1990);

var emily = new SmihPerson('Emily', 1983, 'Diaz', 'Spanish');
*/

/*
///////////////////////////////////////
// Lecture: Maps

const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again');

console.log(question.get('question'));
//console.log(question.size);

// question.forEach((value, key) => console.log(`This is ${key} and it is set to ${value}`));

for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));

console.log(question.get(ans === question.get('correct')));
*/


/*
//////////////////////////////////////////////
//  Lecture: Classes

// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this. yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    this.age = new Date().getFullYear() - this.yearOfBirth;
    console.log(this.age);
}

var john5 = new Person5('John', 1990, 'teacher');

// ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        this.age = new Date().getFullYear() - this.yearOfBirth;
        console.log(this.age);
    }

    static greeting() {
        console.log('Hello!');
    }
}

const john6 = new Person6('John', 1990, 'teacher');

*/





/////////////////////////////////////////////////
// Lecture 6: Classes and Subclasses

// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this. yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    this.age = new Date().getFullYear() - this.yearOfBirth;
    console.log(this.age);
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);

    this.olympicGames = olympicGames;
    this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);
Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}
var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

//johnAthlete5.calculateAge();
//johnAthlete5.wonMedal();


// ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        this.age = new Date().getFullYear() - this.yearOfBirth;
        console.log(this.age);
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log (this.medals);
    }
}

var johnAthlete6 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
