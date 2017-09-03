console.log("Is Script File Loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = "todos_list_div";
const NEW_TODO_INPUT_ID = "new_todo_input";

window.onload = getTodosAJAX();

function addTodoElements(id, todos_data_json){

    var todos = JSON.parse(todos_data_json);

    var parent = document.getElementById(id);
    parent.innerHTML = "";

    if (parent){

        // todos { id : {todo object}, id : {todo:object} ..}
        Object.keys(todos).forEach(

            function(key) {

                 if(todos[key].status="ACTIVE") {
                     var todo_element = createTodoElement(key, todos[key]);
                     parent.appendChild(todo_element);
                 }

            }
        )
    }
}
function createTodoElement(id, todo_object){

    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id", id);
    todo_element.setAttribute(
        "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
    );


    if (todo_object.status == "ACTIVE"){

        var complete_button = document.createElement("input");
        complete_button.setAttribute("type","checkbox");
        complete_button.setAttribute("onclick", "completeTodoAJAX("+id+")");
        complete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(complete_button);
    }
    if (todo_object.status!="DELETED"){
       var delete_button = document.createElement("button");
        delete_button.innerText = "Delete this todo"
        delete_button.setAttribute("onclick", "deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);
    }
   /* if(todo_object.status=='COMPLETE')
    {
        var complete = document.createElement('input');
        todo_element.appendChild(complete);
        complete.setAttribute("type", "checkbox");
        complete.setAttribute('checked','checked');
        complete.setAttribute('class','breathHorizontal');
        complete.setAttribute('onclick','activeAJAX('+id+')');
        todo_element.appendChild(complete_button);
    }*/

    return todo_element;

}

function getTodosAJAX(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE){

            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
                addTodoElementscomp("complete_todos",xhr.responseText);
            }
        }
    }
    xhr.send(data=null);

}
function addTodoAJAX(){
    var title= document.getElementById(NEW_TODO_INPUT_ID).value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader(
        "Content-type", "application/x-www-form-urlencoded");
    var data = "todo_title=" + encodeURI(title);

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);

}
function completeTodoAJAX(id){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElementscomp("complete_todos", xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);
}

function deleteTodoAJAX(id){

    var xhr=new XMLHttpRequest();
    xhr.open("DELETE",'/api/todos/'+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="todo_status=DELETED";
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status ==STATUS_OK)
            {
                addTodoElementDelete("deleted_todos",xhr.responseText);

            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function getTodosComplete(){
    var xhr = new XMLHttpRequest();
    //
    xhr.open("GET", "/api/todos/complete", true);

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE){

            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                addTodoElementscomp("complete_todos", xhr.responseText);
            }
        }
    }
    xhr.send(data=null);

}
function addTodoElementscomp(id, todos_data_json){
    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML = "";

    if (parent){
        Object.keys(todos).forEach(
            function(key) {
                if(todos[key].status=='COMPLETE'){

                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                    //addTodoElements(TODO_LIST_ID, todo_data_json);

                }
            }
        )
    }
}
function addTodoElementDelete(id,todo_data_json){
    var todos=JSON.parse(todo_data_json);
    var parent=document.getElementById(id);
    parent.innerHTML="";
    if(parent)
    {
        Object.keys(todos).forEach(
            function(key){
                if(todos[key].status=="DELETED") {
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                    addTodoElements(TODO_LIST_ID, todo_data_json);
                    addTodoElementscomp("complete_todos",todo_data_json);

                }
            }
        );

    }
}
function activeAJAX(id){
    var xhr=new XMLHttpRequest();
    xhr.open("PUT",'/api/todos/'+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="todo_status=ACTIVE";
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status ==STATUS_OK)
            {
                addTodoElements(TODO_LIST_ID,xhr.responseText);
                addTodoElementscomp("complete_todos",xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
