<template>
  <div class="page">
    <h2>Add new candy</h2>
    <div class="add_candy">
      <div class="one_input">
        <p>Name</p>
        <input type="text" ref="name"/>
      </div>
      <div class="one_input">
        <p>Description</p>
        <input type="text" ref="description" />
      </div>
      <div class="one_input">
        <p>Image URL</p>
        <input type="text" ref="image_url" />
      </div>
    </div>
    <button @click="check_values">Add Candy</button>
    <p v-if="message !== undefined" >{{message}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    check_values(){
        this.one = this.$refs['name']['value']
        this.two = this.$refs['description']['value']
        this.three = this.$refs['image_url']['value']
        if(this.$refs['name']['value'] && this.$refs['description']['value'] && this.$refs['image_url']['value']){
            this.add_candy();
        } else if (this.one === null || this.one === "" && this.two === null || this.two === "" && this.three === null || this.three === ""){
            this.message = 'Please fill all the required fields to add a new candy'
            setTimeout(() => {
                this.message = undefined
            }, 1500);
        }
    },

    add_candy() {
      axios
        .request({
          url: 'http://127.0.0.1:5000/api/candy',
          method: 'POST',
          data: {
            name: this.$refs['name']['value'],
            description: this.$refs['description']['value'],
            image_url: this.$refs['image_url']['value']
          },
        })
        .then((response) => {
          if(response['data'] === Number){
            this.message = `Your candy is added with ID: ${response['data']}`
          }
        })
        .catch((error) => {
          this.message = `there is an error: ${error}`
        })
    },
  },
  data() {
    return {
      message: undefined,
      one: undefined,
      two: undefined,
      three: undefined
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}

.page {
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  background: pink;
  margin: 20px auto;
  min-height: 10vh;
  h2 {
    margin: 10px 0px;
  }
  .add_candy {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  button{
    justify-self: center;
  }
}
</style>
