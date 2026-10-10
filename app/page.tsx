
"use client";

import { useMemo, useState } from "react";

import { AdminDashboard } from "@/components/AdminDashboard";
import { ConfirmationPage } from "@/components/ConfirmationPage";
import { PaymentHistory } from "@/components/PaymentHistory";

import {
  createRegistrationId,
  getRegistrations,
  saveRegistration,
} from "@/lib/registrations";

import type { Registration } from "@/types/registration";

type View = "registration" | "history" | "admin";

type RegistrationStep = "details" | "review" | "confirmation";

const courses = [
  { name: "Product Design", category: "Design", fee: 680 },
  { name: "Full Stack Development", category: "Engineering", fee: 820 },
  { name: "Digital Marketing", category: "Business", fee: 540 },
  { name: "Data Science", category: "Analytics", fee: 900 },
  { name: "Cybersecurity Fundamentals", category: "IT & Security", fee: 750, },
  { name: "Devops & Cloud Engineering", category: "Engineering", fee: 880, },
  { name: "UI/UX Design", category: "Design", fee: 620 },
  { name: "Automation testing", category: "Engineering", fee: 700, },
];

const batches = [
  "Weekday mornings",
  "Weekday evenings",
  "Weekend intensive",
];

const durations = ["8 weeks", "12 weeks", "16 weeks"];

const durationMultipliers: Record<string, number> = {
  "8 weeks": 0.75,
  "12 weeks": 1,
  "16 weeks": 1.25,
};

