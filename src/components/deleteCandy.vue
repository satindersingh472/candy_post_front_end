<template>
  <div>
    <!-- this component will delete the candy using the props sent by the homepage -->
    <button @click="delete_candy">Delete</button>
    <p v-if="message !== undefined">{{message}}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    result: Array,
  },
  methods: {
    // send the api request
    delete_candy() {
      axios
        .request({
          url: `${process.env.VUE_APP_BASE_DOMAIN}/api/candy`,
          method: 'DELETE',
          data: {
            candy_id: this.result[0]
          },
        })
        .then((response) => {
          if(response['data'] === "item deleted"){
            this.message = this.result['1'] + ' Deleted Successfully'
            setTimeout(() => {
                this.message = undefined;
                this.$emit('delete_response',response);
            }, 2000);
          }
        })
        .catch((error) => {
          this.message = error;
        })
    },
  },
  data() {
    return {
        message: undefined
    }
  },
}
</script>

<style lang="scss" scoped></style>
