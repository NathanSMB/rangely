# rangely

Yet another range iterator similar to python's range() built-in. There are a million other libraries like it but this one is mine.

Full Docs: https://nathansmb.github.io/rangely/

Installation:

```bash
$ yarn add rangely
```

or

```bash
$ npm install rangely
```

Example Usage:

```TypeScript
import { range } from "rangely";

for (const index of range(1, 10)) {
    console.log(index);
}

// Prints 1, 2, 3, 4, 5, 6, 7, 8, 9
```
