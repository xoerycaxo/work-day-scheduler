var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

function initializeSchedule(){
//  console.log(toDoItems);

  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
      hour: thisBlockHr,
      text: "",
    }
    toDoItems.push(todoObj);
  });

  localStorage.setItem("todos", JSON.stringify(toDoItems));
}

function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
    
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

$(document).ready(function(){

  setUpTimeBlocks();
  
  if(!localStorage.getItem("todos")){
    
    initializeSchedule();
  } 

  $currentDay.text(currentDate);

  renderSchedule();
  
  $scheduleArea.on("click", "button", saveHandler);
  
});