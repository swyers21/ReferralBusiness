  
    const buttons = document.querySelectorAll('.mdc-button');
    for (const button of buttons) {
      MDCRipple.attachTo(button);
    }

    const textFields = document.querySelectorAll('.mdc-text-field');
    for (const textField of textFields) {
      MDCTextField.attachTo(textField);
    }
