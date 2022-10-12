<template>
  <div>
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
    delete_candy() {
      axios
        .request({
          url: 'http://127.0.0.1:5000/api/candy',
          method: 'DELETE',
          data: {
            candy_id: this.result[0],
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
          error
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
