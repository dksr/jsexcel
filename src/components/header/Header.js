import {defaultTitle} from '../../constants'
import {ExcelComponent} from '../../core/ExcelComponent'
import {changeTitle} from '../../redux/actions'
import {ActiveRoute} from '../../core/routes/ActiveRoute'
import {$} from '@/core/dom'

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
      <div class="button" data-button="remove">
        <i class="material-icons" data-button="remove">delete</i>
      </div>
      <div class="button" data-button="exit">
        <i class="material-icons" data-button="exit">exit_to_app</i>
      </div>
    </div>
    `
  }

  onInput(e) {
    this.$dispatch(changeTitle(e.target.value))
  }

  onClick(e) {
    const type = $(e.target).data.button
    if (type === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if (type === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
