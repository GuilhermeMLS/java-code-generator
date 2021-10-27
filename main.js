const generateJavaFile = (programName, javaCode) => {
  const fileSystem = require("fs");
  fileSystem.writeFileSync(programName, javaCode);
};

const main = () => {
  const fileName = process.argv[2];
  if (!fileName) {
    console.error('\x1b[31m%s\x1b[0m','Error: invalid file name.');
    console.log('Usage: node main.js {file_name}.json.');
    return;
  }
  const classGenerator = require("./class-generator");
  const javaCodeGenerator = require("./java-code-generator");
  const input = require(`./${process.argv[2]}`);
  const entities = classGenerator.generateClasses(input);
  const javaCode = javaCodeGenerator.generateCode(entities);
  const utils = require("./utils");
  console.log(javaCode);
  generateJavaFile(
    `${utils.toCamelCase(javaCodeGenerator.JAVA_PROGRAM_NAME)}.java`,
    javaCode
  );
};
main();
