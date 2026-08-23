export const BANK_DETAILS = {
  bankName: process.env.NEXT_PUBLIC_BANK_NAME || "",
  accountHolder: process.env.NEXT_PUBLIC_BANK_ACCOUNT_HOLDER || "",
  iban: process.env.NEXT_PUBLIC_BANK_IBAN || "",
  swift: process.env.NEXT_PUBLIC_BANK_SWIFT || "",
};

export const bankDetailsConfigured = Boolean(
  BANK_DETAILS.bankName && BANK_DETAILS.accountHolder && BANK_DETAILS.iban && BANK_DETAILS.swift
);
