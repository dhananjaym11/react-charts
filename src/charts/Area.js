import React, { Component } from 'react';
import * as d3 from 'd3';

class Areachart extends Component {
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

        const margin = { top: 30, right: 20, bottom: 30, left: 50 };
        const newWidth = width - margin.left - margin.right;
        const newHeight = height - margin.top - margin.bottom;

        const scaleX = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.x)])
            .range([0, newWidth]);
        const scaleY = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)])
            .range([newHeight, 0]);
        var area = d3.area()
            .x(d => scaleX(d.x))
            .y0(newHeight)
            .y1(d => scaleY(d.y));
        const valueline = d3.line()
            .x(d => scaleX(d.x))
            .y(d => scaleY(d.y));

        const svg = d3.select(node)
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // area
        g.append("path")
            .data([data])
            .attr("class", "area")
            .attr("d", area);

        // line
        g.append("path")
            .attr("class", "area-line")
            .data([data])
            .attr("d", valueline);

        // circles
        const circles = g.selectAll('circle')
            .data(data)
            .enter()
            .append('circle');

        circles.attr('cx', d => scaleX(d.x))
            .attr('cy', d => scaleY(d.y))
            .attr('r', 5)
            .attr('fill', 'steelblue');

        // X Axis
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + newHeight + ")")
            .call(d3.axisBottom(scaleX));

        // Y Axis
        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(scaleY));
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default Areachart;