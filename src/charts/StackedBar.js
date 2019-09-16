import React, { Component } from 'react';
import * as d3 from 'd3';

class StackedBarchart extends Component {
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
        const { height, data } = this.props;
        const color = ["#91cf60", "#d9ef8b", "#fee08b", "#fc8d59", "#d73027"];

        const newData = data.map(item => {
            return item.map((d, i) => {
                let sum = 0;
                for (let j = 0; j <= i; j++) {
                    sum += item[j]
                }
                return { 'y': d, 'y0': sum }
            })
        });

        var y = d3.scaleLinear()
            .domain([0, d3.max(newData, d => d3.max(d, d => d.y0))])
            .range([0, 200]);

        const g = d3.select(node)
            .attr('width', data.length * 30 + 30)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(20, 20)');

        const rectG = g.selectAll('g')
            .data(newData)
            .enter()
            .append('g')
            .attr('transform', (d, i) => 'translate(' + i * 30 + ',0)');

        // rect
        rectG.selectAll('rect')
            .data(d => d)
            .enter()
            .append('rect')
            .attr('width', 20)
            .attr('height', d => y(d.y))
            .attr('x', 0)
            .attr('y', d => 200 - y(d.y0))
            .attr('fill', (d, i) => color[i])
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default StackedBarchart;