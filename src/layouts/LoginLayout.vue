<template>
  <div class="loginLayout">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
}
</script>

<style lang="scss" scoped>
  .loginLayout {
    height: 100vh;
    overflow: auto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: linear-gradient(#141e30, #243b55);
    .tip {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    font-size: 14px;
  }
  }
</style>
