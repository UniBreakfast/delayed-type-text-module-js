start.onclick = () => {
  start.remove()
  type.hidden = false
  buildTypeText(type, 100, 30, 1500, {sound: true})
}
