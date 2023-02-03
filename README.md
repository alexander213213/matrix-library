# Matrix-Library

## Description
This is a very intuitive library for matrix manipulation. 
This follows most standards in mathematics to make it easy for mathematicians to use. 
This library is made for math enthusiasts to contribute to. 
This library aims to be approachable for beginners so no dependencies must be used.

---

## Add to your project
This library is not yet available in npm so cloning it would be the best way to use it in your project.  
Go to your project directory in your terminal with `cd <project-directory>`
Then clone it with:  
```bash
git clone https://github.com/alexander213213/matrix-library.git
```
### Node Usage
If you are using node, then add the matrix object to `module.exports` by adding:
```node
module.exports = Matrix
```
to the end the file.
### Javascript Usage
If you are using javascript, then add the whole [Matrix.js](./Matrix.js) file to your `index.html` file by adding:
```html
<script src="./matrix-library/Matrix.js"></script>
```
before your main script tag.

---
##  Contribution
Just add you functionality to the `Matrix` class in [Matrix.js](./Matrix.js). Make sure to separate your methods with multiline comments in the format:
```javascript
/*======
Method Name
Method Purpose
Method Usage
======*/
```