const { join: joinPath } = require('path');
const { execSync } = require('child_process');

const { resolveRootPath } = require('../helper');

const siteRoot = joinPath(resolveRootPath(), '.knosys/sites/default');

module.exports = {
  execute: subCmd => {
    if (subCmd !== 'start') {
      return;
    }

    return execSync('npm run dev', { cwd: siteRoot, stdio: 'inherit' });
  },
};
