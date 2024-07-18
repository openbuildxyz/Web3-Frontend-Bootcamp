const { join: joinPath } = require('path');
const { readdirSync, statSync, existsSync } = require('fs');
const { execSync } = require('child_process');
const { resolveRootPath, resolvePmcRootPath, resolvePmcDataPath, readData, saveData } = require('../../helper');

const repoRoot = resolveRootPath();

const pmcDataRoot = resolvePmcDataPath();
const cachedAllPrsFilePath = joinPath(pmcDataRoot, 'prs-all.yml');
// const cachedAllPrsFilePath = joinPath(pmcDataRoot, 'prs-all.json');
const cachedMergedPrsFilePath = joinPath(pmcDataRoot, 'prs-merged.yml');
const cachedStudentsFilePath = joinPath(pmcDataRoot, 'students.json');

const EXCLUDED_MEMBERS = ['github_id'/*, 'Beavnvvv'*/];

const perPage = 100;

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

function countStudents() {
  const MEMBER_ROOT = joinPath(repoRoot, 'members');

  const studentMap = {};
  const studentSeq = [];

  readdirSync(MEMBER_ROOT).forEach(dirName => {
    const dirPath = joinPath(MEMBER_ROOT, dirName);

    if (!isDirNameValid(dirName) || !statSync(dirPath).isDirectory()) {
      return;
    }

    studentMap[dirName] = {
      id: dirName,
      registered: isRegistered(dirPath),
      tasks: Array.from(new Array(9)).map((_, i) => resolveTask(dirPath, i + 1)),
    };

    studentSeq.push(dirName);
  });

  saveData(cachedStudentsFilePath, { people: studentMap, sequence: studentSeq });
}

function execGit(cmd) {
  return execSync(cmd, { cwd: repoRoot, encoding: 'utf8' });
}

function resolveRepoBasic() {
  const lines = execGit('git remote -v').split('\n');

  let repoUrl = '';

  for (const line of lines) {
    if (line.includes('origin')) {
      repoUrl = line.split('\t')[1];
      break;
    }
  }

  if (!repoUrl) {
    console.error('未找到远程仓库 URL');
    return;
  }

  const matches = repoUrl.match(/^https:\/\/github.com\/([^/]+)\/([^/.]+)\.git/);

  if (matches) {
    return { owner: matches[1], repo: matches[2] };
  }

  console.error('无法解析远程仓库 URL');
}

async function fetchPullRequests(octokit, page = 1) {
  const { owner, repo } = resolveRepoBasic() || {};

  if (!owner || !repo) {
    return;
  }

  let prs = {};
  let latestPageCount = 0;
  let latestFetchedPage = page;

  const res = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner,
    repo,
    state: 'all',
    page,
    per_page: perPage,
    direction: 'asc',
    base: 'main',
  })

  latestPageCount = res.data.length;

  console.log(`Fetched ${latestPageCount} PRs on page ${page}`);

  res.data.forEach(pr => (prs[pr.number] = pr));

  return {
    latestPageCount,
    latestFetchedPage,
    prs,
    hasNext: !!res.headers.link && res.headers.link.includes('rel="next"'),
  };
}

async function countAllPrs(token) {
  const { Octokit } = await import('octokit');
  const octokit = new Octokit({ auth: token });

  const cache = readData(cachedAllPrsFilePath) || { latestPageCount: 0, latestFetchedPage: 0, prs: {} };
  const nextPage = cache.latestPageCount && cache.latestPageCount < perPage ? cache.latestFetchedPage : cache.latestFetchedPage + 1;

  const result = await fetchPullRequests(octokit, nextPage);

  saveData(cachedAllPrsFilePath, {
    latestPageCount: result.latestPageCount || cache.latestPageCount,
    latestFetchedPage: result.latestFetchedPage,
    prs: { ...cache.prs, ...result.prs },
  });
}

function countMergedPrs() {
  const { prs } = readData(cachedAllPrsFilePath);
  const prArr = Object.values(prs);

  let closed = 0;
  const merged = [];

  prArr.forEach(pr => {
    if (pr.state !== 'closed') {
      return;
    }

    closed++;

    if (pr.merged_at) {
      merged.push({ number: pr.number, sha: pr.merge_commit_sha });
    }

    if (pr.auto_merge !== null) {
      console.log('PR `auto_merge`', pr.auto_merge);
    }
  });

  saveData(cachedMergedPrsFilePath, merged);
}

