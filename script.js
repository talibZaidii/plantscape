let cart = [];

    const cartButton = document.getElementById('cart-button');
    const cartPanel = document.getElementById('side-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsList = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    const searchBtn = document.getElementById('search-button');
    const searchModal = document.getElementById('search-modal');
    const closeSearch = document.getElementById('close-search');

    cartButton.addEventListener('click', (e) => {
      e.preventDefault();
      cartPanel.classList.add('open');
    });

    closeCartBtn.addEventListener('click', () => {
      cartPanel.classList.remove('open');
    });

    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal.classList.add('open');
    });

    closeSearch.addEventListener('click', () => {
      searchModal.classList.remove('open');
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const name = productCard.querySelector('h3').textContent;
        const priceText = productCard.querySelector('.price').textContent;
        const image = productCard.querySelector('img').getAttribute('src');

        const priceMatch = priceText.match(/\$([0-9]+(\.[0-9]+)?)/);
        const price = priceMatch ? parseFloat(priceMatch[1]) : 0;

        cart.push({ name, price, image });
        updateCart();
      });
    });

    function updateCart() {
      cartCount.textContent = cart.length;
      cartItemsList.innerHTML = '';
      let total = 0;

      cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          </div>
        `;
        cartItemsList.appendChild(li);
        total += item.price;
      });

      cartTotal.textContent = total.toFixed(2);
    }