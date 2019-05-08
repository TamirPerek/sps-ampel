const streetWidth = 150;
const margin = 50;

// Trafficlights
var carTrafficLight = new Array();
var pedestrianTrafficLight = new Array();
var constructionTrafficLight = new Array();

var street;

var myValues = null;

require('electron').ipcRenderer.on('update-value', function (event, values) {
  myValues = values;
})

function setup() {

  createCanvas(800, 800);

  carTrafficLight.push(new CarTrafficLight(width / 2 - streetWidth, height / 2 - streetWidth, 40, "up", margin));
  carTrafficLight.push(new CarTrafficLight(width / 2 + streetWidth, height / 2 - streetWidth, 40, "right", margin));
  carTrafficLight.push(new CarTrafficLight(width / 2 + streetWidth, height / 2 + streetWidth, 40, "down", margin));
  carTrafficLight.push(new CarTrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, 40, "left", margin));

  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, 15, "left-up", 30));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, 15, "left-right", 30));

  street = new Street(width, height, streetWidth);
}

function draw() {

  require('electron').ipcRenderer.send('need-update');

  background(51);

  // Street
  street.draw();

  // CarTrafficlight
  for (let light of carTrafficLight) {
    light.draw();
  }

  // PedestrianTrafficlight
  for (let light of pedestrianTrafficLight) {
    light.draw();
  }

  if (myValues !== null) {
    for (let i = 1; i <= 4; i++) {
      carTrafficLight[i - 1].update(myValues['Lampe H' + i + '.1'], myValues['Lampe H' + i + '.2'], myValues['Lampe H' + i + '.3']);
    }
  }
}