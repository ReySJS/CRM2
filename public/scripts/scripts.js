let editNameInput = document.getElementById("user_name");
let editEmailInput = document.getElementById("user_email");
let editPhoneInput = document.getElementById("user_phone");
let editPassword1Input = document.getElementById("user_password1");
let editPassword2Input = document.getElementById("user_password2");
const elements = document.querySelectorAll('.list_screen');
const screens = document.querySelectorAll('.screen');







function setLoggedUser() {
    // nameInput.value = userClass.getName()
    // emailInput.value = userClass.getEmail()
    // phoneInput.value = userClass.getPhone()
    // password1Input.value = userClass.getPassword()
    // password2Input.value = userClass.getPassword()
}

setLoggedUser()

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', focusList);
}
function focusList(a) {
    elements.forEach(_elements => _elements.classList.remove("target_li"));
    a.target.classList.add("target_li");
}

function showScreen(_screenNumber) {
    for (let i = 0; i < screens.length; i++) {
        screens[i].style.display = "none";
    }
    screens[_screenNumber].style.display = "flex";
}

function changeToEditUser() {
    document.getElementById('return_new_user').style.display = "none";
    document.getElementById('return_user_list').style.display = "none";
    document.getElementById('return_user_edit').style.display = "flex";
    clearEditReturn();
}

//
//USER LIST
function showUserList(idValue) {

    if (idValue == "" || idValue == undefined) {
        idValue = "all";
    }
    changeToUserList()

    let xhttp = new XMLHttpRequest();

    xhttp.onload = function () {

        let userList = JSON.parse(this.response)

        if (userList.length != 0) {

            document.getElementById('table_user_list').innerHTML = "";

            for (let i = 0; i < userList.length; i++) {
                document.getElementById('table_user_list').innerHTML += `
            <tr>
                <td onclick="showUserToEdit(${userList[i].id})">${userList[i].id}</td>
                <td onclick="showUserToEdit(${userList[i].id})">${userList[i].name}</td>
                <td onclick="showUserToEdit(${userList[i].id})">${userList[i].email}</td>
                <td onclick="showUserToEdit(${userList[i].id})">${userList[i].phone}</td>
                <td class="thin_data_in_table"><input type="checkbox" id="checkbox${userList[i].id}" class="action_checkbox" value="${userList[i].id}" /></td>
            </tr>`
            }
        } else {
            document.getElementById('searching_return_error').innerHTML = "There is no User for this ID";
        }
    }
    xhttp.open("GET", `http://127.0.0.1/user/${idValue}`, true);
    xhttp.send();
}

function showUserToEdit(userId) {
    changeToEditUser();

    let xhttp = new XMLHttpRequest();

    xhttp.onload = function () {

        let userToEdit = JSON.parse(this.response);

        document.getElementById("edit_user_id").innerHTML = `Editing User ID ${userId}`
        document.getElementById("edit_user_name").value = userToEdit[0].name;
        document.getElementById("edit_user_email").value = userToEdit[0].email;
        document.getElementById("edit_user_phone").value = userToEdit[0].phone;

    }
    xhttp.open("GET", `http://127.0.0.1/user/${userId}`, true);
    xhttp.send();
}

let nomeEdited = document.getElementById("edit_user_name");
let emailEdited = document.getElementById("edit_user_email");
let phoneEdited = document.getElementById("edit_user_phone");

function editUser(userId) {
    let idChoose = Number(userId);


    let newUser = {};
    newUser["id"] = idChoose;
    newUser["nome"] = nomeEdited.value;
    newUser["email"] = emailEdited.value;
    newUser["phone"] = phoneEdited.value;
    let user = JSON.stringify(newUser);

    console.log(user);

    let xhttp = new XMLHttpRequest();

    xhttp.open("PUT", `http://127.0.0.1/user/${idChoose}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    xhttp.onload = () => {

        document.getElementById('edition_return').innerHTML = `User Successfully Edited`;
        document.getElementById('edition_return').style.color = "#00917c"
    }
    xhttp.send(user);
}

function areYouSureRemove() {

    clearSearchingReturn();
    clearRemovingReturn();

    let itemsToRemove = document.querySelectorAll('.action_checkbox:checked')

    if (itemsToRemove.length == 0) {
        document.getElementById('removing_return_error').innerHTML = "Select a user to remove"
    } else {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#5e5e5e',
            customClass: 'alert',
            className: "nome",
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                removeUser(itemsToRemove);
                return true;
            }
        })
    }
}

function removeUser(itemsToRemove) {

    for (let i = 0; i < itemsToRemove.length; i++) {

        console.log(Number(itemsToRemove[i].value))
        let xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
        }

        xhttp.open("DELETE", `http://127.0.0.1/user/${itemsToRemove[i].value}`, true);
        xhttp.send();
        showUserList();
    }
}