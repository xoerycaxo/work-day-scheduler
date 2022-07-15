// Vars for work day hours
var nine = $("#9am");
var ten = $("#10am");
var eleven = $("#11am");
var twelve = $("#12pm");
var one = $("#1pm");
var two = $("#2pm");
var three = $("#3pm");
var four = $("#4pm");
var five = $("#5pm");
// vars for moment.js current day and date and hour
var todaysDate = moment().format('ddd') + ", " + moment().format("MMM Do YY");
var currentHour= moment().hours();
// This will display current date in the header for id currentDay
var jumboDateDisplay = function () {
    $("#currentDay").html(todaysDate);
}
// retrieving local storage Information for each hour
var loadPage = function() {
   
    var retrieve9 = JSON.parse(localStorage.getItem("09:00am"));
    nine.val(retrieve9);
    var retrieve10 = JSON.parse(localStorage.getItem("10:00am"));
    ten.val(retrieve10);
    
    var retrieve11 = JSON.parse(localStorage.getItem("11:00am"));
    eleven.val(retrieve11);
    var retrieve12 = JSON.parse(localStorage.getItem("12:00pm"));
    twelve.val(retrieve12);
    var retrieve1 = JSON.parse(localStorage.getItem("01:00pm"));
    one.val(retrieve1);
    var retrieve2 = JSON.parse(localStorage.getItem("02:00pm"));
    two.val(retrieve2);
    var retrieve3 = JSON.parse(localStorage.getItem("03:00pm"));
    three.val(retrieve3);
    var retrieve4 = JSON.parse(localStorage.getItem("04:00pm"));
    four.val(retrieve4);
    var retrieve5 = JSON.parse(localStorage.getItem("05:00pm"));
    five.val(retrieve5);
}
// function to change the background color of the text area depending on its relationship to the current time 
var timeDue = function() {
    $(".form-control").each(function() {
        var testForTime = parseInt($(this).attr("id"));
        hour = parseInt(currentHour);
        // if/else statements to determine the color fo the background depending on the current time from currentHour
        if (hour > testForTime ) {
            $(this).addClass("past");
        } else if (hour < testForTime) {
            $(this).addClass("future");
        } else {
            $(this).addClass("present");
        }
    });
}
// function so that click icon of button will save input to localStorage
var saveUserInput = function() {
    $(".saveBtn").on("click", function() {
        var userInput = $(this).siblings(".form-control").val().trim();
        var associatedHour = $(this).siblings(".input-group-prepend").text().trim(); // we use .text here instead of .val because we want to associate it ot the text field so that way we can load the saved items based on the text ex :09:00am
        localStorage.setItem(associatedHour, JSON.stringify(userInput));
    });
}
// creating call function
$(document).ready(function() {
    jumboDateDisplay();
    loadPage();
    timeDue();
    saveUserInput();
}); 
});