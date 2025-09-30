import toast from "../toast/toast.js";
import {
  validateEmail,
  validateUsername,
  validatePassword,
  checkExistEmail,
} from "../validation/account.js";

let userDB = JSON.parse(localStorage.userDB) || [];

function getDataFormInput() {
  let emailValue = document.getElementById("register-email").value.trim();
  let usernameValue = document.getElementById("register-username").value.trim();
  let passwordValue = document.getElementById("register-password").value.trim();
  return {
    email: emailValue,
    username: usernameValue,
    password: passwordValue,
  };
}

function signUp() {
  let inputValue = getDataFormInput();
  let msg = [];
  let validEmail = validateEmail(inputValue.email);
  if (!validEmail[0]) {
    msg.push(validEmail[1]);
  }
  let validUsername = validateUsername(inputValue.username);
  if (!validUsername[0]) {
    msg.push(validUsername[1]);
  }
  let validPassword = validatePassword(inputValue.password);
  if (!validPassword[0]) {
    msg.push(validPassword[1]);
  }

  if (msg.length > 0) {
    toast.error(msg.join("<br>"));
    return;
  }

  let isValidEmail = checkExistEmail(inputValue.email);
  if (!isValidEmail[0]) {
    toast.invalid(isValidEmail[1]);
    return;
  } else {
    toast.success("Đăng kí thành công");
    inputValue.id = Date.now();
    userDB.push(inputValue);
    localStorage.userDB = JSON.stringify(userDB);
    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 1000);
  }
}

let signUpButton = document.getElementById("register-button");
signUpButton.addEventListener("click", signUp);
