// const streetWidth = 150;
// const margin = ((width + height) / 2) / 16;

var carTrafficLight = new Array();

var pedestrianTrafficLight = new Array();;

var street;

var myValues = null;

require('electron').ipcRenderer.on('update-value', function (event, values) {
  myValues = values;
})

function setup() {

  // createCanvas(1024, 1024);
  createCanvas(windowWidth < windowHeight ? windowWidth : windowHeight, windowWidth < windowHeight ? windowWidth : windowHeight);

  const margin = ((width + height) / 2) / 16;
  const streetWidth = ((width + height) / 2) / 5;

  carTrafficLight.push(new CarTrafficLight(width / 2 - streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 20, "up", margin));
  carTrafficLight.push(new CarTrafficLight(width / 2 + streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 20, "right", margin));
  carTrafficLight.push(new CarTrafficLight(width / 2 + streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 20, "down", margin));
  carTrafficLight.push(new CarTrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 20, "left", margin));

  
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 - streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 50, "up-right", margin/2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 + streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 50, "right-left", margin/2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 + streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 50, "right-down", margin/2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 + streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 50, "down-up", margin/2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 + streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 50, "down-left", margin/2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 50, "left-right", margin/2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 - streetWidth, height / 2 + streetWidth, ((width + height) / 2) / 50, "left-up", margin/2));
  pedestrianTrafficLight.push(new PedestrianTrafficLight(width / 2 - streetWidth, height / 2 - streetWidth, ((width + height) / 2) / 50, "up-down", margin/2));

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
    for (let i = 1; i <= 8; i++) {
      pedestrianTrafficLight[i - 1].update(myValues['Lampe H' + i + '.7'], myValues['Lampe H' + i + '.8']);
      pedestrianTrafficLight[i].update(myValues['Lampe H' + i + '.7'], myValues['Lampe H' + i + '.8']);
      i++;
    }

  }
}