import { environment, exit as exit$1, stderr, stdin, stdout, terminalInput, terminalOutput, terminalStderr, terminalStdin, terminalStdout } from '@bytecodealliance/preview2-shim/cli';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { streams } from '@bytecodealliance/preview2-shim/io';
import { random } from '@bytecodealliance/preview2-shim/random';
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
  dropDescriptor,
  dropDirectoryEntryStream,
  getType,
  metadataHash,
  openAt,
  readViaStream,
  stat,
  writeViaStream } = types;
const { blockingRead,
  blockingWrite,
  dropInputStream,
  dropOutputStream,
  read,
  write } = streams;
const { getRandomBytes } = random;

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

function trampoline0(arg0) {
  dropDirectoryEntryStream(arg0 >>> 0);
}

function trampoline1(arg0) {
  dropInputStream(arg0 >>> 0);
}

function trampoline2(arg0) {
  dropOutputStream(arg0 >>> 0);
}

function trampoline3(arg0) {
  dropDescriptor(arg0 >>> 0);
}

function trampoline4() {
  const ret = getStdin();
  return toUint32(ret);
}

function trampoline5(arg0) {
  dropTerminalInput(arg0 >>> 0);
}

function trampoline6() {
  const ret = getStdout();
  return toUint32(ret);
}

function trampoline7(arg0) {
  dropTerminalOutput(arg0 >>> 0);
}

function trampoline8() {
  const ret = getStderr();
  return toUint32(ret);
}

