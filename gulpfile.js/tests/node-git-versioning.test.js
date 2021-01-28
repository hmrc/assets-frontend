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

const test = require('tape')
const suiteName = require('./utils/suite')
const NodeGitVersion = require('../tasks/node-git-versioning')

const suite = suiteName(__filename)

test(`${suite} Doesn't throw an error`, (t) => {
  t.doesNotThrow(() => {
    NodeGitVersion()
  })
  t.end()
})

test(`${suite} Returns a version`, (t) => {
  const version = NodeGitVersion()
  const format = /([0-9]+\.?){3}-[0-9]+-g[a-zA-Z0-9]{7}/

  t.ok(format.test(version), 'version matches expected format')
  t.end()
})
