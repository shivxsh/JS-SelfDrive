class Controls{
    constructor(){
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        //  " # " symbol refers to a PRIVATE method.
        // Hence, "addKeyboardListeners() cannot be accessed outside of the controls class"
        this.#addKeyboardListeners();
    }

//If the up/down/left/right keys are pressed (read using onkeydown(event) method),
// then, the respective control from the constructor will be set to true; 

    #addKeyboardListeners(){
    
    //onkeydown = as long as the key is pressed
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
            }
        //For debugging : to check if the key presses work    
            console.table(this);
        }

    //onkeyup = as long as the key is released
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
            }
            //For debugging : to check if the key presses work
            console.table(this);
        }
        
    }
}