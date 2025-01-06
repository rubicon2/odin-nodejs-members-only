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
  formElement.input.classList.add('invalid');
  if (validity.valueMissing) {
    formElement.error.textContent = 'Email required';
  } else if (validity.typeMismatch) {
    formElement.error.textContent = 'Email must be in email format';
  } else {
    formElement.input.classList.remove('invalid');
    formElement.error.textContent = '';
  }
  return isValid;
}

function validateFirstName(formElement) {
  const isValid = formElement.input.checkValidity();
  const { validity } = formElement.input;
  formElement.input.classList.add('invalid');
  if (validity.valueMissing) {
    formElement.error.textContent = 'First name required';
  } else if (validity.patternMismatch) {
    formElement.error.textContent =
      'First name must consist of letters, single spaces and hyphens only';
  } else {
    formElement.input.classList.remove('invalid');
    formElement.error.textContent = '';
  }
  return isValid;
}

function validateLastName(formElement) {
  const isValid = formElement.input.checkValidity();
  const { validity } = formElement.input;
  formElement.input.classList.add('invalid');
  if (validity.valueMissing) {
    formElement.error.textContent = 'Last name required';
  } else if (validity.patternMismatch) {
    formElement.error.textContent =
      'Last name must consist of letters, single spaces and hyphens only';
  } else {
    formElement.input.classList.remove('invalid');
    formElement.error.textContent = '';
  }
  return isValid;
}

function validatePassword(formElement) {
  const isValid = formElement.input.checkValidity();
  const { validity } = formElement.input;
  formElement.input.classList.add('invalid');
  if (validity.valueMissing) {
    formElement.error.textContent = 'Password required';
  } else if (validity.patternMismatch) {
    formElement.error.textContent =
      'Password is not strong enough. It should be at least 8 characters with a mix of uppercase and lowercase letters, digits and symbols - at least one of each';
  } else {
    formElement.input.classList.remove('invalid');
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
  confirmPasswordFormElement.input.classList.add('invalid');
  if (validity.valueMissing) {
    confirmPasswordFormElement.error.textContent = 'Confirm password required';
  } else if (!doPasswordsMatch) {
    confirmPasswordFormElement.error.textContent = 'Passwords do not match';
    return false;
  } else {
    confirmPasswordFormElement.input.classList.remove('invalid');
    confirmPasswordFormElement.error.textContent = '';
  }
  return isValid;
}

function validateRequiredField(formElement, errorMessage) {
  const isValid = formElement.input.checkValidity();
  const { validity } = formElement.input;
  formElement.input.classList.add('invalid');
  if (validity.valueMissing) {
    formElement.error.textContent = errorMessage;
  } else {
    formElement.input.classList.remove('invalid');
    formElement.error.textContent = '';
  }
  return isValid;
}

function validateOnInputUntilValid(input, validationFn) {
  // Validation function will run once when this function is called.
  // If the validation function returns false (i.e. fails), then it will listen and validate on every input change.
  // Once the validation returns true (i.e. succeeds), then it will stop listening for changes.
  // The validationFn is expected to handle showing an error, etc.
  const removeOnValidInput = () => {
    if (validationFn()) {
      input.removeEventListener('input', removeOnValidInput);
    }
  };

  const initialValidationResult = validationFn();
  if (!initialValidationResult) {
    input.addEventListener('input', removeOnValidInput);
  }

  // Return initial validation result in case calling code needs to know about it.
  return initialValidationResult;
}
