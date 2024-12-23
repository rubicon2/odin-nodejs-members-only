const title = getFormElements('title-section');
// Bloody html inputs and textareas and all these things having to be dealt with differently.
// Instead of value property we have to use textContent... annoying.
const text = (() => {
  const parent = document.getElementById('text-section');
  return {
    input: parent.querySelector('textarea'),
    error: parent.querySelector('.form--error'),
  };
})();

const titleRequiredErrorMsg = 'Title is a required field';
const textRequiredErrorMsg = 'Text is a required field';

function addBlurListeners() {
  title.input.addEventListener('blur', () => {
    handleInputBlur(title.input, () =>
      validateRequiredField(title, titleRequiredErrorMsg),
    );
  });

  text.input.addEventListener('blur', () => {
    handleInputBlur(text.input, () =>
      validateRequiredField(text, textRequiredErrorMsg),
    );
  });
}

addBlurListeners();

function validateNewMessageForm(event) {
  event.preventDefault();

  const isTitleValid = validateRequiredField(title, titleRequiredErrorMsg);
  const isTextValid = validateRequiredField(text, textRequiredErrorMsg);
  if (isTitleValid && isTextValid) {
    event.currentTarget.submit();
  }
}
