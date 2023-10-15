let str = `             辛集市,位于河北省中南部,地处北纬37°38'~'38°08'、东经115°07'~115°28'之间。北与石家庄市深泽县相邻,西与石家庄市晋州市相邻,南与衡水市冀州、邢台市宁晋接壤；面积951平方千米。
                相对位置为河北省石家庄市东部,地处冀中坳陷南部束鹿凹陷核心区。全市属平原地形,地形西北部较高,海拔高度37.8米,东南部较低,海拔在25米,地势由西北向东南倾斜,地形平坦开阔。表层土壤全部由滹沱河冲积而成,成土母质主要是河流冲积物,土体构造疏松。
                气候上属暖温带半湿润季风大陆气候,在半湿润和半干旱气候之间。其主要特点为四季分明,春季(3~5月)干燥多风,夏季(6~8月)炎热多雨,秋季(9~11月)温和凉爽,初秋阴雨稍多,冬季(12~2月)寒冷,雨雪较少。`
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