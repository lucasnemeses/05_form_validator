class CPFValidator {
    constructor(cpf) {
        Object.defineProperty(this, 'cpfClear', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpf.replace(/\D+/g, '')
        });
    }

    isSequence() {
        return this.cpfClear.charAt(0).repeat(11) === this.cpfClear;
    }

    generateNewCPF() {
        const cpfWithDigits = this.cpfClear.slice(0, -2);
        const digit1 = CPFValidator.generateDigit(cpfWithDigits);
        const digit2 = CPFValidator.generateDigit(cpfWithDigits + digit1);
        this.newCPF = cpfWithDigits + digit1 + digit2;
    }

    static generateDigit(cpfWithDigits) {
        let total = 0;
        let reverse = cpfWithDigits.length + 1;

        for (let stringNumeric of cpfWithDigits) {
            total += reverse * Number(stringNumeric);
            reverse--;
        }

        const digit = 11 - (total % 11);
        return digit <= 9 ? String(digit) : '0';
    }

    validate() {
        if (!this.cpfClear) return false;
        if (typeof this.cpfClear !== 'string') return false;
        if (this.cpfClear.length !== 11) return false;
        if (this.isSequence()) return false;
        this.generateNewCPF();
        return this.newCPF === this.cpfClear;
    }
}