<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        {{tag.name}}
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {

    get tagList() {
      return this.$store.state.tagList;
    }

    selectedTags: string[] = [];

    created() {
      this.$store.commit('fetchTags');
    }

    toggle(tag: string) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:value', this.selectedTags);
    }

    create() {
      const name = window.prompt('请输入标签名');
      if (name === null) {return;} //用户取消
      if (!name) {
        return window.alert('标签名不能为空');
      }
      this.$store.commit('createTag', name);
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    font-size: 14px;
    padding: 16px;
    background: rgb(254,254,254);
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;

    > .current {
      display: flex;
      flex-wrap: wrap;

      > li {
        $bg: rgb(244,244,244);
        background: $bg;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;

        &.selected {
          background: rgb(254,217,67);
          /*color: white;*/
        }
      }
    }

    > .new {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: rgb(254,217,67);
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>