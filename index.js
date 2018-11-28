//Object Literals
const shape = {
  shapeType: "Circle",
  message: "The Display Message...",
  display: function() {
    console.log(this.shapeType);
    console.log(this.message);
  }
};
shape.display();

console.log("-------------------");

//Factory Function (When you return a Object), here the object is created of type Object.
function shapeFactory(shapeType) {
  return {
    radius: 5,
    display: function() {
      console.log(shapeType + ">>>" + this.radius);
    }
  };
}
const shapeObj = shapeFactory("Sphere").display();

console.log("-------------------");

//Constructor Function
function ShapeConstructor(shapeType) {
  this.localShapeType = shapeType;
  this.display = function() {
    console.log(shapeType + ">>>" + this.localShapeType);
  };
}

// When we create a function with new operator then we are creating a new object of type ShapeConstructor,
// if we are not using the new object then it would create ShapeConstructor of type Window (Global Object)
const shapeObj1 = new ShapeConstructor("SemiCircle").display();
// The below two statement are both equal to the above one
// ShapeConstructor.call({}, 1); we can call the parameters like var args
// ShapeConstructor.apply({}, [1]); we can call the parameters like an array.
//When we call shapeObj1.constructor that will return the function that was used to create this object.

console.log("-------------------");

// Adding Property and Functions dynamically to a Object
const shapeObj2 = new ShapeConstructor("SemiCircle");
shapeObj2.newproperty = "Newly Added Property";

// We can use the below way of creating properties when we want to given the name dynamically..
shapeObj2["newProperty1"] = "Newly Added Property 1";

shapeObj2.newFunction = function() {
  console.log("Newly Added Function");
};
console.log(shapeObj2);

console.log("-------------------");

// For In Loop
// Print All Keys in the Objects including variables and functions
for (let key in shapeObj2) {
  console.log(key);
}
console.log("-------------------");

// Print only Member Variables in the Object
for (let key in shapeObj2) {
  // Prints only if the key is of type member variable
  if (typeof shapeObj2[key] !== "function") {
    console.log(key);
  }
}
// The below code does the same thing as the above
const keys = Object.keys(shapeObj2);
console.log("Printing Using Object.Keys ");
console.log(keys);

console.log("-------------------");

//To Check whether the property is there in an object or not
if ("newProperty1" in shapeObj2) console.log("Shape 2 Obj has New Property 1");

console.log("-------------------");

// Abstraction
function User() {
  // When you declare a variable with this then its in public context
  this.defaultLocation = { x: 0, y: 0, z: 0 };

  // When you declare a variable with let then its in private context
  let defaultLoc = { x: 1, y: 1, z: 1 };

  // You cannot use a public members inside a private function
  let getHubLocation = function() {
    return defaultLoc;
  };

  // Public Members
  this.getCurrentLocation = function() {
    console.log("User's Current Location: ");
    console.log(this.defaultLocation); // You can use a private members inside a public method
    console.log(getHubLocation()); // Eventhough getHubLocation is private we can access it here because of the Closure. (Scope and Closure)
  };
}

const userObj = new User();
userObj.getCurrentLocation();
//Cannot access getHubLocation here because of Abstraction.

console.log("-------------------");

//Getters and Setters in JavaScript
function Employee() {
  let employeeName;
  let employeeID;

  this.employeeDetails = function() {
    console.log(
      "Employee Name: " + employeeName + " Employee ID: " + employeeID
    );
  };

  //Appraoch 1 - creating getters is the below, the problem is you have to access it by calling obj.getEmployeeName()
  //Instead if you want to directly call the variable name directly you can do the Approach 2
  this.getEmployeeName = function() {
    return employeeName;
  };

  //Appraoch 2 - the beauty is you can directly get or set using the property name like obj.employeeName
  Object.defineProperty(this, "employeeName", {
    get: function() {
      return employeeName;
    },
    set: function(value) {
      //The advantage over making the variable public is you can do the required validations before setting it to employee obj
      if (value == "") throw new Error("Invalid Entry");
      else employeeName = value;
    }
  });
}

//Invoking the Members and Members Function
const employeeObj = new Employee();
employeeObj.employeeName = "Madanraj Venkatesan";
console.log(employeeObj.employeeName);
