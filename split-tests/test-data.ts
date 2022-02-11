import { build } from '@koala-live/edge-api-client'

const edge = build({})

edge.index({
  company: {
    tech: ['postgresql'],
    metrics: {
      employees: 50
    }
  }
})

const isBigCo = edge.company.employeeCount.greaterThanOrEqual(50)
const hasPg = edge.company.tech.includesItem('postgresql')
const hasMySQL = edge.company.tech.includesItem('mysql')

console.log({ isBigCo })
console.log({ hasPg })
console.log({ hasMySQL })
