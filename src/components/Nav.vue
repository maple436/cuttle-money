<template>
  <nav>
    <router-link to="/labels" class="item">
      <Icon name="label"/>
      标签
    </router-link>

    <router-link to="/money" class="item">
      <Icon name="money"/>
      记账
    </router-link>

    <router-link to="/statistics" class="item">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">


  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  nav {
    display: flex;
    padding: 2px 0;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    flex-direction: row;
    font-size: 12px;

    > .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33.333333%;
      flex-direction: column;

      .icon {
        width: 32px;
        height: 32px;
      }
    }
  }

</style>