const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;


//First step in building a car is to get the context

const carCtx = carCanvas.getContext("2d"); //getting the context
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
const car = new Car(road.getLaneCenter(2),100,30,50,"AI");  // creating a new object called car from car.js
//Array of cars : traffic
const traffic = [
    new Car(road.getLaneCenter(2), -100,30,50, "DUMMY",2),
];



//animate the car to move
animate();

function animate(){

    function generateCars(N){
        
    }

    for(let i=0; i<traffic.length; i++){
        traffic[i].update(road.borders,[]);  //Empty array so the traffic cars wont interact with itself and get damaged.
    }
    car.update(road.borders, traffic);

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    
    carCtx.save();
//To have a camera view pinned on the car such that it feels like the road is infinitely moving
    carCtx.translate(0,-car.y + carCanvas.height*0.8);
    road.draw(carCtx);
    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(carCtx,"red");
    }
    car.draw(carCtx, "blue");

    carCtx.restore();

    
    Visualizer.drawNetwork(networkCtx, car.brain);
    

//requestAnimationFrame calls the "animate()" method many times per second.
//This gives the illusion of movement.
    requestAnimationFrame(animate)
}