// Shared data contract for a completed course registration.
export interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  batch: string;
  duration: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  paymentStatus: string;
  paymentDate: string;
}
