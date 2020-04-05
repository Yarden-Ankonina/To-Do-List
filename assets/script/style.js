let body = document.querySelector("body");
let mainHeaderMenu = document.querySelector(".main-header-menu");
let seachBar = document.querySelector(".main-content-searchForm");
let mainContentTodoForm = document.querySelector(".main-content-todoForm");
// let landingPage = document.querySelector(".landing-page");
let mainFlex = document.querySelector(".main-flex");
let editWindow =document.querySelector(".edit");
let addTodoBanner = document.querySelector(".addTodoAdd")

const SEARCH = document.querySelector(".fa-search");
const ADD_TODO = document.querySelector(".fa-plus");
const GITHUB_PROJECT = document.querySelector(".fa-github");
// const landingPageButton = document.querySelector(".landing-page-button");
const EDIT = document.querySelectorAll(".fa-edit");
const EDIT_EXIT = document.querySelector(".exit-editForm");
const EDIT_SAVE = document.querySelector(".edit-submit-update");


//default current theme
body.classList.add("toggleOnNight");

//bar menu
document.querySelector(".fa-bars").addEventListener('click',function(){
   console.log(mainHeaderMenu);
   if(mainHeaderMenu.style.display === "none"){
      mainHeaderMenu.style.display = "flex";
   }
   else{
      mainHeaderMenu.style.display = "none";
   }
});

//add a search bar
SEARCH.addEventListener('click',function(){
   if(seachBar.style.display === "none"){
      seachBar.style.display = "flex";
   }
   else
      seachBar.style.display = "none";
});

//add a todoForm
ADD_TODO.addEventListener('click',function(){
   if(mainContentTodoForm.style.display === "none"){
      mainContentTodoForm.style.display = "flex";
   }
   else  
      mainContentTodoForm.style.display = "none";


});




 function search() {
   let input, filter, ul, li, a, i, txtValue;
   input = document.getElementById('search-input');
   filter = input.value.toUpperCase();
   ul = document.querySelector(".todo-list");
   li = ul.getElementsByTagName('li');
   for (i = 0; i < li.length; i++) {
     a = li[i].getElementsByTagName("a")[0];
     txtValue = a.textContent || a.innerText;
     if (txtValue.toUpperCase().indexOf(filter) > -1) {
       li[i].style.display = "";
     } else {
       li[i].style.display = "none";
     }
   }
 }


 //add edit window popup
function addEditWindow(event){   
   let editButton = event.toElement;
   editButton.addEventListener('click', () =>{
   editWindow.style.visibility = "visible";
   mainFlex.classList.add("blurBackground");
   
   const title= event.target.previousElementSibling.textContent
   const priority = event.target.parentElement.classList.value.slice(-1);
   const id = event.target.parentElement.id;
   document.querySelector('#title-update').value = title;
   document.querySelector('#priority-edit').value = priority;
   document.querySelector(".edit-form").setAttribute('currentId',id)
   });
}

//exit save button 
EDIT_SAVE.addEventListener('click', function(){
   editWindow.style.visibility = "hidden";
   mainFlex.classList.remove("blurBackground");
 });
 
//exit edit window
 EDIT_EXIT.addEventListener('click', function(){
   editWindow.style.visibility = "hidden";
   mainFlex.classList.remove("blurBackground");
 });
 
 //addTodo confirm

 if(localStorage.tasks === "[]"){
   addTodoBanner.style.display="block";
 }
 else{
   addTodoBanner.style.display="none";
 }
 addTodoBanner.addEventListener('click',function(){
   addTodoBanner.style.display="none";
   mainContentTodoForm.style.display = "flex";
});

function addDeleteWindow(event){
   return confirm("ARE YOU SURE YOU WANT TO DELETE THIS TODO?");
}

document.querySelector('.deleteAlert-yes').addEventListener('click',function(event){
   event.preventDefault()
   UI.removeTask(event);
   document.querySelector('.deleteAlert').style.visibility="hidden";
   mainFlex.classList.remove("backgroundOpacity");
})

   
// landingPageButton.addEventListener('click',function(){
//       landingPage.style.display = "none";
//       mainFlex.style.display = "flex";
   
// });

