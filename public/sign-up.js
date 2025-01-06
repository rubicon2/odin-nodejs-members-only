const email = getFormElements('email-section');
const firstName = getFormElements('first-name-section');
const lastName = getFormElements('last-name-section');
const password = getFormElements('password-section');
const confirmPassword = getFormElements('confirm-password-section');

function addBlurListeners() {
  email.input.addEventListener('blur', () => {
    validateOnInputUntilValid(email.input, () => validateEmail(email));
  });

  firstName.input.addEventListener('blur', () => {
    validateOnInputUntilValid(firstName.input, () =>
      validateFirstName(firstName),
    );
  });

  lastName.input.addEventListener('blur', () => {
    validateOnInputUntilValid(lastName.input, () => validateLastName(lastName));
  });

  password.input.addEventListener('blur', () => {
    validateOnInputUntilValid(password.input, () => {
      validatePassword(password);
      // If user is editing this password after typing in confirm password field, make that listen for changes too.
      // This stops the error being shown unless the user has typed something in the confirm password field.
      if (confirmPassword.input.value !== '') {
        validateConfirmPassword(confirmPassword, password);
      }
    });
  });

  confirmPassword.input.addEventListener('blur', () => {
    validateOnInputUntilValid(confirmPassword.input, () =>
      validateConfirmPassword(confirmPassword, password),
    );
  });
}

addBlurListeners();

function validateSignUpForm(event) {
  // Clear list of errors.
  // Errrrrrrrrrr need to do list of errors first. WHOOPS!
  event.preventDefault();

  const emailValid = validateOnInputUntilValid(email.input, () =>
    validateEmail(email),
  );

  const firstNameValid = validateOnInputUntilValid(firstName.input, () =>
    validateFirstName(firstName),
  );

  const lastNameValid = validateOnInputUntilValid(lastName.input, () =>
    validateLastName(lastName),
  );

  const passwordValid = validateOnInputUntilValid(password.input, () => {
    validatePassword(password);
    // If user is editing this password after typing in confirm password field, make that listen for changes too.
    // This stops the error being shown unless the user has typed something in the confirm password field.
    if (confirmPassword.input.value !== '') {
      validateConfirmPassword(confirmPassword, password);
    }
  });

  const confirmPasswordValid = validateOnInputUntilValid(
    confirmPassword.input,
    () => validateConfirmPassword(confirmPassword, password),
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
