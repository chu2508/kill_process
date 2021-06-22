import { WindowsCommand } from "./command";
import { ProcessInfo } from "./interfaces";

const mockExec = jest.fn();

describe("WindowsCommand", () => {
  describe("findProcessByPort", () => {
    beforeEach(() => {
      mockExec.mockClear()
    });
    test("should call exec function with correct value", () => {
      const sut = new WindowsCommand(mockExec);
      const port = 8088;

      sut.findProcessByPort(port);

      expect(mockExec.mock.calls[0][0]).toMatch(port.toString());
    });

    test("should return null if exec throw error", () => {
      const sut = new WindowsCommand(mockExec);
      const port = 10023;

      mockExec.mockImplementationOnce(() => {
        throw new Error();
      });

      const result = sut.findProcessByPort(port);

      expect(result).toBeNull();
    });

    test("should return processInfo if exec return correct result", () => {
      const sut = new WindowsCommand(mockExec);
      const port = 10023;
      const tResult: ProcessInfo = {
        pid: 123456,
        name: "test.exe"
      };
      mockExec.mockImplementationOnce(() => `  TCP    0.0.0.0:35500          0.0.0.0:0              LISTENING       ${tResult.pid}
      TCP    [::]:35500             [::]:0                 LISTENING       ${tResult.pid}`);
      mockExec.mockImplementationOnce(() => `"${tResult.name}","${tResult.pid}","Console","1","43,804 K"`);

      const result = sut.findProcessByPort(port);

      expect(result).toEqual(tResult);
    });
  });

  describe("killProcess", () => {
    beforeEach(() => {
      mockExec.mockClear();
    });
    test("should call exec with correct value", () => {
      const tProcess: ProcessInfo = {
        pid: 1234,
        name: "test.exe"
      };
      const sut = new WindowsCommand(mockExec);

      sut.killProcess(tProcess);

      expect(mockExec.mock.calls[0][0]).toMatch(`${tProcess.pid}`);
      expect(mockExec.mock.calls[0][0]).toMatch(`taskkill`);
    });
  });
});
