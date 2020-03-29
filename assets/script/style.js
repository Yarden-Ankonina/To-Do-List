let toggle = document.querySelector("header i");
let body = document.querySelector("body");

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
 console.log(body.classList[0]);
});
