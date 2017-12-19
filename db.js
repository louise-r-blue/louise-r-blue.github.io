
(function () {
    // IndexedDB
    var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
        IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction,
        dbVersion = 1.0;

    // Create/open database
    var request = indexedDB.open("myImageFiles", dbVersion),
        db,
        createObjectStore = function (dataBase) {
            // Create an objectStore
            console.log("Creating objectStore")
            dataBase.createObjectStore("myImages");
        },

      //  this function gets image/s and puts in database (dont need xhr for this example)?
      getImageFile = function () {
              // Create XHR
              var xhr = new XMLHttpRequest(),
                  blob;

              xhr.open("GET", "elephant.png", true);
              // Set the responseType to blob
              xhr.responseType = "blob";

              xhr.addEventListener("load", function () {
                  if (xhr.status === 200) {
                      console.log("Image retrieved");

                      // Blob as response
                      blob = xhr.response;
                      console.log("Blob:" + blob);

                      // Put the received blob into IndexedDB
                      putImageInDb(blob);
                  }
              }, false);
              // Send XHR
              xhr.send();
          },


        putImageInDb = function (blob) {
            console.log("Putting images in IndexedDB");

            // Open a transaction to the database
            var transaction = db.transaction(["myImages"], IDBTransaction.READ_WRITE);

            // Put the blob into the dabase
            var put = transaction.objectStore("myImages").put(blob, "image");

            // Retrieve the file that was just stored

            var preview = document.getElementById('preview');
            transaction.objectStore("myImages").get("image").onsuccess = function (event) {
              // start
              var img, i;
              for (i = 0; i < e.target.files.length; i++) {
                  img = new Image();
                  img.src = URL.createObjectURL(e.target.files[i]);
                  console.log("Got image!");
                  img.onload = function() {
                      this.setAttribute('title', 'Original size: ' + this.naturalWidth + 'x' + this.naturalHeight);
                      preview.appendChild(this);

                      window.URL.revokeObjectURL(this.src);
                  };
                }
                // end

                // var imgFile = event.target.result;
                // console.log("Got image!" + imgFile);
                //
                // // Get window.URL object
                // var URL = window.URL || window.webkitURL;
                //
                // // Create and revoke ObjectURL
                // var imgURL = URL.createObjectURL(imgFile);
                //
                // // Set img src to ObjectURL
                // var imgList = document.getElementById("preview");
                // imgList.setAttribute("src", imgURL);
                //
                // // Revoking ObjectURL
                // URL.revokeObjectURL(imgURL);
            };
        };

    request.onerror = function (event) {
        console.log("Error creating/accessing IndexedDB database");
    };

    request.onsuccess = function (event) {
        console.log("Success creating/accessing IndexedDB database");
        db = request.result;

        db.onerror = function (event) {
            console.log("Error creating/accessing IndexedDB database");
        };

        // Interim solution for Google Chrome to create an objectStore. Will be deprecated
        if (db.setVersion) {
            if (db.version != dbVersion) {
                var setVersion = db.setVersion(dbVersion);
                setVersion.onsuccess = function () {
                    createObjectStore(db);
                    getImageFile();
                };
            }
            else {
                getImageFile();
            }
        }
        else {
            getImageFile();
        }
    }

    // For future use. Currently only in latest Firefox versions
    request.onupgradeneeded = function (event) {
        createObjectStore(event.target.result);
    };
})();
