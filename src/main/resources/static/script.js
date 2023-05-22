function classify_image(event, input) {
    var form = new FormData(); // Variable form vor der if-Bedingung deklarieren
  
    if (input.files && input.files[0] && input.files[0] instanceof Blob) {
      var file = input.files[0];
      var reader = new FileReader();
  
      reader.onload = function(e) {
        var imagePreview = document.getElementById('preview');
        imagePreview.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
  
      form.append('file', file); // FormData mit dem hochzuladenden Bild aktualisieren
  
      fetch('/upload', {
        method: 'POST',
        body: form
      })
        .then(response => response.json())
        .then(data => {
          console.log('Server response:', data); // Debugging-Ausgabe
  
          var detections = data.detections;
  
          // Überprüfe, ob detections definiert ist
          if (detections) {
            var answerDiv = document.getElementById('answer');
            answerDiv.innerHTML = '<ul>';
            detections.forEach(function(detection) {
              var label = detection.class;
              var probability = detection.probability.toFixed(2);
              console.log('Server response:', label); // Debugging-Ausgabe
              console.log('Server response:', probability); // Debugging-Ausgabe

              answerDiv.innerHTML += '<li>' + label + ': ' + probability + '</li>';
            });
            answerDiv.innerHTML += '</ul>';
  
            var answerPartDiv = document.getElementById('answerPart');
            answerPartDiv.style.visibility = 'visible';
          }
        })
        .catch(error => {
          console.log('Error occurred during image upload:', error);
        });
    } else {
      console.log('Invalid file object');
    }
  }
  