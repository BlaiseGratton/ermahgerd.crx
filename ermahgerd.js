const createRegisterer = () => {
  let counter = 1

  const registerNode = elem => ({
    id: counter++,
    text: elem.textContent,
    elem
  })

  return registerNode
}

const registerNode = createRegisterer()


const searchChildNodesForText = (elem, textNodes=[]) => {
  for (let node of elem.children) {
    if (node.textContent) {
      textNodes.push(registerNode(node))
    }
    searchChildNodesForText(node, textNodes)
  }

  return textNodes
}


const textNodes = searchChildNodesForText(document.querySelector('body'))

const extractForProcessing = (textNodes) => {
  return textNodes.map(n => ({ text: n.text, id: n.id }))
}

const handleResponse = (response) => {
  terxtNerdz = JSON.parse(response.target.responseText)

  terxtNerdz.forEach((nerd) => {
    const elem = textNodes.find(n => n.id === nerd.id).elem
    elem.textContent = nerd.text
  })
}

const req = new XMLHttpRequest()
req.addEventListener('load', handleResponse)
req.open('POST', 'http://localhost:5000/trernsferm', true)
req.setRequestHeader('Content-Type', 'application/json')
req.send(JSON.stringify(extractForProcessing(textNodes)))

