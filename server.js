var express = require('express');
var app = express();

var db = require('./models');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(3000, function() {
  db.sequelize.sync();
});

var Task = db.Task;

app.get('/tasks', function(req, res) {
  Task.findAll()
    .then(function (tasks) {
      res.json(tasks);
    });
});

app.get('/task/:id', function(req, res) {
  Task.findById(req.params.id)
    .then(function (task) {
      res.json(task);
    });
});

app.post('/task', function(req, res) {
  Task.create({
      title: req.title, 
      createdAt : new Date(),
      updatedAt : new Date(),
    })
    .then(function (task) {
      res.json(task);
    });
});

app.put('/task/:id', function(req, res) {
  Task.findById(req.params.id)
    .then(function (task) {
      task.updateAttributes(req.body)
        .then(function(task) {
          res.json(task);
        });
    });
});

app.delete('/task/:id', function(req, res) {
  Task.findById(req.params.id)
    .then(function (task) {
      task.destroy()
        .then(function(task) {
          res.json(task);
        });
    });
});