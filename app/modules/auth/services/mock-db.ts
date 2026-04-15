const STORAGE_KEY = "mock_db_users";

export interface MockUser {
  email: string;
  password: string;
  fullName: string;
  documentType: "DNI" | "CE" | "PASAPORTE";
  documentNumber: string;
  phone: string;
  birthDate: string;
}

const SEED_USERS: MockUser[] = [
  {
    email: "marcos@gmail.com",
    password: "123456",
    fullName: "Marcos Alanya",
    documentType: "DNI",
    documentNumber: "74845954",
    phone: "987654321",
    birthDate: "15/06/1990",
  },
];

function getAll(): MockUser[] {
  if (typeof localStorage === "undefined") return [...SEED_USERS];
  const raw = localStorage.getItem(STORAGE_KEY);
  const stored: MockUser[] = raw ? JSON.parse(raw) : [];
  return [...SEED_USERS, ...stored];
}

export function saveUser(user: MockUser): void {
  if (typeof localStorage === "undefined") return;
  const raw = localStorage.getItem(STORAGE_KEY);
  const stored: MockUser[] = raw ? JSON.parse(raw) : [];
  const idx = stored.findIndex((u) => u.email === user.email);
  if (idx >= 0) stored[idx] = user;
  else stored.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

export function findUserByCredentials(
  email: string,
  password: string,
): MockUser | null {
  return (
    getAll().find((u) => u.email === email && u.password === password) ?? null
  );
}

export function existsByDocument(
  documentType: string,
  documentNumber: string,
): boolean {
  return getAll().some(
    (u) =>
      u.documentType === documentType && u.documentNumber === documentNumber,
  );
}

export function existsByPhone(phone: string): boolean {
  return getAll().some((u) => u.phone === phone);
}

export function existsByEmail(email: string): boolean {
  return getAll().some((u) => u.email === email);
}
