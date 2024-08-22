module.exports = {

  apps: [

    {

      name: 'rekyc-app',

      script: 'node_modules/next/dist/bin/next',

      args: 'start',

      instances: 1,

      autorestart: true,

      watch: false,

      max_memory_restart: '4G',

      env: {

        NODE_ENV: 'production',

        PORT: 4000

      },

    },

  ],
};
