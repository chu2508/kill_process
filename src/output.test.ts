import { mockReadline } from "./mock";
import { OutputImpl } from "./output";

describe('OutputImpl', () => {
  test('should call readline.write', async () => {
    const output = new OutputImpl(mockReadline)
    const text = 'test output'
    await output.write(text)

    expect(mockReadline.write).toBeCalledWith(text)
  })
});