let inicio = performance.now()

function f(x) {
    return x ** x - 2
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
    return (x - fx / Df)
},

Iteracao(f, x, h) {
    let valor = x
    let p = 0
    let valor1, Episilon, fk
    do {
        valor1 = Nrd.NewtonSoQueAura(f, valor, h)
        valor2 = Nrd.NewtonSoQueAura(f, valor1, h)
        valor3 = Nrd.NewtonSoQueAura(f, valor2, h)
        valor = Nrd.NewtonSoQueAura(f, valor3, h)
        fk = f(valor)
        Episilon = Math.abs(valor - valor1)
        if (Episilon * 100 > 120) {
            ++p
        } else p = 0
        if (p > 10) throw new Error("Não convergiu")
        if ((!((Math.abs(f(valor2) - f(valor1))) > (Math.abs(fk - f(valor3))))) && Math.abs(fk) > 1e-5) throw new Error("NÃO")
        //console.log(((Math.abs(f(valor2) - f(valor1)))), (Math.abs(fk - f(valor3))), f(valor))
        if (!isFinite(fk)) throw new Error("NaN ou infinity")
    }
    while(Math.abs(fk) > 1e-13)
    if (Math.abs(fk) > 1e-5) throw new Error("Não chegou em 0")
    return valor
}
}

console.log(Nrd.Iteracao(f, 2, 0.01))

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