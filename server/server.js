var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var employees = require('./routes/employees');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', (process.env.PORT || 4000));

app.use('/employees', employees);
app.use('/', index);

app.listen(app.get('port'), function(){
    console.log('Listening on port: ', app.get('port'));
});
