// references include
//http://jlongster.com/Making-Sprite-based-Games-with-Canvas 

// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();




// I want this
function assert(exp, message) {
  if( exp) {
    return ;
  } else {
    console.error(message) ;
    debugger ;
  }
}

function setup() {
  //  assert(false, "wtf");

  // make some new GLOBAL canvases
  bg_view = new Playfield("bg", 1, new Sprite("background.png", 640, 480) );
  pony_view = new Playfield("pony", 2, new Sprite("creature2.png", 100, 70) );

}

// TODO make sure sprites are loaded!!
function Sprite(img, def_width, def_height) {
  this.image = new Image();
  this.image.src = img ;

  this.default_width = def_width ;
  this.default_height = def_height ;  
}

// sets up a canvas with id and zindex
// and only give it one sprite for now
function Playfield(id, z_index, sprite) {

  this.width = 640 ;
  this.height = 480 ;
  this.canvas_id = "canvas_" + id ;
  this.container_id = "div_" + id ;
  this.z_index = z_index ;
  this.sprite = sprite ;

  // find the div with this id and fill it with a canvas
  var new_canvas = ['<canvas id="', this.canvas_id,
                    '" width="', this.width,
                    '" height="', this.height,
                    'style="z-index:', this.z_index,
                    ';"></canvas>'].join("") ;
                    
  document.getElementById(this.container_id).innerHTML = new_canvas ;

  this.canvas = document.getElementById(this.canvas_id) ;
  this.context = this.canvas.getContext("2d");

  this.clear = function() {
    this.context.clearRect(0, 0, this.width, this.height);
  } ;


  // draws this's sprite with width and height
  // if they dont exist, use default
  this.draw = function(x, y, width, height) {
    this.clear(); // may want to make this optional
    assert(width || this.sprite.default_width, "no sprite width in draw"); 
    assert(height || this.sprite.default_height, "no height for spreight in draw"); 
    var draw_width = width ? width : sprite.default_width ; 
    var draw_height = height ? height : sprite.default_height ; 
    this.context.drawImage(this.sprite.image, x, y, draw_width, draw_height);
  }

}


function startCreature() {
  setup() ; // make canvases
  bg_view.draw(0,0) ;
  main();
}


// put these somewhere else
var x = 300;
var y = 200;
var w = 100;
var h = 70;



// less magic should be here
function main() {
    // do some stuff

  var x_next = 40 * ( Math.random() - 0.5);
  var y_next = 5 * ( Math.random() - 0.5);
  x += x_next ;
  y += y_next ;
  if(x > 640)  x -= 640; 
  if(x < 0)  x += 640; 
  if(y > 480)  y -= 480; 
  if(y < 0)  y += 480; 

  // resizey pony in perspective!
  // 1 size at top,  4x full size at bottom. top = 0 , bott = 480
  var scaling = y / 120 ;

  pony_view.draw(x, y, w * scaling, h * scaling);
  requestAnimFrame(main);
}
