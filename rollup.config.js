
const path = require('node:path');
const typescript = require("rollup-plugin-typescript");
const dir = './dist/sandbox';

const external = [
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/platform-browser',
  'rxjs',
  'rxjs/operators',
  'tslib',
  'zone.js'
];

const globals = {
  '@angular/core': 'ng',
  '@angular/compiler': 'ngCompiler',
  '@angular/common': 'ngCommon',
  '@angular/platform-browser': 'ngPlatformBrowser',
  '@angular/platform-browser-dynamic': 'ngPlatformBrowserDynamic',
  'tslib': 'tslib',
  'rxjs': 'rxjs',
  'rxjs/operators': 'rxjsOperators',
  'zone.js': 'zone'
};

module.exports = [
  {
    input: 'node_modules/@angular/core/fesm2015/core.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-core.js'),
      format: 'umd',
      name: '@angular/core',
      globals,
    },
    external
  },
  {
    input: 'node_modules/@angular/forms/fesm2015/forms.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-forms.js'),
      format: 'umd',
      name: '@angular/forms',
      globals,
    },
    external
  },
  {
    input:
      'node_modules/@angular/platform-browser/fesm2015/platform-browser.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-platform-browser.js'),
      format: 'umd',
      name: '@angular/platform-browser',
      globals,
    },
    external,
  },
  {
    input: 'node_modules/@angular/compiler/fesm2015/compiler.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-compiler.js'),
      format: 'umd',
      name: '@angular/compiler',
      globals,
    },
    external,
  },
  {
    input: 'node_modules/@angular/common/fesm2015/common.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-common.js'),
      format: 'umd',
      name: '@angular/common',
      globals,
    },
    external,
  },
  {
    input:
      'node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-platform-browser-dynamic.js'),
      format: 'umd',
      name: '@angular/platform-browser-dynamic',
      globals,
    },
    external,
  },
  {
    input: 'node_modules/rxjs/dist/esm5/index.js',
    output: {
      file: path.join(dir, 'bundles', 'rxjs.js'),
      format: 'umd',
      name: 'rxjs',
      globals,
    },
    external
  },
  {
    input: 'node_modules/rxjs/dist/esm5/operators/index.js',
    output: {
      file: path.join(dir, 'bundles', 'rxjs-operators.js'),
      format: 'umd',
      name: 'rxjs/operators',
      globals,
    },
    external,
  },
  {
    input: 'node_modules/zone.js/fesm2015/zone.js',
    output: {
      file: path.join(dir, 'bundles', 'zone.js'),
      format: 'umd',
      name: 'zone',
      globals,
    },
    external,
  },
  {
    input: 'node_modules/tslib/tslib.es6.js',
    output: {
      file: path.join(dir, 'bundles', 'tslib.js'),
      format: 'umd',
      name: 'tslib',
      globals,
    },
    external,
  },
  {
    input: './amd-loader.ts',
    output: {
      file: path.join(dir, 'loader.js'),
      format: 'umd',
      name: 'loader'
    },
    plugins: [typescript()]
  },
];
