let landingPage = document.querySelector(".landing-page");
let click = 0;

const landingPageForm = document.querySelector(".landing-page-form");
const landingSubmit = document.getElementById("landing-submit-input");
let firstTime = true;

window.addEventListener('load', (event) => {
    if(firstTime){
        landingPage.style.display = "block";
    }else{
        landingPage.style.display = "none";
    }
  });


landingPage.addEventListener('click',function(){
    if(click === 0){
        landingPage.style.backgroundImage = "url('/assets/styles/LandingPage/Tips.jpg')";
    }
    else if(click === 1){
        landingPage.style.backgroundImage = "url('/assets/styles/LandingPage/addTodo.jpg')";
    }
    else if(click === 2){
        landingPage.style.backgroundImage = "url('/assets/styles/LandingPage/search.jpg')";
    }
    else if(click === 3){
        landingPage.style.backgroundImage = "url('/assets/styles/LandingPage/openMenu.jpg')";
    }
    else if(click === 4){
        landingPage.style.backgroundImage = "url('/assets/styles/LandingPage/createList.jpg')";
        landingPageForm.style.visibility = "visible";
    }
    click++;
});

landingSubmit.addEventListener('click',function(e){
    e.preventDefault();
    firstTime  = false;
    landingPage.style.display = "none";
})

