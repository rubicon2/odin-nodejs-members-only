const email = getFormElements('email-section');
const password = getFormElements('password-section');

const passwordRequiredErrorMsg = 'Password is a required field... obviously';

function addBlurListeners() {
  email.input.addEventListener('blur', () => {
    handleInputBlur(email.input, () => validateEmail(email));
  });

  password.input.addEventListener('blur', () => {
    handleInputBlur(password.input, () =>
      validateRequiredField(password, passwordRequiredErrorMsg),
    );
  });
}

addBlurListeners();

function validateLogInForm(event) {
  event.preventDefault();

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validateRequiredField(
    password,
    passwordRequiredErrorMsg,
  );
  if (isEmailValid && isPasswordValid) {
    event.currentTarget.submit();
  }
}
