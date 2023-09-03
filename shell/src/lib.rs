use std::collections::BTreeMap;
use std::env;
use std::error::Error;
use std::fs;
use std::io::{stdout, Error as IoError, Write};

use exports::shell::Guest;

wit_bindgen::generate!({
    world: "shell",
    exports: {
        "shell": ShellComponent
    }
});

use local::shell::runtime_component::Component;

static mut PWD: String = String::new();
fn pwd() -> &'static mut String {
    unsafe { &mut PWD }
}
static mut COMMANDS: BTreeMap<String, String> = BTreeMap::new();
fn commands() -> &'static mut BTreeMap<String, String> {
    unsafe { &mut COMMANDS }
}

struct ShellComponent;

impl Guest for ShellComponent {
    fn init() -> Result<(), String> {
        pwd().push('/');
        init_fs().map_err(err_str)?;
        Ok(())
    }

    fn execute(line: String) -> Result<Option<Component>, String> {
        let args: Vec<String> = line.split(' ').map(|arg| arg.into()).collect();

        let Some(cmd) = args.get(0) else {
            return Ok(None);
        };

        // wasm commands
        let cmd_url = match cmd.as_str() {
            "ls" => Some("commands/ls.wasm"),
            "wasm-tools" => Some("commands/wasm-tools.wasm"),
            _ => match commands().get(cmd) {
                Some(cmd) => Some(cmd.as_str()),
                None => None,
            },
        };
        if let Some(cmd_url) = cmd_url {
            let pwd = pwd();
            let cmd = Component::new(
                cmd_url,
                Some(pwd),
                Some(
                    env::vars()
                        .into_iter()
                        .collect::<Vec<(String, String)>>()
                        .as_slice(),
                ),
                Some(args.as_slice()),
            );
            return Ok(Some(cmd));
        };

        match cmd.as_str() {
            "install" => {
                commands().insert(args[1].to_string(), args[2].to_string());
                println!("\x1b[1;32mOK\x1b[0m: Installed \x1b[1m{}\x1b[0m", args[1]);
            },
            "echo" => println!("{}", &args[1]),
            "pwd" => println!("{}", pwd()),
            "cat" => println!("{}", fs::read_to_string(&args[1]).map_err(err_str)?),
            "mkdir" => fs::create_dir_all(&args[1]).map_err(err_str)?,
            "cd" => resolve(pwd(), &args[1]),
            "clear" => print!("\x1b[2J\x1b[H"),
            _ => println!("Wasmcon demo terminal: command not found: {cmd}"),
        }
        stdout().flush().map_err(err_str)?;
        Ok(None)
    }
    fn execute_component(component: Component) -> Result<(), String> {
        let _code = component.run_cmd()?;
        Ok(())
    }
}

fn err_str<E: Error>(e: E) -> String {
    format!("{:?}", e)
}

fn init_fs() -> Result<(), IoError> {
    fs::create_dir_all("/deps")?;
    fs::write("/shell.wit", include_str!("../wit/shell.wit"))?;
    fs::write("/dummy.wasm", include_bytes!("../dummy.wasm"))?;
    Ok(())
}

fn resolve(path: &mut String, to: &str) {
    for segment in to.split('/') {
        if segment == "." {
            continue;
        }
        if segment == ".." {
            let mut parts = path.split('/').collect::<Vec<&str>>();
            parts.pop();
            let joined = parts.join("/");
            path.clear();
            path.push_str(joined.as_str());
            if path.len() == 0 {
                path.push('/');
            }
            continue;
        }
        if !path.ends_with('/') {
            path.push('/');
        }
        path.push_str(segment);
    }
}
