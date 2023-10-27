import readline from "readline-sync";
import childProcess from "child_process";

const PREFIX = "test-input";
let cmdInputs = readInputsFromArgv();

function readInputsFromArgv () {
    let test = process.argv.filter(str => str.startsWith(PREFIX));
    if (test.length === 0) {
        return false;
    } else {
        return test[0].substring(PREFIX.length + 1).split("\\n");
    }
}

function read (prompt) {
    if (cmdInputs) {
        return cmdInputs.shift();
    } else {
        return readline.question(prompt);
    }
}

function write (output) {
    if (cmdInputs) {
        process.stdout.write(output + "\n");
    } else {
        console.log(output);
    }
}

function runFileWithInputs (path, ...inputs) {
    return new Promise((s, f) => {
        let cmd = `node "${path}" ${PREFIX}="${inputs.join("\\n")}"`;

        childProcess.exec(cmd, (error, stdout, stderr) => {
            if (error) {
                f(error);
            } else if (stderr) {
                f(stderr);
            } else {
                s(stdout.split("\n"));
            }
        });
    });
}

export default {
    read,
    write,
    runFileWithInputs
};
