function verificarStatusLoja() {
    const agora = new Date();
    const diaDaSemana = agora.getDay();
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();
    const minutosDesdeMeiaNoite = horaAtual * 60 + minutoAtual;
    let aberta = false;
    if (diaDaSemana >= 1 && diaDaSemana <= 5) {
        const abre = 8 * 60;
        const fecha = 18 * 60;
        aberta = minutosDesdeMeiaNoite >= abre && minutosDesdeMeiaNoite < fecha;
    } else if (diaDaSemana === 6) {
        const abre = 9 * 60;
        const fecha = 18 * 60;
        aberta = minutosDesdeMeiaNoite >= abre && minutosDesdeMeiaNoite < fecha;
    }
    return aberta;
}

function atualizarStatusLoja() {
    const indicador = document.getElementById('statusIndicator');
    const texto = document.getElementById('statusText');
    const container = document.getElementById('storeStatus');
    if (indicador && texto && container) {
        const aberta = verificarStatusLoja();
        if (aberta) {
            indicador.classList.remove('closed');
            indicador.classList.add('open');
            texto.textContent = 'Aberto';
            container.classList.remove('closed-status');
            container.classList.add('open-status');
        } else {
            indicador.classList.remove('open');
            indicador.classList.add('closed');
            texto.textContent = 'Fechado';
            container.classList.remove('open-status');
            container.classList.add('closed-status');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    atualizarStatusLoja();
    setInterval(atualizarStatusLoja, 60000);
    const formularioPedido = document.getElementById('orderForm');
    const entradaTelefone = document.getElementById('phone');
    const botaoMostrarFormulario = document.getElementById('showOrderFormBtn');
    const containerBotoesIniciais = document.querySelector('.initialButtonContainer');
    if (botaoMostrarFormulario && formularioPedido) {
        botaoMostrarFormulario.addEventListener('click', function() {
            if (containerBotoesIniciais) containerBotoesIniciais.style.display = 'none';
            formularioPedido.style.display = 'flex';
            formularioPedido.classList.add('show');
            formularioPedido.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    if (formularioPedido) {
        formularioPedido.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomeCliente = document.getElementById('customerName').value.trim();
            const quantidade = document.getElementById('quantity').value;
            const telefone = document.getElementById('phone').value.trim();
            const endereco = document.getElementById('address').value.trim();
            const observacoes = document.getElementById('notes').value.trim();
            let mensagem = `Olá! Gostaria de fazer um pedido:\n\n`;
            mensagem += `🍩 Donuts Tradicional de Chocolate\n\n`;
            mensagem += `Nome: ${nomeCliente}\n`;
            mensagem += `Quantidade: ${quantidade} unidade(s)\n`;
            if (telefone) mensagem += `Telefone: ${telefone}\n`;
            mensagem += `Endereço de entrega:\n${endereco}\n`;
            if (observacoes) mensagem += `\nObservações:\n${observacoes}\n`;
            mensagem += `\nObrigado(a)! 😊`;
            const encodedMessage = encodeURIComponent(mensagem);
            const numeroWhatsapp = '5585985476951';
            const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodedMessage}`;
            window.open(urlWhatsapp, '_blank');
        });
    }
    if (entradaTelefone) {
        entradaTelefone.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 0) {
                if (valor.length <= 2) {
                    valor = `(${valor}`;
                } else if (valor.length <= 7) {
                    valor = `(${valor.slice(0,2)}) ${valor.slice(2)}`;
                } else if (valor.length <= 11) {
                    valor = `(${valor.slice(0,2)}) ${valor.slice(2,7)}-${valor.slice(7)}`;
                }
            }
            e.target.value = valor;
        });
    }
});
// Removed duplicated cart code block to avoid conflicting listeners/state. Cart logic consolidated later in the file.
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
        if (cartCountEl) {
            cartCountEl.textContent = totalCount;
            cartCountEl.setAttribute('aria-label', `${totalCount} item(s) no carrinho`);
        }
    }

    function renderCart() {
        if (!cartItemsEl) return;
        cartItemsEl.innerHTML = '';
        if (cart.length === 0) {
            const li = document.createElement('li');
            li.className = 'cart-empty';
            li.innerHTML = `<div class="empty">Seu carrinho está vazio</div>`;
            cartItemsEl.appendChild(li);
        } else {
            cart.forEach((item, idx) => {
                const li = document.createElement('li');
                li.className = 'cart-item';
                li.innerHTML = `
                    <img src="${item.img || ''}" alt="${item.name}">
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price">R$ ${Number(item.price).toFixed(2)}</div>
                        <div class="qty-controls">
                            <button class="qty-btn qty-decrease" data-index="${idx}" aria-label="Diminuir quantidade">−</button>
                            <span class="qty">${item.quantity || 1}</span>
                            <button class="qty-btn qty-increase" data-index="${idx}" aria-label="Aumentar quantidade">+</button>
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="remove-item" data-index="${idx}" aria-label="Remover item">&times;</button>
                    </div>
                `;
                cartItemsEl.appendChild(li);
            });
        }
        const total = cart.reduce((s, it) => s + Number(it.price) * (it.quantity || 1), 0);
        if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
        updateBadge();
    }

    function addToCart(item) {
        
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

    
    cart = loadCart();
    renderCart();

    
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const open = cartDropdown.classList.toggle('show');
            cartButton.setAttribute('aria-expanded', String(open));
            cartDropdown.setAttribute('aria-hidden', String(!open));
        });
    }

    
    document.addEventListener('click', function(e) {
        if (cartDropdown && cartDropdown.classList.contains('show')) {
            const path = e.composedPath ? e.composedPath() : (e.path || []);
            if (!path.includes(cartDropdown) && !path.includes(cartButton)) {
                cartDropdown.classList.remove('show');
                cartButton && cartButton.setAttribute('aria-expanded', 'false');
            }
        }
    });

    
    document.addEventListener('click', function(e) {
        // remove item
        const rem = e.target.closest && e.target.closest('.remove-item');
        if (rem) {
            const idx = Number(rem.dataset.index);
            if (!Number.isNaN(idx)) removeFromCart(idx);
            return;
        }

        // increase quantity
        const inc = e.target.closest && e.target.closest('.qty-increase');
        if (inc) {
            const idx = Number(inc.dataset.index);
            if (!Number.isNaN(idx) && cart[idx]) {
                cart[idx].quantity = (cart[idx].quantity || 1) + 1;
                saveCart();
                renderCart();
            }
            return;
        }

        // decrease quantity
        const dec = e.target.closest && e.target.closest('.qty-decrease');
        if (dec) {
            const idx = Number(dec.dataset.index);
            if (!Number.isNaN(idx) && cart[idx]) {
                cart[idx].quantity = (cart[idx].quantity || 1) - 1;
                if (cart[idx].quantity <= 0) {
                    removeFromCart(idx);
                } else {
                    saveCart();
                    renderCart();
                }
            }
            return;
        }
    });

    
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
            const modal = document.getElementById('checkoutModal');
            if (modal) {
                modal.classList.add('show');
                modal.setAttribute('aria-hidden', 'false');
                const nameInput = document.getElementById('custName');
                if (nameInput) nameInput.focus();
            }
        });
    }

    // Modal handlers: close, cancel, submit
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutClose = document.getElementById('checkoutClose');
    const checkoutCancel = document.getElementById('checkoutCancel');

    function hideCheckoutModal() {
        if (checkoutModal) {
            checkoutModal.classList.remove('show');
            checkoutModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (checkoutClose) checkoutClose.addEventListener('click', hideCheckoutModal);
    if (checkoutCancel) checkoutCancel.addEventListener('click', hideCheckoutModal);
    if (checkoutModal) {
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === checkoutModal) hideCheckoutModal();
        });
    }

    // Phone formatting for modal phone field
    const custPhone = document.getElementById('custPhone');
    if (custPhone) {
        custPhone.addEventListener('input', function(e) {
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

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = (document.getElementById('custName') || {}).value || '';
            const phone = (document.getElementById('custPhone') || {}).value || '';
            const address = (document.getElementById('custAddress') || {}).value || '';
            const notes = (document.getElementById('custNotes') || {}).value || '';

            if (!name.trim() || !address.trim()) {
                alert('Por favor, preencha o nome e o endereço.');
                return;
            }

            let message = `Olá! Gostaria de fazer um pedido:%0A%0A`;
            cart.forEach(it => {
                message += `*${it.name}* - R$ ${Number(it.price).toFixed(2)} x ${it.quantity || 1}%0A`;
            });
            const total = cart.reduce((s, it) => s + Number(it.price) * (it.quantity || 1), 0);
            message += `%0A*Total:* R$ ${total.toFixed(2)}%0A%0A`;
            message += `*Nome:* ${name}%0A`;
            if (phone) message += `*Telefone:* ${phone}%0A`;
            message += `*Endereço:* ${address}%0A`;
            if (notes) message += `*Observações:* ${notes}%0A`;

            const encoded = encodeURIComponent(message);
            const whatsappNumber = '5585985476951';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encoded}`;

            window.open(whatsappURL, '_blank');
            hideCheckoutModal();
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

