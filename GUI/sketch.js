
// TrafficLights
var carTrafficLight = new Array();
var pedestrianTrafficLight = new Array();
var constructionTrafficLight = new Array();

// Buttons
var pedestrianButton = new Array();

// Streetlines
var street;

// Object
var myValues = null;

function setup() {

  // createCanvas(1024, 1024);
  createCanvas(windowWidth < windowHeight ? windowWidth : windowHeight, windowWidth < windowHeight ? windowWidth : windowHeight);

  const margin = ((width + height) / 2) / 16;
  const streetWidth = ((width + height) / 2) / 5;

  carTrafficLight.push(new CarTrafficLight(width / 2 - streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 20, "up", margin));
  carTrafficLight.push(new CarTrafficLight(width / 2 + streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 20, "right", margin));
  carTrafficLight.push(new CarTrafficLight(width / 2 + streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 20, "down", margin));
  carTrafficLight.push(new CarTrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 20, "left", margin));

  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 - streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 50, "up-right", margin / 2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 + streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 50, "right-left", margin / 2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 + streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 50, "right-down", margin / 2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 + streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 50, "down-up", margin / 2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 + streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 50, "down-left", margin / 2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 50, "left-right", margin / 2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 50, "left-up", margin / 2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 - streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 50, "up-down", margin / 2));

  constructionTrafficLight.push(new ConstructionTrafficLight(width / 2 - streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 50, "up", margin / 2));
  constructionTrafficLight.push(new ConstructionTrafficLight(width / 2 + streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 50, "right", margin / 2));
  constructionTrafficLight.push(new ConstructionTrafficLight(width / 2 + streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 50, "down", margin / 2));
  constructionTrafficLight.push(new ConstructionTrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 50, "left", margin / 2));

  street = new Street(width, height, streetWidth);

  pedestrianButton.push(new PedestrianButton(width / 2 - streetWidth, height / 2 - streetWidth, margin, "up-down", "go"));
  pedestrianButton.push(new PedestrianButton(width / 2 - streetWidth, height / 2 - streetWidth, margin, "up-right", "go"));
  pedestrianButton.push(new PedestrianButton(width / 2 + streetWidth, height / 2 - streetWidth, margin, "right-left", "go"));
  pedestrianButton.push(new PedestrianButton(width / 2 + streetWidth, height / 2 - streetWidth, margin, "right-down", "go"));
  pedestrianButton.push(new PedestrianButton(width / 2 + streetWidth, height / 2 + streetWidth, margin, "down-up", "go"));
  pedestrianButton.push(new PedestrianButton(width / 2 + streetWidth, height / 2 + streetWidth, margin, "down-left", "go"));
  pedestrianButton.push(new PedestrianButton(width / 2 - streetWidth, height / 2 + streetWidth, margin, "left-right", "go"));
  pedestrianButton.push(new PedestrianButton(width / 2 - streetWidth, height / 2 + streetWidth, margin, "left-up", "go"));

  for (let button of pedestrianButton) {
    button.create();
  }
}

function draw() {

  // Event to Node
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

  // ConstructionTrafficLight
  for (let light of constructionTrafficLight) {
    light.draw();
  }

  // Update States
  update();

}

function update() {
  if (myValues !== null) {
    // Update Car Trafficlights
    for (let i = 1; i <= 4; i++) {
      carTrafficLight[i - 1].update(myValues['Lampe H' + i + '.1'], myValues['Lampe H' + i + '.2'], myValues['Lampe H' + i + '.3']);
    }

    // Update Pedestrian Trafficlights
    var j = 1;
    for (let i = 1; i <= 8; i += 2) {
      pedestrianTrafficLight[i - 1].update(myValues['Lampe H' + j + '.7'], myValues['Lampe H' + j + '.8']);
      pedestrianTrafficLight[i].update(myValues['Lampe H' + j + '.7'], myValues['Lampe H' + j + '.8']);
      j++;
    }

    // Update Construction TrafficLights
    for (let i = 1; i <= 4; i++) {
      constructionTrafficLight[i - 1].update(myValues['Lampe H' + i + '.4'], myValues['Lampe H' + i + '.5'], myValues['Lampe H' + i + '.6']);
    }
  }
}

function greet() {
  console.log("Pressed");
}

// Events from Node
require('electron').ipcRenderer.on('update-value', (event, values) => { myValues = values; })