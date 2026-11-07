package Sla;
import org.apfloat.*;

public class Sla {
    public static Apfloat ap(Object a, long p) {
        if (a instanceof Apfloat b) {
            return b;
        }
        if (a instanceof String s) {
            return new Apfloat(s, p);
        }
        if (a instanceof Number n) {
            return new Apfloat(n.toString(), p);
        }

        throw new IllegalArgumentException("Argumento inválido: " + a + "    (" + a.getClass().getName() + ")");
    }

    public static class Decimal {
        private final Apfloat valor;
        private static long p1 = 100;

        public static void setPrecision(long p) {
            if (p < 1) {
                throw new IllegalArgumentException("Precisão inválida");
            }
            p1 = p;
            Decimal.updateConstants();
        }
        
        public Decimal (Object a) {
            if (a instanceof Decimal d) {
                this.valor = d.valor;
            } else {
                this.valor = ap(a, p1);
            }
        }

        public Decimal add(Object b) {
            return new Decimal(this.valor.add(new Decimal(b).valor));
        }

        public Decimal sub(Object b) {
            return new Decimal(this.valor.subtract(new Decimal(b).valor));
        }

        public Decimal mul(Object b) {
            return new Decimal(this.valor.multiply(new Decimal(b).valor));
        }

        public Decimal div(Object b) {
            return new Decimal(this.valor.divide(new Decimal(b).valor));
        }

        public Decimal inv() {
            return new Decimal(ONE.valor.divide(this.valor));
        }

        public Decimal sqrt() {
            return new Decimal(ApfloatMath.sqrt(this.valor));
        }

        public Decimal cbrt() {
            return new Decimal(ApfloatMath.cbrt(this.valor));
        }

        public Decimal exp() {
            return new Decimal(ApfloatMath.exp(this.valor));
        }

        public Decimal ln() {
            return new Decimal(ApfloatMath.log(this.valor));
        }

        public Decimal log() {
            return new Decimal(this.ln().div(new Decimal(10).ln()));
        }

        public Decimal pow(Object b) {
            return new Decimal(ApfloatMath.pow(this.valor, new Decimal(b).valor));
        }

        public Decimal sin() {
            return new Decimal(ApfloatMath.sin(this.valor));
        }

        public Decimal cos() {
            return new Decimal(ApfloatMath.cos(this.valor));
        }

        public Decimal tan() {
            return new Decimal(ApfloatMath.tan(this.valor));
        }

        public Decimal asin() {
            return new Decimal(ApfloatMath.asin(this.valor));
        }

        public Decimal acos() {
            return new Decimal(ApfloatMath.acos(this.valor));
        }

        public Decimal atan() {
            return new Decimal(ApfloatMath.atan(this.valor));
        }

        public Decimal atan2(Object b) {
            return new Decimal(ApfloatMath.atan2(this.valor, new Decimal(b).valor));
        }

        public Decimal sinh() {
            return new Decimal(ApfloatMath.sinh(this.valor));
        }

        public Decimal cosh() {
            return new Decimal(ApfloatMath.cosh(this.valor));
        }

        public Decimal tanh() {
            return new Decimal(ApfloatMath.tanh(this.valor));
        }

        public Decimal asinh() {
            return new Decimal(ApfloatMath.asinh(this.valor));
        }

        public Decimal acosh() {
            return new Decimal(ApfloatMath.acosh(this.valor));
        }

        public Decimal atanh() {
            return new Decimal(ApfloatMath.atanh(this.valor));
        }

        public Decimal floor() {
            return new Decimal(this.valor.floor());
        }

        public Decimal ceil() {
            return new Decimal(this.valor.ceil());
        }

        public Decimal abs() {
            return new Decimal(ApfloatMath.abs(this.valor));
        }

        public Decimal neg() {
            return new Decimal(this.valor.negate());
        }

        public Decimal sec() {
            return new Decimal(this.cos().inv());
        }

        public Decimal csc() {
            return new Decimal(this.sin().inv());
        }

        public Decimal cot() {
            return new Decimal(this.tan().inv());
        }

        public Decimal asec() {
            return new Decimal(this.inv().acos());
        }

        public Decimal acsc() {
            return new Decimal(this.inv().asin());
        }

        public Decimal acot() {
            if (this.gt(0)) {
                return this.inv().atan();
            }
            if (this.lt(0)) {
                return this.inv().atan().add(GetPI());
            }
            return GetPI().div(2);
        }

        public Decimal sech() {
            return new Decimal(this.cosh().inv());
        }

        public Decimal csch() {
            return new Decimal(this.sinh().inv());
        }

        public Decimal coth() {
            return new Decimal(this.tanh().inv());
        }

        public Decimal asech() {
            return new Decimal(this.inv().acosh());
        }

        public Decimal acsch() {
            return new Decimal(this.inv().asinh());
        }

        public Decimal acoth() {
            if (this.abs().gt(1)) {
                return this.inv().atanh();
            }
            throw new ArithmeticException("acoth indefinido para |x| <= 1");
        }

        public Decimal log2() {
            return new Decimal(this.ln().div(new Decimal(2).ln()));
        }

        public Decimal sign() {
            if (this.eq(0)) {
                return new Decimal(0);
            }
            if (this.gt(0)) {
                return new Decimal(1);
            }
            return new Decimal(-1);
        }

        public Decimal logn(Object b) {
            return new Decimal(this.ln().div(new Decimal(b).ln()));
        }

