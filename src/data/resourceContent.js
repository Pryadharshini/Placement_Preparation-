export const resourceContent = {
  /* ================= PROGRAMMING ================= */

  java: {
    title: "Java Programming",
    w3link: "https://www.w3schools.com/java/",
    sections: [
      {
        heading: "What is Java?",
        content: `Java is a high-level, object-oriented programming language.
It is platform-independent because of JVM (Write Once, Run Anywhere).
Used in backend systems, Android apps, and enterprise software.`,
        code: `class Hello {
  public static void main(String[] args) {
    System.out.println("Hello Java");
  }
}`
      },
      {
        heading: "Key Features",
        content: `• Object-Oriented
• Platform Independent
• Secure
• Robust`,
        code: `// Java uses JVM for execution`
      }
    ]
  },

  python: {
    title: "Python Programming",
    w3link: "https://www.w3schools.com/python/",
    sections: [
      {
        heading: "What is Python?",
        content: `Python is a high-level, interpreted language.
It has simple syntax and is beginner-friendly.
Used in AI, data science, and web development.`,
        code: `print("Hello Python")`
      }
    ]
  },

  cpp: {
    title: "C / C++ Programming",
    w3link: "https://www.w3schools.com/cpp/",
    sections: [
      {
        heading: "What is C/C++?",
        content: `C is a procedural language.
C++ extends C with OOP features.`,
        code: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello C++";
}`
      }
    ]
  },

  javascript: {
    title: "JavaScript",
    w3link: "https://www.w3schools.com/js/",
    sections: [
      {
        heading: "What is JavaScript?",
        content: `JavaScript makes web pages interactive.`,
        code: `console.log("Hello JavaScript");`
      }
    ]
  },

  sql: {
    title: "SQL",
    w3link: "https://www.w3schools.com/sql/",
    sections: [
      {
        heading: "What is SQL?",
        content: `SQL is used to manage data in databases.`,
        code: `SELECT * FROM students;`
      }
    ]
  },

  /* ================= WEB DEVELOPMENT ================= */

  "html-css": {
    title: "HTML & CSS",
    w3link: "https://www.w3schools.com/html/",
    sections: [
      {
        heading: "HTML",
        content: `HTML structures web pages.`,
        code: `<h1>Hello World</h1>`
      },
      {
        heading: "CSS",
        content: `CSS styles web pages.`,
        code: `h1 { color: red; }`
      }
    ]
  },

  react: {
    title: "React.js",
    w3link: "https://www.w3schools.com/react/",
    sections: [
      {
        heading: "What is React?",
        content: `React is a JavaScript library for building UI.`,
        code: `function App() {
  return <h1>Hello React</h1>;
}`
      }
    ]
  },

  node: {
    title: "Node.js",
    w3link: "https://www.w3schools.com/nodejs/",
    sections: [
      {
        heading: "What is Node.js?",
        content: `Node.js allows JavaScript to run on the server.`,
        code: `console.log("Node running");`
      }
    ]
  },

  express: {
    title: "Express.js",
    w3link: "https://www.w3schools.com/nodejs/nodejs_express.asp",
    sections: [
      {
        heading: "Express",
        content: `Express is a Node.js framework.`,
        code: `app.get("/", (req, res) => res.send("Hello"));`
      }
    ]
  },

  api: {
    title: "REST APIs",
    w3link: "https://www.w3schools.com/js/js_api_intro.asp",
    sections: [
      {
        heading: "REST API",
        content: `REST APIs allow client-server communication.`,
        code: `GET /users`
      }
    ]
  },

  /* ================= CS CORE ================= */

  dsa: {
    title: "Data Structures & Algorithms",
    w3link: "https://www.w3schools.com/dsa/",
    sections: [
      {
        heading: "What is DSA?",
        content: `DSA helps solve problems efficiently.`,
        code: `Array, Stack, Queue`
      }
    ]
  },

  dbms: {
    title: "DBMS",
    w3link: "https://www.w3schools.com/sql/sql_intro.asp",
    sections: [
      {
        heading: "DBMS",
        content: `DBMS manages data.`,
        code: `MySQL, Oracle`
      }
    ]
  },

  os: {
    title: "Operating Systems",
    w3link: "https://www.w3schools.com/",
    sections: [
      {
        heading: "Operating System",
        content: `OS manages system resources.`,
        code: `Windows, Linux`
      }
    ]
  },

  cn: {
    title: "Computer Networks",
    w3link: "https://www.w3schools.com/",
    sections: [
      {
        heading: "Networks",
        content: `Enables device communication.`,
        code: `TCP/IP`
      }
    ]
  },

  oops: {
    title: "OOP Concepts",
    w3link: "https://www.w3schools.com/java/java_oop.asp",
    sections: [
      {
        heading: "OOP Principles",
        content: `Encapsulation, Inheritance, Polymorphism, Abstraction`,
        code: `class A {}`
      }
    ]
  }
};
