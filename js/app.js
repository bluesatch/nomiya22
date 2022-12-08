class Store {
    
    constructor() {
        // track items in the cart and subtotal
        this.itemsInCart = {
            itemCount: 0,
            subTotal: 0
        }

        this.items = [
            {
                id: 1,
                name: 'california roll',
                imgUrl: './media/californiaRoll.jpeg',
                price: 12.99,
                qty: 0,
                description: 'cucumber, crab, and seaweed'
            },
            {
                id: 2,
                name: 'edamame',
                imgUrl: './media/edamame.jpeg',
                price: 7.99,
                qty: 0,
                description: 'bowl of steamed soybeans served as an appetizer'
            },
            {
                id: 3,
                name: 'pork buns',
                imgUrl: './media/porkBuns.jpeg',
                price: 8.99,
                qty: 0,
                description: 'Pillowy soft steamed buns filled with a sweet, savoury saucy pork filling. ... Freshly made Chinese Steamed Pork Buns in a bamboo steamer.'
            },
            {
                id: 4,
                name: 'rainbow roll',
                imgUrl: './media/rainbowRoll.jpeg',
                price: 14.99,
                qty: 0,
                description: 'Filled with imitation crab, cucumber, and avocado, and topped with salmon, tuna, and yellowtail.'
            },
            {
                id: 5,
                name: 'beef ramen',
                imgUrl: './media/ramen1.jpeg',
                price: 14.99,
                qty: 0,
                description: 'Ramen noodles with fresh veggies, egg, and beef.'
            },
            {
                id: 6,
                name: 'veggie ramen',
                imgUrl: './media/ramen2.jpeg',
                price: 12.99,
                qty: 0,
                description: 'Ramen noodles with fresh veggies'
            },
            {
                id: 7,
                name: 'chicken ramen',
                imgUrl: './media/ramen3.jpeg',
                price: 14.99,
                qty: 0,
                description: 'Ramen noodles with fresh veggies, egg, and chicken.'
            },
            {
                id: 8,
                name: 'shrimp ramen',
                imgUrl: './media/ramen4.jpeg',
                price: 15.99,
                qty: 0,
                description: 'Ramen noodles served with fresh veggies, and shrimp.'
            }
        ]

        this.homeSection = document.getElementById('homeSection')
        this.menuSection = document.getElementById('menuSection')
        this.directionSection = document.getElementById('directionSection')
        this.checkoutSection = document.getElementById('checkoutSection')
        this.cart = document.getElementById('cart')

        this.taxRate = 0.07
        this.deliveryFee = 5.99
        // this.total = (this.subTotal * (1 + this.taxRate)) + this.deliveryFee 
    }

    init() {
        this.toggleNav()
        this.loadItems()
        this.addToCart()
        this.checkoutBtn()
    }

    toggleNav() {
        const navBtns = document.querySelectorAll('.nav-btn')
        const homeSection = this.homeSection
        const menuSection = this.menuSection
        const directionSection = this.directionSection
        const checkoutSection = this.checkoutSection
        const cart = this.cart


        navBtns.forEach(button => {
            button.addEventListener('click', ()=> {
                // console.log(button.dataset['section'])
                switch(button.dataset['section']) {
                    case 'home':
                        homeSection.classList.add('d-block')
                        homeSection.classList.remove('d-none')
                        menuSection.classList.remove('d-block')
                        menuSection.classList.add('d-none')
                        directionSection.classList.remove('d-block')
                        directionSection.classList.add('d-none')
                        checkoutSection.classList.add('d-none')
                        break;
                    case 'menu':
                        menuSection.classList.remove('d-none')
                        menuSection.classList.add('d-block')
                        homeSection.classList.remove('d-block')
                        homeSection.classList.add('d-none')
                        directionSection.classList.remove('d-block')
                        directionSection.classList.add('d-none')
                        cart.classList.remove('d-none')
                        checkoutSection.classList.add('d-none')
                        break;
                    case 'directions':
                        directionSection.classList.remove('d-none')
                        directionSection.classList.add('d-block')
                        homeSection.classList.remove('d-block')
                        homeSection.classList.add('d-none')
                        menuSection.classList.remove('d-block')
                        menuSection.classList.add('d-none')
                        checkoutSection.classList.add('d-none')
                        break;
                    default: 
                        return null;
                }
            })
        })
    }


    loadItems() {
        const items = this.items 
        const itemRow = document.getElementById('itemRow')

        items.forEach(item => {
            const product = document.createElement('div')
            product.className = 'col'
            product.innerHTML = `
            <div class="card h-100 ">
                <img src="${item.imgUrl}" class="img-fluid card-img-top" alt="${item.description}" />
                <div class="card-body product-body">
                    <h3 class="card-title item-name text-center text-capitalize" id="itemName-${item.id}">${item.name}</h3>
                    <p class="card-text product-text" id="itemDesc">${item.description} - <span id="itemPrice"> ${item.price}</span></p>
                    <button class="btn card-button item-btn btn-secondary text-capitalize" id="itemBtn-${item.id}" data-id="${item.id}">add to cart</button>
                </div>
            </div>`

            /**
             * 
             * const cardDiv = document.createElement('div')
             * cardDiv.classList.add(' card h-100')
             * const cardImage = document.createElement('img')
             * cardImage.src = item.imgUrl
             * cardImage.alt = item.description 
             * cardImage.classList.add('img-fluid card-img-top')
             * cardDiv.append(cardImage)
             * product.append(cardDiv)
             */
            itemRow.append(product)
        })

    }

    addToCart() {
        const itemBtns = document.querySelectorAll('.item-btn')
        const itemsInCart = document.getElementById('itemCount')
        const cartSubtotal = document.getElementById('subtotal')
        let itemCount = this.itemsInCart.itemCount
        let subtotal = this.itemsInCart.subTotal


        itemBtns.forEach(button => {
            button.addEventListener('click', ()=> {
                //  loop through items
                this.items.forEach(item => {
                    if (button.dataset['id'] == item.id) {
                        itemCount++
                        subtotal+= item.price
                        this.itemsInCart = {
                            itemCount: itemCount,
                            // itemCount,
                            subTotal: subtotal
                        }
                        
                        item.qty++
                        itemsInCart.innerText = itemCount
                        cartSubtotal.innerText = subtotal
                    }
                })
                
            })
        })
    }

    checkoutBtn() {
        const checkoutBtn = document.getElementById('checkoutBtn')
        const menuSection = this.menuSection
        const checkoutSection = this.checkoutSection

        checkoutBtn.addEventListener('click', ()=> {

            menuSection.classList.add('d-none')
            checkoutSection.classList.remove('d-none')

            const checkoutItemCount = document.getElementById('checkoutItemCount') 
            checkoutItemCount.innerText = this.itemsInCart.itemCount
            
            const deliveryFeeText = document.getElementById('deliveryFeeText')
            deliveryFeeText.innerText = this.deliveryFee

            this.displayCheckout()
        })

    }
    // display items 
    displayCheckout() {
        const items = this.items
        let subTimesQty = 0
        const tableBody = document.getElementById('tableBody')
    
        items.forEach(item => {
            if (item.qty > 0) {
                subTimesQty = item.qty * item.price
                const tableRow = document.createElement('tr')
                tableRow.innerHTML = `
                <th scope="row">
                    <figure class="figure">
                        <img src="${item.imgUrl}" alt="${item.description}" class="img-fluid checkout-img" />
                        <figcaption class="figcaption">${item.name.toUpperCase()}</figcaption>
                    </figure>
                </th>
                <td><span id="checkoutPrice">${item.price}</span></td>
                <td><span id="checkoutQty">${item.qty}</span></td>
                <td><span id="checkoutSubtotal">${subTimesQty}</span></td>
                `
                tableBody.append(tableRow)
            }

            const ticketSubtotal = document.getElementById('ticketSubtotal')
            ticketSubtotal.innerText = this.itemsInCart.subTotal

            const ticketTax = document.getElementById('ticketTax')
            let tax = this.taxRate * this.itemsInCart.subTotal
            ticketTax.innerText = tax.toFixed(2)

            const ticketDeliveryFee = document.getElementById('ticketDeliveryFee')
            ticketDeliveryFee.innerText = this.deliveryFee

            const ticketTotal = document.getElementById('ticketTotal')
            let total = Number(this.itemsInCart.subTotal) + Number(tax.toFixed(2)) + Number(this.deliveryFee)
            ticketTotal.innerText = total
        })
    
    }
}

const action = new Store()

action.init()