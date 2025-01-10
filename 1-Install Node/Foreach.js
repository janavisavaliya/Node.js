//student name print //
const students = ["neha","janavi","brijal","khushi","dhruvi"];
students.forEach((val)=> {
    console.log(val);
})

//student name orint with roll no //
const student = ["neha","janavi","brijal","khushi","dhruvi"];
student.forEach((name,roll)=> {
    console.log(`Roll No :- ${roll + 1} , Name :- ${name}`);  
})
