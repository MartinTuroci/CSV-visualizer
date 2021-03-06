# csv_visualizer

## Project setup

### Local development

```
npm i && npm run serve
```

or

```
yarn install && yarn serve
```

### Docker build an image

```
docker build --rm -f "Dockerfile" -t csv_visualizer:latest .
```

### Docker run an image

```
docker run --rm -d -p 8000:8000/tcp csv_visualizer:latest
```

go to localhost:8000 in your browser, try to load sample_data/test.csv and enjoy :)

## Features

- Loading .csv files with 2 cols (x and y coordinates that must be numbers)
- Simple validation
- Multiple delimiters support
- Simple tooltips
- Ability to build and run as a docker image
