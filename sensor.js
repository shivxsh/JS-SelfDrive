class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=5;
        this.rayLength=120; //range of the ray lines
        this.raySpread = Math.PI/2; //(45 deg) angle of spread of these rays

        this.rays=[];
        this.readings=[]; //reading of the sensor : is it detecting something?
    }

    update(roadBorders, traffic){
        this.#castRays();
        this.readings=[];
        for(let i=0; i<this.rays.length; i++){
            this.readings.push(
                this.#getReading(
                    this.rays[i], 
                    roadBorders,
                    traffic
                )
            );
        }
    }

    #getReading(ray,roadBorders, traffic){
        let touches=[];

        for(let i=0; i<roadBorders.length; i++){
            const touch = getIntersection(ray[0], ray[1], roadBorders[i][0],roadBorders[i][1]);
            
        //if there is a touch (found using the getIntersection() method from the utils.js file)
            if(touch){
                touches.push(touch);
            }
        }

        for(let i=0; i<traffic.length; i++){
            const poly = traffic[i].polygon;
            for(let j=0; j<poly.length; j++){
                const value = getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j+1)%poly.length]
                );
                if(value){
                    touches.push(value);
                }
            }
        }

        if(touches.length == 0){
            return null;
        }else{
        //modern JS syntax : for every element in the touches[] array, return a new array of its offset.
        //What's the offset? the offset is the third value returned from the getIntersection() method from the utils.js file.
        //Basically, it is the distance betweeen the car and the touch (first obstacle)
            const offsets=touches.map(element => element.offset);
        //From these touches, we need to find the minimum distance so as to know the closest object to the car.
            const minOffset = Math.min(...offsets);  // ... is the spread operator. It unpacks the values from the array.
            return touches.find(e => e.offset == minOffset); 
            //The find() method returns the value of the first element that passes a test.

        }


    }

    #castRays(){
        this.rays=[];
        for(let i=0; i<this.rayCount;i++){
        //Note, the line : "this.rayCount == 1? 0.5 : i/(this.rayCount-1)" says that, if the rayCount is 1, then return the offset value as 0.5. Else return it as rayCount - 1 to avoid dividing by zero.
            const rayAngle = lerp(this.raySpread/2, -this.raySpread/2, this.rayCount == 1? 0.5 : i/(this.rayCount-1)) + this.car.angle;

            const start = {x:this.car.x, y:this.car.y};
            const end = {
                x:this.car.x - Math.sin(rayAngle)*this.rayLength,
                y:this.car.y - Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]);
        }
    }

    draw(ctx){
        for(let i=0; i<this.rayCount; i++){

            let end = this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }
    //This is for the yellow line to turn black in color when it detects the closest object near it.
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(this.rays[i][1].x,this.rays[i][1].y);
            ctx.lineTo(end.x,end.y);
            ctx.stroke();

    //Thiss is for the yellow lines (rays)
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(this.rays[i][0].x,this.rays[i][0].y);
            ctx.lineTo(end.x,end.y);
            ctx.stroke();
        }

    }
}