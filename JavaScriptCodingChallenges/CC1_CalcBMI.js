var markMass, johnMass, markHeight, johnHeight, markBMI, johnBMI;

markMass = prompt('Enter the mass of Mark [kilograms]');
markHeight = prompt('Enter the height of Mark [meters]');

johnMass = prompt('Enter the mass of John [kilograms]');
johnHeight = prompt('Enter the height of John [meters]');

markBMI = markMass / markHeight ** 2;
johnBMI = johnMass / johnHeight ** 2;

if (markBMI > johnBMI)
  alert('Mark has a higher BMI than John');
else
  alert('John has a higher BMI than Mark');