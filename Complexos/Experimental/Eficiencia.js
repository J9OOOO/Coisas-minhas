class Co {
    constructor(real, imag) {
        if (real instanceof Co) {
            if(imag !== undefined) throw new Error(`real inválido: ${real}`)
            this.real = real.real
            this.imag = real.imag
            return
        }

        /*if (typeof real === "object") {
            if (real && "real" in real && "imag" in real) {
                this.real = real.real
                this.imag = real.imag
                //Só não pode ter b, cuidado
                return
            }
        *///}
        if (imag === undefined) imag = 0
        if (!isFinite(real) || !isFinite(imag)) {
            throw new Error(`Resultado inválido: partes não finitas (${real}, ${imag})`)
        }
        
        this.real = Math.abs(real) < 1e-15 ? 0 : real
        this.imag = Math.abs(imag) < 1e-15 ? 0 : imag
    }

    static parser(real, imag) {
        return new Co(CpPpPpPpPp(real, imag))
    }

    add(b, b1) {
        //const r = Complexos.add({real: this.real, imag: this.imag}, CpPpPpPpPp(b))
        return Complexos.add({real: this.real, imag: this.imag}, CpPpPpPpPp(b, b1))
    }
    sub(b, b1) {
        //const r = Complexos.sub({real: this.real, imag: this.imag}, CpPpPpPpPp(b))
        return Complexos.sub({real: this.real, imag: this.imag}, CpPpPpPpPp(b, b1))
    }
    mul(b, b1) {
        //const r = Complexos.mul({real: this.real, imag: this.imag}, CpPpPpPpPp(b))
        return Complexos.mul({real: this.real, imag: this.imag}, CpPpPpPpPp(b, b1))
    }
    div(b, b1) {
        //const r = Complexos.div({real: this.real, imag: this.imag}, CpPpPpPpPp(b))
        return Complexos.div({real: this.real, imag: this.imag}, CpPpPpPpPp(b, b1))
    }
    inv() {
        return Complexos.inv({real: this.real, imag: this.imag})
    }
    pow(b, b1) {
        //const r = Complexos.pow({real: this.real, imag: this.imag}, CpPpPpPpPp(b))
        return Complexos.pow({real: this.real, imag: this.imag}, CpPpPpPpPp(b, b1))
    }
    hypot(b, b1) {
        return Complexos.hypot({real: this.real, imag: this.imag}, CpPpPpPpPp(b, b1))
    }
    pow2() {
        return Complexos.pow2({real: this.real, imag: this.imag})
    }
    pow3() {
        return Complexos.pow3({real: this.real, imag: this.imag})
    }
    sqrt() {
        return Complexos.sqrt({real: this.real, imag: this.imag})
    }
    cbrt() {
        return Complexos.cbrt({real: this.real, imag: this.imag})
    }
    sin() {
        return Complexos.sin({real: this.real, imag: this.imag})
    }
    cos() {
        return Complexos.cos({real: this.real, imag: this.imag})
    }
    tan() {
        return Complexos.tan({real: this.real, imag: this.imag})
    }
    asin() {
        return Complexos.asin({real: this.real, imag: this.imag})
    }
    acos() {
        return Complexos.acos({real: this.real, imag: this.imag})
    }
    atan() {
        return Complexos.atan({real: this.real, imag: this.imag})
    }
    exp() {
        return Complexos.exp({real: this.real, imag: this.imag})
    }
    ln() {
        return Complexos.ln({real: this.real, imag: this.imag})
    }
    sinh() {
        return Complexos.sinh({real: this.real, imag: this.imag})
    }
    cosh() {
        return Complexos.cosh({real: this.real, imag: this.imag})
    }
    tanh() {
        return Complexos.tanh({real: this.real, imag: this.imag})
    }
    sec() {
        return Complexos.cos({real: this.real, imag: this.imag}).inv()
    }
    csc() {
        return Complexos.sin({real: this.real, imag: this.imag}).inv()
    }
    cot() {
        return Complexos.tan({real: this.real, imag: this.imag}).inv()
    }
    sech() {
        return Complexos.cosh({real: this.real, imag: this.imag}).inv()
    }
    csch() {
        return Complexos.sinh({real: this.real, imag: this.imag}).inv()
    }
    coth() {
        return Complexos.tanh({real: this.real, imag: this.imag}).inv()
    }
    toObjectInternal() {
        return {real: this.real, imag: this.imag}
    }
    asinh() {
        return Complexos.asinh({real: this.real, imag: this.imag})
    }
    acosh() {
        return Complexos.acosh({real: this.real, imag: this.imag})
    }
    atanh() {
        return Complexos.atanh({real: this.real, imag: this.imag})
    }
    acsc() {
        return this.inv().asin()
    }
    asec() {
        return this.inv().acos()
    }
    acot() {
        return this.inv().atan()
    }
    acsch() {
        return this.inv().asinh()
    }
    asech() {
        return this.inv().acosh()
    }
    acoth() {
        return this.inv().atanh()
    }
    r() {
        return new Co(Math.hypot(this.real, this.imag))
    }
    theta() {
        return new Co(Math.atan2(this.imag, this.real))
    }
    neg() {
        return new Co(- this.real, - this.imag)
    }
    i() {
        return new Co(- this.imag, this.real)
    }
    in() {
        return new Co(this.imag, - this.real)
    }
    isReal() {
        return this.imag === 0
    }
    isImag() {
        return this.real === 0
    }
    isFinite() {
        return isFinite(this.real) && isFinite(this.imag)
    }
    isNaN() {
        return isNaN(this.real) || isNaN(this.imag)
    }
    norm() {
        return Complexos.norm({real: this.real, imag: this.imag})
    }
    rot(b, b1) {
        return this.mul(toInternalToCo(CpPpPpPpPp(b, b1)).i().exp())
    }
    eq(b, b1) {
        return eq(a, CpPpPpPpPp(b, b1))
    }
    noeq(b, b1) {
        return !eq(a, CpPpPpPpPp(b, b1))
    }
    toArray() {
        return [this.real, this.imag]
    }
    toObject(tipo = "Cartesian") {
        if (tipo === "Cartesian") return {real: this.real, imag: this.imag}
        if (tipo === "CartesianSmall") return {re: this.real, im: this.imag}
        if (tipo === "PolarR") return {r: Math.hypot(this.real, this.imag), phi: Math.atan2(this.imag, this.real)}
        if (tipo === "PolarABS") return {abs: Math.hypot(this.real, this.imag), arg: Math.atan2(this.imag, this.real)}
        throw new Error(`Tipo inválido: ${tipo}`)
    }
    toJSON(tipo = "Cartesian") {
        if (tipo === "Cartesian") return {real: this.real.toString(), imag: this.imag.toString()}
        if (tipo === "CartesianSmall") return {re: this.real.toString(), im: this.imag.toString()}
        if (tipo === "PolarR") return {r: Math.hypot(this.real, this.imag).toString(), phi: Math.atan2(this.imag, this.real).toString()}
        if (tipo === "PolarABS") return {abs: Math.hypot(this.real, this.imag).toString(), arg: Math.atan2(this.imag, this.real).toString()}
        throw new Error(`Tipo inválido: ${tipo}`)
    }
    toString(tipo = "Cartesian") {
        if (tipo === "Cartesian") {
            if (this.imag === 0) return `${this.real}`
            if (this.real === 0 && this.imag === 1) return `i`
            if (this.real === 0 && this.imag === -1) return `-i`
            if (this.real === 0) return `${this.imag}i`
            if (this.imag === 1) return `${this.real} + i`
            if (this.imag === -1) return `${this.real} - i`
            if (this.imag < 0) return `${this.real} - ${Math.abs(this.imag)}i`
            return `${this.real} + ${this.imag}i`
        }
        if (tipo === "Euler") {
            let r = Math.hypot(this.real, this.imag)
            let arg = Math.atan2(this.imag, this.real)
            if (arg === 0) return `${r}`
            if (r === 0) return `0`
            if (r === 1 && arg === 1) return `e ** i`
            if (r === 1 && arg === -1) return `e ** (-i)`
            if (r === 1 && arg !== 1 && arg !== -1) return `e ** (${arg}i)`
            if (arg === 1) return `${r} * e ** i`
            if (arg === -1) return `${r} * e ** (-i)`
            return `${r} * e ** (${arg}i)`
        }
        if (tipo === "PolarSy") {
            let r = Math.hypot(this.real, this.imag)
            let arg = Math.atan2(this.imag, this.real)
            return `${r} ∠ ${arg}`
        }
        if (tipo === "PolarChar") {
            let r = Math.hypot(this.real, this.imag)
            let arg = Math.atan2(this.imag, this.real)
            return `${r} r ${arg}`
        }
        throw new Error(`Tipo inválido: ${tipo}`)
    }
    print(tipo) {
        console.log(this.toString(tipo))
    }
}

