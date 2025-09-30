import {
  validateEmail,
  validateUsername,
  validatePassword,
  getDataFromInput,
  checkExistEmail,
} from "../validation/account.js";

import toast from "../toast/toast.js";

let users = JSON.parse(localStorage.userDB);
document.getElementById("usercode").value = Date.now();

function addNewUser() {
  let userInput = getDataFromInput();
  let msg = [];
  let isValidEmail = validateEmail(userInput.email);
  if (!isValidEmail[0]) {
    msg.push(isValidEmail[1]);
  }
  let isValidUsername = validateUsername(userInput.username);
  if (!isValidUsername[0]) {
    msg.push(isValidUsername[1]);
  }
  let isValidPassword = validatePassword(userInput.password);
  if (!isValidPassword[0]) {
    msg.push(isValidPassword[1]);
  }
  if (msg.length > 0) {
    toast.error(msg.join("<br>"));
    return;
  }

  let isExistedEmail = checkExistEmail(userInput.email);
  if (!isExistedEmail[0]) {
    toast.invalid(isExistedEmail[1]);
  } else {
    toast.success("Đăng kí thành công");
    users.push(userInput);
    localStorage.userDB = JSON.stringify(users);
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);
  }
}

let addNewUserBtn = document.querySelector(".add-button");
addNewUserBtn.addEventListener("click", addNewUser);
