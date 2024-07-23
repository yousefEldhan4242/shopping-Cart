let products = JSON.parse(localStorage.getItem("products"));
const btn = document.querySelector(".submit-btn");
const emailField = document.querySelector("input[type='email']");
const passwordField = document.querySelector("input[type='password']");
const emailWarning = document.querySelector(".email-warning");
const passwordWarning = document.querySelector(".password-warning");
const failAudio = document.getElementById("fail-audio");
const regEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

// Check If The User Has Logged In
if (localStorage.getItem("email") && localStorage.getItem("password")) {
  window.location.pathname = "/home.html";
}

btn.addEventListener("click", (e) => {
  // Check If All Conditions Are Met
  if (
    regEmail.test(emailField.value.trim()) &&
    emailField.value.trim().length > 0 &&
    passwordField.value.trim().length > 0 &&
    regPassword.test(passwordField.value.trim())
  ) {
    // Password Must Contain special character , digits , small letter ,capital letter and minimum length 8

    localStorage.setItem("email", emailField.value);
    localStorage.setItem("password", passwordField.value);
  } else {
    e.preventDefault();
    failAudio.play();
    e.target.classList.add("pointer-events-none");
    setTimeout(() => {
      e.target.classList.remove("pointer-events-none");
    }, 1000);

    // Check For Email Conditions Firstly
    if (
      regEmail.test(emailField.value.trim()) &&
      emailField.value.trim().length > 0
    ) {
      passwordWarning.textContent = validatePassword(passwordField.value);
      passwordWarning.classList.remove("animate-coolHorizontalShake");

      setTimeout(() => {
        passwordWarning.classList.add("animate-coolHorizontalShake");
      }, 0);

      emailWarning.textContent = "";
    } else {
      emailWarning.textContent = "Please Write A Valid Email";
      emailWarning.classList.remove("animate-coolHorizontalShake");

      setTimeout(() => {
        emailWarning.classList.add("animate-coolHorizontalShake");
      }, 0);
    }
  }
});

const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  } else if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  } else if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  } else if (!/[0-9]/.test(password)) {
    return "Password must contain at least one digit.";
  } else if (!/[!@#\$%\^&\*]/.test(password)) {
    return "Password must contain at least one special character (!@#$%^&*).";
  } else if (!regPassword.test(password)) {
    return "Password is invalid.";
  } else {
    return "";
  }
};

//  Handle NavBar
const userNameDiv = document.querySelector(".user-name");
const userNamevalue = localStorage.getItem("email");
const numOfTypesOfProdcuts = document.querySelector(".types-of-products");
const logOutOrLogInBtn = document.querySelector(".logout-btn");
const logOutCancelBtn = document.querySelector("#cancelLogoutButton");
const logOutConfirmlBtn = document.querySelector("#logoutconfirm");
const logOutMessage = document.querySelector("#overlay-logout");

// Check If The User LoggedIn Or LoggedOut
if (localStorage.getItem("email") && localStorage.getItem("password")) {
  logOutOrLogInBtn.textContent = "Logout";
  logOutOrLogInBtn.classList.add("bg-red-500", "hover:bg-red-600");
} else {
  logOutOrLogInBtn.textContent = "Login";
  logOutOrLogInBtn.classList.add("bg-blue-500", "hover:bg-blue-700");
}

if (userNamevalue) {
  userNameDiv.textContent = userNamevalue
    .slice(0, 2)
    .trim()
    .toLocaleUpperCase();
} else {
  userNameDiv.style.display = "none";
}

// Set Number Of Items For The First Time
numOfTypesOfProdcuts.textContent = products ? products.length : 0;

// Handle Logging Out
logOutOrLogInBtn.addEventListener("click", () => {
  if (logOutOrLogInBtn.textContent == "Logout") {
    logOutMessage.classList.remove("hidden");
    logOutMessage.classList.add("flex", "items-center", "justify-center");
  } else {
    window.location.pathname = "index.html";
  }
});

logOutConfirmlBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.pathname = "/index.html";
});
logOutCancelBtn.addEventListener("click", () => {
  logOutMessage.classList.remove("flex", "items-center", "justify-center");
  logOutMessage.classList.add("hidden");
});
