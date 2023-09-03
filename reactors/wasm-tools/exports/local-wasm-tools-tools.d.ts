export namespace LocalWasmToolsTools {
  export function parse(wat: string): Uint8Array;
  export function print(binary: Uint8Array | ArrayBuffer): string;
  export function componentNew(binary: Uint8Array | ArrayBuffer, adapters: [string, Uint8Array | ArrayBuffer][] | null): Uint8Array;
  export function componentWit(binary: Uint8Array | ArrayBuffer): string;
  export function componentEmbed(embedOpts: EmbedOpts): Uint8Array;
  export function metadataShow(binary: Uint8Array | ArrayBuffer): ModuleMetadata[];
  export function metadataAdd(binary: Uint8Array | ArrayBuffer, metadata: ProducersFields): Uint8Array;
}
/**
 * # Variants
 * 
 * ## `"utf8"`
 * 
 * ## `"utf16"`
 * 
 * ## `"compact-utf16"`
 */
export type StringEncoding = 'utf8' | 'utf16' | 'compact-utf16';
export type ProducersFields = [string, [string, string][]][];
export interface EmbedOpts {
  binary?: Uint8Array,
  witSource?: string,
  witPath?: string,
  stringEncoding?: StringEncoding,
  dummy?: boolean,
  world?: string,
  metadata?: ProducersFields,
}
export type ModuleMetaType = ModuleMetaTypeModule | ModuleMetaTypeComponent;
export interface ModuleMetaTypeModule {
  tag: 'module',
}
export interface ModuleMetaTypeComponent {
  tag: 'component',
  val: number,
}
export interface ModuleMetadata {
  name?: string,
  metaType: ModuleMetaType,
  range: [number, number],
  producers: ProducersFields,
}
