const canvas = document.getElementById("myCanvas");
canvas.width = 200;


//First step in building a car

const ctx = canvas.getContext("2d"); //getting the context
const car = new Car(100,100,30,50);  // creating a new object called car from car.js
car.draw(ctx);


//animate the car to move
animate();

function animate(){
    car.update();

    canvas.height=window.innerHeight;
    
    car.draw(ctx);
//requestAnimationFrame calls the "animate()" method many times per second.
//This gives the illusion of movement that we need
    requestAnimationFrame(animate)
}