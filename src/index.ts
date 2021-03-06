import { App } from './app';
import { config } from "dotenv";
config({ path: __dirname + '/../.env' });

async function main() {
    const app = new App(process.env.PORT);
    await app.listen()
}
main();