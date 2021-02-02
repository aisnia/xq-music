<template>
  <div class="about">
    <h1>API: {{ api }}</h1>
    <button @click="test">测试代理</button>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "about",
  data() {
    return {
      api: process.env.VUE_APP_API
    }
  },
  methods: {
    test() {
      axios.get("/api").then(res => {
        console.log("proxy", res)
      })
    }
  },
  mounted() {
    //js 代码使用环境变量
    console.log("Base_URL", process.env.BASE_URL)
    console.log("VUE_APP_PUBLIC_PATH", process.env.VUE_APP_PUBLIC_PATH)
  }

};
</script>
<style scoped>

</style>