<template>
  <label for="fileInput"
    >Upload your csv file
    <input type="file" accept=".csv" @input="handleFile" ref="fileInput" />
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import CsvObjectModel from '@/models/CsvObjectModel';

export default Vue.extend({
  methods: {
    async handleFile(e: Event): Promise<void> {
      const file = (e.target as HTMLInputElement).files![0];
      try {
        const fileContents = await this.getFileContents(file);
        this.$emit('parsedData', this.parseFileContents(fileContents));
      } catch (error) {
        (this.$refs.fileInput as HTMLInputElement).value = '';
        this.$emit('parseError', error.message);
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
    parseFileContents(contents: string): CsvObjectModel[] {
      return contents.split('\n').map((row: string) => {
        const cols = row.split(',');
        const x = parseInt(cols[0], 10);
        const y = parseInt(cols[1], 10);
        if (isNaN(x) || isNaN(y)) {
          throw new Error('Incorrect data format');
        }
        return new CsvObjectModel(x, y, cols[2]);
      });
    }
  }
});
</script>
