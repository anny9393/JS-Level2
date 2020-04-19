const name = document.getElementsByClassName('name')[0];
const phone = document.getElementsByClassName('phone')[0];
const email = document.getElementsByClassName('email')[0];
const textarea = document.getElementsByClassName('text-area')[0];
const button = document.getElementsByClassName('contact-btn')[0];
const h2Elname = document.getElementsByClassName('error-message-name')[0];
const h2Elphone = document.getElementsByClassName('error-message-phone')[0];
const h2Elemail = document.getElementsByClassName('error-message-email')[0];


function checkForm() {
    checkName();
    checkPhone();
    checkemail();
}

function checkName() {
    nameReg = /[a-zA-z]/;
    const nameValue = name.value;
    if (nameReg.test(nameValue) === false) {
        name.classList.add('error');
        h2Elname.innerHTML = 'Name Invalid. Please enter again';    
    }
    else if (nameReg.test(nameValue) === true) {
    name.classList.remove('error');
    h2Elname.innerHTML = '';
}};

function checkPhone() {
    const phoneValue = phone.value;
 if (phoneValue.length !== 10) {
    phone.classList.add('error');
    h2Elphone.innerHTML = 'Phone Number Invalid. Please enter 10 digits';
 }
else if (phoneValue.length === 10) 
      { phone.classList.remove('error');
      h2Elphone.innerHTML = '';
      return phoneValue.replace(/(\d{3})(\d{3})(\d{4})/g, '+7($1)($2)-($3)')
}}

function checkemail() {
    const emailValue = email.value;
    emailReg = /^\w+([\.-]?\w+)*@\w{4}\.[a-z]{2}$/;
    if(emailReg.test(emailValue) === false) {
        email.classList.add('error');
        h2Elemail.innerHTML = 'Email Invalid. Please enter again';
    }
    else if (emailReg.test(emailValue) === true) {
        email.classList.remove('error');
        h2Elemail.innerHTML = '';
    }
}