//bg
let maxRadius; // For lines
let bgLayer; // background layer
//planets
let sun = 30; // Sun
let angle = 0; // Sun rotation
let mercuryOrbitRadius = 50;
let venusOrbitRadius = 100;
let earthOrbitRadius = 150;
let marsOrbitRadius = 200;
let jupiterOrbitRadius = 250;
let saturnOrbitRadius = 300;
let uranusOrbitRadius = 350;
let neptuneOrbitRadius = 400;
//CME
let particles = [];
let numParticles = 300;
let cmeData = { latitude: 50, speed: 0.005 };
let showParticles = true;
//FLR
let waves = [];
let numWaves = 15;
let showWaves = true;
let transparency

function setup() {
  createCanvas(1000, 1000);
  maxRadius = 30;
  bgLayer = createGraphics(width, height);
  // reference: The Coding Train. https://www.youtube.com/watch?v=TaluaAD9MKA

  drawBackground();

  //Draw CME particles
  let parRadius = 50;
  for (let i = 0; i < numParticles; i++) {
    let angle = map(i, 0, numParticles, 0, TWO_PI);
    let x = parRadius * cos(angle);
    let y = parRadius * sin(angle);
    particles.push(new Particle(x, y, angle));
  }

  getCME();

  //Draw FLR waves
  let flrRadius = 50;
  for (let i = 0; i < numWaves; i++) {
    waves.push(new Wave(0, 0, flrRadius, random(5, 20), random(1, 5)));
    flrRadius += random(20, 80);
  }

  getFLR();

  //button for CME
  let buttonCME = createButton('CME');
  buttonCME.position(900, 900);
  buttonCME.mousePressed(cmeParticles);

  buttonCME.style('background-color', '#7474C1');
  buttonCME.style('color', 'white');
  buttonCME.style('padding', '10px 20px'); 
  buttonCME.style('border', 'none'); 
  buttonCME.style('border-radius', '20px'); 
  buttonCME.style('font-size', '16px'); 
  //reference: https://p5js.org/reference/#/p5.Element/style in examples

  //button for FLR
  let buttonFLR = createButton('FLR');
  buttonFLR.position(900, 850);
  buttonFLR.mousePressed(flrWaves);

  buttonFLR.style('background-color', '#7C7FAB');
  buttonFLR.style('color', 'white');
  buttonFLR.style('padding', '10px 20px'); 
  buttonFLR.style('border', 'none'); 
  buttonFLR.style('border-radius', '20px'); 
  buttonFLR.style('font-size', '16px'); 
  
}

//show and hide CME when click on button
function cmeParticles() {
  showParticles = !showParticles; 
}

//show and hide FLR when click on button
function flrWaves() {
  showWaves = !showWaves;
}

//rotation of the planets
function draw() {
  background(30, 30, 48);
  
  image(bgLayer, 0, 0, width, height);
  translate(width / 2, height / 2);

  //rotate sun
  push();
  rotate(angle);
  drawSun();
  angle += 0.001;
  pop();

  
  //CME
  if (showParticles) {
    for (let particle of particles) {
      particle.update();
      particle.show();
    }
  }

   //FLR
   if (showWaves) {
    for (let wave of waves) {
      wave.update();
      wave.show();
    }
  }

  //rotate mercury
  push();
  rotate(angle*0.479);
  drawMercury();
  angle += 0.001;
  pop();

  //rotate venus
  push();
  rotate(angle*0.35);
  drawVenus();
  angle += 0.001;
  pop();

  //rotate earth
  push();
  rotate(angle*0.298);
  drawEarth();
  angle += 0.001;
  pop();

  //rotate mars
  push();
  rotate(angle*0.241);
  drawMars();
  angle += 0.001;
  pop();

  //rotate jupiter
  push();
  rotate(angle*0.131);
  drawJupiter();
  angle += 0.001;
  pop();

  //rotate saturn
  push();
  rotate(angle*0.097);
  drawSaturn();
  angle += 0.001;
  pop();

  //rotate uranus
  push();
  rotate(angle*0.068);
  drawUranus();
  angle += 0.001;
  pop();

  //rotate neptune
  push();
  rotate(angle*0.054);
  drawNeptune();
  angle += 0.001;
  pop();
}

