class Road{
    constructor(x,width,laneCount=4){
        this.x=x;
        this.width=width;
        this.laneCount = laneCount;

        this.left = x - width/2;
        this.right = x + width/2;

        //Move our road infinitely upward
        const infinity = 10000000; //Some large random value
        this.top = -infinity;
        this.bottom = infinity; //Note that y axis increases as it goes down in a computer

    //JS - objects
    //i.e. topLeft.x = this.left and topRight.y= 
        const topLeft = {x:this.left,y:this.top};
        const topRight = {x:this.right,y:this.top};
        const bottomLeft = {x:this.left,y:this.bottom};
        const bottomRight = {x:this.right,y:this.bottom};
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    getLaneCenter(laneIndex){ //Note laneIndex starts from 0 and its just a number given to each lane
        const laneWidth = this.width/this.laneCount;
        return this.left + laneWidth/2 + Math.min(laneIndex,this.laneCount-1)*laneWidth;
    }
    draw(ctx){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for(let i=1; i<=this.laneCount-1;i++){
        //Defined the "lerp" function inside the util.js file    
            const x = lerp(this.left, this.right, i/this.laneCount); // "i/laneCount" will return a value between 0 and 1. and all inbetween values will be percentage or fractions
        
            
            ctx.setLineDash([20,20]);  //first param = length of dashed line; second = break between 2 lines
            
            
            ctx.beginPath();
            ctx.moveTo(x, this.top); // moves the path to the specified point in the canvas, without creating a line.
            ctx.lineTo(x,this.bottom); // adds another point to which a line can be drawn FROM the old point
            ctx.stroke(); // draws the line from the moveTo to the lineTo (Traces the points in order)
        }

        ctx.setLineDash([]);
        //for each loop to go through the array borders
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
}