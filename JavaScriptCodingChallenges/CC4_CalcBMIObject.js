var john = {
    firstName: 'John',
    lastName: 'Smith',
    height: 1.69,
    mass: 50,
    calcBMI: function() {
        this.BMI = this.mass / this.height ** 2; 
        return this.BMI;
    }
}

var mark = {
    firstName: 'Mark',
    lastName: 'Whalburg',
    height: 1.69,
    mass: 50,
    calcBMI: function() {
        this.BMI = this.mass / this.height ** 2; 
        return this.BMI;
    }
}

if (john.calcBMI() > mark.calcBMI()) {
    console.log(john.firstName + ' ' + john.lastName + ' has a higher BMI of ' + john.BMI);
} else if (mark.BMI > john.BMI) {
    console.log(mark.firstName + ' ' + mark.lastName + ' has a higher BMI of ' + mark.BMI);
} else {
    console.log(john.firstName + ' and ' + mark.firstName + ' have the same BMI of ' + john.BMI);
}

