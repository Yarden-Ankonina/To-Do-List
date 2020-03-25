const VANILLAELEMENT = document.getElementById('vanilla');
const FRAMEWORKELEMENT = document.getElementById('framework');
const OTHERELEMENT = document.getElementById('other');

const ADDBUTTON = document.getElementById('addButton');
ADDBUTTON.addEventListener('click',AddHandler);


/* addNew() receives as parameter column destination, title and url
creates and HTML element and insert to the column
*/
function addNew(column,title,url){
const div = document.createElement('div');
div.setAttribute('class','table__column__item');

const deleteIcon = document.createElement('a');
deleteIcon.setAttribute('class','far fa-trash-alt');
deleteIcon.setAttribute('href','#');

const a= document.createElement('a');
a.setAttribute('href',url);
a.setAttribute('target','_blank');
a.innerHTML = title;

div.appendChild(a);
div.appendChild(deleteIcon);

column.appendChild(div);
}

/*AddHandler is a eventHandler that process the user inputs 
and call to AddNew with the processed inputs*/ 
function AddHandler(){
   const userInputs= document.querySelectorAll('input');
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