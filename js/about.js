let str = `             辛集市（束鹿县）旧城镇是一座命运多舛的千年古城。它是隋朝安定县的城垣，是鹿城县的治所；它改过不少名字——从安定故城到鹿城故城，再到束鹿故城。其中，因“束鹿”取意“束缚安禄山”而名声最盛。但明朝的一场洪水，让它像当年的庞贝古城一样被埋在泥沙之下，它的名号和历史就此终结。400多年后的今天，这座城深藏的记忆依然鲜活；
                在逐鹿中原的战争后，城垣改名为鹿城县，这座城的历史就此展开。天宝十四年(公元755年)，安史之乱搅乱了大唐王朝的安定梦。一年之后，唐玄宗为了表达对平定安禄山的决心，把鹿城改为束鹿，意为“束缚安禄山”。
                据现存旧城东关的《束鹿县修成碑》记载：嘉靖三十年(1551年)束鹿知县李华鲁重修并扩建城墙，但天有不测风云，重修后的束鹿城，仅仅过了70年，就像当年遭遇火山喷发的庞贝古城一样，遭遇了灭顶之灾；
                明朝天启二年(1622年)滹沱河的一场洪水，将这座有千年历史的束鹿古城吞没，这座古城和北面的束鹿岩都掩埋在泥沙之下，县城迁到新址。被洪水掩埋的城垣，就此被称为旧城。被泥沙掩埋的束鹿岩成为高十几米的沙岗。后来人们在被泥沙掩埋的故城旧址上建设了村镇，名曰旧城镇；在束鹿岩遗址上建起了村子，名曰三丘村。到了清代，在旧城遗址上建起的旧城渐渐恢复了往日的熙攘，成为了冀中平原传统的大集市之一。`
let text = document.querySelector('.text')
let words = str.split("")

let write = () => {
    if(words.length > 0) {
        let span = document.createElement('span')
        let del = words.shift()
        let opc = 0
        span.innerText = del
        text.appendChild(span)
        let fade = setInterval(() => {
            opc++
            span.style.opacity = opc / 10
            span.style.color = 'transparent'
            span.style.textShadow = '0 0 5px #57606f, 0 0 10px #57606f, 0 0 4px #57606f, 0 0 12px #ffa502'
            span.style.filter = `blur(${(10 / opc-1)})`
            if(opc >= 10) {
                clearInterval(fade)
                span.style.color = '#2f3542'
            }
        }, 50)
    }
}
setInterval(write, 50)