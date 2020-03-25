const VANILLAELEMENT = document.getElementById('vanilla');
const FRAMEWORKELEMENT = document.getElementById('framework');
const OTHERELEMENT = document.getElementById('other');

const ADDBUTTON = document.getElementById('addButton');
ADDBUTTON.addEventListener('click',AddHandler);


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

function AddHandler(){
   const userInputs= document.querySelectorAll('input');3
   const title = userInputs[0].value;
   const url= userInputs[1].value;


   const columnInput =  document.querySelector('select');
    let column;
   switch(columnInput.value){
       case 'vanilla':
        column= VANILLAELEMENT;
        break;

       case'framework':
       column= FRAMEWORKELEMENT;
        break;

        case 'other':
        column= OTHERELEMENT;
        break;
   }  
        addNew(column,title,url);
}