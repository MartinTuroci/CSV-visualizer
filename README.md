# csv_visualizer

## Project setup

###Local development

```
npm i && npm run serve
```

or

```
yarn install && yarn serve
```

###Docker build an image

```
docker build --rm -f "Dockerfile" -t csv_visualizer:latest .
```

###Docker run an image

```
docker run --rm -d -p 8000:8000/tcp csv_visualizer:latest
```

go ahead to localhost:8000 in your browser and enjoy :)
