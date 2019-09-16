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
                for (let j = 0; j <= i; j++) {
                    sum += item.y[j]
                }
                obj.y.push({ 'yValue': d, 'ySum': sum });
            })
            newData.push(obj);
        });

        const scaleX = d3.scaleBand()
            .domain(data.map(d => d.x))
            .range([0, newWidth])
            .padding(0.3);
        var scaleYValue = d3.scaleLinear()
            .domain([0, d3.max(newData, d => d3.max(d.y, d => d.ySum))])
            .range([0, newHeight]);
        var scaleYSum = d3.scaleLinear()
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
            .attr('width', scaleX.bandwidth())
            .attr('height', d => scaleYValue(d.yValue))
            .attr('x', 0)
            .attr('y', d => scaleYSum(d.ySum))
            .attr('fill', (d, i) => color[i])

        // X Axis
        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + newHeight + ")")
            .call(d3.axisBottom(scaleX));

        // Y Axis
        g.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(scaleYSum));
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default StackedBarchart;