function trampoline9(arg0) {
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

function trampoline10(arg0) {
  const ret = getDirectories();
  const vec2 = ret;
  const len2 = vec2.length;
  const result2 = realloc0(0, 0, 4, len2 * 12);
  for (let i = 0; i < vec2.length; i++) {
    const e = vec2[i];
    const base = result2 + i * 12;const [tuple0_0, tuple0_1] = e;
    dataView(memory0).setInt32(base + 0, toUint32(tuple0_0), true);
    const ptr1 = utf8Encode(tuple0_1, realloc0, memory0);
    const len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len1, true);
    dataView(memory0).setInt32(base + 4, ptr1, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len2, true);
  dataView(memory0).setInt32(arg0 + 0, result2, true);
}
let memory0;
let realloc0;

function trampoline11(arg0, arg1, arg2) {
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

function trampoline12(arg0, arg1, arg2) {
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

function trampoline13(arg0, arg1) {
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

function trampoline14(arg0, arg1) {
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

function trampoline15(arg0, arg1) {
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

function trampoline16(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
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

function trampoline17(arg0, arg1) {
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

function trampoline18(arg0, arg1) {
  const ret = getRandomBytes(BigInt.asUintN(64, arg0));
  const val0 = ret;
  const len0 = val0.byteLength;
  const ptr0 = realloc0(0, 0, 1, len0 * 1);
  const src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}

function trampoline19(arg0) {
  const ret = getEnvironment();
  const vec3 = ret;
  const len3 = vec3.length;
  const result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;const [tuple0_0, tuple0_1] = e;
    const ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    const len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    const ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    const len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline20(arg0, arg1, arg2) {
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
      const ptr1 = realloc0(0, 0, 1, len1 * 1);
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

function trampoline21(arg0, arg1, arg2) {
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
      const ptr1 = realloc0(0, 0, 1, len1 * 1);
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

function trampoline22(arg0, arg1, arg2, arg3) {
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

function trampoline23(arg0, arg1, arg2, arg3) {
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

function trampoline24(arg0) {
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

function trampoline25(arg0) {
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

function trampoline26(arg0) {
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
let realloc1;
let postReturn0;
let postReturn1;

function parse(arg0) {
  const ptr0 = utf8Encode(arg0, realloc1, memory0);
  const len0 = utf8EncodedLen;
  const ret = exports1['local:wasm-tools/tools#parse'](ptr0, len0);
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const ptr1 = dataView(memory0).getInt32(ret + 4, true);
      const len1 = dataView(memory0).getInt32(ret + 8, true);
      const result1 = new Uint8Array(memory0.buffer.slice(ptr1, ptr1 + len1 * 1));
      variant3= {
        tag: 'ok',
        val: result1
      };
      break;
    }
    case 1: {
      const ptr2 = dataView(memory0).getInt32(ret + 4, true);
      const len2 = dataView(memory0).getInt32(ret + 8, true);
      const result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
      variant3= {
        tag: 'err',
        val: result2
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant3.tag === 'err') {
    throw new ComponentError(variant3.val);
  }
  return variant3.val;
}

function print(arg0) {
  const val0 = arg0;
  const len0 = val0.byteLength;
  const ptr0 = realloc1(0, 0, 1, len0 * 1);
  const src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  const ret = exports1['local:wasm-tools/tools#print'](ptr0, len0);
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const ptr1 = dataView(memory0).getInt32(ret + 4, true);
      const len1 = dataView(memory0).getInt32(ret + 8, true);
      const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
      variant3= {
        tag: 'ok',
        val: result1
      };
      break;
    }
    case 1: {
      const ptr2 = dataView(memory0).getInt32(ret + 4, true);
      const len2 = dataView(memory0).getInt32(ret + 8, true);
      const result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
      variant3= {
        tag: 'err',
        val: result2
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant3.tag === 'err') {
    throw new ComponentError(variant3.val);
  }
  return variant3.val;
}

function componentNew(arg0, arg1) {
  const val0 = arg0;
  const len0 = val0.byteLength;
  const ptr0 = realloc1(0, 0, 1, len0 * 1);
  const src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  const variant5 = arg1;
  let variant5_0;
  let variant5_1;
  let variant5_2;
  if (variant5 === null || variant5=== undefined) {
    variant5_0 = 0;
    variant5_1 = 0;
    variant5_2 = 0;
  } else {
    const e = variant5;
    const vec4 = e;
    const len4 = vec4.length;
    const result4 = realloc1(0, 0, 4, len4 * 16);
    for (let i = 0; i < vec4.length; i++) {
      const e = vec4[i];
      const base = result4 + i * 16;const [tuple1_0, tuple1_1] = e;
      const ptr2 = utf8Encode(tuple1_0, realloc1, memory0);
      const len2 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len2, true);
      dataView(memory0).setInt32(base + 0, ptr2, true);
      const val3 = tuple1_1;
      const len3 = val3.byteLength;
      const ptr3 = realloc1(0, 0, 1, len3 * 1);
      const src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(base + 12, len3, true);
      dataView(memory0).setInt32(base + 8, ptr3, true);
    }
    variant5_0 = 1;
    variant5_1 = result4;
    variant5_2 = len4;
  }
  const ret = exports1['local:wasm-tools/tools#component-new'](ptr0, len0, variant5_0, variant5_1, variant5_2);
  let variant8;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const ptr6 = dataView(memory0).getInt32(ret + 4, true);
      const len6 = dataView(memory0).getInt32(ret + 8, true);
      const result6 = new Uint8Array(memory0.buffer.slice(ptr6, ptr6 + len6 * 1));
      variant8= {
        tag: 'ok',
        val: result6
      };
      break;
    }
    case 1: {
      const ptr7 = dataView(memory0).getInt32(ret + 4, true);
      const len7 = dataView(memory0).getInt32(ret + 8, true);
      const result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
      variant8= {
        tag: 'err',
        val: result7
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant8.tag === 'err') {
    throw new ComponentError(variant8.val);
  }
  return variant8.val;
}

function componentWit(arg0) {
  const val0 = arg0;
  const len0 = val0.byteLength;
  const ptr0 = realloc1(0, 0, 1, len0 * 1);
  const src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  const ret = exports1['local:wasm-tools/tools#component-wit'](ptr0, len0);
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const ptr1 = dataView(memory0).getInt32(ret + 4, true);
      const len1 = dataView(memory0).getInt32(ret + 8, true);
      const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
      variant3= {
        tag: 'ok',
        val: result1
      };
      break;
    }
    case 1: {
      const ptr2 = dataView(memory0).getInt32(ret + 4, true);
      const len2 = dataView(memory0).getInt32(ret + 8, true);
      const result2 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr2, len2));
      variant3= {
        tag: 'err',
        val: result2
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant3.tag === 'err') {
    throw new ComponentError(variant3.val);
  }
  return variant3.val;
}

function componentEmbed(arg0) {
  const ptr0 = realloc1(0, 0, 4, 64);
  const {binary: v1_0, witSource: v1_1, witPath: v1_2, stringEncoding: v1_3, dummy: v1_4, world: v1_5, metadata: v1_6 } = arg0;
  const variant3 = v1_0;
  if (variant3 === null || variant3=== undefined) {
    dataView(memory0).setInt8(ptr0 + 0, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(ptr0 + 0, 1, true);
    const val2 = e;
    const len2 = val2.byteLength;
    const ptr2 = realloc1(0, 0, 1, len2 * 1);
    const src2 = new Uint8Array(val2.buffer || val2, val2.byteOffset, len2 * 1);
    (new Uint8Array(memory0.buffer, ptr2, len2 * 1)).set(src2);
    dataView(memory0).setInt32(ptr0 + 8, len2, true);
    dataView(memory0).setInt32(ptr0 + 4, ptr2, true);
  }
  const variant5 = v1_1;
  if (variant5 === null || variant5=== undefined) {
    dataView(memory0).setInt8(ptr0 + 12, 0, true);
  } else {
    const e = variant5;
    dataView(memory0).setInt8(ptr0 + 12, 1, true);
    const ptr4 = utf8Encode(e, realloc1, memory0);
    const len4 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 20, len4, true);
    dataView(memory0).setInt32(ptr0 + 16, ptr4, true);
  }
  const variant7 = v1_2;
  if (variant7 === null || variant7=== undefined) {
    dataView(memory0).setInt8(ptr0 + 24, 0, true);
  } else {
    const e = variant7;
    dataView(memory0).setInt8(ptr0 + 24, 1, true);
    const ptr6 = utf8Encode(e, realloc1, memory0);
    const len6 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 32, len6, true);
    dataView(memory0).setInt32(ptr0 + 28, ptr6, true);
  }
  const variant9 = v1_3;
  if (variant9 === null || variant9=== undefined) {
    dataView(memory0).setInt8(ptr0 + 36, 0, true);
  } else {
    const e = variant9;
    dataView(memory0).setInt8(ptr0 + 36, 1, true);
    const val8 = e;
    let enum8;
    switch (val8) {
      case 'utf8': {
        enum8 = 0;
        break;
      }
      case 'utf16': {
        enum8 = 1;
        break;
      }
      case 'compact-utf16': {
        enum8 = 2;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val8}" is not one of the cases of string-encoding`);
      }
    }
    dataView(memory0).setInt8(ptr0 + 37, enum8, true);
  }
  const variant10 = v1_4;
  if (variant10 === null || variant10=== undefined) {
    dataView(memory0).setInt8(ptr0 + 38, 0, true);
  } else {
    const e = variant10;
    dataView(memory0).setInt8(ptr0 + 38, 1, true);
    dataView(memory0).setInt8(ptr0 + 39, e ? 1 : 0, true);
  }
  const variant12 = v1_5;
  if (variant12 === null || variant12=== undefined) {
    dataView(memory0).setInt8(ptr0 + 40, 0, true);
  } else {
    const e = variant12;
    dataView(memory0).setInt8(ptr0 + 40, 1, true);
    const ptr11 = utf8Encode(e, realloc1, memory0);
    const len11 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 48, len11, true);
    dataView(memory0).setInt32(ptr0 + 44, ptr11, true);
  }
  const variant20 = v1_6;
  if (variant20 === null || variant20=== undefined) {
    dataView(memory0).setInt8(ptr0 + 52, 0, true);
  } else {
    const e = variant20;
    dataView(memory0).setInt8(ptr0 + 52, 1, true);
    const vec19 = e;
    const len19 = vec19.length;
    const result19 = realloc1(0, 0, 4, len19 * 16);
    for (let i = 0; i < vec19.length; i++) {
      const e = vec19[i];
      const base = result19 + i * 16;const [tuple13_0, tuple13_1] = e;
      const ptr14 = utf8Encode(tuple13_0, realloc1, memory0);
      const len14 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len14, true);
      dataView(memory0).setInt32(base + 0, ptr14, true);
      const vec18 = tuple13_1;
      const len18 = vec18.length;
      const result18 = realloc1(0, 0, 4, len18 * 16);
      for (let i = 0; i < vec18.length; i++) {
        const e = vec18[i];
        const base = result18 + i * 16;const [tuple15_0, tuple15_1] = e;
        const ptr16 = utf8Encode(tuple15_0, realloc1, memory0);
        const len16 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 4, len16, true);
        dataView(memory0).setInt32(base + 0, ptr16, true);
        const ptr17 = utf8Encode(tuple15_1, realloc1, memory0);
        const len17 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 12, len17, true);
        dataView(memory0).setInt32(base + 8, ptr17, true);
      }
      dataView(memory0).setInt32(base + 12, len18, true);
      dataView(memory0).setInt32(base + 8, result18, true);
    }
    dataView(memory0).setInt32(ptr0 + 60, len19, true);
    dataView(memory0).setInt32(ptr0 + 56, result19, true);
  }
  const ret = exports1['local:wasm-tools/tools#component-embed'](ptr0);
  let variant23;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const ptr21 = dataView(memory0).getInt32(ret + 4, true);
      const len21 = dataView(memory0).getInt32(ret + 8, true);
      const result21 = new Uint8Array(memory0.buffer.slice(ptr21, ptr21 + len21 * 1));
      variant23= {
        tag: 'ok',
        val: result21
      };
      break;
    }
    case 1: {
      const ptr22 = dataView(memory0).getInt32(ret + 4, true);
      const len22 = dataView(memory0).getInt32(ret + 8, true);
      const result22 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr22, len22));
      variant23= {
        tag: 'err',
        val: result22
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant23.tag === 'err') {
    throw new ComponentError(variant23.val);
  }
  return variant23.val;
}

function metadataShow(arg0) {
  const val0 = arg0;
  const len0 = val0.byteLength;
  const ptr0 = realloc1(0, 0, 1, len0 * 1);
  const src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  const ret = exports1['local:wasm-tools/tools#metadata-show'](ptr0, len0);
  let variant11;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const len9 = dataView(memory0).getInt32(ret + 8, true);
      const base9 = dataView(memory0).getInt32(ret + 4, true);
      const result9 = [];
      for (let i = 0; i < len9; i++) {
        const base = base9 + i * 36;
        let variant2;
        switch (dataView(memory0).getUint8(base + 0, true)) {
          case 0: {
            variant2 = null;
            break;
          }
          case 1: {
            const ptr1 = dataView(memory0).getInt32(base + 4, true);
            const len1 = dataView(memory0).getInt32(base + 8, true);
            const result1 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr1, len1));
            variant2 = result1;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        let variant3;
        switch (dataView(memory0).getUint8(base + 12, true)) {
          case 0: {
            variant3= {
              tag: 'module',
            };
            break;
          }
          case 1: {
            variant3= {
              tag: 'component',
              val: dataView(memory0).getInt32(base + 16, true) >>> 0
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for ModuleMetaType');
          }
        }
        const len8 = dataView(memory0).getInt32(base + 32, true);
        const base8 = dataView(memory0).getInt32(base + 28, true);
        const result8 = [];
        for (let i = 0; i < len8; i++) {
          const base = base8 + i * 16;
          const ptr4 = dataView(memory0).getInt32(base + 0, true);
          const len4 = dataView(memory0).getInt32(base + 4, true);
          const result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
          const len7 = dataView(memory0).getInt32(base + 12, true);
          const base7 = dataView(memory0).getInt32(base + 8, true);
          const result7 = [];
          for (let i = 0; i < len7; i++) {
            const base = base7 + i * 16;
            const ptr5 = dataView(memory0).getInt32(base + 0, true);
            const len5 = dataView(memory0).getInt32(base + 4, true);
            const result5 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr5, len5));
            const ptr6 = dataView(memory0).getInt32(base + 8, true);
            const len6 = dataView(memory0).getInt32(base + 12, true);
            const result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
            result7.push([result5, result6]);
          }
          result8.push([result4, result7]);
        }
        result9.push({
          name: variant2,
          metaType: variant3,
          range: [dataView(memory0).getInt32(base + 20, true) >>> 0, dataView(memory0).getInt32(base + 24, true) >>> 0],
          producers: result8,
        });
      }
      variant11= {
        tag: 'ok',
        val: result9
      };
      break;
    }
    case 1: {
      const ptr10 = dataView(memory0).getInt32(ret + 4, true);
      const len10 = dataView(memory0).getInt32(ret + 8, true);
      const result10 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr10, len10));
      variant11= {
        tag: 'err',
        val: result10
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn1(ret);
  if (variant11.tag === 'err') {
    throw new ComponentError(variant11.val);
  }
  return variant11.val;
}

function metadataAdd(arg0, arg1) {
  const val0 = arg0;
  const len0 = val0.byteLength;
  const ptr0 = realloc1(0, 0, 1, len0 * 1);
  const src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  const vec7 = arg1;
  const len7 = vec7.length;
  const result7 = realloc1(0, 0, 4, len7 * 16);
  for (let i = 0; i < vec7.length; i++) {
    const e = vec7[i];
    const base = result7 + i * 16;const [tuple1_0, tuple1_1] = e;
    const ptr2 = utf8Encode(tuple1_0, realloc1, memory0);
    const len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len2, true);
    dataView(memory0).setInt32(base + 0, ptr2, true);
    const vec6 = tuple1_1;
    const len6 = vec6.length;
    const result6 = realloc1(0, 0, 4, len6 * 16);
    for (let i = 0; i < vec6.length; i++) {
      const e = vec6[i];
      const base = result6 + i * 16;const [tuple3_0, tuple3_1] = e;
      const ptr4 = utf8Encode(tuple3_0, realloc1, memory0);
      const len4 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len4, true);
      dataView(memory0).setInt32(base + 0, ptr4, true);
      const ptr5 = utf8Encode(tuple3_1, realloc1, memory0);
      const len5 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len5, true);
      dataView(memory0).setInt32(base + 8, ptr5, true);
    }
    dataView(memory0).setInt32(base + 12, len6, true);
    dataView(memory0).setInt32(base + 8, result6, true);
  }
  const ret = exports1['local:wasm-tools/tools#metadata-add'](ptr0, len0, result7, len7);
  let variant10;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const ptr8 = dataView(memory0).getInt32(ret + 4, true);
      const len8 = dataView(memory0).getInt32(ret + 8, true);
      const result8 = new Uint8Array(memory0.buffer.slice(ptr8, ptr8 + len8 * 1));
      variant10= {
        tag: 'ok',
        val: result8
      };
      break;
    }
    case 1: {
      const ptr9 = dataView(memory0).getInt32(ret + 4, true);
      const len9 = dataView(memory0).getInt32(ret + 8, true);
      const result9 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr9, len9));
      variant10= {
        tag: 'err',
        val: result9
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  postReturn0(ret);
  if (variant10.tag === 'err') {
    throw new ComponentError(variant10.val);
  }
  return variant10.val;
}

