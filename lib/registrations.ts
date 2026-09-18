import type { Registration } from "@/types/registration";

// Keep the storage key in one place so every component reads the same collection.
export const REGISTRATIONS_STORAGE_KEY = "campusly-registrations";

// Read completed registrations from localStorage only in the browser.
export function getRegistrations(): Registration[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedRegistrations = window.localStorage.getItem(REGISTRATIONS_STORAGE_KEY);

  if (!storedRegistrations) {
    return [];
  }

  try {
    const registrations: unknown = JSON.parse(storedRegistrations);
    return Array.isArray(registrations) ? (registrations as Registration[]) : [];
  } catch {
    return [];
  }
}

// Append a newly paid registration to the existing localStorage collection.
export function saveRegistration(registration: Registration): Registration[] {
  const registrations = [...getRegistrations(), registration];
  window.localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(registrations));
  return registrations;
}

// Generate a readable registration number based on the number of saved records.
export function createRegistrationId(): string {
  const nextNumber = getRegistrations().length + 1;
  return `REG-${String(nextNumber).padStart(3, "0")}`;
}
