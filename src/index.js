import fs from 'node:fs';

// приклад без кодування
const buffer = fs.readFileSync('file.txt');
console.log(buffer); // <Buffer 48 65 6c 6c 6f ...>

// приклад із кодуванням
const data = fs.readFileSync('file.txt', 'utf8');
console.log('Вміст файлу:', data); // "Hello"
