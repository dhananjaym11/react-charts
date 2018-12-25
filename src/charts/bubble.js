import React, { Component } from 'react';

class LinearBubbleChart extends Component {

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    createchart() {
        const node = this.node;
        const { data } = this.props;
    }

    render() {
        const { width, height, data, bubbleSpacing } = this.props;
        const newBubbleSpacing = bubbleSpacing ? bubbleSpacing : 90;
        const newHeight = height ? height : 300;
        const newWidth = data.length * newBubbleSpacing + 100;

        return (
            <svg width={newWidth} height={newHeight}>
                <path stroke="steelblue" d={`M 10 ${newHeight / 2} L${newWidth - 20} ${newHeight / 2}`} />

                {data.map((d, i) => {
                    return (
                        <g key={i}>
                            <circle cx={50 + i * newBubbleSpacing} cy={newHeight / 2} r={d.value} fill={d.color} />

                            <text x={45 + i * newBubbleSpacing} y={newHeight / 2 + 50} width="50">{d.title}</text>

                            <text x={45 + i * newBubbleSpacing} y={newHeight / 2 - d.value - 20} width="50">{d.value}</text>
                        </g>
                    )
                })}
            </svg>
        );
    }
}

export default LinearBubbleChart;
