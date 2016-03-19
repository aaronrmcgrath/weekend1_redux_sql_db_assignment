

//jQuery interaction for the employeeForm

$(document).ready(function(){

  getEmployees();
  getSalary();
  $('#employeeForm').on('submit', processEmployee);
  $('.employee-info').on('mouseup', '.remove', removeEmployee);

});


//Decalred variables to be used:
//employeeArray will be the Array that the employee objects are stored
//combinedMonthlySalary is where the total monthly salary of all employees is stored

// var employeeArray = [];
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

  // employeeArray.push(employee);

  $.ajax({
    type: 'POST',
    url: '/employees/add',
    data: employee,
    success: function() {
      // console.log('POST success! Here is info sent: ', employee);
      getEmployees();
      getSalary();

    }
  });

  // getEmployees();

  // calTotalSalary();
  // console.log(employeeArray);


  $('#employeeForm').find('input[type=text]').val('');
  // console.log('!');
}


//GET call to retrieve employee object from DB and process appendEmployeeDom
function getEmployees(){

  $.ajax({
    type: 'GET',
    url: '/employees/get',
    success: function(data){
      // console.log('GET successfully processed: ', data);
      appendEmployeeDom(data);
    }
  });
}

//AppendEmployeedom Function
function appendEmployeeDom(employeeArray) {

  $('.employee-info').empty();

  // console.log('Employee Array after Get before Append: ', employeeArray);
  for(var i = 0; i < employeeArray.length; i++){

    $('.employee-info').append('<div class="employee ' + employeeArray[i].employee_id + '"></div>');
    var $el = $('.employee-info').children().last();
    // var $removeEl = $('.employee-info')
    // $el.data('myIndex', employ);

    $el.append('<p>Employee: ' + employeeArray[i].first_name + ' ' + employeeArray[i].last_name + '</p>');
    $el.append('<p>Employee ID: ' + employeeArray[i].employee_id + '</p>');
    $el.append('<p>Job Title: ' + employeeArray[i].position + '</p>');
    $el.append('<p>Annual Salary: ' + employeeArray[i].base_salary + '</p>');

    $el.append('<button class="remove" data-employeeIndex=' + employeeArray[i].employee_id + '>Remove</button>');
  }

}

//GET to pull employee object from DB to process calTotalSalary to append total monthly salary to DOM.
function getSalary(){

  $.ajax({
    type: 'GET',
    url: '/employees/get',
    success: function(data){
      // console.log('GET Salary processed: ', data);
      calTotalSalary(data);
    }
  });
}

//DELETE info from DB, will run in the removeEmployee function
function deleteEmployee(value) {

  $.ajax({
    type: 'DELETE',
    url: '/employees/delete',
    data: value,
    success: function(value) {
    // console.log('Employee deleted: ', value);
    getEmployees();
    getSalary();
  }
  });

}

//The calTotalSalary function calculates the all of the employees' salaries and converts it to monthly

function calTotalSalary (employeeArray) {

  var totMonthSalary = 0;
  for (var i = 0; i < employeeArray.length; i++){
    var empSalary = employeeArray[i].base_salary;
    // console.log(empSalary, totMonthSalary);
    totMonthSalary += parseInt(empSalary) / 12;
    // console.log('totMonthSalary = ', totMonthSalary);
  }
  combinedMonthlySalary = totMonthSalary;
  // return combinedMonthlySalary;
  // console.log(totMonthSalary);
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
function removeEmployee(){
  var value = $(this).data();
  console.log('Here is the deleted items data: ', value);
  deleteEmployee(value);
  $(this).parent().remove();
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
