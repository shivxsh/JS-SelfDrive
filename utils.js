//Linear Interpollation : 
//    Returns a x value when car moved from one point to the next
//A and B are the 2 endpoints. t is the %.
function lerp(A,B,t){
    return A + (B-A)*t;
}