const email = getFormElements('email-section');
const firstName = getFormElements('first-name-section');
const lastName = getFormElements('last-name-section');
const password = getFormElements('password-section');
const confirmPassword = getFormElements('confirm-password-section');

function addBlurListeners() {
  email.input.addEventListener('blur', () => {
    validateOnInputUntilValid(email.input, () => {
      return validateEmail(email);
    });
  });

  firstName.input.addEventListener('blur', () => {
    validateOnInputUntilValid(firstName.input, () => {
      return validateFirstName(firstName);
    });
  });

  lastName.input.addEventListener('blur', () => {
    validateOnInputUntilValid(lastName.input, () => {
      return validateLastName(lastName);
    });
  });

  password.input.addEventListener('blur', () => {
    validateOnInputUntilValid(password.input, () => {
      return validatePassword(password);
    });
  });

  confirmPassword.input.addEventListener('blur', () => {
    // As soon as confirm password input has lost focus, we
    // will check the confirm password is valid and also
    // upon any further input. We will not stop listening
    // even if it is correct, unlike all the other blur listeners.
    validateConfirmPassword(confirmPassword, password);
    confirmPassword.input.addEventListener('input', () => {
      validateConfirmPassword(confirmPassword, password);
    });
  });
}

addBlurListeners();

// When password input is changed, if there is already something in confirmPassword input, check to see if it matches.
password.input.addEventListener('input', () => {
  // Checking for blank stops the error being shown unless the user has already typed
  // something in the confirm password field.
  if (confirmPassword.input.value !== '') {
    validateConfirmPassword(confirmPassword, password);
  }
});

function validateSignUpForm(event) {
  // Clear list of errors.
  // Errrrrrrrrrr need to do list of errors first. WHOOPS!
  event.preventDefault();

  const emailValid = validateOnInputUntilValid(email.input, () => {
    return validateEmail(email);
  });

  const firstNameValid = validateOnInputUntilValid(firstName.input, () => {
    return validateFirstName(firstName);
  });

  const lastNameValid = validateOnInputUntilValid(lastName.input, () => {
    return validateLastName(lastName);
  });

  const passwordValid = validateOnInputUntilValid(password.input, () => {
    // If user is editing this password after typing in confirm password field, make that listen for changes too.
    // This stops the error being shown unless the user has typed something in the confirm password field.
    if (confirmPassword.input.value !== '') {
      validateConfirmPassword(confirmPassword, password);
    }
    return validatePassword(password);
  });

  const confirmPasswordValid = validateOnInputUntilValid(
    confirmPassword.input,
    () => {
      return validateConfirmPassword(confirmPassword, password);
    },
  );

  // If all form inputs validate, submit the form.
  if (
    emailValid &&
    firstNameValid &&
    lastNameValid &&
    passwordValid &&
    confirmPasswordValid
  ) {
    event.currentTarget.submit();
  }
}
