import React, { Component } from 'react';
import * as d3 from 'd3';

class MirrorLinechart extends Component {
    componentDidMount() {
        this.createchart();
    }

    componentDidUpdate() {
        this.createchart();
    }

    createchart() {
        const node = this.node;
        const { width, height, data } = this.props;
        const margin = { top: 30, right: 30, bottom: 30, left: 50 };

        const newWidth = width - margin.left - margin.right;
        const newHeight = height - margin.top - margin.bottom;
        data.forEach((d) => {
            d.x = +d.x;
            d.y0 = +d.y0;
            d.y1 = +d.y1;
        });

        const xScale = d3.scaleLinear()
            .range([0, newWidth])
            .domain([1, d3.max(data, d => d.x)]);
        const yTopScale = d3.scaleLinear()
            .range([newHeight / 2, 0])
            .domain([0, d3.max(data, d => d.y0)]);
        const yBottomScale = d3.scaleLinear()
            .range([newHeight / 2, 0])
            .domain([d3.max(data, d => d.y1), 0]);
        const valuelineTop = d3.line()
            .x((d, i) => xScale(d.x))
            .y((d) => yTopScale(d.y0));
        const valuelineBottom = d3.line()
            .x((d, i) => xScale(d.x))
            .y((d) => yBottomScale(d.y1));

        const svg = d3.select(node)
            .attr('width', width)
            .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Top line
        const topG = svg.append("g");
        topG.append("path")
            .datum(data)
            .attr("d", valuelineTop(data))
            .attr("class", "line");
        // circle
        topG.append("g")
            .selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(d.x))
            .attr("cy", (d) => yTopScale(d.y0))
            .attr("r", 5)
            .attr('fill', 'steelblue');
        // Y Axis
        topG.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yTopScale));

        // Bottom line
        const bottomG = svg.append("g");
        bottomG.append("path")
            .datum(data)
            .attr("d", valuelineBottom(data))
            .attr("transform", "translate(0," + newHeight / 2 + ")")
            .attr("class", "line");
        // circle
        bottomG.append("g")
            .selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(d.x))
            .attr("cy", (d) => yBottomScale(d.y1))
            .attr("r", 5)
            .attr("transform", "translate(0," + newHeight / 2 + ")")
            .attr('fill', 'steelblue');
        // Y Axis
        bottomG.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(0," + newHeight / 2 + ")")
            .call(d3.axisLeft(yBottomScale));


        // X Axis
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + newHeight / 2 + ")")
            .call(d3.axisBottom(xScale));
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default MirrorLinechart;