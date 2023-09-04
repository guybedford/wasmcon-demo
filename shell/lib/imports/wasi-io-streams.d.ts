export namespace WasiIoStreams {
  export function dropInputStream(this_: InputStream): void;
  export function write(this_: OutputStream, buf: Uint8Array): [bigint, StreamStatus];
  export function blockingWrite(this_: OutputStream, buf: Uint8Array): [bigint, StreamStatus];
  export function dropOutputStream(this_: OutputStream): void;
}
export type InputStream = number;
export type OutputStream = number;
/**
 * # Variants
 * 
 * ## `"open"`
 * 
 * ## `"ended"`
 */
export type StreamStatus = 'open' | 'ended';
