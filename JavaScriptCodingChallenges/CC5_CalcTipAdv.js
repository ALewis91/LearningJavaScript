var johnCalcTip = {
    bills: [124, 48, 268, 180, 42],
    tips: [],
    finalPayments: [],
    calcTip: function(bill) {
        switch(true) {
            case bill < 50:
                return bill * 0.20;
            case bill <= 200:
                return bill * 0.15;
            default:
                return bill * 0.10;
        }
    },
    calcPayments: function() {
        for (var i = 0; i < this.bills.length; i++) {
            this.tips.push(this.calcTip(this.bills[i]));
            this.finalPayments.push(this.bills[i] + this.tips[i]);
        }
    }
}

var markCalcTip = {
    bills: [77, 375, 110, 45],
    tips: [],
    finalPayments: [],
    calcTip: function(bill) {
        switch(true) {
            case bill < 100:
                return bill * 0.20;
            case bill <= 300:
                return bill * 0.10;
            default:
                return bill * 0.25;
        }
    },
    calcPayments: function() {
        for (var i = 0; i < this.bills.length; i++) {
            this.tips.push(this.calcTip(this.bills[i]));
            this.finalPayments.push(this.bills[i] + this.tips[i]);
        }
    }
}

function averageTip(...tips) {
    var sum = 0;
    for (var i = 0; i < tips.length; tips++) {
        sum += tips[i];
    }
    console.log(sum);
    return sum / tips.length;
}

johnCalcTip.calcPayments();
markCalcTip.calcPayments();
johnCalcTip.averageTip = averageTip(johnCalcTip.tips);
markCalcTip.averageTip = averageTip(markCalcTip.tips);

console.log(johnCalcTip);
console.log(markCalcTip);
if (johnCalcTip.averageTip > markCalcTip) {
    console.log('John paid more tips on average than Mark');
} else if (johnCalcTip.averageTip < markCalcTip) {
    console.log('Mark paid more tips on average than John');
} else {
    console.log('John and Mark paid the same amount of tip on average');
}