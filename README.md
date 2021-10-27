# Java Code Generator
A simple Java code generator that takes a `.json` input and outputs the corresponding `.java` file.

Input example:
```json
{
  "Student": [
    {
      "name": "John Doe",
      "cpf": "09998907809",
      "phone": "+55 (41) 99567-1515",
      "Class": [
        {
          "code": "CI1061",
          "name": "Clean Architecture"
        },
        {
          "code": "CI1057",
          "name": "Test Driven Development"
        }
      ]
    },
    {
      "name": "Mary",
      "cpf": "08887898978",
      "phone": "+55 (41) 99809-1716",
      "Class": [
        {
          "code": "CI092",
          "name": "Algorithms and Data Structures"
        },
        {
          "code": "CI1056",
          "name": "Operational Systems"
        }
      ]
    }
  ]
}
```

Output example:
```java
import java.util.ArrayList;

class Student {
    String name;
    String cpf;
    String phone;
    ArrayList<Class> classList;
}

class Class {
    String code;
    String name;
}

class Program {
    public static void main (String args[]) { }
}

```

### Installation
```bash
$ npm install
```

### Usage
```bash
$ node main.js {your_file}.json
```
It should generate a `.java` file in the root directory.
The JSON files must follow a specific format. `__tests__/` directory
has two examples.

### Tests
```bash
$ npm run test
```
---
🇧🇷 The following text (in portuguese) is a report to UFPR's Techniques in Application Modeling class.

# Relatório de decisões técnicas
Para a matéria de Técnicas em Modelagem de Aplicações, Ciência da Computação, UFPR.

Autor: Guilherme M. Lopes dos Santos (GRR20163043)

---

Escolhi JavaScript para o projeto porque é uma linguagem de alto nível e que possui diversas
ferramentas que facilitam a criação de _scripts_ como estes, acelerando o tempo de desenvolvimento.
Além disso, uma maior fluência em JavaScript permitiu escrever boa parte do código de forma imutável
(conceito retirado do paradigma funcional), que ajuda a mitigar bugs.

Resolvi desenhar a arquitetura em dois módulos, para favorecer o desacoplamento e facilitar o reuso:
* `Class Generator`: módulo responsável por ler o arquivo _JSON_ de entrada e criar um _array_ de classes com base nele. Este módulo
  não possui nenhuma referência à Java, portanto, poderia ser utilizado para gerar código para qualquer outra linguagem
  com base no mesmo _JSON_;
* `Java Code Generator`: módulo que utiliza o _output_ do `Class Generator` para gerar código específico para Java.

```
             ┌─────────────┐
             │             │
       ┌─────┤ Main Module ├──────┐
       │     │             │      │
       │     └─────────────┘      │
       │                          │
       │                          │
┌──────▼──────────┐   ┌───────────▼─────────┐
│                 │   │                     │
│ Class Generator │   │ Java Code Generator │
│                 │   │                     │
└─────────────────┘   └─────────────────────┘
```

### Como usar
O comando abaixo deve gerar um arquivo `.java` no diretório raiz.
```bash
$ node main.js {your_file}.json
```
Existem dois arquivos de teste disponíveis no projeto:
* `__tests__/input-fixture.json`
* `__tests__/input-fixture-2.json`

Existem, ainda, alguns testes automatizados básicos utilizados durante o desenvolvimento:
```bash
$ npm install
$ npm run test
```