function countOpenTaskPrs() {
  const { prs } = readData(cachedAllPrsFilePath);
  const openPrMaps = {};

  Object.values(prs).forEach(pr => {
    if (pr.state === 'closed') {
      return;
    }

    const matched = pr.title.match(/^task(\d+)/i);

    if (matched) {
      const k = matched[0].toLowerCase();

      if (!openPrMaps[k]) {
        openPrMaps[k] = [];
      }

      openPrMaps[k].push({
        number: pr.number,
        url: pr.html_url,
        user: pr.user.login,
      });
    }
  });

  saveData(joinPath(pmcDataRoot, 'prs-open.json'), openPrMaps);
}

async function countPrs(state = 'merged', token = process.env.PMC_GITHUB_TOKEN) {
  if (state === 'all') {
    return countAllPrs(token);
  }

  if (state === 'merged') {
    return countMergedPrs();
  }

  if (state === 'open') {
    return countOpenTaskPrs();
  }
}

function countReviewers() {
  const merged = readData(cachedMergedPrsFilePath);
  const reviewers = {};

  merged.forEach(r => {
    const result = execGit(`git show ${r.sha}`);

    if (result.indexOf('Merge pull request') === -1) {
      return;
    }

    const reviewer = result.split('\n').find(tr => tr.startsWith('Author')).replace('Author: ', '').split(' <')[0];

    if (!reviewers[reviewer]) {
      reviewers[reviewer] = { name: reviewer, count: 0, prs: [] };
    }

    reviewers[reviewer].count += 1;
    reviewers[reviewer].prs.push(r.number);
  });

  const sequence = [];
  const segments = [];

  Object.values(reviewers).sort((a, b) => a.count > b.count ? -1 : 1).forEach(r => {
    sequence.push(r.name);
    segments.push(`- ${r.name}（${r.count}）`);
  });

  saveData(joinPath(pmcDataRoot, 'reviewers.yml'), { people: reviewers, sequence });
  saveData(joinPath(resolvePmcRootPath(), 'reviewer.md'), `${segments.join('\n')}\n`);
}

function countTasks() {
  const openPrMaps = readData(joinPath(pmcDataRoot, 'prs-open.json'));
  const { people: studentMap, sequence: studentSeq } = readData(cachedStudentsFilePath);
  const taskSections = [];

  Array.from(new Array(9)).forEach((_, i) => {
    const taskName = `task${i + 1}`;
    const segments = [`\n## ${taskName}\n`];
    const mergedRecords = [];
    const prRecords = [];

    studentSeq.forEach(id => {
      const student = studentMap[id];

      const task = student.tasks.find(({ name }) => name === taskName);

      if (task.completed) {
        mergedRecords.push(`- [${id}](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/tree/main/members/${id}/${taskName})`);
      } else if (openPrMaps[taskName]) {
        const pr = openPrMaps[taskName].find(({ user }) => user === id);

        if (pr) {
          prRecords.push(`- [${id}](${pr.url})`);
        }
      }
    });

    const totalText = `共 ${mergedRecords.length + prRecords.length} 人提交`;

    if (prRecords.length > 0) {
      segments.push('<details>', `<summary>${totalText}。</summary>`);

      if (mergedRecords.length > 0) {
        segments.push(`\n已合并 ${mergedRecords.length} 人：\n`, ...mergedRecords);
      }

      segments.push(`\n未合并 ${prRecords.length} 人：\n`, ...prRecords, '\n</details>');
    } else if (mergedRecords.length > 0) {
      segments.push('<details>', `${totalText}：\n`, ...mergedRecords, '\n</details>');
    } else {
      segments.push(`${totalText}。`)
    }

    taskSections.push(...segments);
  });

  saveData(joinPath(resolvePmcRootPath(), 'task.md'), `# 任务提交情况\n\n点击三角箭头查看详情。\n${taskSections.join('\n')}\n`);
}

module.exports = { countStudents, countPrs, countReviewers, countTasks };
