const VANILLAELEMENT = document.getElementsByClassName('vanilla')[0];
const FRAMEWORKELEMENT = document.getElementsByClassName('framework')[0];
const OTHERELEMENT = document.getElementsByClassName('other')[0];

const ADDBUTTON = document.getElementById('addButton');
ADDBUTTON.addEventListener('click',AddHandler);

/* addNew() receives as parameter column destination, title and url
creates and HTML element and insert to the column
*/
function addNew(column,title,url){
const div = document.createElement('div');
div.setAttribute('class','list__body__item center');

const span = document.createElement('span');
span.setAttribute('class','list__body__item__trash');

const deleteIcon = document.createElement('i');
deleteIcon.setAttribute('class', 'fas fa-trash-alt');

// Span


const a= document.createElement('a');
a.setAttribute('href',url);
a.setAttribute('target','_blank');
a.innerHTML = title;

span.appendChild(deleteIcon);
span.addEventListener('click',(e)=>{deleteHandler(e)}); //Adding event handler


div.appendChild(span);
div.appendChild(a);

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
        clearInput(userInputs);
}

//Takes InputArrays and clean them in the DOM
function clearInput(userInputs){
     userInputs.forEach(element => element.value= '');
}

function deleteHandler(e){
     console.log(e.path[3].remove());
}