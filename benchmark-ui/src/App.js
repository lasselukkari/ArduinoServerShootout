import React from 'react';
import results from './results'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import './App.css'

const tests = [
  {
    connections: 1,
    name: "4B",
  },
  {
    connections: 2,
    name: "4B",
  },
  {
    connections: 8,
    name: "4B",
  },
  {
    connections: 1,
    name: "4KB",
  },
  {
    connections: 2,
    name: "4KB",
  },
  {
    connections: 8,
    name: "4KB",
  },
  {
    connections: 1,
    name: "400 * 10B ",
  },
  {
    connections: 2,
    name: "400 * 10B ",
  },
  {
    connections: 8,
    name: "400 * 10B ",
  },
]

const servers = ['WebServer', 'AsyncWebServer', 'Awot']

function getChart(test, i) {
  const data = servers.map((name) => ({ name, 'Requests per sec': results[name][i].requestsPerSec }));

  return <div>
    <h2>{test.name} payload {test.connections} connections</h2>
    <BarChart
      width={500}
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Requests per sec" fill="#3186a0" />

    </BarChart>
  </div>
}

function getCharts(tests) {
  return <div>{tests.map(getChart)}</div>
}

function App() {
  return (
    <div className="App">
      <h1>Arduino HTTP Sever Shootout</h1>
      <p>An attempt to measure the write performance of three different Arduino web server frameworks.</p>
      <p>Source code for the backends, test script and visualization are available at <a href="https://github.com/lasselukkari/ArduinoServerShootout">github.</a> </p>
      <h2>Backends</h2>
      <h3>WebServer</h3>
      <ul>
        <li>
          <a href="https://github.com/espressif/arduino-esp32">Repository</a>
        </li>
        <li>
          <a href="https://github.com/lasselukkari/ArduinoServerShootout/blob/master/servers/WebServer/WebServer.ino">Sketch</a>
        </li>
      </ul>

      <h3>AsyncWebServer</h3>
      <ul>
        <li>
          <a href="https://github.com/me-no-dev/ESPAsyncWebServer">Repository</a>
        </li>
        <li>
          <a href="https://github.com/lasselukkari/ArduinoServerShootout/blob/master/servers/AsyncWebServer/AsyncWebServer.ino">Sketch</a>
        </li>
      </ul>
      <h3>aWOT</h3>
      <ul>
        <li>
          <a href="https://github.com/lasselukkari/aWOT">Repository</a>
        </li>
        <li>
          <a href="https://github.com/lasselukkari/ArduinoServerShootout/blob/master/servers/aWOT/aWOT.ino">Sketch</a>
        </li>
      </ul>
      <h2>Disclaimer</h2>
      <p>This benchmark compares apples to oranges. AsyncWebServer processes requests in parallel.</p>
      <p>Each benchmark was run once for 10 seconds.</p>
      {getCharts(tests)}
    </div>
  );
}

export default App;
