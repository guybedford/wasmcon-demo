export namespace WasiIoStreams {
  export function read(this_: InputStream, len: bigint): [Uint8Array, StreamStatus];
  export function blockingRead(this_: InputStream, len: bigint): [Uint8Array, StreamStatus];
  export function dropInputStream(this_: InputStream): void;
  export function write(this_: OutputStream, buf: Uint8Array | ArrayBuffer): [bigint, StreamStatus];
  export function blockingWrite(this_: OutputStream, buf: Uint8Array | ArrayBuffer): [bigint, StreamStatus];
  export function dropOutputStream(this_: OutputStream): void;
}
export type InputStream = number;
/**
 * # Variants
 * 
 * ## `"open"`
 * 
 * ## `"ended"`
 */
export type StreamStatus = 'open' | 'ended';
export type OutputStream = number;
