const {join, relative} = require('node:path');
const terser = require('@rollup/plugin-terser');
const {pascalCase, camelCase} = require('change-case')
const fs = require("node:fs");

const bundlesDir = 'bundles'
const dir = `./dist/sandbox/${bundlesDir}`;

const external = [];
const globals = {};

const plugins = [
  terser(
    {
      format: {
        comments: false
      },
    }
  )
];

function addToExternal(name, globalName) {
  if (!external.includes(name)) {
    external.push(name);
  }

  if (globalName) {
    globals[name] = globalName;
  }
}

const ngConfigs = [
  '@angular/animations',
  '@angular/animations/browser',
  '@angular/animations/browser/testing',
  '@angular/common',
  '@angular/common/testing',
  '@angular/common/http',
  '@angular/common/http/testing',
  '@angular/compiler',
  '@angular/compiler/testing',
  '@angular/core',
  '@angular/core/testing',
  '@angular/forms',
  '@angular/platform-browser',
  '@angular/platform-browser/animations',
  '@angular/platform-browser/testing',
  '@angular/platform-browser-dynamic',
  '@angular/platform-browser-dynamic/testing',
  '@angular/router',
  '@angular/router/testing',
].map(package => {
  const [scope, ...libraryPath] = package.split('/');

  const globalName = libraryPath.join('-');

  addToExternal(package, `ng${pascalCase(globalName)}`);

  const fileName = libraryPath[libraryPath.length - 1];
  const outputFile = join(dir, package, `${fileName}.js`);
  const [libraryMainName, ...other] = libraryPath;

  if (!other.length) {
    other.push(libraryMainName);
  }

  return {
    input: `node_modules/${scope}/${libraryMainName}/fesm2020/${other.join('/')}.mjs`,
    output: {
      file: outputFile,
      format: 'umd',
      name: package,
      globals
    },
    external,
    plugins
  }
});

const tslibConfigs = ['tslib'].map((package) => {
  addToExternal(package, package);

  return {
    input: `node_modules/${package}/${package}.es6.js`,
    output: {
      file: join(dir, `${package}.js`),
      format: 'umd',
      name: package,
      globals,
    },
    external,
    plugins
  }
});

const materialConfigs = [
  '@angular/material/autocomplete',
  '@angular/material/badge',
  '@angular/material/bottom-sheet',
  '@angular/material/button',
  '@angular/material/button-toggle',
  '@angular/material/card',
  '@angular/material/checkbox',
  '@angular/material/chips',
  '@angular/material/core',
  '@angular/material/datepicker',
  '@angular/material/dialog',
  '@angular/material/divider',
  '@angular/material/expansion',
  '@angular/material/form-field',
  '@angular/material/grid-list',
  '@angular/material/icon',
  '@angular/material/input',
  '@angular/material/list',
  '@angular/material/menu',
  '@angular/material/paginator',
  '@angular/material/progress-bar',
  '@angular/material/progress-spinner',
  '@angular/material/radio',
  '@angular/material/select',
  '@angular/material/sidenav',
  '@angular/material/slide-toggle',
  '@angular/material/slider',
  '@angular/material/snack-bar',
  '@angular/material/sort',
  '@angular/material/stepper',
  '@angular/material/table',
  '@angular/material/tabs',
  '@angular/material/toolbar',
  '@angular/material/tooltip',
  '@angular/material/tree',
].map(package => {
  const [scope, ...libraryPath] = package.split('/');

  const globalName = libraryPath.join('-');

  addToExternal(package, `ng${pascalCase(globalName)}`);

  const fileName = libraryPath[libraryPath.length - 1];
  const outputFile = join(dir, package, `${fileName}.js`);
  const [library, component] = libraryPath;

  return {
    input: `node_modules/${scope}/${library}/fesm2020/${component}.mjs`,
    output: {
      file: outputFile,
      format: 'umd',
      name: package,
      globals
    },
    external,
    plugins
  }
});


const cdkConfigs = [
  '@angular/cdk/a11y',
  '@angular/cdk/accordion',
  '@angular/cdk/bidi',
  '@angular/cdk',
  '@angular/cdk/clipboard',
  '@angular/cdk/coercion',
  '@angular/cdk/collections',
  '@angular/cdk/dialog',
  '@angular/cdk/drag-drop',
  '@angular/cdk/keycodes',
  '@angular/cdk/layout',
  '@angular/cdk/listbox',
  '@angular/cdk/menu',
  '@angular/cdk/observers',
  '@angular/cdk/overlay',
  '@angular/cdk/platform',
  '@angular/cdk/portal',
  '@angular/cdk/scrolling',
  '@angular/cdk/stepper',
  '@angular/cdk/table',
  '@angular/cdk/testing',
  '@angular/cdk/text-field',
  '@angular/cdk/tree',
].map(package => {
  const [scope, ...libraryPath] = package.split('/');

  const globalName = libraryPath.join('-');

  addToExternal(package, `ng${pascalCase(globalName)}`);

  const fileName = libraryPath[libraryPath.length - 1];
  const outputFile = join(dir, package, `${fileName}.js`);
  const [library, component] = libraryPath;

  return {
    input: `node_modules/${scope}/${library}/fesm2020/${component ?? library}.mjs`,
    output: {
      file: outputFile,
      format: 'umd',
      name: package,
      globals
    },
    external,
    plugins
  }
});

const rxjsConfigs = [
  'rxjs',
  'rxjs/operators'
].map(package => {
  const [library, secondEntryLibrary] = package.split('/');

  const globalName = [library, secondEntryLibrary].filter(Boolean).join('-');

  addToExternal(package, camelCase(globalName));

  return {
    input: `node_modules/${library}/dist/esm5${secondEntryLibrary ? `/${secondEntryLibrary}` : ''}/index.js`,
    output: {
      file: join(dir, library, `${secondEntryLibrary ?? library}.js`),
      format: 'umd',
      name: package,
      globals
    },
    external,
    plugins
  }
});

const zoneBundleConfig = {
  input: 'node_modules/zone.js/fesm2015/zone.js',
  output: {
    file: join(dir, 'zone.js'),
    format: 'iife',
    name: 'zone',
    globals,
  },
  external,
  plugins
};

const mainBundles = [
  ...ngConfigs,
  ...rxjsConfigs,
  ...tslibConfigs,
  ...materialConfigs,
  ...cdkConfigs,
];

const imports = [
  ...mainBundles.map(({output: {name, file}}) => [name, `./${bundlesDir}/` + relative(dir, file)]),
  ['@material/dialog', 'https://unpkg.com/@material/dialog@15.0.0-canary.7971d6ad5.0/dist/mdc.dialog.min.js']
];

addToExternal('@material/dialog', 'materialDialog')

fs.mkdirSync(dir);
fs.writeFileSync(join(dir, 'imports.json'), JSON.stringify(
  {
    imports: Object.fromEntries(imports)
  }, null, 2
))

const configs = [
  ...mainBundles,
  zoneBundleConfig
];

module.exports = configs;


