const email = getFormElements('email-section');
const firstName = getFormElements('first-name-section');
const lastName = getFormElements('last-name-section');
const password = getFormElements('password-section');
const confirmPassword = getFormElements('confirm-password-section');

function addBlurListeners() {
  email.input.addEventListener('blur', () => {
    handleInputBlur(email.input, () => validateEmail(email));
  });

  firstName.input.addEventListener('blur', () => {
    handleInputBlur(firstName.input, () => validateFirstName(firstName));
  });

  lastName.input.addEventListener('blur', () => {
    handleInputBlur(lastName.input, () => validateLastName(lastName));
  });

  password.input.addEventListener('blur', () => {
    handleInputBlur(password.input, () => validatePassword(password));
  });

  confirmPassword.input.addEventListener('blur', () => {
    handleInputBlur(confirmPassword.input, () =>
      validateConfirmPassword(confirmPassword, password),
    );
  });
}

addBlurListeners();

function validateSignUpForm(event) {
  // Clear list of errors.
  // Errrrrrrrrrr need to do list of errors first. WHOOPS!
  event.preventDefault();

  const emailValid = validateEmail(email);
  const firstNameValid = validateFirstName(firstName);
  const lastNameValid = validateLastName(lastName);
  const passwordValid = validatePassword(password);
  const confirmPasswordValid = validateConfirmPassword(
    confirmPassword,
    password,
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
