#!/usr/bin/env node

const { resolve: resolvePath, join: joinPath } = require('path');
const { plus } = require('@ntks/toolbox');
const { readData, saveData } = require('@knosys/sdk');
const dayjs = require('dayjs');

const rootPath = resolvePath(__dirname, '../');
const pmcDataPath = joinPath(rootPath, '.obpmc', 'data');
const { people: studentMap, sequence: studentSeq } = readData(joinPath(pmcDataPath, 'students.json'));
const { task: { rewards: taskRewards, rewardDeadline } } = readData(joinPath(pmcDataPath, 'metadata.json'));

function resolveCompletedEmoji(checked) {
  return checked ? '🟢' : '🔴';
}

function compareMembers(a, b) {
  for (let i = 0; i < a.tasks.length; i++) {
    if (a.tasks[i].completed !== b.tasks[i].completed) {
        return a.tasks[i].completed ? -1 : 1;
    }
  }

  return 0;
}

function resolveSortedSequence() {
  const registeredStudents = [];
  const unregisteredStudents = [];

  studentSeq.forEach(id => {
    const student = studentMap[id];

    if (student.registered) {
      registeredStudents.push(id);
    } else {
      unregisteredStudents.push(id);
    }
  });

  const students = registeredStudents.map(id => studentMap[id]);

  students.sort(compareMembers);

  return [].concat(students.map(({ id }) => id), unregisteredStudents);
}

function generateSummaryTable() {
  const rows = resolveSortedSequence().map((id, idx) => {
    const student = studentMap[id];
    const cols = [`[\`${id}\`](${id})`, resolveCompletedEmoji(student.registered)].concat(student.tasks.map(({ completed }) => resolveCompletedEmoji(completed)));
    const rewards = student.registered ? student.tasks.reduce((total, task, idx) => {
      const reward = taskRewards[idx];

      if (task.rewardable && reward > 0) {
        return plus(total, reward);
      }

      return total;
    }, 0) : 0;

    return `| ${idx + 1} | ${cols.join(' | ')} | ${rewards} |`;
  });

  return `| 序号 | 学员 | 报名 | task1 | task2 | task3 | task4 | task5 | task6 | task7 | task8 | task9 | 奖励（U） |
| ---: | --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | ---: |
${rows.join('\n')}`;
}

function generateResult() {
  return `# 学员信息

报名与完成情况统计如下面表格所示，其中「奖励」的计算不包含：

- 未提交报名信息的；
- 完成 task7 的，因其由 Artela 发放；
- 超过有奖截止日期（${dayjs(rewardDeadline).format('YYYY-MM-DD HH:mm:ss')}）的。

更多详见[奖励规则](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp#%E5%A5%96%E5%8A%B1%E6%98%8E%E7%BB%86-%E8%AF%B7%E4%BB%94%E7%BB%86%E9%98%85%E8%AF%BB%E8%A6%81%E6%B1%82)。

${generateSummaryTable()}
`;
}

saveData(joinPath(rootPath, 'members', 'readme.md'), generateResult());
