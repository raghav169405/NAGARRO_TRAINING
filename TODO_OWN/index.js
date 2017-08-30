var express=require("express");
var todo_data=require("./seed.js");
var bodyparser=require("body-parser");
var app=express();
var urlencoded=bodyparser.urlencoded({extended:false});

app.use('/',urlencoded);

app.get("/api/todos",function(req,res)
{
   res.json(todo_data.todos)
});

app.delete("/api/todos/:id",function (req,res) {
    var delete_id=req.params.id;
    var todo=todo_data.todos[delete_id];
    if(!todo)
    {
        res.status(404).json({'error': 'SOORY NO TODO FOUND WITH THAT ID'});
    }
    else
    {
        todo.status=todo_data.StatusENUMS.Deleted;
        res.json(todo_data.todos)
    }

})

app.post("/api/todos",function(req,res) {
    var todo_title = req.body.todo_title;
    if (!todo_title) {
        res.status(400).json({'error': "Sorry no task added"});
    }
    else {
        var new_task_object = {
            title: todo_title,
            status: todo_data.StatusENUMS.Active
        };

    todo_data.todos[todo_data.next_todo_id] = new_task_object;
    todo_data.next_todo_id++;

    res.json(todo_data.todos);
}
});
app.put("/api/todos/:id",function(req,res)
{
    var task_id=req.params.id;
    var task=todo_data.todos[task_id];
    if(!task)
    {
        res.status(400).json({'error': "Sorry no task found"});
    }
    else
    {
        //modify
        var todo_title=req.body.todo_title;
        if(todo_title)
        todo_data.todos[task_id].title=todo_title;

        var todo_status=req.body.todo_status
        {
            if(todo_status&&(todo_status=="Active"||todo_status=="Completed"))
            {
             todo_data.todos[task_id].status=todo_status;
            }
            else
            {
                res.status(400).json({'error': "Sorry status can't be modified"});
            }
        }
    }
    res.json(todo_data.todos);

});

app.get("/api/todos/active",function(req,res)
{
    var active_todos={};
    var count=1;
    for(var i=1;i<todo_data.next_todo_id;i++) {
        if (todo_data.todos[i].status == todo_data.StatusENUMS.Active)
            active_todos[count++] = todo_data.todos[i];
    }
    res.json(active_todos);
});
app.get("/api/todos/complete",function(req,res)
{
    var complete_todos={};
    var count=1;
    for(var i=1;i<todo_data.next_todo_id;i++) {
        if (todo_data.todos[i].status == todo_data.StatusENUMS.Completed)
            complete_todos[count++] = todo_data.todos[i];
    }
    res.json(complete_todos);
});
app.get("/api/todos/deteted",function(req,res)
{
    var deleted_todos={};
    var count=1;
    for(var i=1;i<todo_data.next_todo_id;i++) {
        if (todo_data.todos[i].status == todo_data.StatusENUMS.Deleted)
            deleted_todos[count++] = todo_data.todos[i];
    }
    res.json(deleted_todos);
});
console.log(todo_data.todos);
app.listen(3010);