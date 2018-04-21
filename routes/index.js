const taskController = require('../controllers/taskController.js');

module.exports = function (app) {

  app.get('/tasks', taskController.index);
  app.get('/task/create', taskController.create);
  app.get('/task/:id', taskController.show);
  app.post('/task', taskController.store);
  app.put('/task/:id', taskController.update);
  app.delete('/task/:id', taskController.destroy);
  app.get('/tasks-client', taskController.client);
  app.get('/tasks-api', taskController.api);
  
};