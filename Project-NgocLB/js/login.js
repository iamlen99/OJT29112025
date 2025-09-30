import toast from "../toast/toast.js";
let userDB = JSON.parse(localStorage.userDB) || [];

function getDataFormInput() {
  let emailValue = document.getElementById("login-email").value.trim();
  let passwordValue = document.getElementById("login-password").value.trim();
  return {
    email: emailValue,
    password: passwordValue,
  };
}

function signIn() {
  let inputValue = getDataFormInput();
  let msg = [];
  if (inputValue.email === "") {
    msg.push("Email không được để trống");
  }

  if (inputValue.password === "") {
    msg.push("Mật khẩu không được để trống");
  }

  if (msg.length > 0) {
    toast.error(msg.join("<br>"));
    return;
  }

  let index = userDB.findIndex(
    (user) =>
      user.email === inputValue.email && user.password === inputValue.password
  );
  if (index === -1) {
    toast.invalid("Email hoặc mật khẩu không tồn tại");
  } else {
    let loginingUserRole = userDB[index].role || "";
    localStorage.loginingUserRole = JSON.stringify(loginingUserRole);
    toast.success("Đăng nhập thành công");
    sessionStorage.currentPage = JSON.stringify(1);
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);
  }
}

let signInButton = document.getElementById("login-button");
signInButton.addEventListener("click", signIn);
