import type { Registration } from "@/types/registration";

interface AdminDashboardProps {
  registrations: Registration[];
}

// Derive dashboard numbers from the same records shown in payment history.
export function AdminDashboard({ registrations }: AdminDashboardProps) {
  const paidRegistrations = registrations.filter((registration) => registration.paymentStatus === "Paid");
  const totalRevenue = paidRegistrations.reduce((sum, registration) => sum + registration.amount, 0);

  const metrics = [
    { label: "TOTAL STUDENTS", value: new Set(registrations.map((registration) => registration.email)).size.toString(), detail: "Unique student profiles" },
    { label: "TOTAL REGISTRATIONS", value: registrations.length.toString(), detail: "All saved registrations" },
    { label: "TOTAL REVENUE", value: `$${totalRevenue.toLocaleString()}`, detail: "Paid registration value" },
    { label: "PAID REGISTRATIONS", value: paidRegistrations.length.toString(), detail: "Successful payments" },
  ];

  return (
    <section className="placeholder-view">
      <p className="eyebrow">OVERVIEW</p>
      <h1>Admin dashboard</h1>
      <p className="subheading">Live registration and payment metrics from your current workspace.</p>
      <div className="metric-grid">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <small>{metric.label}</small>
            <strong>{metric.value}</strong>
            <span>{metric.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
