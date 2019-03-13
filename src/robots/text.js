import { Algorithmia, Sanitize } from './../commons'

class Text {
  constructor(content) {
    this.content = content
    return this.initialize()
  }

  _sanitizeContent(content) {
    const withoutBlankLinesAndMarkdown = Sanitize.removeBlankLinesAndMarkdown(content.sourceContentOriginal)
    const withoutDatesInParentheses = Sanitize.removeDatesInParentheses(withoutBlankLinesAndMarkdown)
    content.sourceContentSanitized = withoutDatesInParentheses
    return content
  }

  async _fetchContentFromWikipedia(content) {
    const algorithmia = new Algorithmia
    content.sourceContentOriginal = await algorithmia.wikipedia(content.searchTerm)
    return content
  }

  _breakContentIntoSentences(content) {
    content.sentences = []
    let sentences = Sanitize.sentenceBoundaryDetection(content.sourceContentSanitized)
    sentences.forEach(sentence => {
      content.sentences.push({
        text: sentence,
        keywords: [],
        images: []
      })
    })
    return content
  }

  async initialize() {
    let content = this.content
    content = await this._fetchContentFromWikipedia(content)
    content = this._sanitizeContent(content)
    content = this._breakContentIntoSentences(content)
    return content
  }
} 

export default Text
