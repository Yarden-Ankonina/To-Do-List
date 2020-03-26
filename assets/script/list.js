
let vanilla = document.querySelectorAll('.vanilla')[0].children;
let framework = document.querySelectorAll('.framework')[0].children;
let css = document.querySelectorAll('.css')[0].children;

//create array
let column = [vanilla,framework,css];

// line through and gray - go through each item and if click toggle class
column.forEach(element=>{
    for(let i = 0;i<element.length;i++){
        console.log(element[i]);
        element[i].addEventListener('click',function(){
            element[i].classList.toggle("pressed");
        });
    }
   
});

