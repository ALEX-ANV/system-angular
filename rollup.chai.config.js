const {join} = require("node:path");
const {nodeResolve} = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

const dir = './dist/sandbox';


module.exports = [
  {
    input: 'node_modules/chai/index.js',
    output: {
      file: join(dir, 'external', 'chai.js'),
      format: 'iife',
      name: 'chai',
    },
    plugins: [nodeResolve(), commonjs()],
  },
]
