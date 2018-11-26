/*
<!--
	File: /~usr/cs/undergrad/2020/slim/public_html/JS/mult_table.js
 	91.461 Assignment7: Using jQuery Validation on MULT TABLE 
 	Lim, Sovanmony, UMass Lowell Computer Science, Sovanmony_Lim@student.uml.edu
 	Copyright (c) 2012 by Sovanmony Lim. All rights reserved. May be
	freely copied or excerpted for educational purposes with credit to the author. updated by SML on November, 2018 at 10 AM

-->
<!-- This page is the has the same template as the index.html page. It has navigation bar and contents page 
    that briefly descripted the author. Moreover, when users click on the author name, it will navigate users to the author Linken profiel. -->

    <!-- Most part of the code I copied it from the previous assignment 6 -->
*/
function validation() {
    $("#mult_form").validate({
    // Rules for validating the form.
    rules: {
        Start_Horizon: {
        number: true,
        min: -100,
        max: 100,
        required: true
        },
        End_Horizon: {
        number: true,
        min: -100,
        max: 100,
        required: true
        },
        Start_Verti: {
        number: true,
        min: -100,
        max: 100,
        required: true
        },
        End_Verti: {
        number: true,
        min: -100,
        max: 100,
        required: true
        }
    },

    // Prompt message if violate the rules
    messages: {
        Start_Horizon: {
            number: "Error: Please enter a valid number between (-100 ~ 100)",
            min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -100",
            max: "Error: The number you have entered is too big. Please enter a number less than or equal to 100",
            required: "Error: This field is required. Please enter a valid number between (-100 ~ 100)"
        },
        End_Horizon: {
            number: "Error: Please enter a valid number between (-100 ~ 100)",
            min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -100",
            max: "Error: The number you have entered is too big. Please enter a number less than or equal to 100",
            required: "Error: This field is required. Please enter a valid number between (-100 ~ 100)"
        },
        Start_Verti: {
            number: "Error: Please enter a valid number between (-100 ~ 100)",
            min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -100",
            max: "Error: The number you have entered is too big. Please enter a number less than or equal to 100",
            required: "Error: This field is required. Please enter a valid number between (-100 ~ 100)"
        },
        End_Verti: {
            number: "Error: Please enter a valid number between (-100 ~ 100)",
            min: "Error: The number you have entered is too small. Please enter a number greater than or equal to -100",
            max: "Error: The number you have entered is too big. Please enter a number less than or equal to 100",
            required: "Error: This field is required. Please enter a valid number between (-100 ~ 100)"
        }
    },

    // get call when user click submitted
    submitHandler: function() {
        table_calculation();
        return false;
    },

    invalidHandler: function() {
        // Nothing happen when the user try to submit form with error(s)
        $("#warning_msg").empty();
        $("#multiplication_table").empty();
    },
    // insert div to the error to make it looks better
    errorElement: "div",
    errorPlacement: function(error, element) {
        error.insertAfter(element);
    }
    });
}
  
function table_calculation() {
    // convert user input to Number
    // User could not input string or symbols
    var start_hor = Number(document.getElementById('Start_Horizon').value);
    var end_hor = Number(document.getElementById('End_Horizon').value);
    var start_vert = Number(document.getElementById('Start_Verti').value);
    var end_vert = Number(document.getElementById('End_Verti').value);

    $('#warning_msg').empty();
    // swap the num if user input start_hor greater than end_hor
    if (start_hor > end_hor) {
        // alert user about the swap
        $('#warning_msg').append("<p class='warning_class'> Swap Start Horizontal with End Horizontal </p>");
        var temp_num = start_hor;
        start_hor = end_hor;
        end_hor = temp_num;
    }

    // swap the num if user input start_vert greater than end_vert
    if (start_vert > end_vert) {
        // alert user about the swap
        $('#warning_msg').append("<p class='warning_class'> Swap Start Vertical with End Vertical </p>");
        var temp_num = start_vert;
        start_vert = end_vert;
        end_vert = temp_num;
    }

    var matrix = {};
    // ignore negative
    var rows = Math.abs(end_hor - start_hor);
    var columns = Math.abs(end_vert - start_vert);

    var _horizon = start_hor;
    var _verti = start_vert;

    // This loop will calculate to find the number in a certain index by using number in horizontal * number in vertical
    // It got the algorithm from this site https://stackoverflow.com/questions/27205018/multiply-2-matrices-in-javascript
    for (var x = 0; x <= columns; x++) {
        var temp = [];

        for (var y = 0; y <= rows; y++) {
            var _num = _horizon * _verti;
            temp[y] = _num;
            _horizon++;
        }
        // save the row
        matrix["row" + x] = temp;
        // reset each step
        _horizon = start_hor;
        // increment the vertical index
        _verti++;
    }

    var _number = "";
    // Put the empty box on the top left corner
    _number += '<table>';
    _number += '<tr><td></td>';

    // loop to fill the horizontal boxes on the first row
    for (var x = start_hor; x <= end_hor; x++) {
        _number += '<td>' + x + '</td>';
    }
    _number += '</tr>';

    var _verti = start_vert;

    // this is the loop to fill the elements in each from the second row
    for (var y = 0; y <= columns; y++) {
        _number += '<tr><td>' + _verti + '</td>';

        for (z = 0; z <= rows; z++) {
            _number += '<td>' + matrix['row' + y][z] + '</td>';
        }
        _verti++;

        _number += '</tr>';
    }

    _number += '</table>';

    // load the table to HTML page
    $("#multiplication_table").html(_number);

    return false;
}
