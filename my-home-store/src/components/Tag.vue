<template>
  <div class="tagView" :style="{background: randomColor,borderColor:randomColor}">
    {{tagName}}
    <span v-if="isAdd" @click="deleteTag(tagIndex)">×</span>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    tagName: String,
    isAdd: {
      default: false,
    },
    tagIndex: Number,
  },
  data() {
    return {
      // 随机的标签色定义
      colorList: [
        '#f4615c', '#01cf97',
        '#2486ff', '#33CC66',
        '#6666FF', '#66CC66',
        '#9933FF', '#999999',
        '#CC3333', '#FF3333',
        '#FF9933', '#FF9999',
      ],
      randomColor: '#f4615c',
    };
  },
  mounted() {
    // 返会一个指定范围内的随机数
    const randomNum = Math.floor(Math.random() * (11 + 1));
    this.randomColor = this.colorList[randomNum];
  },
  methods: {
    deleteTag(index) {
      this.$emit('deleteTag', index);
    },
  },
};
</script>

<style lang="less" scoped>
@import url('../less/common.less');
.tagView {
  padding: 2px 5px;
  max-width: 90px;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  margin-left: 5px;
  margin-top: 5px;
  color: white;
  span {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 14px;
    height: 14px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
