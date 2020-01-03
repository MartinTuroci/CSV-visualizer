<template>
  <div class="container">
    <csv-input @parsedData="handleParsedData"></csv-input>
    <graph :graphData="graphData"></graph>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CsvInput from '@/components/CsvInput.vue';
import Graph from '@/components/Graph.vue';
import CsvObject from '@/models/CsvObject';
import DataWrapper from '@/models/DataWrapper';

export default Vue.extend({
  data() {
    return {
      graphData: {} as DataWrapper<CsvObject[]>
    };
  },
  components: {
    CsvInput,
    Graph
  },
  methods: {
    handleParsedData(parsedData: DataWrapper<CsvObject[]>): void {
      this.graphData = parsedData;
    }
  }
});
</script>
<style lang="scss">
@import '@/styles/App';

.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background: $primary;
  color: $secondary;
}
</style>
