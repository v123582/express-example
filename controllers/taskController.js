var db = require('../models');
var Task = db.Task;

let taskController = {
  index: function (req, res) {
    Task.findAll()
      .then(function (tasks) {
        // res.json(tasks);
        res.render('index', {"tasks": tasks});
      });
  },
  client: function (req, res) {
    Task.findAll()
      .then(function (tasks) {
        // res.json(tasks);
        res.render('client', {"tasks": JSON.stringify(tasks)});
      });
  },
  api: function (req, res) {
    Task.findAll()
      .then(function (tasks) {
        // res.json(tasks);
        res.json(tasks);
      });
  },
  show: function (req, res) {
    Task.findById(req.params.id)
      .then(function (task) {
        // res.json(task);
        res.render('show', {"task": task});
      });
  },
  create: function (req, res) {
    res.render('create');
  },
  store: function (req, res) {
    Task.create({
        title: req.body.title, 
        createdAt : new Date(),
        updatedAt : new Date(),
      })
      .then(function (task) {
        // res.json(task);
        res.redirect('/tasks');
      });
  },
  update: function (req, res) {
    Task.findById(req.params.id)
      .then(function (task) {
        task.updateAttributes(req.body)
          .then(function(task) {
            res.json(task);
          });
      });
  },
  destroy: function (req, res) {
    Task.findById(req.params.id)
      .then(function (task) {
        task.destroy()
          .then(function(task) {
            res.json(task);
          });
      });
  },
};
module.exports = taskController;