export default function Home() {
  const [view, setView] = useState<View>("registration");

  const [registrationStep, setRegistrationStep] =
    useState<RegistrationStep>("details");

  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const [latestRegistration, setLatestRegistration] =
    useState<Registration | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: courses[0].name,
    batch: batches[1],
    duration: durations[1],
    payment: "Credit Card",
  });

  const selectedCourse =
    courses.find((course) => course.name === form.course) ?? courses[0];

  const fee = useMemo(
    () =>
      Math.round(
        selectedCourse.fee * (durationMultipliers[form.duration] ?? 1)
      ),
    [form.duration, selectedCourse.fee]
  );

  const tax = 20;
  const total = fee + tax;

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePayNow = () => {
    const registration: Registration = {
      id: createRegistrationId(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      course: form.course,
      batch: form.batch,
      duration: form.duration,
      amount: total,
      paymentMethod: form.payment,
      transactionId: `TXN-${Date.now()}`,
      paymentStatus: "Paid",
      paymentDate: new Date().toISOString(),
    };

    setRegistrations(saveRegistration(registration));
    setLatestRegistration(registration);
    setRegistrationStep("confirmation");
  };

  const handleRegisterAnother = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      course: courses[0].name,
      batch: batches[1],
      duration: durations[1],
      payment: "Credit Card",
    });

    setLatestRegistration(null);
    setRegistrationStep("details");
    setView("registration");
  };

  return (
    <main className="portal-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">C</span>
          <span>Campusly</span>
        </div>

        <div className="workspace-label">
          Workspace <span>⌄</span>
        </div>

        <nav className="nav-list" aria-label="Main navigation">
          <button
            className={
              view === "registration" ? "nav-item active" : "nav-item"
            }
            onClick={() => setView("registration")}
          >
            <span>▣</span> Registration <b>⌘ 1</b>
          </button>

          <button
            className={view === "history" ? "nav-item active" : "nav-item"}
            onClick={() => {
              setRegistrations(getRegistrations());
              setView("history");
            }}
          >
            <span>↺</span> Payment history
          </button>

          <button
            className={view === "admin" ? "nav-item active" : "nav-item"}
            onClick={() => {
              setRegistrations(getRegistrations());
              setView("admin");
            }}
          >
            <span>◈</span> Admin dashboard
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-box">
            <span className="help-icon">?</span>

            <div>
              <strong>Need a hand?</strong>
              <small>Visit the help center</small>
            </div>

            <span>↗</span>
          </div>

          <div className="profile">
            <span className="avatar">TS</span>

            <div>
              <strong>Tarun Singh</strong>
              <small>Administrator</small>
            </div>

            <span className="profile-more">•••</span>
          </div>
        </div>
      </aside>

      <section className="content-area">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Workspace</span>
            <b>/</b>

            <strong>
              {view === "registration"
                ? registrationStep === "review"
                  ? "Review registration"
                  : registrationStep === "confirmation"
                    ? "Confirmation"
                    : "New registration"
                : view === "history"
                  ? "Payment history"
                  : "Admin dashboard"}
            </strong>
          </div>

          <div className="top-actions">
            <button className="icon-button" aria-label="Notifications">
              ♧
            </button>

            <button className="icon-button" aria-label="Settings">
              ⚙
            </button>
          </div>
        </header>

        {view === "registration" &&
          registrationStep !== "confirmation" && (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">STUDENT INTAKE · 2025</p>

                  <h1>
                    {registrationStep === "review"
                      ? "Review registration"
                      : "Course registration"}
                  </h1>

                  <p className="subheading">
                    {registrationStep === "review"
                      ? "Check your details before completing your payment."
                      : "Welcome to the next chapter. Complete the details below to reserve your place."}
                  </p>
                </div>

                <span className="status-pill">
                  <i /> Registration open
                </span>
              </div>

              <div className="progress">
                <div
                  className={
                    registrationStep === "details"
                      ? "progress-step current"
                      : "progress-step complete"
                  }
                >
                  <span>
                    {registrationStep === "details" ? "1" : "✓"}
                  </span>
                  <strong>Student details</strong>
                </div>

                <div className="progress-line" />

                <div
                  className={
                    registrationStep === "review"
                      ? "progress-step current"
                      : "progress-step"
                  }
                >
                  <span>2</span>
                  <strong>Review &amp; pay</strong>
                </div>

                <div className="progress-line" />

                <div className="progress-step">
                  <span>3</span>
                  <strong>Confirmation</strong>
                </div>
              </div>

              {registrationStep === "details" && (
                <div className="registration-layout">
                  <form
                    className="form-card"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setRegistrationStep("review");
                    }}
                  >
                    <div className="card-heading">
                      <div>
                        <h2>Tell us about you</h2>
                        <p>
                          We&apos;ll use this information to set up your
                          student profile.
                        </p>
                      </div>

                      <span className="required-note">* Required</span>
                    </div>

                    <div className="form-grid">
                      <label>
                        Full name <span>*</span>
                        <input
                          required
                          value={form.name}
                          onChange={(event) =>
                            updateField("name", event.target.value)
                          }
                          placeholder="e.g. Alex Morgan"
                        />
                      </label>

                      <label>
                        Email address <span>*</span>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(event) =>
                            updateField("email", event.target.value)
                          }
                          placeholder="alex@example.com"
                        />
                      </label>

                      <label>
                        Phone number <span>*</span>
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={(event) =>
                            updateField("phone", event.target.value)
                          }
                          placeholder="+1 555 000 0000"
                        />
                      </label>
                    </div>

                    <div className="section-divider" />

                    <div className="card-heading course-heading">
                      <div>
                        <h2>Choose your course</h2>
                        <p>
                          Pick a learning track and a schedule that works for
                          you.
                        </p>
                      </div>
                    </div>

                    <div className="form-grid course-grid">
                      <label>
                        Course <span>*</span>
                        <select
                          value={form.course}
                          onChange={(event) =>
                            updateField("course", event.target.value)
                          }
                        >
                          {courses.map((course) => (
                            <option key={course.name}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label>
                        Preferred batch <span>*</span>
                        <select
                          value={form.batch}
                          onChange={(event) =>
                            updateField("batch", event.target.value)
                          }
                        >
                          {batches.map((batch) => (
                            <option key={batch}>{batch}</option>
                          ))}
                        </select>
                      </label>

                      <label>
                        Duration <span>*</span>
                        <select
                          value={form.duration}
                          onChange={(event) =>
                            updateField("duration", event.target.value)
                          }
                        >
                          {durations.map((duration) => (
                            <option key={duration}>{duration}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="form-actions">
                      <span>🔒 Your information is encrypted</span>

                      <button
                        type="submit"
                        className="primary-button"
                      >
                        Continue to review <b>→</b>
                      </button>
                    </div>
                  </form>

                  <aside className="summary-card">
                    <div className="summary-top">
                      <span className="summary-label">
                        YOUR SELECTION
                      </span>
                      <span className="edit-label">Edit</span>
                    </div>

                    <h2>{selectedCourse.name}</h2>

                    <p className="course-category">
                      {selectedCourse.category} <span>·</span>{" "}
                      {form.duration}
                    </p>

                    <div className="summary-row">
                      <span>Batch</span>
                      <strong>{form.batch}</strong>
                    </div>

                    <div className="summary-row">
                      <span>Course fee</span>
                      <strong>${fee.toLocaleString()}</strong>
                    </div>

                    <div className="summary-total">
                      <span>Total due</span>
                      <strong>
                        ${fee.toLocaleString()} <small>USD</small>
                      </strong>
                    </div>

                    <div className="summary-note">
                      <span>✦</span>
                      <p>
                        All course fees include learning materials and access
                        to the student community.
                      </p>
                    </div>
                  </aside>
                </div>
              )}

              {registrationStep === "review" && (
                <section className="review-layout">
                  <div className="review-card">
                    <div className="review-card-heading">
                      <div>
                        <p className="eyebrow">FINAL CHECK</p>
                        <h2>Review your registration</h2>
                        <p>
                          Make sure everything looks right before you pay.
                        </p>
                      </div>

                      <button
                        className="text-button"
                        type="button"
                        onClick={() => setRegistrationStep("details")}
                      >
                        ← Edit details
                      </button>
                    </div>

                    <div className="review-section">
                      <h3>Personal details</h3>

                      <div className="detail-grid">
                        <div>
                          <span>Name</span>
                          <strong>{form.name}</strong>
                        </div>

                        <div>
                          <span>Email</span>
                          <strong>{form.email}</strong>
                        </div>

                        <div>
                          <span>Phone</span>
                          <strong>{form.phone}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="review-section">
                      <h3>Course details</h3>

                      <div className="detail-grid course-detail-grid">
                        <div>
                          <span>Course</span>
                          <strong>{form.course}</strong>
                        </div>

                        <div>
                          <span>Batch</span>
                          <strong>{form.batch}</strong>
                        </div>

                        <div>
                          <span>Duration</span>
                          <strong>{form.duration}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="review-section fee-section">
                      <h3>Fee details</h3>

                      <div className="fee-row">
                        <span>Course fee</span>
                        <strong>${fee.toLocaleString()}</strong>
                      </div>

                      <div className="fee-row">
                        <span>Tax</span>
                        <strong>${tax.toLocaleString()}</strong>
                      </div>

                      <div className="fee-total">
                        <span>Total amount</span>
                        <strong>
                          ${total.toLocaleString()} <small>USD</small>
                        </strong>
                      </div>
                    </div>

                    <div className="review-section">
                      <h3>Payment method</h3>

                      <div className="review-payment-options">
                        {["Credit Card", "UPI", "Net Banking"].map(
                          (method) => (
                            <label
                              className={
                                form.payment === method
                                  ? "review-payment selected"
                                  : "review-payment"
                              }
                              key={method}
                            >
                              <input
                                type="radio"
                                name="review-payment"
                                checked={form.payment === method}
                                onChange={() =>
                                  updateField("payment", method)
                                }
                              />

                              <span className="radio-dot" />
                              <strong>{method}</strong>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    <div className="review-actions">
                      <span>🔒 Secure payment</span>

                      <button
                        className="primary-button pay-button"
                        type="button"
                        onClick={handlePayNow}
                      >
                        Pay now <b>→</b>
                      </button>
                    </div>
                  </div>

                  <aside className="summary-card review-summary">
                    <div className="summary-top">
                      <span className="summary-label">
                        PAYMENT SUMMARY
                      </span>
                      <span className="status-mini">Ready to pay</span>
                    </div>

                    <h2>{selectedCourse.name}</h2>

                    <p className="course-category">
                      {selectedCourse.category} <span>·</span>{" "}
                      {form.duration}
                    </p>

                    <div className="summary-row">
                      <span>Course fee</span>
                      <strong>${fee.toLocaleString()}</strong>
                    </div>

                    <div className="summary-row">
                      <span>Tax</span>
                      <strong>${tax.toLocaleString()}</strong>
                    </div>

                    <div className="summary-total">
                      <span>Total amount</span>
                      <strong>
                        ${total.toLocaleString()} <small>USD</small>
                      </strong>
                    </div>
                  </aside>
                </section>
              )}
            </>
          )}

        {view === "registration" &&
          registrationStep === "confirmation" &&
          latestRegistration && (
            <>
              <div className="progress confirmation-progress">
                <div className="progress-step complete">
                  <span>✓</span>
                  <strong>Student details</strong>
                </div>

                <div className="progress-line" />

                <div className="progress-step complete">
                  <span>✓</span>
                  <strong>Review &amp; pay</strong>
                </div>

                <div className="progress-line" />

                <div className="progress-step current">
                  <span>3</span>
                  <strong>Confirmation</strong>
                </div>
              </div>

              <ConfirmationPage
                registration={latestRegistration}
                onViewHistory={() => {
                  setRegistrations(getRegistrations());
                  setView("history");
                }}
                onRegisterAnother={handleRegisterAnother}
              />
            </>
          )}

        {view === "history" && (
          <PaymentHistory registrations={registrations} />
        )}

        {view === "admin" && (
          <AdminDashboard registrations={registrations} />
        )}
      </section>
    </main>
  );
}
