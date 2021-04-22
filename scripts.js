


// CANVAS STARTER CODE, GETS THE CANVAS OBJECTS AND FILLS IT WITH WHITE COLOR TO BEGIN.
var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext('2d');

let canvas_x = 0;
let canvas_y = 0;

const canvas_width = canvas.width;
const canvas_height = canvas.height;

context.fillStyle = "white";
context.fillRect(0, 0, canvas_width, canvas_height);


// GETTING BUTTONS AS OBJECT TO BE FORWARDED TO THE LISTENERS. THIS PART WILL BE MUCH LONGER.

var eraser_button = document.getElementById("eraser");
var brush_button = document.getElementById("brush")

// BUTTON LISTENERS THAT DECIDE WHICH PROPERTIES TO BE USED, MORE WILL BE ADDED

eraser_button.addEventListener("click",(e)=>
{
  selected_tool = "eraser";
  brush_button.style.backgroundColor = "white;";
  eraser_button.style.backgroundColor = "black;";

});


brush_button.addEventListener("click",(e)=>
{selected_tool="brush";
brush_button.style.backgroundColor = "black;";
eraser_button.style.backgroundColor = "white;";
});

//

// FOR NOW
var selected_color = "black";
var selected_thickness = 20;
var selected_tool = "brush";



    ///////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    ///////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    ///////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@  @@@  @@       @@       @@@@
    ///////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@         @@  @@@  @@  @@@  @@  @@@@@@@@@
    ///////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@  @@@  @@  @@@  @@  @@@@@@@@@ FORGET IT I CANT WRITE THE S LETTER THIS WAY
    ///////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@  @@@  @@  @@@  @@  @@@@@@@@@
    ///////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   @@@@@@@@       @@  @@@  @@       @@@@
    ///////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



    // THIS ONE ERASES AS EXPECTED. WE ONLY PROVIDE X and Y as parameters to those funcs because we have variables for thickness and color.
  function erase(x,y)
  {
    context.beginPath();
    context.arc( x - canvas_x , y - canvas_y , selected_thickness, 0 , 2 * Math.PI );
    context.fillStyle = "white";
    context.fill();
    context.strokeStyle="white";
    context.stroke();
  }

  // THIS ONE ACTS AS A BRUSH. ITS BIGGEST PROBLEM IS WHEN MOUSE MOVES FAST, IT JUST LEAVES UGLY CIRCLES THERE.
  function brush_draw(x,y)
  {
    context.beginPath();
    context.arc( x - canvas_x , y - canvas_y , selected_thickness, 0 , 2 * Math.PI );
    context.fillStyle = selected_color;
    context.fill();
    context.strokeStyle = selected_color;
    context.stroke();
  }

  


  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ LISTENERS OF CANVAS HERE. I'M PLANNING TO MAKE A BEAUTIFUL COMMENT FOR THAT PART TOO BUT NOT NOW. MOST OF THE PROBLEMS OCCUR HERE.
  
canvas.addEventListener("mousemove", (e) => {

      canvas_x = e.target.offsetLeft;
      canvas_y = e.target.offsetTop;
      
      if (e.buttons === 1) {
        if ( selected_tool == "brush"){
          brush_draw(e.x,e.y);
        }
        else if (selected_tool == "eraser"){
          erase(e.x,e.y);
        }
      }
    }
  );

canvas.addEventListener("mousedown",(e)=>
  {
    if ( selected_tool == "brush"){
      brush_draw(e.x,e.y);
    }
    else if (selected_tool == "eraser"){
      erase(e.x,e.y);
    }
  }
  );
