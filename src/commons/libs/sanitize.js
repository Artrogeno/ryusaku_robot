import _ from 'util'
import sbd from 'sbd'

class Sanitize {
  removeBlankLinesAndMarkdown(text) {
    let lines = JSON.stringify(text).split('\\n')
    let withoutBlankLinesAndMarkdown = lines.filter(line => {
      return line.trim().length === 0 || line.trim().startsWith('=') ? false : true
    }).join(' ')
    return withoutBlankLinesAndMarkdown
  }

  removeDatesInParentheses(text) {
    return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
  }

  sentenceBoundaryDetection(text) {
    return sbd.sentences(text)
  }
}

export default new Sanitize()
