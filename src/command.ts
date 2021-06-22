import { Command, ProcessInfo } from "./interfaces";
export type Exec = (command: string, ) => string | Buffer;

export class WindowsCommand implements Command {
  constructor(private readonly exec: Exec) {}

  findProcessByPort(port: number): ProcessInfo | null {
    try {
      const netInfo = this.exec('netstat -aon | findstr LISTENING | findstr ' + port).toString()
      const pid = netInfo.match(/LISTENING\s+([0-9]+)/)?.[1]
      const processStr = this.exec(`tasklist /fo csv /fi "PID eq ${pid}" | findstr ${pid}`).toString()
      const processName = processStr.split(',')[0].replace(/"/g,'')
      if (pid === undefined) {
        return null;
      }
      return {pid: Number(pid), name: processName} as any
    } catch (error) {
      return null
    }
  }
  killProcess(process: ProcessInfo): void {
    this.exec(`taskkill /f /pid ${process.pid}`)
  }
}
