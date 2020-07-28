<template>
  <div>
    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <ol>
        <li v-for="group in result" :key="group.title">
          <h3 class="title">{{beautify(group.title)}}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{tagString(item.tags)}}</span>
              <span class="note"> {{item.notes}}</span>
              <span>￥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import intervalList from '@/constants/intervalList';
  import dayjs from 'dayjs'
  import clone from '@/lib/clone';

  @Component({
    components: {Tabs},
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]){
      return tags.length===0?'无':tags.join(',');
    }


    get recordList(){
      return (this.$store.state as RootState).recordList;
    }

    get result(){
      const {recordList}=this;
      type HashTableValue={title: string;items: RecordItem[]}

      // const hashTable: { [key: string]: HashTableValue } = {};

      const newList=clone(recordList).sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf());
      return [];
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    beautify(string: string){
      const day=dayjs(string);
      const now=dayjs();
      if(day.isSame(now,'day')){
        return '今天';
      }else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }

    }

    type = '-';
    interval = 'day';
    intervalList = intervalList;

    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
  }
  .note {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>

<style lang="scss" scoped>
  ::v-deep {
    .type-tabs-item {
      background: white;
      &.selected {
        background: #C4C4C4;
        &::after {
          display: none;
        }
      }
    }
    .interval-tabs-item {
      height: 48px;
    }
  }
</style>