<script setup>
import MenuCom from '@/components/menu/MenuCom.vue'
</script>

<template>
  <div class="app-root">
    <el-container class="memorandum" style="height: 100%">

      <el-aside class="menu aside-scroll" style="background-color: #c4c4c466;">
        <MenuCom></MenuCom>
      </el-aside>

      <el-main class="main-scroll">
        <router-view></router-view>
      </el-main>

    </el-container>
  </div>
</template>

<style scoped>
.app-root, .memorandum {
  height: 100vh;
  min-height: 0;
  overflow: hidden; /* 关键：父容器绝不能有滚动条 */
  display: flex;
}
.memorandum {
  flex: 1 1 0%;
  display: flex;
  height: 100vh;
  min-height: 0;
  overflow: hidden; /* 再保险一层 */
}
.menu {
  width: 300px;
  min-width: 140px;
  background-color: #c4c4c466;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: hidden;
  padding:20px 10px ;
  padding-bottom: 2px;
}
.main {
  flex: 1 1 0%;
  min-width: 0;
  min-height: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
}
.scroll-area {
  /* 只让区域自己滚动，且仅显示y滚动条 */
  overflow-y: hidden;
  overflow-x: hidden;
  height: 100%;
  min-height: 0;
}

/* 隐藏滚动条：webkit 浏览器 */
.scroll-area::-webkit-scrollbar {
  display: none;
}
/* 隐藏滚动条：firefox */
.scroll-area {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.list {
  margin-left: 15px;
}

.add {
  margin-left: 30px;
}
</style>
