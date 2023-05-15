class Car{
    constructor(x,y,width,height){
        this.x=x; //x-axis
        this.y=y; // y-axis
        this.width=width; 
        this.height=height;
// forward - to move the car front 
        this.speed=0;
        this.acceleration=0.5;
// reverse - to stop the car
        this.maxSpeed=3;
        this.friction=0.05;

//angle - to move the car left and right in a particular angle
        this.angle=0;

        this.controls = new Controls();
    }

    //On the detection of a key in controls.js, we need to move the car
    update() {

        if(this.controls.forward){
            //In a computer, the y axis increases downward.
            // this.y-=2;  
            this.speed += this.acceleration;
        }

        if(this.controls.reverse){
            // this.y+=2;
            this.speed -= this.acceleration;
        }

        //Speed for moving forward
        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }

        //Speed for moving in reverse : hence '-' sign
        if(this.speed< -this.maxSpeed){
            this.speed = -this.maxSpeed/2;
        }

        if(this.speed > 0){
            this.speed -= this.friction;
        }

        if(this.speed < 0){
            this.speed += this.friction;
        }
        // To stop the car from moving when idle:
        if(Math.abs(this.speed) < this.friction){
            this.speed=0;
        }


        //Moving left and right :
        if(this.controls.left){
            // this.x-=2;
            this.angle-=0.03;
        }
        if(this.controls.right){
            // this.x+=2;
            this.angle+=0.03;
        }
        this.y-=this.speed;
    }
    
    //draw() method gets a "context" as its parameter
    draw(ctx){
        
        //To rotate the car :
        ctx.save(); //save the context first
        ctx.translate(this.x,this.y); //translate() - Moves the canvas from the original position to the new x and y position
        ctx.rotate(this.angle); //Rotates the car left or right 

        ctx.beginPath();
        ctx.rect(
        //x = center of the car. It will have parts in front, left, right and to the bottom of it.    
            -this.width/2, //This will subtract the height and width from the translated position.
            -this.height/2, //This will subtract the height and width from the translated position.
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();  //restore the context. Otherwise it will infinitely translate the x and y axis.
    }
}