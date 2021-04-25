// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// CANVAS INITIALIZATION
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineJoin = "round";
ctx.lineCap = "round";


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// SECOND CANVAS FOR DRAWING RECTANGLE WITHOUT CLEARING THE FIRST
var temp_canvas = document.getElementById("temp_canvas");
var temp_ctx = temp_canvas.getContext("2d");

temp_canvas.width = window.innerWidth;
temp_canvas.height = window.innerHeight;

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ENVIRONMENT VARIABLES
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
var is_drawing = false;
var positionX, positionY;
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// SAVING HTML ELEMENTS
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const btnrange=document.getElementById("myRange");
const Colopicker=document.getElementById("myColor");
var brush = document.getElementById("brush"); 
var eraser = document.getElementById("erase"); 
var Pen=document.getElementById("Pen");
var color = document.getElementById("myColor"); 
var size = document.getElementById("myRange"); 
var reset = document.getElementById("reset"); 
var saveLink = document.getElementById("saveLink"); 
var rect = document.getElementById("rect");
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// SETTING THE COLOR AND SIZE ON THE PAGE LOAD
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


var myColor = color.value;
ctx.strokeStyle = myColor;

/*Set initial size conditions*/
var mySize = size.value;

temp_ctx.lineWidth = mySize;
ctx.lineWidth = mySize;

brush.style.border = "2px solid red";
canvas.style.cursor = "pointer";

canvas.addEventListener("mousedown", mouseDown,false);
canvas.addEventListener("mousemove", mouseMove, false);
canvas.addEventListener("mouseup", mouseRelease, false);




// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// CHANGES THE CONTEXT OBJECTS COLOR. THAT WAY WE MANIPULATE THE DRAWINGS.
// GETS CALLED  WHEN SIZE SELECTOR'S VALUE CHANGES.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function colorChange() {
	new_color = color.value;
	ctx.strokeStyle = new_color;

	temp_ctx.strokeStyle = new_color;
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// CHANGES THE CONTEXT OBJECTS LINE WIDTH. THAT WAY WE MANIPULATE THE DRAWINGS.
// GETS CALLED  WHEN SIZE SELECTOR'S VALUE CHANGES.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function sizeChange() {
	mySize = size.value;
	temp_ctx.lineWidth = mySize;
	ctx.lineWidth = mySize;
}


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// CONVERS PAGE COORDINATES TO CANVAS COORDINATES CALLED INSIDE IN ALMOST ALL DRAWING FUNCTIONS
// THE REASON BEHINDS THIS IS, THE COORDINATES WE GET FROM THE VARIABLE 'e' ARE PAGE COORDINATES. BUT WE NEED THE COORDINATES INSIDE THE CANVAS
// NOT THE PAGE. SO WE CONVERT THE PAGE COORDINATES TO CANVAS COORDINATES BY SIMPLE SUBSTRACTION.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function getCoordinates(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}






// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// WHEN CANVAS GET CLICKED, THIS FUNCTION 
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function mouseDown(e) {
	
	is_drawing = true;
	var coordinates = getCoordinates(canvas, e); // GETS THE COORDINATES;
	canvas.style.cursor = "pointer";
	positionX = coordinates.x;
	positionY = coordinates.y;
	ctx.beginPath(); // BEGINS A PATH; 
	
	
	// MAKES THE FIRST MOVE TO THAT COORDINATE.
	// {
	ctx.moveTo(positionX, positionY);
	ctx.lineTo(positionX, positionY);
	ctx.stroke();
	//}
}







// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// AFTER THE mouseDown FUNCTION, THIS FUNCTIONS RUNS EVERYTIME MOUSE RUNS UNTIL mouseRelease FUNCTION GETS CALLED.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function mouseMove(e) {
	var coordinates = getCoordinates(canvas, e); // GETS THE COORDINATES
	positionX = coordinates.x;
	positionY = coordinates.y;
	Draw(canvas, positionX, positionY); // DRAWS TO THOSE COORDINATES ( PATH BEGAN ON mouseDown FUNCTION )
}



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// THIS FUNCTION IS CALLED INSIDE THE mouseMove FUNCTION, DRAWS A LINE TO THE NEW COORDINATE FROM OLD ONE.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function Draw(canvas, positionX, positionY) {
	if(is_drawing) {
		
		ctx.lineTo(positionX, positionY); // 
		ctx.stroke();
		canvas.style.cursor = "pointer"; // SETS THE CURSOR TO THE HAND SHAPED ONE
	}
}





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// AFTER THE mouseDown FUNCTION, THIS FUNCTIONS RUNS WHEN THE MOUSE BUTTON GETS RELEASED
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function mouseRelease() {
	is_drawing = false; // SETS THE FLAG CONDITION SO OUR SCRIPT CAN DETERMINE THAT MOUSE IS RELEASED. NO MORE DRAWING NEEDED.
	canvas.style.cursor = "default"; // SETS THE CURSOR TO THE DEFAULT CURSOR FROM HAND SHAPED ONE.
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// FUNCTIONS FOR DRAWING RECTANGLE
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

var start_x,start_y;

function drawrect(x,y,context)
{
	console.log("Drawing on" + x + y);
	if(is_drawing)
	{
	context.beginPath();
	context.rect(start_x,start_y,x-start_x,y-start_y);
	context.stroke();
	}
}


function mouseDown2(e){

	is_drawing = true;

	var coordinates = getCoordinates(temp_canvas, e); // GETS THE COORDINATES;

	temp_canvas.style.cursor = "pointer";

	start_x = coordinates.x;

	start_y = coordinates.y;

  	ctx2.clearRect(0,0,canvas2.width,canvas2.height);

	console.log("drawing rectangle");
}

function mouseMove2(e){

	var coordinates = getCoordinates(temp_canvas,e);

	positionX = coordinates.x
	positionY = coordinates.y

	temp_ctx.clearRect(0,0,temp_canvas.width,temp_canvas.height);

	drawrect(positionX,positionY,temp_ctx);

}

function mouseUp2(e){
	
	var coordinates = getCoordinates(temp_canvas,e);
	drawrect(coordinates.x,coordinates.y,ctx);
	is_drawing = false;
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// FUNCTIONS FOR BUTTONS
// FUNCTIONS BELOW SIMPLY CHANGES THE GLOBAL VARIABLES OF DRAWING, DISABLES OR ENABLES ATTRIBUTES AND CHANGES THE COLORS OF OTHER BUTTONS.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function rectClick()
{
	temp_canvas.style.display = "block";

	Colopicker.disabled=false;
	btnrange.disabled=false;

	temp_ctx.lineWidth = mySize;
	var brushColor = document.getElementById("myColor");
	temp_ctx.strokeStyle = brushColor.value; 

	brush.style.border = "none";
	eraser.style.border = "none";
	Pen.style.border="none";
	rect.style.border = "2px solid red";

	

	canvas.removeEventListener("mousedown", mouseDown, false); 
	canvas.removeEventListener("mousemove", mouseMove, false);
	canvas.removeEventListener("mouseup", mouseRelease, false);

	temp_canvas.addEventListener("mousedown",mouseDown2,false);
	temp_canvas.addEventListener("mousemove",mouseMove2,false);
	temp_canvas.addEventListener("mouseup",mouseUp2,false);

	console.log("rect selected");

	temp_canvas.style.zIndex = 100;
	canvas.style.zIndex = 0;

}

function brushClick() {


	temp_canvas.style.display = "none";
	Colopicker.disabled=false;
	btnrange.disabled=false;
	ctx.lineWidth = mySize;
	
	var brushColor = document.getElementById("myColor");
	ctx.strokeStyle = brushColor.value; 
	brush.style.border = "2px solid red";
	eraser.style.border = "none";
	Pen.style.border="none";
	rect.style.border = "none";

	canvas.addEventListener("mousedown", mouseDown, false); 
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup", mouseRelease, false);

	temp_canvas.style.zIndex = 0;
	canvas.style.zIndex = 100;

}

function eraserClick() {
	temp_canvas.style.display = "none";
	btnrange.disabled=false;
	Colopicker.disabled=true;
	ctx.lineWidth = mySize;
	ctx.strokeStyle = "white";
	eraser.style.border = "2px solid red";
	brush.style.border = "none";
	Pen.style.border="none";
	rect.style.border = "none";
	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup", mouseRelease, false);

	temp_canvas.style.zIndex = 0;
	canvas.style.zIndex = 100;

}



function penclick() {
	temp_canvas.style.display = "none";
	Colopicker.disabled=true;
	btnrange.disabled=true;

	ctx.lineWidth = 1;
	ctx.strokeStyle = "Black";


	Pen.style.border = "2px solid red";
	brush.style.border = "none";
	eraser.style.border = "none";
	rect.style.border = "none";

	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup", mouseRelease, false);

	temp_canvas.style.zIndex = 0;
	canvas.style.zIndex = 100;
}


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// FUNCTIONS FOR RESET AND SAVE BUTTONS
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function resetClick() {
	window.location.reload();
}


function saveClick() {
	var data = canvas.toDataURL(); //encodes image information into a base 64 format
	console.log(data);
	saveLink.href = data;
	saveLink.download = "myImage.png";
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// ADDING THE FUNCTIONS CREATED ABOVE TO THE RELATED BUTTON EVEN LISTENERS
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	brush.addEventListener("click", brushClick); //Brush click event 
	eraser.addEventListener("click", eraserClick); //Eraser click event
	Pen.addEventListener("click", penclick);
	color.addEventListener("change", colorChange); //Color change event 
	size.addEventListener("change", sizeChange); //Size change event 
	reset.addEventListener("click", resetClick); //Reset click event 
	saveLink.addEventListener("click", saveClick); //Save click event 
	rect.addEventListener("click",rectClick);
	
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@     @@@@@@@  @@@			@@@@				@@@@@@@@@@@@@@@@    @@@@@@@  @@			 @@@   @@@@@@@@@@@@@@    @@@@@@@@@@@@@@  @@@@@@
// @@@@@@@@@  @@  @@@@@@  @@@	@@@@@@	@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@  @  @@@@@@  @@  @@@@@@	 @@@@   @@@@@@@@@@@@  @@  @@@@@@@@@@@@  @@@@@@@
// @@@@@@@@@  @@@  @@@@@  @@@	@@@@@@	@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@  @@  @@@@@  @@	 @@@@@@	 @@@@@   @@@@@@@@@@  @@@@  @@@@@@@@@@  @@@@@@@@
// @@@@@@@@@  @@@@  @@@@  @@@	@@@@@@	@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@  @@@  @@@@  @@	 @@@@@@	 @@@@@@   @@@@@@@@  @@@@@@  @@@@@@@@  @@@@@@@@@
// @@@@@@@@@  @@@@@  @@@  @@@	@@@@@@	@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@  @@@@  @@@  @@	 @@@@@@	 @@@@@@@   @@@@@@  @@@@@@@@  @@@@@@  @@@@@@@@@@
// @@@@@@@@@  @@@@@@  @@  @@@	@@@@@@	@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@  @@@@@  @@  @@	 @@@@@@	 @@@@@@@@   @@@   @@@@@@@@@@  @@@@  @@@@@@@@@@@
// @@@@@@@@@  @@@@@@@  @  @@@	@@@@@@	@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@  @  @@	 @@@@@@	 @@@@@@@@@   @@  @@@@@@@@@@@@  @@  @@@@@@@@@@@@
// @@@@@@@@@  @@@@@@@@    @@@			@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@  @@@@@@@    @@			 @@@@@@@@@@     @@@@@@@@@@@@@@   @@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@