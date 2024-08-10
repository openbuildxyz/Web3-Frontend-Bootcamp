/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Matter from 'matter-js'

export default function generateBox(
  stageWidth: number,
  stageHeight: number,
  engine: Matter.Engine,
  world: Matter.World,
  bodyHead: any
) {
  let collisionTimes = 0
  const WinCounts = 3
  const Composite = Matter.Composite
  const Bodies = Matter.Bodies
  const Events = Matter.Events
  const boxWidth = 80
  const boxHeight = 80
  const x = getRandomInt(0, stageWidth - boxWidth)
  const y = getRandomInt(0, stageHeight - boxHeight)

  // init lucky box
  const bodyBox = Bodies.rectangle(x, y, boxWidth, boxHeight, {
    isStatic: true,
    render: {
      fillStyle: 'transparent',
    },
  })
  Composite.add(world, [bodyBox])
  Events.on(engine, 'collisionStart', onCollisionStart)

  function onCollisionStart(e: any) {
    const pairs = e.pairs
    if (
      pairs.findIndex(
        (pair: any) =>
          (pair.bodyA === bodyBox && pair.bodyB === bodyHead) ||
          (pair.bodyB === bodyBox && pair.bodyA === bodyHead)
      ) !== -1
    ) {
      console.log('collision')
      collisionTimes++
      if (collisionTimes > WinCounts) {
        // Composite.remove(world, bodyBox)
        bodyBox.render.fillStyle = '#c12c1f'
        collisionTimes = 0
        Events.off(engine, 'collisionStart', onCollisionStart)
        chrome.storage.local.set({ score: getRandomInt(1, 10) })
        setTimeout(() => {
          Composite.remove(world, bodyBox)
        }, 2000)

        // regenerate box after 200s
        setTimeout(() => {
          bodyBox.render.fillStyle = 'transparent'
          bodyBox.position.x = getRandomInt(0, stageWidth - boxWidth)
          bodyBox.position.y = getRandomInt(0, stageHeight - boxHeight)
          Composite.add(world, [bodyBox])
          Events.on(engine, 'collisionStart', onCollisionStart)
        }, 200000)
      }
    }
  }
}

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}
