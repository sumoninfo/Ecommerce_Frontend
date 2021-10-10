<template>
  <OrderDetailsShow :order="order"/>
</template>

<script>
import ApiService          from "@/services/api.service";
import NotificationService from "@/services/notification.service";
import OrderDetailsShow    from "../../../../components/OrderDetailsShow";

export default {
  name      : "show",
  components: {OrderDetailsShow},
  data      : () => ({
    order: {},
  }),
  mounted() {
    this.getOrder(this.$route.params.id);
  },
  methods: {
    getOrder(id) {
      ApiService.get(`/user/orders/${id}`).then((res) => {
        this.order = res.data.data;
      }).catch(error => {
        NotificationService.error(error.response.data.message);
      })
    },
  }
}
</script>