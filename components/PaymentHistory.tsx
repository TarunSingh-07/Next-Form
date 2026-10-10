"use client";

import { useMemo, useState } from "react";
import type { Registration } from "@/types/registration";

interface PaymentHistoryProps {
  registrations: Registration[];
}

// Render the saved payment collection as a responsive history table.
export function PaymentHistory({ registrations }: PaymentHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");

  // Filter locally for now; the same props can later be populated by an API query.

const filteredRegistrations = useMemo(() => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return registrations.filter((registration) => {
    const matchesSearch =
      !normalizedSearch ||
      [
        registration.id,
        registration.name,
        registration.course,
        registration.paymentMethod,
      ].some((value) =>
        value.toLowerCase().includes(normalizedSearch)
      );

    const matchesStatus =
      statusFilter === "All statuses" ||
      registration.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });
}, [registrations, searchTerm, statusFilter]);

 
return (
  <section className="placeholder-view">
    <p className="eyebrow">ACCOUNT OVERVIEW</p>

    <h1>Payment history</h1>

    <p className="subheading">
      Search and review every completed payment in your workspace.
    </p>

    <div className="history-toolbar">
      <label className="history-search">
        <span>⌕</span>

        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search ID, student, course..."
          aria-label="Search payment history"
        />
      </label>

      <select
        className="history-filter"
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value)}
        aria-label="Filter payment history by status"
      >
        <option>All statuses</option>
        <option>Paid</option>
        <option>Pending</option>
        <option>Failed</option>
      </select>
    </div>

    <div className="history-table">
      <div className="table-head">
        <span>REGISTRATION ID</span>
        <span>STUDENT</span>
        <span>COURSE</span>
        <span>DATE</span>
        <span>METHOD</span>
        <span>AMOUNT</span>
        <span>STATUS</span>
      </div>

      {filteredRegistrations.length > 0 ? (
        filteredRegistrations.map((registration) => (
          <div className="table-row" key={registration.id}>
            <strong>{registration.id}</strong>
            <span>{registration.name}</span>
            <strong>{registration.course}</strong>
            <span>
              {new Date(registration.paymentDate).toLocaleDateString()}
            </span>
            <span>{registration.paymentMethod}</span>
            <b>${registration.amount.toLocaleString()}</b>
            <em>{registration.paymentStatus}</em>
          </div>
        ))
      ) : (
        <div className="empty-history">
          {registrations.length === 0
            ? "No completed payments yet."
            : "No payments match your search or filter."}
        </div>
      )}
    </div>
  </section>
);
}

