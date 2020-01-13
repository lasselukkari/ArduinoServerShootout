const util = require('util');
const wrk = require('wrk');
const asyncWrk = util.promisify(wrk);

const defaults = {
  threads: 1,
  duration: '10s',
  printLatency: true,
}

const settings = [
  {
    connections: 1,
    url: 'http://192.168.1.113/fourB'
  },
  {
    connections: 2,
    url: 'http://192.168.1.113/fourB'
  },
  {
    connections: 8,
    url: 'http://192.168.1.113/fourB'
  },
  {
    connections: 1,
    url: 'http://192.168.1.113/fourKB'
  },
  {
    connections: 2,
    url: 'http://192.168.1.113/fourKB'
  },
  {
    connections: 8,
    url: 'http://192.168.1.113/fourKB'
  },
  {
    connections: 1,
    url: 'http://192.168.1.113/fourKBloop'
  },
  {
    connections: 2,
    url: 'http://192.168.1.113/fourKBloop'
  },
  {
    connections: 8,
    url: 'http://192.168.1.113/fourKBloop'
  },
]

const results = [];

async function runWrk() {
  for (let i = 0; i < settings.length; i++) {
    const result = await asyncWrk({ ...defaults, ...settings[i] });
    results.push({ ...settings[i], ...result });
  }

  console.log(results);
}

runWrk()
