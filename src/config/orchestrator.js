import readline from 'readline-sync'
import robots from '../robots'

export default class Orchestrator {
  constructor() {
    this.readline = readline
    this.content = {}
    this.robots = robots
  }

  _askAndReturnSearchTerm() {
    return this.readline.question('Type a Wikipedia search term: ')
  }

  _askAndReturnPrefix() {
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectedPrefixIndex = this.readline.keyInSelect(prefixes, 'Choose one option: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }
  
  async initialize() {
    this.content.searchTerm = this._askAndReturnSearchTerm()
    this.content.prefix = this._askAndReturnPrefix()

    await new this.robots.text(this.content)

    return this.content
  }
}
