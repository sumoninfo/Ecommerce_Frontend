<template>
  <div class="flex shadow-md">
    <div class="w-3/4 bg-white px-10 py-10">
      <div class="flex justify-between border-b pb-2">
        <h1 class="font-semibold text-2xl">Shopping Cart</h1>
        <h2 class="font-semibold text-2xl">{{ totalCarts }} Items</h2>
      </div>
      <div class="flex mt-10 mb-5 pb-2 border-b">
        <h3 class="uppercase w-2/5">Product Details</h3>
        <h3 class="uppercase w-1/5 text-center">Quantity</h3>
        <h3 class="uppercase w-1/5 text-center">Price</h3>
        <h3 class="uppercase w-1/5 text-center">Total</h3>
      </div>
      <template v-if="carts.length">
        <div v-for="(cart, index) in carts" :key="index" class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div class="flex w-2/5"> <!-- product -->
            <div class="w-20">
              <img class="h-24" src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z" alt="">
            </div>
            <div class="flex flex-col justify-between ml-4 flex-grow">
              <span class="font-bold text-sm">{{ cart.name }}</span>
              <a href="javascript:void(0)" @click="removedCart(cart)"
                 class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
            </div>
          </div>
          <div class="flex justify-center w-1/5">
            <div class="relative flex flex-row w-full h-8">
              <input @change="updateToCart(cart.product_id, $event)" type="number" :value="cart.quantity"
                     class="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"/>
            </div>
          </div>
          <span class="text-center w-1/5 font-semibold text-sm">{{ cart.price | numberFormat }}</span>
          <span class="text-center w-1/5 font-semibold text-sm">{{ cart.sub_total | numberFormat }}</span>
        </div>
      </template>
      <template v-if="!carts.length">
        <div class="text-center font-bold  h-20">No data found</div>
      </template>
      <router-link :to="{name:'home'}" href="javascript:void(0)"
                   class="flex font-semibold text-indigo-600 text-sm mt-10">
        <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
          <path
              d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
        </svg>
        Continue Shopping
      </router-link>
    </div>

    <div id="summary" class="w-1/4 px-8 py-10">
      <h1 class="font-semibold text-2xl border-b pb-2">Order Summary</h1>
      <div class="flex justify-between mt-2 mb-5">
        <span class="font-semibold text-sm uppercase">Items: {{ totalCarts }}</span>
        <span class="font-semibold text-sm">Sub Total: {{ totalPrice |numberFormat }}</span>
      </div>
      <div>
        <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping Cost</label>
        <select v-model="form.shipping_cost" class="block p-2 text-gray-600 w-full text-sm">
          <option value="60">Inside Dhaka - 60.00</option>
          <option value="100">Outside Dhaka - 100.00</option>
        </select>
      </div>
      <div class="py-2">
        <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Discount</label>
        <input v-model="form.discount" type="text" id="promo" placeholder="Discount" class="p-2 text-sm w-full">
      </div>
      <div class="py-2">
        <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Order Note</label>
        <textarea v-model="form.note" type="text" class="p-2 text-sm w-full"></textarea>
      </div>
      <div class="border-t">
        <div class="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Grand Total</span>
          <span>{{ getGrandTotal |numberFormat }}</span>
        </div>

        <button v-if="user_logged" @click="orderSubmit()" type="button"
                class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          Checkout & Place an order
        </button>
        <button @click="$router.push({name:'userLogin'})" v-else type="button"
                class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          login first
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import ApiService             from "@/services/api.service";
import NotificationService    from "@/services/notification.service";
import * as JwtService        from "../../../services/jwt.service";

export default {
  name    : "Cart",
  data    : () => ({
        form       : {
          shipping_cost: 60,
          discount     : 0,
          note         : '',
        },
        user_logged: false,
      }
  ),
  computed: {
    ...mapState(["carts"]),
    ...mapGetters(["totalPrice", "totalCarts"]),
    getGrandTotal() {
      return this.totalPrice + (this.form.shipping_cost - this.form.discount);
    }
  },
  mounted() {
    this.user_logged = JwtService.getLoggedUser() == 'user' ? true : false;
  },
  methods: {
    removedCart(item) {
      this.$store.commit('removeFromCart', item)
    },
    updateToCart(product_id, $event) {
      let updated_cart = {
        product_id,
        quantity: $event.target.value
      }
      this.$store.commit('updateToCart', updated_cart)
    },
    orderSubmit() {
      Swal.fire({
        title             : 'Are you sure?',
        text              : "Do you want to confirm your order?",
        icon              : 'warning',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : 'Yes, confirm!'
      }).then((result) => {
        if (result.isConfirmed) {
          let form = {
            ...this.form,
            sub_total  : this.totalPrice,
            carts      : this.carts,
            grand_total: this.getGrandTotal,
          }
          ApiService.post(`/user/orders`, form).then(res => {
            this.$router.push({name: "userDashboard"});
            // this.$store.dispatch('remo')
            this.$store.commit('removeAllCarts')
            // window.localStorage.removeItem('carts');
            NotificationService.success(res.data.message);
          }).catch(error => {
            NotificationService.error(error.response.data.message);
          })
        }
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    }
  }
}
</script>

<style scoped>

</style>