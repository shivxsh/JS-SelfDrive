class Car{
    constructor(x,y,width,height,controlType, maxSpeed=3){
        this.x=x; //x-axis
        this.y=y; // y-axis
        this.width=width; 
        this.height=height;
// forward - to move the car front 
        this.speed=0;
        this.acceleration=0.2;
// reverse - to stop the car
        this.maxSpeed=maxSpeed;
        this.friction=0.05;

//angle - to move the car left and right in a particular angle
        this.angle=0;

//for the polygon method :
        this.damaged = false;

        this.sensor = new Sensor(this);  //We pass the car object to this sensor constructor. Hence we use "this"

        this.controls = new Controls(controlType);
    }

    //On the detection of a key in controls.js, we need to move the car
    update(roadBorders) {
        if(!this.damaged){
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage(roadBorders);
        }
        this.sensor.update(roadBorders);
    }

    #assessDamage(roadBorders){
        for(let i=0; i<roadBorders.length; i++){
            if(polysIntersect(this.polygon, roadBorders[i])){
                return true;
            }
        }
        return false;
    }

    //To detect collisions: We find the corners of the car
    #createPolygon(){
        const points=[];
        const rad = Math.hypot(this.width,this.height)/2; //(inside the car's rectangle from the center point : we have a right triangle whose distance to the 4 corners from the center is just the hypotenuse of the right triangle.)
        const alpha = Math.atan2(this.width,this.height);
        points.push({
           x: this.x - Math.sin(this.angle - alpha)*rad,
           y: this.y - Math.cos(this.angle - alpha)*rad
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha)*rad,
            y: this.y - Math.cos(this.angle + alpha)*rad
        });

        //These 2 corners are basically at the opposite side of the first two corners. Hence just add 180 deg (PI = 180 deg)
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha)*rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha)*rad
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha)*rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha)*rad
        });
        return points;
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

        if(this.damaged){
            ctx.fillStyle = "grey";
        }
        else{
            ctx.fillStyle = "black";
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        
        for(let i=1; i<this.polygon.length; i++){
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }

        ctx.fill();

        this.sensor.draw(ctx); //The car now has the ability to draw its own sensors.

        /*
        //Block of code before creating polygon method : 

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

        */

    }
}