//const RX = /^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)([+-])((?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)?i$/i

function CpPpPpPpPp(a, b) {
    if (a === undefined) throw new Error(`a inválido: ${a}`)
    if (a instanceof Co) if (b !== undefined) {throw new Error("sadfioj")} else {return {real: a.real, imag: a.imag}}
    //let RealP = Number(a)
    //if (!isNaN(RealP)) return {real: RealP, imag: 0}
    let unb = b === undefined

    //if (a instanceof Co && unb) return ({real: a.real, imag: a.imag})
    let Ta = typeof a

    if (unb) {

        if (Ta === "string") {
            let RealP = Number(a)
            if (!isNaN(RealP)) return {real: RealP, imag: 0}

            //a = a.replace("I", "i")
            if (a[a.length - 1] !== "i" && a[a.length - 1] !== "I") throw new Error(`String inválida: ${a}`)

            let ImagP = Number(a.slice(0, a.length - 1))
            if (!isNaN(ImagP)) return {real: 0, imag: ImagP}
            
            if (a === "i" || a === "I") return {real: 0, imag: 1}
            if (a === "-i" || a === "-I") return {real: 0, imag: -1}



            let Sinal, Operador

            let Mais = a.lastIndexOf("+")
            let Menos = a.lastIndexOf("-")

            if (Mais !== 0 && a[Mais - 1] === "e") Mais = a.slice(0, Mais - 1).lastIndexOf("+")
            if (a[Menos - 1] === "e") {Menos = a.slice(0, Menos - 1).lastIndexOf("-")} else if (Menos !== -1 && Menos !== 0) {Operador = Menos}

            if (Operador === undefined && Mais !== -1 && Mais !== 0) {Sinal = 1; Operador = Mais} else {Sinal = -1; Operador = Menos}
            
            //console.log(a.slice(0, Operador)," ", Operador + 1, a.length - 1)

            let Real = Number(a.slice(0, Operador))
            let ImagS = a.slice(Operador + 1, a.length - 1)
            let Imag = ImagS === ""? Sinal : Number(ImagS) * Sinal
            //console.log(Operador)
            //console.log(Operador)
            //console.log(Real, Imag)
            if (isNaN(Real) || isNaN(Imag)) throw new Error(`Valor(es) de entrada inválido(s): ${a}, ${b}`)
            return {real: Real, imag: Imag}
        }

        if (Ta === "object") {
            if (a && "real" in a && "imag" in a) {
                if (isNaN(a.real + a.imag)) throw new Error(`Argumento(s) inválido(s): ${a}, ${b}`)
                return { real: a.real, imag: a.imag }
            }

            if (a && "abs" in a && "arg" in a) {
                if (isNaN(a.abs + a.arg)) throw new Error(`Argumento(s) inválido(s): ${a}, ${b}`)
                return {
                    real: a.abs * Math.cos(a.arg),
                    imag: a.abs * Math.sin(a.arg)
                }
            }

            if (a && "r" in a && "phi" in a) {
                if (isNaN(a.r + a.phi)) throw new Error(`Argumento(s) inválido(s): ${a}, ${b}`)
                return {
                    real: a.r * Math.cos(a.phi),
                    imag: a.r * Math.sin(a.phi)
                }
            }

            if (Array.isArray(a) && a.length === 2) {
                return { real: Number(a[0]), imag: Number(a[1]) }
            }
        }

        if (Ta === "number") {
            if (!isNaN(a) && a !== undefined) return {real: a, imag: 0}
            throw new Error("NaN em: 'a' ")
        }
        throw new Error(`Valor / tipo de 'a' é indefinido: ${Ta}, ${a}`)

    } else {
    a = Number(a)
    b = Number(b)
    if (isNaN(a) || isNaN(b) || a === undefined) throw new Error(`Valor(es) de entrada inválido(s): ${a}, ${b}`)
    return {real: a, imag: b}
    }
}