//background lines
 function drawBackground() {
   bgLayer.translate(width / 2, height / 2);
  bgLayer.push()
  let totalLines = 2200;
  let innerColor = color(255, 69, 0); 
  let outerColor = color(255, 255, 224); 

  //draw the lines in the bg
  for (let i = 0; i < totalLines; i++) {
    // Code reference: https://p5js.org/reference/#/p5/randomGaussian, example 2
    let r = randomGaussian(width * 0.2, width * 0.25);
    let theta = random(TWO_PI);

    let x1 = r * cos(theta);
    let y1 = r * sin(theta);
    let rOffset = random(-10, 50);
    let x2 = (r + rOffset) * cos(theta);
    let y2 = (r + rOffset) * sin(theta);

    let gradient = map(r, 50, width * 0.3, 0.4, 1); 
    let col = lerpColor(innerColor, outerColor, gradient); 

     bgLayer.stroke(col);
     bgLayer.line(x1, y1, x2, y2);
  }


  // Draw stars
  let stars = 500;
  for (let i = 0; i < stars; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    let r = random(5, 20);
    let colorofStars = color(random(40, 50), random(20, 40), random(50, 100));
    bgLayer.noStroke();
    bgLayer.fill(colorofStars);
    bgLayer.ellipse(x, y, r);
  }
    bgLayer.pop()
}

//Draw sun
function drawSun() {
  noFill();
  stroke(247, 209, 126);
  for (let i = 0; i < sun; i++) {
    let radius = map(i, 0, sun, 0, maxRadius);
    let offset = map(i, 0, sun, 0, TWO_PI);
    drawSunOffset(radius, offset);
  }
}

// Draw the offset of the spiral
function drawSunOffset(radius, offset) {
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let x = (radius + noise(a + offset) * 10) * cos(a);
    let y = (radius + noise(a + offset) * 10) * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
}

//Draw Mercury
function drawMercury(){
  let x = mercuryOrbitRadius * cos(angle);
  let y = mercuryOrbitRadius * sin(angle);

  fill(167, 99, 137, 250);
  noStroke();
  ellipse(x, y, 20, 20);

  fill(139, 93, 143, 250);
  noStroke();
  ellipse(x, y, 10, 10);
}

//Draw Venus
function drawVenus(){
  let x = venusOrbitRadius * cos(angle);
  let y = venusOrbitRadius * sin(angle);

  fill(99, 93, 143, 200);
  noStroke();
  ellipse(x, y, 30, 30);

  fill(94, 54, 110, 250);
  noStroke();
  ellipse(x, y, 20, 20);

  fill(122, 65, 131, 250);
  noStroke();
  ellipse(x, y, 10, 10);
}

//Draw Earth
function drawEarth() {
  let x = earthOrbitRadius * cos(angle);
  let y = earthOrbitRadius * sin(angle);

  fill(191, 42, 89, 200);
  noStroke();
  ellipse(x, y, 40, 40);

  fill(205, 84, 91, 200);
  noStroke();
  ellipse(x, y, 30, 30);

  fill(201, 128, 158, 200);
  noStroke();
  ellipse(x, y, 20, 20);

  fill(165, 127, 178, 200);
  noStroke();
  ellipse(x, y, 10, 10);
}

//Draw Mars
function drawMars() {
  let x = marsOrbitRadius * cos(angle);
  let y = marsOrbitRadius * sin(angle);

  fill(162, 120, 156, 200);
  noStroke();
  ellipse(x, y, 40, 40);

  fill(167, 99, 137, 200);
  noStroke();
  ellipse(x, y, 30, 30);

  fill(181, 92, 128, 200);
  noStroke();
  ellipse(x, y, 20, 20);

  fill(176, 74, 90, 200);
  noStroke();
  ellipse(x, y, 10, 10);
}

//Draw Jupiter
function drawJupiter() {
  let x = jupiterOrbitRadius * cos(angle);
  let y = jupiterOrbitRadius * sin(angle);

  fill(167, 99, 137, 200);
  noStroke();
  ellipse(x, y, 50, 50);

  fill(161, 90, 149, 200);
  noStroke();
  ellipse(x, y, 40, 40);

  fill(147, 90, 161, 200);
  noStroke();
  ellipse(x, y, 30, 30);

  fill(111, 80, 145, 200);
  noStroke();
  ellipse(x, y, 20, 20);

  fill(93, 71, 119, 200);
  noStroke();
  ellipse(x, y, 10, 10);
}

