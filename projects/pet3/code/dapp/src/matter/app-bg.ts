/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Matter from 'matter-js'

export default function bgMatter() {
  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector

  // create engine
  const engine = Engine.create(),
    world = engine.world

  const stageWidth = window.innerWidth
  const stageHeight = window.innerHeight
  console.log('stageWidth', stageWidth)
  console.log('stageHeight', stageHeight)

  // create renderer
  const render = Render.create({
    element: document.getElementById('app-bg-wrapper'),
    engine: engine,
    options: {
      width: stageWidth,
      height: stageHeight,
      showAngleIndicator: true,
      showCollisions: true,
      showVelocity: true,
      wireframes: false,
      background: 'transparent',
    },
  })

  Render.run(render)

  // create runner
  const runner = Runner.create()
  Runner.run(runner, engine)

  // add bodies
  const group = Body.nextGroup(true)

  const stack = Composites.stack(
    250,
    255,
    1,
    6,
    0,
    0,
    function (x: any, y: any) {
      return Bodies.rectangle(x, y, 30, 30)
    }
  )

  const catapult = Bodies.rectangle(400, 820, 320, 20, {
    collisionFilter: { group: group },
  })

  Composite.add(world, [
    stack,
    catapult,
    Bodies.rectangle(400, 900, 800, 50.5, {
      isStatic: true,
      render: { fillStyle: '#000' },
    }),
    Bodies.rectangle(250, 855, 20, 50, {
      isStatic: true,
      render: { fillStyle: '#fff' },
    }),
    Bodies.rectangle(400, 835, 20, 80, {
      isStatic: true,
      collisionFilter: { group: group },
      render: { fillStyle: '#fff' },
    }),
    Bodies.circle(560, 100, 50, { density: 0.005 }),
    Constraint.create({
      bodyA: catapult,
      pointB: Vector.clone(catapult.position),
      stiffness: 1,
      length: 0,
    }),
  ])

  // add mouse control
  const mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    })

  Composite.add(world, mouseConstraint)

  // keep the mouse in sync with rendering
  render.mouse = mouse

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 },
  })

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
    },
  }
}
