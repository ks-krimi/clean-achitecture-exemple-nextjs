export interface TicketRepository {
    findById(id: string): Promise<any | null>;
    save(ticket: any): Promise<void>;
}