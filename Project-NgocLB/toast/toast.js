function showToast(type) {
  let toastBoxElement = document.querySelector(".toast-box");
  let toast = document.createElement("div");
  toast.classList.add("toast", type.class);

  toast.innerHTML = `
      <div class="toast-header">
        ${type.icon}
        <span>${type.title}</span>
      </div>
      <div class="toast-content">${type.message}</div>
  `;

  toastBoxElement.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function success(msg) {
  const type = {
    title: "Success",
    class: "success",
    message: msg,
    icon: `<i class="fa-solid fa-circle-check"></i>`,
  };
  showToast(type);
}

function error(msg) {
  const type = {
    title: "Error",
    class: "error",
    message: msg,
    icon: `<i class="fa-solid fa-circle-minus"></i>`,
  };
  showToast(type);
}

function invalid(msg) {
  const type = {
    title: "Invalid",
    class: "invalid",
    message: msg,
    icon: `<i class="fa-solid fa-circle-exclamation"></i>`,
  };
  showToast(type);
}

const toast = { success, error, invalid };

export default toast;
