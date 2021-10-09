import Vue                 from 'vue'
import Vuex                from 'vuex'

Vue.use(Vuex)
import auth                from "./modules/auth";
// import cart from "./modules/cart/index";
import NotificationService from "@/services/notification.service";

let carts = window.localStorage.getItem('carts');


export default new Vuex.Store({
    state    : {
        carts: carts ? JSON.parse(carts) : [],
    },
    getters  : {
        totalPrice: state => {
            let total = 0;
            state.carts.filter((item) => {
                total += (item.price * item.quantity);
            });
            return total;
        },
        totalCarts: state => {
            return state.carts.length;
        }
    },
    mutations: {
        addToCart(state, item) {
            let found = state.carts.find(product => product.product_id == item.product_id);
            if (found) {
                found.quantity++;
                found.sub_total = found.price * found.quantity;
                NotificationService.success('Updated to cart');
            } else {
                state.carts.push(item);
                NotificationService.success('Added to cart');
            }
            this.commit('SAVE_CART');
        },
        updateToCart(state, updated_cart) {
            let found = state.carts.find(product => product.product_id == updated_cart.product_id);
            if (updated_cart.quantity > 0) {
                found.quantity  = updated_cart.quantity;
                found.sub_total = found.price * updated_cart.quantity;
                this.commit('SAVE_CART');
                NotificationService.success('Updated cart');
            } else {
                this.commit('removeFromCart', found);
                NotificationService.success('Removed cart');
            }
        },

        SAVE_CART(state) {
            window.localStorage.setItem('carts', JSON.stringify(state.carts));
        },

        removeFromCart(state, item) {
            let index = state.carts.indexOf(item);
            state.carts.splice(index, 1);
            this.commit('SAVE_CART');
            NotificationService.success('Removed cart');
        },
        removeAllCarts(state, items) {
            window.localStorage.removeItem('carts');
            this.state.carts = []
            this.commit('SAVE_CART');
        },
    },


    modules: {
        auth,
        // cart
    }
})
