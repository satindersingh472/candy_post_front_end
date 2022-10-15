<template>
<div>
  <!-- display all candies on the page -->
  <!-- create candy will listen to recieve add event and trigger the act_candies -->
    <create-candy @recieve_add="all_candies" ></create-candy>
  <div class="all_candies">
    <h1 v-if="messahe !== undefined">{{message}}</h1>
    <!-- will loop thru results and print the every single one of them  -->
    <div class="one_candy" v-for="result in results" :key="result['id']">
        <img :src="result[3]" :alt="`image of ${result[1]}`">
        <p>ID: {{result[0]}}</p>
        <p>Name: {{result[1]}}</p>
        <p>Description: {{result[2]}}</p>
        <!-- delete candy will send the result as a props and listen to delete candy event for some response -->
        <delete-candy class="delete_candy" @delete_response="all_candies" :result="result" ></delete-candy>
    </div>
  </div>
</div>
</template>

<script>
import DeleteCandy from "@/components/deleteCandy.vue";
import CreateCandy from "@/components/createCandy.vue";
import axios from 'axios'
export default {
    components: {
        DeleteCandy,
        CreateCandy
    },
  mounted() {
  this.all_candies();
  },
  methods: {
    // all candies will send the api request
    all_candies() {
          axios
      .request({
        url: `${process.env.VUE_APP_BASE_DOMAIN}/api/candy`
      })
      .then((response) => {
        if(response['data'].includes('No Results')){
          this.message = 'No Resutls'
        }
        else{
          this.results = response['data'];        }
      })
      .catch((error) => {
        if (error) {
          this.message = 'There is an error while getting the data'
        }
      })
        
    }
  },
  data() {
    return {
      message: undefined,
      results: undefined,
    }
  },
}
</script>

<style lang="scss" scoped>
*{
    padding: 0px;
    margin: 0px;
}
img{
    width: 100%;
}
.all_candies{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
    gap: 20px;
    .one_candy{
        display: grid;
        justify-self: center;
        text-align: start;
        font-size: .5rem;
        gap: 10px;
        box-shadow: 3px 3px 6px lightcoral;
        img{
            width: 250px;
            height: 200px;
            object-fit: cover;
        }
        .delete_candy{
          justify-self: center;
          margin: 10px 0px;
        }
    }
}

</style>
