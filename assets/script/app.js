/* HTML ELEMENTS */
const FORM = document.getElementById('form');
const VANILLACOLUMN = document.getElementById('vanilla');
const FRAMEWORKCOLUMN = document.getElementById('framework');
const OTHERCOLUMN = document.getElementById('other');
const ERRORELEMNT = document.getElementById('error');
const USERINPUTS = document.querySelectorAll('input');
const URLINPUT = document.getElementById('url');
let MY_STORAGE = window.localStorage;
/* OBJECT OF HTML ELEMNTS */
const COLUMNS = {
    'vanilla': VANILLACOLUMN,
    'framework': FRAMEWORKCOLUMN,
    'other': OTHERCOLUMN
}


/* FORM EVENT*/
FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    submitHandler()
})
/* CLEAN THE URL INPUT AFTER AN ERROR */
URLINPUT.addEventListener('input', () => {
    ERRORELEMNT.innerHTML = '';
})

/* addNew() receives as parameter column destination, title and url
creates and HTML element and insert to the column
*/
function addNew(column, title, url) {
    const li = document.createElement('li');
    li.draggable= true;
    li.classList = 'draggable';
    li.addEventListener('dragstart', () => {
        li.classList.add('dragging')
      })
      li.addEventListener('dragend', () => {
        li.classList.remove('dragging')
        })
    
    const span = document.createElement('span');
    span.classList = 'trash';

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.innerHTML = title;

    span.appendChild(a);
    // span.addEventListener('click',(e)=>{deleteHandler(e)}); //Adding event handler

    li.appendChild(span);
    li.appendChild(a);

    column.appendChild(li);

}

/*AddHandler is a eventHandler that process the user inputs 
and call to AddNew with the processed inputs*/
function submitHandler() {
    const title = USERINPUTS[0].value;
    const url = USERINPUTS[1].value;
    const columnInput = document.querySelector('select').value;
    const userInputs = document.querySelectorAll('input');
    if (isValidURl(url)) {
        pushToArray(columnInput,title,url)
        addNew(COLUMNS[columnInput], title, url);
        clearInput(userInputs);
    } else if (!url) {
        pushToArray(columnInput,title,'#')
        addNew(COLUMNS[columnInput], title, '#');
        clearInput(userInputs);
    }
    else {
        ERRORELEMNT.innerHTML = 'Invalid Url. Please follow the format => https://google.com';
    }
}

//Takes InputArrays and clean them in the DOM
function clearInput() {
    USERINPUTS.forEach(input =>{ input.value = '';})
}

function isValidURl(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
}

function addOnLoad(column,title,url) {
    addNew(COLUMNS[column],title,url);
}