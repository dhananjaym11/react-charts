import React, { Component } from 'react';
import * as d3 from 'd3';

class MultiLinechart extends Component {
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

        // data.forEach((d) => {
        //     d.date = +d.date;
        //     d.close = +d.close;
        // });

        var xScale = d3.scaleTime().range([0, newWidth]).domain(d3.extent(data[0].values, d => d.date));
        var yScale = d3.scaleLinear().range([newHeight, 0]).domain([0, d3.max(data[0].values, d => d.price)]);

        let valueline = d3.line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.price));

        // const bodyTooltip = d3.select("body").append("div")
        //     .attr("class", "tooltip")
        //     .style("opacity", 0);

        const svg = d3.select(node)
            .attr('width', width)
            .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // svg.append("path").datum(data).attr("d", valueline(data));

        svg.selectAll('.line-group')
            .data(data).enter()
            .append('g')
            .attr('class', 'line-group')
            .append('path')
            .attr('class', 'line')
            .attr('d', d => valueline(d.values))

        // const tooltip = svg.append("g")
        //     .style("display", "none");

        // const circle = svg.append("g")      // dots
        //     .selectAll(".dot")
        //     .data(data)
        //     .enter()
        //     .append("circle")
        //     .attr("cx", (d, i) => xScale(d.date))
        //     .attr("cy", (d) => yScale(d.close))
        //     .attr("r", 5);

        /* circle.on("mouseover", (d, i) => {
            circle._groups[0][i].style.fill = 'red';
            bodyTooltip.transition()
                .duration(200)
                .style("opacity", .9);
            bodyTooltip.html(d.close)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 35) + "px");
        })
        circle.on("mouseout", (d, i) => {
            circle._groups[0][i].style.fill = 'black';
            bodyTooltip.transition()
                .duration(500)
                .style("opacity", 0)
        })*/

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

export default MultiLinechart;