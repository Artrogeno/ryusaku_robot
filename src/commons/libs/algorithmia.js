import algorithmia from 'algorithmia'
import { env } from 'process'

export class Algorithmia {
  constructor() {
    console.log(env.API_KEY_ALGORITHMIA)
    this.algorithmia = algorithmia(env.API_KEY_ALGORITHMIA)
  }

  async wikipedia(searchTerm) {
    let wikipediaAlgorithima = this.algorithmia.algo('web/WikipediaParser/0.1.2')
    let wikipediaResponse = await wikipediaAlgorithima.pipe(searchTerm)
    let wikipediaContent = wikipediaResponse.get()
    return wikipediaContent
  }
}
