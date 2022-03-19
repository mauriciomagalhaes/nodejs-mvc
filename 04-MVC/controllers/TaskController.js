const Task = require('../models/Task');

module.exports = class TaskController{
    static createTask(req, res){
        res.render('tasks/create')
    }

    static async createTaskSave(req, res){
        const { title, description } = req.body;
        const done = false;

        const task = await Task.create({
            title,
            description,
            done
        });
        res.redirect('/tasks');
    }

    static async showTask(req, res){
        const { title, description, done } = req.body;

        const tasks =  await Task.findAll({raw: true});
        //console.log(tasks);
        res.render('tasks/all', {tasks});
    }

    static async removeTask(req, res){
        const { id } = req.body;

        await Task.destroy({ where: { id:id}});
        
        res.redirect('/tasks');
    }

    static async updateTask(req, res){
        const { id } = req.params;

        const task = await Task.findOne({raw: true, where: { id:id }});

        res.render('tasks/edit', {task});
    }

    static async updateTaskSave(req, res){
        const { id } = req.params;
        const { title, description, done } = req.body;

        await Task.update({
            title,
            description,
            done
        }, {
            where: { id:id }
        });

        res.redirect('/tasks');
    }

}