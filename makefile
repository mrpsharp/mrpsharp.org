all:
	jekyll serve

build:
	jekyll build

deploy: build
	sudo rsync -avzr --delete-after --delete-excluded --no-perms _site/ /srv/http
