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

const isVersionedTag = (tag) => {
  return tag.charAt(0) === 'v'
}

const isGroupedTag = (tag) => {
  return tag.indexOf('/') !== -1
}

const strip = {
  v: (tag) => {
    return tag.slice(1)
  },

  group: (tag) => {
    return tag.split('/').pop()
  }
}

const correctSha = (tag) => {
  let tagParts = tag.split('-')

  if (tagParts[1] === '0') {
    tagParts[2] = 'g0000000'
  }

  return tagParts.join('-')
}

const formatVersion = (tag) => {
  if (tag && isGroupedTag(tag)) {
    tag = strip.group(correctSha(tag))
  }

  if (tag && isVersionedTag(tag)) {
    tag = strip.v(correctSha(tag))
  }

  if ((/([0-9]+\.?){3}-[0-9]+-g[a-zA-Z0-9]{7}/).test(tag)) {
    return tag
  }

  throw new Error('You must specify a correctly formatted tag to create a release candidate from.')
}

module.exports = formatVersion
