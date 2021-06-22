import { Handler } from "./handler";
import { Command, Input, Output } from "./interfaces";

const makeSut = () => {
  const input: jest.Mocked<Input> = {
    receive: jest.fn()
  };
  const output: jest.Mocked<Output> = {
    write: jest.fn()
  };
  const command: jest.Mocked<Command> = {
    findProcessByPort: jest.fn(),
    killProcess: jest.fn()
  };
  const handler = new Handler(input, output, command);

  return {
    input,
    output,
    command,
    handler
  };
};

describe("Handler", () => {
  let input: jest.Mocked<Input>;
  let output: jest.Mocked<Output>;
  let command: jest.Mocked<Command>;
  let handler: Handler;

  beforeEach(() => {
    const sut = makeSut();
    input = sut.input;
    output = sut.output;
    command = sut.command;
    handler = sut.handler;
  });

  test("should output tips if user input value not number", async () => {
    input.receive.mockResolvedValue("1024a");

    await handler.handle();

    expect(output.write).toBeCalledWith("端口号应该为纯数字，请输入有效的端口号");
  });

  test("should output tips message if port not be use", async () => {
    input.receive.mockResolvedValue("1024");
    command.findProcessByPort.mockReturnValue(null);

    await handler.handle();

    expect(command.findProcessByPort).toBeCalledWith(1024);
    expect(output.write).toBeCalledWith(`端口号:1024 未被使用`);
  });

  test("should output process info if Process found by port", async () => {
    input.receive.mockResolvedValueOnce("1024");
    const tResult = { pid: 127, name: 'test.exe' };
    command.findProcessByPort.mockReturnValue(tResult);

    await handler.handle();

    expect(command.findProcessByPort).toBeCalledWith(1024);
    expect(output.write.mock.calls[0][0]).toMatch(`${tResult.pid}`)
    expect(output.write.mock.calls[0][0]).toMatch(`${tResult.name}`)
  });

  test("should kill process if user input 'Y'", async () => {
    const process = {pid: 127, name: 'test.exe'}
    input.receive.mockResolvedValueOnce("1024");
    input.receive.mockResolvedValueOnce("Y");
    command.findProcessByPort.mockReturnValue({pid: 127, name: 'test.exe'});

    await handler.handle();

    expect(command.killProcess).toBeCalledWith(process);
  });

  test("should exit program if user input 'N'", async () => {
    const process = {pid: 127, name: 'test.exe'}
    input.receive.mockResolvedValueOnce("1024");
    input.receive.mockResolvedValueOnce("N");
    command.findProcessByPort.mockReturnValue({pid: 127, name: 'test.exe'});

    await handler.handle();

    expect(command.killProcess).not.toBeCalled()
  });
});
