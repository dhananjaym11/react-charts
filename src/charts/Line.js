import React, { Component } from 'react';
import * as d3 from 'd3';

class Barchart extends Component {
    componentDidMount() {
        this.createchart();
    }

    componentDidUpdate() {
        this.createchart();
    }

    createchart() {
        const node = this.node;
        const { width, height, data } = this.props;
        const color = ["#91cf60", "#d9ef8b", "#fee08b", "#fc8d59", "#d73027"];
        const margin = { top: 30, right: 20, bottom: 30, left: 50 };

        let newWidth = 600 - margin.left - margin.right;
        let newHeight = 270 - margin.top - margin.bottom;
        const parseDate = d3.timeParse("%d-%b-%y");

        data.forEach((d) => {
            d.date = +d.date;
            d.close = +d.close;
        });

        var xScale = d3.scaleLinear().range([0, newWidth]).domain([1, d3.max(data, d => d.date)]);
        var yScale = d3.scaleLinear().range([newHeight, 0]).domain([0, d3.max(data, d => d.close)]);

        // const bodyTooltip = d3.select("body").append("div")	
        // .attr("class", "tooltip")				
        // .style("opacity", 0);

        const svg = d3.select(node)
            .attr('width', width)
            .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let valueline = d3.line()
            .x((d, i) => xScale(d.date))
            .y((d) => yScale(d.close))
            .curve(d3.curveMonotoneX);

        svg.append("path").datum(data).attr("d", valueline(data));

        const tooltip = svg.append("g")
            .style("display", "none");

        svg.append("g").selectAll(".dot")       // dots
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => xScale(d.date))
            .attr("cy", (d) => yScale(d.close))
            .attr("r", 5)
            .on("mouseover", (d) => {
                tooltip.style("display", null)
                    .append('text')
                    .text(d.close)
                    .attr('x', xScale(d.date))
                    .attr('y', yScale(d.close))
                    .attr('dx', '-7')
                    .attr('dy', '-7')
            })
            .on("mouseout", () => {
                tooltip.style("display", "none")
                    .selectAll('text')
                    .remove();
            })

        svg.append("g") // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + newHeight + ")")
            .call(d3.axisBottom(xScale));

        svg.append("g") // Add the Y Axis
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale));
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default Barchart;