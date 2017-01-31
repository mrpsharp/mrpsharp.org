all:
	jekyll serve

build:
	jekyll build

deploy: build
	rsync -avzr --delete-after --delete-excluded --no-perms _site/ mrpsharp@shell.gridhost.co.uk:public_html
