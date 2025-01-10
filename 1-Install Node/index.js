console.log("Hello World..!");

const arr1 = [70,40,35,23,24,55]
let ans1 = arr1.filter((val)=> {
    return val % 2 == 0
})
console.log(ans1);

const arr2 = [69,41,23,21,76]
let ans2 = arr2.filter((val)=> {
    return val % 2 == 1
})
console.log(ans2);


