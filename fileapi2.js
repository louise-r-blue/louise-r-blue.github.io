var fileInput = document.querySelector('input[type="file"]');
var preview = document.getElementById('preview');

fileInput.addEventListener('change', function(e) {
    // Remove existing preview images
    // while (preview.firstChild) {
    //     preview.removeChild(preview.firstChild);
    // }

    var img, i;
    for (i = 0; i < e.target.files.length; i++) {
        img = new Image();
        img.src = URL.createObjectURL(e.target.files[i]);
        img.onload = function() {
            this.setAttribute('title', 'Original size: ' + this.naturalWidth + 'x' + this.naturalHeight);
            preview.appendChild(this);

            window.URL.revokeObjectURL(this.src);
        };
      }
}, false);
