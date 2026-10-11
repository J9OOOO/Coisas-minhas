const Ca = require('./Untitled-1')
//Faça './Untitled-1' para a classe de precisão arbitrária
//Faça './Complexos V9' para a classe normal

//Biblioteca do cálculo numérico complexo (auraxxxxxxxxxxxxxxxxxxxxxx)

function t(x) {
    if (!(x instanceof Ca.Co)) throw new Error("Tipo inválido")
}
function pda(x) {
    x = Ca.Ajuste(x)
    //console.log(x)
    if ((!x.isFinite()) || x.isNaN()) throw new Error("Valor inválido")
}

const CalCComplexo = {
    d1O(f, x, h) {
        if (h === undefined) h = Ca.C(0.00001)

        x = Ca.Ajuste(x)
        h = Ca.Ajuste(h)

        let teste = (f(x.add(h)).sub(f(x))).div(h)
        if (!isFinite(teste)) throw new Error("Derivada inválida")
        return teste
    },
    d2O(f, x, h) {
        if (h === undefined) h = Ca.C(0.00001)

        x = Ca.Ajuste(x)
        h = Ca.Ajuste(h)

        let teste = (f(x.add(h)).sub(f(x.sub(h)))).div(Ca.C(2).mul(h))
        pda(teste)
        return teste
    },

    limE(f, x, h1) {
        if (h1 === undefined) h1 = Ca.C(0.00001)

        x = Ca.Ajuste(x)
        h1 = Ca.Ajuste(h1)
        let teste = f(x.sub(h1))
        pda(teste)
        return f(x.sub(h1))
    },
    limD(f, x ,h1) {
        if (h1 === undefined) h1 = Ca.C(0.00001)

        x = Ca.Ajuste(x)
        h1 = Ca.Ajuste(h1)
        let teste = f(x.add(h1))
        pda(teste)
        return f(x.add(h1))
    },

    Somatorio(f, i, n) {
        let s = Ca.C(0)
        for(let p = i; p <= n; ++p) {
            let p1 = Ca.C(p)
            s = s.add(f(p1))
        }
        pda(s)
        return s
    },
    Produtorio(f, i, n) {
        let s = Ca.C(1)
        for(let p = i; p <= n; ++p) {
            let p1 = Ca.C(p)
            s = s.mul(f(p1))
        }
        pda(s)
        return s
    },

    Rie(f, a, b, n) {
        a = Ca.C(a)
        b = Ca.C(b)

        let dx = b.sub(a).div(Ca.C(n))
        function g(x) {
            return f(a.add(x.mul(dx)))
        }

        let s = CalCComplexo.Somatorio(g, 0, n - 1)

        return s.mul(dx)
    },
    Tra(f, a, b, n) {
        a = Ca.C(a)
        b = Ca.C(b)

        let dx = b.sub(a).div(Ca.C(n))
        let r = CalCComplexo.Rie(f, a, b, n)

        return r.add(dx.mul(f(b).sub(f(a))).div(Ca.C(2)))
    },
    Sim(f, a, b, n) {
        let t1, t2
        if (n % 2 !== 0) ++n

        t1 = CalCComplexo.Tra(f, a, b, n)
        t2 = CalCComplexo.Tra(f, a, b, n / 2)


        return t1.mul(Ca.C(4)).sub(t2).div(Ca.C(3))
    },
    Gamma(x1) {
        //Boa sorte usando isso, só Deus sabe análise numérica, não eu
        //Mudei para a Gamma clássica, continuou igualmente ruim
        let z = x1
        let e = Math.E
        function brutal(x) {
            return (Ca.C((Ca.C(x)).pow(Ca.C(((Ca.C(z)).sub(Ca.C(1))))))).mul(Ca.C((Ca.C(e)).pow(Ca.C(((Ca.C("-1")).mul(Ca.C(x)))))))
        }
        return CalCComplexo.Sim(brutal, Ca.C(0.001), Ca.C(10), 10000)
        //Créditos ao BDAPSQBDTQEGPC, que compilou isso perfeitamente
    },
    NewtonI(f, x1, h) {
        x1 = Ca.Ajuste(x1)
        let teste = (x1.sub(f(x1).div(CalCComplexo.d2O(f, x1, h))))
        pda(teste)
        return teste
    },
    W(x1, l) {
        let lim = 1000
        let teste = 0
        if (l === undefined) l = 1e-10
        x1 = Ca.Ajuste(x1)
        let w = x1
        function I(x) {
            return x.ln().add(x).sub(x1.ln())
        }
        while (I(w).r().real >= l) {
            //w.print()
            w = CalCComplexo.NewtonI(I, w)
            ++teste
            if (teste > lim) throw new Error("Falha na convergência")
        }
        pda(w)
        return w
    },
    erf(x) {
        x = Ca.Ajuste(x)
        let s = CalCComplexo.Sim(x => (x.mul(x.neg())).exp(), 0, x, 1000)
        pda(s)
        return s.mul(2).div((Ca.invar.PI).sqrt())
    },
    NewtonCBAS(f, x, h) {
        let lim = 1000
        let teste = 0
        if (h === undefined) h = 1e-10
        x = Ca.Ajuste(x)
        let c = x
        //console.log(f(x))
        while (f(c).r().real >= h) {
            //f(c).print()
            c = CalCComplexo.NewtonI(f, c)
            ++teste
            if (teste > lim) throw new Error("Falha na convergência")
        }
        pda(c)
        return c
    }
}


//console.log(CalCComplexo.Gamma(0.5))
//console.log(CalCComplexo.Sim(x => x.sin(), 0, Ca.C("1+i"), 100))
CalCComplexo.NewtonCBAS(x => (Ca.C((Ca.C((Ca.C((Ca.C((Ca.C(x)).pow(Ca.C(4)))).add(Ca.C((Ca.C(7)).mul(Ca.C((Ca.C(x)).pow(Ca.C(3)))))))).add(Ca.C((Ca.C(7)).mul(Ca.C((Ca.C(x)).pow(Ca.C(2)))))))).add(Ca.C((Ca.C(7)).mul(Ca.C(x)))))).add(Ca.C(1)), Ca.C("1-12i")).print()
