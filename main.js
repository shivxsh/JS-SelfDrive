const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;


//First step in building a car is to get the context

const carCtx = carCanvas.getContext("2d"); //getting the context
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width/2, carCanvas.width*0.9);

const N = 100; //100 cars generated
const cars = generateCars(N);


//Array of cars : traffic
const traffic = [
    new Car(road.getLaneCenter(2), -100,30,50, "DUMMY",2),
];



//animate the car to move
animate();


function generateCars(N){
    const cars=[];
    for(let i=1; i<=N; i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50, "AI"));
    }
    return cars;
}


function animate(){

    for(let i=0; i<traffic.length; i++){
        traffic[i].update(road.borders,[]);  //Empty array so the traffic cars wont interact with itself and get damaged.
    }

    for(let i=0; i<cars.length; i++){
        cars[i].update(road.borders, traffic);
    }

    const bestCar = cars.find(
        c=> c.y== Math.min(...cars.map(c=>c.y))
    );

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    
    carCtx.save();
//To have a camera view pinned on the car such that it feels like the road is infinitely moving
    carCtx.translate(0,-bestCar.y + carCanvas.height*0.8);


    road.draw(carCtx);
    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(carCtx,"red");
    }

    carCtx.globalAlpha = 0.2;
    for(let i=0; i<cars.length; i++){
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true);

    carCtx.restore();

    
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    

//requestAnimationFrame calls the "animate()" method many times per second.
//This gives the illusion of movement.
    requestAnimationFrame(animate)
}
