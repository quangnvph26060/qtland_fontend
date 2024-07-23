import vue from "@vitejs/plugin-vue";
const path = require('path');
module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        "primary-color": "#1DA57A",
                        "link-color": "#1DA57A",
                        "border-radius-base": "2px",
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
    configureWebpack: {
        resolve: {
          alias: {
            '@assets': path.resolve(__dirname, 'src/assets')
          }
        }
      }
};
