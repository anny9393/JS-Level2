const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        calalogURL: '/catalogData.json',
        getBasket: '/getBasket.json',
        searchLine: '',
        products: [],
        goods: [],
        imgCatalog: 'https://placehold.it/200x150',
        empty: false,
        isVisibleCart: false,
        cartIsEmpty: 'Your shopping cart is empty...',
        productRenderCart: '',
        totalCart: 0,
        showTotalinCart: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        filterGoods() {
            let filter = this.searchLine.toUpperCase();
            let productsFound = 0;
            let ProductsList = document.getElementsByClassName('product-item');
            for (let i = 0; i < ProductsList.length; i++) {
                let product = ProductsList[i];
                product.style.display = 'none';
                let h3content = product.getElementsByClassName('product-name')[0].innerText;
                if (filter.indexOf(h3content.toUpperCase()) > -1) {
                    product.style.display = 'block';
                    productsFound += 1
                }
            };
            if (productsFound == 0) {
                this.empty = true;
            }
            else { this.empty = false }
        },
        updateCartTotal() {
            const total = this.goods.reduce((totalCart, item) => totalCart += item.totalPrice, 0)
            this.totalCart = total;
            if (this.totalCart == 0) {
            this.showTotalinCart = false;
            this.cartIsEmpty = 'Your shopping cart is empty...';
            }
        },
        addProductToCart(el) {
            this.showTotalinCart = true;
            this.cartIsEmpty = '';
            let productId = el.id_product;
            let find = this.goods.find(product =>
                product.id_product === productId);
            if (find) {
                find.quantity++;
                find.totalPrice = find.quantity * find.price;
                this.updateCartTotal();
            }
            else {
                this.goods.push(el);
                Vue.set(el, 'quantity', 1);
                Vue.set(el, 'totalPrice', el.price)
                this.updateCartTotal();
            }
        },
        removeItemfromCart(el) {
            let productId = el.id_product;
            let find = this.goods.find(product =>
                product.id_product === productId);
            if (find.quantity > 1) {
                find.quantity--;
                find.totalPrice = find.quantity * find.price;
                this.updateCartTotal();
            }
            else {
                this.goods.splice(this.goods.indexOf(find), 1);
                this.updateCartTotal();
            }
        }
    },
    mounted() {
        this.getJson(`${API + this.calalogURL}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
                console.log(this.products)
            })
    }
})







