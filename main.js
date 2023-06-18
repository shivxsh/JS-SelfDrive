const canvas = document.getElementById("myCanvas");
canvas.width = 200;


//First step in building a car is to get the context

const ctx = canvas.getContext("2d"); //getting the context
const road = new Road(canvas.width/2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(2),100,30,50);  // creating a new object called car from car.js



//animate the car to move
animate();

function animate(){
    car.update(road.borders);

    canvas.height=window.innerHeight;
    
    ctx.save();
//To have a camera view pinned on the car such that it feels like the road is infinitely moving
    ctx.translate(0,-car.y + canvas.height*0.8);
    road.draw(ctx);
    car.draw(ctx);
    ctx.restore();


//requestAnimationFrame calls the "animate()" method many times per second.
//This gives the illusion of movement.
    requestAnimationFrame(animate)
}