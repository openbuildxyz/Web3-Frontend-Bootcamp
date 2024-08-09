import { promises as fs } from 'node:fs'
import axios from 'axios'

const myOwner = 'pinky-pig'
const myRepo = 'use'
const mySettingsPath = 'vscode-settings/.vscode'
const mySnippetsPath = 'vscode-settings/snippets'
const _localPath = '.vscode'

fetchVscSettings(mySettingsPath)
fetchVscSnippets(mySnippetsPath)

async function fetchVscSettings(
  path,
  owner = myOwner,
  repo = myRepo,
  localPath = _localPath,
) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  const { data: files } = await axios.get(url)

  await Promise.all(
    files.map(async (file) => {
      if (file.type === 'file') {
        const { data } = await axios.get(file.download_url, {
          responseType: 'arraybuffer',
        })
        await fs.writeFile(`${localPath}/${file.name}`, data, 'utf-8')
      }
    }),
  )
}

async function fetchVscSnippets(
  path,
  owner = myOwner,
  repo = myRepo,
  localPath = _localPath,
) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  const { data: files } = await axios.get(url)

  await Promise.all(
    files.map(async (file) => {
      if (file.type === 'file') {
        const { data } = await axios.get(file.download_url, {
          responseType: 'arraybuffer',
        })
        await fs.writeFile(
          `${localPath}/${file.name.replace(/\.json$/, '.code-snippets')}`,
          data,
          'utf-8',
        )
      }
    }),
  )
}
