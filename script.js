function checkStoreStatus() {
    const now = new Date();
    const dayOfWeek = now.getDay(); 
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute; 
    
    let isOpen = false;
    
    
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const openTime = 8 * 60; 
        const closeTime = 18 * 60; 
        isOpen = currentTime >= openTime && currentTime < closeTime;
    }
    
    else if (dayOfWeek === 6) {
        const openTime = 9 * 60; 
        const closeTime = 18 * 60; 
        isOpen = currentTime >= openTime && currentTime < closeTime;
    }
    
    return isOpen;
}

function updateStoreStatus() {
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    const storeStatus = document.getElementById('storeStatus');
    
    if (statusIndicator && statusText && storeStatus) {
        const isOpen = checkStoreStatus();
        
        if (isOpen) {
            statusIndicator.classList.remove('closed');
            statusIndicator.classList.add('open');
            statusText.textContent = 'Aberto';
            storeStatus.classList.remove('closed-status');
            storeStatus.classList.add('open-status');
        } else {
            statusIndicator.classList.remove('open');
            statusIndicator.classList.add('closed');
            statusText.textContent = 'Fechado';
            storeStatus.classList.remove('open-status');
            storeStatus.classList.add('closed-status');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    updateStoreStatus();
    
    
    setInterval(updateStoreStatus, 60000);
    
    const orderForm = document.getElementById('orderForm');
    const phoneInput = document.getElementById('phone');
    const showOrderFormBtn = document.getElementById('showOrderFormBtn');
    const initialButtonContainer = document.querySelector('.initialButtonContainer');
    
    if (showOrderFormBtn && orderForm) {
        showOrderFormBtn.addEventListener('click', function() {
            if (initialButtonContainer) {
                initialButtonContainer.style.display = 'none';
            }
            
            orderForm.style.display = 'flex';
            orderForm.classList.add('show');
            
            orderForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const customerName = document.getElementById('customerName').value.trim();
            const quantity = document.getElementById('quantity').value;
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const notes = document.getElementById('notes').value.trim();
            
            let message = `Olá! Gostaria de fazer um pedido:\n\n`;
            message += `🍩 *Donuts Tradicional de Chocolate*\n\n`;
            message += `👤 *Nome:* ${customerName}\n`;
            message += `📦 *Quantidade:* ${quantity} unidade(s)\n`;
            
            if (phone) {
                message += `📱 *Telefone:* ${phone}\n`;
            }
            
            message += `📍 *Endereço de entrega:*\n${address}\n`;
            
            if (notes) {
                message += `\n📝 *Observações:*\n${notes}\n`;
            }
            
            message += `\nObrigado(a)! 😊`;
            
            const encodedMessage = encodeURIComponent(message);
            
            const whatsappNumber = '5585985476951';
            
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappURL, '_blank');
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length <= 11) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                }
            }
            e.target.value = value;
        });
    }
});

// --- Shopping cart logic ---
document.addEventListener('DOMContentLoaded', function() {
    const CART_KEY = 'lovelyCart';
    const cartButton = document.getElementById('cartButton');
    const cartDropdown = document.getElementById('cartDropdown');
    const cartCountEl = document.getElementById('cartCount');
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    let cart = [];

    function loadCart() {
        try {
            const raw = localStorage.getItem(CART_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error('Failed to load cart', e);
            return [];
        }
    }

    function saveCart() {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function updateBadge() {
        const totalCount = cart.reduce((s, it) => s + (it.quantity || 1), 0);
        if (cartCountEl) cartCountEl.textContent = totalCount;
    }

    function renderCart() {
        if (!cartItemsEl) return;
        cartItemsEl.innerHTML = '';
        cart.forEach((item, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.img || ''}" alt="${item.name}">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">R$ ${Number(item.price).toFixed(2)} x ${item.quantity || 1}</div>
                </div>
                <div class="item-actions">
                    <button class="remove-item" data-index="${idx}">&times;</button>
                </div>
            `;
            cartItemsEl.appendChild(li);
        });
        const total = cart.reduce((s, it) => s + Number(it.price) * (it.quantity || 1), 0);
        if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
        updateBadge();
    }

    function addToCart(item) {
        // try to merge identical items (same name)
        const existing = cart.find(it => it.name === item.name && it.price == item.price);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
        } else {
            cart.push(Object.assign({ quantity: 1 }, item));
        }
        saveCart();
        renderCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }

    // initial load
    cart = loadCart();
    renderCart();

    // toggle dropdown
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const open = cartDropdown.classList.toggle('show');
            cartButton.setAttribute('aria-expanded', String(open));
            cartDropdown.setAttribute('aria-hidden', String(!open));
        });
    }

    // close when clicking outside
    document.addEventListener('click', function(e) {
        if (cartDropdown && cartDropdown.classList.contains('show')) {
            const path = e.composedPath ? e.composedPath() : (e.path || []);
            if (!path.includes(cartDropdown) && !path.includes(cartButton)) {
                cartDropdown.classList.remove('show');
                cartButton && cartButton.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // delegate remove
    document.addEventListener('click', function(e) {
        const rem = e.target.closest && e.target.closest('.remove-item');
        if (rem) {
            const idx = Number(rem.dataset.index);
            if (!Number.isNaN(idx)) removeFromCart(idx);
        }
    });

    // clear cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            cart = [];
            saveCart();
            renderCart();
        });
    }

   
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) return;
            let message = `Olá! Gostaria de fazer um pedido:%0A%0A`;
            cart.forEach(it => {
                message += `*${it.name}* - R$ ${Number(it.price).toFixed(2)} x ${it.quantity || 1}%0A`;
            });
            const total = cart.reduce((s, it) => s + Number(it.price) * (it.quantity || 1), 0);
            message += `%0A*Total:* R$ ${total.toFixed(2)}%0A`;
            const whatsappNumber = '5585985476951';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(whatsappURL, '_blank');
        });
    }

    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const name = btn.dataset.name || btn.getAttribute('data-name') || 'Item';
            const price = btn.dataset.price || btn.getAttribute('data-price') || '0';
            const img = btn.dataset.img || btn.getAttribute('data-img') || '';
            addToCart({ name: name, price: Number(price), img: img });
            if (cartDropdown) {
                cartDropdown.classList.add('show');
                cartButton && cartButton.setAttribute('aria-expanded', 'true');
                const isSmall = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
                const timeout = isSmall ? 4500 : 1800;
                setTimeout(() => {
                    if (cartDropdown) cartDropdown.classList.remove('show');
                    cartButton && cartButton.setAttribute('aria-expanded','false');
                }, timeout);
            }
        });
    });
});

