import {Excel} from './components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/Toolbar/toolbar'
import {Formula} from '@/components/Formula/formula'
import {Table} from '@/components/Table/table'
import './scss/index.scss'

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
})

excel.render()
