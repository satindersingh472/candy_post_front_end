<template>
<div>
    <create-candy></create-candy>
  <div class="all_candies">
    <div class="one_candy" v-for="result in results" :key="result['id']">
        <img :src="result[3]" :alt="`image of ${result[1]}`">
        <p>ID: {{result[0]}}</p>
        <p>Name: {{result[1]}}</p>
        <p>Description: {{result[2]}}</p>
        <delete-candy @delete_response="all_candies" :result="result" ></delete-candy>
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
    all_candies() {
          axios
      .request({
        url: 'http://127.0.0.1:5000/api/candy'
      })
      .then((response) => {
        this.results = response['data']
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
    grid-template-columns: repeat(auto-fit, minmax(400px,1fr));
    gap: 20px;
    .one_candy{
        display: grid;
        justify-self: center;
        text-align: start;
        font-size: .5rem;
        gap: 10px;
        box-shadow: 3px 3px 6px lightcoral;
        img{
            width: 300px;
            height: 300px;
        }
    }
}

</style>
