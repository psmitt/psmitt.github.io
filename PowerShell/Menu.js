let Search = document.getElementById('Search')
let Menu = document.getElementById('Menu')
let Roots = []

function set(Tree, state) {
  let Branch = Tree.lastElementChild
  Tree.classList.remove('collapsed', 'expanded', 'filtered')
  Tree.classList.add(state)
  Branch.classList.remove('collapsed', 'expanded', 'filtered')
  Branch.classList.add(state)
  if (state == 'expanded')
    for (let each of Branch.children)
      each.style.display = 'block'
}

function search(Tree, input) { // input must be trimmed!
  let anyFound = false
  let Branch = Tree.lastElementChild
  if (Branch.firstElementChild) { // has branch
    let allFound = true
    for (let each of Branch.children) {
      let found = search(each, input)
      allFound = allFound && found
      anyFound = anyFound || found
    }
    if (allFound) {
      set(Tree, 'expanded')
    } else if (anyFound) {
      set(Tree, 'filtered')
    } else {
      set(Tree, 'collapsed')
    }
  }
  let RootSpan = Tree.firstElementChild.lastElementChild
  if (input) {
    let matchAll = new RegExp('(?=.*' + input.replace(/ /g, ')(?=.*') + ')', 'i')
    let matchAny = new RegExp('(' + input.replace(/ /g, '|') + ')', 'ig')
    let found = matchAll.test(Root.textContent)
    if (found) {
      RootSpan.innerHTML = RootSpan.textContent.replace(matchAny, '<mark>$1</mark>')
    } else {
      RootSpan.innerHTML = RootSpan.textContent
    }
    Tree.style.display = found || anyFound ? 'block' : 'none'
    return found || anyFound
  } else {
    RootSpan.innerHTML = RootSpan.textContent
    let result = anyFound || Tree.firstElementChild.classList.contains('clicked') ||
      Tree.parentNode == Menu // display top level menu
    Tree.style.display = result ? 'block' : 'none'
    return result
  }
}

// Expand|Collapse Menu Branch or Select Menu Item
function selectMenu(event) {
  let Root = event.target
  while (!Root.matches('div'))
    Root = Root.parentNode
  if (Root.matches('div.Root')) {
    let Tree = Root.parentNode
    if (Tree.lastElementChild.firstElementChild) { // has children
      if (Tree.classList.contains('expanded')) {
        set(Tree, 'collapsed')
      } else { // collapsed or filtered tree
        set(Tree, 'expanded')
      }
    } else {
      if (clicked = Menu.querySelector('div.Root.clicked'))
        clicked.classList.remove('clicked')
      Root.classList.add('clicked')
      Root.focus()
      if (Root.firstElementChild) {
        parent.document.getElementById('Article').style.display = ''
        Root.firstElementChild.click()
      }
    }
  }
}
Menu.addEventListener('mousedown', event => selectMenu(event))

function searchMenu() {
  let input = Search.value.trim()
  let found = false
  for (let Tree of Menu.children) {
    found = search(Tree, input) || found
  }
  Search.setCustomValidity(input && !found ? '0' : '')
}
Search.addEventListener('input', searchMenu)
Search.addEventListener('focus', searchMenu)


Menu.addEventListener('keydown', event => {
  let Root = event.target
  while (!Root.matches('div'))
    Root = Root.parentNode
  if (Root.matches('div.Root')) {
    let i = Root.tabIndex
    switch (event.code) {
      case 'Escape':
        Search.focus()
        break
      case 'Enter':
        selectMenu(event)
        break
      case 'ArrowUp':
        while (1 < --i) {
          if (Roots[i].offsetParent) { // Roots[i].isVisible
            Roots[i].focus()
            break
          }
        }
        break
      case 'ArrowDown':
        while (++i < Roots.length) {
          if (Roots[i].offsetParent) { // Roots[i].isVisible
            Roots[i].focus()
            break
          }
        }
        break
      case 'ArrowLeft':
        if (Root.classList.contains('branching'))
          set(Root.parentNode, 'collapsed')
        break
      case 'ArrowRight':
        if (Root.classList.contains('branching'))
          set(Root.parentNode, 'expanded')
        break
    }
  }
})

document.addEventListener('DOMContentLoaded', function () {
  let tab = 1
  Search.tabIndex = tab++
  Menu.querySelectorAll('div.Tree').forEach(Tree => {
    let Root = Tree.firstElementChild
    Roots[Root.tabIndex = tab++] = Root
    if (Tree.lastElementChild.firstElementChild) // has children
      Root.classList.add('branching')
    if (Root.firstElementChild.getAttribute('href') ==
      location.search.substring(1) + '.html')
      Root.classList.add('clicked')
  })
  searchMenu()
})