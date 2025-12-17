import {PaymentPort} from "@/src/domain/ports/PaymentPort";
import {TicketRepository} from "@/src/domain/ports/TicketRepository";
import {RouterPort} from "@/src/domain/ports/RouterPort";

export class SellTicketUseCase {
    constructor(
        private readonly payment: PaymentPort,
        private readonly tickets: TicketRepository,
        private readonly router: RouterPort
    ) {}


    async execute(input: {
        ticketId: string;
        phone: string;
    }) {
        const ticket = await this.tickets.findById(input.ticketId);
        if (!ticket) throw new Error('Ticket introuvable');


        const payment = await this.payment.pay({
            amount: ticket.price,
            phone: input.phone,
            reference: ticket.code,
        });


        if (!payment.success) throw new Error('Paiement échoué');


        ticket.markAsUsed();
        await this.router.createHotspotUser(ticket);
        await this.tickets.save(ticket);


        return payment;
    }
}