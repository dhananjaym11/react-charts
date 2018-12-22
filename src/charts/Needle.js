import React, { Component } from 'react';
import * as d3 from 'd3';

class Needlechart extends Component {
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
            .startAngle(-Math.PI / 2)
            .endAngle(Math.PI / 2)
            .value(d => d);

        const arc = d3.arc()
            .innerRadius(radius)
            .outerRadius(radius - 50)

        const percToDeg = (perc) => {
            return perc * 360;
        };

        const percToRad = (perc) => {
            return degToRad(percToDeg(perc));
        };

        const degToRad = (deg) => {
            return deg * Math.PI / 180;
        };

        const createLine = () => {
            const startX = 0
            const startY = 0
            const middleX = -150
            const middleY = -150
            const endX = 10
            const endY = 0

            // return `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}/`
            return `${startX} ${startY} ${middleX} ${middleY}`
        }

        const createNeedle = (percentage) => {
            const thetaRad = percToRad(percentage) / 2
            const centerX = 0
            const centerY = 0
            const len = 215
            const radius = 5

            const topX = centerX - len * Math.cos(thetaRad)
            const topY = centerY - len * Math.sin(thetaRad)

            const leftX = centerX - radius * Math.cos(thetaRad - Math.PI / 2)
            const leftY = centerY - radius * Math.sin(thetaRad - Math.PI / 2)

            const rightX = centerX - radius * Math.cos(thetaRad + Math.PI / 2)
            const rightY = centerY - radius * Math.sin(thetaRad + Math.PI / 2)


            return `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`
        }

        const svg = d3.select(node)
            .attr('width', width)
            .attr('height', height)

        const g = svg.append("g")
            .attr("transform", `translate(${width / 2}, ${height - 30})`)

        g.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('path')
            .attr("d", arc)
            .style("fill", (d, i) => color[i]);

        g.append('circle')
            .attr('class', 'needle-center')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 15)

        // g.append('polyline')
        //     .attr('class', 'needle')
        //     .attr('points', createLine())
        //     .style('stroke', 'black')
        //     .style('stroke-width', 4)
        //     .style('fill', 'black')

        const needle = g.append('path')
            .attr('class', 'needle')
            .attr('d', createNeedle(0.8))
            .style('stroke', 'black')
            .style('fill', 'black')
    }

    render() {
        return (<svg ref={node => this.node = node} />);
    }
}

export default Needlechart;
