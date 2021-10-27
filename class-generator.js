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

const getEntities = (entityName, entities) => {
  const attributes = entities
    .map((entity) =>
      Object.keys(entity)
        .filter((key) => isAttribute(key))
        .map((attributeName) => {
          return {
            key: attributeName,
            type: typeof entity[attributeName],
          };
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
      if (prev.find((entity) => entity.name === curr.name)) {
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

module.exports = {
  getEntities,
  wrapper,
};
