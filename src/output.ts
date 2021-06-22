import readline from 'readline';
import { Output } from "./interfaces";

export class OutputImpl implements Output {
  constructor(private readonly readline: readline.ReadLine) {}

  async write(text: string): Promise<void> {
    return this.readline.write(text)
  }
}