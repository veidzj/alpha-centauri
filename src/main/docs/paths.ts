import { healthCheckPaths } from './paths/health'
import { examplePaths } from './paths/example'

export default {
  '/v1/health-check': healthCheckPaths.healthCheckPath,
  '/v1/example': examplePaths.addExamplePath
}
