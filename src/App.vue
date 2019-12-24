<template>
  <div id="app">
    <csv-input @parsedData="handleParsedData"></csv-input>
    <graph :graphData="graphData"></graph>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CsvInput from '@/components/CsvInput.vue';
import Graph from '@/components/Graph.vue';
import CsvObjectModel from '@/models/CsvObjectModel';
import DataWrapper from '@/models/DataWrapper';

export default Vue.extend({
  data() {
    return {
      graphData: {} as DataWrapper<CsvObjectModel[]>
    };
  },
  components: {
    CsvInput,
    Graph
  },
  methods: {
    handleParsedData(parsedData: DataWrapper<CsvObjectModel[]>): void {
      this.graphData = parsedData;
    }
  }
});
</script>
