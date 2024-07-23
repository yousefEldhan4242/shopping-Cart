let products = JSON.parse(localStorage.getItem("products"));
const tableBody = document.querySelector("tbody");
const totalSpan = document.querySelector(".total");
const buyBtn = document.querySelector(".buy-btn button");
const logInConfirmBtn = document.querySelector("#loginconfirm");
const buyMessage = document.querySelector("#overlay-buy");
const buyDiv = document.querySelector("#overlay-buy > div");
const userNameDiv = document.querySelector(".user-name");
const userNamevalue = localStorage.getItem("email");
const numOfTypesOfProdcuts = document.querySelector(".types-of-products");
const logOutOrLogInBtn = document.querySelector(".logout-btn");
const logOutCancelBtn = document.querySelector("#cancelLogoutButton");
const logOutConfirmlBtn = document.querySelector("#logoutconfirm");
const logOutMessage = document.querySelector("#overlay-logout");
const butAudio = document.getElementById("buy-audio");

getProducts();

function getProducts() {
  getTotal();
  if (products) {
    products.forEach((product, index) => {
      // Create A Row In The Table With Each Product
      let tableRow = document.createElement("tr");

      let tdId = document.createElement("td");
      tdId.textContent = index + 1;
      tdId.classList.add(
        "px-4",
        "py-2",
        "border-b",
        "border-gray-200",
        "text-center",
        "sm:table-cell",
        "hidden"
      );

      let tdTitle = document.createElement("td");
      tdTitle.textContent = product.title;
      tdTitle.classList.add(
        "px-4",
        "py-2",
        "border-b",
        "border-gray-200",
        "sm:table-cell",
        "hidden"
      );

      let tdImg = document.createElement("td");
      let img = document.createElement("img");
      img.src = product.image;
      img.classList.add("w-12", "h-12", "object-cover", "mx-auto");
      tdImg.classList.add("px-4", "py-2", "border-b", "border-gray-200");
      tdImg.appendChild(img);

      let tdPrice = document.createElement("td");
      tdPrice.textContent = `$${product.price}`;
      tdPrice.classList.add(
        "px-4",
        "py-2",
        "border-b",
        "border-gray-200",
        "text-center"
      );

      let tdQuantity = document.createElement("td");
      tdQuantity.textContent = `${product.quantity}`;
      tdQuantity.classList.add(
        "px-4",
        "py-2",
        "border-b",
        "border-gray-200",
        "text-center"
      );

      let tdDeleteBtn = document.createElement("td");
      let deleteBtn = document.createElement("button");
      deleteBtn.classList.add(
        "bg-red-500",
        "text-white",
        "px-2",
        "py-1",
        "rounded",
        "hover:bg-red-600"
      );
      deleteBtn.textContent = `Delete`;
      deleteBtn.addEventListener("click", () => {
        deleteProduct(product);

        // Change The Number Of Items On Deleting Item
        let productsLength = JSON.parse(
          localStorage.getItem("products")
        ).length;
        numOfTypesOfProdcuts.textContent = productsLength;
      });
      tdDeleteBtn.appendChild(deleteBtn);
      tdDeleteBtn.classList.add(
        "px-4",
        "py-2",
        "border-b",
        "border-gray-200",
        "text-center"
      );

      //   Append Childs
      tableRow.append(tdId, tdTitle, tdImg, tdPrice, tdQuantity, tdDeleteBtn);
      tableBody.appendChild(tableRow);
    });
  }
}

function getTotal() {
  let total;
  if (products) {
    total = products.reduce((acc, product) => {
      acc += product.price * product.quantity;
      return acc;
    }, 0);
  } else {
    total = 0;
  }

  totalSpan.textContent = `$${total.toFixed(2)}`;
  return total.toFixed(2);
}

function deleteProduct(product) {
  let productCopy = products.find((currProdcut) => {
    return currProdcut.id == product.id;
  });

  if (productCopy.quantity > 1) {
    productCopy.quantity--;
  } else {
    products = products.filter((currProduct) => {
      return currProduct.id != product.id;
    });
  }
  tableBody.innerHTML = "";
  getProducts();
  localStorage.setItem("products", JSON.stringify(products));
}

// Handle Buying Prodcuts

buyBtn.addEventListener("click", () => {
  handleBuy();
});

