#!/usr/bin/env sh


yarn run build
cp 404.html dist
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:Sektion09/s9library_frontend.git master:gh-pages

