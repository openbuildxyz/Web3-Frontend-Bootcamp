const { isPlainObject, isFunction } = require('@ntks/toolbox');

const { ensureDirExists, resolvePmcDataPath } = require('../../helper');
const { countStudents, countPrs, countReviewers, countTasks } = require('./count');

const executorMap = {
  count: {
    student: countStudents,
    pr: countPrs,
    reviewer: countReviewers,
    task: countTasks,
  },
};

function resolveExecutor(subCmd) {
  const [prefix, suffix] = subCmd.split(':');
  const suspectedExecutor = executorMap[prefix];

  if (!suspectedExecutor) {
    return;
  }

  return isPlainObject(suspectedExecutor) ? suspectedExecutor[suffix] : suspectedExecutor;
}

module.exports = {
  execute: (subCmd, ...args) => {
    if (!subCmd) {
      return;
    }

    const executor = resolveExecutor(subCmd);

    if (isFunction(executor)) {
      ensureDirExists(resolvePmcDataPath());
      executor.apply(null, args);
    }
  },
};
