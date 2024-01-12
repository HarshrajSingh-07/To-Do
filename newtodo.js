const addUser = document.getElementById("adduser");
const btnText = addUser.innerHTML;
const userInput = document.getElementById("username");
const recordsDisplay = document.getElementById("records");

let edit_id = null;
let userDetail = [];
let strobj = localStorage.getItem("user");
if (strobj != null) {
  userDetail = JSON.parse(strobj);
}

displayInfo();

addUser.onclick = () => {
  const name = userInput.value;
  if (name.length != 0) {
    if (edit_id != null) {
      userDetail.splice(edit_id, 1, { name: name });
      edit_id = null;
    } else {
      userDetail.push({ name: name });
    }
    saveInfo(userDetail);
    userInput.value = "";
    addUser.innerHTML = btnText;
    document.getElementById("p").style.display = "none";
  } else {
    document.getElementById("p").style.display = "block";
  }
};

function saveInfo(userDetail) {
  let str = JSON.stringify(userDetail);
  localStorage.setItem("user", str);
  displayInfo();
}

function displayInfo() {
  let statement = "";
  userDetail.forEach((user, i) => {
    statement += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${user.name}</td>
    <td><i class="fa fa-edit btn text-white btn-info fs-6 mx-1" onClick="editInfo(${i})"></i><i class="fa fa-trash-o btn text-white btn-danger fs-6 mx-1" onClick="deleteInfo(${i})"></i></td>
</tr>
`;
    recordsDisplay.innerHTML = statement;
  });
}

function editInfo(id) {
  edit_id = id;
  userInput.value = userDetail[id].name;
  addUser.innerHTML = "Save Changes";
}

function deleteInfo(id) {
  userDetail.splice(id, 1);
  saveInfo(userDetail);
}
