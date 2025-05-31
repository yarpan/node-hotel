const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const swaggerSpec = require('./config/swagger');

const docsDir = path.join(__dirname, '../docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// JSON
fs.writeFileSync(
  path.join(docsDir, 'swagger.json'),
  JSON.stringify(swaggerSpec, null, 2),
  'utf-8'
);

// YAML
const yamlContent = yaml.stringify(swaggerSpec);
fs.writeFileSync(
  path.join(docsDir, 'swagger.yaml'),
  yamlContent,
  'utf-8'
);

console.log('Swagger docs exported to /docs/swagger.(json|yaml)');

