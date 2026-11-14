const gh = require('decimal.js')

gh.set({ precision: 100 });

class Co {
    constructor(real, imag) {
        if (real instanceof Co) {
            if(imag !== undefined) throw new Error("real inválido")
            this.real = gh(real.real)
            this.imag = gh(real.imag)
            return
        }
        if (imag === undefined) imag = gh(0)
        real = gh(real)
        imag = gh(imag)
        //console.log(real, imag)
        if (real.isNaN() || imag.isNaN()) throw new Error(`Parte real ou imaginária como NaN: (${real}, ${imag})`)
        this.real = real
        this.imag = imag
    }

    static Polar(r, theta) {
        if (r instanceof Co) {
            if(theta !== undefined) throw new Error("r inválido")
            return new Co(r)
        }
        if (theta === undefined) theta = gh(0)
        r = gh(r)
        theta = gh(theta)

        if (r.isNaN() || theta.isNaN()) throw new Error(`Raio ou ângulo como NaN: (${r}, ${theta})`)
        if (r.lt(0)) throw new Error("R menor que 0 não é válido")

        return new Co(r.times(theta.cos()), r.times(theta.sin()))
    }

    static parser(a, b) {
        return C(a, b)
    }

    add(b, b1) {
        b = Ajuste(b, b1)
        return new Co(this.real.add(b.real), this.imag.add(b.imag))
    }
    sub(b, b1) {
        b = Ajuste(b, b1)
        return new Co(this.real.sub(b.real), this.imag.sub(b.imag))
    }
    mul(b, b1) {
        b = Ajuste(b, b1)
        return new Co(this.real.times(b.real).sub(this.imag.times(b.imag)), this.real.times(b.imag).add(this.imag.times(b.real)))
    }
    div(b, b1) {
        b = Ajuste(b, b1)
        if (b.isZero()) throw new Error("Divisão por zero")
        let denom = (b.real).times(b.real).add((b.imag).times(b.imag))
        return new Co(((this.real).times(b.real).add((this.imag).times(b.imag))).div(denom), ((this.imag).times(b.real).sub(this.real.times(b.imag))).div(denom))
    }
    inv() {
        return Co["ONE"].div(this)
    }
    conj() {
        return new Co(this.real, this.imag.neg())
    }
    r() {
        return new Co((this.real.times(this.real)).add(this.imag.times(this.imag)).sqrt(), 0)
    }
    theta() {
        return new Co((gh.atan2(this.imag, this.real)), 0)
    }
    exp() {
        return new Co(((this.imag).cos()).times((this.real).exp()), (this.imag.sin()).times((this.real).exp()))
    }
    //SALVE EULER
    ln() {
        let r = this.r()
        if (r.isZero()) throw new Error("ln(0) não é definido")
        return new Co((r.real).ln(), this.theta().real)
    }
    pow(b, b1) {
        b = Ajuste(b, b1)
        if (this.isZero() && b.isReal() && b.real.gt(gh(0))) return Co[ZERO]
        let a = (b.mul(this.ln())).exp()
        if (a.isNaN()) throw new Error("Resultado inválido")
        return a
    }
    i() {
        return this.mul(Co["I"])
    }
    in() {
        return this.mul(Co["MINUS_I"])
    }

    sin() {
        return ((this.i().exp()).sub((this.in().exp()))).div(new Co(0, 2))
    }
    cos() {
        return (this.i().exp().add(this.in().exp())).div(new Co(2, 0))
    }
    tan() {
        return this.sin().div(this.cos())
    }
    sec() {
        return (this.cos()).inv()
    }
    csc() {
        return (this.sin()).inv()
    }
    cot() {
        return (this.tan()).inv()
    }

    nrt(n, n1) {
        n = Ajuste(n, n1)
        return this.pow(Co["ONE"].div(n))
    }
    sqrt() {
        return this.nrt(2)
    }
    cbrt() {
        return this.nrt(3)
    }
    log() {
        return this.logn(10)
    }
    logn(n, n1) {
        n = Ajuste(n, n1)
        return (this.ln().div(new Co(n.ln())))
    }
    print(tipo) {
        console.log(this.toString(tipo))
    }
    neg() {
        return Co["ZERO"].sub(this)
    }
    sinh() {
        return (this.exp().sub((this.neg()).exp())).div(new Co(2))
    }
    cosh() {
        return (this.exp().add((this.neg()).exp())).div(new Co(2))
    }
    tanh() {
        return this.sinh().div(this.cosh())
    }
    sech() {
        return this.cosh().inv()
    }
    csch() {
        return this.sinh().inv()
    }
    coth() {
        return this.tanh().inv()
    }

    isReal() {
        return this.imag.isZero()
    }
    isImag() {
        return (this.real.isZero() && !(this.imag.eq(0)))
    }
    isZero(){
        return (this.real.isZero() && this.imag.isZero())
    }
    eq(b, b1) {
        b = Ajuste(b, b1)
        return (this.real.eq(b.real) && this.imag.eq(b.imag))
    }
    noeq(b, b1) {
        b = Ajuste(b, b1)
        return (!(this.real.eq(b.real)) || !(this.imag.eq(b.imag)))
    }
    isNaN() {
        return (this.real.isNaN() || this.imag.isNaN())
    }
    isFinite() {
        return (isFinite(this.real) && isFinite(this.imag))
    }

