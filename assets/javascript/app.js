
$("#playAgain").hide();
//after the player clicks Start button that will trigger the startGame function
$("#start").on("click",startGame);
//after the player picks answers will trigger the handleClick function
$("#options").on("click", handleClick);


var counterMax = 6;
var counter = counterMax;
var timer;
var wins = 0;
var losses = 0;
var optionsDiv = {
	options1: $("#options1"),
	options2: $("#options2"),
	options3: $("#options3"),
	options4: $("#options4")
}
var questionDiv = $("#questions");
var currentQuestion = 0;
var questionIndex = 3;
var active = false;
//using an array to save players answer
var playerPick = [];
var images = ["images/Obama.gif", "images/Reagan.gif","images/Trump.gif","images/Washington.gif"];
var j = 0;

//questions that will display each 30 seconds
var items = [
	{
		question: "1. Who is the first persident of United States?", 
		answer: "George Washington",
		options: ["Michael Jackson","George Washington","Thomas Jefferson","Donald Trump"]
	},

	{
		question: "2. Which persident of United States has/had a red hair?", 
		answer: "Donald Trump",
		options: ["George Washington","Thomas Jefferson","Donald Trump","Michael Jackson"]
	},
	{
		question: "3. Which persident of United States loved Jelly beans?", 
		answer: "Ronald Reagan",
		options: ["Ronald Reagan","Thomas Jefferson","Donald Trump","Michael Jackson"]
	},
	{
		question: "4. Who was the last persident of United States?", 
		answer: "Barack Obama",
		options: ["George W. Bush","Bill Clinton","Barack Obama","George H.w. Bush"]
	}
]

function startGame() {

	$("#totalPoints").hide();

	//timer counts down every 1 second
	timer = setInterval(gameTimer, 1000);
	counter = counterMax;
	active = true;
	$("#counter").text("Time Remaining: 30 Seconds!");
	displayQuestion(items[currentQuestion]);
}

function handleClick(event) {
	if (active) {
		var userChoice = event.target.innerHTML
		console.log(userChoice)
		//if the user picks the right answer
		// wins will get one point
		if (userChoice === items[currentQuestion].answer && userChoice === images[j]) {
			console.log('Correct!')
			playerPick.push(true);
			wins++;
			showImages();
			$("#totalWins").text("Wins: " + wins);
			console.log("this is player picks: " + playerPick);
		} 
		//if the user picks the wrong answer
		// losses will get one point 
		else {
			console.log('Wrong!');
			playerPick.push(false);
			losses++;
			$("#totalLosses").text("Losses: " + losses);	
		}
		//call the next question
		changeQuestion();
	}
}

function changeQuestion() {
	if (currentQuestion === questionIndex) {
		//hand the end of game
		endOfGame();

	} 
	else {
		counter = counterMax;
		currentQuestion++;
		displayQuestion(items[currentQuestion]);
	}
}

function endOfGame() {
	console.log(playerPick);
	active = false;
	$("#options").hide();
	$("#display").hide();
	$("#totalPoints").show();
	$("#playAgain").show();
}

function gameTimer() {
	if (active) {
		console.log("this is counter: " + counter);	
		if (counter < 1) {
			console.log("end of timer");
			changeQuestion();
		}
		else {
			counter--;
			$("#counter").text("Time Remaining: " + counter + " Seconds!");
		}
	}
}

function displayQuestion(question) {
	questionDiv.html(question.question);
	optionsDiv.options1.html(question.options[0]);
	optionsDiv.options2.html(question.options[1]);
	optionsDiv.options3.html(question.options[2]);
	optionsDiv.options4.html(question.options[3]);

} 

function showImages() {

	$("#imageHolder").html("<img src=' " + images[j] + " ' width='200px'/>");
	
}
