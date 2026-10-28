import { spawn } from "node:child_process";
import { mkdtemp, readdir, copyFile, rm, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join, relative, sep } from "node:path";

const root = process.cwd();
const output = await mkdtemp(join(tmpdir(), "gematria-pages-"));
const allowedExtensions = new Set([
  ".html", ".css", ".js", ".mjs", ".cjs", ".json", ".jsonc", ".xml", ".webmanifest",
  ".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".avif",
  ".woff", ".woff2", ".ttf", ".otf", ".pdf", ".mp3", ".mp4", ".webm", ".ogg"
]);
const allowedSpecialFiles = new Set(["_headers", "_redirects", "_routes.json", "robots.txt", "CNAME"]);
const excludedDirectories = new Set([
  ".git", ".github", ".vscode", "node_modules", "tests", "scripts",
  "coverage", "dist", "build", ".firebase"
]);
const excludedName = /(?:^|[._-])(?:backup|bak)(?:$|[._-])/i;
const excludedFiles = new Set(["firebase.json", "firestore.rules", "firestore.indexes.json", "package.json", "package-lock.json", "npm-shrinkwrap.json"]);

async function stageDirectory(source, target) {
  await mkdir(target, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || excludedDirectories.has(entry.name)) continue;
    if (excludedName.test(entry.name) || /\.log$|\.pyc?$|\.bat$|\.ps1$|\.md$/i.test(entry.name)) continue;
    const from = join(source, entry.name);
    const to = join(target, entry.name);
    if (entry.isDirectory()) {
      await stageDirectory(from, to);
      continue;
    }
    if (!entry.isFile()) continue;
    if (allowedExtensions.has(extname(entry.name).toLowerCase()) || allowedSpecialFiles.has(entry.name)) {
      await copyFile(from, to);
    }
  }
}

try {
  await stageDirectory(root, output);
  const executable = process.platform === "win32" ? "npx.cmd" : "npx";
  const result = await new Promise((resolve, reject) => {
    const child = spawn(executable, ["wrangler", "pages", "deploy", output, "--project-name=gematria-academy", "--commit-dirty=true"], {
      cwd: root,
      stdio: "inherit",
      shell: process.platform === "win32"
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => resolve({ code, signal }));
  });
  if (result.code !== 0) process.exitCode = result.code ?? 1;
} finally {
  await rm(output, { recursive: true, force: true });
}
