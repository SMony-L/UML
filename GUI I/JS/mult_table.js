/*
<!--
	File: /~usr/cs/undergrad/2020/slim/public_html/JS/mult_table.js
 	91.461 Assignment6: Creating Multiplication Table with Javascript 
 	Lim, Sovanmony, UMass Lowell Computer Science, Sovanmony_Lim@student.uml.edu
 	Copyright (c) 2012 by Sovanmony Lim. All rights reserved. May be
	freely copied or excerpted for educational purposes with credit to the author. updated by SML on November, 2018 at 1 AM

-->
<!-- This page is the has the same template as the index.html page. It has navigation bar and contents page 
    that briefly descripted the author. Moreover, when users click on the author name, it will navigate users to the author Linken profiel. -->

*/

// Multiplication Table Calculation Function
function table_calculation() {

    // convert user input to Number
    // User could not input string or symbols
    var start_hor = Number(document.getElementById('Start_Horizon').value);
    var end_hor = Number(document.getElementById('End_Horizon').value);
    var start_vert = Number(document.getElementById('Start_Verti').value);
    var end_vert = Number(document.getElementById('End_Verti').value);
    
    // check the number if they are read correctly
    console.log("Start Horizontal: ", start_hor, "End Horizontal: ", end_hor, "Start Vertical: ", start_vert, "End Vertical: ", end_vert);

    // swap the num if user input start_hor greater than end_hor
    if (start_hor > end_hor) {
        var temp_num = start_hor;
        start_hor = end_hor;
        end_hor = temp_num;
    }

    // swap the num if user input start_vert greater than end_vert
    if (start_vert > end_vert) {
        var temp_num = start_vert;
        start_vert = end_vert;
        end_vert = temp_num;
    }
    // validation on user inputs
    if (start_hor < -10000 || end_hor > 10000 || start_vert < -10000 || end_vert > 10000) {
        alert("Input is invalid");
        return;
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
    
    // call the complete table function to complete the matrix
    complete_table(matrix);

    return false;
}

function complete_table(matrix) {

    // convert user input to Number
    // User could not input string or symbols
    var start_hor = Number(document.getElementById('Start_Horizon').value);
    var end_hor = Number(document.getElementById('End_Horizon').value);
    var start_vert = Number(document.getElementById('Start_Verti').value);
    var end_vert = Number(document.getElementById('End_Verti').value);

    // check the number if they are read correctly
    // console.log("Start Horizontal: ", start_hor, "End Horizontal: ", end_hor, "Start Vertical: ", start_vert, "End Vertical: ", end_vert);

    // swap the num if user input start_hor greater than end_hor
    if (start_hor > end_hor) {
        var temp_num = start_hor;
        start_hor = end_hor;
        end_hor = temp_num;
    }

    // swap the num if user input start_vert greater than end_vert
    if (start_vert > end_vert) {
        var temp_num = start_vert;
        start_vert = end_vert;
        end_vert = temp_num;
    }
    
    // ignore negative
    var rows = Math.abs(end_hor - start_hor);
    var columns = Math.abs(end_vert - start_vert);

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
}
