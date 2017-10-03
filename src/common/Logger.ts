// tslint:disable-next-line:no-var-requires
const argsarray = require('argsarray')

const LogFuncs = {
  TRACE: console.debug,
  DEBUG: console.debug,
  INFO: console.log,
  WARN: console.warn,
  ERROR: console.error,
  FATAL: console.error,
}

export const Levels: { [level: string]: number } = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  FATAL: 5,
}

interface ILoggerInterface {
  trace(...args: any[])
  debug(...args: any[])
  info(...args: any[])
  warn(...args: any[])
  error(...args: any[])
  fatal(...args: any[])
  isTrace(): boolean
  isDebug(): boolean
  isInfo(): boolean
  isWarn(): boolean
  isError(): boolean
  isFatal(): boolean
}

export default class Logger implements ILoggerInterface {
  public level: number = Levels.TRACE

  constructor(name: string, logLevel: number = Levels.TRACE) {
    this.level = logLevel
    // Implement all log methods
    Object.keys(LogFuncs).map(levelName => {
      const logFunc = LogFuncs[levelName] || console.log

      // Dynamically implement log methods.
      this[levelName.toLowerCase()] = argsarray(args => {
        if (Levels[levelName] >= this.level) {
          logFunc.apply(
            console,
            [`[${levelName}] {${name}}: ${args[0]}`].concat(args.slice(1)),
          )
        }
      })

      // Dynamically implement log level methods.
      const logLevelMethodName = `is${levelName[0].toUpperCase()}${levelName
        .slice(1)
        .toLowerCase()}`
      this[logLevelMethodName] = () => Levels[levelName] >= this.level
    })
  }

  public trace(..._args: any[]) {
    throw new Error('Method not implemented.')
  }

  public debug(..._args: any[]) {
    throw new Error('Method not implemented.')
  }

  public info(..._args: any[]) {
    throw new Error('Method not implemented.')
  }

  public warn(..._args: any[]) {
    throw new Error('Method not implemented.')
  }

  public error(..._args: any[]) {
    throw new Error('Method not implemented.')
  }

  public fatal(..._args: any[]) {
    throw new Error('Method not implemented.')
  }

  public isTrace(): boolean {
    throw new Error('Method not implemented.')
  }

  public isDebug(): boolean {
    throw new Error('Method not implemented.')
  }

  public isInfo(): boolean {
    throw new Error('Method not implemented.')
  }

  public isWarn(): boolean {
    throw new Error('Method not implemented.')
  }

  public isError(): boolean {
    throw new Error('Method not implemented.')
  }

  public isFatal(): boolean {
    throw new Error('Method not implemented.')
  }
}
