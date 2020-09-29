let n = prompt("This program prints prime values up to a limit. What is the limit you wish to print primes until?")

let prime;
nextPrime:
for (let i = 2; i <= n; i++)
{
  for (let j = 2; j <= i; j++)
  {
    if (i != j && i % j == 0)
      continue nextPrime;
  }
  alert(i);
} 
