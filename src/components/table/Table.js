import {ExcelComponent} from '../../core/ExcelComponent'
import {shouldResize} from './table.functions'
import {resizeHandler} from './table.resize'
import {createTable} from './table.template'

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
  }
  static className = 'excel__table'
  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}
