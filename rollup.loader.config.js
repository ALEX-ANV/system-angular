const {join} = require("node:path");
const typescript = require("@rollup/plugin-typescript");

const dir = './dist/sandbox';


module.exports = [
  {
    input: './amd-loader.ts',
    output: {
      file: join(dir, 'loader.js'),
      format: 'iife',
      name: 'loader',
    },
    plugins: [
      typescript({
        target: "es2017",
        module: "ES2015",
        downlevelIteration: false,
      })
    ]
  },
]
