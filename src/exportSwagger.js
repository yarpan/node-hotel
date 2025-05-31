const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const swaggerSpec = require('../config/swagger');


fs.writeFileSync(
  path.join(__dirname, '../docs/swagger.json'),
  JSON.stringify(swaggerSpec, null, 2),
  'utf-8'
);


const yamlContent = yaml.stringify(swaggerSpec);
fs.writeFileSync(
  path.join(__dirname, '../docs/swagger.yaml'),
  yamlContent,
  'utf-8'
);

console.log('✅ Swagger docs exported to /docs/swagger.(json|yaml)');
