let cart = JSON.parse(localStorage.getItem('cart')) || [];

function openingcart() {
    const cartContainer = document.getElementById("cart-container");
    const dishesContainer = document.querySelector(".dishes");
  
    if (cartContainer.style.display !== "block") {
      cartContainer.style.display = "block";
      
    }
    if(dishesContainer){
      dishesContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
      dishesContainer.style.width = "63.5%";
    }
    updateCartDisplay();
  }
  
  function result() {
    
    const clickedElement = document.activeElement;
    console.log(clickedElement);
    const itemValue = clickedElement.getAttribute("value");
    const itemPrice = parseFloat(
      clickedElement.previousElementSibling.textContent.slice(1)
    );
    const itemImage = clickedElement.parentElement.parentElement.querySelector("img").src;
  
    const cartItem = {
      name: itemValue,
      price: itemPrice,
      quantity: 1,
      image: itemImage,
    };
    alert(cartItem.name + " added to cart");
  
    addToCart(cartItem);
    updateCartDisplay();
    //event.preventDefault();
  }
  
 
  
  function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      const cartItemHTML = `
              <li>
                  <div class="cart-item-details">
                      <h3>${item.name}</h3>
                      <div class="cart-item-price">
                          <span>Price: ₹${item.price.toFixed(2)}</span>
                          <div class="quantity-controls">
                              <button class="quantity-btn minus" onclick="updateQuantity('${
                                item.name
                              }', -1)">-</button>
                              <span class="quantity">${item.quantity}</span>
                              <button class="quantity-btn plus" onclick="updateQuantity('${
                                item.name
                              }', 1)">+</button>
                          </div>
                      </div>
                  </div>
              </li>
          `;
  
      cartItemsContainer.innerHTML += cartItemHTML;
      total += item.price * item.quantity;
    });
  
    const cartTotal = document.getElementById("cart-total");
    cartTotal.textContent = `₹${total.toFixed(2)}`;
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.backgroundColor = "white";
    cartContainer.style.color = "black";
  }
  
  function updateQuantity(itemName, change) {
    const item = cart.find((cartItem) => cartItem.name === itemName);
    if (item) {
      item.quantity += change;
      if (item.quantity < 1) {
        cart.splice(cart.indexOf(item), 1);
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }
  
  function closingcart() {
    const cartContainer = document.getElementById("cart-container");
    const cartCloseButton = document.getElementById("cart-close");
    const dishesContainer = document.querySelector(".dishes");
    cartCloseButton.addEventListener("click", () => {
      cartContainer.style.display = "none";
      if(dishesContainer) {
        dishesContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
      dishesContainer.style.width = "92%";
      }
      
    });
    cartContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
  
  function setbutton(clickedBtn){
    const buttons = document.querySelectorAll('.variant-button');
    buttons.forEach(button => button.classList.remove('active'));
    clickedBtn.classList.add('active');
    const cost = document.getElementById('product-price');
    cost.textContent = clickedBtn.getAttribute('value');  
    }
  