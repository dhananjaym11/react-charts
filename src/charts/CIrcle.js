import React, { Component } from 'react';
import * as d3 from 'd3';

class Circlechart extends Component {
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
        const radius = Math.min(width, 2 * height) / 2

        const color = ["#FDFF9C", "#FAC454", "#EA7A00", "#D15960"];

        let pie = d3.pie()
            .value(d => d);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        d3.select(node)
            .attr('width', width)
            .attr('height', height)

        const arcs = d3.select(node)
            .append("g")
            .attr("class", "slice")
            .attr("transform", `translate(${width / 2}, ${height / 2})`)
            .selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')

        arcs.append('path')
            .attr("d", arc)
            .style("fill", (d, i) => color[i]);

        arcs.append('text')
            .attr("transform", (d) => (`translate(${arc.centroid(d)})`))
            .attr("text-anchor", "middle")
            .text((d, i) => data[i]);
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default Circlechart;
