use std::collections::BTreeMap;
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
static mut ENV: Vec<(String, String)> = Vec::new();
fn env() -> &'static mut Vec<(String, String)> {
    unsafe { &mut ENV }
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
        let mut args = args.as_slice();

        let mut cur_env = env().clone();
        while args.len() > 0 && args[0].contains('=') {
            let assignment = &args[0];
            args = &args[1..];
            let eq_idx = assignment.find('=').unwrap();
            let key = &assignment[0..eq_idx];
            let val = &assignment[eq_idx + 1..];
            cur_env.push((key.to_string(), val.to_string()));
        }
        if args.len() == 0 {
            env().append(&mut cur_env);
        }

        let args: Vec<String> = args
            .to_vec()
            .drain(..)
            .map(|arg| replace_env_vars(arg, &env()))
            .collect();

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
                Some(env().as_slice()),
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

fn replace_env_vars(arg: String, env: &Vec<(String, String)>) -> String {
    if arg.find('$').is_none() {
        return arg;
    }
    let mut out_arg = arg;
    for (name, value) in env {
        if !out_arg.contains(name) {
            continue;
        }
        let env_str = format!("${name}");
        if out_arg.contains(&env_str) {
            out_arg = out_arg.replace(&env_str, &value);
            if out_arg.find('$').is_none() {
                return out_arg;
            }
        }
    }
    out_arg
}
