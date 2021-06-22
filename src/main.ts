import { InputImpl } from "./input";
import readline from "readline";
import { OutputImpl } from "./output";
import { WindowsCommand } from "./command";
import { execSync } from "child_process";
import { Handler } from "./handler";
export async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  const input = new InputImpl(rl)
  const output = new OutputImpl(rl)
  const command = new WindowsCommand(execSync)

  const handler = new Handler(input, output, command);

  await handler.handle();
  rl.close()
}