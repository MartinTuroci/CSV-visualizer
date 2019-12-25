import { shallowMount } from '@vue/test-utils';
import CsvInput from '@/components/CsvInput.vue';

describe('CsvInput.vue', () => {
  it('emits parsed data on valid csv', async () => {
    const wrapper = shallowMount(CsvInput);
    const mockFile = new File(['2000,50000,Description 1', '3000,400000,Description 2'], 'valid.csv');

    // @ts-ignore
    await wrapper.vm.processFile(mockFile);

    expect(wrapper.emitted().parsedData).toBeTruthy();
  });

  it('does not emit parsed data on invalid csv', async () => {
    const wrapper = shallowMount(CsvInput);
    const mockFile = new File(['invalid,50000,Description 1', '3000,400000,Description 2'], 'invalid.csv');

    // @ts-ignore
    await wrapper.vm.processFile(mockFile);

    expect(wrapper.emitted().parsedData).toBeFalsy();
  });

  it('shows error on invalid csv', async () => {
    const wrapper = shallowMount(CsvInput);
    const mockFile = new File(['invalid,50000,Description 1', '3000,400000,Description 2'], 'invalid.csv');

    // @ts-ignore
    await wrapper.vm.processFile(mockFile);

    expect(wrapper.find('.error')).toBeTruthy();
    expect(wrapper.find('.error').text()).toEqual('Incorrect data format');
  });
});
