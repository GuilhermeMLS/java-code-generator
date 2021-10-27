const main = () => {
  const javaClassGenerator = require("./class-generator");
  const entities = javaClassGenerator.wrapper({
    Student: [
      {
        name: "John Doe",
        age: 24,
        Professor: [
          {
            name: "Dale",
          },
        ],
      },
      {
        name: "Mary",
        age: 24,
        Professor: [
          {
            name: "Danny",
            Address: [
              {
                street: "5th Avenue",
                number: 778,
                Reference: [
                  {
                    name: "foo",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  const javaCode = javaClassGenerator.generateJavaCode(entities);
  console.log(javaCode);
};
main();