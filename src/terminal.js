export function createTerminal (prefix, el, exec) {
  const term = new Terminal({ convertEol: true });

  const fitAddon = new FitAddon.FitAddon();
  term.loadAddon(fitAddon);
  term.open(el);
  fitAddon.fit();
  window.onresize = () => fitAddon.fit();

  let lineBuffer = [];
  let history = JSON.parse(localStorage['history'] || '[]');
  let shellListener = null;
  let historyIdx = -1;
  let cursorOffset = 0;

  async function simpleShell(data) {
    for (let i = 0; i < data.length; ++i) {
      const c3 = data.slice(i, i + 3);
      switch (c3) {
        // arrow keys
        case '\x1b[A': {
          i += 2;
          if (historyIdx === -1)
            historyIdx = history.length - 1;
          else
            historyIdx -= 1;
          const historyEntry = history[historyIdx];
          lineBuffer = historyEntry.split('');
          cursorOffset = 0;
          term.write('\x1b[2K\r' + prefix + historyEntry);
          continue;
        }
        case '\x1b[B': {
          i += 2;
          if (historyIdx === -1)
            continue;
          historyIdx += 1;
          if (historyIdx > history.length - 1) {
            historyIdx = -1;
            term.write('\x1b[2K\r' + prefix);
            continue;
          }
          const historyEntry = history[historyIdx];
          lineBuffer = historyEntry.split('');
          cursorOffset = 0;
          term.write('\x1b[2K\r' + prefix + historyEntry);
          continue;
        }
        case '\x1b[C':
          i += 2;
          if (cursorOffset < 0) {
            cursorOffset += 1;
            term.write(c3);
          }
          continue;
        case '\x1b[D':
          i += 2;
          if (cursorOffset > -lineBuffer.length) {
            cursorOffset -= 1;
            term.write(c3);
          }
          continue;
      }
      historyIdx = -1;
      let c = data[i];
      switch (c) {
        case '\t':
          term.write('    ');
          lineBuffer.splice(lineBuffer.length, 0, ' ', ' ', ' ', ' ');
          break;
        // ctrl+C
        case '\u0003':
          lineBuffer = [];
          term.writeln('');
          cursorOffset = 0;
          historyIdx = 0;
          term.write(prefix);
          break;
        case '\r':
          term.write('\r\n');
          if (lineBuffer.length) {
            const command = lineBuffer.join('');
            lineBuffer = [];
            history.push(command);
            if (history.length > 200)
              history = history.slice(-200);
            localStorage.history = JSON.stringify(history);
            try {
              shellListener?.dispose();
              await exec(command);
            } catch (e) {
              console.error(e);
              const msg = e?.message || e || 'Error';
              term.writeln(`\r\x1b[31m${msg.replace('\n', '\r\n')}\x1b[m`);
            } finally {
              shellListener = term.onData(simpleShell);
            }
          }
          cursorOffset = 0;
          term.write(prefix);
          break;
        // backspace
        case '\x7F':
          if (lineBuffer.length && cursorOffset > -lineBuffer.length) {
            if (cursorOffset === 0) {
              lineBuffer.splice(lineBuffer.length + cursorOffset - 1, 1);
            } else if (cursorOffset > -lineBuffer.length) {
              lineBuffer.splice(lineBuffer.length + cursorOffset - 1, 1, ' ');
              cursorOffset -= 1;
            }
            term.write('\b \b');
            break;
          }
          break;
        default:
          lineBuffer.splice(lineBuffer.length + cursorOffset, 1, [c]);
          if (cursorOffset < 0)
            cursorOffset += 1;
          term.write(c);
      }
    }
  }

  // shell startup
  shellListener = term.onData(simpleShell);
  term.write(prefix);

  return term;
}
