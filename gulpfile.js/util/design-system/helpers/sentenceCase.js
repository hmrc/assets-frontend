module.exports = function sentenceCase (text) {
  return text
    .split(/\.[ \-_]/)
    .map(function (sentence) {
      return sentence.charAt(0).toUpperCase() + sentence.substr(1).toLowerCase()
    })
    .join('.-')
    .split(/[ \-_]/)
    .join(' ')
}
