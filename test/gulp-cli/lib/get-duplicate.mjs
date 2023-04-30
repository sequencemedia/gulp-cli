import {
  readFile
} from 'node:fs/promises'

import {
  expect
} from 'chai'

import getDuplicate from '#gulp-cli/lib/get-duplicate'

async function getFixture (filePath) {
  const fileData = await readFile(filePath)
  return JSON.parse(fileData.toString())
}

const NODE_FACTORY = {
  topNode (node) {
    return Object.fromEntries(Object.entries(node))
  },
  taskNode (node) {
    return Object.fromEntries(Object.entries(node))
  },
  childNode (node) {
    return Object.fromEntries(Object.entries(node))
  }
}

describe('./lib/get-duplicate', () => {
  it('duplicates an empty tree', () => {
    const srcTree = {}
    const cliProps = {}
    const newTree = getDuplicate(srcTree, cliProps)

    expect(newTree)
      .to.eql({ nodes: [] })

    expect(newTree)
      .not.to.eql(srcTree)
  })

  it('duplicates a tree with empty nodes', () => {
    const srcTree = {
      nodes: [
        {},
        { nodes: [] },
        {
          nodes: [
            {},
            {}
          ]
        }
      ]
    }
    const cliProps = {}
    const newTree = getDuplicate(srcTree, cliProps)

    expect(newTree)
      .to.eql({
        nodes: [
          { nodes: [] },
          { nodes: [] },
          {
            nodes: [
              { nodes: [] },
              { nodes: [] }
            ]
          }
        ]
      })

    expect(newTree)
      .not.to.eql(srcTree)
  })

  it('duplicates a tree', async () => {
    const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
    const cliProps = {}
    const newTree = getDuplicate(srcTree, cliProps, NODE_FACTORY)

    expect(newTree)
      .to.eql(srcTree)
  })

  it('duplicates a tree without `nodeFactory`', async () => {
    const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
    const cliProps = {}
    const newTree = getDuplicate(srcTree, cliProps)

    expect(newTree)
      .to.eql(srcTree)
  })

  it('duplicates a tree without `cliProps` and without `nodeFactory`', async () => {
    const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
    const newTree = getDuplicate(srcTree)

    expect(newTree)
      .to.eql(srcTree)
  })

  describe('`cliProps.tasksDepth`', () => {
    describe('Duplicating a tree where the specified depth is a number', () => {
      it('duplicates a tree to depth 1 if the specified depth is 0', async () => {
        const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
        const expectedTree = await getFixture('./test/expected/get-duplicate/tree-depth-1.json')
        const cliProps = { tasksDepth: 0 }
        const newTree = getDuplicate(srcTree, cliProps)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .not.to.eql(srcTree)
      })

      it('duplicates a tree to depth 1 if the specified depth is 1', async () => {
        const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
        const expectedTree = await getFixture('./test/expected/get-duplicate/tree-depth-1.json')
        const cliProps = { tasksDepth: 1 }
        const newTree = getDuplicate(srcTree, cliProps)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .not.to.eql(srcTree)
      })

      it('duplicates a tree to depth 2 if the specified depth is 2', async () => {
        const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
        const expectedTree = await getFixture('./test/expected/get-duplicate/tree-depth-2.json')
        const cliProps = { tasksDepth: 2 }
        const newTree = getDuplicate(srcTree, cliProps)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .not.to.eql(srcTree)
      })

      it('duplicates a tree to depth 3 if the specified depth is 3', async () => {
        const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
        const expectedTree = await getFixture('./test/expected/get-duplicate/tree-depth-3.json')
        const cliProps = { tasksDepth: 3 }
        const newTree = getDuplicate(srcTree, cliProps)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .not.to.eql(srcTree)
      })

      it('duplicates a tree to depth 4 if the specified depth is 4', async () => {
        const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
        const expectedTree = await getFixture('./test/expected/get-duplicate/tree-depth-4.json')
        const cliProps = { tasksDepth: 4 }
        const newTree = getDuplicate(srcTree, cliProps)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .to.eql(srcTree)
      })

      it('duplicates a tree if the specified depth is greater than its actual depth', async () => {
        const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
        const expectedTree = await getFixture('./test/expected/get-duplicate/tree-depth-4.json')
        const cliProps = { tasksDepth: 5 }
        const newTree = getDuplicate(srcTree, cliProps)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .to.eql(srcTree)
      })

      it('duplicates a tree to depth 1 if the specified depth is less than 1', async () => {
        const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
        const expectedTree = await getFixture('./test/expected/get-duplicate/tree-depth-1.json')
        const cliProps = { tasksDepth: -1 }
        const newTree = getDuplicate(srcTree, cliProps)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .not.to.eql(srcTree)
      })
    })

    describe('Duplicating a tree where the specified depth is not a number', () => {
      it('duplicates a tree if the specified depth is null', async () => {
        const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
        const expectedTree = await getFixture('./test/expected/get-duplicate/tree-depth-4.json')
        const cliProps = { tasksDepth: null }
        const newTree = getDuplicate(srcTree, cliProps)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .to.eql(srcTree)
      })

      it('duplicates a tree if the specified depth is a string', async () => {
        const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
        const expectedTree = await getFixture('./test/expected/get-duplicate/tree-depth-4.json')
        const cliProps = { tasksDepth: 'A' }
        const newTree = getDuplicate(srcTree, cliProps)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .to.eql(srcTree)
      })
    })
  })

  describe('`cliProps.compactTasks`', () => {
    it('duplicates nodes only where `.branch` is true in the node or its ancestors', async () => {
      const srcTree = await getFixture('./test/fixtures/get-duplicate.json')
      const expectedTree = await getFixture('./test/expected/get-duplicate/tree-compact.json')
      const cliProps = { compactTasks: true }
      const newTree = getDuplicate(srcTree, cliProps)

      expect(newTree)
        .to.eql(expectedTree)

      expect(newTree)
        .not.to.eql(srcTree)
    })
  })
})
