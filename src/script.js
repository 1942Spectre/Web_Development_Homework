// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//Ahmet Hakan Afşin B1910.033028
//Gele Hasan B1910.033066
//Onur Çetrefil B1810.033021
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// CANVAS INITIALIZATION
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var temp_canvas = document.getElementById("temp_canvas");
var temp_ctx = temp_canvas.getContext("2d");

var is_drawing;
var erase;

var hist = [canvas.toDataURL()];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

temp_canvas.width = window.innerWidth;
temp_canvas.height = window.innerHeight;

temp_canvas.style.display = "none";

ctx.lineJoin = "round";
ctx.lineCap = "round";

temp_ctx.lineJoin = "round";
temp_ctx.lineCap = "round";

drawing_shape = "none";

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



// HTML ELEMENTS
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
var tri = document.getElementById("tri");
var circle = document.getElementById("circle");
var fill = document.getElementById("fill");
var toolbar = document.getElementById("toolbar");
var undo = document.getElementById("undo");
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// SETTING INITIAL SPECIALIZATIONS
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


var myColor = color.value;
ctx.strokeStyle = myColor;
temp_ctx.strokeStyle = myColor;
var mySize = size.value;

temp_ctx.lineWidth = mySize;
ctx.lineWidth = mySize;

brush.style.border = "2px solid red";
canvas.style.cursor = "pointer";

var will_fill = false;

canvas.addEventListener("mousedown", mouseDown,false);
canvas.addEventListener("mousemove", mouseMove, false);
canvas.addEventListener("mouseup", mouseRelease, false);

fill.style.display = "none";

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// CHANGES THE CONTEXT OBJECTS LINE WIDTH AND COLOR. THAT WAY WE MANIPULATE THE DRAWINGS.
// GETS CALLED  WHEN SIZE SELECTOR'S VALUE OR COLOR VALUE CHANGES.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function colorChange() {
	myColor = color.value;
}

