const Nrr = require('C:/Users/Pichau/Desktop/PASTA DE PROGRAMAR/JavaScript/NewtonRaphoson/Nrr')
function f(x) {
    return x ** 2 + 2 * x - 90000000
}
let erroi = 0
let res
const NrrS = {
    Val(a) {
        if (typeof a == "number") {
            return 1
        } else return 0
    },

    InvocatusIII(f, r) {
    let h = 0.00001
    let i = 0
    let x = 1
    let ssdS, ssdI

    do {        
        let erro1 = false
        let erro2 = false

        try {
            ssdS = Nrr.Iteracao(f, x + i, h)
            res = ssdS
            break
        } catch (erro) {
            erro1 = true
        }

        if (i !== 0) {
        try {
            ssdI = Nrr.Iteracao(f, x - i, h)
            res = ssdI
            break
        } catch (erro) {
            erro2 = true
        }
        } else erro2 = erro1

        if (erro1 && erro2) {
            i += 5
            ++erroi
        } else {
            break
        }
        //console.log(i)
        //console.log(res)
    } while (i <= r)
    console.log("Erros: ", erroi)
    if (!NrrS.Val(res)) throw new Error("Sem valor")
    return res
    }
}

//console.log("Valor final: ", NrrS.InvocatusIII(f, 20))

module.exports = NrrS