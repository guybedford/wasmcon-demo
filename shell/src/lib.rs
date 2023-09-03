use exports::shell::Guest;

wit_bindgen::generate!({
    world: "shell",
    exports: {
        "shell": ShellComponent
    }
});

struct ShellComponent;

impl Guest for ShellComponent {
    fn init() -> Result<(), String> {
        Ok(())
    }

    fn execute(line: String) -> Result<(), String> {
        let args: Vec<&str> = line.split(' ').collect();

        let Some(cmd) = args.get(0) else {
            return Ok(());
        };

        match *cmd {
            "echo" => println!("{}", &args[1]),
            _ => println!("Wasmcon demo terminal: command not found: {cmd}"),
        }
        Ok(())
    }
}
