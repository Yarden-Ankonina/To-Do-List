const COLUMN1 = document.getElementById('vanilla');


//ADD A NEW TODOITEM TO AN ESPECIFIC COLUMN
function addNew(column,title,url){
//THE ELEMENT WILL BE ADDED TO THE column
const div = document.createElement('div');
div.setAttribute('class','table__column__item');
//DELETE ICON
const deleteIcon = document.createElement('a');
deleteIcon.setAttribute('class','far fa-trash-alt');
deleteIcon.setAttribute('href','#');
//CUSTOMIZE THE ITEM
const a= document.createElement('a');
a.setAttribute('href',url);
a.innerHTML = title;
//ADD As TO THE ITEM
div.appendChild(a);
div.appendChild(deleteIcon);
//ADD TO THE COLUMN
column.appendChild(div);
}
