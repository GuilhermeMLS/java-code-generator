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

const makeAttributes = (entity) => {
  return Object.keys(entity).map((attributeName) => {
    if (isAttribute(attributeName)) {
      return {
        key: attributeName,
        type: getAttributeType(entity, attributeName),
      };
    }
    if (isEntity(attributeName) && entity[attributeName].length) {
      return {
        key: attributeName.toLowerCase() + "List",
        type: `ArrayList<${attributeName}>`,
      };
    }
    return {
      key: toPascalCase(attributeName),
      type: attributeName,
    };
  });
};

const makeClasses = (entity) => {
  return Object.keys(entity)
    .filter((key) => isEntity(key))
    .map((entityName) => {
      return getClassesFromEntities(entityName, entity[entityName]);
    })
    .flat();
};

const mergeDuplicatedEntities = (entities) => {
  return entities.reduce((prev, curr) => {
    const entity = prev.find((entity) => entity.name === curr.name);
    if (entity) {
      const index = prev.indexOf(entity);
      prev[index] = mergeEntities(entity, curr);
      return prev;
    }
    return [...prev, curr];
  }, []);
};

const removeDuplicatedAttributes = (attributes) => {
  return attributes.reduce((prev, curr) => {
    if (prev.find((attribute) => attribute.key === curr.key)) {
      return prev;
    }
    return [...prev, curr];
  }, []);
};

const getClassesFromEntities = (entityName, entities) => {
  const rawAttributes = entities.length
    ? entities.map((e) => makeAttributes(e)).flat()
    : makeAttributes(entities);
  const rawEntities = entities.length
    ? entities.map((e) => makeClasses(e)).flat()
    : makeClasses(entities);
  const attributes = removeDuplicatedAttributes(rawAttributes);
  const subEntities = mergeDuplicatedEntities(rawEntities);
  return [
    {
      name: entityName,
      attributes,
    },
    ...subEntities,
  ];
};

const generateClasses = (input) => {
  return Object.keys(input)
      .map((entityName) =>
          getClassesFromEntities(entityName, input[entityName])
      )
      .flat();
};

module.exports = {
  generateClasses,
};
