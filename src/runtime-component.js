import { transpile } from '@bytecodealliance/jco';
import { _setEnv, _setArgs, _setCwd } from '@bytecodealliance/preview2-shim/cli';

let sourceCache = {};

export class Component {
  constructor (url, pwd, env, args) {
    this.url = url;
    this.pwd = pwd;
    this.env = env;
    this.args = args;
  }
  async initialize () {
    if (!sourceCache[this.url]) {
      sourceCache[this.url] = (async () => {
        const component = await (await fetch(this.url)).arrayBuffer();
        const output = transpile(component, {
          name: 'component',
          noTypescript: true,
          noNodejsCompat: true,
          base64Cutoff: 2 ** 32 - 1,
          map: [
            ['wasi:cli/*', '@bytecodealliance/preview2-shim/cli#*'],
            ['wasi:clocks/*', '@bytecodealliance/preview2-shim/clocks#*'],
            ['wasi:filesystem/*', '@bytecodealliance/preview2-shim/filesystem#*'],
            ['wasi:http/*', '@bytecodealliance/preview2-shim/http#*'],
            ['wasi:io/*', '@bytecodealliance/preview2-shim/io#*'],
            ['wasi:logging/*', '@bytecodealliance/preview2-shim/logging#*'],
            ['wasi:poll/*', '@bytecodealliance/preview2-shim/poll#*'],
            ['wasi:random/*', '@bytecodealliance/preview2-shim/random#*'],
            ['wasi:sockets/*', '@bytecodealliance/preview2-shim/sockets#*']
          ]
        });
        return output.files[0][1];
      })();
    }
    const source = await sourceCache[this.url];
    const objectUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    this.instance = await import(objectUrl);
  }
  runCmd () {
    if (!this.args || !this.env || !this.pwd)
      throw new Error(`Command component must first be initialized with pwd, arguments and environment`);
    if (!this.instance.run || typeof this.instance.run.run !== 'function')
      throw new Error(`${componentUrl} is not a valid WASI Command`);
    _setCwd(this.pwd);
    _setArgs(this.args);
    _setEnv(Object.fromEntries(this.env));
    try {
      this.instance.run.run();
    }
    catch (e) {
      if (e?.exitError)
        return 1;
      throw String(e.message + '\n' + e.stack);
    }
    return 0;
  }
}
