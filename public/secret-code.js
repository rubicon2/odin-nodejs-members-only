const secretCode = getFormElements('secret-code-section');

const secretCodeErrorMsg = 'The secret code is a required field';

secretCode.input.addEventListener('blur', () => {
  validateOnInputUntilValid(secretCode.input, () => {
    return validateRequiredField(secretCode, secretCodeErrorMsg);
  });
});

function validateSecretCodeForm(event) {
  event.preventDefault();

  const isValid = validateOnInputUntilValid(secretCode.input, () => {
    return validateRequiredField(secretCode, secretCodeErrorMsg);
  });

  if (isValid) {
    event.currentTarget.submit();
  }
}
