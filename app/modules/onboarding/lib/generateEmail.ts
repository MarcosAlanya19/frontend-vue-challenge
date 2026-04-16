export const generateEmail = (fullName: string): string => {
  const firstName = fullName.trim().split(/\s+/)[0];

  if (!firstName) return "";

  return `${firstName.toLowerCase()}@kambista.com`;
};
