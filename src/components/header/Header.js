import {defaultTitle} from '../../constants'
import {ExcelComponent} from '../../core/ExcelComponent'
import {changeTitle} from '../../redux/actions'

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['title'],
      ...options,
    })
  }
  static className = 'excel__header'
  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
    <input type="text" class="input" value="${title}" />
    <div>
      <div class="button">
        <i class="material-icons">delete</i>
      </div>
      <div class="button">
        <i class="material-icons">exit_to_app</i>
      </div>
    </div>
    `
  }

  onInput(e) {
    this.$dispatch(changeTitle(e.target.value))
  }
}
