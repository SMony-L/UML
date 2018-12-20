/*
<!--
	File: /~usr/cs/undergrad/2020/slim/public_html/JS/asg9.js
 	91.461 Assignment9: Scrabble Game 
 	Lim, Sovanmony, UMass Lowell Computer Science, Sovanmony_Lim@student.uml.edu
 	Copyright (c) 2012 by Sovanmony Lim. All rights reserved. May be
	freely copied or excerpted for educational purposes with credit to the author. updated by SML on Dec, 2018 at 10 AM

-->
<!-- This page is the has the same template as the index.html page. It has navigation bar and contents page 
    that briefly descripted the author. Moreover, when users click on the author name, it will navigate users to the author Linken profiel. -->

    <!-- Most part of the code I copied it from the previous assignment 8 -->
*/

// got from Piazza by Ramon Meza
var pieces = [
    {"letter":"A", "value":1,  "amount":9},
    {"letter":"B", "value":3,  "amount":2},
    {"letter":"C", "value":3,  "amount":2},
    {"letter":"D", "value":2,  "amount":4},
    {"letter":"E", "value":1,  "amount":12},
    {"letter":"F", "value":4,  "amount":2},
    {"letter":"G", "value":2,  "amount":3},
    {"letter":"H", "value":4,  "amount":2},
    {"letter":"I", "value":1,  "amount":9},
    {"letter":"J", "value":8,  "amount":1},
    {"letter":"K", "value":5,  "amount":1},
    {"letter":"L", "value":1,  "amount":4},
    {"letter":"M", "value":3,  "amount":2},
    {"letter":"N", "value":1,  "amount":6},
    {"letter":"O", "value":1,  "amount":8},
    {"letter":"P", "value":3,  "amount":2},
    {"letter":"Q", "value":10, "amount":1},
    {"letter":"R", "value":1,  "amount":6},
    {"letter":"S", "value":1,  "amount":4},
    {"letter":"T", "value":1,  "amount":6},
    {"letter":"U", "value":1,  "amount":4},
    {"letter":"V", "value":4,  "amount":2},
    {"letter":"W", "value":4,  "amount":2},
    {"letter":"X", "value":8,  "amount":1},
    {"letter":"Y", "value":4,  "amount":2},
    {"letter":"Z", "value":10, "amount":1},
    {"letter":"_", "value":0,  "amount":2}
];

// JavaScript array of objects to determine what letter each piece is.
var game_tiles = [
    {"id": "piece0", "letter": "A"},
    {"id": "piece1", "letter": "B"},
    {"id": "piece2", "letter": "C"},
    {"id": "piece3", "letter": "D"},
    {"id": "piece4", "letter": "E"},
    {"id": "piece5", "letter": "F"},
    {"id": "piece6", "letter": "G"}
]

// JavaScript object track the board game
var game_board = [
    {"id": "drop0",  "tile": "pieceX"},
    {"id": "drop1",  "tile": "pieceX"},
    {"id": "drop2",  "tile": "pieceX"},
    {"id": "drop3",  "tile": "pieceX"},
    {"id": "drop4",  "tile": "pieceX"},
    {"id": "drop5",  "tile": "pieceX"},
    {"id": "drop6",  "tile": "pieceX"},
    {"id": "drop7",  "tile": "pieceX"},
    {"id": "drop8",  "tile": "pieceX"},
    {"id": "drop9",  "tile": "pieceX"},
    {"id": "drop10", "tile": "pieceX"},
    {"id": "drop11", "tile": "pieceX"},
    {"id": "drop12", "tile": "pieceX"},
    {"id": "drop13", "tile": "pieceX"},
    {"id": "drop14", "tile": "pieceX"}
]


// function find word
function find_word() {
    var word = "";
    var score = 0;
  
    // Go through the whole game board and generate a possible word.
    for (var i = 0; i < 15; i++) {
      
        if (game_board[i].tile != "pieceX") {

            word += find_letter(game_board[i].tile);
            score += find_score(game_board[i].tile);
        }
    }
  
    // calculate the score
    // call the function should_double() that will return 0 and 1 
    // if 0 just add score if 1 double the score
    score += (score * should_double());
  
    // Put the score of the dropped tile into the HTML doc.
    $("#score").html(score);
  
    // Snow the word to screen if not empty
    if (word != "") {
      $("#word").html(word);
      return;
    }
  
    // Word is now blank
    $("#word").html("____");
}

