import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const processes = [
    {
        name: "server",
        cwd: path.join(rootDir, "server")
    },
    {
        name: "client",
        cwd: path.join(rootDir, "client")
    }
];

const children = processes.map(({ name, cwd }) => {
    const child = spawn(npmCommand, ["run", "dev"], {
        cwd,
        stdio: "inherit",
        shell: process.platform === "win32"
    });

    child.on("exit", (code) => {
        if (code && code !== 0) {
            console.error(`${name} dev process exited with code ${code}`);
            shutdown(code);
        }
    });

    return child;
});

const shutdown = (code = 0) => {
    for (const child of children) {
        if (!child.killed) {
            child.kill();
        }
    }

    process.exit(code);
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