Co["PI"] = new Co(Math.PI)
Co["E"] = new Co(Math.E)

Co["TAU"] = new Co(Math.PI * 2)

Co["SQRT2"] = new Co(Math.SQRT2)
Co["SQRT3"] = new Co(Math.sqrt(3))
Co["SQRT5"] = new Co(Math.sqrt(5))

Co["LN10"] = new Co(Math.LN10)
Co["LN2"] = new Co(Math.LN2)
Co["LOG10E"] = new Co(Math.LOG10E)
Co["PHI"] = new Co((1 + Math.sqrt(5)) / 2)

Co["PI_2"] = new Co(Math.PI / 2)
Co["PI_3"] = new Co(Math.PI / 3)
Co["PI_4"] = new Co(Math.PI / 4)

Co["I"] = new Co(0, 1)
Co["MINUS_I"] = new Co(0, -1)

Co["ONE"] = new Co(1)
Co["MINUS_ONE"] = new Co(-1)
Co["ZERO"] = new Co(0)

//console.log(CpPpPpPpPp(1))
//console.log(CpPpPpPpPp(1, 0))
//console.log(CpPpPpPpPp("1"))
//console.log(CpPpPpPpPp({real: 1, imag: 0}))
//console.log(CpPpPpPpPp({abs: 1, arg: 0}))
//console.log(CpPpPpPpPp({r: 1, phi: 0}))

