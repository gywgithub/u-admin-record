#强制推送
#!/usr/bin/env bash
set -e
git init
git add -A
git commit -m '🎉deploy'
git push -f "https://${access_token}@github.com/chuzhixin/elephant-admin.git" master
exec /bin/bash




