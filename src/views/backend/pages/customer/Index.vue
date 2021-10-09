<template>
  <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-15 pb-24 md:pb-5">
    <div class="bg-gray-800 pt-3">
      <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-2 shadow text-white flex justify-between">
        <h3 class="font-bold pl-2 text-2xl">Customers</h3>
      </div>
    </div>
    <div class="p-5">
      <div class="flex flex-col md:flex-row">
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
      <div class="md:flex-row">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div
              class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table class="min-w-full">
              <thead>
              <tr>
                <th
                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  #
                </th> <th
                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  Name
                </th>
                <th
                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  Email
                </th>
                <th
                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  Phone
                </th>
                <th
                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  Orders
                </th>
                <th
                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  Action
                </th>
              </tr>
              </thead>

              <tbody class="bg-white">
              <template v-if="customers.length">
                <tr v-for="(product, index) in customers">
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ ++index }}</td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ product.name }}</td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ product.email }}</td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ product.email }}</td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{{ product.email }}</td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <button title="Delete" @click="destroy(product.id)" type="button"
                            class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </template>
              <template v-if="!customers.length">
                <tr>
                  <th class="text-center font-weight-bolder h-20" colspan="100%">No data found</th>
                </tr>
              </template>
              </tbody>
            </table>
            <pagination v-if="customers.length>0" :pagination="pagination" @paginate="getLists()" :offset="5"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService          from "@/services/api.service";
import Pagination          from "@/components/Pagination";
import NotificationService from "@/services/notification.service";

export default {
  name      : "AdminCustomers",
  components: {Pagination},
  data      : () => ({
    pagination: {
      current_page: 1,
    },
    form      : {
      per_page: 15,
      search  : '',
    },
    customers  : [],
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
      ApiService.get(`/admin/customers`, {params: params}).then((res) => {
        this.customers   = res.data.data;
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
          ApiService.delete(`/admin/customers/${id}`,).then(res => {
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