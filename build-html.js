`use strict`;
const fs = require('node:fs');
const {parse, parseFragment, serialize} = require('parse5');
const path = require('node:path')
const glob = require("glob");

const dir = './dist/sandbox';
const indexFile = './src/index.html';

const fileName = path.basename(indexFile);

function findElement(host, nodeName) {
  if (host.nodeName === nodeName) {
    return host;
  }

  if (!host.childNodes) {
    return null;
  }

  for (const hostElement of host.childNodes) {
    const elem = findElement(hostElement, nodeName);

    if (elem) {
      return elem;
    }
  }
  return null;
}

function insertElement(node, script) {
  const elem = parseFragment(script).childNodes[0];
  elem.parentNode = node;
  node.childNodes.push(elem);
}

const ast = parse(fs.readFileSync(indexFile, 'utf8').toString());

const appFiles = glob.sync(path.join(dir, 'app/**/*.js'));

const imports = fs.readFileSync(path.join(dir, 'bundles', 'imports.json'), 'utf8');

const body = findElement(ast, 'body');

insertElement(body, `<script type="application/javascript" src="./bundles/zone.js"></script>`);
insertElement(body, `\n`);
insertElement(body, `<script type="application/javascript">System.addImportMap(${imports})</script>`);
insertElement(body, `\n`);
appFiles.forEach((file) => {
    const src = `./${path.relative(dir, file)}`;
    insertElement(body, `<script type="application/javascript" src="${src}"></script>`);
    insertElement(body, `\n`);
  }
);
insertElement(body, `<script type="application/javascript" src="./main.js"></script>`);
insertElement(body, `\n`);
insertElement(body, `<script type="application/javascript">System.import('main')</script>`);
insertElement(body, `\n`);

fs.writeFileSync(path.join(dir, fileName), serialize(ast));