    asin() {
        return ((((Co["ONE"].sub(this.mul(this))).sqrt().add(this.i()))).ln()).in()
    }
    acos() {
        return (Co[PI].div(2)).sub(this.asin())
    }
    atan() {
        let raz = (im.add(this)).div(im.sub(this))
        return ((raz.ln()).i()).div(new Co(2))
    }
    asec() {
        return this.inv().acos()
    }
    acsc() {
        return this.inv().asin()
    }
    acot() {
        return this.inv().atan()
    }
    asinh() {
        return ((this.mul(this)).add(Co["ONE"]).sqrt().add(this)).ln()
    }
    acosh() {
        return ((this.mul(this)).sub(Co["ONE"]).sqrt().add(this)).ln()
    }
    atanh() {
        return this.in().atan().i()
    }
    asech() {
        return this.inv().acosh()
    }
    acsch() {
        return this.inv().asinh()
    }
    acoth() {
        return this.inv().atanh()
    }
    DigitRemov(n) {
        if (n instanceof Co) {
            if (n.isReal()) {
                n = n.real
            } else throw new Error("Valor inválido")
        }
        return C(this.real.toDecimalPlaces(n, gh.ROUND_DOWN), this.imag.toDecimalPlaces(n, gh.ROUND_DOWN))
    }

    toString(tipo) {
        if (tipo === undefined) tipo = "c"
        if (tipo === "c") {
            if (this.imag.isZero()) return `${this.real}`
            if (this.real.isZero() && this.imag.eq(1)) return `i`
            if (this.real.isZero() && this.imag.eq(-1)) return `-i`
            if (this.real.isZero()) return `${this.imag}i`
            if (this.imag.eq(1)) return `${this.real} + i`
            if (this.imag.eq(-1)) return `${this.real} - i`
            if (this.imag.isNeg()) return `${this.real} - ${this.imag.abs()}i`
            return `${this.real} + ${this.imag}i`
        }
        if (tipo === "p") {
            let r = this.r()
            let arg = this.theta()
            if (arg.isZero()) return `${r.real}`
            if (r.isZero()) return `0`
            if (r.eq(1) && arg.eq(1)) return `e ** i`
            if (r.eq(1) && arg.eq(-1)) return `e ** (-i)`
            if (r.eq(1) && arg.noeq(1) && arg.noeq(-1)) return `e ** (${arg.real}i)`
            if (arg.eq(1)) return `${r.real} * e ** i`
            if (arg.eq(-1)) return `${r.real} * e ** (-i)`
            return `${r.real} * e ** (${arg.real}i)`
        }
        if (tipo === "pa") {
            let r = this.r()
            let arg = this.theta()
            return `${r.real} ∠ ${arg.real}`
        }
        throw new Error(`Tipo inválido: ${tipo}`)
    }
    toArray() {
        return [this.real, this.imag]
    }
    toObjectDecimal(tipo) {
        if (tipo === "Cartesian") return {real: this.real, imag: this.imag}
        if (tipo === "CartesianSmall") return {re: this.real, im: this.imag}
        if (tipo === "PolarR") return {r: this.r().real, phi: this.theta().real}
        if (tipo === "PolarABS") return {abs: this.r().real, arg: this.theta().real}
        throw new Error(`Tipo inválido: ${tipo}`)
    }
    toObjectNumber(tipo) {
        if (tipo === "Cartesian") return {real: this.real.toNumber(), imag: this.imag.toNumber()}
        if (tipo === "CartesianSmall") return {re: this.real.toNumber(), im: this.imag.toNumber()}
        if (tipo === "PolarR") return {r: this.r().real.toNumber(), phi: this.theta().real.toNumber()}
        if (tipo === "PolarABS") return {abs: this.r().real.toNumber(), arg: this.theta().real.toNumber()}
        throw new Error(`Tipo inválido: ${tipo}`)
    }
    toNumber() {
        return { real: this.real.toNumber(), imag: this.imag.toNumber() }
    }
}

Co["PI"] = new Co(gh(-1).acos())
Co["E"] = new Co(gh(1).exp())

Co["TAU"] = new Co(gh(-1).acos()).mul(2)

Co["SQRT2"] = new Co(gh(2).sqrt())
Co["SQRT3"] = new Co(gh(3).sqrt())
Co["SQRT5"] = new Co(gh(5).sqrt())

Co["LN10"] = new Co(gh(10).ln())
Co["LN2"] = new Co(gh(2).ln())
Co["LOG10E"] = new Co(gh(1).div(gh(10).ln()))
Co["PHI"] = new Co((gh(1).add(gh(5).sqrt())).div(gh(2)))

