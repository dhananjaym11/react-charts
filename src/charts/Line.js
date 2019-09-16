import React, { Component } from 'react';
import * as d3 from 'd3';

class Linechart extends Component {
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

        const newWidth = 600 - margin.left - margin.right;
        const newHeight = 270 - margin.top - margin.bottom;

        data.forEach((d) => {
            d.date = +d.date;
            d.close = +d.close;
        });

        const xScale = d3.scaleLinear().range([0, newWidth]).domain([1, d3.max(data, d => d.date)]);
        const yScale = d3.scaleLinear().range([newHeight, 0]).domain([0, d3.max(data, d => d.close)]);

        const valueline = d3.line()
            .x((d, i) => xScale(d.date))
            .y((d) => yScale(d.close))
            .curve(d3.curveMonotoneX);

        const bodyTooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        const svg = d3.select(node)
            .attr('width', width)
            .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("path")
            .datum(data)
            .attr("d", valueline(data))
            .attr("class", "line");

        // dots
        const circle = svg.append("g")
            .selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(d.date))
            .attr("cy", (d) => yScale(d.close))
            .attr("r", 5)
            .attr('fill', 'steelblue');
        circle.on("mouseover", (d, i) => {
            circle._groups[0][i].style.fill = 'rgb(209, 89, 96)';
            bodyTooltip.transition()
                .duration(200)
                .style("opacity", .9);
            bodyTooltip.html(d.close)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 35) + "px");
        })
        circle.on("mouseout", (d, i) => {
            circle._groups[0][i].style.fill = 'steelblue';
            bodyTooltip.transition()
                .duration(500)
                .style("opacity", 0)
        })

        // X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + newHeight + ")")
            .call(d3.axisBottom(xScale));

        // Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default Linechart;