const Complexos = {
    add(a, b) {
        //a = CpPpPpPpPp(a)
        //console.log(b)
        //b = CpPpPpPpPp(b)
        return new Co(a.real + b.real, a.imag + b.imag)
    },
    sub(a, b) {
        //a = CpPpPpPpPp(a)
        //b = CpPpPpPpPp(b)
        return new Co(a.real - b.real, a.imag - b.imag)
    },
    mul(a, b) {
        //b = CpPpPpPpPp(b)
        let ra = isReal(a)
        let rb = isReal(b)

        if (isZero(a) || isZero(b)) return new Co(0, 0);
        
        if (ra) {
            if (rb) return new Co(a.real * b.real, 0);
            return new Co(a.real * b.real, a.real * b.imag);
        }

        if (rb) return new Co(a.real * b.real, a.imag * b.real);

        if (isImag(a) && isImag(b)) return new Co({real: -a.imag * b.imag, imag: 0});

        return new Co(a.real * b.real - a.imag * b.imag, a.real * b.imag + a.imag * b.real);
    },
    div(a, b) {
        if (isZero(b)) throw new Error("Divisão por zero")

        if (isZero(a)) return new Co(0, 0)

        const ar = a.real
        const ai = a.imag

        const br = b.real
        const bi = b.imag

        if (isReal(b)) {
            const inv = 1 / br

            return new Co(ar * inv, ai * inv)
        }

        const inv = invSq(br, bi)

        return new Co((ar * br + ai * bi) * inv, (ai * br - ar * bi) * inv)
    },
    pow(a, b) {
        let a0r = a.real === 0
        let a0i = a.imag === 0

        if (a.real === 1 && a0i) return One

        let b0 = b.imag === 0

        if (a0r && a.imag === 1) {
            if (b0 && Number.isInteger(b.real) && b.real > 0)
            switch (b.real % 4) {
                case 0: 
                    return One
                case 1:
                    return im
                case 2: 
                    return new Co(-1, 0)
                case 3: 
                    return new Co(0, -1)
            }
        }

        if (a0i && b0 && a.real > 0) return new Co(a.real ** b.real, 0)
        if (a0r && a0i) {if (b.real > 0 && !b0) {return Zero} else {throw new Error("Base zero e expoente menor ou igual a 0")}}

        let r_z2 = (0.5) * Math.log(a.real * a.real + a.imag * a.imag)
        let theta_z = Math.atan2(a.imag, a.real)
        let phi = b.imag * r_z2 + theta_z * b.real
        let r = Math.exp(b.real * r_z2 - theta_z * b.imag)
        return new Co(r * Math.cos(phi), r * Math.sin(phi))
    },
    nrt(a, b) {
        let r_zn = (Math.hypot(a.real, a.imag)) ** (1 / b.real)
        let phi = Math.atan2(a.imag, a.real) / b.real
        return new Co(r_zn * Math.cos(phi), r_zn * Math.sin(phi))
    },
    sqrt(a) {
        const x = a.real;
        const y = a.imag;
        if (y === 0) {
            if (x >= 0) return new Co(Math.sqrt(x), 0);
            return new Co(0, Math.sqrt(-x));
        }

        const r = Math.hypot(x, y);
        let re = Math.sqrt(0.5 * (r + Math.abs(x)));
        let im = Math.abs(y) / (2 * re);

        if (x >= 0) return new Co(re, y < 0 ? -im : im);
        return new Co(im, y < 0 ? -re : re);
    },
    cbrt(a) {
        const x = a.real;
        const y = a.imag;

        if (y === 0) {
            if (x < 0) {
                let x1 = Math.cbrt(x)
                return new Co(x1, SQRT3 * x1)
            }
            return new Co(Math.cbrt(x), 0);
        }

        const r = Math.hypot(x, y);
        const phi = Math.atan2(y, x) / 3;
        const t = Math.cbrt(r);

        return new Co(t * Math.cos(phi), t * Math.sin(phi));
    },
    sin(a) {
        if (a.imag === 0) return new Co(Math.sin(a.real), 0)
        if (a.real === 0) return new Co(0,  Math.sinh(a.imag))
        return new Co(Math.sin(a.real) * Math.cosh(a.imag), Math.cos(a.real) * Math.sinh(a.imag))
    },
    cos(a) {
        if (a.imag === 0) return new Co(Math.cos(a.real))
        if (a.real === 0) return new Co(Math.cosh(a.imag))
        return new Co(Math.cos(a.real) * Math.cosh(a.imag), - Math.sin(a.real) * Math.sinh(a.imag))
    },
    tan(a) {
        if (a.imag === 0) return new Co(Math.tan(a.real))
        if (a.real === 0) return new Co(0, Math.tanh(a.imag))
        let real2 = 2 * a.real
        let imag2 = 2 * a.imag
        let demINV = 1 / (Math.cos(real2) + Math.cosh(imag2))
        console.log(Math.sinh(imag2))
        return new Co(Math.sin(real2) * demINV, Math.sinh(imag2) * demINV)
    },
    asin(a) {
        if (a.real === 0) return new Co(0, Math.asinh(a.imag))
        if (a.imag === 0) {
            if (a.real <= 1 && a.real >= -1) return new Co(Math.asin(a.real))
            let real, imag
            let sig = a.real < 0 ? -1 : 1
            let inln = a.real + sqrt_x2m1(a.real)
            if (inln >= 0) {
                imag = - Math.log(inln)
                real = sig === 1 ? PI_2 : - 3 * PI_2
                return new Co(real, imag)
            }
            imag = - Math.log(Math.abs(inln))
            real = sig === 1 ? PI_2 : - PI_2
            return new Co(real, imag)
        }

        const x = a.real;
        const y = a.imag;
        const u = Math.hypot(x + 1, y);
        const v = Math.hypot(x - 1, y);
        const alpha = 0.5 * (u + v);

        const realPart = Math.asin(0.5 * (u - v));
        const imagPart = Math.sign(y) * Math.log(alpha + Math.sqrt((alpha - 1) * (alpha + 1)));

        return new Co(realPart, imagPart);
    },
    acos(a) {
        if (a.real === 0) return new Co(Math.acosh(a.imag))
        if (a.imag === 0) {
            if (a.real <= 1 && a.real >= -1) return new Co(Math.acos(a.real))
            let real, imag
            let sig = a.real < 0 ? -1 : 1
            let inln = a.real + sqrt_x2m1(a.real)
            if (inln >= 0) {
                imag = - Math.log(inln)
                real = sig === 1 ? PI_2 : - 3 * PI_2
                return new Co(PI_2 - real, - imag)
            }
            imag = - Math.log(Math.abs(inln))
            real = sig === 1 ? PI_2 : - PI_2
            return new Co(PI_2 - real, - imag)
        }

        const x = a.real;
        const y = a.imag;
        const u = Math.hypot(x + 1, y);
        const v = Math.hypot(x - 1, y);
        const alpha = 0.5 * (u + v);

        const realPart = Math.asin(0.5 * (u - v));
        const imagPart = Math.sign(y) * Math.log(alpha + Math.sqrt((alpha - 1) * (alpha + 1)));

        return new Co(PI_2 - realPart, - imagPart);
    },
    atan(a) {
        const x = a.real;
        const y = a.imag;

        if (y === 0) return new Co(Math.atan(x), 0);
        if (x === 0) return new Co(0, Math.atanh(y)); 

        const r1 = Math.hypot(x, y + 1);
        const r2 = Math.hypot(x, y - 1);
        
        const realPart = 0.5 * Math.atan2(2 * x, 1 - Math.hypot(x, y));

        const imagPart = 0.5 * Math.log(r1 / r2);

        return new Co(realPart, imagPart);
    },
    exp(a) {
        if (a.imag === 0) return new Co(Math.exp(a.real))
        if (a.real === 0) return new Co(Math.cos(a.imag), Math.sin(a.imag))
        let expAreal = Math.exp(a.real)
        return new Co(expAreal * Math.cos(a.imag), expAreal * Math.sin(a.imag))
    },
    ln(a) {
        if (a.real === 0 && a.imag === 0) throw new Error("ln(0) não é válido")
        if (a.imag === 0) {
            if (a.real > 0) return new Co(Math.log(a.real))
            return new Co(Math.log(- a.real), Math.PI)
        }
        if (a.real === 0) {
            if (a.imag > 0) return new Co(Math.log(a.imag), PI_2)
            return new Co(Math.log(- a.imag), - PI_2)
        }
        let real = Math.log(Math.hypot(a.real, a.imag))
        return new Co(real, Math.atan2(a.imag, a.real))
    },
    sinh(a) {
        const x = a.real
        const y = a.imag
        if (y === 0) return new Co(Math.sinh(x))
        if (x === 0) return new Co(0, Math.sin(y))
        return new Co(Math.cos(y) * Math.sinh(x), Math.sin(y) * Math.cosh(x))
    },
    cosh(a) {
        if (a.imag === 0) return new Co(Math.cosh(a.real))

        const x = a.real;
        const y = a.imag;
        return new Co(Math.cosh(x) * Math.cos(y), Math.sinh(x) * Math.sin(y));
    },
    tanh(a) {
        const x = a.real;
        const y = a.imag;

        if (y === 0) return new Co(Math.tanh(x), 0);
        if (x === 0) return new Co(0, Math.tan(y));

        const x2 = 2 * x;
        const y2 = 2 * y;
        
        const demINV = 1 / (Math.cosh(x2) + Math.cos(y2)); 
        
        return new Co(Math.sinh(x2) * demINV, Math.sin(y2) * demINV);
    },
    inv(a) {
        if (isZero(a)) throw new Error("Divisão por zero")

        let ra = isReal(a)

        if (ra) {
            return new Co(1 / a.real, 0)
        }

        const x = a.real
        const y = a.imag

        const inv = invSq(x, y)

        return new Co(x * inv, - y * inv)
    },
    asinh(a) {
        const x = a.real, y = a.imag;

        if (y === 0) return new Co(Math.asinh(x), 0);
        if (x === 0) return new Co(0, Math.asin(y));

        let rp = Math.hypot(x + 1, y)
        let rm = Math.hypot(x - 1, y)

        return new Co(Math.sign(x) * Math.acosh((rp + rm) * 0.5), Math.asin((rp - rm) * 0.5))
    },
    acosh(a) {
        const x = a.real;
        const y = a.imag;

        if (y === 0) {
            if (x === 1) return new Co(0);
            if (x > 1) return new Co(Math.acosh(x), 0);
            if (x >= -1) return new Co(0, Math.acos(x)); 
            return new Co(Math.acosh(-x), Math.PI);
        }
        if (x === 0) {
            return new Co(0, Math.acos(y)); 
        }

        let rp = Math.hypot(x + 1, y)
        let rm = Math.hypot(x - 1, y)

        return new Co(Math.acosh((rp + rm) * 0.5), Math.sign(y) * Math.acos((rp - rm) * 0.5))
    },
    atanh(a) {
        const x = a.real;
        const y = a.imag;

        if (y === 0) {
            if (x >= -1 && x <= 1) return new Co(Math.atanh(x), 0);
        }
        if (x === 0) {
            return new Co(0, Math.atan(y));
        }

        let y1 = y * y
        let x2 = Math.log(((x + 1) * (x + 1) + y1) / ((x - 1) * (x - 1) + y1)) * 0.25
        let x3 = Math.atan2(2 * y, 1 - x * x - y1) * 0.5
        return new Co(x2, x3)
    },
    hypot(a, b) {
        //Não pense muito sobre o nome...
        if (a.real === 0 && a.imag === 0) return new Co(a.real, a.imag).sqrt()
        if (b.real === 0 && b.imag === 0) return new Co(b.real, b.imag).sqrt()
        let c = Complexos.pow2(a).add(Complexos.pow2(b))
        return c.sqrt()
    },
    pow2(a) {
        //Eu não faria isso...
        const x = a.real
        const y = a.imag

        if (y === 0) return new Co(x * x)
        if (x === 0) return new Co(- y * y)
        return new Co((x + y) * (x - y), 2 * x * y)
    },
    pow3(a) {
        const x = a.real
        const y = a.imag

        if (y === 0) return new Co(x * x * x)
        if (x === 0) return new Co(0, y * y * y)
        return new Co(x * (x * x - 3 * y * y),  y * (3 * x * x - y * y))
    },
    norm(a) {
        const x = a.real
        const y = a.imag

        if(x === 0 && y === 0) return new Co(0)

        let inv = 1 / (Math.hypot(x, y))
        return new Co(x * inv, y * inv)
    },
}

