export class Ticket {
    constructor(
        public readonly id: string,
        public readonly code: string,
        public readonly duration: number,
        public readonly price: number,
        private used: boolean = false
    ) {}


    markAsUsed() {
        if (this.used) throw new Error('Ticket déjà utilisé');
        this.used = true;
    }
}