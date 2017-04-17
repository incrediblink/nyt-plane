<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
    export default {

    }
</script>

<style>
  html {
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
    font-family: Georgia, 'Times New Roman', Times, "Microsoft YaHei", "微软雅黑", "SimHei", "黑体", "STXihei", "华文细黑", serif;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  .center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .el-button {
    transition: all .25s;
  }

  .el-radio__label {
    white-space: normal;
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }

  .component-fade-enter, .component-fade-leave-active {
    opacity: 0;
  }

  @media(max-width:600px) {
    .el-message-box {
      width: 95%;
    }
  }
</style>