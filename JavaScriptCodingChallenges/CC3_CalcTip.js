function tipCalcuator(bill) {
    switch(true) {
        case bill < 50:
            return bill * 0.20;
        case bill <= 200:
            return bill * 0.15;
        default:
            return bill * 0.10;
    }
}

var bills = [124, 48, 268];
var tips = [];
bills.forEach(bill => {
    tips.push(tipCalcuator(bill));
});

var finalPayments = [];

for (let index = 0; index < bills.length; index++) {
    finalPayments.push(bills[index] + tips[index]);
}

console.log(bills);
console.log(tips);
console.log(finalPayments);