//Draw Saturn
function drawSaturn() {
  let x = saturnOrbitRadius * cos(angle);
  let y = saturnOrbitRadius * sin(angle);

  fill(97, 75, 121, 200);
  noStroke();
  ellipse(x, y, 50, 50);

  fill(86, 82, 148, 200);
  noStroke();
  ellipse(x, y, 40, 40);

  fill(104, 110, 159, 200);
  noStroke();
  ellipse(x, y, 30, 30);

  fill(103, 116, 158, 200);
  noStroke();
  ellipse(x, y, 20, 20);

  fill(103, 130, 158, 200);
  noStroke();
  ellipse(x, y, 10, 10);
}

//Draw Uranus
function drawUranus() {
  let x = uranusOrbitRadius * cos(angle);
  let y = uranusOrbitRadius * sin(angle);

  fill(150, 120, 211, 200);
  noStroke();
  ellipse(x, y, 40, 40);

  fill(132, 116, 194, 200);
  noStroke();
  ellipse(x, y, 30, 30);

  fill(96, 99, 179, 200);
  noStroke();
  ellipse(x, y, 20, 20);

  fill(96, 110, 178, 200);
  noStroke();
  ellipse(x, y, 10, 10);
}

//Draw Neptune
function drawNeptune() {
  let x = neptuneOrbitRadius * cos(angle);
  let y = neptuneOrbitRadius * sin(angle);

  fill(169, 106, 217, 200);
  noStroke();
  ellipse(x, y, 40, 40);

  fill(201, 100, 207, 200);
  noStroke();
  ellipse(x, y, 30, 30);

  fill(229, 109, 177, 200);
  noStroke();
  ellipse(x, y, 20, 20);

  fill(223, 70, 97, 200);
  noStroke();
  ellipse(x, y, 10, 10);
}

//Date formatting. To be used in retrieving the right api website link
function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  // the formatting of the date: codes from Aelios response in this thread https://stackoverflow.com/questions/12409299/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript-and-append-it-to-an-i
}

//fetching CME data
function getCME() {
  const startDate = getFormattedDate();
  const endDate = getFormattedDate();
  const apiKey = 'MpCc7iSHhOezu44KEa9b2druZYxasAlAcvgbM9YA'; 
  const url = `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
  loadJSON(url, processCME);
}

//process CME data
function processCME(data) {
  // I got into trouble here as I found there are multiple activities happening in a day, so I need to only select the numbers from the latest activity. I searched online for tutorials on this part, while I couldn't find a useful one. I asked ChatGPT for this part of code.
  if (data && Array.isArray(data) && data.length > 0) {
    data.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    
    const cmeEvent = data[0];

    const cmeAnalysis = cmeEvent.cmeAnalyses ? cmeEvent.cmeAnalyses[0] : null;
    if (cmeAnalysis) {
      const latitude = cmeAnalysis.latitude;
      let speed = cmeAnalysis.speed;
      
      if (typeof speed === 'number') {
        speed = speed / 1000;
      }
      cmeData = { latitude, speed };
  } else {
    cmeData = { latitude: 50, speed: 0.005 };
  }
}
}

// create the particles that represent CME
class Particle {
  constructor(x, y, angle) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.offset = random(-10, cmeData.latitude);
    this.speed = random(cmeData.speed / 2, cmeData.speed * 2);
    this.radius = random(5, 10);
  }

  update() {
    this.x = this.baseX + cos(this.angle) * this.offset;
    this.y = this.baseY + sin(this.angle) * this.offset;
    this.angle += this.speed;
  }

  show() {
    fill(237, 189, 92);
    noStroke();
    ellipse(this.x, this.y, 5);
  }
}

//fetching FLR data
function getFLR() {
  const startDate = getFormattedDate();
  const endDate = getFormattedDate();
  const apiKey = 'MpCc7iSHhOezu44KEa9b2druZYxasAlAcvgbM9YA'; 
  const url = `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
  loadJSON(url, processFLR);
}

function processFLR(data) {
  if (data && Array.isArray(data) && data.length > 0) {
    data.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    const flrEvent = data[0];
    transparency = 255; 
  } else {
    transparency = 150; 
  }
}

function gotData(data) {
  processFLR(data);
}

// create waves to present FLR
class Wave {
  constructor(x, y, radius, height, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.height = height;
    this.speed = speed;
    this.angle = 0;
  }

  update() {
    this.angle += this.speed * 0.01;
  }

  show() {
    push();
    translate(this.x, this.y);
    stroke(93, 71, 119, transparency); 
    noFill();
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.01) {
      let offset = map(sin(a * 3 + this.angle), -1, 1, -this.height, this.height);
      let r = this.radius + offset;
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

