<template>
  <div class="md:flex flex-col md:flex-row md:min-h-screen w-full ">
    <div
        class="flex shadow-lg border-r flex-col w-full md:w-3/12 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
      <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
        <a href="#"
           class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">Customer
          Panel</a>
      </div>
      <nav class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
        <a @click="dashboard_component='orders'"
           v-bind:class="[dashboard_component =='orders' ? 'bg-gray-200' : '']"
           class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
           href="#">Orders</a>
        <a @click="dashboard_component='delivered_orders'"
           v-bind:class="[dashboard_component =='delivered_orders' ? 'bg-gray-200' : '']"
           class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
           href="#">Delivered Orders</a>
        <a @click="dashboard_component='profile'"
           v-bind:class="[dashboard_component =='profile' ? 'bg-gray-200' : '']"
           class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900  rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
           href="#">Profile</a>
        <a @click="dashboard_component='password_update'"
           class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
           href="#">Password Update</a>
      </nav>
    </div>
    <div
        class="flex flex-col w-full md:w-9/12 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
      <component :is="dashboard_component"></component>
    </div>
  </div>
</template>

<script>
import profile          from './Profile'
import orders           from './order/Index'
import delivered_orders from './order/DeliveredOrders'
import password_update  from './PasswordUpdate'

export default {
  name      : "userDashboard",
  components: {profile, orders, password_update, delivered_orders},
  data      : () => ({
    dashboard_component: 'orders'
  }),

}
</script>

<style scoped>

</style>