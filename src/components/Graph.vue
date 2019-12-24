<template>
  <div id="graph"></div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import * as d3 from 'd3';
import CsvObjectModel from '@/models/CsvObjectModel';
import DataWrapper from '@/models/DataWrapper';
import { ContainerElement } from 'd3';

const margin = { top: 30, right: 30, bottom: 30, left: 60 },
  width = 870 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

export default Vue.extend({
  props: {
    graphData: {
      type: Object as PropType<DataWrapper<CsvObjectModel[]>>,
      required: true
    }
  },
  data() {
    return {
      svg: {} as d3.Selection<SVGGElement, unknown, HTMLElement, any>,
      tooltip: {} as d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
    };
  },
  mounted() {
    this.svg = this.createBaseSvg();
    this.tooltip = this.createTooltip();
  },
  watch: {
    graphData(newValue: DataWrapper<CsvObjectModel[]>): void {
      const { x, y } = this.createAxes(newValue);
      this.createDots(newValue.data, x, y);
    }
  },
  methods: {
    createBaseSvg() {
      return d3
        .select('#graph')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    },
    createAxes(
      graphData: DataWrapper<CsvObjectModel[]>
    ): { x: d3.ScaleLinear<number, number>; y: d3.ScaleLinear<number, number> } {
      const x = d3
        .scaleLinear()
        .domain([graphData.minX, graphData.maxX])
        .range([0, width]);

      this.svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      const y = d3
        .scaleLinear()
        .domain([graphData.minY, graphData.maxY])
        .range([height, 0]);
      this.svg.append('g').call(d3.axisLeft(y));

      return { x, y };
    },
    createDots(data: CsvObjectModel[], x: d3.ScaleLinear<number, number>, y: d3.ScaleLinear<number, number>): void {
      this.svg
        .append('g')
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (graphItem: CsvObjectModel) => x(graphItem.x))
        .attr('cy', (graphItem: CsvObjectModel) => y(graphItem.y))
        .attr('r', 1.5)
        .style('fill', '#69b3a2')
        .on('mouseover', this.onMouseOver)
        .on('mousemove', this.onMouseMove)
        .on('mouseleave', this.onMouseLeave);
    },
    createTooltip(): d3.Selection<HTMLDivElement, unknown, HTMLElement, any> {
      return d3
        .select('#graph')
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('border-width', '1px')
        .style('border-radius', '5px')
        .style('padding', '10px')
        .style('position', 'absolute');
    },
    onMouseOver(): void {
      this.tooltip.style('opacity', 1);
    },
    onMouseMove(data: CsvObjectModel, i: number, nodes: ArrayLike<SVGCircleElement>): void {
      this.tooltip
        .html('Description: ' + data.description)
        .style('left', d3.mouse(nodes[i])[0] + 90 + 'px')
        .style('top', d3.mouse(nodes[i])[1] + 'px');
    },
    onMouseLeave(): void {
      this.tooltip
        .transition()
        .duration(200)
        .style('opacity', 0);
    }
  }
});
</script>