        public Decimal toPrecision(long p) {
            return new Decimal(this.valor.precision(p));
        }

        public Decimal min(Object b) {
            Decimal bDecimal = new Decimal(b);
            return this.lt(bDecimal) ? this : bDecimal;
        }

        public Decimal max(Object b) {
            Decimal bDecimal = new Decimal(b);
            return this.gt(bDecimal) ? this : bDecimal;
        }

        public Decimal hypot(Object b) {
            Decimal x = new Decimal(b).abs();
            Decimal y = this.abs();

            Decimal max = x.gt(y) ? x : y;
            Decimal min = x.gt(y) ? y : x;

            if (max.eq(0)) return GetZERO();

            return max.mul(
                GetONE().add(min.div(max).pow(2)).sqrt()
            );
        }

        public Decimal nrt(Object b) {
            if (new Decimal(b).eq(0)) {
                throw new ArithmeticException("Raiz de índice zero");
            }
            return this.pow(new Decimal(b).inv());
        }

        public Decimal lnh() {
            //logaritmo natural hiperbólico (verão experimental)
            //MANO EU NEM O QUE EU ESTOU FAZENDO☠️☠️
            Decimal n = new Decimal(1);
            Decimal s = new Decimal(0);
            do {
                s = s.add(n.pow(this.inv().sub(2)).mul(new Decimal(-1).pow(n)).div(n));
                n = n.add(1);
            } while(n.lt(Math.max(250, p1)));
            return s;
        }

        public boolean eq(Object b) {
            return this.valor.compareTo(new Decimal(b).valor) == 0;
        }

        public boolean lt(Object b) {
            return this.valor.compareTo(new Decimal(b).valor) < 0;
        }

        public boolean gt(Object b) {
            return this.valor.compareTo(new Decimal(b).valor) > 0;
        }

        public boolean neq(Object b) {
            return this.valor.compareTo(new Decimal(b).valor) != 0;
        }

        public boolean lte(Object b) {
            return this.valor.compareTo(new Decimal(b).valor) <= 0;
        }

        public boolean gte(Object b) {
            return this.valor.compareTo(new Decimal(b).valor) >= 0;
        }

        public boolean isZero() {
            return this.eq(0);
        }

        public boolean isPositive() {
            return this.gt(0);
        }

        public boolean isNegative() {
            return this.lt(0);
        }

        public String toString() {
            return this.valor.toString(true);
        }
        
        public static PorP PI;
        public static PorP E;
        public static PorP PHI;
        public static PorP SQRT2;
        public static PorP SQRT3;
        public static PorP SQRT5;
        public static PorP LN2;
        public static PorP LN10;
        public static PorP TAU;
        
        public static final Decimal ONE = new Decimal(1);
        public static final Decimal ZERO = new Decimal(0);
        public static final Decimal NEG_ONE = new Decimal(-1);

        public static void updateConstants() {
            PI = new PorP(new Decimal(-1).acos(), p1);
            E = new PorP(new Decimal(1).exp(), p1);
            PHI = new PorP(new Decimal(5).sqrt().add(1).div(2), p1);
            SQRT2 = new PorP(new Decimal(2).sqrt(), p1);
            SQRT3 = new PorP(new Decimal(3).sqrt(), p1);
            SQRT5 = new PorP(new Decimal(5).sqrt(), p1);
            LN2 = new PorP(new Decimal(2).ln(), p1);
            LN10 = new PorP(new Decimal(10).ln(), p1);
            TAU = new PorP(new Decimal(2).mul(GetPI()), p1);
        }

        public static Decimal GetPI() {
            PI.CheckPrecision(p1);
            return PI.var;
        }

        public static Decimal GetE() {
            E.CheckPrecision(p1);
            return E.var;
        }

        public static Decimal GetPHI() {
            PHI.CheckPrecision(p1);
            return PHI.var;
        }

        public static Decimal GetSQRT2() {
            SQRT2.CheckPrecision(p1);
            return SQRT2.var;
        }

        public static Decimal GetSQRT3() {
            SQRT3.CheckPrecision(p1);
            return SQRT3.var;
        }

        public static Decimal GetSQRT5() {
            SQRT5.CheckPrecision(p1);
            return SQRT5.var;
        }

        public static Decimal GetLN2() {
            LN2.CheckPrecision(p1);
            return LN2.var;
        }

        public static Decimal GetLN10() {
            LN10.CheckPrecision(p1);
            return LN10.var;
        }

        public static Decimal GetTAU() {
            TAU.CheckPrecision(p1);
            return TAU.var;
        }

        public static Decimal GetONE() {
            return ONE;
        }

        public static Decimal GetZERO() {
            return ZERO;
        }

        static {
            updateConstants();
        }
    }

    public static class PorP {
        Decimal var;
        long p;

        public PorP(Decimal var, long p) {
            this.var = var;
            this.p = p;
        }

        void CheckPrecision(long p1) {
            if (p != p1) {
                throw new IllegalStateException("A precisão da constante não corresponde à precisão atual.");
            }
        }
    }

    public static void main(String[] args) {
        Decimal a = (new Decimal((new Decimal((new Decimal((2))).log())).add(new Decimal((new Decimal((2))).log())))).add(new Decimal((new Decimal(((new Decimal((new Decimal((new Decimal(2)).pow(new Decimal(2)))).mul(new Decimal(2)))).add(new Decimal(1))))).sin()));
        System.out.println(a);
    }
}
