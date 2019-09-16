import React, { Component } from 'react';
import LinearBubbleChart from 'react-linear-bubble-charts'

import './App.css';
import './bootstrap.css';
import Needle from './charts/Needle';
import Circle from './charts/CIrcle';
import Donut from './charts/Donut';
import Bar from './charts/Bar';
import Pipe from './charts/Pipe';
import Line from './charts/Line';
import DoubleBarchart from './charts/DoubleBar';
import MyLinearBubbleChart from './charts/bubble';
import MultiLinechart from './charts/MultiLine';
import Areachart from './charts/Area';
import StackedBarchart from './charts/StackedBar';
import MirrorLinechart from './charts/MirrorLine';

const dataBubble = [
  {
    title: "A",
    value: 5,
    color: "red"
  },
  {
    title: "B",
    value: 20,
    color: "yellow"
  },
  {
    title: "C",
    value: 10,
    color: "green"
  },
  {
    title: "D",
    value: 30,
    color: "blue"
  }
]

const dataBar = [
  { "type": "Web", "value": 25 },
  { "type": "Email", "value": 60 },
  { "type": "URL", "value": 8 },
  { "type": "C2", "value": 45 },
  { "type": "SMB", "value": 30 }
]

const dataDoubleBar = [
  [25, 100],
  [60, 20],
  [10, 50]
]

const dataNeedle = [35, 20, 20, 15];

const dataCircle = [35, 20, 30, 15];

const dataDonut = [35, 20, 30, 15];

const dataPipe = [35, 20, 30, 15];

const dataLine = [
  { date: "1", close: "44" },
  { date: "2", close: "20" },
  { date: "3", close: "100" },
  { date: "4", close: "37" },
  { date: "5", close: "59" }
];

const dataMultiLine = [
  {
    name: "USA",
    values: [
      { date: "2000", price: "100" },
      { date: "2001", price: "110" },
      { date: "2002", price: "145" },
      { date: "2003", price: "241" },
      { date: "2004", price: "101" },
    ]
  },
  {
    name: "Canada",
    values: [
      { date: "2000", price: "200" },
      { date: "2001", price: "120" },
      { date: "2002", price: "33" },
      { date: "2003", price: "21" },
      { date: "2004", price: "51" },
    ]
  },
  {
    name: "Maxico",
    values: [
      { date: "2000", price: "50" },
      { date: "2001", price: "10" },
      { date: "2002", price: "5" },
      { date: "2003", price: "71" },
      { date: "2004", price: "20" },
    ]
  }
];

const dataArea = [
  { x: 0, y: 12 }, { x: 10, y: 21 }, { x: 20, y: 18 }, { x: 30, y: 7 }, { x: 40, y: 15 }
]

const dataStackedBar = [
  { x: 0, y: [80, 20, 50] },
  { x: 10, y: [30, 100, 60] },
  { x: 20, y: [50, 10, 20] },
  { x: 30, y: [10, 80, 30] }
];

const dataMirrorLine = [
  { x: "1", y0: "44", y1: "10" },
  { x: "2", y0: "20", y1: "65" },
  { x: "3", y0: "100", y1: "55" },
  { x: "4", y0: "37", y1: "40" },
  { x: "5", y0: "59", y1: "45" }
];

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <div>
          <LinearBubbleChart height={200} data={dataBubble} />
        </div>
        <div>
          <MyLinearBubbleChart height={200} data={dataBubble} />
        </div>
        <div >
          <Needle width={500} height={280} data={dataNeedle} />
        </div>
        <div>
          <Circle width={500} height={500} data={dataCircle} />
        </div>
        <div>
          <Donut width={500} height={500} data={dataDonut} />
        </div>
        <div>
          <Pipe width={500} height={300} data={dataPipe} />
        </div>
        <div>
          <Bar width={500} height={150} data={dataBar} />
        </div>
        <div>
          <DoubleBarchart width={500} height={150} data={dataDoubleBar} />
        </div>
        <div>
          <Line width={600} height={300} data={dataLine} />
        </div>
        <div>
          <MultiLinechart width={600} height={300} data={dataMultiLine} />
        </div>
        <div>
          <Areachart width={300} height={300} data={dataArea} />
        </div>
        <div>
          <StackedBarchart width={200} height={300} data={dataStackedBar} />
        </div>
        <div>
          <MirrorLinechart width={600} height={600} data={dataMirrorLine} />
        </div>
      </div>
    );
  }
}

export default App;
