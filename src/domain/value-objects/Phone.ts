export class Phone {
    constructor(private readonly value: string) {
        if (!/^034|033|032|038/.test(value)) {
            throw new Error('Numéro invalide');
        }
    }


    get number() {
        return this.value;
    }
}