'use strict'

const chai = require('chai')
const {
  expect
} = chai

const getDuplicate = require('../../../lib/get-duplicate')

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
  it('Should duplicate an empty tree', (done) => {
    const srcTree = {}
    const cliProps = {}
    const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

    expect(newTree)
      .to.eql({ nodes: [] })

    expect(newTree)
      .not.to.eql(srcTree)

    done()
  })

  it('Should duplicate a tree with empty nodes', (done) => {
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
    const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

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

    done()
  })

  it('Should duplicate a tree', (done) => {
    const srcTree = require('../../fixtures/get-duplicate')
    const cliProps = {}
    const newTree = getDuplicate(srcTree, cliProps, NODE_FACTORY)

    expect(newTree)
      .to.eql(srcTree)

    done()
  })

  it('Should duplicate a tree without `nodeFactory`', (done) => {
    const srcTree = require('../../fixtures/get-duplicate')
    const cliProps = {}
    const newTree = getDuplicate(srcTree, cliProps)

    expect(newTree)
      .to.eql(srcTree)

    done()
  })

  it('Should duplicate a tree without `cliProps` and without `nodeFactory`', (done) => {
    const srcTree = require('../../fixtures/get-duplicate')
    const newTree = getDuplicate(srcTree)

    expect(newTree)
      .to.eql(srcTree)

    done()
  })

  describe('cliProps.tasksDepth', () => {
    describe('Duplicating a tree where the specified depth is a number', () => {
      it('Should duplicate a tree to depth 1 if the specified depth is 0', (done) => {
        const srcTree = require('../../fixtures/get-duplicate')
        const expectedTree = require('../../expected/get-duplicate/tree-depth-1')
        const cliProps = { tasksDepth: 0 }
        const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .not.to.eql(srcTree)

        done()
      })

      it('Should duplicate a tree to depth 1 if the specified depth is 1', (done) => {
        const srcTree = require('../../fixtures/get-duplicate')
        const expectedTree = require('../../expected/get-duplicate/tree-depth-1')
        const cliProps = { tasksDepth: 1 }
        const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .not.to.eql(srcTree)

        done()
      })

      it('Should duplicate a tree to depth 2 if the specified depth is 2', (done) => {
        const srcTree = require('../../fixtures/get-duplicate')
        const expectedTree = require('../../expected/get-duplicate/tree-depth-2')
        const cliProps = { tasksDepth: 2 }
        const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .not.to.eql(srcTree)

        done()
      })

      it('Should duplicate a tree to depth 3 if the specified depth is 3', (done) => {
        const srcTree = require('../../fixtures/get-duplicate')
        const expectedTree = require('../../expected/get-duplicate/tree-depth-3')
        const cliProps = { tasksDepth: 3 }
        const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .not.to.eql(srcTree)

        done()
      })

      it('Should duplicate a tree to depth 4 if the specified depth is 4', (done) => {
        const srcTree = require('../../fixtures/get-duplicate')
        const expectedTree = require('../../expected/get-duplicate/tree-depth-4')
        const cliProps = { tasksDepth: 4 }
        const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .to.eql(srcTree)

        done()
      })

      it('Should duplicate a tree if the specified depth is greater than its actual depth', (done) => {
        const srcTree = require('../../fixtures/get-duplicate')
        const expectedTree = require('../../expected/get-duplicate/tree-depth-4')
        const cliProps = { tasksDepth: 5 }
        const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .to.eql(srcTree)

        done()
      })

      it('Should duplicate a tree to depth 1 if the specified depth is less than 1', (done) => {
        const srcTree = require('../../fixtures/get-duplicate')
        const expectedTree = require('../../expected/get-duplicate/tree-depth-1')
        const cliProps = { tasksDepth: -1 }
        const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .not.to.eql(srcTree)

        done()
      })
    })

    describe('Duplicating a tree where the specified depth is not a number', () => {
      it('Should duplicate a tree if the specified depth is null', (done) => {
        const srcTree = require('../../fixtures/get-duplicate')
        const expectedTree = require('../../expected/get-duplicate/tree-depth-4')
        const cliProps = { tasksDepth: null }
        const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .to.eql(srcTree)

        done()
      })

      it('Should duplicate a tree if the specified depth is a string', (done) => {
        const srcTree = require('../../fixtures/get-duplicate')
        const expectedTree = require('../../expected/get-duplicate/tree-depth-4')
        const cliProps = { tasksDepth: 'A' }
        const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

        expect(newTree)
          .to.eql(expectedTree)

        expect(newTree)
          .to.eql(srcTree)

        done()
      })
    })
  })

  describe('cliProps.compactTasks', () => {
    it('Should duplicate nodes only where `.branch` is true in the node or its ancestors', (done) => {
      const srcTree = require('../../fixtures/get-duplicate')
      const expectedTree = require('../../expected/get-duplicate/tree-compact')
      const cliProps = { compactTasks: true }
      const newTree = getDuplicate(srcTree, cliProps) // , NODE_FACTORY)

      expect(newTree)
        .to.eql(expectedTree)

      expect(newTree)
        .not.to.eql(srcTree)

      done()
    })
  })
})
