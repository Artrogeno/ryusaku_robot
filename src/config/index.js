import dotenv from 'dotenv'
import Orchestrator from './orchestrator'

dotenv.config({})

new Orchestrator().initialize().then((server) => {
  console.log(server);
})
