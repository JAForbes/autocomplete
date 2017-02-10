`npm bin`/rollup -c rollup.config.main.js > dist/bundle.js

cat dist/bundle.js | `npm bin`/uglifyjs -mc > dist/bundle.min.js