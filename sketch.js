const streetWidth = 150;
const margin = 50;

var carTrafficLight = new Array();

var street;

var myValues = null;

function setup() {

  createCanvas(800, 800);
  carTrafficLight.push(new TrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, 40, "left", margin));
  carTrafficLight.push(new TrafficLight(width / 2 + streetWidth, height / 2 - streetWidth, 40, "right", margin));
  carTrafficLight.push(new TrafficLight(width / 2 - streetWidth, height / 2 - streetWidth, 40, "up", margin));
  carTrafficLight.push(new TrafficLight(width / 2 + streetWidth, height / 2 + streetWidth, 40, "down", margin));

  street = new Street(width, height, streetWidth);
}

 
function draw() {

  require('electron').ipcRenderer.send('need-update');

  background(51);

  // Street
  street.draw();

  // Trafficlight
  for (let light of carTrafficLight) {
    light.draw();
  }

  if (myValues !== null) {
  
    carTrafficLight[0].update(myValues['Lampe H4.1'], myValues['Lampe H4.2'], myValues['Lampe H4.3']);
    carTrafficLight[1].update(myValues['Lampe H2.1'], myValues['Lampe H2.2'], myValues['Lampe H2.3']);
    carTrafficLight[2].update(myValues['Lampe H1.1'], myValues['Lampe H1.2'], myValues['Lampe H1.3']);
    carTrafficLight[3].update(myValues['Lampe H3.1'], myValues['Lampe H3.2'], myValues['Lampe H3.3']);
  
  }
}

require('electron').ipcRenderer.on('update-value', function (event, values)
{
  myValues = values;
})

function streetDraw() {
  noStroke();
  fill(255);
  rect(width / 2 - streetWidth, 0, 20, height / 2 - streetWidth + 20);
  rect(width / 2 + streetWidth, 0, 20, height / 2 - streetWidth + 20);
  rect(width / 2 - streetWidth, height / 2 + streetWidth, 20, height / 2 - streetWidth);
  rect(width / 2 + streetWidth, height / 2 + streetWidth, 20, height / 2 - streetWidth);
  rect(0, height / 2 - streetWidth, width / 2 - streetWidth, 20);
  rect(0, height / 2 + streetWidth, width / 2 - streetWidth, 20);
  rect(width / 2 + streetWidth, height / 2 - streetWidth, width / 2 - streetWidth, 20);
  rect(width / 2 + streetWidth, height / 2 + streetWidth, width / 2 - streetWidth, 20);
}






