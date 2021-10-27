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

const generateClasses = (input) => {
  return Object.keys(input)
    .map((entityName) => getEntities(entityName, input[entityName]))
    .flat();
};

const mergeEntities = (entity, entityToBeMerged) => {
  return {
    ...entity,
    ...entityToBeMerged,
  };
};

const toPascalCase = (string) => {
  return string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

const getAttributeType = (entity, attributeName) => {
  if (!Array.isArray(entity[attributeName])) {
    return typeof entity[attributeName];
  }
  return `ArrayList<${typeof entity[attributeName][0]}>`;
};

const getAttributes = (entity) => {
  return Object.keys(entity).map((attributeName) => {
    if (isAttribute(attributeName)) {
      return {
        key: attributeName,
        type: getAttributeType(entity, attributeName),
      };
    }
    if (isEntity(attributeName)) {
      if (entity[attributeName].length) {
        return {
          key: attributeName.toLowerCase() + "List",
          type: `ArrayList<${attributeName}>`,
        };
      } else {
        return {
          key: toPascalCase(attributeName),
          type: attributeName,
        };
      }
    }
  });
};

const getEntities = (entityName, entities) => {
  if (entities.length) {
    const attributes = entities
      .map((entity) => getAttributes(entity))
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
  } else {
    const entity = entities;
    const attributes = getAttributes(entity)
      .flat()
      .reduce((prev, curr) => {
        if (prev.find((attribute) => attribute.key === curr.key)) {
          return prev;
        }
        return [...prev, curr];
      }, []);
    const subEntities = Object.keys(entity)
      .filter((key) => isEntity(key))
      .map((entityName) => getEntities(entityName, entity[entityName]))
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
  }
};

module.exports = {
  generateClasses,
};
