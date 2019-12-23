<template>
  <div id="app">
    <csv-input @parsedData="handleParsedData" @parseError="handleParseError"></csv-input>
    <p v-if="errMsg">{{ errMsg }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CsvInput from '@/components/CsvInput.vue';
import CsvObjectModel from '@/models/CsvObjectModel';

export default Vue.extend({
  data() {
    return {
      errMsg: ''
    };
  },
  components: {
    CsvInput
  },
  methods: {
    handleParsedData(parsedData: CsvObjectModel[]): void {
      this.errMsg = '';
    },
    handleParseError(errMsg: string): void {
      this.errMsg = errMsg;
    }
  }
});
</script>
