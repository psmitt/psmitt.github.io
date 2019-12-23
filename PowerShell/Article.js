document.addEventListener('DOMContentLoaded', function () {
  let folders = window.location.pathname.split('/')
  let locale = folders[folders.length - 2]
  let article = folders[folders.length - 1].split('.html')[0]

  let close = document.createElement('span')
  close.textContent = '🗵'
  close.className = 'close'
  close.addEventListener('click', function () {
    parent.document.getElementById('Article').style.display = 'none'
    parent.document.getElementById('Article').src = ''
  })
  document.body.querySelector('h1').prepend(close)

  let link = document.createElement('a')
  link.href = window.location.pathname.split(locale)[0] + `index.html?locale=${locale}&article=${article}`
  link.target = '_top'
  link.textContent = '🔝'
  link.className = 'toplink'
  link.title = 'A cikk saját címe'
  close.prepend(link)
})