
const FORM = document.getElementById('form');
const ERRORELEMNT = document.getElementById('error');
const USERINPUTS = document.querySelectorAll('input');
const URLINPUT = document.getElementById('url');
const UL = document.getElementById("todo__column");


/* FORM EVENT*/
FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    submitHandler()
})

/* CLEAN THE URL INPUT AFTER AN ERROR */
URLINPUT.addEventListener('input', () => {
    ERRORELEMNT.innerHTML = '';
})


function addNew( title, url) {
    const li = document.createElement('li');
    // li.draggable= true;
    // li.classList = 'draggable';
    // li.addEventListener('dragstart', () => {
    //     li.classList.add('dragging')
    //   })
    //   li.addEventListener('dragend', () => {
    //     li.classList.remove('dragging')
    //     })
    
    // const span = document.createElement('span');
    // span.classList = 'trash';

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.innerHTML = title;

    // span.appendChild(a);
    // span.addEventListener('click',(e)=>{deleteHandler(e)}); //Adding event handler

    // li.appendChild(span);
    li.appendChild(a);

    UL.appendChild(li);

}

function submitHandler() {
    const title = USERINPUTS[0].value;
    const url = USERINPUTS[1].value;
    const userInputs = document.querySelectorAll('input');
    if (isValidURl(url)) {
        // pushToArray(columnInput,title,url)
        addNew( title, url);
        clearInput(userInputs);
    } else if (!url) {
        // pushToArray(columnInput,title,'#')
        addNew( title, '#');
        clearInput(userInputs);
    }
    else {
        ERRORELEMNT.innerHTML = 'Invalid Url. Please follow the format => https://google.com';
    }
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


function clearInput() {
    USERINPUTS.forEach(input =>{ input.value = '';})
}





