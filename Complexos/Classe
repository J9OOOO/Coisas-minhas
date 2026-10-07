class Co {
    constructor(real, imag) {
        if (real instanceof Co) {
            this.real = real.real
            this.imag = real.imag
            return
        }
        if (imag === undefined) imag = 0
        this.real = real
        this.imag = imag
    }

    static Polar(r, theta) {
        if (r instanceof Co) {
            return new Co(r)
        }
        if (theta === undefined) theta = 0
        return new Co(r * Math.cos(theta), r * Math.sin(theta))
    }

    add(b) {
        return new Co(this.real + b.real, this.imag + b.imag)
    }
    sub(b) {
        return new Co(this.real - b.real, this.imag - b.imag)
    }
    mul(b) {
        return new Co(this.real * b.real - this.imag * b.imag, this.real * b.imag + this.imag * b.real)
    }
    div(b) {
        let denom = b.real * b.real + b.imag * b.imag
        if (denom === 0) throw new Error("Divisão por zero")
        return new Co((this.real * b.real + this.imag * b.imag) / denom, (this.imag * b.real - this.real * b.imag) / denom)
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
        if (r.real === 0) throw new Error("ln(0) não é definido")
        return new Co(Math.log(r.real), this.theta().real)
    }
    pow(b) {
        let a = (b.mul(this.ln())).exp()
        if (isNaN(a.real) || isNaN(a.imag)) throw new Error("Resultado inválido")
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
    nrt(n) {
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
        return (this.ln().div(new Co(Math.log(n))))
    }
    print() {
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
        return this.imag === 0
    }
    isImag() {
        return (this.real === 0 && this.imag !== 0)
    }
    eq(b) {
        return (this.real === b.real && this.imag === b.imag)
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
    arcsinh() {
        return ((this.mul(this)).add(C(1)).sqrt().add(this)).ln()
    }
    arccosh() {
        return ((this.mul(this)).sub(C(1)).sqrt().add(this)).ln()
    }
}

//
function C(string) {
    //console.log(Number(string))
    if (string instanceof Co) return new Co(string)
    if (!isNaN(Number(string))) return new Co(Number(string))
    let teste = string.indexOf("i")
    let p = 1
    let n = string.indexOf("+")
    let teste2 = isNaN(Number(string[string.indexOf("i") - 1]))

    if (string.indexOf("i") === -1) return new Co(Number(string))
    if (teste !== string.length - 1 && teste !== -1) throw new Error("Formatação inválida")

    if (n === -1) {
        n = string.lastIndexOf("-")
        p = -1
    }

    if (n === -1) {
        if (teste2) return new Co(0, 1)
        return new Co(0, Number(string.replace("i", "")))
    }

    let real = Number(string.slice(0, n))
    let imag = Number(string.slice(n, string.length - 1))

    if (teste2 && p === 1) imag = 1
    if (teste2 && p === -1) imag = -1
    //console.log(string.slice(0, n), "qwugyeiuywqe", string.slice(n, string.length - 1))
    //console.log(string.indexOf("+"), string.indexOf("-"))
    return new Co(real, imag)
}

//BRUTAL
//

const im = new Co(0, 1)

module.exports = {
    Co,
    im,
    C
}
