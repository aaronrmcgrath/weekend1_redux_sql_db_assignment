

//jQuery interaction for the employeeForm

$(document).ready(function(){
  getEmployee();
  $('#employeeForm').on('submit', processEmployee);
  calTotalSalary();
  $('.employee-info').on('mouseup', '.remove', removeSalary);

});


//Decalred variables to be used:
//employeeArray will be the Array that the employee objects are stored
//combinedMonthlySalary is where the total monthly salary of all employees is stored

var employeeArray = [];
var combinedMonthlySalary = 0;
var i = 0;
// var totMonthSalary = 0;

//Function that sends employee information to the DB and updates Dom
function processEmployee() {
  event.preventDefault();
  var employee = {};
  // console.log('Test');

  $.each($('#employeeForm').serializeArray(), function(i, field){
    employee[field.name] = field.value;
  });

  employeeArray.push(employee);

  $.ajax({
    type: 'POST',
    url: '/employees/add',
    data: employee,
    success: function() {
      console.log('POST success! Here is info sent: ', employee);
    }
  });

  getEmployee();

  // calTotalSalary();
  console.log(employeeArray);


  $('#employeeForm').find('input[type=text]').val('');
  // console.log('!');
}

function getEmployee(){

  $.ajax({
    type: 'GET',
    url: '/employees/get',
    success: function(data){
      console.log('GET successfully processed: ', data);
      // data.forEach(appendEmployeeDom);
    }
      });
}

//AppendEmployeedom Function
function appendEmployeeDom(employeeArray) {
  $('.employees').empty();

  $('.employee-info').append('<div class="employees"></div>');

  // for()

  var $el = $('.employee-info').children().last();
  // var $removeEl = $('.employee-info')
  $el.data('myIndex', i);

  $el.append('<p>Employee: ' + employees.firstname + ' ' + employees.lastname + '</p>');
  $el.append('<p>Employee ID: ' + employees.employeeid + '</p>');
  $el.append('<p>Job Title: ' + employees.jobtitle + '</p>');
  $el.append('<p>Annual Salary: ' + employees.salary + '</p>');

  $el.append('<button class="remove">Remove</button>');

}


//The calTotalSalary function calculates the all of the employees' salaries and converts it to monthly
function calTotalSalary () {
  var totMonthSalary = 0;
  for (var i = 0; i < employeeArray.length; i++){
    var empSalary = employeeArray[i];
    totMonthSalary += parseInt(empSalary.salary) / 12;
  }
  combinedMonthlySalary = totMonthSalary;
  // return combinedMonthlySalary;
  console.log(totMonthSalary);
  displaySalary();
}


//The displaySalary function displays the combinedMonthlySalary only if it is > 0
function displaySalary() {
  if (combinedMonthlySalary > 0) {
    return $('.total-monthly-salary').text("Total Monthly Salary: " + combinedMonthlySalary);
  }else {
    return $('.total-monthly-salary').text(" ");
  }
}


//Removes the current employee from html page
function removeSalary(){
  $(this).parent().remove();
  // reCalTotalSalary();
  console.log(employeeArray);
}

/*function delEmployeeObj() {
var delIndex = $(this).parent().data('myIndex');
}*/


//Tried to figure out a function to re-calculate the total
// monthly salary less the current employee removed
// function reCalTotalSalary () {
//   var totMonthSalary = 0;
//   for (var i = 0; i < employeeArray.length; i++){
//     var empSalary = employeeArray[i];
//     totMonthSalary += parseInt(empSalary.salary) / 12;
//   }
//   combinedMonthlySalary = totMonthSalary;
//   // return combinedMonthlySalary;
//   console.log(totMonthSalary);
//   displaySalary();
// }








// < -- *** -- >



// < -- SCOTT'S NOTES -- >
//          ******
// console.log('This works!');
//Code from lecture ***
//   $("#catForm").on("submit", function(event){
//      event.preventDefault();
//      var values = {};
//   // values["puppies"] = "woof";
//   // values.puppies = "woof";
//   // values["numPups"] = 6;
//
//   // console.log($("#catForm").serializeArray());
//   //This strips the form and creates an object with the info in it
//   $.each($("#catForm").serializeArray(), function(i, field){
//     values[field.name] = field.value;
//   });
//   // this clears out the form
//     $("#catForm").find("input[type=text]").val("");
//     catArray.push(values);
//     totalCatAge();
// });
// totalCatAge();
