<template>
  <div>
    <label for="fileInput" class="label">
      Upload your csv file
      <input
        type="file"
        id="fileInput"
        ref="fileInput"
        name="fileInput"
        accept=".csv"
        @input="handleFile"
      />
    </label>
    <p v-if="errMsg" class="csv-error">{{ errMsg }}</p>
    <p v-else class="file-name">{{ fileName }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CsvObjectModel from '@/models/CsvObjectModel';
import DataWrapper from '@/models/DataWrapper';
import constants from '@/utils/constants';

export default Vue.extend({
  data() {
    return {
      errMsg: '',
      fileName: ''
    };
  },
  methods: {
    async handleFile(e: Event): Promise<void> {
      const file = (e.target as HTMLInputElement).files![0];
      if (file) {
        this.fileName = file.name;
        await this.processFile(file);
      }
    },
    async processFile(file: File): Promise<void> {
      try {
        const fileContents = await this.getFileContents(file);
        const parsedFileContents = this.parseFileContents(fileContents);
        this.errMsg = '';
        this.$emit('parsedData', parsedFileContents);
      } catch (error) {
        (this.$refs.fileInput as HTMLInputElement).value = '';
        this.errMsg = error.message;
        if (process.env.NODE_ENV === 'development') {
          throw error;
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
      const rows = contents.split('\n');
      const delimiter = this.getDelimiter(contents);
      const { labelX, labelY } = this.parseLabels(rows.shift()!, delimiter);
      const csvObjectArr = rows.map((row: string) => {
        const cols = row.split(delimiter);
        const x = parseInt(cols[0], 10);
        const y = parseInt(cols[1], 10);

        if (isNaN(x) || isNaN(y)) {
          throw new Error('Incorrect data format (only numbers allowed).');
        }

        maxX = Math.max(x, maxX);
        maxY = Math.max(y, maxY);
        minX = Math.min(x, minX);
        minY = Math.min(y, minY);

        return new CsvObjectModel(x, y);
      });

      return new DataWrapper<CsvObjectModel[]>(maxX, minX, maxY, minY, labelX, labelY, csvObjectArr);
    },
    parseLabels(headers: string, delimiter: string): Record<string, string> {
      const splitHeaders = headers.split(delimiter);

      if (splitHeaders.length !== 2) {
        throw new Error('CSV can contain only 2 cols (x and y coordinates).');
      }

      return { labelX: splitHeaders[0], labelY: splitHeaders[1] };
    },
    getDelimiter(csvString: string): string {
      const match = csvString.match(`[${constants.possibleDelimiters}]`);

      if (!match) {
        throw new Error(`Unknown delimiter. Please use one of these: ${constants.possibleDelimiters}.`);
      }

      return match[0];
    }
  }
});
</script>
<style lang="scss" scoped>
@import '@/styles/_variables';
.label {
  padding: 10px;
  background: $tertiary;
}
.file-name {
  text-align: center;
  color: $tertiary;
  font-size: 1.5rem;
}
.csv-error {
  color: $danger;
}
input[type='file'] {
  display: none;
}
</style>
