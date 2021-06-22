import readline from 'readline'
const mockReadline: jest.Mocked<readline.ReadLine> = {
  question: jest.fn(),
  write: jest.fn()
} as any

export {
  mockReadline
}