const $init = (async() => {
  const module0 = fetchCompile(new URL('./wasm-tools.component.core.wasm', import.meta.url));
  const module1 = fetchCompile(new URL('./wasm-tools.component.core2.wasm', import.meta.url));
  const module2 = base64Compile('AGFzbQEAAAABUgxgAX8AYAN/fn8AYAJ/fwBgCH9/f39/f39/AGACfn8AYAR/f39/AGACf38Bf2AEf39/fwF/YAl/f39/f35+f38Bf2ABfwF/YAN/f38Bf2ABfwADHRwAAQECAgIDAgQAAQEFBQAAAAYHBwgGBgYJBgoLBAUBcAEcHAeOAR0BMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgBOQAJAjEwAAoCMTEACwIxMgAMAjEzAA0CMTQADgIxNQAPAjE2ABACMTcAEQIxOAASAjE5ABMCMjAAFAIyMQAVAjIyABYCMjMAFwIyNAAYAjI1ABkCMjYAGgIyNwAbCCRpbXBvcnRzAQAK9wIcCQAgAEEAEQAACw0AIAAgASACQQERAQALDQAgACABIAJBAhEBAAsLACAAIAFBAxECAAsLACAAIAFBBBECAAsLACAAIAFBBRECAAsXACAAIAEgAiADIAQgBSAGIAdBBhEDAAsLACAAIAFBBxECAAsLACAAIAFBCBEEAAsJACAAQQkRAAALDQAgACABIAJBChEBAAsNACAAIAEgAkELEQEACw8AIAAgASACIANBDBEFAAsPACAAIAEgAiADQQ0RBQALCQAgAEEOEQAACwkAIABBDxEAAAsJACAAQRARAAALCwAgACABQRERBgALDwAgACABIAIgA0ESEQcACw8AIAAgASACIANBExEHAAsZACAAIAEgAiADIAQgBSAGIAcgCEEUEQgACwsAIAAgAUEVEQYACwsAIAAgAUEWEQYACwsAIAAgAUEXEQYACwkAIABBGBEJAAsLACAAIAFBGREGAAsNACAAIAEgAkEaEQoACwkAIABBGxELAAsALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjE0LjAA7AkEbmFtZQATEndpdC1jb21wb25lbnQ6c2hpbQHPCRwAMWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS9wcmVvcGVucy1nZXQtZGlyZWN0b3JpZXMBLmluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy1yZWFkLXZpYS1zdHJlYW0CL2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy13cml0ZS12aWEtc3RyZWFtAzBpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXMtYXBwZW5kLXZpYS1zdHJlYW0EJ2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy1nZXQtdHlwZQUjaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzLXN0YXQGJmluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy1vcGVuLWF0ByxpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXMtbWV0YWRhdGEtaGFzaAgsaW5kaXJlY3Qtd2FzaTpyYW5kb20vcmFuZG9tLWdldC1yYW5kb20tYnl0ZXMJLWluZGlyZWN0LXdhc2k6Y2xpL2Vudmlyb25tZW50LWdldC1lbnZpcm9ubWVudAodaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zLXJlYWQLJmluZGlyZWN0LXdhc2k6aW8vc3RyZWFtcy1ibG9ja2luZy1yZWFkDB5pbmRpcmVjdC13YXNpOmlvL3N0cmVhbXMtd3JpdGUNJ2luZGlyZWN0LXdhc2k6aW8vc3RyZWFtcy1ibG9ja2luZy13cml0ZQ4zaW5kaXJlY3Qtd2FzaTpjbGkvdGVybWluYWwtc3RkaW4tZ2V0LXRlcm1pbmFsLXN0ZGluDzVpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRvdXQtZ2V0LXRlcm1pbmFsLXN0ZG91dBA1aW5kaXJlY3Qtd2FzaTpjbGkvdGVybWluYWwtc3RkZXJyLWdldC10ZXJtaW5hbC1zdGRlcnIRLGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfZmlsZXN0YXRfZ2V0EiRhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3JlYWQTJWFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfd3JpdGUUJmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcGF0aF9vcGVuFSdhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXJhbmRvbV9nZXQWKGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9nZXQXLmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9zaXplc19nZXQYJWFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfY2xvc2UZK2FkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcHJlc3RhdF9nZXQaMGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcHJlc3RhdF9kaXJfbmFtZRsmYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wcm9jX2V4aXQ');
  const module3 = base64Compile('AGFzbQEAAAABUgxgAX8AYAN/fn8AYAJ/fwBgCH9/f39/f39/AGACfn8AYAR/f39/AGACf38Bf2AEf39/fwF/YAl/f39/f35+f38Bf2ABfwF/YAN/f38Bf2ABfwACrgEdAAEwAAAAATEAAQABMgABAAEzAAIAATQAAgABNQACAAE2AAMAATcAAgABOAAEAAE5AAAAAjEwAAEAAjExAAEAAjEyAAUAAjEzAAUAAjE0AAAAAjE1AAAAAjE2AAAAAjE3AAYAAjE4AAcAAjE5AAcAAjIwAAgAAjIxAAYAAjIyAAYAAjIzAAYAAjI0AAkAAjI1AAYAAjI2AAoAAjI3AAsACCRpbXBvcnRzAXABHBwJIgEAQQALHAABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhsALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjE0LjAAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
  const instanceFlags0 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  const instanceFlags1 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  Promise.all([module0, module1, module2, module3]).catch(() => {});
  ({ exports: exports0 } = await instantiateCore(await module2));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    wasi_snapshot_preview1: {
      environ_get: exports0['22'],
      environ_sizes_get: exports0['23'],
      fd_close: exports0['24'],
      fd_filestat_get: exports0['17'],
      fd_prestat_dir_name: exports0['26'],
      fd_prestat_get: exports0['25'],
      fd_read: exports0['18'],
      fd_write: exports0['19'],
      path_open: exports0['20'],
      proc_exit: exports0['27'],
      random_get: exports0['21'],
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
      'get-environment': exports0['9'],
    },
    'wasi:cli/exit': {
      exit: trampoline9,
    },
    'wasi:cli/stderr': {
      'get-stderr': trampoline8,
    },
    'wasi:cli/stdin': {
      'get-stdin': trampoline4,
    },
    'wasi:cli/stdout': {
      'get-stdout': trampoline6,
    },
    'wasi:cli/terminal-input': {
      'drop-terminal-input': trampoline5,
    },
    'wasi:cli/terminal-output': {
      'drop-terminal-output': trampoline7,
    },
    'wasi:cli/terminal-stderr': {
      'get-terminal-stderr': exports0['16'],
    },
    'wasi:cli/terminal-stdin': {
      'get-terminal-stdin': exports0['14'],
    },
    'wasi:cli/terminal-stdout': {
      'get-terminal-stdout': exports0['15'],
    },
    'wasi:filesystem/preopens': {
      'get-directories': exports0['0'],
    },
    'wasi:filesystem/types': {
      'append-via-stream': exports0['3'],
      'drop-descriptor': trampoline3,
      'drop-directory-entry-stream': trampoline0,
      'get-type': exports0['4'],
      'metadata-hash': exports0['7'],
      'open-at': exports0['6'],
      'read-via-stream': exports0['1'],
      stat: exports0['5'],
      'write-via-stream': exports0['2'],
    },
    'wasi:io/streams': {
      'blocking-read': exports0['11'],
      'blocking-write': exports0['13'],
      'drop-input-stream': trampoline1,
      'drop-output-stream': trampoline2,
      read: exports0['10'],
      write: exports0['12'],
    },
    'wasi:random/random': {
      'get-random-bytes': exports0['8'],
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports2.cabi_import_realloc;
  ({ exports: exports3 } = await instantiateCore(await module3, {
    '': {
      $imports: exports0.$imports,
      '0': trampoline10,
      '1': trampoline11,
      '10': trampoline20,
      '11': trampoline21,
      '12': trampoline22,
      '13': trampoline23,
      '14': trampoline24,
      '15': trampoline25,
      '16': trampoline26,
      '17': exports2.fd_filestat_get,
      '18': exports2.fd_read,
      '19': exports2.fd_write,
      '2': trampoline12,
      '20': exports2.path_open,
      '21': exports2.random_get,
      '22': exports2.environ_get,
      '23': exports2.environ_sizes_get,
      '24': exports2.fd_close,
      '25': exports2.fd_prestat_get,
      '26': exports2.fd_prestat_dir_name,
      '27': exports2.proc_exit,
      '3': trampoline13,
      '4': trampoline14,
      '5': trampoline15,
      '6': trampoline16,
      '7': trampoline17,
      '8': trampoline18,
      '9': trampoline19,
    },
  }));
  realloc1 = exports1.cabi_realloc;
  postReturn0 = exports1['cabi_post_local:wasm-tools/tools#component-embed'];
  postReturn1 = exports1['cabi_post_local:wasm-tools/tools#metadata-show'];
})();

await $init;
const tools = {
  componentEmbed: componentEmbed,
  componentNew: componentNew,
  componentWit: componentWit,
  metadataAdd: metadataAdd,
  metadataShow: metadataShow,
  parse: parse,
  print: print,
  
};

export { tools, tools as 'local:wasm-tools/tools' }