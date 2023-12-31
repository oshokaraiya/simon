var buttonColours = ["red", "blue", "green", "yellow"];


var gamePattern = [];

var started = false; 
var level = 0;

var userClickedPattern = [];

$(document).keypress(function(){
    if(!started){

      started = true;
      $("#level-title").text("level "+level);
      nextSequence();
      
    }
});

$(".btn").click(function() {
  
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    playsound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("h1").text("Game over, Press any key to restart");

    startOver();

  }


}
function nextSequence() {


  level++;
  $("#level-title").text("level "+level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColour);

}




function playsound(thecolor) {
    var audio = new Audio("sounds/" + thecolor + ".mp3");
    audio.play();
}

function animatePress(thecolor) {

  $("#"+thecolor).addClass("pressed");
  
  setTimeout(function() {
    $("#"+ thecolor).removeClass("pressed");
  },100);
}

function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}