import React, { Component } from 'react';
import * as d3 from 'd3';

class StackedAreaChart extends Component {
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
        const { oldWidth, oldHeight, areaChartdata, lineData } = this.props;
        const color = ["#FAC454", "#EA7A00", "#D15960"];
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };
        const width = oldWidth - margin.left - margin.right;
        const height = oldHeight - margin.top - margin.bottom;

        var xScale = d3.scaleLinear()
            .domain([0, d3.max(areaChartdata[0], d => d.x)])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(areaChartdata[2], d => d.ySum)])
            .range([height, 0]);

        var area = d3.area()
            .x(d => xScale(d.x))
            .y0(d => yScale(d.ySum - d.y))
            .y1(d => yScale(d.ySum));

        let line = d3.line()
            .x((d) => xScale(d.x))
            .y((d) => yScale(d.y));

        var xAxis = d3.axisBottom()
            .scale(xScale)

        var yAxis = d3.axisLeft()
            .scale(yScale)

        var svg = d3.select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .selectAll("g")
            .data(areaChartdata)
            .enter()
            .append("g")
            .append("path")
            .attr("fill", (d, i) => color[i])
            .attr("d", area);

        svg.append("g")
            .data([lineData])
            .append('path')
            .attr('class', 'dash-line')
            .attr('d', line)

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default StackedAreaChart;