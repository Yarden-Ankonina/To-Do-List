let toggle = document.querySelector("fa-toggle-on");
let body = document.querySelector("body");
let mainHeaderMenu = document.querySelector(".main-header-menu");
let seachBar = document.querySelector(".main-content-searchForm");
let mainContentTodoForm = document.querySelector(".main-content-todoForm");

const BARS = document.querySelector(".fa-bars");
const SEARCH = document.querySelector(".fa-search");
const ADD_TODO = document.querySelector(".fa-plus");
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
      mainHeaderMenu.style.display = "block";
   }
   else{
      mainHeaderMenu.style.display = "none";

   }
});


SEARCH.addEventListener('click',function(){
   if(seachBar.style.display === "none"){
      seachBar.style.display = "flex";
   }
   else
      seachBar.style.display = "none";
});

ADD_TODO.addEventListener('click',function(){
   if(mainContentTodoForm.style.display === "none"){
      mainContentTodoForm.style.display = "flex";
   }
   else  
      mainContentTodoForm.style.display = "none";

});