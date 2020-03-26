
let vanilla = document.querySelectorAll('.vanilla')[0].children;
let framework = document.querySelectorAll('.framework')[0].children;
let css = document.querySelectorAll('.css')[0].children;
const trash = document.getElementsByClassName('list__body__item__trash');
//create array
let column = [vanilla,framework,css];

// line through and gray - go through each item and if click toggle class
column.forEach(element=>{
    for(let i = 0;i<element.length;i++){
        element[i].addEventListener('click',function(){
            
                for(let j = 0;j<trash.length;j++){ //check delete
                    trash[j].addEventListener('click',function(){
                        console.log("element: " + element[i],"trash :" +trash[j])
                        if(element[i].children[0] === trash[j]){
                            element[i].remove();
                            j = trash.length;
                        }
                    });
                }
            if(element[i]){
                element[i].classList.toggle("pressed");

            }
        });
    }
   
});

