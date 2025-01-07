const email = getFormElements('email-section');
const password = getFormElements('password-section');

const passwordRequiredErrorMsg = 'Password is a required field... obviously';

function addBlurListeners() {
  email.input.addEventListener('blur', () => {
    validateOnInputUntilValid(email.input, () => {
      return validateEmail(email);
    });
  });

  password.input.addEventListener('blur', () => {
    validateOnInputUntilValid(password.input, () => {
      return validateRequiredField(password, passwordRequiredErrorMsg);
    });
  });
}

addBlurListeners();

function validateLogInForm(event) {
  event.preventDefault();

  const isEmailValid = validateOnInputUntilValid(email.input, () => {
    return validateEmail(email);
  });

  const isPasswordValid = validateOnInputUntilValid(password.input, () => {
    return validateRequiredField(password, passwordRequiredErrorMsg);
  });

  if (isEmailValid && isPasswordValid) {
    event.currentTarget.submit();
  }
}
