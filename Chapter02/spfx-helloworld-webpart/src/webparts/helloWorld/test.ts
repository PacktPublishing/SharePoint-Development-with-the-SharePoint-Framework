let animal: string = "Cat";
let x: number;
const pi: number = 3.141592653589793;
var untypedVariable: any = (pi > 3) ? "Whatever" : x; 
var untypedVariable: any = 3;
let y: number;
//let y: number = 3;      // Can't redeclare block-scoped variable 'y'.

x = 10;
//pi = 3.14;              // Can't assign to 'pi' because is a constant or readonly property

console.log(x*pi);
//console.log(x*animal);  // The right-hand side of an arichmetic operation must be of type
                        // 'any', 'number' or an enum type.



