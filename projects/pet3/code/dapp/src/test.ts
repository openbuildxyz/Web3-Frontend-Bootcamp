import * as Matter from 'matter-js'
import * as MatterDom from 'matter-dom-plugin'

export function Pet() {
  var a = Matter.use(MatterDom.MatterDomPlugin)

  /** Aliases **/
  var Engine = Matter.Engine
  var Runner = Matter.Runner
  var RenderDom = Matter.default.RenderDom
  var DomBodies = Matter.default.DomBodies
  var MouseConstraint = Matter.MouseConstraint
  var DomMouseConstraint = Matter.default.DomMouseConstraint
  var Mouse = Matter.Mouse
  var World = Matter.World

  /** Set up engine and renderer **/
  var engine = Engine.create()
  var world = engine.world
  var runner = Runner.create()
  Runner.run(runner, engine)

  var render = RenderDom.create({
    engine: engine,
  })
  RenderDom.run(render)

  /** Initialize physics bodies **/
  var block = DomBodies.block(100, 100, {
    Dom: {
      render: render,
      element: document.querySelector('#block'),
    },
  })
  World.add(world, block)

  /** Mouse control **/
  var mouse = Mouse.create(document.body)
  var MouseConstraint = DomMouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.1,
      render: {
        visible: false,
      },
    },
  })

  World.add(world, MouseConstraint)
}
