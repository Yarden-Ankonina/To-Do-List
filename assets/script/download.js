const SHARE = document.querySelector('#downloadElement');
let list = document.querySelectorAll('.main-content-todolist-select option');
let aDownload = document.getElementById("downloadElement");
let string = '';

function addText(e) {
    let arr = getTasksArray2(e.value);
    string += `title:${e.value}\n`;
    arr.forEach((a, index) => string += `${+index + 1}:${a.title}\n`);
}

function downloadHandler() {
    let listArray = [...document.querySelectorAll('.main-content-todolist-select option')];
    listArray.forEach(e => { addText(e) }
    )
}

SHARE.addEventListener('click', function (e) {
    downloadHandler();
    let data = "text;charset=utf-8," + encodeURIComponent(string);
    aDownload.href = 'data:' + data;
    aDownload.download = 'data.txt';
});
