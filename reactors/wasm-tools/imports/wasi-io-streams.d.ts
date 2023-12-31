export namespace WasiIoStreams {
  export function read(this: InputStream, len: bigint): [Uint8Array | ArrayBuffer, StreamStatus];
  export function blockingRead(this: InputStream, len: bigint): [Uint8Array | ArrayBuffer, StreamStatus];
  export function dropInputStream(this: InputStream): void;
  export function write(this: OutputStream, buf: Uint8Array): [bigint, StreamStatus];
  export function blockingWrite(this: OutputStream, buf: Uint8Array): [bigint, StreamStatus];
  export function dropOutputStream(this: OutputStream): void;
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
