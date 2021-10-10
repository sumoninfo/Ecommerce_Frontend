<template>
  <section class="bg-white">
    <div class="flex items-center flex-wrap">
      <nav id="store" class="w-full z-30 top-0 px-6 py-1">

        <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 pt-3">
          <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
             href="#">
            Products List
          </a>
          <div class="flex items-center" id="store-nav-content">
            <a class="pl-3 inline-block no-underline hover:text-black" href="#">
              <select v-model="form.sort_by" @change="getProducts()"
                      class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Sort By</option>
                <option value="ASC">Price low to high</option>
                <option value="DESC">Price high to low</option>
              </select>
            </a>
            <div class="flex flex-col md:flex-row">
              <form @submit.prevent="getProducts()" class="w-full float-right max-w-sm">
                <div class="flex items-center border border-teal-500">
                  <input type="text" placeholder="Search..." v-model="form.search" autocomplete="off"
                         class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
                  <button
                      class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2"
                      type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <template v-if="products.length">
        <div v-for="(product, index) in products" :key="index" class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
          <a href="javascript:void(0)">
            <img class="hover:grow hover:shadow-lg" style="height: 272px; width: 272px" :src="product.image"
                 :alt="product.name">
            <div class="pt-3 flex items-center justify-between">
              <p class="">{{ product.name }}</p>

              <span v-if="product.quantity>0" @click="addToCart(product)" title="Add to cart"
                    class="h-6 w-6 fill-current text-gray-500 hover:text-black">
                    <i class="fas fa-shopping-cart"></i>
            </span>
              <span v-else
                    class="bg-orange-500 px-2 py-1 text-lg font-bold leading-none text-indigo-100 rounded">
                Out of stock
              </span>
            </div>
            <p class="pt-1 text-gray-900">{{ product.price | numberFormat }}</p>
          </a>
        </div>
      </template>
      <template v-if="!products.length">
        <div class="text-center font-bold w-full pt-5 border-t h-20">No Product found</div>
      </template>
    </div>
    <pagination v-if="products.length>0" :pagination="pagination" @paginate="getProducts()" :offset="5"/>
  </section>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import Pagination          from "@/components/Pagination";

export default {
  name      : "Home",
  components: {Pagination},
  data      : () => ({
    pagination: {
      current_page: 1,
    },
    form      : {
      per_page: 12,
      search  : '',
      sort_by : '',
    },
    products  : [],
  }),
  mounted() {
    this.getProducts()
  },
  methods: {
    addToCart(product) {
      let cart = {
        product_id    : product.id,
        name          : product.name,
        image         : product.image,
        quantity      : 1,
        price         : product.price,
        sub_total     : product.price * 1,
      }
      this.$store.commit('ADD_TO_CART', cart)
    },
    getProducts() {
      this.$Progress.start();
      let params = {
        per_page: this.form.per_page,
        page    : this.pagination.current_page,
        search  : this.form.search,
        sort_by : this.form.sort_by,
      };
      ApiService.get(`/products`, {params: params}).then((res) => {
        this.products   = res.data.data;
        this.pagination = res.data.meta;
        this.$Progress.finish();
      }).catch(error => {
        this.$Progress.fail();
        NotificationService.error(error.response.data.message);
      })
    }
  }
}
</script>

<style scoped>

</style>