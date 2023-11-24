#!/usr/bin/env sh


yarn run build
cp CNAME dist
cp googlea23fc0c78e9b6234.html dist
cp 404.html dist
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:Sektion09/who-the-f_ck-am-i.git master:gh-pages

