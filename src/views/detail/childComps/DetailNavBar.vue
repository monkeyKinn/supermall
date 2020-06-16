<template>
  <div class="navBar">
    <navbar>
      <div slot="left" class="back" @click="goBack">
        <img src="~assets/img/common/back.svg" alt="back">
      </div>
      <div slot="center" class="title">
        <div v-for="(title,index) in titles"
             class="title-item"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)">
          {{title}}
        </div>
      </div>
    </navbar>
  </div>
</template>

<script>
  import Navbar from "../../../components/common/navbar/Navbar";
  export default {
    name: "DetailNavBar",
    components: {
      Navbar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      goBack() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back {
    height: 44px;
  }

  .back img{
    margin-top: 13px;
  }
</style>