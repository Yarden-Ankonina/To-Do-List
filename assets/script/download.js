const SHARE = document.querySelector('.fa-share');
let list = document.querySelectorAll('.main-content-todolist-select option');
let aDownload = document.getElementById("downloadElement");
let downloadArray =[];
let output;

SHARE.addEventListener('click',function(){
    downloadArray =[];//reset
    let tempArr = [];
    list.forEach(function(e){
        getTasksArray2(e.value).forEach(function(el){
            tempArr.push(el.title);
        });
        downloadArray.push("List Name: " + e.value );
        downloadArray.push(tempArr);
        tempArr = [];
    });
     output = JSON.stringify(downloadArray);
    console.log(output);
    let data = "text/json;charset=utf-8," + encodeURIComponent(output);
    console.log(data);
    aDownload.href = 'data:' + data;
    aDownload.download = 'data.txt';
    aDownload.innerHTML = '<i class="fas fa-share"></i>'

});




function getTasksArray2(key) {
    const tasksArray = doesTasksArrayExist(key) ? [] : JSON.parse(localStorage.getItem(key));
    return tasksArray;
}

function doesTasksArrayExist(key) {
    return JSON.parse(localStorage.getItem(key) === []);
}
