let products = JSON.parse(localStorage.getItem("products")) || [];
const container = document.querySelector(".cont");

getData();
async function getData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  data.forEach((product) => {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add(
      "max-w-sm",
      "mx-auto",
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "overflow-hidden",
      "w-full"
    );

    // Create Card Image

    let image = document.createElement("img");
    image.classList.add("w-full", "h-48", "object-cover");
    image.src = product.image;

    // Create Card Body And Footer
    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("p-4");

    let h2 = document.createElement("h2");
    h2.textContent = product.title;
    h2.classList.add("text-xl", "font-bold", "mb-2", "line-clamp-1");

    let p = document.createElement("p");
    p.textContent = product.description;
    p.classList.add("text-gray-700", "mb-4", "line-clamp-3");

    // Start Card Footer
    let footerDiv = document.createElement("div");
    footerDiv.classList.add("flex", "items-center", "justify-between", "mb-4");

    let price = document.createElement("span");
    price.textContent = "$" + product.price;
    price.classList.add("text-2xl", "font-bold", "text-gray-900");

    let rate = document.createElement("span");
    rate.textContent = product.rating.rate + " ★";
    rate.classList.add(
      "bg-yellow-300",
      "text-yellow-800",
      "text-sm",
      "font-semibold",
      "px-2.5",
      "py-0.5",
      "rounded"
    );

    //   Create Card Button

    let btn = document.createElement("div");
    let text = document.createElement("span");
    let iconAndNumberDiv = document.createElement("div");
    let icon = document.createElement("i");
    let numberOfBoughtIcons = document.createElement("span");

    btn.classList.add(
      "cursor-pointer",
      "w-full",
      "bg-blue-500",
      "text-white",
      "py-2",
      "rounded",
      "hover:bg-blue-600",
      "duration-300",
      "flex",
      "items-center",
      "justify-center"
    );
    text.classList.add("grow", "text-right", "ml-4");
    iconAndNumberDiv.classList.add("text-right", "grow", "mr-2");
    icon.classList.add("fa-solid", "fa-cart-shopping", "mr-2");

    text.textContent = "Add To Cart";
    let myProduct = products.find((currProduct) => {
      return currProduct.id == product.id;
    });
    if (myProduct) {
      numberOfBoughtIcons.textContent = myProduct.quantity;
    } else {
      numberOfBoughtIcons.textContent = 0;
    }

    iconAndNumberDiv.append(icon, numberOfBoughtIcons);
    btn.append(text, iconAndNumberDiv);

    btn.addEventListener("click", () => {
      handleAddToCart(product);
      numberOfBoughtIcons.textContent++;
      icon.classList.remove("animate-bounceFromTop");

      setTimeout(() => {
        icon.classList.add("animate-bounceFromTop");
      }, 0);
    });

    // Append Childs
    footerDiv.append(price, rate);
    bodyDiv.append(h2, p, footerDiv, btn);
    cardDiv.append(image, bodyDiv);
    container.appendChild(cardDiv);
  });
}

const handleAddToCart = (product) => {
  let productCopy = products.find((currentProduct) => {
    return currentProduct.id == product.id;
  });

  if (productCopy) {
    productCopy.quantity++;
  } else {
    product.quantity = 1;
    products.push(product);
  }

  // Change The Number Of Items On Adding Items

  numOfTypesOfProdcuts.textContent = products.length;

  localStorage.setItem("products", JSON.stringify(products));
};

// Handle NavBar

const userNameDiv = document.querySelector(".user-name");
const userNamevalue = localStorage.getItem("email");
const numOfTypesOfProdcuts = document.querySelector(".types-of-products");
const logOutOrLogInBtn = document.querySelector(".logout-btn");
const logOutCancelBtn = document.querySelector("#cancelLogoutButton");
const logOutConfirmlBtn = document.querySelector("#logoutconfirm");
const logOutMessage = document.querySelector("#overlay-logout");

// Check If The User LoggedIn Or Not
if (localStorage.getItem("email") && localStorage.getItem("password")) {
  logOutOrLogInBtn.textContent = "Logout";
  logOutOrLogInBtn.classList.add("bg-red-500", "hover:bg-red-600");
} else {
  logOutOrLogInBtn.textContent = "Login";
  logOutOrLogInBtn.href = "index.html";
  logOutOrLogInBtn.classList.add("bg-blue-500", "hover:bg-blue-700");
}

// Check If The User LoggedIn Or Not
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

// Handle Adding To Cart