Co["PI_2"] = new Co(gh(-1).acos().div(gh(2)))
Co["PI_3"] = new Co(gh(-1).acos().div(gh(3)))
Co["PI_4"] = new Co(gh(-1).acos().div(gh(4)))

Co["I"] = new Co(0, 1)
Co["MINUS_I"] = new Co(0, -1)

Co["ONE"] = new Co(1)
Co["MINUS_ONE"] = new Co(-1)
Co["ZERO"] = new Co(0)

//Aqui eu vou ver o que dá problema e resolver tudo, não sei o que cada coisa faz em Decimal
function C(a, b) {
    /*
    Número: (-1, 3, -7812, 1.94, "34", "8230134", "-98143", ...)
    Imaginário puro: (i, -i, 83i, -3.8324i, ...)
    Objeto: ({abs, arg}, {real, imag}, {r, phi}, ...)
    Array: ([3, 3], [-1, 0], ["-1", "-1"], ...)
    Complexo completo: (1+i, 1-i, 432187+49i, 0.972134+1.1238974i, ...)
    */

    if (b !== undefined) try {return new Co(a, b)} catch {throw new Error(`'a' inválido com o 'b': ${a} e ${b}`)}

    if (a instanceof Co) return a

    let tipo = typeof a

    try {
        return new Co(a)
    } catch {}

    if (tipo === "string") {
        //O primeiro try já pega strings, então para números em strings já está resolvido
        a = a.replace(/\s/g, "")
        let r = a.indexOf("r")
        let r1 = a.indexOf("∠")

        if (r !== -1 || r1 !== -1) {
            if (r === -1) r = r1
            let R = a.slice(0, r)
            let phi = a.slice(r + 1, a.length)

            if (Co[R]?.real !== undefined) {R = Co[R].real}
            if (Co[phi]?.real !== undefined) {phi = Co[phi].real}

            return Co.Polar(R, phi)
        }

        let I = a.indexOf("i")
        let i1 = a.indexOf("I")

        if (I === -1) I = i1
        if (I !== a.length - 1) throw new Error(`Formatação errada: ${a}`)
        try {
            return new Co(0, a.slice(0, I))
        } catch {}

        if (a === "i" || a === "+i" || a === "I" || a === "+I") return new Co(0, 1)
        if (a === "-i" || a === "-I") return new Co(0, -1)

        //Aqui já tem certeza de que é complexo completo
        
        let SinalEscolhido

        let IMais = a.lastIndexOf("+")
        let IMenos

        while (a[IMais - 1] === "e") {
            IMais = a.slice(0, IMais - 1).lastIndexOf("+")
        }

        if (IMais === 0) {IMais = -1}

        if (IMais === -1) {
            IMenos = a.lastIndexOf("-")
            //console.log(IMenos)
            while (a[IMenos - 1] === "e") {
                IMenos = a.slice(0, IMenos - 1).lastIndexOf("-")
            }
        }

        if (IMais === -1 && IMenos === -1) throw new Error(`Erro em encontrar o sinal: ${a}`)

        SinalEscolhido = IMais !== -1 ? IMais : IMenos

        let Sinal = IMais !== -1 ? gh(1) : gh(-1)

        let SemSinal = a[0] === "+" || a[0] === "-" ? 1 : 0
        let SinalEsq = 1
        if (SemSinal) {
            SinalEsq = a[0] === "+" ? 1 : -1
        }

        let SReal = a.slice(SemSinal, SinalEscolhido)

        let SImag = a.slice(SinalEscolhido + 1, a.length - 1)

        let Real, Imag

        if (Co[SReal]?.real !== undefined) {Real = Co[SReal].real.mul(gh(SinalEsq))}
        if (Co[SImag]?.real !== undefined) {Imag = Co[SImag].real.mul(Sinal)}

        if (Real === undefined) Real = gh(SReal).mul(gh(SinalEsq))
        if (Imag === undefined) Imag = SImag === "" ? Sinal : gh(SImag).mul(Sinal)

        return new Co(Real, Imag)
    }

    if (Array.isArray(a) && a.length === 2) {
        return new Co(a[0], a[1])
    }

    if (tipo === "object" && a !== null) {
        if ("real" in a && "imag" in a) {
            return new Co(a.real, a.imag)
        }

        if ("r" in a && "phi" in a) {
            return new Co.Polar(a.r, a.phi)
        }

        if ("abs" in a && "arg" in a) {
            return new Co.Polar(a.abs, a.arg)
        }

        if ("re" in a && "im" in a) {
            return new Co(a.re, a.im)
        }
    }

    throw new Error(`Input(s) inválido(s): ${a} e ${b}`)
}

//BRUTAL
//

function Ajuste(x, y) {
    if (!(x instanceof Co)) x = C(x, y)
    return x
}

function isFinite(a) {
    if (!(a instanceof gh)) throw new Error(`Não é Decimal.js: ${typeof a}`)
    return !a.abs().eq(Infinity) && !a.isNaN();
}
//Não tenho ideia do que isso seja

module.exports = {
    Co
}

//C -> parserC

C("1-PIi").print()
