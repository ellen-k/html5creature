// references include
//http://jlongster.com/Making-Sprite-based-Games-with-Canvas 

// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
// yay copypaste
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


function startCreature() {
  // sprites
  var creatureSprite = new Image();
  creatureSprite.src = "creature2.png"; 
  var sprite_bg = new Image();
  sprite_bg.src = "background.png";

  // TODO make sure it loaded properly before continuing



  var c=document.getElementById("canvas_pony");
  var ctx=c.getContext("2d");

  // background
  var bg = document.getElementById("canvas_bg");
  var bgtx = bg.getContext("2d");

  bgtx.drawImage(sprite_bg, 0, 0, 640, 480); //magicnums :(

  //ctx.fillStyle="#FF0000";
  //ctx.fillRect(0,0,150,75);

  // make a function to draw the creature at the loc
  window.drawCreature = function(x, y, w, h) {
   ctx.clearRect(0,0,c.width, c.height);
   ctx.drawImage(creatureSprite, x, y, w, h); 
  };

  //ctx.drawImage(creatureSprite, 50, 50, 50, 50); // x y w h ??
  main();
}
var x = 300;
var y = 200;



function main() {
    // do some stuff
  drawCreature(x, y, 100, 70);

  var x_next = 40 * ( Math.random() - 0.5);
  var y_next = 40 * ( Math.random() - 0.5);
  x += x_next ;
  y += y_next ;
  if(x > 640)  x -= 640; 
  if(x < 0)  x += 640; 
  if(y > 480)  y -= 480; 
  if(y < 0)  y += 480; 
  requestAnimFrame(main);
  console.log(x_next);
}
