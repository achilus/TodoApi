import TodoModel from '../model/todoModel';

class TodoController {
    getAllTodos(req,res){
        return res.status(200).send({
            success: 'true',
            message: 'todos retrieved successfully',
            todos: TodoModel
        });
    };

    getTodo(req, res) {
        const id = parseInt(req.params.id, 10);

        TodoModel.findById(id, function (err, todo) {
          if (err) return next(err);
          res.send(todo);
        })

        // TodoModel.map((todo) => {
        //   if (todo.id === id) {
        //     return res.status(200).send({
        //       success: 'true',
        //       message: 'todo retrieved successfully',
        //       todo,
        //     });
        //   }
        // });
        // return res.status(404).send({
        //   success: 'false',
        //   message: 'todo does not exist',
        // });
      }
    
    createTodo(req, res) {
      if (!req.body.title) {
          return res.status(400).send({
          success: 'false',
          message: 'title is required',
          });
      } else if (!req.body.description) {
          return res.status(400).send({
          success: 'false',
          message: 'description is required',
          });
      }
      const todo = {
          id: req.body.id,
          title: req.body.title,
          description: req.body.description,
      };
      TodoModel.push(todo);
         res.status(201).send({
          success: 'true',
          message: 'todo added successfully',
      });    
    };
    
      updateTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        let todoFound;
        let itemIndex;
        TodoModel.map((todo, index) => {
          if (todo.id === id) {
            todoFound = todo;
            itemIndex = index;
          }
        });
    
        if (!todoFound) {
          return res.status(404).send({
            success: 'false',
            message: 'todo not found',
          });
        }
    
        if (!req.body.title) {
          return res.status(400).send({
            success: 'false',
            message: 'title is required',
          });
        } else if (!req.body.description) {
          return res.status(400).send({
            success: 'false',
            message: 'description is required',
          });
        }
    
        const newTodo = {
          id: todoFound.id,
          title: req.body.title || todoFound.title,
          description: req.body.description || todoFound.description,
        };
    
        TodoModel.splice(itemIndex, 1, newTodo);
    
        return res.status(201).send({
          success: 'true',
          message: 'todo added successfully',
          newTodo,
        });
      }
    
      deleteTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        let todoFound;
        let itemIndex;
        TodoModel.map((todo, index) => {
          if (todo.id === id) {
            todoFound = todo;
            itemIndex = index;
          }
        });
    
        if (!todoFound) {
          return res.status(404).send({
            success: 'false',
            message: 'todo not found',
          });
        }
        TodoModel.splice(itemIndex, 1);
    
        return res.status(200).send({
          success: 'true',
          message: 'Todo deleted successfuly',
        });
      }
};

const todoController = new TodoController();
export default todoController;