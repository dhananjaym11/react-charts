import React, { Component } from 'react';
import * as d3 from 'd3';

class DoubleBarchart extends Component {
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
        const { width, data } = this.props;
        const color = ["#91cf60", "#d9ef8b", "#fee08b", "#fc8d59", "#d73027"];

        let x = d3.scaleLinear()
            .range([0, width / 2 - 1])
            .domain([0, 100]);

        d3.select(node)
            .attr('width', width)
            .attr('height', data.length * 20)

        const g = d3.select(node)
            .selectAll('g')
            .data(data)
            .enter()
            .append('g');

        // left bar
        g.append('rect')
            .style("fill", (d, i) => color[i])
            .attr("width", d => x(d[0]))
            .attr("x", d => (width / 2) - x(d[0]) - 1)
            .attr("y", (d, i) => i * 20)
            .attr("height", 17);

        // left text
        g.append('text')
            .attr("class", 'bar-text')
            .attr("x", d => (width / 2) - x(d[0]) + 1)
            .attr("y", (d, i) => i * 20 + 13)
            .style("text-anchor", "start")
            .text(d => d[0]);

        // right bar
        g.append('rect')
            .style("fill", (d, i) => color[i])
            .attr("width", d => x(d[1]))
            .attr("x", d => (width / 2) + 1)
            .attr("y", (d, i) => i * 20)
            .attr("height", 17);

        // right text
        g.append('text')
            .attr("class", 'bar-text')
            .attr("x", d => (width / 2) + x(d[1]) - 1)
            .attr("y", (d, i) => i * 20 + 13)
            .style("text-anchor", "end")
            .text(d => d[1]);
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default DoubleBarchart;