import {
  getDataFromInput,
  validateEmail,
  validateUsername,
  validatePassword,
} from "../validation/account.js";

import toast from "../toast/toast.js";

// const getParamFromUrl = (key) => {
//   const search = window.location.search;
//   const paramObj = new URLSearchParams(search);
//   return paramObj.get(key);
// };

// let edittingId = getParamFromUrl("user_id");

let edittingId = JSON.parse(sessionStorage.edittingId);
let users = JSON.parse(localStorage.userDB) || [];

function showEdittingUser(id) {
  let edittingUser = users.find((user) => user.id == id);
  document.getElementById("usercode").value = edittingUser.id;
  document.getElementById("username").value = edittingUser.username;
  document.getElementById("email").value = edittingUser.email;
  document.getElementById("password").value = edittingUser.password;
  document.getElementById("role").value = edittingUser.role || "";
  document.getElementById(
    `${edittingUser.status ? "active" : "deactive"}`
  ).checked = true;
  document.getElementById("birthday").value = edittingUser.birthday || "";
  document.getElementById("description").value = edittingUser.description || "";
  return document.getElementById("email").value;
}

function saveEdittedUser() {
  let loginingUserRole = JSON.parse(localStorage.loginingUserRole) || "";
  console.log(loginingUserRole);

  if (loginingUserRole === "USER" || loginingUserRole === "") {
    toast.error("Bạn không có quyền chỉnh sửa thông tin");
    return;
  }
  let edittedUser = getDataFromInput();
  let msg = [];
  let isValidEmail = validateEmail(edittedUser.email);
  if (!isValidEmail[0]) {
    msg.push(isValidEmail[1]);
  }
  let isValidUsername = validateUsername(edittedUser.username);
  if (!isValidUsername[0]) {
    msg.push(isValidUsername[1]);
  }
  let isValidPassword = validatePassword(edittedUser.password);
  if (!isValidPassword[0]) {
    msg.push(isValidPassword[1]);
  }
  if (msg.length > 0) {
    toast.error(msg.join("<br>"));
    return;
  }

  let invalidUsers = users.filter((user) => user.email !== originalEmail);
  let checkValidIndex = invalidUsers.findIndex(
    (user) => user.email === edittedUser.email
  );
  if (checkValidIndex !== -1) {
    toast.invalid("Email đã tồn tại, hãy nhập email khác!");
  } else {
    let index = users.findIndex((user) => user.id === edittingId);
    if (index !== -1) {
      users[index].username = edittedUser.username;
      users[index].email = edittedUser.email;
      users[index].password = edittedUser.password;
      users[index].role = edittedUser.role;
      users[index].birthday = edittedUser.birthday;
      users[index].status = edittedUser.status;
      users[index].description = edittedUser.description;
    }

    toast.success("Đã sửa thành công");
    localStorage.userDB = JSON.stringify(users);

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);
  }
}

let originalEmail = showEdittingUser(edittingId);
let saveBtn = document.querySelector(".save-button");
saveBtn.addEventListener("click", saveEdittedUser);
