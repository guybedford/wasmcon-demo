import { Component } from '../../src/runtime-component.js';
import { environment, exit as exit$1, stderr, stdin, stdout, terminalInput, terminalOutput, terminalStderr, terminalStdin, terminalStdout } from '@bytecodealliance/preview2-shim/cli';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { streams } from '@bytecodealliance/preview2-shim/io';
const { getEnvironment } = environment;
const { exit } = exit$1;
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { dropTerminalInput } = terminalInput;
const { dropTerminalOutput } = terminalOutput;
const { getTerminalStderr } = terminalStderr;
const { getTerminalStdin } = terminalStdin;
const { getTerminalStdout } = terminalStdout;
const { getDirectories } = preopens;
const { appendViaStream,
  createDirectoryAt,
  dropDescriptor,
  dropDirectoryEntryStream,
  getType,
  metadataHash,
  metadataHashAt,
  openAt,
  readViaStream,
  stat,
  statAt,
  writeViaStream } = types;
const { blockingRead,
  blockingWrite,
  dropInputStream,
  dropOutputStream,
  read,
  write } = streams;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  return e;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const toUint64 = val => BigInt.asUintN(64, val);

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen + s.length);
    allocLen += s.length;
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  if (allocLen > writtenTotal)
  ptr = realloc(ptr, allocLen, 1, writtenTotal);
  utf8EncodedLen = writtenTotal;
  return ptr;
}

let exports0;
let exports1;

function trampoline1(arg0) {
  dropDirectoryEntryStream(arg0 >>> 0);
}

function trampoline2(arg0) {
  dropInputStream(arg0 >>> 0);
}

function trampoline3(arg0) {
  dropOutputStream(arg0 >>> 0);
}

function trampoline4(arg0) {
  dropDescriptor(arg0 >>> 0);
}

function trampoline5() {
  const ret = getStdin();
  return toUint32(ret);
}

function trampoline6(arg0) {
  dropTerminalInput(arg0 >>> 0);
}

function trampoline7() {
  const ret = getStdout();
  return toUint32(ret);
}

function trampoline8(arg0) {
  dropTerminalOutput(arg0 >>> 0);
}

function trampoline9() {
  const ret = getStderr();
  return toUint32(ret);
}

function trampoline10(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}
let exports2;
const handleTable0= new Map();
let handleCnt0 = 0;

