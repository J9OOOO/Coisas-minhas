class Co {
    constructor(real, imag) {
        if (real instanceof Co) {
            if(imag !== undefined) throw new Error(`real inválido: ${real}`)
            this.real = real.real
            this.imag = real.imag
            return
        }
        if (imag === undefined) imag = 0

        real = Number(real)
        imag = Number(imag)

        if (isNaN(real) || isNaN(imag)) throw new Error(`??????????: , ${real}, ${imag}`)

        this.real = real
        this.imag = imag
    }

    static Polar(r, theta) {
        if (r instanceof Co) {
            if (theta !== undefined) throw new Error(`r inválido: ${r}`)
            return new Co(r)
        }
        if (theta === undefined) theta = 0

        r = Number(r)
        theta = Number(theta)

        if (r < 0) throw new Error("R não pode ser menor que 0")
        if (isNaN(r) || isNaN(theta)) throw new Error(`??????????: ${r}, ${theta}`)
        return new Co(r * Math.cos(theta), r * Math.sin(theta))
    }

    add(b) {
        b = Ajuste(b)
        return new Co(this.real + b.real, this.imag + b.imag)
    }
    sub(b) {
        b = Ajuste(b)
        return new Co(this.real - b.real, this.imag - b.imag)
    }
    mul(b) {
        b = Ajuste(b)
        return new Co(this.real * b.real - this.imag * b.imag, this.real * b.imag + this.imag * b.real)
    }
    div(b) {
        b = Ajuste(b)
        let denom = b.real * b.real + b.imag * b.imag
        if (b.isZero()) throw new Error("Divisão por zero")
        return new Co((this.real * b.real + this.imag * b.imag) / denom, (this.imag * b.real - this.real * b.imag) / denom)
    }
    inv() {
        return C(1).div(this)
    }
    conj() {
        return new Co(this.real, -this.imag)
    }
    r() {
        return new Co(Math.sqrt(this.real * this.real + this.imag * this.imag), 0)
    }
    theta() {
        return new Co(Math.atan2(this.imag, this.real), 0)
    }
    exp() {
        return new Co(Math.cos(this.imag) * Math.exp(this.real), Math.sin(this.imag) * Math.exp(this.real))
    }
    ln() {
        let r = this.r()
        if (r.isZero()) throw new Error("ln(0) não é definido")
        return new Co(Math.log(r.real), this.theta().real)
    }
    pow(b) {
        b = Ajuste(b)
        if (this.isZero() && b.isReal() && (b.real > 0)) return C(0)
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
        return this.pow(C(1).div(n))
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
        return (this.ln().div(new Co(Math.log(n))))
    }
    print(tipo) {
        if (tipo === undefined) tipo = "c"
        if (tipo === "c") {
            if (isNaN(this.real + this.imag)) throw new Error("Número inválido")
            if (this.imag === 0) return console.log(`${this.real}`)
            if (this.real === 0 && this.imag === 1) return console.log(`i`)
            if (this.real === 0 && this.imag === -1) return console.log(`-i`)
            if (this.real === 0) return console.log(`${this.imag}i`)
            if (this.imag === 1) return console.log(`${this.real} + i`)
            if (this.imag === -1) return console.log(`${this.real} - i`)
            if (this.imag < 0) return console.log(`${this.real} - ${Math.abs(this.imag)}i`)
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
        return this.imag === 0
    }
    isImag() {
        return (this.real === 0 && this.imag !== 0)
    }
    isZero(){
        return (this.real === 0 && this.imag === 0)
    }
    eq(b) {
        b = Ajuste(b)
        return (this.real === b.real && this.imag === b.imag)
    }
    noeq(b) {
        return (this.real !== b.real || this.imag !== b.imag)
    }
    isNaN() {
        return (isNaN(this.real) || isNaN(this.imag))
    }
    isFinite() {
        return Number.isFinite(this.real) && Number.isFinite(this.imag)
    }

    asin() {
        return ((((C(1).sub(this.mul(this))).sqrt().add(this.i()))).ln()).in()
    }
    acos() {
        return C(Math.PI / 2).sub(this.asin())
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

//
function Cpp(string) {

    //Barragem
    if (string === null || string === undefined || (typeof string === "string" && string.trim() === "")) throw new Error("Valor inválido")
    //Barragem

    if (typeof string === "string") {
    string = string.replace("I", "i")
    let i = string.indexOf("i")

    if (i === -1) {
        let r = Number(string)
        if (isNaN(r)) throw new Error("Valor inválido")
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

    //ESSE PARÊNTESES, MANO
    if (!isNaN(Number(string[LimIIMais - 1])) && (!isNaN(Number(string[LimIIMais + 1])) || string[LimIIMais + 1] === "i")) LimS = LimIIMais
    if (!isNaN(Number(string[LimIIMenos - 1])) && (!isNaN(Number(string[LimIIMenos + 1])) || string[LimIIMenos + 1] === "i")) LimS = LimIIMenos

    //console.log(string.slice(0, LimI), LimI)
    //console.log(string.slice(0, LimII), LimII)
    let RealS = string.slice(0, LimS)
    let ImagS = string.slice(LimS, string.length)
    let real, imag
    //console.log(LimS)

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

    if (imag === undefined) imag = Number(ImagS.slice(0, ImagS.length - 1))
    real = Number(RealS)

    //console.log(imag)

    //console.log(real)
    //console.log(imag)
    //console.log(ImagS.slice(0, ImagS.length - 2))

    return new Co(real, imag)
    }
    if (string instanceof Co) return new Co(string)
    if (isNaN(string)) throw new Error("Valor inválido")

    return new Co(Number(string))
}

function C(a, b, t) {
    if (t !== 0 && t !== 1 && t !== undefined) throw new Error(`Configuração inválida: t = ${t}`)

    let Cartesiano = t === 0 || t === undefined
    let Polar = t === 1

    if (typeof a === "string") {

    if (a.indexOf("r") !== -1) {Cartesiano = false, Polar = true, a = a.replace(/\s+/g, ""); if (b !== undefined || t !== undefined) throw new Error("a inválido")}
    if (a.indexOf("i") !== -1) {Cartesiano = true, Polar = false, a = a.replace(/\s+/g, ""); if (b !== undefined || t !== undefined) throw new Error("a inválido")}

    }
    
    //console.log(Polar)

    if (b === undefined && Cartesiano) return Cpp(a)
    if (b === undefined && Polar) return Cpo(a)

    if (a === null || isNaN(Number(a)) || (typeof a === "string" && a.trim() === "")) throw new Error("a inválido")
    if (b === null || isNaN(Number(b)) || (typeof b === "string" && b.trim() === "")) throw new Error("b inválido")

    if (Cartesiano) return new Co(a, b)
    if (Polar) return Co.Polar(a, b)
}

function Cpo(string) {

    //Barragem
    if (string === null || string === undefined || (typeof string === "string" && string.trim() === "")) throw new Error(`Valor inválido: ${string}`)
    //Barragem

    if (typeof string === "string") {
        string = string.replace("R", "r")
        let r = string.indexOf("r")
        if (r === -1) return Co.Polar(Number(string))
        
        if (isNaN(Number(string[r - 1]))) throw new Error(`Formatação inválida: ${string}`)

        let raio = Number(string.slice(0, r))
        let argumento = Number(string.slice(r + 1, string.length))

        //console.log(raio, argumento)

        return Co.Polar(raio, argumento)

    }
    if (!isNaN(Number(string))) return Co.Polar(Number(string), 0)
    if (string instanceof Co) return Co.Polar(string)
    throw new Error(`Valor impossível de ser convertido: ${string}`)
}

//BRUTAL
//

function Ajuste(x) {
    if (!(x instanceof Co)) x = C(x)
    return x
}

const im = new Co(0, 1)

const invar = {
    PI: C(Math.PI),
    E: C(Math.E),

    TAU: C(2 * Math.PI),

    SQRT2c: C(Math.SQRT2),
    SQRT3c: C(Math.sqrt(3)),
    SQRT5c: C(Math.sqrt(5)),

    LN10c: C(Math.LN10),
    LN2c: C(Math.LN2),
    LOG10Ec: C(Math.LOG10E),
    PHI: C((1 + Math.sqrt(5)) / 2)
}

module.exports = {
    Co,
    im,
    C,
    Ajuste,
    invar
}

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
//console.log(C(NaN))
//console.log(C("NaN"))

C("i").print()
