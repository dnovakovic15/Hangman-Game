var games = {
    hangman: function(){
        var words, word, randomNumber;
        var guesses = 0;
        var guessesRemaining = 15;
        var wins = 0;
        var indicies = [];
        var correctLetters = [];
        var correctCounter = 0;
        var audio = new Audio('assets/images/audio_file.mp3');
        var letter;

        a();


        $(document).ready(function(){
                    gameSetUp.setUp();
                });

        document.onkeyup = function(){
            guesses++;
            guessesRemaining--;
            $("#text-guesses").html("Guesses: " + guesses);
            $("#text-guesses-remaining").html("Guesses Remaining: " + guessesRemaining);

            letter = String.fromCharCode(event.keyCode).toLowerCase();
            $("#letters-guessed").append(letter.toString().toLocaleUpperCase());

            audioPlayer.gotIntro();
            letterCheck.checkLetter();
            html.addLetter();
            resetArray.resetArrayFunc(indicies);
            endGame.endGameTest();

        }

        function a(){
            console.log("test");
        }

        //Code to start and stop audio
        var audioPlayer = {
            gotIntro: function(){
                if(word.indexOf(letter) >= 0){
                    audio.play();
                }
                else{
                    audio.pause();
                }
            }
        }

        //Object that manipulates HTML. addLetter() adds letter to the appropriate div.
        var html = {
            addLetter: function(){
                for(var i = 0; i < indicies.length; i++){
                    $("." + indicies[i]).html(letter);
                }
            }
        }

        //Checks if a letter is inside a word and increments the correctCounter if the letter does exist.
        var letterCheck = {
            checkLetter: function(){
                for(var i = 0; i < word.length; i++){
                    if(word[i] === letter){
                        indicies.push(i);

                        if(correctLetters[i] !== letter){
                            correctLetters[i] = letter;
                            console.log("incrementing!");
                            correctCounter++;
                        }
                    }
            }
            }
        }

        //Checks for end-game conditions and alerts the user if those conditions have been met
        var endGame = {
                endGameTest: function(){
                    console.log("correctCounter: " + correctCounter);
                    console.log("correctCounter: " + word.length);
                    if(correctCounter == word.length){
                        alert("You Have Survived to Play One More Time!");
                        wins++;
                        $("#text-wins").html("Wins: " + wins);
                        gameSetUp.reset();
                    }
                    else if(guessesRemaining == 0){
                        alert("You Lose!");
                        gameSetUp.reset();
                    }
                }
            }

        //Takes an array as a parameter and resets the array
        var resetArray = {
            resetArrayFunc: function(arrayReset){
                indicies = [];
            }
        }

        //Setup and Restart Game
        var gameSetUp = {
            reset: function(){
                console.log("reseting!");
                correctCounter = 0;
                guesses = 0;
                guessesRemaining = 15;
                correctLetters = [];
                $("#letters-guessed").empty();
                $("#text-guesses").html("Guesses: " + guesses);
                $("#text-guesses-remaining").html("Guesses Remaining: " + guessesRemaining);
                $("#letters-container").empty();
                this.setUp();
            },
            setUp: function(){
                words = ["wolf", "littlefinger", "oathbreaker", "westeros", "arya"];
                randomNumber = Math.floor(Math.random() * 5);
                word = words[randomNumber];

                for(var index = 0; index < word.length; index++){
                    var div = $("<div>");
                    div.addClass("letter");
                    div.addClass(index.toString());
                    $("#letters-container").append(div);
                }
            }
        }
    }
}

games.hangman();
