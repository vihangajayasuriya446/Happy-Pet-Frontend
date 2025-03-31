// CHANGES - This is a file of payment component intergration
// CHANGES - This file is used to handle payment related operations
import axios from 'axios';
import { PAYMENT_API_URL } from '../constants';

export interface PaymentDetails {
    amount: number;
    cardNumber: string;
    cvv: string;
    expiryMonth: string;
    expiryYear: string;
  }

export class PaymentService {
    // Fetch balance for a given phone number
    static async fetchBalance(phone: string): Promise<number | null> {
        try {
            const response = await axios.get<{ balance: number }>(`${PAYMENT_API_URL}/get-balance`, {
                params: { phone }
            });
            return response.data.balance;
        } catch (error) {
            console.error('Error fetching balance:', error);
            return null;
        }
    }

    // Handle payment submission
    static async handleEZCashPayment(phoneNumber: string, amountToPay: number): Promise<boolean> {
        try {
            const response = await axios.post(`${PAYMENT_API_URL}/ezcash`, {
                phone: phoneNumber,
                amount: amountToPay
            });

            if (response.status === 200) {
                return true;
            } else {
                throw new Error(`Payment submission failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Payment error:', error);
            return false;
        }
    }

    // Handle phone number change and fetch balance if the length is 10
    static async handlePhoneNumberChange(phone: string): Promise<number | null> {
        if (phone.length === 10) {
            return await this.fetchBalance(phone);
        }
        return null;
    }

    static async handleCardPayment(paymentDetails: PaymentDetails): Promise<{ success: boolean; message: string }> {
        try {
          const response = await axios.post(`${PAYMENT_API_URL}/card`, paymentDetails, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {
            return { success: true, message: response.data };
          } else {
            throw new Error(response.data || 'Payment submission failed');
          }
        } catch (error: any) {
          console.error('Payment error:', error);
          return { success: false, message: error.message || 'Payment failed' };
        }
      }

      static async fetchPayments(): Promise<any[] | null> {
        try {
            const response = await axios.get<any[]>(`${PAYMENT_API_URL}/get-payments`);
            return response.data;
        } catch (error) {
            console.error('Error fetching payments:', error);
            return null;
        }
    }
}