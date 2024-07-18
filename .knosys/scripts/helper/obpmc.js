const { join: joinPath } = require('path');
const { resolveRootPath } = require('./knosys');

function resolvePmcRootPath() {
  return joinPath(resolveRootPath(), '.obpmc');
}

function resolvePmcDataPath() {
  return joinPath(resolvePmcRootPath(), 'data');
}

module.exports = { resolvePmcRootPath, resolvePmcDataPath };
