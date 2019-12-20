var doc = document;

function toggle(menu) {
	menu.style.display = menu.style.display != 'inline-block' ? 'inline-block' : 'none';
} 

function apply(theme) {
	doc.getElementById('theme').href = theme + '.css';
}

function setFolding(folding) {
  var tri = doc.querySelectorAll('.triangle');
  var div = doc.querySelectorAll('.chapter, .story');
  switch (folding) {
    case 'none':
      for (i = 0; i < tri.length; i++) {
        tri[i].style.display = 'none';
        tri[i].innerHTML = '&#9660; '; // ▼
        tri[i].parentNode.style['margin-left'] = '-5px';
      }
      for (i = 0; i < div.length; i++) {
        div[i].style.display = 'block';
        div[i].style.margin = '0';
      }
      break;
    case 'flat':
      for (i = 0; i < tri.length; i++) {
        tri[i].style.display = 'inline-block';
        tri[i].parentNode.style['margin-left'] = '-40px';
      }
      for (i = 0; i < div.length; i++)
        div[i].style.margin = '0';
      break;
    case 'indent':
      for (i = 0; i < tri.length; i++) {
        tri[i].style.display = 'inline-block';
        tri[i].parentNode.style['margin-left'] = '-40px';
      }
      for (i = 0; i < div.length; i++)
        if (div[i].className == 'chapter')
          div[i].style['margin-left'] = '30px';
        else // story
          div[i].style['margin-left'] = '-30px';
      break;
  }
}

function showStory(chapter) {
	chapter.previousSibling.firstChild.innerHTML = '&#9660; '; // ▼
	chapter.firstChild.style.display = 'block';
}

function hideStory(chapter) {
	chapter.previousSibling.firstChild.innerHTML = '&#9698; '; // ◢⏵
	chapter.firstChild.style.display = 'none';
}

function closeChapter(chapter) {
	chapter.previousSibling.firstChild.innerHTML = '&#9654; '; // ▶⏵
	chapter.style.display = 'none';
}

function openChapter(chapter) {
	if (chapter.firstChild.style.display != 'none')
		chapter.previousSibling.firstChild.innerHTML = '&#9660; '; // ▼
	else
		chapter.previousSibling.firstChild.innerHTML = '&#9698; '; // ◢⏵
	chapter.style.display = 'block';
}

function toggleChapter(triangle) {
  var chapter = triangle.parentNode.nextSibling;
  switch (triangle.textContent.charCodeAt(0)) {
		case 9698: // ◢⏵
			showStory(chapter);
			break;
		case 9654: // ▶⏵
			openChapter(chapter);
			break;
		case 9660: // ▼
		default:
		  closeChapter(chapter);
			break;
  }
}

function toggleStructure(triangle) {
  var chapter = triangle.parentNode.nextSibling;
  var subs = chapter.querySelectorAll('.chapter');
  switch (triangle.textContent.charCodeAt(0)) {
		case 9698: // ◢⏵
		  var allClosed = true;
			var chls = chapter.children;
			for (i = 0; i < chls.length; i++) {
				if (chls[i].className == 'chapter'
				 && chls[i].style.display != 'none') {
					allClosed = false;
					closeChapter(chls[i]);
				}
			}
			if (allClosed)
				closeChapter(chapter);
			break;
		case 9654: // ▶⏵
			for (i = 0; i < subs.length; i++) {
				hideStory(subs[i]);
				openChapter(subs[i]);
			}
			hideStory(chapter);
			openChapter(chapter);
			break;
		case 9660: // ▼
		default:
			for (i = 0; i < subs.length; i++)
				hideStory(subs[i]);
			hideStory(chapter);
			break;
  }
	return false;
}

(function () {
  var factory = doc.createElement('div');
  factory.innerHTML =
		'<span class="triangle" onclick="toggleChapter(this)" oncontextmenu="return toggleStructure(this)">&#9660; </span>';
  var tri = factory.firstChild;

  var ch = doc.createElement('div');
  ch.className = 'chapter';

	var h = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
	for (i = 0; i < h.length; i++) {
		h[i].insertBefore(tri.cloneNode(true), h[i].firstChild);
		var wch = ch.cloneNode(true);
		while (h[i].nextSibling
		   && (h[i].nextSibling.nodeName != h[i].nodeName)
		   && (h[i].nextSibling.nodeName != 'SCRIPT')) {
		   wch.appendChild(h[i].nextSibling);
		}
		if (h[i].nextSibling)
			h[i].parentNode.insertBefore(wch, h[i].nextSibling);
		else
			h[i].parentNode.appendChild(wch);
	}

  var st = doc.createElement('div');
  st.className = 'story';

	var c = doc.querySelectorAll('.chapter');
	for (i = 0; i < c.length; i++) {
		var wst = st.cloneNode(true);
		while (c[i].firstChild
		   && (!/^H\d$/g.test(c[i].firstChild.nodeName))) {
		   wst.appendChild(c[i].firstChild);
		}
		if (c[i].firstChild)
			c[i].insertBefore(wst, c[i].firstChild);
		else
			c[i].appendChild(wst);
	}
}).call()
