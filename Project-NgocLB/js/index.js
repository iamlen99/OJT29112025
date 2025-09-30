// let users = [
//   {
//     id: 1,
//     username: "Leanne Graham",
//     email: "Sincere@april.biz",
//     password: "Sincere@123",
//     role: "ADMIN",
//     birthday: "31/01/1995",
//     status: true,
//   },
//   {
//     id: 2,
//     username: "Ervin Howel",
//     email: "Shanna@melis.tv",
//     password: "Sincere@123",
//     role: "USER",
//     birthday: "25/10/1985",
//     status: false,
//   },
//   {
//     id: 3,
//     username: "Clementine Bauch",
//     email: "Julianne@kory.org",
//     password: "Julianne@kory.org",
//     role: "USER",
//     birthday: "29/10/1995",
//     status: true,
//   },
//   {
//     id: 4,
//     username: "Patricia Lebsack",
//     email: "Lucio@annie.ca",
//     password: "Sincere@123",
//     role: "USER",
//     birthday: "1995-7-15",
//     status: false,
//   },
//   {
//     id: 5,
//     username: "Kurtis Weissnat",
//     email: "Telly.Hger@billy.biz",
//     password: "Sincere@123",
//     role: "ADMIN",
//     birthday: "1999-9-14",
//     status: false,
//   },
// ];

let users = JSON.parse(localStorage.userDB) || [];
let filteredUsers = [...users];
let currentPage = JSON.parse(sessionStorage.currentPage || 1);
let usersPerPage = 5;

function formatDate(isoDateStr) {
  const [year, month, day] = isoDateStr.split("-");
  return `${day}/${month}/${year}`;
}

function renderUsers(user) {
  return `
          <tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role ? user.role : ""}</td>
            <td>${user.birthday ? formatDate(user.birthday) : ""}</td>
            <td>
              <div class="status ${
                user.status ? "active-status" : "deactive-status"
              }">
                <div class="dot"></div>
                <p class="status-text">${user.status ? "Active" : "Deactive"}
                </p>
              </div>
            </td>
            <td>
              <button class="delete-btn button"
              onclick = "deleteUser(${user.id})">
                <img
                  src="./assets/images/delete-icon.png"
                  alt="delete icon"
                  width="20px"
                />
              </button>
              <button class="edit-btn button" onclick = "editUser(${user.id})">
                <img
                  src="./assets/images/edit-icon.png"
                  alt="edit icon"
                  width="20px"
                />
              </button>
            </td>
          </tr>
  `;
}

function renderPagination() {
  let totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  let pagination = document.getElementById("pagination");
  let buttons = "";
  for (let i = 1; i <= totalPages; i++) {
    buttons += `<a ${
      i === currentPage ? "class='current-page'" : ""
    } onclick = "goToPage(${i})">${i}</a>`;
  }
  pagination.innerHTML = buttons;
}

function showUsersInfo(page) {
  let start = (page - 1) * usersPerPage;
  let end = page * usersPerPage;
  let usersToShow = filteredUsers.slice(start, end);
  let showUsers = document.getElementById("show-users");
  let showUsersInfo = "";
  for (let user of usersToShow) {
    showUsersInfo += renderUsers(user);
  }
  showUsers.innerHTML = showUsersInfo;
  renderPagination();
}

function goToPage(page) {
  currentPage = page;
  sessionStorage.currentPage = JSON.stringify(currentPage);
  showUsersInfo(page);
}

function goToNextPage() {
  let totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    goToPage(currentPage);
  }
}

function goToPrePage() {
  if (currentPage > 1) {
    currentPage--;
    goToPage(currentPage);
  }
}

function deleteUser(id) {
  if (confirm("Bạn có chắc chắn xóa tài khoản này không?")) {
    alert("Đã xóa thành công");
    users = users.filter((user) => user.id !== id);
    filteredUsers = users;
    localStorage.userDB = JSON.stringify(users);
    showUsersInfo(currentPage);
  }
}

function editUser(id) {
  sessionStorage.edittingId = JSON.stringify(id);
  window.location.href = "../pages/edit-user.html";
}

function searchUserByName() {
  let searchValue = document
    .getElementById("search-user-input")
    .value.trim()
    .toLowerCase();
  filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchValue)
  );
  currentPage = 1;
  showUsersInfo(currentPage);
}

showUsersInfo(currentPage);
