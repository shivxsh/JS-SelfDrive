class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=3;
        this.rayLength=100; //range of the ray lines
        this.raySpread = Math.PI/4; //(45 deg) angle of spread of these rays

        this.rays=[];
    }

    update(){
        this.rays=[];
        for(let i=0; i<this.rayCount;i++){
            const rayAngle = lerp(this.raySpread/2,)
        }
    }
}