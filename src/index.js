import {Excel} from './components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/Toolbar/toolbar'
import {Formula} from '@/components/Formula/formula'
import {Table} from '@/components/Table/table'
import './scss/index.scss'
import {createStore} from './core/createStore'
import {rootReducer} from './redux/rootReducer'
import {storage, debounce} from './core/utils'
import {initialState} from './redux/initialState'

const store = createStore(rootReducer, initialState)

const stateListener = debounce((state) => {
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
