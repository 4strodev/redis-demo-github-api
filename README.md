<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

> [!NOTE]
> IDK if there are better practices working with redis.
> This is the first time that I work with cache systems
> I started this project at 12:00 now is 21:52.
> During this time I had to:
> - create the project
> - make the logging system with winston
> - go to the supermarket
> - make my launch
> - learn how to use the GitHub api
> - learn how to use the most basic commands of redis
> - make my dinner
> - implement the most basic features

Initially this was just a playground project to practice logging with winston. But since it was implemented quickly
I decided to also use this project to practice redis.

## Run the application
Just modify the docker-compose.yaml and add your github token.

Now start the services with

    docker compose up -d

Now you can use the unique endpoint of the app `/`.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
