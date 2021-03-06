import { mount, Wrapper } from '@vue/test-utils';
import Graph from '@/components/Graph.vue';
import DataWrapper from '@/models/DataWrapper';
import CsvObject from '@/models/CsvObject';

let wrapper: Wrapper<Vue>;

beforeAll(() => {
  wrapper = mount(Graph, {
    propsData: {
      graphData: {}
    },
    attachToDocument: true
  });
  // set real data - mocking loading CSV via input and triggering watcher
  wrapper.setProps({
    graphData: new DataWrapper('Label A', 'Label B', [new CsvObject(2000, 50000), new CsvObject(3000, 400000)])
  });
});

// Normal wrapper cannot be used since d3 markup is not really a part of the component template, we have to use good old document.get*
describe('Graph.vue', () => {
  it('renders correct number of points', () => {
    const circleElements = document.getElementsByTagName('circle');
    expect(circleElements).toBeTruthy();
    expect(circleElements.length).toEqual(2);
  });

  it('renders correct length of X axis', () => {
    const axisStartElement = document.querySelector('#graph > svg > g > g:nth-child(1) > g:nth-child(2) > text');
    expect(axisStartElement).toBeTruthy();
    expect(axisStartElement!.innerHTML).toEqual('0');

    const axisEndElement = document.querySelector('#graph > svg > g > g:nth-child(1) > g:last-child > text');
    expect(axisEndElement).toBeTruthy();
    expect(axisEndElement!.innerHTML).toEqual('3,000');
  });

  it('renders correct length of Y axis', () => {
    // #graph > svg > g > g:nth-child(3) > g:nth-child(2) > text
    const axisStartElement = document.querySelector('#graph > svg > g > g:nth-child(3) > g > text');
    expect(axisStartElement).toBeTruthy();
    expect(axisStartElement!.innerHTML).toEqual('0');

    const axisEndElement = document.querySelector('#graph > svg > g > g:nth-child(3) > g:last-child > text');
    expect(axisEndElement).toBeTruthy();
    expect(axisEndElement!.innerHTML).toEqual('400,000');
  });

  it('renders tooltip', () => {
    expect(document.getElementsByClassName('tooltip').length).toEqual(1);
  });
});
