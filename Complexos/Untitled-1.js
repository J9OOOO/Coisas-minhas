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
        real = gh(real)
        if (imag === undefined) imag = gh(0)
        real = gh(real)
        imag = gh(imag)
        if (real.isNaN() || imag.isNaN()) throw new Error("??????????")
        this.real = gh(real)
        this.imag = gh(imag)
    }

    static Polar(r, theta) {
        if (r instanceof Co) {
            if(theta !== undefined) throw new Error("r inválido")
            return new Co(r)
        }
        if (theta === undefined) theta = gh(0)
        r = gh(r)
        theta = gh(theta)

        if (r.isNaN() || theta.isNaN()) throw new Error("??????????")
        if (r.lt(0)) throw new Error("R menor que 0 não é válido")

        return new Co(r.times(theta.cos()), r.times(theta.sin()))
    }

    add(b) {
        b = Ajuste(b)
        return new Co(this.real.add(b.real), this.imag.add(b.imag))
    }
    sub(b) {
        b = Ajuste(b)
        return new Co(this.real.sub(b.real), this.imag.sub(b.imag))
    }
    mul(b) {
        b = Ajuste(b)
        return new Co(this.real.times(b.real).sub(this.imag.times(b.imag)), this.real.times(b.imag).add(this.imag.times(b.real)))
    }
    div(b) {
        b = Ajuste(b)
        let denom = (b.real).times(b.real).add((b.imag).times(b.imag))
        if (b.isZero()) throw new Error("Divisão por zero")
        return new Co(((this.real).times(b.real).add((this.imag).times(b.imag))).div(denom), ((this.imag).times(b.real).sub(this.real.times(b.imag))).div(denom))
    }
    inv() {
        return C(1).div(this)
    }
    conj() {
        return new Co(this.real, this.imag.times(gh(-1)))
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
        if (r.eq(C(0))) throw new Error("ln(0) não é definido")
        return new Co((r.real).ln(), this.theta().real)
    }
    pow(b) {
        b = Ajuste(b)
        if (this.isZero() && b.isReal && b.real.gt(gh(0))) return C(0)
        if (!(b instanceof Co)) b = C(b)
        let a = (b.mul(this.ln())).exp()
        if (a.isNaN()) throw new Error("Resultado inválido")
        return a
    }
    i() {
        return this.mul(new Co(0, 1))
    }
    in() {
        return this.mul(new Co(0, -1))
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

    nrt(n) {
        n = Ajuste(n)
        return this.pow(new Co(1, 0).div(new Co(n)))
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
    logn(n) {
        n = Ajuste(n)
        return (this.ln().div(new Co(n.ln())))
    }
    print(tipo) {
        //if (isNaN(this.real.add(this.imag))) throw new Error("Número inválido")
        if (tipo === undefined) tipo = "c"
        if (tipo === "c") {
            if (this.imag.isZero()) return console.log(`${this.real}`)
            if (this.real.isZero() && this.imag.eq(1)) return console.log(`i`)
            if (this.real.isZero() && this.imag.eq(-1)) return console.log(`-i`)
            if (this.real.isZero()) return console.log(`${this.imag}i`)
            if (this.imag.eq(1)) return console.log(`${this.real} + i`)
            if (this.imag.eq(-1)) return console.log(`${this.real} - i`)
            if (this.imag.isNeg()) return console.log(`${this.real} - ${this.imag.abs()}i`)
            return console.log(`${this.real} + ${this.imag}i`)
        }
        if (tipo === "p") {
            let r = this.r()
            let arg = this.theta()
            if (arg.isZero()) return console.log(`${r.real}`)
            if (r.isZero()) return console.log(0)
            if (r.eq(1) && arg.eq(1)) return console.log(`e ** i`)
            if (r.eq(1) && arg.eq(-1)) return console.log(`e ** (-i)`)
            if (r.eq(1) && arg.noeq(1) && arg.noeq(-1)) return console.log(`e ** (${arg.real}i)`)
            if (arg.eq(1)) return console.log(`${r.real} * e ** i`)
            if (arg.eq(-1)) return console.log(`${r.real} * e ** (-i)`)
            return console.log(`${r.real} * e ** (${arg.real}i)`)
        }
        if (tipo === "pa") {
            let r = this.r()
            let arg = this.theta()
            return console.log(`${r.real} ∠ ${arg.real}`)
        }
        throw new Error(`tipo inválido: ${tipo}`)
    }
    neg() {
        return C(0).sub(this)
    }
    sinh() {
        return (this.exp().sub((this.neg()).exp())).div(C(2))
    }
    cosh() {
        return (this.exp().add((this.neg()).exp())).div(C(2))
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
    eq(b) {
        b = Ajuste(b)
        return (this.real.eq(b.real) && this.imag.eq(b.imag))
    }
    noeq(b) {
        b = Ajuste(b)
        return (!(this.real.eq(b.real)) || !(this.imag.eq(b.imag)))
    }
    isNaN() {
        return (this.real.isNaN() || this.imag.isNaN())
    }
    isFinite() {
        return ((this.real).isFinite() && (this.imag).isFinite())
    }

    asin() {
        return ((((C(1).sub(this.mul(this))).sqrt().add(this.i()))).ln()).in()
    }
    acos() {
        return C(PI.div(2)).sub(this.asin())
    }
    atan() {
        let raz = (im.add(this)).div(im.sub(this))
        return ((raz.ln()).i()).div(C(2))
    }
    asinh() {
        return ((this.mul(this)).add(C(1)).sqrt().add(this)).ln()
    }
    acosh() {
        return ((this.mul(this)).sub(C(1)).sqrt().add(this)).ln()
    }
    atanh() {
        return this.in().atan().i()
    }
    DigitRemov(n) {
        if (n instanceof Co) {
            if (n.isReal()) {
                n = n.real
            } else throw new Error("Valor inválido")
        }
        return C(this.real.toDecimalPlaces(n, gh.ROUND_DOWN), this.imag.toDecimalPlaces(n, gh.ROUND_DOWN))
    }
}

//Aqui eu vou ver o que dá problema e resolver tudo, não sei o que cada coisa faz em Decimal
function Cpp(string) {

    //Barragem
    if (string === null || string === undefined || (typeof string === "string" && string.trim() === "")) throw new Error("Valor inválido")
    //Barragem

    if (typeof string === "string") {
    //string = string.replace("I", "i")
    let i = string.indexOf("i")

    if (i === -1) {
        let r
        try {
            r = gh(string)
        } catch {throw new Error(`Valor inválido: ${string}`)}
        return new Co(r)
    }
    if (i !== string.length - 1) throw new Error("Formatação inválida")

    //let LimIMais = string.indexOf("+")
    let LimIIMais = string.lastIndexOf("+")

    //let LimIMenos = string.indexOf("-")
    let LimIIMenos = string.lastIndexOf("-")

    if (string[LimIIMenos - 1] === "e") LimIIMenos = string.slice(0, LimIIMenos - 1).lastIndexOf("-")
    if (string[LimIIMais - 1] === "e") LimIIMais = string.slice(0, LimIIMais - 1).lastIndexOf("+")

    let LimS

    //!isNaN(Number(string[LimIIMais - 1])) = try {gh(string[LimIIMais - 1]), LIMITE1 = true} catch {LIMITE1 = false}
    let LIM1, LIM2, LIM3, LIM4
    LIM1 = Val(string[LimIIMais - 1])
    LIM2 = Val(string[LimIIMais + 1])
    LIM3 = Val(string[LimIIMenos - 1])
    LIM4 = Val(string[LimIIMenos + 1])
    //isNaN não funciona aqui... (como eu preciso)
    //console.log(LIM1, LIM2, LIM3, LIM4)
    //console.log(LimIIMais)



    if (LIM1 && (LIM2 || string[LimIIMais + 1] === "i")) LimS = LimIIMais
    if (LIM3 && (LIM4 || string[LimIIMenos + 1] === "i")) LimS = LimIIMenos

    //console.log(string.slice(0, LimI), LimI)
    //console.log(string.slice(0, LimII), LimII)
    let RealS = string.slice(0, LimS)
    let ImagS = string.slice(LimS, string.length)
    let real, imag
    //console.log(LimS)
    //console.log(RealS, ImagS)

    if (RealS === ImagS) {
        //console.log(RealS === ImagS)
        if ((string[0] === "+" && string.length === 2)|| string[0] === "i") return new Co(0, 1)
        if (string[0] === "-" && string.length === 2) return new Co(0, -1)
        return new Co(0, string.slice(0, string.length - 1))
    }

    if (ImagS.length === 2 && ImagS[0] === "+") imag = 1
    if (ImagS.length === 2 && ImagS[0] === "-") imag = -1

    //console.log(RealS)
    //console.log(ImagS)

    //Barragem

    //Barragem

    if (imag === undefined) try {imag = gh(ImagS.slice(0, ImagS.length - 1))} catch {throw new Error(`Valor inválido: ${ImagS}`)}
    try {real = gh(RealS)} catch {throw new Error(`Valor inválido: ${RealS}`)}

    //console.log(imag)

    //console.log(real)
    //console.log(imag)
    //console.log(ImagS.slice(0, ImagS.length - 2))

    return new Co(real, imag)
    }
    if (string instanceof Co) return new Co(string)
    
    let Valor

    try {Valor = gh(string)} catch {throw new Error(`Valor inválido: ${string}`)}

    return new Co(Valor)
}

function C(a, b, t) {
    if (t !== 0 && t !== 1 && t !== undefined) throw new Error(`Configuração inválida: t = ${t}`)

    let Cartesiano = t === 0 || t === undefined
    let Polar = t === 1

    if (typeof a === "string") {

    a = a.replace("I", "i")
    a = a.replace("R", "r")

    if (a.indexOf("r") !== -1) {Cartesiano = false, Polar = true, a = a.replace(/\s+/g, ""); if (b !== undefined || t !== undefined) throw new Error(`a inválido: ${a}`)}
    if (a.indexOf("i") !== -1) {Cartesiano = true, Polar = false, a = a.replace(/\s+/g, ""); if (b !== undefined || t !== undefined) throw new Error(`a inválido: ${a}`)}

    }
    
    //console.log(Polar)

    let Na, Nb
    try {
        gh(a)
        Na = false
    } catch {Na = true}

    try {
        gh(b)
        Nb = false
    } catch {Nb = true}

    if (b === undefined && Cartesiano) return Cpp(a)
    if (b === undefined && Polar) return Cpo(a)

    if (a === null || Na || (typeof a === "string" && a.trim() === "")) throw new Error(`a inválido: ${a}`)
    if (b === null || Nb || (typeof b === "string" && b.trim() === "")) throw new Error(`b inválido: ${b}`)

    if (Cartesiano) return new Co(a, b)
    if (Polar) return Co.Polar(a, b)
}

function Cpo(string) {

    //Barragem
    if (string === null || string === undefined || (typeof string === "string" && string.trim() === "")) throw new Error(`Valor inválido: ${string}`)
    //Barragem

    if (typeof string === "string") {
        //string = string.replace("R", "r")
        let r = string.indexOf("r")
        if (r === -1) return Co.Polar(gh(string))
        
        try {gh(string[r - 1])} catch {throw new Error(`Formatação inválida: ${string}`)}

        let raio = gh(string.slice(0, r))
        let argumento = gh(string.slice(r + 1, string.length))

        //console.log(raio, argumento)

        return Co.Polar(raio, argumento)

    }
    try {return Co.Polar(gh(string), 0)} catch {}
    if (string instanceof Co) return Co.Polar(string)
    throw new Error(`Valor impossível de ser convertido: ${string}`)
}

//BRUTAL
//

function Ajuste(x) {
    if (!(x instanceof Co)) x = C(x)
    return x
}

function Val(s) {
    try { gh(s); return true } catch { return false }
}

const im = new Co(0, 1)

const invar = {
    PI: C(gh.acos(-1)),
    E: C(gh(1).exp()),

    TAU: C(C(gh.acos(-1)).mul(2)),

    SQRT2c: C(gh(2).sqrt()),
    SQRT3c: C(gh(3).sqrt()),
    SQRT5c: C(gh(5).sqrt()),

    LN10c: C(gh(10).ln()),
    LN2c: C(gh(2).ln()),
    LOG10Ec: C(Math.LOG10E),
    PHI: C((gh(1).add(gh(5).sqrt())).div(gh(2)))
}

module.exports = {
    Co,
    im,
    C,
    Ajuste,
    invar
}

//let x = C(2)
//x.div(2).print()

//I try change the formality

//console.log(C("banana"))
//console.log(C("bi"))
//console.log(C("undefined"))
//console.log(C("undefnedi"))
//console.log(C("1+bananai"))
//console.log(C("banana+i"))
//console.log(C(null))
//console.log(C(undefined))
//console.log(C(""))
//console.log(C())
//console.log(C("-"))
//console.log(C("+"))
//console.log(C(NaN))i
//console.log(C("NaN"))

//C(0, invar.PI).exp().add(1).DigitRemov(99).print()
//e^ipi+1=0

//C(Infinity).mul(1).print()

C("12+2i").print()
