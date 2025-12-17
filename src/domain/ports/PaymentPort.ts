export interface PaymentPort {
    pay(input: {
        amount: number;
        phone: string;
        reference: string;
    }): Promise<{ success: boolean; transactionId?: string }>;
}