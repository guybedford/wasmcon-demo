cargo build --release --target wasm32-wasi
jco new target/wasm32-wasi/release/shell.wasm --wasi-reactor -o shell.wasm
jco transpile shell.wasm -o lib
