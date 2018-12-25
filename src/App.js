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
  [25, 10],
  [60, 80],
  [10, 50]
]

const dataNeedle = [35, 20, 20, 15];

const dataCircle = [35, 20, 30, 15];

const dataDonut = [35, 20, 30, 15];

const dataPipe = [35, 20, 30, 15];

var dataLine = [{
  date: "1",
  close: "44"
}, {
  date: "2",
  close: "20"
}, {
  date: "3",
  close: "100"
}, {
  date: "4",
  close: "37"
}, {
  date: "5",
  close: "59"
}];

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
      </div>
    );
  }
}

export default App;