function handleBuy() {
  // Check If User Has Products In Cart

  if (JSON.parse(localStorage.getItem("products")).length > 0) {
    // Reset OverLay Content
    buyDiv.innerHTML = "";

    // Create A Title Message With Each Buy And Set Content According To Status
    let title = document.createElement("h2");
    title.classList.add("text-xl", "font-semibold", "text-gray-800");

    buyDiv.append(title);
    // Check If The User LoggedIn Or LoggedOut
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
      let progressDiv = document.createElement("div");
      let closeBtnDiv = document.createElement("div");

      progressDiv.classList.add(
        "absolute",
        "bottom-[-5px]",
        "left-[-5px]",
        "w-0",
        "h-[calc(100%+10px)]",
        "bg-blue-600",
        "z-[-1]",
        "rounded-lg",
        "duration-100",
        "animate-progress"
      );

      closeBtnDiv.classList.add(
        "absolute",
        "cursor-pointer",
        "top-[-20px]",
        "w-10",
        "right-[-20px]",
        "h-10",
        "bg-gray-200",
        "hover:bg-red-600",
        "duration-300",
        "rounded-full",
        "before:content-['']",
        "after:content-['']",
        "before:absolute",
        "after:absolute",
        "before:w-[50%]",
        "before:h-[2px]",
        "after:w-[50%]",
        "after:h-[2px]",
        "after:left-[25%]",
        "before:left-[25%]",
        "before:top-1/2",
        "after:top-1/2",
        "before:translate-y-[-50%]",
        "after:translate-y-[-50%]",
        "before:bg-black",
        "after:bg-black",
        "before:rotate-45",
        "after:rotate-[-45deg]"
      );

      closeBtnDiv.addEventListener("click", () => {
        buyMessage.classList.remove("flex", "items-center", "justify-center");
        buyMessage.classList.add("hidden");
      });

      if (products.length == 1) {
        title.innerHTML = `Thank you for Your Trust, You have successfully purchased <span style="color: #3b82f6">${
          products.length
        } product</span> with total <span style="color: green">$${getTotal()}</span>`;
      } else {
        title.innerHTML = `Thank you for Your Trust, You have successfully purchased <span style="color: #3b82f6">${
          products.length
        } products</span> with total <span style="color: green">$${getTotal()}</span>`;
      }

      buyDiv.append(progressDiv, closeBtnDiv);
      buyMessage.classList.add("flex", "items-center", "justify-center");
      buyMessage.classList.remove("hidden");
      butAudio.play();

      setTimeout(() => {
        buyMessage.classList.remove("flex", "items-center", "justify-center");
        buyMessage.classList.add("hidden");
      }, 5000);

      // Reset The Products
      localStorage.setItem("products", JSON.stringify([]));
      tableBody.innerHTML = "";
      getTotal();
      totalSpan.textContent = `$0.00`;
      numOfTypesOfProdcuts.textContent = 0;
    } else {
      let btnsDiv = document.createElement("div");
      let logInBtn = document.createElement("button");
      let cancelBtn = document.createElement("button");

      btnsDiv.className = "mt-4";
      logInBtn.classList.add(
        "bg-red-500",
        "text-white",
        "px-4",
        "py-2",
        "rounded",
        "mr-2",
        "hover:bg-red-600",
        "duration-300"
      );
      cancelBtn.classList.add(
        "bg-gray-300",
        "text-gray-800",
        "px-4",
        "py-2",
        "rounded",
        "hover:bg-gray-400",
        "duration-300"
      );

      logInBtn.addEventListener("click", () => {
        window.location.pathname = "index.html";
      });
      cancelBtn.addEventListener("click", () => {
        buyMessage.classList.add("hidden");
        buyMessage.classList.remove("flex", "items-center", "justify-center");
      });

      title.textContent = "You need to be logged in to purchase products.";
      logInBtn.textContent = "Login";
      cancelBtn.textContent = "Cancel";

      btnsDiv.append(logInBtn, cancelBtn);
      buyDiv.appendChild(btnsDiv);
      buyMessage.classList.remove("hidden");
      buyMessage.classList.add("flex", "items-center", "justify-center");
    }
  }
}

// Handle NavBar

// Set Number Of Items For The First Time
numOfTypesOfProdcuts.textContent = products ? products.length : 0;

// Check If The User LoggedIn Or LoggedOut
if (localStorage.getItem("email") && localStorage.getItem("password")) {
  logOutOrLogInBtn.textContent = "Logout";
  logOutOrLogInBtn.classList.add("bg-red-500", "hover:bg-red-600");
} else {
  logOutOrLogInBtn.textContent = "Login";
  logOutOrLogInBtn.href = "index.html";
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

// Handle Logging Out
logOutOrLogInBtn.addEventListener("click", () => {
  if (logOutOrLogInBtn.textContent == "Logout") {
    e.preventDefault();
    logOutMessage.classList.remove("hidden");
    logOutMessage.classList.add("flex", "items-center", "justify-center");
  }
});

logOutConfirmlBtn.addEventListener("click", () => {
  localStorage.clear();
});
logOutCancelBtn.addEventListener("click", () => {
  logOutMessage.classList.remove("flex", "items-center", "justify-center");
  logOutMessage.classList.add("hidden");
});