function sizeChange() {
	mySize = size.value;
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// STATE VARIABLES FOR DRAWING SHAPES LIKE RECTANGLES AND TRIANGLES

var x1,x2,x3,y1,y2,y3;
var drawing_shape;
var triangle_state;

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// CANVAS FUNCTIONS
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function getCoordinates(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function mouseDown(e) {

	if(!pen){
		ctx.strokeStyle = myColor;
		temp_ctx.strokeStyle = myColor;

		ctx.lineWidth = mySize;
		temp_ctx.lineWidth = mySize;
	}

	is_drawing = true;
	var coordinates = getCoordinates(canvas, e); // GETS THE COORDINATES;
	canvas.style.cursor = "pointer";
	
    positionX = coordinates.x;
	positionY = coordinates.y;
	
    

    if(drawing_shape != "none"){
		if(drawing_shape == "triangle"){
			if(triangle_state == 0)
			{triangle_state = 1;
				x1 = positionX;
				y1 = positionY;
				hist.push(canvas.toDataURL());

				if(hist.length > 10){
					hist.shift();
				}
			}
			
			else if(triangle_state == 2){
				temp_ctx.clearRect(0,0,temp_canvas.width,temp_canvas.height);
				x3 = coordinates.x;
				y3 = coordinates.y;
				DrawTriangle(x2,x3,y2,y3,ctx);
				is_drawing = false;
				triangle_state = 0;
				}
			else if(drawing_shape == "circle"){
				hist.push(canvas.toDataURL());
				if(hist.length > 10){
						hist.shift();
					}	
				return;

				}

			}

		else{
			x1 = positionX;
        	y1 = positionY;
			hist.push(canvas.toDataURL());

			if(hist.length > 10){
				hist.shift();
			}
		}
    }


	if(drawing_shape == "none")
	{
	ctx.beginPath();
	ctx.moveTo(positionX, positionY);
	ctx.lineTo(positionX, positionY);
	ctx.stroke();
	hist.push(canvas.toDataURL());

	if(hist.length > 10){
		hist.shift();
	}
	}

}


function mouseMove(e) {
	var coordinates = getCoordinates(canvas, e); // GETS THE COORDINATES
	positionX = coordinates.x;
	positionY = coordinates.y;

    if(drawing_shape == "none"){
	    Draw(canvas, positionX, positionY); // DRAWS TO THOSE COORDINATES ( PATH BEGAN ON mouseDown FUNCTION )
	}
		else if(drawing_shape == "rect"){
        temp_ctx.clearRect(0,0,temp_canvas.width,temp_canvas.height);
        DrawRect(positionX,positionY,temp_ctx);
    }
    else if(drawing_shape == "triangle"){
        temp_ctx.clearRect(0,0,temp_canvas.width,temp_canvas.height);
		if (triangle_state == 1){
			DrawLine(x1,positionX,y1,positionY,temp_ctx);
		}

		if (triangle_state == 2){
			DrawTriangle(x2,positionX,y2,positionY,temp_ctx);
		}
    }

	else if(drawing_shape == "circle"){
		temp_ctx.clearRect(0,0,temp_canvas.width,temp_canvas.height);
		DrawCircle(positionX,positionY,temp_ctx);
	}
}


function Draw(canvas, positionX, positionY) {
	if(is_drawing) 
	{
		ctx.lineTo(positionX, positionY); 
		ctx.stroke();
		canvas.style.cursor = "pointer"; 
        temp_canvas.style.cursor = "pointer"
	}
}

function DrawCircle(posx,posy,context){
	if(is_drawing){
	context.beginPath();
	context.arc(x1,y1,Math.max(x1-posx,y1-posy,posx-x1,posy-y1),0,2*Math.PI);

	if(will_fill){
		context.fillStyle = myColor;
		context.fill();
	}
	
	context.stroke();}
	

}

function DrawRect(posx,posy,context){
    if(is_drawing){
		context.beginPath();
        context.rect(x1,y1,posx-x1,posy-y1);
        canvas.style.cursor = "pointer";
        temp_canvas.style.cursor = "pointer"

		if(will_fill){
			context.fillStyle = myColor;
			context.fill();
		}
		context.stroke();
    }
}

function DrawTriangle(x2,x3,y2,y3,context){
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
        context.lineTo(x3,y3);
		context.lineTo(x1,y1);
		if(will_fill){
			context.fillStyle = myColor;
			context.fill();
		}
        context.stroke();
}

function DrawLine(x1,x2,y1,y2,context){
	if(is_drawing){
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.stroke();
	}
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function mouseRelease(e) {


    var coordinates = getCoordinates(temp_canvas,e);
	
	canvas.style.cursor = "default"; 
    temp_canvas.style.cursor = "default";

    if(drawing_shape == "rect"){

        temp_ctx.clearRect(0,0,temp_canvas.width,temp_canvas.height);
        DrawRect(coordinates.x,coordinates.y,ctx);
    }

    else if(drawing_shape =="triangle")
    {
		if(triangle_state == 1){
			temp_ctx.clearRect(0,0,temp_canvas.width,temp_canvas.height);
			x2 = coordinates.x;
			y2 = coordinates.y;
			DrawLine(x1,x2,y1,y2,temp_ctx);
			triangle_state = 2;
			return;
		}
    }

	else if(drawing_shape == "circle"){
		DrawCircle(coordinates.x,coordinates.y,ctx);
	}
    is_drawing = false; 


}

function undofunc(){
	
		if(hist.length!=0)
		{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		var img = new Image;
		img.src = hist.pop();

		img.onload= () => {ctx.drawImage(img,0,0);}
		}

	
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// BUTTON CLICKS
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function triClick(){

	alert("The usage Instruction for Triangle: \nFirst, you need to hold your left mouse button and drag to define the bottom line of the triangle\nThen, you release the mouse button and select a top point for your triangle.");
	temp_canvas.style.display = "block";

	Colopicker.disabled=false;
	btnrange.disabled=false;

	temp_ctx.lineWidth = mySize;
	var brushColor = document.getElementById("myColor");
	myColor = brushColor.value; 

	rect.style.border = "none";
	brush.style.border = "none";
	eraser.style.border = "none";
	Pen.style.border="none";
	tri.style.border = "2px solid red";
	circle.style.border = "none";
	pen = false;
	fill.style.display = "initial"

	if(will_fill){
		fillClick();
	}

    drawing_shape = "triangle";
	triangle_state = 0;

	temp_canvas.addEventListener("mousedown",mouseDown,false);
	temp_canvas.addEventListener("mousemove",mouseMove,false);
	temp_canvas.addEventListener("mouseup",mouseRelease,false);

	temp_canvas.style.zIndex = 100;
	canvas.style.zIndex = 0;
}

function fillClick(){
	if(will_fill){
		fill.style.backgroundColor = "black";
		will_fill = false;
	}

	else{
		fill.style.backgroundColor = "red"
		will_fill = true;
	}
}

function circleClick(){
	temp_canvas.style.display = "block";

	Colopicker.disabled=false;
	btnrange.disabled=false;

	temp_ctx.lineWidth = mySize;
	var brushColor = document.getElementById("myColor");
	myColor = brushColor.value; 

	rect.style.border = "none";
	brush.style.border = "none";
	eraser.style.border = "none";
	Pen.style.border="none";
	tri.style.border = "none";
	circle.style.border = "2px solid red"; 
	fill.style.display = "initial";
	pen = false;
	if(will_fill){
		fillClick();
	}

    drawing_shape = "circle";

	temp_canvas.addEventListener("mousedown",mouseDown,false);
	temp_canvas.addEventListener("mousemove",mouseMove,false);
	temp_canvas.addEventListener("mouseup",mouseRelease,false);

	temp_canvas.style.zIndex = 100;
	canvas.style.zIndex = 0;
}

function rectClick()
{
	temp_canvas.style.display = "block";

	Colopicker.disabled=false;
	btnrange.disabled=false;

	temp_ctx.lineWidth = mySize;
	var brushColor = document.getElementById("myColor");
	myColor = brushColor.value; 

	brush.style.border = "none";
	eraser.style.border = "none";
	Pen.style.border="none";
	rect.style.border = "2px solid red";
	tri.style.border = "none";
	circle.style.border = "none";
	fill.style.display = "initial";
	pen = false;
	if(will_fill){
		fillClick();
	}

    drawing_shape = "rect";

	temp_canvas.addEventListener("mousedown",mouseDown,false);
	temp_canvas.addEventListener("mousemove",mouseMove,false);
	temp_canvas.addEventListener("mouseup",mouseRelease,false);


	temp_canvas.style.zIndex = 100;
	canvas.style.zIndex = 0;

}

function brushClick() {


	temp_canvas.style.display = "none";
	Colopicker.disabled=false;
	btnrange.disabled=false;
	ctx.lineWidth = mySize;
	
	var brushColor = document.getElementById("myColor");
	myColor = brushColor.value; 
	brush.style.border = "2px solid red";
	eraser.style.border = "none";
	Pen.style.border="none";
	rect.style.border = "none";
	tri.style.border = "none";
	circle.style.border = "none";
	fill.style.display = "none";

	pen = false;
    drawing_shape = "none";

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
	myColor = "white";
	pen = false;

	eraser.style.border = "2px solid red";
	brush.style.border = "none";
	Pen.style.border="none";
    drawing_shape = "none";
	rect.style.border = "none";
	tri.style.border = "none";
	circle.style.border = "none";
	fill.style.display = "none";


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

    drawing_shape = "none";
	Pen.style.border = "2px solid red";
	brush.style.border = "none";
	eraser.style.border = "none";
	rect.style.border = "none";
	tri.style.border = "none";
	circle.style.border = "none";
	fill.style.display = "none";
	pen = true;

	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseup", mouseRelease, false);

	temp_canvas.style.zIndex = 0;
	canvas.style.zIndex = 100;
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// WINDOW RESIZE EVENT FUNCTION
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function resize(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	temp_canvas.width = window.innerWidth;
	temp_canvas.height = window.innerHeight;
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// FUNCTIONS FOR RESET AND SAVE BUTTONS
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function resetClick() {
	window.location.reload();
}


function saveClick() {
	var data = canvas.toDataURL(); //encodes image information into a base 64 format
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
	tri.addEventListener("click",triClick);
	window.addEventListener("resize",resize);
	circle.addEventListener("click",circleClick);
	fill.addEventListener("click",fillClick);
	toolbar.addEventListener("mousemove",e => is_drawing = false);
	undo.addEventListener("click",undofunc);
	brushClick();
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
