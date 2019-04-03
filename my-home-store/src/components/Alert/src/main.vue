<template>
  <div class="alertContainer" v-if="showAlert">
    <div class="alertItem">
      <p class="msg">{{msg}}</p>
      <p class="btn">
        <button @click="closeAlert">确认</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  prop: {},
  data() {
    return {
      showAlert: true,
      msg: '新增成功',
    };
  },
  mounted() {
    
  },
  methods: {
    closeAlert() {
      this.showAlert = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import url('../../../less/common.less');
  .alertContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    .alertItem {
      position: relative;
      width: 300px;
      height: 120px;
      background-color: @main-color;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .msg {
        text-align: center;
        font-size: 18px;
      }
      .btn {
        position: absolute;
        bottom: 10px;
        right: 10px;
        button {
          padding: 5px 10px;
          border-radius: 4px;
          outline: none;
          .btn-common(@minor-color, @minor-color);
        }
      }
    }
  }
</style>
