<template>
 <span @click="addToCart(product)" title="Add to cart" class="h-6 w-6 fill-current text-gray-500 hover:text-black">
   <i class="fas fa-shopping-cart"></i>
 </span>
</template>

<script>
export default {
  name   : "AddToCart",
  props  : {
    product: Object
  },
  methods: {
    addToCart(product) {

    },
  }
}
</script>

<style scoped>

</style>