function isZero(a) {
    if (a.real === 0 && a.imag === 0) {
        return true
    } else return false
}

function isReal(a) {
    if (a.imag === 0) {
        return true
    } else return false
}

function isImag(a) {
    if (a.real === 0 && a.imag !== 0) {
        return true
    } else return false
}

function eq(a, b) {
    if (a.real === b.real && a.imag === b.imag) {
        return true
    } else return false
}

function toInternalToCo(a) {
    return new Co(a.real, a.imag)
}


function sqrt_x2m1(x)
{
    let ax = Math.abs(x);
    if (ax < 1.0) {
        return NaN;
    }

    if (ax < 1e8) {
        return Math.sqrt(ax * ax - 1.0);
    }

    let r = 1.0 / ax;
    return ax * Math.sqrt(1.0 - r * r);
}

function invSq(a, b) {
    const m = Math.max(Math.abs(a), Math.abs(b));

    if (m === 0) throw new Error("Divisão por zero");

    const u = a / m;
    const v = b / m;

    return (1 / m) / (m * (u * u + v * v));
}

const im = new Co(0, 1)
const One = new Co(1, 0)
const Zero = new Co(0, 0)

//console.log(Complexos.add("1+i", "1+23i"))
//console.log(new Co(1, 0).div("4i"))

function bench(nome, fn, N = 1e6, aquec = 1e5) {
    // Aquecimento — JIT compila antes de medir
    for (let i = 0; i < aquec; i++) fn(i)

    // Medição
    const t0 = process.hrtime.bigint()
    for (let i = 0; i < N; i++) fn(i)
    const t1 = process.hrtime.bigint()

    const ns = Number(t1 - t0) / N
    console.log(`${nome.padEnd(20)} ${ns.toFixed(2)} ns/op   (${N} iterações)`)
    return ns
}

const PI_2 = Math.PI / 2
const SQRT3 = Math.sqrt(3)

//let a = new Co(1.934441834, 0)
//let b = new Co(1.91834, 12.134134)

//let ab = new Co(1, 2)

//bench("a",  () => ab.sqrt())

//console.log(ab.sqrt().pow(2))

let ab = new Co(1, 2)
let x = 1

//bench("a",  () => {x += 0.00001; Complexos.add({real: 1, imag: 2},{real: x, imag: 2})})
//bench("a",  () => {x += 0.00001; new Co(x, 1 + x).cbrt()})

//console.log(new Co(132, 1).rot(Math.PI))

module.exports = {
    Co
}
