var  buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var i =0 ; 
var started=false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + i );
        nextSequence();
        started=true ; 
    }
})

$(".btn").click(function(){

    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
})
 
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence(){
  userClickedPattern = [];
    i++;
    $("#level-title").text("level " + i );
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio=new Audio("assets/sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    }, 100);
}

function startOver() {
    i = 0;
    gamePattern = [];
    started = false;
  }
  