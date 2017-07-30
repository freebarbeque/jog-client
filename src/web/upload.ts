import * as $ from 'jquery'

export function getFile() {
  return new Promise(resolve => {
    const fileInput = $('<input type="file" />')
    const fn = function() {
      const file = this.files[0]
      fileInput.off('change', fn)
      fileInput.remove()
      resolve(file)
    }
    fileInput.on('change', fn)
    fileInput.trigger('click')
  })
}
