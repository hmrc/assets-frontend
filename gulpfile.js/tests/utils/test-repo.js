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

const path = require('path')
const rimraf = require('rimraf')
const { spawnSync } = require('child_process')
const { writeFileSync } = require('fs')

class TestRepo {
  constructor (dir) {
    this.dir = path.normalize(dir)
    this.file = path.join(this.dir, 'test')
  }

  execGit () {
    const git = spawnSync('git', [...arguments], {
      cwd: this.dir
    })

    return git
  }

  clean () {
    rimraf.sync(path.join(this.dir, '.git'))
    rimraf.sync(this.file)
  }

  init () {
    this.clean()
    this.execGit('init', '-b', 'main')
  }

  makeChange () {
    writeFileSync(this.file, 'test')
  }

  commit (message) {
    this.execGit('add', '.')
    this.execGit('commit', '--message', `"${message}"`)
  }

  tag (version) {
    this.execGit('tag', '-a', version, '-m', version)
  }
}

module.exports = TestRepo
