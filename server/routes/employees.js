var express = require("express");
var router = express.Router();
var path = require("path");
var pg = require('pg');
var connectionString;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/employee_salary_sql'
}

pg.connect(connectionString, function(err, client, done){
  if (err) {
    console.log('Error connecting to DB!', err);
    //TODO end process with error code
  } else {
    var query = client.query('CREATE TABLE IF NOT EXISTS employees (' +
    'id SERIAL PRIMARY KEY,' +
    'first_name varchar(80) NOT NULL,' +
    'last_name varchar(80) NOT NULL,' +
    'employee_id int NOT NULL,' +
    'base_salary int NOT NULL);'
  );
  query.on('end', function() {
    console.log('Successfully ensured schema exists');
    done();
  });

  query.on('error', function() {
    console.log('Error creating schema!');
    //TODO exit(1)
    done();
  })
}
});

router.post('/add', function(req, res) {
  var addEmployee = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    employeeid: req.body.employeeid,
    salary: req.body.salary
  };
  console.log('POST successful, here is info:', addEmployee);

  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO employees (first_name, last_name, employee_id, base_salary)' +
    'VALUES($1, $2, $3, $4) RETURNING id',
    [addEmployee.firstname, addEmployee.lastname, addEmployee.employeeid, addEmployee.salary],
    function(err, result){
      done();

      if(err){
        console.log('Error inserting data: ', err);
        res.send(false);
      } else {
        res.send(result);
      }
    });
  });
});

router.get('/get', function(req,res) {
  var results = [];
  pg.connect(connectionString, function(err, client, done){
    var query = client.query('SELECT * FROM employees ORDER BY id DESC;');

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function(){
      done();
      return res.json(results);
    });

    if(err) {
      console.log(err);
    }
  });
});


module.exports = router;
