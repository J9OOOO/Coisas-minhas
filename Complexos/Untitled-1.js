const gh = require('decimal.js')

gh.set({ precision: 100 });

class Co {
    constructor(real, imag) {
        if (real instanceof Co) {
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
            return new Co(r)
        }
        if (theta === undefined) theta = 0
        if (r.isNaN() || theta.isNaN()) throw new Error("??????????")
        r = gh(r)
        theta = gh(theta)
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
        //if (isNaN(a.real) || isNaN(a.imag)) throw new Error("Resultado inválido")
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
    print() {
        //if (isNaN(this.real.add(this.imag))) throw new Error("Número inválido")
        if (this.imag.isZero()) return console.log(`${this.real}`)
        if (this.real.isZero() && this.imag.eq(1)) return console.log(`i`)
        if (this.real.isZero() && this.imag.eq(-1)) return console.log(`-i`)
        if (this.real.isZero()) return console.log(`${this.imag}i`)
        if (this.imag.eq(1)) return console.log(`${this.real} + i`)
        if (this.imag.eq(-1)) return console.log(`${this.real} - i`)
        if (this.imag.isNeg()) return console.log(`${this.real} - ${this.imag.abs()}i`)
        return console.log(`${this.real} + ${this.imag}i`)
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
    arcsinh() {
        return ((this.mul(this)).add(C(1)).sqrt().add(this)).ln()
    }
    arccosh() {
        return ((this.mul(this)).sub(C(1)).sqrt().add(this)).ln()
    }
    atanh() {
        return this.in().atan()
    }
}

//
function C(string, ino) {
    //MODO "NORMAL"
    if (ino !== undefined) {
        let real, imag
        if (string === null || string === undefined || ino === null || ino === undefined) throw new Error("Entrada inválida")
        try {
        real = gh(string)
        imag = gh(ino)
        } catch {throw new Error("'a' ou 'b' inválidos")}
        return new Co(real, imag)
    }
    
    //MODO PARSER
    if (string === null || string === "" || string === undefined) throw new Error("Entrada inválida")
    let teste2, imag, real
    //console.log((string))
    if (string instanceof Co) return new Co(string)
    try {
        //console.log(new Co(gh(string)))
        gh(string)
        return new Co(gh(string))
    } catch {

    let teste = string.indexOf("i")
    let p = 1
    let n = string.indexOf("+")

    let car = (string[string.indexOf("i") - 1])
    teste2 = (car === "+" || car === "-" || car === undefined)
    //try {
    //    (gh(string[string.indexOf("i") - 1]))
    //    teste2 = 0
    //} catch {
    //    teste2 = 1
    //}
    
    if (string.indexOf("i") === -1) return new Co(gh(string))
    if (teste !== string.length - 1 && teste !== -1) throw new Error("Formatação inválida")

    if (n === -1) {
        n = string.lastIndexOf("-")
        //if (string[string.lastIndexOf("-") - 1] === "e") n = -1
        if (string[string.lastIndexOf("-") - 1] === "e") {
            n = string.slice(0, string.lastIndexOf("-") - 1).lastIndexOf("-")
        }
        p = -1
    }

    if (n === -1) {
        if (teste2 && string.length === 1) return new Co(0, 1)
        return new Co(0, gh(string.replace("i", "")))
    }

    //console.log(string)
    if (string.slice(0, n) !== "") {
        try {
            real = gh(string.slice(0, n))
        } catch {real = "erro"}
    } else real = 0
    try {
        imag = gh(string.slice(n, string.length - 1))
    } catch {imag = "erro"}

    if (teste2 && p === 1) imag = 1
    if (teste2 && p === -1) imag = -1
    if (real === "erro" ||imag === "erro") throw new Error("'a' ou 'b' são indefinidos")
    //console.log(string.slice(0, n), "qwugyeiuywqe", string.slice(n, string.length - 1))
    //console.log(string.indexOf("+"), string.indexOf("-"))
    return new Co(real, imag)
    }
}

//BRUTAL
//

function Ajuste(x) {
    if (!(x instanceof Co)) x = C(x)
    return x
}

const im = new Co(0, 1)
const PI = gh.acos(-1)

module.exports = {
    Co,
    im,
    C,
    Ajuste
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
//console.log(C(NaN))
//console.log(C("NaN"))

C(3).print()