// Function return 0 or 1 for double 
function should_double() {

    if (game_board[3].tile != "pieceX") {
        return 1;
    }
    if (game_board[11].tile != "pieceX") {
        return 1;
    }
    return 0;
}

// function find the score
function find_score(given_id) {
    // First figure out which letter we have.
    var letter = find_letter(given_id);
    var score = 0;
  
    
    // we gotta look at each object in the array before we can look at stuff.
    for (var i = 0; i < 27; i++) {
        // Get an object to look at.
        var obj = pieces[i];
    
        // See if this is the right object.
        if (obj.letter == letter) {
            score = obj.value;

            // Droppable zones 0, 7 and 14 are DOUBLE letter scores.
            score += (score * should_double_letter(given_id));
    
            return score;
        }
    }
  
    // If we get here, then we weren't given a nice valid letter. >:(
    return -1;
}

// Function DOUBLE letter score
function should_double_letter(given_id) {
    
    // Find dropID this tile belongs to.
    var dropID = find_tile_pos(given_id);
  
    // Is this dropID a double spot or not?
    if  (dropID == "drop0" || dropID == "drop7" || dropID == "drop14") { 
        
        return 1;
    }
  
    return 0;
}

// Function return the letter that tile represents
function find_letter(given_id) {
    
    for (var i = 0; i < 7; i++) {
        
        // check if we find what we are looking for
        if (game_tiles[i].id == given_id) {
            // Just return its letter!
            return game_tiles[i].letter;
        }
    }

    return -1;
}

// Function return the array position
function find_board_pos(given_id) {
    for (var i = 0; i < 15; i++){
        if (game_board[i].id == given_id) {
            return i;
        }
    }
    return -1;
}
// Function find which drop id it belongs to
function find_tile_pos(given_id) {
    for (var i = 0; i < 15; i++){
        if (game_board[i].tile == given_id) {
            return game_board[i].id;
        }
    }

    return -1;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function load_scrabble_pieces() {

    // load the all the srabble tiles
    var scrabble_tile = "../IMG/Scrabble/Scrabble_Tile_";  
    var random_num = 1;
    var piece = "<img class='pieces' id='piece" + i + "' src='" + scrabble_tile + random_num + ".jpg" + "'></img>";
    var piece_ID = "";

    // Load up 7 pieces
    for (var i = 0; i < 7; i++) {

        var loop = true;
        // 27 tiles, so we want a range of 0 - 26
        while (loop == true){

            random_num = getRandom(0, 26);

            if (pieces[random_num].amount != 0) {

            loop = false;
            pieces[random_num].amount--;
        }
    }

    piece = "<img class='pieces' id='piece" + i + "' src='" + scrabble_tile + pieces[random_num].letter + ".jpg" + "'></img>";
    piece_ID = "#piece" + i;
    game_tiles[i].letter = pieces[random_num].letter;
      
    var img_left = 0;
    var img_top = -150;
  
      
    $("#rack").append(piece);

    // Move the piece relative to where the rack is located on the screen.
    $(piece_ID).css("left", img_left).css("top", img_top).css("position", "relative");

    // Make the piece draggable.
    $(piece_ID).draggable();
    }
}

function load_droppable_targets() {
    // load all the scrabble droppable png
    var img_url = "../IMG/Scrabble/Scrabble_Droppable.png";
    var drop = "<img class='droppable' id='drop" + i + "' src='" + img_url + "'></img>";
    var drop_ID = "#drop" + i; 
    
    for (var i = 0; i < 15; i++) {
        drop = "<img class='droppable' id='drop" + i + "' src='" + img_url + "'></img>";
        drop_ID = "#drop" + i;

        // var pos = $("#the_board").position();

        var img_left = 10 * i;
        var img_top = -125;

        $("#board").append(drop);

        $(drop_ID).css("left", img_left).css("top", img_top).css("position", "relative");

        $(drop_ID).droppable({
            // hold the tile when it is the droppable zone
            drop: function(event, ui) {
                
                var draggableID = ui.draggable.attr("id");
                var droppableID = $(this).attr("id");
                
                // mark the position of the tile in the board
                game_board[find_board_pos(droppableID)].tile = draggableID;

                find_word();
            }, 
            // pull the tile out when it is out of the droppable zone
            out: function(event, ui) {

                // var draggableID = ui.draggable.attr("id");
                var droppableID = $(this).attr("id");
                
                // mark the position of the tile in the board
                game_board[find_board_pos(droppableID)].tile = "pieceX";

                // Update the word that was just found.
                find_word();
            }
        });
    }
}

