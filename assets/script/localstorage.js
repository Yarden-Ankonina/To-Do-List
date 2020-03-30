let myStorage = window.localStorage;
let todosArray = [];

onLoad();

function onLoad(){
    todosArray = JSON.parse(myStorage.getItem('todosArray'));
    console.log('on load' + todosArray);
    todosArray.forEach( todo => addOnLoad(todo.column,todo.title,todo.url));
}

function pushToArray(column,title,url)
{
    todosArray.push({
        column: column,
        title: title,
        url : url
    })
    updateLocalStorage();
}
function updateLocalStorage(){
    myStorage.removeItem('todosArray');
    myStorage.setItem('todosArray', JSON.stringify(todosArray));
    console.log(myStorage);
}

