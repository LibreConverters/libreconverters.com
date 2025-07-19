freeimageconverter.app is a free and open source image converter.

This converter is funded entirely by ads. Never pay for usage, no tracking, no signups, no limits. EVER!

## Getting Started

### Docker Compose

#### Dev

The `dev` target starts a development server with live reload. It maps port *8080* on the host machine to port *3000* in the container.

```
$ docker compose up dev
```

Open your browser and navigate to [http://localhost:8080/](http://localhost:8080/) to view the application.

#### Build

The `build` target builds a production version of the application. Once the build is complete, you can find the resulting files in the `build` directory.

```
$ docker compose up build
```

## License

This project is released under the [GNU General Public License v3](LICENSE).