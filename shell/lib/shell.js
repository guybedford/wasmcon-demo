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
  dropDescriptor,
  dropDirectoryEntryStream,
  getType,
  openAt,
  writeViaStream } = types;
const { blockingWrite,
  dropInputStream,
  dropOutputStream,
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

function trampoline12(arg0, arg1) {
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

function trampoline13(arg0, arg1) {
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

function trampoline14(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
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

function trampoline15(arg0) {
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

function trampoline16(arg0, arg1, arg2, arg3) {
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

function trampoline17(arg0, arg1, arg2, arg3) {
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

function trampoline18(arg0) {
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

function trampoline19(arg0) {
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

function trampoline20(arg0) {
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
let realloc1;

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
  const ptr0 = utf8Encode(arg0, realloc1, memory0);
  const len0 = utf8EncodedLen;
  const ret = exports1['shell#execute'](ptr0, len0);
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
  const module2 = base64Compile('AGFzbQEAAAABTQtgAX8AYAN/fn8AYAJ/fwBgCH9/f39/f39/AGAEf39/fwBgBH9/f38Bf2AJf39/f39+fn9/AX9gAn9/AX9gAX8Bf2ADf39/AX9gAX8AAxQTAAECAgMABAQAAAAFBgcHCAcJCgQFAXABExMHYRQBMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgBOQAJAjEwAAoCMTEACwIxMgAMAjEzAA0CMTQADgIxNQAPAjE2ABACMTcAEQIxOAASCCRpbXBvcnRzAQAKgQITCQAgAEEAEQAACw0AIAAgASACQQERAQALCwAgACABQQIRAgALCwAgACABQQMRAgALFwAgACABIAIgAyAEIAUgBiAHQQQRAwALCQAgAEEFEQAACw8AIAAgASACIANBBhEEAAsPACAAIAEgAiADQQcRBAALCQAgAEEIEQAACwkAIABBCREAAAsJACAAQQoRAAALDwAgACABIAIgA0ELEQUACxkAIAAgASACIAMgBCAFIAYgByAIQQwRBgALCwAgACABQQ0RBwALCwAgACABQQ4RBwALCQAgAEEPEQgACwsAIAAgAUEQEQcACw0AIAAgASACQRERCQALCQAgAEESEQoACwAuCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BjAuMTQuMAD3BgRuYW1lABMSd2l0LWNvbXBvbmVudDpzaGltAdoGEwAxaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3ByZW9wZW5zLWdldC1kaXJlY3RvcmllcwEvaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzLXdyaXRlLXZpYS1zdHJlYW0CMGluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlcy1hcHBlbmQtdmlhLXN0cmVhbQMnaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzLWdldC10eXBlBCZpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXMtb3Blbi1hdAUtaW5kaXJlY3Qtd2FzaTpjbGkvZW52aXJvbm1lbnQtZ2V0LWVudmlyb25tZW50Bh5pbmRpcmVjdC13YXNpOmlvL3N0cmVhbXMtd3JpdGUHJ2luZGlyZWN0LXdhc2k6aW8vc3RyZWFtcy1ibG9ja2luZy13cml0ZQgzaW5kaXJlY3Qtd2FzaTpjbGkvdGVybWluYWwtc3RkaW4tZ2V0LXRlcm1pbmFsLXN0ZGluCTVpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRvdXQtZ2V0LXRlcm1pbmFsLXN0ZG91dAo1aW5kaXJlY3Qtd2FzaTpjbGkvdGVybWluYWwtc3RkZXJyLWdldC10ZXJtaW5hbC1zdGRlcnILJWFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfd3JpdGUMJmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcGF0aF9vcGVuDShhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWVudmlyb25fZ2V0Di5hZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWVudmlyb25fc2l6ZXNfZ2V0DyVhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX2Nsb3NlECthZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3ByZXN0YXRfZ2V0ETBhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3ByZXN0YXRfZGlyX25hbWUSJmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcHJvY19leGl0');
  const module3 = base64Compile('AGFzbQEAAAABTQtgAX8AYAN/fn8AYAJ/fwBgCH9/f39/f39/AGAEf39/fwBgBH9/f38Bf2AJf39/f39+fn9/AX9gAn9/AX9gAX8Bf2ADf39/AX9gAX8AAngUAAEwAAAAATEAAQABMgACAAEzAAIAATQAAwABNQAAAAE2AAQAATcABAABOAAAAAE5AAAAAjEwAAAAAjExAAUAAjEyAAYAAjEzAAcAAjE0AAcAAjE1AAgAAjE2AAcAAjE3AAkAAjE4AAoACCRpbXBvcnRzAXABExMJGQEAQQALEwABAgMEBQYHCAkKCwwNDg8QERIALglwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAYwLjE0LjAAHARuYW1lABUUd2l0LWNvbXBvbmVudDpmaXh1cHM');
  const instanceFlags0 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  const instanceFlags1 = new WebAssembly.Global({ value: "i32", mutable: true }, 3);
  Promise.all([module0, module1, module2, module3]).catch(() => {});
  ({ exports: exports0 } = await instantiateCore(await module2));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    wasi_snapshot_preview1: {
      environ_get: exports0['13'],
      environ_sizes_get: exports0['14'],
      fd_close: exports0['15'],
      fd_prestat_dir_name: exports0['17'],
      fd_prestat_get: exports0['16'],
      fd_write: exports0['11'],
      path_open: exports0['12'],
      proc_exit: exports0['18'],
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
      'get-environment': exports0['5'],
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
      'get-terminal-stderr': exports0['10'],
    },
    'wasi:cli/terminal-stdin': {
      'get-terminal-stdin': exports0['8'],
    },
    'wasi:cli/terminal-stdout': {
      'get-terminal-stdout': exports0['9'],
    },
    'wasi:filesystem/preopens': {
      'get-directories': exports0['0'],
    },
    'wasi:filesystem/types': {
      'append-via-stream': exports0['2'],
      'drop-descriptor': trampoline3,
      'drop-directory-entry-stream': trampoline0,
      'get-type': exports0['3'],
      'open-at': exports0['4'],
      'write-via-stream': exports0['1'],
    },
    'wasi:io/streams': {
      'blocking-write': exports0['7'],
      'drop-input-stream': trampoline1,
      'drop-output-stream': trampoline2,
      write: exports0['6'],
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
      '11': exports2.fd_write,
      '12': exports2.path_open,
      '13': exports2.environ_get,
      '14': exports2.environ_sizes_get,
      '15': exports2.fd_close,
      '16': exports2.fd_prestat_get,
      '17': exports2.fd_prestat_dir_name,
      '18': exports2.proc_exit,
      '2': trampoline12,
      '3': trampoline13,
      '4': trampoline14,
      '5': trampoline15,
      '6': trampoline16,
      '7': trampoline17,
      '8': trampoline18,
      '9': trampoline19,
    },
  }));
  postReturn0 = exports1['cabi_post_shell#execute'];
  realloc1 = exports1.cabi_realloc;
})();

await $init;
const shell = {
  execute: execute,
  init: init,
  
};

export { shell }