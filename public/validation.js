function getFormElements(id) {
  const parent = document.getElementById(id);
  return {
    input: parent.querySelector('input'),
    error: parent.querySelector('.form--error'),
  };
}

function validateEmail(formElement) {
  // This method will fire an invalid event on the element.
  const isValid = formElement.input.checkValidity();
  // Set error message.
  const { validity } = formElement.input;
  if (validity.valueMissing) {
    formElement.error.textContent = 'Email required';
  } else if (validity.typeMismatch) {
    formElement.error.textContent = 'Email must be in email format';
  } else {
    formElement.error.textContent = '';
  }
  return isValid;
}

function validateFirstName(formElement) {
  const isValid = formElement.input.checkValidity();
  const { validity } = formElement.input;
  if (validity.valueMissing) {
    formElement.error.textContent = 'First name required';
  } else if (validity.patternMismatch) {
    formElement.error.textContent =
      'First name must consist of letters, single spaces and hyphens only';
  } else {
    formElement.error.textContent = '';
  }
  return isValid;
}

function validateLastName(formElement) {
  const isValid = formElement.input.checkValidity();
  const { validity } = formElement.input;
  if (validity.valueMissing) {
    formElement.error.textContent = 'Last name required';
  } else if (validity.patternMismatch) {
    formElement.error.textContent =
      'Last name must consist of letters, single spaces and hyphens only';
  } else {
    formElement.error.textContent = '';
  }
  return isValid;
}

function validatePassword(formElement) {
  const isValid = formElement.input.checkValidity();
  const { validity } = formElement.input;
  if (validity.valueMissing) {
    formElement.error.textContent = 'Password required';
  } else if (validity.patternMismatch) {
    formElement.error.textContent =
      'Password is not strong enough. It should be at least 8 characters with a mix of uppercase and lowercase letters, digits and symbols - at least one of each';
  } else {
    formElement.error.textContent = '';
  }
  return isValid;
}

function validateConfirmPassword(
  confirmPasswordFormElement,
  passwordFormElement,
) {
  const isValid = confirmPasswordFormElement.input.checkValidity();
  const { validity } = confirmPasswordFormElement.input;
  const doPasswordsMatch =
    passwordFormElement.input.value === confirmPasswordFormElement.input.value;
  if (validity.valueMissing) {
    confirmPasswordFormElement.error.textContent = 'Confirm password required';
  } else if (!doPasswordsMatch) {
    confirmPasswordFormElement.error.textContent = 'Passwords do not match';
    return false;
  } else {
    confirmPasswordFormElement.error.textContent = '';
  }
  return isValid;
}

function validateRequiredField(formElement, errorMessage) {
  const isValid = formElement.input.checkValidity();
  const { validity } = formElement.input;
  if (validity.valueMissing) {
    formElement.error.textContent = errorMessage;
  } else {
    formElement.error.textContent = '';
  }
  return isValid;
}

function handleInputBlur(input, validationFn) {
  // Field only displays an error and listens for changes once the user leaves the field with incorrect value.
  // Then it will listen on each input and update the error until the input validates.
  // Then it will stop listening for the input until the user leaves the field, at which point it will check.
  // The validationFn is expected to handle showing an error, etc.
  const removeOnValidInput = () => {
    if (validationFn()) {
      input.removeEventListener('input', removeOnValidInput);
    }
  };

  if (!validationFn()) {
    input.addEventListener('input', removeOnValidInput);
  }
}
