import React, { Component } from 'react';
import * as d3 from 'd3';

class StackedBarchart extends Component {
    constructor(props) {
        super(props);
        this.createchart = this.createchart.bind(this);
    }

    componentDidMount() {
        this.createchart();
    }

    componentDidUpdate() {
        this.createchart();
    }

    createchart() {
        const node = this.node;
        const { width, height, data } = this.props;

        const color = ["#FAC454", "#EA7A00", "#D15960"];
        const margin = { top: 30, right: 20, bottom: 30, left: 50 };
        const newWidth = width - margin.left - margin.right;
        const newHeight = height - margin.top - margin.bottom;

        const newData = [];
        data.forEach(item => {
            const obj = { x: item.x, y: [] };
            item.y.forEach((d, i) => {
                let sum = 0;
                for (let j = 0; j < i; j++) {
                    sum += item.y[j]
                }
                obj.y.push({ 'yValue': d, 'ySum': sum });
            })
            newData.push(obj);
        });
        console.log(newData);

        const scaleX = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.x)])
            .range([0, newWidth]);
        var scaleY = d3.scaleLinear()
            .domain([0, d3.max(newData, d => d3.max(d.y, d => d.ySum))])
            .range([newHeight, 0]);

        const g = d3.select(node)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const rectG = g.append('g')
            .selectAll('g')
            .data(newData)
            .enter()
            .append('g')
            .attr('transform', (d, i) => 'translate(' + scaleX(d.x) + ',0)');

        // rect
        rectG.selectAll('rect')
            .data(d => d.y)
            .enter()
            .append('rect')
            .attr('width', 20)
            .attr('height', d => scaleY(d.yValue))
            .attr('x', 0)
            // .attr('x', d => scaleX(d.x))
            .attr('y', d => scaleY(d.ySum))
            .attr('fill', (d, i) => color[i])

        // X Axis
        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + newHeight + ")")
            .call(d3.axisBottom(scaleX));

        // Y Axis
        g.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(scaleY));
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default StackedBarchart;

/*

<div id="container"></div>
<script>
const data = [
	[80, 20, 50],
    [30, 100, 60],
    [50, 10, 20]
];
const newData = data.map(item=> {
	return item.map((d,i)=> {
    	let sum = 0;
    	for(let j=0; j<=i;j++) {
        	sum += item[j]
        }
    	return {'y': d, 'y0': sum }
    })
});
const color = ['red', 'blue', 'green']
const scale = d3.scaleLinear()
            .domain([d3.min(data), d3.max(data)])
            .range([50, 200]);

var y = d3.scaleLinear()
  .domain([0, d3.max(newData, d=>d3.max(d,d=>d.y0))])
  .range([0, 200]);

const g = d3.select('#container')
		.append('svg')
        .attr('width', data.length*30 + 100)
        .attr('height', 250)
        .append('g')
        .attr('transform', 'translate(20, 20)');

const rectG = g.selectAll('g')
  .data(newData)
  .enter()
  .append('g')
  .attr('transform', (d, i) => 'translate('+i*30+',0)');

const rect = rectG.selectAll('rect')
  .data(d=>d)
  .enter()
  .append('rect')
  .attr('width', 20)
  .attr('height', d=> y(d.y))
  .attr('x', 0)
  .attr('y', d=> 200-y(d.y0 ))
  .attr('fill',(d,i)=>color[i])
</script>

---------------

    createchart() {
        const node = this.node;
        const { height, data } = this.props;
        const color = ["#91cf60", "#d9ef8b", "#fee08b", "#fc8d59", "#d73027"];

        const newData = data.map(item => {
            return item.map((d, i) => {
                let sum = 0;
                for (let j = 0; j <= i; j++) {
                    sum += item[j]
                }
                return { 'y': d, 'y0': sum }
            })
        });

        var y = d3.scaleLinear()
            .domain([0, d3.max(newData, d => d3.max(d, d => d.y0))])
            .range([0, 200]);

        const g = d3.select(node)
            .attr('width', data.length * 30 + 30)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(20, 20)');

        const rectG = g.selectAll('g')
            .data(newData)
            .enter()
            .append('g')
            .attr('transform', (d, i) => 'translate(' + i * 30 + ',0)');

        // rect
        rectG.selectAll('rect')
            .data(d => d)
            .enter()
            .append('rect')
            .attr('width', 20)
            .attr('height', d => y(d.y))
            .attr('x', 0)
            .attr('y', d => 200 - y(d.y0))
            .attr('fill', (d, i) => color[i])
    }
*/