console.log("Hello there!")

// Function method
function double(num) {
    return num * 2;
}

// Function expression starts with an anonymous function 
const double2 = function() {
    return num * 2;
}

// Arrow function
const double3 = (num) => {return num * 2}


function modifyList(list, callback) {
    list.forEach(callback)
}

// These do the same thing, just written differently
modifyList([1,2,3], double)
modifyList([1,2,3], function(num) { return num * 2})
modifyList([1,2,3], (num) => num * 2)