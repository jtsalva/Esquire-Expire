const superagent = require('superagent');
const config = require('../../config.js');

function indexController(req, res) {
    res.status(200);
    res.send(index);
}

const chatbotController = require('../controllers/chatbot')
const registerController = require('../controllers/registration')

module.exports = function(app) {
    app.post('/hello', chatbotController.message)
    app.post('/register', registerController.register)
    app.get('/', indexController)
}




























const index = `<!DOCTYPE html>
<html>
<link href='https://fonts.googleapis.com/css?family=Dynalight' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=Armata' rel='stylesheet'>
<body>

<style>
.container {
  width: 98vw;
  height: 96vh;
  position: relative;
  border: 12px solid #0b610c;
}

body {
	background-image:);
}
.center {
  text-align: center;
}
</style>


<div class="container">
  <div class="center">
  
    <h1 style = "font-family:Dynalight;font-size:100px;font-style:bold;">
	Esquire Expire
	</h1>
	<h2 style = "font-family:Dynalight;font-size:50px;font-style:bold;">
	Keeping all your food in date</h2>
	
	<label for="firstName"><b>First Name</b></label>
    <input id="firstName" type="text" placeholder="Enter First Name" name="firstName" required>
		
	<label for="phoneNumber"><b>Phone Number</b></label>
    <input id="phoneNumber" type="text" placeholder="Enter Phone Number name" name="phoneNumber" required>
	
	<button type="button" id="signUp" onclick="signUp(firstName, phoneNumber)">Sign Up</button>
	
	<body style = "font-family:Armata;font-size:15px;font-style:bold;">
	<br><br><br><br>Esquire Expire is a chatbot designed to help people keep their food in date. After signing up, you can text <br> the name of a food to Esquire Expire and he will make a note of it for you. When the item <br> is about to go bad you'll get a text from Esquire Expire reminding you along with recipies you can use the food in 
	</body>
	
	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
	<script>
	
	
	
	document.getElementById("signUp").onclick = function() {signUp()}
	
	function signUp() {
		var firstName = document.getElementById("firstName").value;
		var phoneNumber = document.getElementById("phoneNumber").value;

		if ((firstName == "") || (phoneNumber == "")) {
			window.alert("Please enter a first name and phone number");
		} else {
			window.alert("Hello " + firstName + ", we have sent a code to the number " + phoneNumber + " please reply with 'OK' to confirm sign up");

			$.ajax({
				method: 'post',
				data: JSON.stringify({firstName: firstName, phoneNumber: phoneNumber}),
				url: 'register',
				success: function(result) {
					console.log(result)
				}
			});
		}
	}
	</script>
	
  </div>
</div>

</body>
</html>`