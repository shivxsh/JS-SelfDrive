const canvas = document.getElementById("myCanvas");
canvas.width = 400;


//First step in building a car is to get the context

const ctx = canvas.getContext("2d"); //getting the context
const road = new Road(canvas.width/2, canvas.width*0.9);
const car = new Car(200,200,30,50);  // creating a new object called car from car.js
car.draw(ctx);


//animate the car to move
animate();

function animate(){
    car.update();

    canvas.height=window.innerHeight;
    
    road.draw(ctx);
    car.draw(ctx);
//requestAnimationFrame calls the "animate()" method many times per second.
//This gives the illusion of movement.
    requestAnimationFrame(animate)
}