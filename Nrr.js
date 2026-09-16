let inicio = performance.now()

function f(x) {
    return x ** x + 312435245
}

function ww(segundos) {
    return new Promise(resolve => {
        setTimeout(resolve, segundos * 1000)
    })
}

const Nrd = {

d2(f, x, h) {
    return (f(x + h) - f(x - h)) / (2 * h)
},

NewtonSoQueAura(f, x, h) {
    let n = 1
    let fx = f(x)
    let Df
    Df = Nrd.d2(f, x, h)
    while(!isFinite(fx) || !isFinite(Df) || Math.abs(Df) < 1e-10) {
        x = Math.pow(-1, n + 1) * n * h
        fx = f(x)
        Df = Nrd.d2(f, x, h)
        ++n
        if (n >= 1000) throw new Error("Coitado, tentou tanto encontrar um ponto válido")
    }
    return [(x - fx / Df), fx, Df]
},

Iteracao(f, x, h) {
    let valor = x
    let p = 0
    let f1, f2, f3, f4, DD, Episilon, fk, teste
    let resenha = 0
    do {
        valor = Nrd.NewtonSoQueAura(f, valor, h)
        f1 = valor[1]
        valor = valor[0]
        //console.log(valor, f1)
        valor = Nrd.NewtonSoQueAura(f, valor, h)
        f2 = valor[1]
        valor = valor[0]
        //console.log(valor, f2)
        valor = Nrd.NewtonSoQueAura(f, valor, h)
        f3 = valor[1]
        valor = valor[0]
        fk = valor
        //console.log(valor, 3)
        valor = Nrd.NewtonSoQueAura(f, valor, h)
        DD = valor[2]
        valor = valor[0]
        f4 = f(valor)
        //console.log(valor, f4)
        if (!isFinite(f4)) throw new Error("NaN ou infinity")
        Episilon = Math.abs(valor - fk)
        if (Episilon * 100 > 120) {
            ++p
        } else p = 0
        if (p > 15) throw new Error("Não convergiu")
        //console.log(((Math.abs(f(valor2) - f(valor1)))), (Math.abs(fk - f(valor3))), f(valor))
        teste = 8 * (2.220446049250313e-16) * Math.abs(valor * DD)
        if ((!((Math.abs(f2 - f1)) > (Math.abs(f4 - f3)))) && f4 > teste) {
            ++resenha
        }
        //console.log(8 * Dx * Math.abs(valor * Nrd.d2(f, valor, h)))
        if (Math.abs(f4) <= teste) {
            break
        }
        if (resenha > 30) throw new Error("Aqui não.")
    }
    while(Math.abs(f4) > 1e-13)
    return valor
}
}

console.log(Nrd.Iteracao(f, 1, 1e-6))

//if (!isFinite(Df) || Math.abs(Df) < 1e-10) throw new Error("Algo deixou de ser number")

//*
//NewtonSoQueAura(f, x, h) {
//    let fx = f(x)
//    let Df
//    while(!isFinite(fx) || !isFinite(Df) || Math.abs(Df) < 1e-10) {
//        x = x - h
//        fx = f(x)
//    }
//    Df = Nrd.d2(f, x, h)
//    while(!isFinite(Df) || Math.abs(Df) < 1e-10) {
//        x = x - h
//        fx = f(x)
//        Df = Nrd.d2(f, x, h)
//    }
//    return (x - fx / Df)
//},
//*

let fim = performance.now()

console.log(fim - inicio, "ms")

module.exports = Nrd
