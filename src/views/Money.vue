<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>

    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                :value.sync="record.notes"

      />
    </div>
    <Tags :value.sync="record.tags"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import Tabs from '@/components/Tabs.vue';


  @Component({
    components: {Tabs, Tags, FormItem, NumberPad},
  })
  export default class Money extends Vue {

    get recordList() {
      return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;

    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };

    created() {
      this.$store.commit('fetchTags');
      this.$store.commit('fetchRecords');
    }

    saveRecord() {
      if (this.record.tags.length === 0 || !this.record.tags) {
        return window.alert('请至少选择一个标签');
      }
      this.$store.commit('createRecords', this.record);
      if (this.$store.state.createRecordError === null) {
        window.alert('已保存');
        this.record.notes='';

      }
    }

  }
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .notes {
    padding: 12px 0;
  }
</style>