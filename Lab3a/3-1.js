const http = require("http");

const hostname = "127.0.0.1";
const port = "5000";

const normState = "norm";
const stopState = "stop";
const idleState = "idle";
const testState = "test";

let state = "norm";
let input;

process.stdin.setEncoding("utf-8");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(state);
});

server.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`);
  process.stdout.write(`${state}->`)
});

process.stdin.on("readable", () => {
  while ((input = process.stdin.read()) != null) {
    if (input.trim() === "exit") {
      process.exit(0);
    } else if (
      input.trim() == normState ||
      input.trim() == stopState ||
      input.trim() == idleState ||
      input.trim() == testState
    ) {
      process.stdout.write(`reg = ${state}-->${input}`);
      state = input.trim();
      process.stdout.write(`${state}->`)
    } else {
      process.stdout.write(input);
      process.stdout.write(`${state}->`)
    }
  }
});
