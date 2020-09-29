function min(a,b)
{
  return a < b ? a : b;
}

let a = +prompt("Enter value of a");
let b = +prompt("Enter value of b");
alert(min(a,b) + " is the min value");
