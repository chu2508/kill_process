import { Input } from "./interfaces";
import readline from 'readline'

export class InputImpl implements Input {
  constructor(private readonly readline: readline.ReadLine) {}
  receive(): Promise<string> {
   return new Promise((resolve) => {
    this.readline.question('', resolve)
   })
  }
}