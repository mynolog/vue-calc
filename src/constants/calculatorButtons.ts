export interface Button {
  id: number
  value: string
  label: string
  type: 'number' | 'operation' | 'clear' | 'undo'
}

export const numberButtons: Button[] = [
  {
    id: 1,
    value: '7',
    label: '7',
    type: 'number',
  },
  {
    id: 2,
    value: '8',
    label: '8',
    type: 'number',
  },
  {
    id: 3,
    value: '9',
    label: '9',
    type: 'number',
  },
  {
    id: 4,
    value: '4',
    label: '4',
    type: 'number',
  },
  {
    id: 5,
    value: '5',
    label: '5',
    type: 'number',
  },
  {
    id: 6,
    value: '6',
    label: '6',
    type: 'number',
  },
  {
    id: 7,
    value: '1',
    label: '1',
    type: 'number',
  },
  {
    id: 8,
    value: '2',
    label: '2',
    type: 'number',
  },
  {
    id: 9,
    value: '3',
    label: '3',
    type: 'number',
  },
  {
    id: 10,
    value: '0',
    label: '0',
    type: 'number',
  },
  {
    id: 11,
    value: '.',
    label: '.',
    type: 'number',
  },
] as const

export const operationButtons: Button[] = [
  {
    id: 12,
    value: '/',
    label: '÷',
    type: 'operation',
  },
  {
    id: 13,
    value: '*',
    label: 'x',
    type: 'operation',
  },
  {
    id: 14,
    value: '-',
    label: '-',
    type: 'operation',
  },
  {
    id: 15,
    value: '+',
    label: '+',
    type: 'operation',
  },
  {
    id: 16,
    value: '=',
    label: '=',
    type: 'operation',
  },
] as const

export const clearButton: Button = {
  id: 17,
  value: 'AC',
  label: 'AC',
  type: 'clear',
} as const

export const undoButton: Button = {
  id: 18,
  value: 'undo',
  label: '←',
  type: 'undo',
}
