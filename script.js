/*
  Blowing Text
  Johan Karlsson 
  2016-04-06
*/

var settings = {
  startDelay: 60,
  text: "Blowing Away",
  textSize: 120,
  gravity: 0.15,
  speed: 3 };


class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = Math.random() * 2 * settings.speed;
    this.vy = (Math.random() - 0.5) * settings.speed;
    this.delay = Math.random() * 200;
  }

  move(now) {
    if (now > this.delay) {
      //tick -= this.delay;
      this.x += this.vx + settings.gravity * now * now / 20000;
      this.y += this.vy + settings.gravity * now * now / 10000;
    }
  }}


let ctx;
let w, h;
let particles;
let startTimeStamp;

function setup() {
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resize();
  setupParticles();
  window.addEventListener("resize", resize);
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function setupParticles() {
  particles = [];
  let min = Math.min(w, h);
  let margin = min * 0.2;
  let xMargin = (w - margin * 2) / 2;
  let yMargin = (h - margin * 2) / 2;
  let color = [0, 0, 0, 255];
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      if (x > xMargin && x < w - xMargin && y > yMargin && y < h - yMargin) {
        // There is a pixel here, add a particle
        particles.push(new Particle(
        x,
        y,
        color));
      }
    }
  }

  console.log(`Number of particles: ${particles.length}`);
}

function draw(n) {
  let now = (n - startTimeStamp) / 1000 * 60;
  requestAnimationFrame(draw);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "black";
  particles.forEach(p => {
    var x = Math.round(p.x);
    var y = Math.round(p.y);
    if (x >= 0 && x < w && y >= 0 && y < h) {
      ctx.fillRect(x, y, 1, 1);
    }
    if (now > settings.startDelay) {
      // Start explosion after delay
      p.move(now - settings.startDelay);
    }
  });
}

window.onload = function () {
  setup();
  startTimeStamp = performance.now();
  console.log(startTimeStamp);
  draw(startTimeStamp);
};