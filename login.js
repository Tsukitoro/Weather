import loginPass from "./passwords.json" assert { type: "json" };

let currentUser = "";

async function Login() {
    const login = document.getElementById('login').value;
    const pass = document.getElementById('password').value;
    const found = loginPass.accounts.find(e => e.login === login && e.pass === pass);
    if (!found) {
        return;
    }

    currentUser = login;

    renderProfilePanel(found?.displayName || login);
}

function renderProfilePanel(displayName) {
    const element = document.createElement('p');
    element.setAttribute("id", "profile-name")
    element.innerHTML = `Добро пожаловать, ${displayName}`;

    document.getElementById("profile").remove();

    const target = document.createElement('div');
    target.setAttribute("id", "profile")
    target.insertAdjacentElement('beforeend', element);

    const changeNameEl = document.createElement('div');
    const nameInputEl = document.createElement("input");
    nameInputEl.setAttribute('id', "profile-name-input");
    nameInputEl.setAttribute("style", "width: 90%; border: none");
    const buttNameInputEl = document.createElement("button");
    buttNameInputEl.innerHTML = "Сменить имя";
    buttNameInputEl.setAttribute('id', "profile-name-button");
    buttNameInputEl.setAttribute("style", "width: 90%; border: none; height: 20px; margin-top: 10px");
    buttNameInputEl.addEventListener("click", changeName);
    
    changeNameEl.insertAdjacentElement('afterbegin', nameInputEl);
    changeNameEl.insertAdjacentElement('beforeend', buttNameInputEl);
    target.insertAdjacentElement('beforeend', changeNameEl);
    
    const targetContainer = document.getElementById("profile-container");
    targetContainer.insertAdjacentElement("beforeend", target);
}

function changeName () {
    const nextName = document.getElementById("profile-name-input").value;
    loginPass.accounts.some(e => e.login === currentUser
        ? (e.displayName = nextName) && true
        : false);

    console.log(loginPass.accounts);

    renderProfilePanel(nextName);
}

window.Login = Login;
