import { Command, Input, Output } from "./interfaces";

export class Handler {
  private input: Input;
  private output: Output;
  private command: Command;

  constructor(input: Input, output: Output, command: Command) {
    this.input = input;
    this.output = output;
    this.command = command;
  }

  async handle(): Promise<void> {
    const inputStr = await this.input.receive();
    const port = Number(inputStr);

    if (Number.isNaN(port)) {
      await this.output.write("端口号应该为纯数字，请输入有效的端口号");
      return;
    }

    const processInfo = this.command.findProcessByPort(port);

    if (processInfo === null) {
      await this.output.write(`端口号:${port} 未被使用`)
      return;
    }
      await this.output.write(`pid:${processInfo.pid}, name:${processInfo.name}\n`)

      const yes = await this.input.receive()

      if (yes === 'Y') {
        this.command.killProcess(processInfo)
      }
  }
}
