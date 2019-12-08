const handleText = (t, l) => {
    let truncated = []
    const arr = t.match(/.{1,195}(\s|$)/g)
    arr.forEach(i => {
        truncated.push(`http://translate.google.com/translate_tts?ie=UTF-8&q=${i.replace(/ /g, '+')}&tl=${l}&client=tw-ob`)
    })
    return truncated
}

const main = args => {
    const { text, lang } = args
    const url = handleText(text, lang)
    return { body: { url } }
}

exports.main = main
