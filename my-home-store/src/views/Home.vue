<template>
  <div id="home">
    <div id="menu">
      <Side />
    </div>
    <div id="content">
      <div class="crumbContainer">
        <Crumb />
      </div>
      <div class="contentBody">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Side from '@/components/Side.vue';
import Crumb from '@/components/Crumb.vue';

export default {
  name: 'home',
  components: {
    Side,
    Crumb,
  },
  watch: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
#home {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  #menu {
    width: 200px;
    height: 100%;
  }
  #content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .crumbContainer {
      width: 100%;
      height: 40px;
      padding: 10px 20px;
    }
    .contentBody {
      flex: 1;
      padding: 0 20px;
      overflow: hidden;
    }
  }
}
</style>
