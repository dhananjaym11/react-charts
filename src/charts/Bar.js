import React, { Component } from 'react';
import * as d3 from 'd3';

class Barchart extends Component {
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
        const color = ["#91cf60", "#d9ef8b", "#fee08b", "#fc8d59", "#d73027"];

        let x = d3.scaleLinear()
            .range([0, width-100]);
        x.domain([0, d3.max(data, d => d.value )])

        d3.select(node)
        .attr('width',width)
        .attr('height',height)

        d3.select(node)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .style("fill", (d, i) => color[i] )
        .attr("width", d =>  x(d.value))
        .attr("x", 100)
        .attr("y", (d, i) =>  i*20)
        .attr("height", 17);

        d3.select(node)
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(d => d.type)
        .attr("x", 20)
        .attr("y", (d, i) =>  i*20+15)
        .style("text-anchor", "middle")
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default Barchart;