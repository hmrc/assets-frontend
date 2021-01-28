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
const test = require('tape')
const { spawnSync } = require('child_process')
const suiteName = require('./utils/suite')
const TestRepo = require('./utils/test-repo')
const gitDescribe = require('../tasks/git-describe')

const suite = suiteName(__filename)

const repoDir = path.join(__dirname, 'test-repo')
const repo = new TestRepo(repoDir)

test(`${suite} Fail if the given path is not a git repo`, (t) => {
  const fsRoot = __dirname.substring(0, __dirname.indexOf(path.sep) + 1)

  t.throws(function () {
    gitDescribe(undefined, fsRoot)
  }, new RegExp(/not a git repository/))

  t.end()
})

test(`${suite} Return the sha of the parent repo if not given a path`, (t) => {
  const parentSha = spawnSync('git', ['describe', '--long', '--always'])
  const sha = gitDescribe()

  t.ok(sha.includes(parentSha.stdout.toString('utf-8').trim()))
  t.end()
})

test(`${suite} Prepend 0.0.0 and the commit count if the repo has no tags`, (t) => {
  repo.init()
  repo.commit('Initial commit')

  const sha = gitDescribe(undefined, repoDir)
  t.ok(sha.includes('0.0.0-1-g'))

  repo.clean()
  t.end()
})

test(`${suite} Return the tag and commit count for a tagged repo`, (t) => {
  repo.init()
  repo.commit('Initial commit')
  repo.tag('1.0.0')

  const sha1 = gitDescribe(undefined, repoDir)
  t.ok(sha1.includes('1.0.0-0-g'), 'Tagged as 1.0.0')

  repo.makeChange()
  repo.commit('Another commit')

  const sha2 = gitDescribe(undefined, repoDir)
  t.ok(sha2.includes('1.0.0-1-g'), 'Commit count reflects change')

  repo.tag('1.1.0')

  const sha3 = gitDescribe(undefined, repoDir)
  t.ok(sha3.includes('1.1.0-0-g'), 'Tagged as 1.1.0')

  repo.clean()
  t.end()
})

test(`${suite} Return the tag and commit count for a given regex`, (t) => {
  repo.init()
  repo.commit('Initial commit')
  repo.tag('1.0.0')
  repo.tag('2.0.0')

  const sha1 = gitDescribe('1.*', repoDir)
  t.ok(sha1.includes('1.0.0-0-g'), 'Tagged as 1.0.0')

  const sha2 = gitDescribe('2.*', repoDir)
  t.ok(sha2.includes('2.0.0-0-g'), 'Tagged as 2.0.0')

  repo.clean()
  t.end()
})
