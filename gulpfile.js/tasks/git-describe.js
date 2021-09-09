/*
 * Copyright 2017 HM Revenue & Customs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { execSync } = require('child_process')

const gitExec = (gitArgs, gitDir) => {
  const opts = gitDir ? { cwd: gitDir } : {}
  const cmd = ['git'].concat(gitArgs).join(' ')

  try {
    return execSync(cmd, opts).toString('utf-8').trim()
  } catch (error) {
    throw new Error(error)
  }
}

const getCommitCount = (gitDir) => {
  let gitArgs = [
    'rev-list',
    '--count',
    'main'
  ]

  return gitExec(gitArgs, gitDir)
}

const gitDescribe = (match, gitDir) => {
  let gitArgs = match
    ? ['describe', `--match "${match}"`, '--long', '--always']
    : ['describe', '--long', '--always']

  const commit = gitExec(gitArgs, gitDir)
  const format = new RegExp('([0-9]+.?){3}-[0-9]+-g[a-zA-Z0-9]{7}')

  if (!(format).test(commit)) {
    const commitCount = getCommitCount(gitDir)
    return `0.0.0-${commitCount}-g${commit}`
  }

  return commit
}

module.exports = gitDescribe
