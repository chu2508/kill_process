import { InputImpl } from './input';
import { mockReadline } from './mock';

describe('InputImpl', () => {
  test('should call readline.question', async () => {
    mockReadline.question.mockImplementation((_, callback: any) => callback('100'))
    const input = new InputImpl(mockReadline);

    await input.receive()

    expect(mockReadline.question).toBeCalled()
  })


  test('should correct return result', async () => {
    const tResult = 'abc123'
    mockReadline.question.mockImplementation((_, callback: any) => callback(tResult))
    const input = new InputImpl(mockReadline);

    const result = await input.receive()

    expect(result).toBe(tResult)
  })
});