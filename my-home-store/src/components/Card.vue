<template>
  <div class="card">
    <div class="imgContainer">
      <img :src="itemImg"/>
    </div>
    <div class="title">{{itemTitle}}</div>
    <div class="tagContainer">
      <span>标签:</span>
      <Tag v-for="(item, index) in itemTags" :key="index" :tagName="item"/>
    </div>
  </div>
</template>

<script>
import Tag from '@/components/Tag.vue';

export default {
  name: 'Card',
  props: {
    itemImg: String,
    itemTitle: String,
    itemTags: Array,
  },
  components: {
    Tag,
  },
};
</script>

<style lang="less" scoped>
@import url("../less/common.less");
.card {
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 10px;
  box-shadow: 3px 3px 3px -3px #333333;
  border-radius: 5px;
  background-color: #fffff9;
  .imgContainer {
    width: 100%;
    height: 180px;
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .title {
    margin-top: 10px;
    text-align: center;
  }
  .tagContainer {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    span {
      display: inline-flex;
      align-items: center;
      font-size: 12px;
      padding: 0 5px;
      margin-top: 5px;
      font-weight: bold;
    }
  }
}
</style>
