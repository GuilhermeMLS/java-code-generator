const isUpperCase = (char) => {
  return char === char.toUpperCase();
};

const isEntity = (key) => {
  const firstChar = key.substring(0, 1);
  return isUpperCase(firstChar);
};

const isAttribute = (key) => {
  const firstChar = key.substring(0, 1);
  return !isUpperCase(firstChar);
};

const wrapper = (input) => {
  return Object.keys(input)
    .map((entityName) => getEntities(entityName, input[entityName]))
    .flat();
};

const mergeEntities = (entity, entityToBeMerged) => {
  return {
    ...entity,
    ...entityToBeMerged
  }
}

const getEntities = (entityName, entities) => {
  const attributes = entities
    .map((entity) =>
      Object.keys(entity).map((attributeName) => {
        if (isAttribute(attributeName)) {
          return {
            key: attributeName,
            type: typeof entity[attributeName],
          };
        }
        if (isEntity(attributeName)) {
          return {
            key: attributeName.toLowerCase() + "List",
            type: `ArrayList<${attributeName}>`,
          };
        }
      })
    )
    .flat()
    .reduce((prev, curr) => {
      if (prev.find((attribute) => attribute.key === curr.key)) {
        return prev;
      }
      return [...prev, curr];
    }, []);
  const subEntities = entities
    .map((entity) => {
      return Object.keys(entity)
        .filter((key) => isEntity(key))
        .map((entityName) => getEntities(entityName, entity[entityName]))
        .flat();
    })
    .flat()
    .reduce((prev, curr) => {
      const entity = prev.find((entity) => entity.name === curr.name);
      if (entity) {
        const index = prev.indexOf(entity);
        prev[index] = mergeEntities(entity, curr);
        return prev;
      }
      return [...prev, curr];
    }, []);
  return [
    {
      name: entityName,
      attributes,
    },
    ...subEntities,
  ];
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

const generateJavaClass = (entity) => {
  const signature = "\n" + "class " + entity.name + " {\n";
  const attributes = entity.attributes.map((attribute) => {
    return "    " + getJavaType(attribute.type) + " " + attribute.key + ";\n";
  });
  const end = "}\n";
  return signature + attributes.join("") + end;
};

const hasArrayList = (entities) => {
  return entities.reduce((prev, curr) => {
    return [...prev, curr.attributes.some(attribute => attribute.type.substring(0, 9) === 'ArrayList')];
  }, []).some(boolval => boolval === true);
}

const generateJavaCode = (entities) => {
  const headers = hasArrayList(entities)
      ? "import java.util.ArrayList;\n"
      : "";
  const classes = entities.map(entity => generateJavaClass(entity));
  const javaBaseProgram = "\n"
      + "class Program {\n"
      + "    public static void main (String args[]) {\n"
      + "}\n";
  return headers + classes.join('') + javaBaseProgram;
}

module.exports = {
  generateJavaCode,
  generateJavaClass,
  wrapper,
};
