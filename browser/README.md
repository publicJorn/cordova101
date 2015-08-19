# new-webpack
Create a new project with webpack.

## How to use?

- `npm install`
- `npm start` for dev server on `http://localhost:8080`
- `npm run dist` for exporting for production (TODO)

## Folder structure and philosophy

**Config & source**

```
.
+ - conf
+ - client
|   + - components
|       + - myComponent
|           + - images
|           + - js
|           + - less
|           + - test
|           + - myComponent.js
|           + - myComponent.less
|   + - assets
|   + - less
|   + - index.html
|   + - main.js
|   + - main.less
+ - server (TODO)
```

**Rules**

Config:

- all files that have something to with the node build process go into the `conf` folder

Components:

- All `.*config` files need to be in the root.
- A component has a main js file and (optionally) less file.
- If a component is too complex for one file, it can be cut up in smaller files, put them in the `js` subfolder.
- Any styles should be written with a component-based mindset, like [SuitCSS](https://suitcss.github.io/) (preferred) or [BEMs](https://en.bem.info/).
- Additional less files may be included from the components' `less` subfolder.
- The `myComponent.less` file and any images are packaged with the `require()` statement in `myComponent.js`.

General:

- The the `main.less` file should only contain generalistic styles with as-weak-as-possible selectors. _It can also be used for branding_ (under research).
- The `assets` folder is intended for generic assets like company logo, legal docs, etc.

**All main folders after a build**

```
.
+ - client
+ - conf
+ - (build)            (exists in memory when running webpack-dev-server)
+ - dist               (to be uploaded to a public server)
+ - node_modules
+ - server (TODO)
```

## Options

### Multiple entry points

If you want to develop with multiple entry points, hot loading of modules doesn't automatically work. You need to uncomment this line in the plugins array of _webpack-configurator.js_:

```
//new webpack.optimize.CommonsChunkPlugin('init.js'),
```

## Deployment

```
npm run build
```

This will run a production build of webpack and copy the contents of `/browser/dist/` to `/cordova/www/` where it can be picked up for further processing by cordova (eg. run `cordova build` from that directory)

**TODO:** run a complete build from project root

## IntelliJ notes

- Enable ecmascript 6 by: `Settings -> Language & Frameworks -> Javascript -> Javascript language version`.
- Less: to import from node_modules we use `@import: "~package/file.css"`. This will trigger an inspection error in IntelliJ. To suppress the error, place cursor and press [alt]+[enter]. Choose "Disable inspection".

## TODO

- production build -> double check
- replace package.json version format. Eg: "^3.1.2" becomes "3.1.x" and "~3.1.2" becomes "3.x.x".

## FAQ

### Why are you not using CLI for devserver configuration? The config file would be cleaner

True, however I intend this seed to be easily extensible. For instance if you want to add an express server, you have to provide minimal extra configuration.
