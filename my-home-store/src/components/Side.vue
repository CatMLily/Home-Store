<template>
  <div id="sideBar">
    <div class="sideTitle">Home-Store</div>
    <div class="sideItems">
      <div v-for="(item, index) in sideList" :key="index" @click="changeAcitive(index)">
        <span
        :class="[isActive==index?'activeSide':'', 'hoverSide']"
        @click="goPage(item)">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Side',
  data() {
    return {
      sideList: ['clothes', 'shoes', 'decorations', 'bjd', 'add'],
      isActive: 0,
    };
  },
  mounted() {

  },
  methods: {
    changeAcitive(index) {
      this.isActive = index;
    },
    goPage(item) {
      this.$router.push(`/${item}`);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../less/common.less";
#sideBar {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  box-shadow: 3px 0 3px -3px #aaaaaa;
  .sideTitle {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: @minor-color;
    font-size: 24px;
    padding: 20px 0;
  }
  .sideItems {
    padding-top: 30px;
    position: relative;
    display: block;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div {
      position: relative;
      margin-bottom: 20px;
      text-align: center;
      cursor: pointer;
    }
  }
}
.hoverSide {
  position: relative;
  display: inline-block;
  &:before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -3px;
    width: 0;
    height: 2px;
    background: #333333;
    transition: all .3s;
  }
  &:hover:before{
    width: 100%;
    left: 0;
    right: 0;
  }
}
.activeSide:before {
  width: 100%;
  left: 0;
  right: 0;
}
</style>
