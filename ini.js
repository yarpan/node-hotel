// init.js
const fs = require('fs');
const path = require('path');

const structure = {
  'config': ['db.js'],
  'controllers': ['guestsController.js', 'roomsController.js', 'bookingsController.js'],
  'middleware': ['auth.js'],
  'models': ['guestsModel.js', 'roomsModel.js', 'bookingsModel.js'],
  'routes': ['guestsRoutes.js', 'roomsRoutes.js', 'bookingsRoutes.js'],
  'sql': ['schema.sql', 'seed.sql'],
  '.': ['.env', '.gitignore', 'package.json', 'server.js', 'README.md']
};

function createStructure(basePath = '.') {
  for (const [folder, files] of Object.entries(structure)) {
    const dirPath = path.join(basePath, folder);

    if (folder !== '.') {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
        console.log(`Created file: ${filePath}`);
      }
    });
  }
}

createStructure();
