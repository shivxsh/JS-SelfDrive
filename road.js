class Road{
    constructor(x,width,laneCount=3){
        this.x=x;
        this.width=width;
        this.laneCount = laneCount;

        this.left = x - width/2;
        this.right = x + width/2;

        //Move our road infinitely upward
        const infinity = 100000000; //Some large random value
        this.top = -infinity;
        this.bottom = infinity; //Note that y axis increases as it goes down in a computer
    }

    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for(let i=0; i<=this.laneCount;i++){
        //Defined the "lerp" function inside the util.js file    
            const x = lerp(this.left, this.right, i/this.laneCount);

        // "i/laneCount" will return a value between 0 and 1. and all inbetween values will be percentage or fractions

            ctx.beginPath();
            ctx.moveTo(x, this.top); // moves the path to the specified point in the canvas, without creating a line.
            ctx.lineTo(x,this.bottom); // adds another point to which a line can be drawn FROM the old point
            ctx.stroke(); // draws the line from the moveTo to the lineTo (Traces the points in order)
    
        }
        
        

    }
}