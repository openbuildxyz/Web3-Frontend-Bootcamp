import * as Matter from 'matter-js'
import generateBox from './box'

export function Pet() {
  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies

  // create engine
  const engine = Engine.create({
      enableSleeping: true,
    }),
    world = engine.world
  const stageWidth = window.innerWidth
  const stageHeight = window.innerHeight

  // create renderer
  const render = Render.create({
    element: document.getElementById('pet3-wrapper'),
    engine: engine,
    options: {
      width: stageWidth,
      height: stageHeight,
      showAngleIndicator: true,
      wireframes: false,
      background: 'transparent',
    },
  })

  Render.run(render)

  // create runner
  const runner = Runner.create()
  Runner.run(runner, engine)

  // define body
  const bodyBody = Bodies.rectangle(60, 60, 60, 80)

  // add head
  const bodyHead = Bodies.circle(60, 60, 25)

  const constraint = Constraint.create({
    bodyA: bodyBody,
    pointA: { x: 0, y: 30 },
    bodyB: bodyHead,
    pointB: { x: 0, y: 0 },
    damping: 1,
    length: 40,
    render: {
      visible: false,
    },
  })
  Composite.add(world, [bodyBody, bodyHead, constraint])

  // add eyes
  const bodyEyeLeft = Bodies.circle(60, 60, 5)
  const constraintEyeLeft = Constraint.create({
    bodyA: bodyHead,
    pointA: { x: 0, y: 10 },
    bodyB: bodyEyeLeft,
    pointB: { x: 0, y: 0 },
    damping: 1,
    length: 40,
    render: {
      visible: false,
    },
  })
  const bodyEyeRight = Bodies.circle(60, 60, 5)
  const constraintEyeRight = Constraint.create({
    bodyA: bodyHead,
    pointA: { x: 0, y: -10 },
    bodyB: bodyEyeRight,
    pointB: { x: 0, y: 0 },
    damping: 1,
    length: 40,
    render: {
      visible: false,
    },
  })
  Composite.add(world, [
    bodyEyeRight,
    bodyEyeLeft,
    constraintEyeRight,
    constraintEyeLeft,
  ])

  // add leg
  const bodyLegLeft = Bodies.rectangle(160, 160, 20, 50)
  const constraintLegLeft = Constraint.create({
    bodyA: bodyBody,
    pointA: { x: -20, y: -30 },
    bodyB: bodyLegLeft,
    pointB: { x: 0, y: -25 },
    stiffness: 0.01,
    damping: 1,
    length: 40,
    // render: {
    //   visible: false,
    // },
  })
  const bodyLegRight = Bodies.rectangle(160, 160, 20, 50)
  const constraintLegRight = Constraint.create({
    bodyA: bodyBody,
    pointA: { x: 20, y: -30 },
    bodyB: bodyLegRight,
    pointB: { x: 0, y: -25 },
    stiffness: 0.01,
    damping: 1,
    length: 40,
    // render: {
    //   visible: false,
    // },
  })
  Composite.add(world, [
    bodyLegRight,
    bodyLegLeft,
    constraintLegRight,
    constraintLegLeft,
  ])

  // add arm
  const bodyArmLeft = Bodies.rectangle(160, 160, 20, 50)
  const constraintArmLeft = Constraint.create({
    bodyA: bodyBody,
    pointA: { x: -20, y: 30 },
    bodyB: bodyArmLeft,
    pointB: { x: 0, y: -25 },
    stiffness: 0.01,
    damping: 1,
    length: 40,
    // render: {
    //   visible: false,
    // },
  })
  const bodyArmRight = Bodies.rectangle(160, 160, 20, 50)
  const constraintArmRight = Constraint.create({
    bodyA: bodyBody,
    pointA: { x: 20, y: 30 },
    bodyB: bodyArmRight,
    pointB: { x: 0, y: -25 },
    stiffness: 0.01,
    damping: 1,
    length: 40,
    // render: {
    //   visible: false,
    // },
  })
  Composite.add(world, [
    bodyArmRight,
    bodyArmLeft,
    constraintArmRight,
    constraintArmLeft,
  ])

  Composite.add(world, [
    // walls
    Bodies.rectangle(stageWidth / 2, -51, stageWidth, 100, { isStatic: true }),
    Bodies.rectangle(stageWidth / 2, stageHeight + 51, stageWidth, 100, {
      isStatic: true,
    }),
    Bodies.rectangle(stageWidth + 51, stageHeight / 2, 100, stageHeight, {
      isStatic: true,
    }),
    Bodies.rectangle(-51, stageHeight / 2, 100, stageHeight, {
      isStatic: true,
    }),
  ])

  // add mouse control
  const mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        // allow bodies on mouse to rotate
        angularStiffness: 0,
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
    max: { x: stageWidth, y: stageHeight },
  })

  const handler = document.getElementById('pet3-handler')!
  let draging = false

  handler.addEventListener('mousedown', (e) => {
    e.preventDefault()
    draging = true
  })
  document.body.addEventListener('mousemove', (e) => {
    if (draging) {
      Matter.Body.setPosition(bodyBody, { x: e.x, y: e.y }, true)
    }
  })

  document.body.addEventListener('mouseup', () => {
    draging = false
  })
  function step() {
    handler.style.setProperty('--pet3-rotate', bodyBody.angle + 'rad')

    handler.style.setProperty(
      '--pet3-handler-x',
      bodyBody.position.x - 30 + 'px'
    )
    handler.style.setProperty(
      '--pet3-handler-y',
      bodyBody.position.y - 40 + 'px'
    )
    window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)

  generateBox(stageWidth, stageHeight, engine, world, bodyHead)

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
