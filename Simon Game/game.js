var buttonColor=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var level=0;
function nextSequence(){
    userPattern=[];
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomColorChosen=buttonColor[randomNumber];
    gamePattern.push(randomColorChosen);
    $("#"+randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
    level++;
   console.log(gamePattern);
 
}

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userPattern.push(userChosenColor);
    $("#"+userChosenColor).click(playSound(userChosenColor));
    console.log(userPattern);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length-1);
    
})

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed")
    }, 100);

}

var started=false;
$(document).keypress(function(e){
    if(!started){
    nextSequence();
    $("h1").text("Level 0");
    started=true;
    }
})
function checkAnswer(currentLevel)
{
    
    if(userPattern[currentLevel]===gamePattern[currentLevel])
    {
    if(userPattern.length==gamePattern.length)
    {
    setTimeout(function(){nextSequence()},1000);
    while(userPattern.length>0)
    userPattern.pop();
    }
}
    else{
        playSound("wrong");
        $("body").addClass("game-over") 
        setTimeout(() => {
            $("body").removeClass("game-over") 
        }, 200);
        startOver();
    }
    }
    function startOver() {
        started=false;
        $("h1").text("Game Over, Press A Key to Reset");
        gamePattern=[];
    }
    
