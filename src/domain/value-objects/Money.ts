export class Money {
    constructor(private readonly value: number) {
        if (value <= 0) throw new Error('Montant invalide');
    }


    get amount() {
        return this.value;
    }
}