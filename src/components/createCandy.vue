<template>
<!-- it is a form that will add a new candy -->
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
    <!-- add candy will check if value is entered or not and will show user the appropraite message -->
    <button @click="check_values">Add Candy</button>
    <p v-if="message !== undefined" >{{message}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    // will check the input fields for null or empty string if null or empty then ask the user to enter the value
    // if filled then send it to the database
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
  // add candy will send the api request to add candy
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
          if(typeof(response['data']) === "number"){
            this.message = `Your candy is added with ID: ${response['data']}`
            setTimeout(() => {
                this.message = undefined
                this.$emit('recieve_add',response)
            }, 1500);
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
