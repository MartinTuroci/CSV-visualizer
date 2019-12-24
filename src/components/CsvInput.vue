<template>
  <div>
    <label for="fileInput">
      Upload your csv file
      <input type="file" accept=".csv" @input="handleFile" ref="fileInput" />
    </label>
    <p v-if="errMsg">{{ errMsg }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CsvObjectModel from '@/models/CsvObjectModel';
import DataWrapper from '@/models/DataWrapper';

export default Vue.extend({
  data() {
    return {
      errMsg: ''
    };
  },
  methods: {
    async handleFile(e: Event): Promise<void> {
      const file = (e.target as HTMLInputElement).files![0];

      if (file) {
        try {
          const fileContents = await this.getFileContents(file);
          this.$emit('parsedData', this.parseFileContents(fileContents));
        } catch (error) {
          (this.$refs.fileInput as HTMLInputElement).value = '';
          this.errMsg = error.message;
        }
      }
    },
    getFileContents(file: File): Promise<string> {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (e: ProgressEvent) => {
          reader.abort();
          reject(e);
        };
        reader.readAsText(file, 'utf-8');
      });
    },
    parseFileContents(contents: string): DataWrapper<CsvObjectModel[]> {
      let maxX = 0,
        maxY = 0,
        minX = 0,
        minY = 0;

      const csvObjectArr = contents.split('\n').map((row: string) => {
        const cols = row.split(',');
        const x = parseInt(cols[0], 10);
        const y = parseInt(cols[1], 10);

        if (isNaN(x) || isNaN(y)) {
          throw new Error('Incorrect data format');
        }

        maxX = Math.max(x, maxX);
        maxY = Math.max(y, maxY);
        minX = Math.min(x, minX);
        minY = Math.min(y, minY);

        return new CsvObjectModel(x, y, cols[2]);
      });

      return new DataWrapper<CsvObjectModel[]>(maxX, minX, maxY, minY, csvObjectArr);
    }
  }
});
</script>
