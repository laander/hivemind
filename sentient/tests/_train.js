/**
 * Train data
 */

export default [
  {
    input: [0, 0, 0, 0],
    output: [1, 0, 0, 0]
  },
  {
    input: [99, 0, 0, 0],
    output: [1, 0, 0, 0]
  },
  {
    input: [0, 99, 0, 0],
    output: [0, 1, 0, 0]
  },
  {
    input: [0, 0, 99, 0],
    output: [0, 0, 1, 0]
  },
  {
    input: [0, 0, 0, 99],
    output: [0, 0, 0, 1]
  }
]
