import {
  Scene,
  Vector3,
  NullEngine,
  Mesh,
  VertexData,
  Ray,
  FreeCamera,
} from '@babylonjs/core'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const App = () => {
  const engine = new NullEngine()
  const scene = new Scene(engine)

  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene)
  camera.setTarget(Vector3.Zero())

  //

  console.log('ReadWoodJS - collisions', scene.collisionsEnabled)

  const vertices = [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0]
  const indices = [0, 1, 2, 0, 2, 3]
  const customMesh = new Mesh('bla')
  const vertexData = new VertexData()
  vertexData.positions = vertices
  vertexData.indices = indices
  vertexData.applyToMesh(customMesh)

  const testorigin = new Vector3(0.5, 0.5, 0.5)
  const testnormal = new Vector3(0, -1, 0)
  const ray = new Ray(testorigin, testnormal, 10000)
  const hit = ray.intersectsMesh(customMesh, false) // Check intersection
  console.log('TEST HIT', hit.hit)

  engine.runRenderLoop(() => {
    scene.render()
  })

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