function trampoline11(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
  const ptr0 = arg0;
  const len0 = arg1;
  const result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
  let variant2;
  switch (arg2) {
    case 0: {
      variant2 = null;
      break;
    }
    case 1: {
      const ptr1 = arg3;
      const len1 = arg4;
      const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
      variant2 = result1;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  let variant6;
  switch (arg5) {
    case 0: {
      variant6 = null;
      break;
    }
    case 1: {
      const len5 = arg7;
      const base5 = arg6;
      const result5 = [];
      for (let i = 0; i < len5; i++) {
        const base = base5 + i * 16;
        const ptr3 = dataView(memory0).getInt32(base + 0, true);
        const len3 = dataView(memory0).getInt32(base + 4, true);
        const result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
        const ptr4 = dataView(memory0).getInt32(base + 8, true);
        const len4 = dataView(memory0).getInt32(base + 12, true);
        const result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
        result5.push([result3, result4]);
      }
      variant6 = result5;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  let variant9;
  switch (arg8) {
    case 0: {
      variant9 = null;
      break;
    }
    case 1: {
      const len8 = arg10;
      const base8 = arg9;
      const result8 = [];
      for (let i = 0; i < len8; i++) {
        const base = base8 + i * 8;
        const ptr7 = dataView(memory0).getInt32(base + 0, true);
        const len7 = dataView(memory0).getInt32(base + 4, true);
        const result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
        result8.push(result7);
      }
      variant9 = result8;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  const ret = new Component(result0, variant2, variant6, variant9);
  const handle10 = handleCnt0++;
  handleTable0.set(handle10, { rep: ret, own: true });
  return handle10;
}
let memory0;

function trampoline12(arg0, arg1) {
  const rsc0 = handleTable0.get(arg0).rep;
  let ret;
  try {
    ret = { tag: 'ok', val: Component.prototype.runCmd.call(rsc0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant2 = ret;
  switch (variant2.tag) {
    case 'ok': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setInt32(arg1 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      const ptr1 = utf8Encode(e, realloc0, memory0);
      const len1 = utf8EncodedLen;
      dataView(memory0).setInt32(arg1 + 8, len1, true);
      dataView(memory0).setInt32(arg1 + 4, ptr1, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
let realloc0;

function trampoline13(arg0) {
  const ret = getDirectories();
  const vec2 = ret;
  const len2 = vec2.length;
  const result2 = realloc1(0, 0, 4, len2 * 12);
  for (let i = 0; i < vec2.length; i++) {
    const e = vec2[i];
    const base = result2 + i * 12;const [tuple0_0, tuple0_1] = e;
    dataView(memory0).setInt32(base + 0, toUint32(tuple0_0), true);
    const ptr1 = utf8Encode(tuple0_1, realloc1, memory0);
    const len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len1, true);
    dataView(memory0).setInt32(base + 4, ptr1, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len2, true);
  dataView(memory0).setInt32(arg0 + 0, result2, true);
}
let realloc1;

function trampoline14(arg0, arg1, arg2) {
  let ret;
  try {
    ret = { tag: 'ok', val: readViaStream(arg0 >>> 0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant1 = ret;
  switch (variant1.tag) {
    case 'ok': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      dataView(memory0).setInt32(arg2 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      const val0 = e;
      let enum0;
      switch (val0) {
        case 'access': {
          enum0 = 0;
          break;
        }
        case 'would-block': {
          enum0 = 1;
          break;
        }
        case 'already': {
          enum0 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum0 = 3;
          break;
        }
        case 'busy': {
          enum0 = 4;
          break;
        }
        case 'deadlock': {
          enum0 = 5;
          break;
        }
        case 'quota': {
          enum0 = 6;
          break;
        }
        case 'exist': {
          enum0 = 7;
          break;
        }
        case 'file-too-large': {
          enum0 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum0 = 9;
          break;
        }
        case 'in-progress': {
          enum0 = 10;
          break;
        }
        case 'interrupted': {
          enum0 = 11;
          break;
        }
        case 'invalid': {
          enum0 = 12;
          break;
        }
        case 'io': {
          enum0 = 13;
          break;
        }
        case 'is-directory': {
          enum0 = 14;
          break;
        }
        case 'loop': {
          enum0 = 15;
          break;
        }
        case 'too-many-links': {
          enum0 = 16;
          break;
        }
        case 'message-size': {
          enum0 = 17;
          break;
        }
        case 'name-too-long': {
          enum0 = 18;
          break;
        }
        case 'no-device': {
          enum0 = 19;
          break;
        }
        case 'no-entry': {
          enum0 = 20;
          break;
        }
        case 'no-lock': {
          enum0 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum0 = 22;
          break;
        }
        case 'insufficient-space': {
          enum0 = 23;
          break;
        }
        case 'not-directory': {
          enum0 = 24;
          break;
        }
        case 'not-empty': {
          enum0 = 25;
          break;
        }
        case 'not-recoverable': {
          enum0 = 26;
          break;
        }
        case 'unsupported': {
          enum0 = 27;
          break;
        }
        case 'no-tty': {
          enum0 = 28;
          break;
        }
        case 'no-such-device': {
          enum0 = 29;
          break;
        }
        case 'overflow': {
          enum0 = 30;
          break;
        }
        case 'not-permitted': {
          enum0 = 31;
          break;
        }
        case 'pipe': {
          enum0 = 32;
          break;
        }
        case 'read-only': {
          enum0 = 33;
          break;
        }
        case 'invalid-seek': {
          enum0 = 34;
          break;
        }
        case 'text-file-busy': {
          enum0 = 35;
          break;
        }
        case 'cross-device': {
          enum0 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val0}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum0, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline15(arg0, arg1, arg2) {
  let ret;
  try {
    ret = { tag: 'ok', val: writeViaStream(arg0 >>> 0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant1 = ret;
  switch (variant1.tag) {
    case 'ok': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      dataView(memory0).setInt32(arg2 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      const val0 = e;
      let enum0;
      switch (val0) {
        case 'access': {
          enum0 = 0;
          break;
        }
        case 'would-block': {
          enum0 = 1;
          break;
        }
        case 'already': {
          enum0 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum0 = 3;
          break;
        }
        case 'busy': {
          enum0 = 4;
          break;
        }
        case 'deadlock': {
          enum0 = 5;
          break;
        }
        case 'quota': {
          enum0 = 6;
          break;
        }
        case 'exist': {
          enum0 = 7;
          break;
        }
        case 'file-too-large': {
          enum0 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum0 = 9;
          break;
        }
        case 'in-progress': {
          enum0 = 10;
          break;
        }
        case 'interrupted': {
          enum0 = 11;
          break;
        }
        case 'invalid': {
          enum0 = 12;
          break;
        }
        case 'io': {
          enum0 = 13;
          break;
        }
        case 'is-directory': {
          enum0 = 14;
          break;
        }
        case 'loop': {
          enum0 = 15;
          break;
        }
        case 'too-many-links': {
          enum0 = 16;
          break;
        }
        case 'message-size': {
          enum0 = 17;
          break;
        }
        case 'name-too-long': {
          enum0 = 18;
          break;
        }
        case 'no-device': {
          enum0 = 19;
          break;
        }
        case 'no-entry': {
          enum0 = 20;
          break;
        }
        case 'no-lock': {
          enum0 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum0 = 22;
          break;
        }
        case 'insufficient-space': {
          enum0 = 23;
          break;
        }
        case 'not-directory': {
          enum0 = 24;
          break;
        }
        case 'not-empty': {
          enum0 = 25;
          break;
        }
        case 'not-recoverable': {
          enum0 = 26;
          break;
        }
        case 'unsupported': {
          enum0 = 27;
          break;
        }
        case 'no-tty': {
          enum0 = 28;
          break;
        }
        case 'no-such-device': {
          enum0 = 29;
          break;
        }
        case 'overflow': {
          enum0 = 30;
          break;
        }
        case 'not-permitted': {
          enum0 = 31;
          break;
        }
        case 'pipe': {
          enum0 = 32;
          break;
        }
        case 'read-only': {
          enum0 = 33;
          break;
        }
        case 'invalid-seek': {
          enum0 = 34;
          break;
        }
        case 'text-file-busy': {
          enum0 = 35;
          break;
        }
        case 'cross-device': {
          enum0 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val0}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum0, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline16(arg0, arg1) {
  let ret;
  try {
    ret = { tag: 'ok', val: appendViaStream(arg0 >>> 0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant1 = ret;
  switch (variant1.tag) {
    case 'ok': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setInt32(arg1 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      const val0 = e;
      let enum0;
      switch (val0) {
        case 'access': {
          enum0 = 0;
          break;
        }
        case 'would-block': {
          enum0 = 1;
          break;
        }
        case 'already': {
          enum0 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum0 = 3;
          break;
        }
        case 'busy': {
          enum0 = 4;
          break;
        }
        case 'deadlock': {
          enum0 = 5;
          break;
        }
        case 'quota': {
          enum0 = 6;
          break;
        }
        case 'exist': {
          enum0 = 7;
          break;
        }
        case 'file-too-large': {
          enum0 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum0 = 9;
          break;
        }
        case 'in-progress': {
          enum0 = 10;
          break;
        }
        case 'interrupted': {
          enum0 = 11;
          break;
        }
        case 'invalid': {
          enum0 = 12;
          break;
        }
        case 'io': {
          enum0 = 13;
          break;
        }
        case 'is-directory': {
          enum0 = 14;
          break;
        }
        case 'loop': {
          enum0 = 15;
          break;
        }
        case 'too-many-links': {
          enum0 = 16;
          break;
        }
        case 'message-size': {
          enum0 = 17;
          break;
        }
        case 'name-too-long': {
          enum0 = 18;
          break;
        }
        case 'no-device': {
          enum0 = 19;
          break;
        }
        case 'no-entry': {
          enum0 = 20;
          break;
        }
        case 'no-lock': {
          enum0 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum0 = 22;
          break;
        }
        case 'insufficient-space': {
          enum0 = 23;
          break;
        }
        case 'not-directory': {
          enum0 = 24;
          break;
        }
        case 'not-empty': {
          enum0 = 25;
          break;
        }
        case 'not-recoverable': {
          enum0 = 26;
          break;
        }
        case 'unsupported': {
          enum0 = 27;
          break;
        }
        case 'no-tty': {
          enum0 = 28;
          break;
        }
        case 'no-such-device': {
          enum0 = 29;
          break;
        }
        case 'overflow': {
          enum0 = 30;
          break;
        }
        case 'not-permitted': {
          enum0 = 31;
          break;
        }
        case 'pipe': {
          enum0 = 32;
          break;
        }
        case 'read-only': {
          enum0 = 33;
          break;
        }
        case 'invalid-seek': {
          enum0 = 34;
          break;
        }
        case 'text-file-busy': {
          enum0 = 35;
          break;
        }
        case 'cross-device': {
          enum0 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val0}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum0, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline17(arg0, arg1) {
  let ret;
  try {
    ret = { tag: 'ok', val: getType(arg0 >>> 0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant2 = ret;
  switch (variant2.tag) {
    case 'ok': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      const val0 = e;
      let enum0;
      switch (val0) {
        case 'unknown': {
          enum0 = 0;
          break;
        }
        case 'block-device': {
          enum0 = 1;
          break;
        }
        case 'character-device': {
          enum0 = 2;
          break;
        }
        case 'directory': {
          enum0 = 3;
          break;
        }
        case 'fifo': {
          enum0 = 4;
          break;
        }
        case 'symbolic-link': {
          enum0 = 5;
          break;
        }
        case 'regular-file': {
          enum0 = 6;
          break;
        }
        case 'socket': {
          enum0 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val0}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum0, true);
      break;
    }
    case 'err': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      const val1 = e;
      let enum1;
      switch (val1) {
        case 'access': {
          enum1 = 0;
          break;
        }
        case 'would-block': {
          enum1 = 1;
          break;
        }
        case 'already': {
          enum1 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum1 = 3;
          break;
        }
        case 'busy': {
          enum1 = 4;
          break;
        }
        case 'deadlock': {
          enum1 = 5;
          break;
        }
        case 'quota': {
          enum1 = 6;
          break;
        }
        case 'exist': {
          enum1 = 7;
          break;
        }
        case 'file-too-large': {
          enum1 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum1 = 9;
          break;
        }
        case 'in-progress': {
          enum1 = 10;
          break;
        }
        case 'interrupted': {
          enum1 = 11;
          break;
        }
        case 'invalid': {
          enum1 = 12;
          break;
        }
        case 'io': {
          enum1 = 13;
          break;
        }
        case 'is-directory': {
          enum1 = 14;
          break;
        }
        case 'loop': {
          enum1 = 15;
          break;
        }
        case 'too-many-links': {
          enum1 = 16;
          break;
        }
        case 'message-size': {
          enum1 = 17;
          break;
        }
        case 'name-too-long': {
          enum1 = 18;
          break;
        }
        case 'no-device': {
          enum1 = 19;
          break;
        }
        case 'no-entry': {
          enum1 = 20;
          break;
        }
        case 'no-lock': {
          enum1 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum1 = 22;
          break;
        }
        case 'insufficient-space': {
          enum1 = 23;
          break;
        }
        case 'not-directory': {
          enum1 = 24;
          break;
        }
        case 'not-empty': {
          enum1 = 25;
          break;
        }
        case 'not-recoverable': {
          enum1 = 26;
          break;
        }
        case 'unsupported': {
          enum1 = 27;
          break;
        }
        case 'no-tty': {
          enum1 = 28;
          break;
        }
        case 'no-such-device': {
          enum1 = 29;
          break;
        }
        case 'overflow': {
          enum1 = 30;
          break;
        }
        case 'not-permitted': {
          enum1 = 31;
          break;
        }
        case 'pipe': {
          enum1 = 32;
          break;
        }
        case 'read-only': {
          enum1 = 33;
          break;
        }
        case 'invalid-seek': {
          enum1 = 34;
          break;
        }
        case 'text-file-busy': {
          enum1 = 35;
          break;
        }
        case 'cross-device': {
          enum1 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val1}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum1, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline18(arg0, arg1, arg2, arg3) {
  const ptr0 = arg1;
  const len0 = arg2;
  const result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
  let ret;
  try {
    ret = { tag: 'ok', val: createDirectoryAt(arg0 >>> 0, result0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant2 = ret;
  switch (variant2.tag) {
    case 'ok': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      const val1 = e;
      let enum1;
      switch (val1) {
        case 'access': {
          enum1 = 0;
          break;
        }
        case 'would-block': {
          enum1 = 1;
          break;
        }
        case 'already': {
          enum1 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum1 = 3;
          break;
        }
        case 'busy': {
          enum1 = 4;
          break;
        }
        case 'deadlock': {
          enum1 = 5;
          break;
        }
        case 'quota': {
          enum1 = 6;
          break;
        }
        case 'exist': {
          enum1 = 7;
          break;
        }
        case 'file-too-large': {
          enum1 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum1 = 9;
          break;
        }
        case 'in-progress': {
          enum1 = 10;
          break;
        }
        case 'interrupted': {
          enum1 = 11;
          break;
        }
        case 'invalid': {
          enum1 = 12;
          break;
        }
        case 'io': {
          enum1 = 13;
          break;
        }
        case 'is-directory': {
          enum1 = 14;
          break;
        }
        case 'loop': {
          enum1 = 15;
          break;
        }
        case 'too-many-links': {
          enum1 = 16;
          break;
        }
        case 'message-size': {
          enum1 = 17;
          break;
        }
        case 'name-too-long': {
          enum1 = 18;
          break;
        }
        case 'no-device': {
          enum1 = 19;
          break;
        }
        case 'no-entry': {
          enum1 = 20;
          break;
        }
        case 'no-lock': {
          enum1 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum1 = 22;
          break;
        }
        case 'insufficient-space': {
          enum1 = 23;
          break;
        }
        case 'not-directory': {
          enum1 = 24;
          break;
        }
        case 'not-empty': {
          enum1 = 25;
          break;
        }
        case 'not-recoverable': {
          enum1 = 26;
          break;
        }
        case 'unsupported': {
          enum1 = 27;
          break;
        }
        case 'no-tty': {
          enum1 = 28;
          break;
        }
        case 'no-such-device': {
          enum1 = 29;
          break;
        }
        case 'overflow': {
          enum1 = 30;
          break;
        }
        case 'not-permitted': {
          enum1 = 31;
          break;
        }
        case 'pipe': {
          enum1 = 32;
          break;
        }
        case 'read-only': {
          enum1 = 33;
          break;
        }
        case 'invalid-seek': {
          enum1 = 34;
          break;
        }
        case 'text-file-busy': {
          enum1 = 35;
          break;
        }
        case 'cross-device': {
          enum1 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val1}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 1, enum1, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline19(arg0, arg1) {
  let ret;
  try {
    ret = { tag: 'ok', val: stat(arg0 >>> 0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      const {type: v0_0, linkCount: v0_1, size: v0_2, dataAccessTimestamp: v0_3, dataModificationTimestamp: v0_4, statusChangeTimestamp: v0_5 } = e;
      const val1 = v0_0;
      let enum1;
      switch (val1) {
        case 'unknown': {
          enum1 = 0;
          break;
        }
        case 'block-device': {
          enum1 = 1;
          break;
        }
        case 'character-device': {
          enum1 = 2;
          break;
        }
        case 'directory': {
          enum1 = 3;
          break;
        }
        case 'fifo': {
          enum1 = 4;
          break;
        }
        case 'symbolic-link': {
          enum1 = 5;
          break;
        }
        case 'regular-file': {
          enum1 = 6;
          break;
        }
        case 'socket': {
          enum1 = 7;
          break;
        }
        default: {
          if ((v0_0) instanceof Error) {
            console.error(v0_0);
          }
          
          throw new TypeError(`"${val1}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum1, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v0_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v0_2), true);
      const {seconds: v2_0, nanoseconds: v2_1 } = v0_3;
      dataView(memory0).setBigInt64(arg1 + 32, toUint64(v2_0), true);
      dataView(memory0).setInt32(arg1 + 40, toUint32(v2_1), true);
      const {seconds: v3_0, nanoseconds: v3_1 } = v0_4;
      dataView(memory0).setBigInt64(arg1 + 48, toUint64(v3_0), true);
      dataView(memory0).setInt32(arg1 + 56, toUint32(v3_1), true);
      const {seconds: v4_0, nanoseconds: v4_1 } = v0_5;
      dataView(memory0).setBigInt64(arg1 + 64, toUint64(v4_0), true);
      dataView(memory0).setInt32(arg1 + 72, toUint32(v4_1), true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      const val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline20(arg0, arg1, arg2, arg3, arg4) {
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  const flags0 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  const ptr1 = arg2;
  const len1 = arg3;
  const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
  let ret;
  try {
    ret = { tag: 'ok', val: statAt(arg0 >>> 0, flags0, result1) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      const {type: v2_0, linkCount: v2_1, size: v2_2, dataAccessTimestamp: v2_3, dataModificationTimestamp: v2_4, statusChangeTimestamp: v2_5 } = e;
      const val3 = v2_0;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((v2_0) instanceof Error) {
            console.error(v2_0);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum3, true);
      dataView(memory0).setBigInt64(arg4 + 16, toUint64(v2_1), true);
      dataView(memory0).setBigInt64(arg4 + 24, toUint64(v2_2), true);
      const {seconds: v4_0, nanoseconds: v4_1 } = v2_3;
      dataView(memory0).setBigInt64(arg4 + 32, toUint64(v4_0), true);
      dataView(memory0).setInt32(arg4 + 40, toUint32(v4_1), true);
      const {seconds: v5_0, nanoseconds: v5_1 } = v2_4;
      dataView(memory0).setBigInt64(arg4 + 48, toUint64(v5_0), true);
      dataView(memory0).setInt32(arg4 + 56, toUint32(v5_1), true);
      const {seconds: v6_0, nanoseconds: v6_1 } = v2_5;
      dataView(memory0).setBigInt64(arg4 + 64, toUint64(v6_0), true);
      dataView(memory0).setInt32(arg4 + 72, toUint32(v6_1), true);
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      const val7 = e;
      let enum7;
      switch (val7) {
        case 'access': {
          enum7 = 0;
          break;
        }
        case 'would-block': {
          enum7 = 1;
          break;
        }
        case 'already': {
          enum7 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum7 = 3;
          break;
        }
        case 'busy': {
          enum7 = 4;
          break;
        }
        case 'deadlock': {
          enum7 = 5;
          break;
        }
        case 'quota': {
          enum7 = 6;
          break;
        }
        case 'exist': {
          enum7 = 7;
          break;
        }
        case 'file-too-large': {
          enum7 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum7 = 9;
          break;
        }
        case 'in-progress': {
          enum7 = 10;
          break;
        }
        case 'interrupted': {
          enum7 = 11;
          break;
        }
        case 'invalid': {
          enum7 = 12;
          break;
        }
        case 'io': {
          enum7 = 13;
          break;
        }
        case 'is-directory': {
          enum7 = 14;
          break;
        }
        case 'loop': {
          enum7 = 15;
          break;
        }
        case 'too-many-links': {
          enum7 = 16;
          break;
        }
        case 'message-size': {
          enum7 = 17;
          break;
        }
        case 'name-too-long': {
          enum7 = 18;
          break;
        }
        case 'no-device': {
          enum7 = 19;
          break;
        }
        case 'no-entry': {
          enum7 = 20;
          break;
        }
        case 'no-lock': {
          enum7 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum7 = 22;
          break;
        }
        case 'insufficient-space': {
          enum7 = 23;
          break;
        }
        case 'not-directory': {
          enum7 = 24;
          break;
        }
        case 'not-empty': {
          enum7 = 25;
          break;
        }
        case 'not-recoverable': {
          enum7 = 26;
          break;
        }
        case 'unsupported': {
          enum7 = 27;
          break;
        }
        case 'no-tty': {
          enum7 = 28;
          break;
        }
        case 'no-such-device': {
          enum7 = 29;
          break;
        }
        case 'overflow': {
          enum7 = 30;
          break;
        }
        case 'not-permitted': {
          enum7 = 31;
          break;
        }
        case 'pipe': {
          enum7 = 32;
          break;
        }
        case 'read-only': {
          enum7 = 33;
          break;
        }
        case 'invalid-seek': {
          enum7 = 34;
          break;
        }
        case 'text-file-busy': {
          enum7 = 35;
          break;
        }
        case 'cross-device': {
          enum7 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline21(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  const flags0 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  const ptr1 = arg2;
  const len1 = arg3;
  const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
  if ((arg4 & 4294967280) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  const flags2 = {
    create: Boolean(arg4 & 1),
    directory: Boolean(arg4 & 2),
    exclusive: Boolean(arg4 & 4),
    truncate: Boolean(arg4 & 8),
  };
  if ((arg5 & 4294967232) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  const flags3 = {
    read: Boolean(arg5 & 1),
    write: Boolean(arg5 & 2),
    fileIntegritySync: Boolean(arg5 & 4),
    dataIntegritySync: Boolean(arg5 & 8),
    requestedWriteSync: Boolean(arg5 & 16),
    mutateDirectory: Boolean(arg5 & 32),
  };
  if ((arg6 & 4294967288) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  const flags4 = {
    readable: Boolean(arg6 & 1),
    writable: Boolean(arg6 & 2),
    executable: Boolean(arg6 & 4),
  };
  let ret;
  try {
    ret = { tag: 'ok', val: openAt(arg0 >>> 0, flags0, result1, flags2, flags3, flags4) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg7 + 0, 0, true);
      dataView(memory0).setInt32(arg7 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg7 + 0, 1, true);
      const val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg7 + 4, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline22(arg0, arg1) {
  let ret;
  try {
    ret = { tag: 'ok', val: metadataHash(arg0 >>> 0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant2 = ret;
  switch (variant2.tag) {
    case 'ok': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      const {lower: v0_0, upper: v0_1 } = e;
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(v0_0), true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v0_1), true);
      break;
    }
    case 'err': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      const val1 = e;
      let enum1;
      switch (val1) {
        case 'access': {
          enum1 = 0;
          break;
        }
        case 'would-block': {
          enum1 = 1;
          break;
        }
        case 'already': {
          enum1 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum1 = 3;
          break;
        }
        case 'busy': {
          enum1 = 4;
          break;
        }
        case 'deadlock': {
          enum1 = 5;
          break;
        }
        case 'quota': {
          enum1 = 6;
          break;
        }
        case 'exist': {
          enum1 = 7;
          break;
        }
        case 'file-too-large': {
          enum1 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum1 = 9;
          break;
        }
        case 'in-progress': {
          enum1 = 10;
          break;
        }
        case 'interrupted': {
          enum1 = 11;
          break;
        }
        case 'invalid': {
          enum1 = 12;
          break;
        }
        case 'io': {
          enum1 = 13;
          break;
        }
        case 'is-directory': {
          enum1 = 14;
          break;
        }
        case 'loop': {
          enum1 = 15;
          break;
        }
        case 'too-many-links': {
          enum1 = 16;
          break;
        }
        case 'message-size': {
          enum1 = 17;
          break;
        }
        case 'name-too-long': {
          enum1 = 18;
          break;
        }
        case 'no-device': {
          enum1 = 19;
          break;
        }
        case 'no-entry': {
          enum1 = 20;
          break;
        }
        case 'no-lock': {
          enum1 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum1 = 22;
          break;
        }
        case 'insufficient-space': {
          enum1 = 23;
          break;
        }
        case 'not-directory': {
          enum1 = 24;
          break;
        }
        case 'not-empty': {
          enum1 = 25;
          break;
        }
        case 'not-recoverable': {
          enum1 = 26;
          break;
        }
        case 'unsupported': {
          enum1 = 27;
          break;
        }
        case 'no-tty': {
          enum1 = 28;
          break;
        }
        case 'no-such-device': {
          enum1 = 29;
          break;
        }
        case 'overflow': {
          enum1 = 30;
          break;
        }
        case 'not-permitted': {
          enum1 = 31;
          break;
        }
        case 'pipe': {
          enum1 = 32;
          break;
        }
        case 'read-only': {
          enum1 = 33;
          break;
        }
        case 'invalid-seek': {
          enum1 = 34;
          break;
        }
        case 'text-file-busy': {
          enum1 = 35;
          break;
        }
        case 'cross-device': {
          enum1 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val1}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum1, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline23(arg0, arg1, arg2, arg3, arg4) {
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  const flags0 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  const ptr1 = arg2;
  const len1 = arg3;
  const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
  let ret;
  try {
    ret = { tag: 'ok', val: metadataHashAt(arg0 >>> 0, flags0, result1) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      const {lower: v2_0, upper: v2_1 } = e;
      dataView(memory0).setBigInt64(arg4 + 8, toUint64(v2_0), true);
      dataView(memory0).setBigInt64(arg4 + 16, toUint64(v2_1), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      const val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline24(arg0) {
  const ret = getEnvironment();
  const vec3 = ret;
  const len3 = vec3.length;
  const result3 = realloc1(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;const [tuple0_0, tuple0_1] = e;
    const ptr1 = utf8Encode(tuple0_0, realloc1, memory0);
    const len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    const ptr2 = utf8Encode(tuple0_1, realloc1, memory0);
    const len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline25(arg0, arg1, arg2) {
  let ret;
  try {
    ret = { tag: 'ok', val: read(arg0 >>> 0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant3 = ret;
  switch (variant3.tag) {
    case 'ok': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      const [tuple0_0, tuple0_1] = e;
      const val1 = tuple0_0;
      const len1 = val1.byteLength;
      const ptr1 = realloc1(0, 0, 1, len1 * 1);
      const src1 = new Uint8Array(val1.buffer || val1, val1.byteOffset, len1 * 1);
      (new Uint8Array(memory0.buffer, ptr1, len1 * 1)).set(src1);
      dataView(memory0).setInt32(arg2 + 8, len1, true);
      dataView(memory0).setInt32(arg2 + 4, ptr1, true);
      const val2 = tuple0_1;
      let enum2;
      switch (val2) {
        case 'open': {
          enum2 = 0;
          break;
        }
        case 'ended': {
          enum2 = 1;
          break;
        }
        default: {
          if ((tuple0_1) instanceof Error) {
            console.error(tuple0_1);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of stream-status`);
        }
      }
      dataView(memory0).setInt8(arg2 + 12, enum2, true);
      break;
    }
    case 'err': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline26(arg0, arg1, arg2) {
  let ret;
  try {
    ret = { tag: 'ok', val: blockingRead(arg0 >>> 0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant3 = ret;
  switch (variant3.tag) {
    case 'ok': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      const [tuple0_0, tuple0_1] = e;
      const val1 = tuple0_0;
      const len1 = val1.byteLength;
      const ptr1 = realloc1(0, 0, 1, len1 * 1);
      const src1 = new Uint8Array(val1.buffer || val1, val1.byteOffset, len1 * 1);
      (new Uint8Array(memory0.buffer, ptr1, len1 * 1)).set(src1);
      dataView(memory0).setInt32(arg2 + 8, len1, true);
      dataView(memory0).setInt32(arg2 + 4, ptr1, true);
      const val2 = tuple0_1;
      let enum2;
      switch (val2) {
        case 'open': {
          enum2 = 0;
          break;
        }
        case 'ended': {
          enum2 = 1;
          break;
        }
        default: {
          if ((tuple0_1) instanceof Error) {
            console.error(tuple0_1);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of stream-status`);
        }
      }
      dataView(memory0).setInt8(arg2 + 12, enum2, true);
      break;
    }
    case 'err': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline27(arg0, arg1, arg2, arg3) {
  const ptr0 = arg1;
  const len0 = arg2;
  const result0 = new Uint8Array(memory0.buffer.slice(ptr0, ptr0 + len0 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: write(arg0 >>> 0, result0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant3 = ret;
  switch (variant3.tag) {
    case 'ok': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      const [tuple1_0, tuple1_1] = e;
      dataView(memory0).setBigInt64(arg3 + 8, toUint64(tuple1_0), true);
      const val2 = tuple1_1;
      let enum2;
      switch (val2) {
        case 'open': {
          enum2 = 0;
          break;
        }
        case 'ended': {
          enum2 = 1;
          break;
        }
        default: {
          if ((tuple1_1) instanceof Error) {
            console.error(tuple1_1);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of stream-status`);
        }
      }
      dataView(memory0).setInt8(arg3 + 16, enum2, true);
      break;
    }
    case 'err': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline28(arg0, arg1, arg2, arg3) {
  const ptr0 = arg1;
  const len0 = arg2;
  const result0 = new Uint8Array(memory0.buffer.slice(ptr0, ptr0 + len0 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: blockingWrite(arg0 >>> 0, result0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant3 = ret;
  switch (variant3.tag) {
    case 'ok': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      const [tuple1_0, tuple1_1] = e;
      dataView(memory0).setBigInt64(arg3 + 8, toUint64(tuple1_0), true);
      const val2 = tuple1_1;
      let enum2;
      switch (val2) {
        case 'open': {
          enum2 = 0;
          break;
        }
        case 'ended': {
          enum2 = 1;
          break;
        }
        default: {
          if ((tuple1_1) instanceof Error) {
            console.error(tuple1_1);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of stream-status`);
        }
      }
      dataView(memory0).setInt8(arg3 + 16, enum2, true);
      break;
    }
    case 'err': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline29(arg0) {
  const ret = getTerminalStdin();
  const variant0 = ret;
  if (variant0 === null || variant0=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant0;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    dataView(memory0).setInt32(arg0 + 4, toUint32(e), true);
  }
}

function trampoline30(arg0) {
  const ret = getTerminalStdout();
  const variant0 = ret;
  if (variant0 === null || variant0=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant0;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    dataView(memory0).setInt32(arg0 + 4, toUint32(e), true);
  }
}

function trampoline31(arg0) {
  const ret = getTerminalStderr();
  const variant0 = ret;
  if (variant0 === null || variant0=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant0;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    dataView(memory0).setInt32(arg0 + 4, toUint32(e), true);
  }
}
let exports3;
let postReturn0;
function trampoline0(handle) {
  const handleEntry = handleTable0.get(handle);
  if (!handleEntry) {
    throw new Error(`Resource error: Invalid handle ${handle}`);
  }
  handleTable0.delete(handle);
}

function init() {
  const ret = exports1['shell#init']();
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
      variant1= {
        tag: 'err',
        val: result0
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant1.tag === 'err') {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function execute(arg0) {
  const ptr0 = utf8Encode(arg0, realloc0, memory0);
  const len0 = utf8EncodedLen;
  const ret = exports1['shell#execute'](ptr0, len0);
  let variant4;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      let variant2;
      switch (dataView(memory0).getUint8(ret + 4, true)) {
        case 0: {
          variant2 = null;
          break;
        }
        case 1: {
          const rsc1 = handleTable0.get(dataView(memory0).getInt32(ret + 8, true)).rep;
          handleTable0.delete(dataView(memory0).getInt32(ret + 8, true));
          variant2 = rsc1;
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for option');
        }
      }
      variant4= {
        tag: 'ok',
        val: variant2
      };
      break;
    }
    case 1: {
      const ptr3 = dataView(memory0).getInt32(ret + 4, true);
      const len3 = dataView(memory0).getInt32(ret + 8, true);
      const result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
      variant4= {
        tag: 'err',
        val: result3
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant4.tag === 'err') {
    throw new ComponentError(variant4.val);
  }
  return variant4.val;
}

function executeComponent(arg0) {
  const handle0 = handleCnt0++;
  handleTable0.set(handle0, { rep: arg0, own: true });
  const ret = exports1['shell#execute-component'](handle0);
  let variant2;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant2= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      const ptr1 = dataView(memory0).getInt32(ret + 4, true);
      const len1 = dataView(memory0).getInt32(ret + 8, true);
      const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
      variant2= {
        tag: 'err',
        val: result1
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant2.tag === 'err') {
    throw new ComponentError(variant2.val);
  }
  return variant2.val;
}

const $init = (async() => {
  const module0 = fetchCompile(new URL('./shell.core.wasm', import.meta.url));
  const module1 = fetchCompile(new URL('./shell.core2.wasm', import.meta.url));
  const module2 = base64Compile('AGFzbQEAAAABbQ5gC39/f39/f39/f39/AX9gAn9/AGABfwBgA39+fwBgBH9/f38AYAV/f39/fwBgCH9/f39/f39/AGACf38Bf2AEf39/fwF/YAN/f38Bf2AFf39/f38Bf2AJf39/f39+fn9/AX9gAX8Bf2ABfwADIiEAAQIDAwEBBAEFBgEFAgMDBAQCAgIHCAgJCgsHBwwHCQ0EBQFwASEhB6cBIgEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOAjE1AA8CMTYAEAIxNwARAjE4ABICMTkAEwIyMAAUAjIxABUCMjIAFgIyMwAXAjI0ABgCMjUAGQIyNgAaAjI3ABsCMjgAHAIyOQAdAjMwAB4CMzEAHwIzMgAgCCRpbXBvcnRzAQAK3QMhHQAgACABIAIgAyAEIAUgBiAHIAggCSAKQQARAAALCwAgACABQQERAQALCQAgAEECEQIACw0AIAAgASACQQMRAwALDQAgACABIAJBBBEDAAsLACAAIAFBBREBAAsLACAAIAFBBhEBAAsPACAAIAEgAiADQQcRBAALCwAgACABQQgRAQALEQAgACABIAIgAyAEQQkRBQALFwAgACABIAIgAyAEIAUgBiAHQQoRBgALCwAgACABQQsRAQALEQAgACABIAIgAyAEQQwRBQALCQAgAEENEQIACw0AIAAgASACQQ4RAwALDQAgACABIAJBDxEDAAsPACAAIAEgAiADQRARBAALDwAgACABIAIgA0EREQQACwkAIABBEhECAAsJACAAQRMRAgALCQAgAEEUEQIACwsAIAAgAUEVEQcACw8AIAAgASACIANBFhEIAAsPACAAIAEgAiADQRcRCAALDQAgACABIAJBGBEJAAsRACAAIAEgAiADIARBGREKAAsZACAAIAEgAiADIAQgBSAGIAcgCEEaEQsACwsAIAAgAUEbEQcACwsAIAAgAUEcEQcACwkAIABBHREMAAsLACAAIAFBHhEHAAsNACAAIAEgAkEfEQkACwkAIABBIBENAAsALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjE0LjAAhwwEbmFtZQATEndpdC1jb21wb25lbnQ6c2hpbQHqCyEAPWluZGlyZWN0LWxvY2FsOnNoZWxsL3J1bnRpbWUtY29tcG9uZW50LVtjb25zdHJ1Y3Rvcl1jb21wb25lbnQBQGluZGlyZWN0LWxvY2FsOnNoZWxsL3J1bnRpbWUtY29tcG9uZW50LVttZXRob2RdY29tcG9uZW50LnJ1bi1jbWQCMWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS9wcmVvcGVucy1nZXQtZGlyZWN0b3JpZXMDLmluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy1yZWFkLXZpYS1zdHJlYW0EL2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy13cml0ZS12aWEtc3RyZWFtBTBpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXMtYXBwZW5kLXZpYS1zdHJlYW0GJ2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy1nZXQtdHlwZQcyaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzLWNyZWF0ZS1kaXJlY3RvcnktYXQII2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy1zdGF0CSZpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXMtc3RhdC1hdAomaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzLW9wZW4tYXQLLGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy1tZXRhZGF0YS1oYXNoDC9pbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXMtbWV0YWRhdGEtaGFzaC1hdA0taW5kaXJlY3Qtd2FzaTpjbGkvZW52aXJvbm1lbnQtZ2V0LWVudmlyb25tZW50Dh1pbmRpcmVjdC13YXNpOmlvL3N0cmVhbXMtcmVhZA8maW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zLWJsb2NraW5nLXJlYWQQHmluZGlyZWN0LXdhc2k6aW8vc3RyZWFtcy13cml0ZREnaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zLWJsb2NraW5nLXdyaXRlEjNpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRpbi1nZXQtdGVybWluYWwtc3RkaW4TNWluZGlyZWN0LXdhc2k6Y2xpL3Rlcm1pbmFsLXN0ZG91dC1nZXQtdGVybWluYWwtc3Rkb3V0FDVpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRlcnItZ2V0LXRlcm1pbmFsLXN0ZGVychUsYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9maWxlc3RhdF9nZXQWJGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcmVhZBclYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF93cml0ZRgyYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wYXRoX2NyZWF0ZV9kaXJlY3RvcnkZLmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcGF0aF9maWxlc3RhdF9nZXQaJmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcGF0aF9vcGVuGyhhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWVudmlyb25fZ2V0HC5hZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWVudmlyb25fc2l6ZXNfZ2V0HSVhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX2Nsb3NlHithZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3ByZXN0YXRfZ2V0HzBhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3ByZXN0YXRfZGlyX25hbWUgJmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcHJvY19leGl0');
  const module3 = base64Compile('AGFzbQEAAAABbQ5gC39/f39/f39/f39/AX9gAn9/AGABfwBgA39+fwBgBH9/f38AYAV/f39/fwBgCH9/f39/f39/AGACf38Bf2AEf39/fwF/YAN/f38Bf2AFf39/f38Bf2AJf39/f39+fn9/AX9gAX8Bf2ABfwACzAEiAAEwAAAAATEAAQABMgACAAEzAAMAATQAAwABNQABAAE2AAEAATcABAABOAABAAE5AAUAAjEwAAYAAjExAAEAAjEyAAUAAjEzAAIAAjE0AAMAAjE1AAMAAjE2AAQAAjE3AAQAAjE4AAIAAjE5AAIAAjIwAAIAAjIxAAcAAjIyAAgAAjIzAAgAAjI0AAkAAjI1AAoAAjI2AAsAAjI3AAcAAjI4AAcAAjI5AAwAAjMwAAcAAjMxAAkAAjMyAA0ACCRpbXBvcnRzAXABISEJJwEAQQALIQABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fIAAuCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BjAuMTQuMAAcBG5hbWUAFRR3aXQtY29tcG9uZW50OmZpeHVwcw');
  const instanceFlags0 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  const instanceFlags1 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  Promise.all([module0, module1, module2, module3]).catch(() => {});
  ({ exports: exports0 } = await instantiateCore(await module2));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    'local:shell/runtime-component': {
      '[constructor]component': exports0['0'],
      '[method]component.run-cmd': exports0['1'],
      '[resource-drop]component': trampoline0,
    },
    wasi_snapshot_preview1: {
      environ_get: exports0['27'],
      environ_sizes_get: exports0['28'],
      fd_close: exports0['29'],
      fd_filestat_get: exports0['21'],
      fd_prestat_dir_name: exports0['31'],
      fd_prestat_get: exports0['30'],
      fd_read: exports0['22'],
      fd_write: exports0['23'],
      path_create_directory: exports0['24'],
      path_filestat_get: exports0['25'],
      path_open: exports0['26'],
      proc_exit: exports0['32'],
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module1, {
    __main_module__: {
      cabi_realloc: exports1.cabi_realloc,
    },
    env: {
      memory: exports1.memory,
    },
    'wasi:cli/environment': {
      'get-environment': exports0['13'],
    },
    'wasi:cli/exit': {
      exit: trampoline10,
    },
    'wasi:cli/stderr': {
      'get-stderr': trampoline9,
    },
    'wasi:cli/stdin': {
      'get-stdin': trampoline5,
    },
    'wasi:cli/stdout': {
      'get-stdout': trampoline7,
    },
    'wasi:cli/terminal-input': {
      'drop-terminal-input': trampoline6,
    },
    'wasi:cli/terminal-output': {
      'drop-terminal-output': trampoline8,
    },
    'wasi:cli/terminal-stderr': {
      'get-terminal-stderr': exports0['20'],
    },
    'wasi:cli/terminal-stdin': {
      'get-terminal-stdin': exports0['18'],
    },
    'wasi:cli/terminal-stdout': {
      'get-terminal-stdout': exports0['19'],
    },
    'wasi:filesystem/preopens': {
      'get-directories': exports0['2'],
    },
    'wasi:filesystem/types': {
      'append-via-stream': exports0['5'],
      'create-directory-at': exports0['7'],
      'drop-descriptor': trampoline4,
      'drop-directory-entry-stream': trampoline1,
      'get-type': exports0['6'],
      'metadata-hash': exports0['11'],
      'metadata-hash-at': exports0['12'],
      'open-at': exports0['10'],
      'read-via-stream': exports0['3'],
      stat: exports0['8'],
      'stat-at': exports0['9'],
      'write-via-stream': exports0['4'],
    },
    'wasi:io/streams': {
      'blocking-read': exports0['15'],
      'blocking-write': exports0['17'],
      'drop-input-stream': trampoline2,
      'drop-output-stream': trampoline3,
      read: exports0['14'],
      write: exports0['16'],
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports1.cabi_realloc;
  realloc1 = exports2.cabi_import_realloc;
  ({ exports: exports3 } = await instantiateCore(await module3, {
    '': {
      $imports: exports0.$imports,
      '0': trampoline11,
      '1': trampoline12,
      '10': trampoline21,
      '11': trampoline22,
      '12': trampoline23,
      '13': trampoline24,
      '14': trampoline25,
      '15': trampoline26,
      '16': trampoline27,
      '17': trampoline28,
      '18': trampoline29,
      '19': trampoline30,
      '2': trampoline13,
      '20': trampoline31,
      '21': exports2.fd_filestat_get,
      '22': exports2.fd_read,
      '23': exports2.fd_write,
      '24': exports2.path_create_directory,
      '25': exports2.path_filestat_get,
      '26': exports2.path_open,
      '27': exports2.environ_get,
      '28': exports2.environ_sizes_get,
      '29': exports2.fd_close,
      '3': trampoline14,
      '30': exports2.fd_prestat_get,
      '31': exports2.fd_prestat_dir_name,
      '32': exports2.proc_exit,
      '4': trampoline15,
      '5': trampoline16,
      '6': trampoline17,
      '7': trampoline18,
      '8': trampoline19,
      '9': trampoline20,
    },
  }));
  postReturn0 = exports1['cabi_post_shell#execute'];
})();

await $init;
const shell = {
  execute: execute,
  executeComponent: executeComponent,
  init: init,
  
};

export { shell }