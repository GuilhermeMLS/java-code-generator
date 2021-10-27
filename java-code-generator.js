const hasArrayList = (entities) => {
  return entities
    .reduce((prev, curr) => {
      return [
        ...prev,
        curr.attributes.some(
          (attribute) => attribute.type.substring(0, 9) === "ArrayList"
        ),
      ];
    }, [])
    .some((boolval) => boolval === true);
};

const generateJavaClass = (entity) => {
  const signature = "\n" + "class " + entity.name + " {\n";
  const attributes = entity.attributes.map((attribute) => {
    return "    " + getJavaType(attribute.type) + " " + attribute.key + ";\n";
  });
  const end = "}\n";
  return signature + attributes.join("") + end;
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
  const headers = hasArrayList(entities) ? "import java.util.ArrayList;\n" : "";
  const classes = entities.map((entity) => generateJavaClass(entity));
  const javaBaseProgram =
    "\n" +
    "class Program {\n" +
    "    public static void main (String args[]) { }\n" +
    "}\n";
  return headers + classes.join("") + javaBaseProgram;
};

module.exports = {
  generateCode,
};
