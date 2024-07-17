const { join: joinPath } = require('path');
const { execSync } = require('child_process');
const { resolveRootPath, readData, saveData } = require('../helper');

const repoRoot = resolveRootPath();
const cacheDirPath = joinPath(repoRoot, '.knosys', 'caches');
const cachedAllPrsFilePath = joinPath(cacheDirPath, 'prs-all.yml');
// const cachedAllPrsFilePath = joinPath(cacheDirPath, 'prs-all.json');
const cachedMergedPrsFilePath = joinPath(cacheDirPath, 'prs-merged.yml');
const perPage = 100;

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

async function countPrs(state, token) {
  if (state === 'all') {
    return countAllPrs(token);
  }

  if (state === 'merged') {
    return countMergedPrs();
  }
}

function countOpenTaskPrs() {
  const { prs } = readData(cachedAllPrsFilePath);
  const cacheFilePath = joinPath(repoRoot, 'scripts', 'prs.json');
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

  saveData(cacheFilePath, openPrMaps);
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

  saveData(joinPath(cacheDirPath, 'reviewers.yml'), { people: reviewers, sequence });
  saveData(joinPath(cacheDirPath, 'reviewers.md'), segments.join('\n'));
}

module.exports = {
  execute: (subCmd, ...args) => {
    if (subCmd === 'pr') {
      const state = args[0] || 'merged';
      const token = args[1] || process.env.GITHUB_TOKEN;

      return countPrs(state, token);
    }

    if (subCmd === 'task') {
      return countOpenTaskPrs();
    }

    if (subCmd === 'reviewer') {
      return countReviewers();
    }
  },
};
