#!/usr/bin/env sh


yarn run build
cp CNAME dist
cp 404.html dist
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:mrtx87/estimationpoker.git master:gh-pages
