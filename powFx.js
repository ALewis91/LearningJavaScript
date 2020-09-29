function pow(x,n)
{
  let result = x;
  if (n == 0)
    return 1;
  while (n > 1)
  {
    result *= x;
    n--;
  }
  return result;
}

let x = +prompt("Enter a value for the base");
let n = +prompt("Enter a value for the exponent");

alert(pow(x,n) + ` is ${x} to the power of ${n}`);
