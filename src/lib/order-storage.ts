const CUSTOMER_KEY = "habibi-order-customer";

export type OrderCustomer = {
  firstName: string;
  phone: string;
};

export function loadOrderCustomer(): OrderCustomer | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CUSTOMER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OrderCustomer;
    if (!parsed.firstName?.trim() || !parsed.phone?.trim()) return null;
    return {
      firstName: parsed.firstName.trim(),
      phone: parsed.phone.trim(),
    };
  } catch {
    return null;
  }
}

export function saveOrderCustomer(customer: OrderCustomer): void {
  localStorage.setItem(
    CUSTOMER_KEY,
    JSON.stringify({
      firstName: customer.firstName.trim(),
      phone: customer.phone.trim(),
    }),
  );
}
