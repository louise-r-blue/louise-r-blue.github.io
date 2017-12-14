//check if browser supports file api and filereader features
// if (window.File && window.FileReader && window.FileList && window.Blob) {

	var fileSelect = document.getElementById("fileSelect"),
	  fileElem = document.getElementById("fileElem");

	fileSelect.addEventListener("click", function (e) {
	  if (fileElem) {
	    fileElem.click();
	  }
	  e.preventDefault();
	}, false);

// to show images as thumbnails in div

	function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    if (!file.type.startsWith('image/')){ continue }

			// img is draggable once loaded so needs this - draggable="true" ondragstart="drag(event)"
    var img = document.createElement("img");
		// img.ondragstart = drag(event);
    img.classList.add("obj");
		// img.setAttribute("id", "drag-img");
		// img.setAttribute("draggable", "true");
    img.file = file;
       // Assuming that "preview" is the div output where the content will be displayed.
		var preview = document.getElementById("preview");
		preview.appendChild(img);

    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
}
// function drag(ev) {
//     ev.dataTransfer.setData("text/uri-list", ev.target.id);
// }
// else{
// 	alert('your browser does not support the html5 file api')
// }
// }
