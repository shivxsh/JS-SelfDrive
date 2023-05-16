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

        this.sensor = new Sensor(this);  //We pass the car object to this sensor constructor. Hence we use "this"

        this.controls = new Controls();
    }

    //On the detection of a key in controls.js, we need to move the car
    update() {
        this.#move();
        this.sensor.update();
    }

    #move(){
        
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
        if(this.speed!=0){
//We find if the car is going forward or reverse and store the value 1 or -1 accordingly.
            const flip = this.speed>0 ? 1 : -1;
            if(this.controls.left){
                // this.x-=2;
                this.angle += 0.03 * flip; //Inverts the right and left key for reverse. (angle * -1)
            }
            if(this.controls.right){
                // this.x+=2;
                this.angle -= 0.03 * flip;
            }
        }
        
        //this.y-=this.speed;
        
//https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:trig/x2ec2f6f830c9fb89:unit-circle/v/unit-circle-definition-of-trig-functions-1
//Visit this link to know about sin and cos in a unit circle for rotations. Same is applied here.

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }
    
    //draw() method gets a "context" as its parameter
    draw(ctx){
        
        //To rotate the car :
        ctx.save(); //save the context first
        ctx.translate(this.x,this.y); //translate() - Moves the canvas from the original position to the new x and y position
        ctx.rotate(-this.angle); //Rotates the car left or right 

        ctx.beginPath();
        ctx.rect(
        //x = center of the car. It will have parts in front, left, right and to the bottom of it.    
            - this.width/2, //This will subtract the height and width from the translated position.
            - this.height/2, //This will subtract the height and width from the translated position.
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();  //restore the context. Otherwise it will infinitely translate the x and y axis.

        this.sensor.draw(ctx); //The car now has the ability to draw its own sensors.
    }
}