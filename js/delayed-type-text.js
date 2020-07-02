function buildTypeText(el, letterDelay, reverseDelay, slideDelay, options={}) {
    const els = [...el.children]
    const texts = els.map(el => el.innerText)
    let i = 0, interval, length = 0
    if (options.sound) {
        var sound = new Audio('/sound.mp3')
        sound.loop = true
    }
    
    els.forEach(el => {
        el.innerText = ''
        el.style.display = 'none'
    })
    
    el.type = () => {
        if (options.sound) sound.play()
        clearInterval(interval)
        interval = setInterval(() => {
            els[i].style.display = null
            if (length != texts[i].length) els[i].innerText = texts[i].slice(0, ++length)
            else {
                if (options.sound) sound.pause()
                clearInterval(interval)
                interval = setTimeout(() => {
                    interval = setInterval(() => {
                        if (els[i].innerText) {
                            els[i].innerText = texts[i].slice(0, --length)
                        } else {
                            clearInterval(interval)
                            els[i].style.display = 'none'
                            i = (i + 1) % els.length
                            length = 0
                            els[i].innerText = ''
                            els[i].style.display = null
                            el.type()
                        }
                    }, reverseDelay)
                }, slideDelay)
            }
        }, letterDelay)
    }

    el.pause = () => {
        if (options.sound) sound.pause()
        clearInterval(interval)
    }

    el.type()
    return el
}