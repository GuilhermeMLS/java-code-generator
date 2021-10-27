const JAVA_PROGRAM_NAME = `Program`;
const TAB = `    `;
const JAVA_BASE_PROGRAM =
    `class ${ JAVA_PROGRAM_NAME } {\n` +
    `${ TAB }public static void main (String args[]) { }\n` +
    `}\n`;

const hasArrayList = (entities) => {
  return !!entities.find((entity) =>
    entity.attributes.some(
      (attribute) => attribute.type.substring(0, 9) === "ArrayList"
    )
  );
};

const generateJavaClass = (entity) => {
  const signature = `class ${ entity.name } {\n`;
  const attributes = entity.attributes.map((attribute) => {
    return `${ TAB }${ getJavaType(attribute.type) } ${ attribute.key };\n`;
  }).join('');
  const end = `}\n\n`;
  return signature + attributes + end;
};

const getJavaType = (type) => {
  if (type === "number") {
    return "int";
  }
  if (type === "string") {
    return "String";
  }
  return type;
};

const generateCode = (entities) => {
  const headers = hasArrayList(entities) ? `import java.util.ArrayList;\n\n` : ``;
  const classes = entities.map((entity) => generateJavaClass(entity)).join('');
  return headers + classes + JAVA_BASE_PROGRAM;
};

module.exports = {
  generateCode,
};
