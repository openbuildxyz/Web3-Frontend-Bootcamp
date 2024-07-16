#!/usr/bin/env node

const { resolve: resolvePath, join: joinPath } = require('path');
const { readdirSync, statSync, existsSync, writeFileSync } = require('fs');

const REPO_ROOT = resolvePath(__dirname, '..');
const MEMBER_ROOT = joinPath(REPO_ROOT, 'members');
const EXCLUDED_MEMBERS = ['github_id'/*, 'Beavnvvv'*/];

const taskSeq = Array.from(new Array(9));
const openPrMaps = require('./prs.json');

const studentMap = {};
const studentSeq = [];

function isDirNameValid(dirName) {
  return !dirName.startsWith('.') && !EXCLUDED_MEMBERS.includes(dirName);
}

function isRegistered(dirPath) {
  return existsSync(joinPath(dirPath, 'readme.md')) || existsSync(joinPath(dirPath, 'README.md'));
}

function resolveTask(memberDirPath, taskNum) {
  const taskDirName = `task${taskNum}`;

  return { name: taskDirName, completed: existsSync(joinPath(memberDirPath, taskDirName)) };
}

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
  const taskSections = [];

  taskSeq.forEach((_, i) => {
    const taskName = `task${i + 1}`;
    const segments = [`\n### ${taskName}\n`];
    const mergedRecords = [];
    const prRecords = [];

    studentSeq.forEach(id => {
      const student = studentMap[id];

      const task = student.tasks.find(({ name }) => name === taskName);

      if (task.completed) {
        mergedRecords.push(`- [${id}](${id}/${taskName})`);
      } else if (openPrMaps[taskName]) {
        const pr = openPrMaps[taskName].find(({ user }) => user === id);

        if (pr) {
          prRecords.push(`- [${id}](${pr.url})`);
        }
      }
    });

    const totalText = `共 ${mergedRecords.length + prRecords.length} 人提交`;

    if (prRecords.length > 0) {
      segments.push('<details>', `<summary>${totalText}。</summary>\n`, `已合并 ${mergedRecords.length} 人：\n`, ...mergedRecords, `\n未合并 ${prRecords.length} 人：\n`, ...prRecords, '\n</details>');
    } else if (mergedRecords.length > 0) {
      segments.push('<details>', `${totalText}：\n`, ...mergedRecords, '\n</details>');
    } else {
      segments.push(`${totalText}。`)
    }

    taskSections.push(...segments);
  });

  return `# 学员信息

报名与完成情况统计如下：

${generateSummaryTable()}

## 按任务统计

${taskSections.join('\n')}
`;
}

readdirSync(MEMBER_ROOT).forEach(dirName => {
  const dirPath = joinPath(MEMBER_ROOT, dirName);

  if (!isDirNameValid(dirName) || !statSync(dirPath).isDirectory()) {
    return;
  }

  studentMap[dirName] = {
    id: dirName,
    registered: isRegistered(dirPath),
    tasks: taskSeq.map((_, i) => resolveTask(dirPath, i + 1)),
  };

  studentSeq.push(dirName);
});

writeFileSync(joinPath(MEMBER_ROOT, 'readme.md'), generateResult());
