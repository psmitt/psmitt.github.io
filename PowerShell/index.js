document.addEventListener('DOMContentLoaded', function () {
  let parameters = location.search.substring(1).split('&')
    .map(parameter => parameter.split('='))
    .reduce((obj, [key, value]) => ({ ...obj,
      [key]: value
    }), {})

  let locale = parameters.locale || 'hu-HU'
  let article = parameters.article || 'About_PowerShell'

  document.getElementById('Menu').src = locale + '/Menu.xml?' + article
  document.getElementById('Article').src = locale + '/' + article + '.html'
})