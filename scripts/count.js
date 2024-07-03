#!/usr/bin/env node

const { resolve: resolvePath, join: joinPath } = require('path');
const { readdirSync, statSync, existsSync, writeFileSync } = require('fs');

const REPO_ROOT = resolvePath(__dirname, '..');
const MEMBER_ROOT = joinPath(REPO_ROOT, 'members');
const EXCLUDED_MEMBERS = ['github_id'/*, 'Beavnvvv'*/];

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

function generateResult() {
  const rows = resolveSortedSequence().map((id, idx) => {
    const student = studentMap[id];
    const cols = [`\`${id}\``, resolveCompletedEmoji(student.registered)].concat(student.tasks.map(({ completed }) => resolveCompletedEmoji(completed)));

    return `| ${idx + 1} | ${cols.join(' | ')} |`;
  });

  return `# 学员信息

报名与完成情况统计如下：

| 序号 | 学员 | 报名 | task1 | task2 | task3 | task4 | task5 | task6 | task7 | task8 |
| ---: | --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
${rows.join('\n')}`;
}

readdirSync(MEMBER_ROOT).forEach(dirName => {
  const dirPath = joinPath(MEMBER_ROOT, dirName);

  if (!isDirNameValid(dirName) || !statSync(dirPath).isDirectory()) {
    return;
  }

  studentMap[dirName] = {
    id: dirName,
    registered: isRegistered(dirPath),
    tasks: Array.from(new Array(8)).map((_, i) => resolveTask(dirPath, i + 1)),
  };

  studentSeq.push(dirName);
});

writeFileSync(joinPath(MEMBER_ROOT, 'readme.md'), generateResult());
