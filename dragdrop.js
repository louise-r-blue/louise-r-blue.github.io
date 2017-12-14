function allowDrop(ev) {
    ev.preventDefault();
}

// function drag(ev) {
//     ev.dataTransfer.setData("text/uri-list", ev.target.id);
// }

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/uri-list");
    ev.target.appendChild(document.getElementById(data));
}

function drag(ev){
var dt = ev.dataTransfer;
dt.mozSetDataAt("image/png", stream, 0);
dt.mozSetDataAt("application/x-moz-file", file, 0);
dt.setData("text/uri-list", imageurl);
dt.setData("text/plain", imageurl);

}
