export interface APIError {
  success: false
  data: {
    name: 'DUPLICATE_DNI' | 'INVALID_PHONE' | 'SERVER_ERROR' | string
    title: string
    message: string
  }
}

export interface Bank {
  id: number | string
  name: string
  code?: string
  logo?: string
}

export interface SourceFund {
  id: number | string
  name: string
}

import type { EDocumentType } from '~/modules/auth/enums/document-type.enum'

export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  documentType: EDocumentType
  documentNumber: string
  birthDate: string
}

export interface BankAccount {
  bankId: number | string
  accountType: 'ahorro' | 'credito'
  accountNumber: string
}

export interface Transaction {
  id?: string
  originAmount: number
  destinationAmount: number
  originCurrency: 'PEN' | 'USD'
  destinationCurrency: 'PEN' | 'USD'
  exchangeRate: number
  bankAccount: BankAccount
  sourceFundId: string | number
  voucherUrl?: string
  status?: 'pending' | 'completed' | 'failed'
  createdAt?: string
}
