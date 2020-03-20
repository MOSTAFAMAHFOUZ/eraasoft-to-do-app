// elements 
// submit  - event
// take data 
// put all data in object 
// put object in array 
// store data in local storage 
// ///////////////////////////////////////////

const studentData = document.getElementById("student-data");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const age = document.getElementById("age");
const table = document.getElementById("students");
const students = document.querySelector("#students tbody")

if(localStorage.getItem("students"))
{
    stdArr = JSON.parse(localStorage.getItem("students"));
}
else 
{
    stdArr = [];
}

dispalyItems(stdArr);

studentData.onsubmit = (e) =>{
    e.preventDefault();

    if(firstName.value == '' || lastName.value == '' || age.value == '')
    {
        document.getElementById("error") .innerHTML = `<h3 class="text-center alert alert-danger display-4"> Please Fill All Fields</h3>`
        return false;
    }

    let uid = Math.floor(Math.random() * 50000);
    let student = {uid:uid,firstName:firstName.value,lastName:lastName.value,age:age.value}
    stdArr.push(student);
    
    // add data to html table
    localStorage.setItem("students",JSON.stringify(stdArr));
    dispalyStudent(student);
    localStorage.setItem("students",JSON.stringify(stdArr));
   


    clearInputs();

}




// display item in html table 
dispalyStudent = (student) => {

    let students = document.querySelector("#students tbody")
    students.innerHTML += `
    <tr class="text-center text-white">
        <td> ${student.firstName} </td>
        <td>${student.lastName}</td>
        <td>${student.age}</td>
        <td> <i class="fa fa-trash btn btn-danger" onClick="deleteItem(${student.uid})"  id="${student.uid}" ></i> </td>
    </tr>
    `
    let data = JSON.parse(localStorage.getItem("students"))
    if(data.length == 1)
    {
        displayFoot();
    }

    document.getElementById("error") .innerHTML = `<h3 class="text-center alert alert-success display-4">
     Item Added
     </h3>`
    
}



// clear inputs after add element to local storage 
function clearInputs()
{
    firstName.value = '';
    lastName.value = '';
    age.value = '';
}


// display all items  

function dispalyItems(arr)
{
    arr.map((student) => {
        students.innerHTML += `
            <tr class="text-center text-white">
                <td> ${student.firstName} </td>
                <td>${student.lastName}</td>
                <td>${student.age}</td>
                <td> <i class="fa fa-trash btn btn-danger" onClick="deleteItem(${student.uid})"  id="${student.uid}" ></i> </td>
            </tr>
            `
    })

    if(arr.length > 0)
    {
        displayFoot();
    }

}



//  delete item  

deleteItem = (id) =>{
    
   document.getElementById(id).parentNode.parentNode.remove()
   data = JSON.parse(localStorage.getItem("students"));
   newData = data.filter(item => item.uid !== id);

   if(newData.length > 0)
   {
      localStorage.setItem("students",JSON.stringify(newData));
   }
   else 
   {
        localStorage.setItem("students","[]");
        document.querySelector("#students tfoot").innerHTML = '';
   }





}


// clear all items  
clearAll = () => 
{
    localStorage.setItem("students","[]");
    document.querySelector("#students tbody").innerHTML = '';
    document.querySelector("#students tfoot").remove();

    document.getElementById("error") .innerHTML = `<h3 class="text-center alert alert-danger display-4">
     Item Reoved
     </h3>`
}


// display foot of table  

function displayFoot(){
    document.querySelector("#students").innerHTML += ` 
    <tfoot>
        <tr>
            <td colspan="4" >
                <button class="btn btn-danger btn-block" onClick="clearAll()" >Clear All </button>
            </td>
        </tr>
    </tfoot>`
}