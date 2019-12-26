import { shallowMount, Wrapper } from '@vue/test-utils';
import CsvInput from '@/components/CsvInput.vue';

let wrapper: Wrapper<Vue>;

beforeEach(() => {
  wrapper = shallowMount(CsvInput);
});
describe('CsvInput.vue', () => {
  it('emits parsed data on valid csv', async () => {
    const mockFile = new File(['label1,label2\n2000,50000\n3000,400000'], 'valid.csv');

    // @ts-ignore
    await wrapper.vm.processFile(mockFile);

    expect(wrapper.emitted().parsedData).toBeTruthy();
  });

  it('does not emit parsed data on invalid csv', async () => {
    const mockFile = new File(['label1,label2\ninvalid,50000\n3000,400000'], 'invalid.csv');

    // @ts-ignore
    await wrapper.vm.processFile(mockFile);

    expect(wrapper.emitted().parsedData).toBeFalsy();
  });

  it('shows format error on invalid csv', async () => {
    const mockFile = new File(['label1,label2\ninvalid,50000\n3000,400000'], 'invalid.csv');

    // @ts-ignore
    await wrapper.vm.processFile(mockFile);

    expect(wrapper.find('.csv-error')).toBeTruthy();
    expect(wrapper.find('.csv-error').text()).toEqual('Incorrect data format (only numbers allowed).');
  });

  it('shows cols number error on invalid csv', async () => {
    const mockFile = new File(['label1,label2,label3\ninvalid,50000\n3000,400000'], 'invalid.csv');

    // @ts-ignore
    await wrapper.vm.processFile(mockFile);

    expect(wrapper.find('.csv-error')).toBeTruthy();
    expect(wrapper.find('.csv-error').text()).toEqual('CSV can contain only 2 cols (x and y coordinates).');
  });
});
