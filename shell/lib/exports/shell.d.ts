export namespace Shell {
  export function init(): void;
  export function execute(line: string): Component | null;
  export function executeComponent(component: Component): void;
}
import type { Component } from '../exports/local-shell-runtime-component';
export { Component };
