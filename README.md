# 🚀 Starting Charging Station API

### `prerequisites`
Install required packages

```
npm install
# or
yarn install
```

Before starting the project, I've provided the the ```.env``` and ```data.db``` inside the attachhment. This db file contains some existing locations as well as the necessary data for ```Country``` and ```ChargerType``` as it runs locally.
1. Put the ```.env``` file inside the root directory of the project.
2. Put the ```data.db``` inside ```.tmp``` folder (it's hidden, but you can put it directly when opening the IDE). Or if it's not there already, create ```.tmp``` folder and copy the ```data.db``` file there.
3. After setting up the ```.env``` and ```data.db``` files you can start the application.


### `start`

Start your Strapi application

```
npm run start
# or
yarn start

```

### `additional`

You can also run eslint (with prettier plugin)

```
npm run lint
# or
yarn lint

```

### `note`
If you're not running on Strapi's default port (1337), change the port on Charging Station Web config file to match yours.

```
charging-station-web
└───src    
    └───config
         └───index.ts
```
