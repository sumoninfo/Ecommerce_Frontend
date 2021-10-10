<template>
  <div class="main-content w-full flex-1 bg-gray-100 mt-12 md:mt-15 pb-24 md:pb-5">
    <div class="product_nav">
      <div class="bg-gray-800 pt-3">
        <div
            class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-2 shadow text-white flex justify-between">
          <h3 class="font-bold pl-2 text-2xl">Products</h3>
          <router-link :to="{name:'adminProductCreate'}"
                       class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
            <i class="fas fa-plus-square"></i> Add new
          </router-link>
        </div>
      </div>
      <div class="search-div flex p-5  flex-col md:flex-row pb-3">
        <form @submit.prevent="getLists()" class="w-full float-right max-w-sm">
          <div class="flex items-center border-b border-teal-500 py-2">
            <input type="text" placeholder="Search..." v-model="form.search" autocomplete="off"
                   class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none">
            <button
                class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="p-5 md:flex-row">
      <div class="py-2  w-full">
        <div
            class="inline-block min-w-full border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full text-left">
            <thead>
            <tr>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                #
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Name
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Qty
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Price
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Image
              </th>
              <th
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                Action
              </th>
            </tr>
            </thead>

            <tbody class="bg-white">
            <template v-if="products.length">
              <tr v-for="(product, index) in products">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">{{ ++index }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ product.name }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ product.quantity }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ product.price | numberFormat }}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex-shrink-0">
                    <img class="rounded w-2/12" :src="product.image"
                         :alt="product.name">
                  </div>
                  <!--                    <img :src="product.image"/>-->
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <router-link title="Edit" :to="{ name: 'adminProductEdit', params: {id: product.id }}"
                               class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1">
                    <i class="fas fa-pencil-alt"></i>
                  </router-link>
                  <button title="Delete" @click="destroy(product.id)" type="button"
                          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </template>
            <template v-if="!products.length">
              <tr>
                <th class="text-center font-weight-bolder h-20" colspan="100%">No data found</th>
              </tr>
            </template>
            </tbody>
          </table>
          <pagination v-if="products.length > 0" :pagination="pagination" @paginate="getLists()" :offset="5"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import Pagination          from "@/components/Pagination";

export default {
  name      : "AdminProducts",
  components: {Pagination},
  data      : () => ({
    pagination: {
      current_page: 1,
    },
    form      : {
      per_page: 15,
      search  : '',
    },
    products  : [],
  }),
  mounted() {
    this.getLists();
  },
  methods: {
    getLists() {
      this.$Progress.start();
      let params = {
        per_page: this.form.per_page,
        page    : this.pagination.current_page,
        search  : this.form.search,
      };
      ApiService.get(`/admin/products`, {params: params}).then((res) => {
        this.products   = res.data.data;
        this.pagination = res.data.meta;
        this.$Progress.finish();
      }).catch(error => {
        this.$Progress.fail();
        NotificationService.error(error.response.data.message);
      })
    },
    destroy(id) {
      Swal.fire({
        title             : 'Are you sure?',
        text              : "You won't be able to revert this!",
        icon              : 'warning',
        showCancelButton  : true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33',
        confirmButtonText : 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(`/admin/products/${id}`,).then(res => {
            this.getLists();
            NotificationService.success(res.data.message);
          }).catch(error => {
            NotificationService.error(error.response.data.message);
          })
        }
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
  }
}
</script>

<style scoped>

</style>