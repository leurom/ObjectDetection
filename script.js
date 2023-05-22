function classify_image(event, input) {
    var form = new FormData();
  
    if (input.files && input.files[0] && input.files[0] instanceof Blob) {
      var file = input.files[0];
      var reader = new FileReader();
  
      reader.onload = function(e) {
        var imagePreview = document.getElementById('preview');
        imagePreview.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
  
      form.append('file', file);
  
      var params = new URLSearchParams();
      params.append('text', input.files[0].name);
  
      fetch('/', {
        method: 'POST',
        body: form
      })
        .then(response => response.json())
        .then(data => {
          var answerDiv = document.getElementById('answer');
  
          answerDiv.innerHTML = '<ul>';
          console.log('Server response:', data);
          var dataString = JSON.stringify(data);
          answerDiv.innerHTML += '<li>' + data + '</li>';
          answerDiv.innerHTML += '</ul>';
  
          var answerPartDiv = document.getElementById('answerPart');
          answerPartDiv.style.visibility = 'visible';
        })
        .catch(error => {
          console.log('Error occurred during image upload:', error);
        });
    } else {
      console.log('Invalid file object');
    }
}
