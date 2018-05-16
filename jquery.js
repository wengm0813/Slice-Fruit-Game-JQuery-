var playing = false;
var score;
var trailLeft;
var step;
var action;
var fruits = ["apple","banana","cherries","grapes","mango","orange","peach","pear","watermelon"];

$(function(){
    
    // click start button
    $("#startrest").click(function(){
        // reset game just reloading the page
        if (playing == true){
            location.reload();
            
        } else {
            playing = true;
            
            //display score
            score = 0;
            $("#scoreValue").html(score);
             
            //show trial left
            $("#trialsLeft").show();
            trailLeft = 3;
            addHearts();
            
            // hide game over box
            $("#gameOver").hide();
            
            // change start game to reset
            $("#startrest").html("Reset Game");
            
            //display fruit
            startAction();
            
        }
    });
    
    // slice fruit
    $("#fruit1").mouseover(function(){
        //update score
        score++;
        $("#scoreValue").html(score);
        
        // play slice sound
        document.getElementById("slicesound").play();

        // stop the fruit
        clearInterval(action);
        
        // hide fruit with animation
        $("#fruit1").hide("explode", 300);
        
        //create new fruit
        setTimeout(startAction, 500);
    });
    
        //display heart
    function addHearts(){
         $("#trialsLeft").empty();

        for (var i = 0; i < trailLeft; i++){
            $("#trialsLeft").append('<img src = "Images/heart.png" class="life">');
        }
    }

    function newFruit(){
        $("#fruit1").show();
        chooseFruit();
        $("#fruit1").css({'left': Math.round(550 * Math.random()), 'top': -50});
         // fallen down velocity
        step = 1 + Math.round(5 * Math.random());
    }

    function startAction(){
        //create random fruit in random position
        newFruit();

        action = setInterval(function(){
            $("#fruit1").css('top',$("#fruit1").position().top + step);

            //out of screen
            if ($("#fruit1").position().top > $("#fruitContainer").height()){
                if (trailLeft > 1){
                    
                    newFruit();
                    trailLeft--;
                    addHearts();
                } else {
                    //GameOver
                    playing = false;
                    $("#startrest").html("Start Game");
                    $("#gameOver").show();
                    $("#gameOver").html("<p>Game Over!</p> <p>Your Score is "+ score+ "</p>");
                    $("#trialsLeft").hide();
                    StopAction();
                }
            }
        }, 10);
    }

    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
    //generate randome fruit from Images
    function chooseFruit(){
        $("#fruit1").attr('src', 'Images/' + fruits[Math.round(8 * Math.random())] + '.png');
    }
    
});


