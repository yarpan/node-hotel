const fs = require('fs-extra');
const swaggerSpec = require('../config/swagger');
const converter = require('openapi-to-postmanv2');

(async () => {
  // 1. Save swagger.json
  const swaggerPath = './docs/swagger.json';
  await fs.outputJson(swaggerPath, swaggerSpec, { spaces: 2 });
  console.log('Swagger JSON saved:', swaggerPath);

  // 2. Convert Swagger to Postman collection
  converter.convert(
    { type: 'json', data: swaggerSpec },
    { folderStrategy: 'tags' },
    async (err, conversionResult) => {
      if (!conversionResult.result) {
        console.error('Conversion failed', err);
        return;
      }

      const postman = conversionResult.output[0].data;

      // 3. Inject token handling
      postman.item.forEach(group => {
        group.item.forEach(request => {
          const isLogin = request.name.toLowerCase().includes('login') &&
                          request.request?.url?.path?.includes('login');

          if (isLogin) {
            // Add test script to store accessToken in a variable
            request.event = request.event || [];
            request.event.push({
              listen: 'test',
              script: {
                type: 'text/javascript',
                exec: [
                  'const res = pm.response.json();',
                  'pm.collectionVariables.set("token", res.accessToken);'
                ]
              }
            });
          } else {
            // Set Bearer token authorization using {{token}} variable
            request.request.auth = {
              type: 'bearer',
              bearer: [
                {
                  key: 'token',
                  value: '{{token}}',
                  type: 'string'
                }
              ]
            };
          }
        });
      });

      // 4. Save Postman collection
      const postmanPath = './docs/postman-collection.json';
      await fs.outputJson(postmanPath, postman, { spaces: 2 });
      console.log('Postman collection saved:', postmanPath);
    }
  );
})();
