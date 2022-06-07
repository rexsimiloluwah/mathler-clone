export interface IDifficulty {
 mode: string
 description: string
 color: string
 squaresCount: number
 operators: string[]
}

export const DIFFICULTY: IDifficulty[] = [
 {
  mode: 'Easy',
  description: '5 squares and up to 2 operators, operators include {+,-,/,*}',
  color: 'dodgerblue',
  squaresCount: 5,
  operators: [...'0123456789+-*/^'.split(''), 'Enter', 'Delete'],
 },
 {
  mode: 'Hard',
  description: '7 squares and up to 3 operators, operators include {+,-,/,*,(,),^}',
  color: 'crimson',
  squaresCount: 7,
  operators: [...'0123456789+-*/^()'.split(''), 'Enter', 'Delete'],
 },
]

export const SQUARES = {
 yellow: '🟨',
 gray: '⬜',
 green: '🟩',
}
