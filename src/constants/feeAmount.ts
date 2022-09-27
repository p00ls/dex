import JSBI from 'jsbi'

export enum FeeAmount {
  LOWEST = 100,
  LOW = 500,
  MEDIUM = 5000,
  HIGH = 10000,
}

export const FEE_QUOTIENT = JSBI.BigInt(5) // =0.5%
