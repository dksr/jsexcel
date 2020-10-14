import {defaultStyles} from '../../constants'
import {parse} from '../../core/parse'
import {toInlineStyles} from '../../core/utils'

const CODES = {
  A: 65,
  Z: 90,
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  if (!state) return false
  return state[index] || DEFAULT_WIDTH
}

function getHeight(state, index) {
  if (!state) return false
  return state[index] || DEFAULT_HEIGHT
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})

    return `
      <div class="cell" contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width:${getWidth(state.colState, col)}px"
        >${parse(data) || ''}
      </div>
      `
  }
}

function toColumn({col, index, width = DEFAULT_WIDTH}) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}px;">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index = '', content, height = DEFAULT_HEIGHT) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''

  return `
    <div class="row" data-type="resizable" data-row="${index - 1}" style="height: ${height}px;">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}        
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    }
  }
}

export function createTable(rowsCount = 50, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(toCell(state, row)).join('')
    rows.push(createRow(row + 1, cells, getHeight(state.rowState, row)))
  }

  return rows.join('')
}
