<template>
  <div class="page">
    <h2>Add new candy</h2>
    <div class="add_candy">
      <div class="one_input">
        <p>Name</p>
        <input type="text" :ref="name" />
      </div>
      <div class="one_input">
        <p>Description</p>
        <input type="text" :ref="description" />
      </div>
      <div class="one_input">
        <p>Image URL</p>
        <input type="text" :ref="image_url" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    add_candy() {
      axios
        .request({
          url: 'http://127.0.0.1:5000/api/candy',
          method: 'POST',
          data: {
            name: this.$refs['name']['value'],
            description: this.$refs['description']['value'],
            image_url: this.$refs['image_url']['value'],
          },
        })
        .then((response) => {
          this.result = response
        })
        .catch((error) => {
          error
        })
    },
  },
  data() {
    return {
        result: undefined
    }
  },
}
</script>

<style lang="scss" scoped>
*{
    padding: 0px;
    margin: 0px;
}
.add_candy{
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
}
.page{
     background: pink;
    margin: 20px auto;
    min-height: 10vh;
    place-items: center;
    padding: 20px 0px;
    h2{
        margin: 10px 0px;
    }
}
</style>
