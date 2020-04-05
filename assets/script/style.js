let toggle = document.querySelector("fa-toggle-on");
let body = document.querySelector("body");
let mainHeaderMenu = document.querySelector(".main-header-menu");
let seachBar = document.querySelector(".main-content-searchForm");
let mainContentTodoForm = document.querySelector(".main-content-todoForm");
// let landingPage = document.querySelector(".landing-page");
let mainFlex = document.querySelector(".main-flex");
let editWindow =document.querySelector(".edit");

const BARS = document.querySelector(".fa-bars");
const SEARCH = document.querySelector(".fa-search");
const ADD_TODO = document.querySelector(".fa-plus");
const GITHUB_PROJECT = document.querySelector(".fa-github");
// const landingPageButton = document.querySelector(".landing-page-button");
const EDIT = document.querySelectorAll(".fa-edit");
const EDIT_EXIT = document.querySelector(".exit-editForm");
const EDIT_SAVE = document.querySelector(".edit-submit-update");


//reset
body.classList.add("toggleOnNight");

if(toggle){
   toggle.addEventListener('click',function(){
      if(toggle.classList[1] === "fa-toggle-on"){
         toggle.classList.remove("fa-toggle-on");
         toggle.classList.add("fa-toggle-off");
         body.classList.remove("toggleOnNight");
         body.classList.add("toggleOnDay");
     
         
      }
      else{
         toggle.classList.remove("fa-toggle-off");
         toggle.classList.add("fa-toggle-on");
         body.classList.remove("toggleOnDay");
         body.classList.add("toggleOnNight");
     
      }
     });
}



BARS.addEventListener('click',function(){
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

// landingPageButton.addEventListener('click',function(){
//       landingPage.style.display = "none";
//       mainFlex.style.display = "flex";
   
// });




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

EDIT_SAVE.addEventListener('click', function(){
   editWindow.style.visibility = "hidden";
   mainFlex.classList.remove("blurBackground");
 });
 
//exit edit window
 EDIT_EXIT.addEventListener('click', function(){
   editWindow.style.visibility = "hidden";
   mainFlex.classList.remove("blurBackground");
 });


// function addDeleteWindow(event){
//    event.target.addEventListener('click', function(){
//       document.querySelector('.deleteAlert').style.visibility="visible";
//       document.querySelector('.deleteAlert-yes').addEventListener('click',function(){
//          document.querySelector('.deleteAlert').style.visibility="hidden";
//          return true;
//       });
//       document.querySelector('.deleteAlert-no').addEventListener('click',function(){
//          document.querySelector('.deleteAlert').style.visibility="hidden";
//          return false;

//       });
//    });

// }



function addDeleteWindow(event){
      event.target.addEventListener('click', function(){
         document.querySelector('.deleteAlert').style.visibility="visible";
         const id = event.target.parentElement.id;
         document.querySelector(".deleteAlert").setAttribute('currentId',id)
      });
}

document.querySelector('.deleteAlert-yes').addEventListener('click',function(){
   document.querySelector('.deleteAlert').style.visibility="hidden";

   // UI.removeTask()
});
document.querySelector('.deleteAlert-no').addEventListener('click',function(){
   document.querySelector('.deleteAlert').style.visibility="hidden";
});

  
  
   

