class FormValidate {
  constructor() {
    this.form = document.querySelector('[data-form]');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', event => {
      this.handleSubmit(event);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const validFields = this.validFields();
    const validPasswords = this.validPasswords();

    if (validFields && validPasswords) {
      alert('Formulário enviado.');
      this.form.reset();
    }
  }

  validFields() {
    let isValid = true;

    this.form.querySelectorAll('[data-error]').forEach( errorText => {
      errorText.remove();
    });

    this.form.querySelectorAll('[data-validate]').forEach( field => {
      const label = field.previousElementSibling.innerText;

      if (!field.value) {
        this.createError(field, `Campo <strong>${label}</strong> não pode estar em branco.`);
        isValid = false;
        return;
      }

      if (field.getAttribute('name') === 'cpf') {
        if (!this.cpfValidate(field)) isValid = false;
      }

      if (field.getAttribute('name') === 'user') {
        if (!this.userValidate(field)) isValid = false;
      }
    });

    return isValid
  }

  createError(field, message) {
    const div = document.createElement('div');
    div.innerHTML = message;
    div.setAttribute('data-error', '');
    div.classList.add('text-xs','text-red-500', 'mb-2');
    field.insertAdjacentElement('afterend', div);
  }

  cpfValidate(field) {
    const cpf = new CPFValidator(field.value);   

    if (!cpf.validate()) {
      this.createError(field, '<strong>CPF</strong> inválido.');
      return false;
    }

    return true;
  }

  userValidate(field) {
    const user = field.value;
    let isValid = true;

    if (user.length < 3 || user.length > 12) {
      this.createError(field, 'Campo <strong>Usuário</strong> precisa ter entre 3 e 12 caracteres.');
      isValid = false;
    }

    if (!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(field, 'Campo <strong>Usuário</strong> precisa conter apenas letras e/ou números.');
      isValid = false;
    }

    return isValid;
  }

  validPasswords() {
    let isValid = true;
    const password = this.form.querySelector('[name="password"]');
    const repeatPassword = this.form.querySelector('[name="repeat_password"]');
    
    if (password.value !== repeatPassword.value) {
      this.createError(password, 'Campo <strong>Senha</strong> e <strong>Repetir senha</strong> precisam ser iguais.');
      this.createError(repeatPassword, 'Campo <strong>Senha</strong> e <strong>Repetir senha</strong> precisam ser iguais.');
      isValid = false;
    }

    if (password.value.length < 6 || password.value.length > 12) {
      this.createError(password, 'Campo <strong>Senha</strong> precisa ter entre 6 e 12 caracteres.');
      isValid = false;
    }

    return isValid;
  }
}