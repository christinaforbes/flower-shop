// Christina Forbes 3/21/2021

// Product Data
const products = [
  {
    id: 0,
    image: 'pink-flowers.jpg', // Photo by Paula Brustur from Unsplash
    name: 'Pink Bouquet',
    description: 'Bouquet of assorted pink flowers',
    price: 60
  },
  {
    id: 1,
    image: 'pink-white-orange-flowers.jpg', // Photo by Jessie Daniella from Unsplash
    name: 'Pink, White, and Orange Bouquet',
    description: 'Bouquet of assorted pink, white, and orange flowers',
    price: 80
  },
  {
    id: 2,
    image: 'red-white-flowers.jpg', // Photo by Christie Kim from Unsplash
    name: 'Red and White Bouquet',
    description: 'Bouquet of assorted red and white flowers',
    price: 50
  },
  {
    id: 3,
    image: 'white-flowers.jpg', // Photo by Jessie Daniella from Unsplash
    name: 'White Bouquet',
    description: 'Bouquet of assorted white flowers',
    price: 70
  },
  {
    id: 4,
    image: 'white-purple-flowers.jpg', // Photo by Haydn Golden from Unsplash
    name: 'White and Purple Bouquet',
    description: 'Bouquet of assorted white and purple flowers',
    price: 90
  }
];

// Product List
const wrapper = document.getElementById('wrapper');

const productListHeader = document.createElement('h2');
productListHeader.id = 'bouquets';
productListHeader.textContent = 'Bouquets';
wrapper.append(productListHeader);

const productsContainer = document.createElement('div');
productsContainer.classList.add('products-container');
wrapper.append(productsContainer);

// Product Card
function displayProduct(product) {
  const productCard = document.createElement('div');
  productCard.id = `pid_${product.id}`;
  productCard.classList.add('product-card');
  productsContainer.append(productCard);

  const productImage = document.createElement('img');
  productImage.src = product.image;
  productImage.alt = product.description;
  productImage.classList.add('responsive-image');
  productCard.append(productImage);

  const productText = document.createElement('div');
  productText.classList.add('product-text');
  productCard.append(productText);

  const productName = document.createElement('h3');
  productName.textContent = product.name;
  productText.append(productName);

  const productDescription = document.createElement('p');
  productDescription.textContent = product.description;
  productText.append(productDescription);

  const productPrice = document.createElement('p');
  productPrice.textContent = `$${product.price}`;
  productText.append(productPrice);

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.addEventListener('click', addProductToCart);
  productText.append(addToCartButton);
}

products.forEach(product => displayProduct(product));

// Cart Items List
const cartHeader = document.createElement('h2');
cartHeader.id = 'cart';
cartHeader.textContent = 'Cart';
wrapper.append(cartHeader);

const cartContainer = document.createElement('div');
cartContainer.classList.add('cart-container');
wrapper.append(cartContainer);

const cartItemsContainer = document.createElement('div');
cartItemsContainer.classList.add('cart-items-container');
cartContainer.append(cartItemsContainer);

const emptyCartMessage = document.createElement('p');
emptyCartMessage.classList.add('empty-cart-message');
emptyCartMessage.textContent = 'Your Cart is Empty';
cartItemsContainer.append(emptyCartMessage);

const cartItemsArray = [];
let cartItemID;

// Cart Item Card
function addProductToCart(e) {
  if (!emptyCartMessage.classList.contains('hidden-message')) {
    emptyCartMessage.classList.add('hidden-message');
  }

  const productIDString = e.target.parentElement.parentElement.id;
  const productIndex = Number(productIDString.split('_').pop());
  const product = products[productIndex];

  if (cartItemsArray.length === 0) {
    cartItemID = 0;
  } else {
    const lastCartItemIDString = ([...document.querySelectorAll('.cart-item-card')].pop()).id;
    const lastCartItemIndex = Number(lastCartItemIDString.split('_').pop());
    cartItemID = lastCartItemIndex + 1;
  }

  const cartItemCard = document.createElement('div');
  cartItemCard.id = `cid_${cartItemID}`;
  cartItemCard.classList.add('cart-item-card');
  totalPriceCard.before(cartItemCard);

  const productName = document.createElement('p');
  productName.textContent = product.name;
  cartItemCard.append(productName);

  const productPrice = document.createElement('p');
  productPrice.textContent = `$${product.price}`;
  cartItemCard.append(productPrice);

  const removeFromCartButton = document.createElement('button');
  removeFromCartButton.textContent = 'Remove';
  removeFromCartButton.addEventListener('click', removeProductFromCart);
  cartItemCard.append(removeFromCartButton);

  cartItemsArray.push(product);

  calculateTotalPrice();
}

