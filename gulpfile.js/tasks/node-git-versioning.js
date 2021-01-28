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

// Imported with tests from https://www.github.com/hmrc/node-git-versioning (now deprecated)
const formatVersion = require('./format-version')
const gitDescribe = require('./git-describe')

const NodeGitVersion = (gitDir) => {
  const commit = gitDescribe(gitDir)
  const version = formatVersion(commit)
  return version
}

module.exports = NodeGitVersion
