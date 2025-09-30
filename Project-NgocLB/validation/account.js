export const validateEmail = (email) => {
  if (email === "") {
    return [false, "Email không được bỏ trống"];
  }
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (!emailRegex.test(email)) {
    return [false, "Định dạng email không hợp lệ"];
  }

  return [true, ""];
};

export const checkExistEmail = (email) => {
  let users = JSON.parse(localStorage.userDB || null);
  let checkIndex = users.findIndex((user) => user.email === email);
  if (checkIndex !== -1) {
    return [false, "Email đã tồn tại, hãy nhập email khác!"];
  }
  return [true, ""];
};

export const validateUsername = (username) => {
  if (username === "") {
    return [false, "Tên người dùng không được bỏ trống"];
  }
  return [true, ""];
};

export const validatePassword = (password) => {
  if (password === "") {
    return [false, "Mật khẩu không được bỏ trống"];
  }
  if (password.length < 8) {
    return [false, "Mật khẩu phải có tối thiểu 8 ký tự"];
  }
  if (!/^(?=.*[0-9])/.test(password)) {
    return [false, "Mật khẩu phải bao gồm cả chữ số"];
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    return [false, "Mật khẩu phải có cả chữ thường và chữ hoa"];
  }
  return [true, ""];
};

export const getDataFromInput = () => {
  let usercodeValue = Number(document.getElementById("usercode").value);
  let usernameValue = document.getElementById("username").value.trim();
  let emailValue = document.getElementById("email").value.trim();
  let passwordValue = document.getElementById("password").value.trim();
  let roleValue = document.getElementById("role").value;
  let birthdayValue = document.getElementById("birthday").value || "";
  let statusInput = document.querySelector("input[name=status]:checked");
  let statusValue = "";
  if (statusInput) {
    statusValue = statusInput.value === "active";
  }
  let descriptionValue =
    document.getElementById("description").value.trim() || "";
  return {
    id: usercodeValue,
    username: usernameValue,
    email: emailValue,
    password: passwordValue,
    role: roleValue,
    birthday: birthdayValue,
    status: statusValue,
    description: descriptionValue,
  };
};
