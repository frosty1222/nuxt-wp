<script setup>
const { restAPI } = useApi();
const postData = ref([]);
const pageData = ref([]);
const fetPostData = async()=>{
    const { data } = await restAPI.cms.getPost();
   if(data && data._rawValue.length > 0){
    postData.value = data._rawValue;
   }
}
const fetPageData = async()=>{
    const { data } = await restAPI.cms.getPage();
   if(data && data._rawValue.length > 0){
    pageData.value = data._rawValue;
   }
}
onMounted(()=>{
  fetPostData();
  fetPageData();
});

</script>
<template>
    <div>
      <h1>Hello from MyComponent!</h1>
      <p>This is a sample component.</p>
      <button @click="fetPostData">fetch post data</button>
      <div v-if="postData.length > 0">
        <ul v-for="(post,index) in postData" v-bind:key="index">
        <li>title:{{post.title.rendered}}</li>
        <li v-html="post.content?.rendered"></li>
      </ul>
      </div>
      <button @click="fetData">fetch page data</button>
      <div v-if="pageData.length > 0">
        <ul v-for="(page,index) in pageData" v-bind:key="index">
        <li>title:{{page.title.rendered}}</li>
        <li v-html="page.content?.rendered"></li>
      </ul>
      </div>
    </div>
</template>
<style scoped>
</style>