function removeProductFromCart(e) {
  const confirmRemove = confirm('Are you sure you want to remove this item from your cart?');

  if (confirmRemove) {
    const cartIDString = e.target.parentElement.id;
    const cartItemIndex = Number(cartIDString.split('_').pop());

    const nextCartItems = document.querySelectorAll(`#${cartIDString} ~ .cart-item-card`);

    const cartItem = e.target.parentElement;
    cartItem.remove();

    cartItemsArray.splice(cartItemIndex, 1);

    nextCartItems.forEach(nextCartItem => {
      const nextCartItemIDString = nextCartItem.id;
      const nextCartItemPreviousIndex = Number(nextCartItemIDString.split('_').pop());
      const nextCartItemIndex = nextCartItemPreviousIndex - 1;
      nextCartItem.id = `cid_${nextCartItemIndex}`;
    });

    if (cartItemsArray.length === 0) {
      emptyCartMessage.classList.remove('hidden-message');
    }

    calculateTotalPrice();
  }
}

// Delivery Options Select Menu
const cartOptionsContainer = document.createElement('div');
cartOptionsContainer.classList.add('cart-options-container');
cartContainer.append(cartOptionsContainer);

const deliveryOptionsMenuLabel = document.createElement('label');
deliveryOptionsMenuLabel.for = 'delivery-options-menu';
deliveryOptionsMenuLabel.textContent = 'Select a Delivery Option: ';
cartOptionsContainer.append(deliveryOptionsMenuLabel);

const deliveryOptionsMenu = document.createElement('select');
deliveryOptionsMenu.id = 'delivery-options-menu';
cartOptionsContainer.append(deliveryOptionsMenu);

const deliveryOptionRegular = document.createElement('option');
const regularRate = 5;
deliveryOptionRegular.value = 'regular';
deliveryOptionRegular.textContent = `Regular: $${regularRate}`;
deliveryOptionsMenu.append(deliveryOptionRegular);

const deliveryOptionTwoDay = document.createElement('option');
const twoDayRate = 10;
deliveryOptionTwoDay.value = 'two-day';
deliveryOptionTwoDay.textContent = `Two Day: $${twoDayRate}`;
deliveryOptionsMenu.append(deliveryOptionTwoDay);

const deliveryOptionOvernight = document.createElement('option');
const overnightRate = 20;
deliveryOptionOvernight.value = 'overnight';
deliveryOptionOvernight.textContent = `Overnight: $${overnightRate}`;
deliveryOptionsMenu.append(deliveryOptionOvernight);

deliveryOptionsMenu.addEventListener('change', calculateTotalPrice);

// Total Price
const totalPriceCard = document.createElement('div');
totalPriceCard.classList.add('total-price-card');
cartItemsContainer.append(totalPriceCard);

const totalPriceLabel = document.createElement('p');
totalPriceLabel.textContent = 'Total:';
totalPriceCard.append(totalPriceLabel);

const totalPriceDisplay = document.createElement('p');
totalPriceDisplay.textContent = '$0';
totalPriceCard.append(totalPriceDisplay);

function calculateTotalPrice() {
  let totalPrice;

  if (cartItemsArray.length === 0) {
    totalPrice = 0;
  } else {
    totalPrice = 0;

    cartItemsArray.forEach(cartItem => totalPrice += cartItem.price);

    const selectedOption = deliveryOptionsMenu.value;
    let deliveryRate = 0;

    switch (selectedOption) {
      case 'regular':
        deliveryRate = regularRate;
        break;
      case 'two-day':
        deliveryRate = twoDayRate;
        break;
      case 'overnight':
        deliveryRate = overnightRate;
        break;
    }

    totalPrice += deliveryRate;
  }

  totalPriceDisplay.textContent = `$${totalPrice}`;
}