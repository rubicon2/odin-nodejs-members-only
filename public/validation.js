const email = getFormElements('email-section');
const firstName = getFormElements('first-name-section');
const lastName = getFormElements('last-name-section');
const password = getFormElements('password-section');
const confirmPassword = getFormElements('confirm-password-section');

function getFormElements(id) {
  const parent = document.getElementById(id);
  return {
    input: parent.querySelector('input'),
    error: parent.querySelector('.form--error'),
  };
}

function validateEmail() {
  // This method will fire an invalid event on the element.
  const isValid = email.input.checkValidity();
  // Set error message.
  const { validity } = email.input;
  if (validity.valueMissing) {
    email.error.textContent = 'Email required';
  } else if (validity.typeMismatch) {
    email.error.textContent = 'Email must be in email format';
  } else {
    email.error.textContent = '';
  }
  return isValid;
}

function validateFirstName() {
  const isValid = firstName.input.checkValidity();
  const { validity } = firstName.input;
  if (validity.valueMissing) {
    firstName.error.textContent = 'First name required';
  } else if (validity.patternMismatch) {
    firstName.error.textContent =
      'First name must consist of letters, single spaces and hyphens only';
  } else {
    firstName.error.textContent = '';
  }
  return isValid;
}

function validateLastName() {
  const isValid = lastName.input.checkValidity();
  const { validity } = lastName.input;
  if (validity.valueMissing) {
    lastName.error.textContent = 'Last name required';
  } else if (validity.patternMismatch) {
    lastName.error.textContent =
      'Last name must consist of letters, single spaces and hyphens only';
  } else {
    lastName.error.textContent = '';
  }
  return isValid;
}

function validatePassword() {
  const isValid = password.input.checkValidity();
  const { validity } = password.input;
  if (validity.valueMissing) {
    password.error.textContent = 'Password required';
  } else if (validity.patternMismatch) {
    password.error.textContent =
      'Password is not strong enough. It should be at least 8 characters with a mix of uppercase and lowercase letters, digits and symbols - at least one of each';
  } else {
    password.error.textContent = '';
  }
  return isValid;
}

function validateConfirmPassword() {
  const isValid = confirmPassword.input.checkValidity();
  const { validity } = confirmPassword.input;
  const doPasswordsMatch = password.input.value === confirmPassword.input.value;
  if (validity.valueMissing) {
    confirmPassword.error.textContent = 'Confirm password required';
  } else if (!doPasswordsMatch) {
    confirmPassword.error.textContent = 'Passwords do not match';
    return false;
  } else {
    confirmPassword.error.textContent = '';
  }
  return isValid;
}

function validateAllFields() {
  // Initially tried to do this as one big boolean statement,
  // but the statement short circuits as soon as one result is false,
  // and any validation functions after that are not executed, and no further errors shown.
  // So do it this way. Looks less fancy, but whatever.
  const email = validateEmail();
  const firstName = validateFirstName();
  const lastName = validateLastName();
  const password = validatePassword();
  const confirmPassword = validateConfirmPassword();
  return email && firstName && lastName && password && confirmPassword;
}

function handleInputBlur(input, validationFn) {
  const removeOnValidInput = () => {
    if (validationFn()) {
      input.removeEventListener('input', removeOnValidInput);
    }
  };

  if (!validationFn()) {
    input.addEventListener('input', removeOnValidInput);
  }
}

function addBlurListeners() {
  email.input.addEventListener('blur', () => {
    handleInputBlur(email.input, validateEmail);
  });

  firstName.input.addEventListener('blur', () => {
    handleInputBlur(firstName.input, validateFirstName);
  });

  lastName.input.addEventListener('blur', () => {
    handleInputBlur(lastName.input, validateLastName);
  });

  password.input.addEventListener('blur', () => {
    handleInputBlur(password.input, validatePassword);
  });

  confirmPassword.input.addEventListener('blur', () => {
    handleInputBlur(confirmPassword.input, validateConfirmPassword);
  });
}

addBlurListeners();

function validateSignUpForm(event) {
  // Clear list of errors.
  // Errrrrrrrrrr need to do list of errors first. WHOOPS!
  event.preventDefault();
  // If all form inputs validate, submit the form.
  if (validateAllFields()) {
    event.currentTarget.submit();
  }
}
