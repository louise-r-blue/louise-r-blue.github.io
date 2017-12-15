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

     // find the div with id preview
		var imgString = "";
   var imgHolder = document.getElementById('preview');

 // find all images in imgHolder
 for (var i = 0; i < imgHolder.length; i++) {
		var imgs = imghHolder[i].getElementsByTagName('img');

		// print out src
		for (var j = 0; j < imgs.length; j++) {
			var img = imgs[j];
			imgString+=img.src + "<br />";
		}
	}
	document.getElementById("result").innerHTML=imgString;
	console.log(imgString + ': ')

    var reader = new FileReader();
    reader.onload = (function(aImg) {
			return function(e) {
				aImg.src = e.target.result;
			};
		})(img);
    reader.readAsDataURL(file);

    // create an array to hold image data src
		// var imageArr = [];
		// for(i =0; i < img.length; i++){
		// 	imageArr.push[i];
		// 	console.log(imageArr);
		// }

  }
}
// function drag(ev) {
//     ev.dataTransfer.setData("text/uri-list", ev.target.id);
// }
// else{
// 	alert('your browser does not support the html5 file api')
// }
// }
