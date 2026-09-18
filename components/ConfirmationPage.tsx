import type { Registration } from "@/types/registration";

interface ConfirmationPageProps {
  registration: Registration;
  onViewHistory: () => void;
  onRegisterAnother: () => void;
}

// Show the receipt-like confirmation screen after a payment is completed.
export function ConfirmationPage({ registration, onViewHistory, onRegisterAnother }: ConfirmationPageProps) {
  return (
    <section className="confirmation-layout">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <p className="eyebrow">PAYMENT CONFIRMED</p>
        <h1>Registration complete</h1>
        <p className="confirmation-intro">Your place is reserved. We&apos;ve saved the payment details below.</p>
        <div className="confirmation-details">
          <div className="confirmation-group-title">Student details</div>
          <div><span>Registration ID</span><strong>{registration.id}</strong></div>
          <div><span>Name</span><strong>{registration.name}</strong></div>
          <div><span>Email</span><strong>{registration.email}</strong></div>
          <div><span>Phone</span><strong>{registration.phone}</strong></div>
          <div className="confirmation-group-title">Course details</div>
          <div><span>Course</span><strong>{registration.course}</strong></div>
          <div><span>Batch</span><strong>{registration.batch}</strong></div>
          <div><span>Duration</span><strong>{registration.duration}</strong></div>
          <div><span>Amount paid</span><strong>${registration.amount.toLocaleString()} USD</strong></div>
          <div className="confirmation-group-title">Transaction details</div>
          <div><span>Transaction ID</span><strong>{registration.transactionId || "Unavailable"}</strong></div>
          <div><span>Payment status</span><strong className="paid-status">{registration.paymentStatus}</strong></div>
          <div className="confirmation-date"><span>Payment date</span><strong>{new Date(registration.paymentDate).toLocaleString()}</strong></div>
        </div>
        <div className="confirmation-actions">
          <button className="secondary-button" type="button" onClick={onViewHistory}>View payment history</button>
          <button className="primary-button" type="button" onClick={onRegisterAnother}>Register another course <b>→</b></button>
        </div>
      </div>
    </section>
  );
}
