function* registerNode() {
  let counter = 1

  while (true) {
    let elem = yield 
    if (elem && elem.textContent.trim()) {
      yield {
        id: counter++,
        text: elem.textContent,
        elem
      }
    }
  }
}

const gen = registerNode()

const searchChildNodesForText = (elem, textNodes=[]) => {
  for (let node of elem.children) {
    if (node.textContent) {
      let textNode = gen.next(node).value

      // check if not undefined since generator yield returns 
      // an undefined every iteration?
      if (textNode) {
        textNodes.push(textNode)
      }
    }
    searchChildNodesForText(node, textNodes)
  }

  return textNodes
}

const extractForProcessing = (textNodes) => {
  return textNodes.map(n => ({ text: n.text, id: n.id }))
}

const handleResponse = (response) => {
  terxtNerdz = JSON.parse(response.target.responseText)

  terxtNerdz.forEach((nerd) => {
    const elem = textNodes.find(n => n.id === nerd.id).elem
    elem.appendChild(document.createTextNode(nerd.text))
    elem.removeChild(elem.childNodes[0])
  })
}


const textNodes = searchChildNodesForText(document.querySelector('body'))

const req = new XMLHttpRequest()
req.addEventListener('load', handleResponse)
req.open('POST', 'http://localhost:5000/trernsferm', true)
req.setRequestHeader('Content-Type', 'application/json')
req.send(JSON.stringify(extractForProcessing(textNodes)))

