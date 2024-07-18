#!/usr/bin/env node

const { resolve: resolvePath, join: joinPath } = require('path');
const { readData, saveData } = require('@knosys/sdk');

const rootPath = resolvePath(__dirname, '../');
const { people: studentMap, sequence: studentSeq } = readData(joinPath(rootPath, '.obpmc', 'data', 'students.json'));

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

    return `| ${idx + 1} | ${cols.join(' | ')} |`;
  });

  return `| 序号 | 学员 | 报名 | [task1](#task1) | [task2](#task2) | [task3](#task3) | [task4](#task4) | [task5](#task5) | [task6](#task6) | [task7](#task7) | [task8](#task8) | [task9](#task9) |
| ---: | --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
${rows.join('\n')}`;
}

function generateResult() {
  return `# 学员信息

报名与完成情况统计如下：

${generateSummaryTable()}
`;
}

saveData(joinPath(rootPath, 'members', 'readme.md'), generateResult());
