import React, { Component } from 'react';
import * as d3 from 'd3';

class BubbleChart extends Component {

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        const { height, data, bubbleSpacing } = this.props;
        const newBubbleSpacing = bubbleSpacing ? bubbleSpacing : 90;
        const newHeight = height ? height : 300;
        const newWidth = data.length * newBubbleSpacing + 50;

        let x = d3.scaleLinear()
            .range([12, 35])
            .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]);

        return (
            <svg width={newWidth} height={newHeight}>
                <path stroke="steelblue" d={`M 10 ${newHeight / 2} L${newWidth - 20} ${newHeight / 2}`} />

                {data.map((d, i) => {
                    return (
                        <g key={i}>
                            <circle cx={50 + i * newBubbleSpacing} cy={newHeight / 2} r={x(d.value)} fill={d.color} />

                            <text x={50 + i * newBubbleSpacing} y={newHeight / 2 + 50} textAnchor="middle">{d.title}</text>

                            <text x={50 + i * newBubbleSpacing} y={newHeight / 2 - d.value - 12} textAnchor="middle">{d.value}</text>
                        </g>
                    )
                })}
            </svg>
        );
    }
}

export default BubbleChart;
