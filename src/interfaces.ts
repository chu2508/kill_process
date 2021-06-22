export interface Input {
  receive(): Promise<string>;
}

export interface Output {
  write(text: string): Promise<void>;
}

export interface Command {
  findProcessByPort(port: number): ProcessInfo | null;

  killProcess(process: ProcessInfo): void;
}

export interface ProcessInfo {
  pid: number;
  name: string;
}