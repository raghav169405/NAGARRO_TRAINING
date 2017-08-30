var StatusENUMS={

    Active:"Active",
    Deleted:"Deleted",
    Completed:"Completed"

}
var todos={
    1:{title: "Assignment 1",status:StatusENUMS.Active},
    2:{title : "Assignment 2",status:StatusENUMS.Active}

}
var next_todo_id=3;
module.exports={
    StatusENUMS:StatusENUMS,
    todos:todos,
    next_todo_id:next_todo_id

}