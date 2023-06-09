const fs = require('fs');
const path = require('path');

// The directory you want to traverse
const directoryPath = path.join(__dirname, '../src/pages');

// Kebab case to camel case
const kebabToCamel = (s) => {
  return s.replace(/(\-\w)/g, (m) => m[1].toUpperCase());
}

// A recursive function to traverse directories
const traverseDirectory = (directory) => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((file) => {
    const absolute = path.join(directory, file.name);
    if (file.isDirectory()) processComponent(absolute);
  });
}

// A function to process individual components
const processComponent = (componentPath) => {
  fs.readdirSync(componentPath, { withFileTypes: true }).forEach((file) => {
    const absolute = path.join(componentPath, file.name);
    if (file.name.endsWith('.js')) updateJSFile(absolute);
    if (file.name.endsWith('.module.css')) updateCSSFile(absolute);
  });
}

// A function to update individual JS files
const updateJSFile = (filePath) => {
  let data = fs.readFileSync(filePath, 'utf-8');

  // Replacing className="[kebab-case]" with className={styles.camelCase}
  data = data.replace(/className="([a-z\-]+)"/g, (match, kebabCaseName) => {
    const camelCaseName = kebabToCamel(kebabCaseName);
    return `className={styles.${camelCaseName}}`;
  });

  fs.writeFileSync(filePath, data);
}

// A function to update individual CSS files
const updateCSSFile = (filePath) => {
  let data = fs.readFileSync(filePath, 'utf-8');

  // Replacing .kebab-case with .camelCase
  data = data.replace(/\.([a-z\-]+)/g, (match, kebabCaseName) => {
    const camelCaseName = kebabToCamel(kebabCaseName);
    return `.${camelCaseName}`;
  });

  fs.writeFileSync(filePath, data);
}

traverseDirectory(directoryPath);