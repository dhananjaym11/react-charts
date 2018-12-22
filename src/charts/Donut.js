import React, { Component } from 'react';
import * as d3 from 'd3';

class Donutchart extends Component {
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
            .innerRadius(radius)
            .outerRadius(radius - 50)

        const svg = d3.select(node)
            .attr('width', width)
            .attr('height', height)

        const g = svg.append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`)

        g.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('path')
            .attr("d", arc)
            .style("fill", function (d, i) {
                return color[i]
            });

        g.append("text")
            .attr("text-anchor", "middle")
            .attr('font-size', '4em')
            .attr('y', 20)
            .text('test');
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default Donutchart;
