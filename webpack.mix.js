const mix = require('laravel-mix');

mix.setPublicPath('dist')
  .js('src/App.js', 'dist')
  .copy('src/style.css', 'dist')
  .copy('src/index.html', 'dist')
  .copy('src/images', 'dist/images');
