var form = document.querySelector('form');
function isError(field){
  var validity = field.validity;
  if(validity.valid) return;
  if(validity.valueMissing) return field.name.toLowerCase() + " cannot be empty";
  if(validity.patternMismatch) {
    if (field.type == "email") return "Looks like this is not an email";
    return 'Please enter a valid input'
  }
}

function showError(error, field){
  field.classList.add('error');
  var message = field.form.querySelector('#error-message-' + field.id);
  console.log(message);
  if(!message){
    message = document.createElement('div');
    message.id = 'error-message-' + field.id;
    message.className = 'error-message';
    field.form.insertBefore(message, field.nextSibling);
  }

  message.innerText = error;
  message.style.display = 'block';
}

function removeError(field){
  field.classList.remove('error');
  var message = field.form.querySelector('#error-message-' + field.id);
  if(!message) return;

  message.innerHTML = '';
  message.style.display = 'none';
  message.style.visibility = 'hidden';
}

form.addEventListener('blur',function(e){
  var error = isError(e.target);
  if (error){
    showError(error,e.target);
    return;
  }
  removeError(e.target);
}, true)

var error, hasError;
form.addEventListener('submit', function(e){
  e.preventDefault();
  var inputFields = form.querySelectorAll('input');
  inputFields.forEach(field => {
    error = isError(field);
    if(error){
      showError(error, field);
      if(!hasError) hasError = field;
    }else{
      removeError(field);
    }
  })
  hasError.focus();
}, false)