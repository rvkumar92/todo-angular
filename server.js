/**
 * Created by vijay on 16-01-2016.
 */
var express = require('express');
//var redis = require('redis');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var app = express();

//var client = redis.createClient();
mongoose.connect('mongodb://localhost:27017/');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));//logging every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//define model todo

var Todo = mongoose.model('Todo',{
    text:String
});
//routes for the application
app.get('/api/todos',function(request,response){
    Todo.find(function(err,todos){
        if(err){
            response.send(err);
        }
        response.json(todos);
    })
});

app.post('/api/todos',function(request,response){
    Todo.create({
        text: request.body.text,
        done: false
    },function(err,todo){
        if(err){
            response.send(err);
        }
        Todo.find(function(err,todos){
            if(err){
                response.send(err);
            }
            response.json(todos);
        });
    });
});

app.delete('/api/todos/:todo_id',function(request,response){
    Todo.remove({
        _id: request.params.todo_id
    },function(err,todo){
        if(err){
            response.send(err);
        }
        Todo.find(function(err,todos){
            if(err){
                response.send(err);
            }
            response.json(todos);
        });
    });
});
app.get('*',function(request,response){
    response.sendFile('./public/index.html');
})
app.listen(8000);
console.log("Todo app listening on port 8000");
