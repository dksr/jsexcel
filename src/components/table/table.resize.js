import {$} from '@/core/dom'

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')

    const coords = $parent.getCoords()

    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'

    let value

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    })

    document.onmousemove = (e) => {
      if (type == 'col') {
        const delta = e.clientX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.clientY - coords.bottom
        console.log(e)
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (type == 'col') {
        const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

        cells.forEach((el) =>
          $(el).css({
            width: value + 'px',
          })
        )
      } else {
        $parent.css({
          height: value + 'px',
        })
      }

      resolve({
        value,
        id: type === 'col' ? $parent.data.col : $parent.data.row,
        type,
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      })
    }
  })
}
