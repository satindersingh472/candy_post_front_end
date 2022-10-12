<template>
  <div class="all_candies">
    <div v-for="result in results" :key="result['id']">
        <h2>{{result[0]}}</h2>
        <h2>{{result[1]}}</h2>
        <p>{{result[2]}}</p>
        <img :src="result[3]" :alt="`image of ${result[1]}`">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted() {
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
  },
  data() {
    return {
      message: undefined,
      results: undefined,
    }
  },
}
</script>

<style lang="scss" scoped></style>
