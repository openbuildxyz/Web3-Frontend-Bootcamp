import path from 'node:path'
import fs from 'node:fs'
import { loadEnv } from 'vite'

const ENV = { ...loadEnv('development', process.cwd()) }

const sourcePath1 = path.resolve(__dirname, '../packages/package.json') // 修改为实际的第一个源文件路径
const destinationPath1 = path.resolve(__dirname, '../output-lib/package.json') // 修改为实际的第一个目标文件路径

const sourcePath2 = path.resolve(__dirname, '../README.md') // 修改为实际的第二个源文件路径
const destinationPath2 = path.resolve(__dirname, '../output-lib/README.md') // 修改为实际的第二个目标文件路径

function copy(sourcePath: string, targetPath: string) {
  if (!fs.existsSync(sourcePath)) {
    console.error(`Source file ${sourcePath} does not exist.`)
    process.exit(1)
  }

  // 读取源文件内容
  fs.readFile(sourcePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading source file: ${err}`)
      process.exit(1)
    }

    // 替换包名和仓库地址
    data = data.replace(/pkg_name/g, ENV.VITE_PKG_NAME)
    data = data.replace(/pkg_homepage/g, ENV.VITE_PKG_HOMEPAGE)
    data = data.replace(/pkg_repository_url/g, ENV.VITE_PKG_REPOSITORY_URL)

    // 写入目标文件
    fs.writeFile(targetPath, data, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing destination file: ${err}`)
        process.exit(1)
      }
    })
  })
}

copy(sourcePath1, destinationPath1)

copy(sourcePath2, destinationPath2)
