let user = prompt("Who's there?");
if (user == "Admin")
{
  let password = prompt("Password?");
  if (password == null)
    alert('Canceled');
  else if (password != "TheMaster")
    alert("Wrong password");
  else
    alert("Welcome!");
}
else if (user == null)
  alert('Canceled');
else
  alert("I don't know you");
