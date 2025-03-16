# react-conditional-render-component

A simple and declarative way to handle conditional rendering in React, similar to Vue's `v-if` and `v-else`.

## 🚀 Installation

```sh
npm install react-conditional-render-component
```

or using Yarn:

```sh
yarn add react-conditional-render-component
```

## 📌 Usage

### **Basic Example**

```tsx
import React from "react";
import { Conditional, If, ElseIf, Else } from "react-conditional-render-component";

const App = () => {
  const user = { role: "admin" };

  return (
    <Conditional>
      <If condition={user.role === "admin"}>Welcome, Admin!</If>
      <ElseIf condition={user.role === "editor"}>Welcome, Editor!</ElseIf>
      <Else>Welcome, Guest!</Else>
    </Conditional>
  );
};

export default App;
```

## 📖 API

### **`<Conditional>`**
Wraps all conditional blocks (`<If>`, `<ElseIf>`, `<Else>`). It ensures only the first matching condition is rendered.

### **`<If condition={boolean}>`**
Renders its children if the `condition` is `true`.

### **`<ElseIf condition={boolean}>`**
Renders its children if the previous conditions were `false` and this condition is `true`.

### **`<Else>`**
Renders its children if no previous conditions matched.

## 🎯 Advanced Example

```tsx
import React, { useState } from "react";
import { Conditional, If, ElseIf, Else } from "react-conditional-render-component";

const UserGreeting = () => {
  const [role, setRole] = useState("guest");

  return (
    <div>
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="guest">Guest</option>

        <option value="editor1">Editor1</option>
        <option value="editor2">Editor2</option>
        <option value="editor3">Editor3</option>
        <option value="editor-unknown">Unknown Editor</option>

        <option value="admin">Admin</option>
      </select>

      <Conditional>
        <If condition={role === "admin"}>Welcome, Admin!</If>
        <ElseIf condition={role.includes("editor")}>
          <span> Welcome </span>
          <span>
            <Conditional>
              <If condition={role === "editor1"}>
                  Editor 1
              </If>
              <ElseIf condition={role === "editor2"}>
                  Editor 2
              </ElseIf>
              <ElseIf condition={role === "editor3"}>
                  Editor 3
              </ElseIf>
              <Else>
                Unknown Editor
              </Else>
            </Conditional>
          </span>
        </ElseIf>
        <Else>Welcome, Guest!</Else>
      </Conditional>
    </div>
  );
};

export default UserGreeting;
```

## ✅ Running Tests

If you're using **Vitest**, you can test the component like this:

```sh
npm test
```

## 📜 License

This project is licensed under the MIT License.

---

Made with ❤️ by Ahmed Gamal

