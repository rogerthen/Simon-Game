var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//Detecting first pressed key to start the game
$(document).keypress(function(){
    nextSequence();
})


// Detecting which button is pressed
$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1); //taking index of last answer as input
})

// Create next button in the gamePattern sequence
function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100); //animation effect
    playSound(randomChosenColour)
    $("h1").html("Level "+ level);
    level++;
}

// Sound the button when button is pressed
function playSound(key){

    var audio = new Audio('sounds/'+key+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    
    $("#"+currentColour).addClass("pressed");
     setTimeout(function(){
        $('#'+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    
    // Check if user provides the right answer for every array according to GamePattern's answers.
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success!")

        // If all answers are answered correctly, proceed to next sequence.
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000) 
        }
    }else{
        var audio = new Audio('sounds/wrong.mp3')
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").html("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];

}