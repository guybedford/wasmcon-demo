export namespace LocalShellRuntimeComponent {
  export { Component };
}

export class Component {
  constructor(url: string, pwd: string | null, env: [string, string][] | null, args: string[] | null)
  runCmd(): number;
}
