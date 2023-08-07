# Otaquiz

> Otaku + quiz = Otaquiz

Some random anime quiz web application. Built with T3 Stack, powered by Shikimori API

[Deployment link](https://otaquiz.ru/) | [Development roadmap](https://github.com/users/SecondThundeR/projects/7)

## Brief Description

This is an anime quiz game, which queries random animes, shows screenshots and gives buttons for player to guess, which anime name is correct

> More game modes are on the way

## Getting started

### Installation

To start working with sources, clone this repository and add necessary variables in `.env`, then run

```shell
pnpm i
pnpm prisma db push
```

To launch app, simply run `pnpm dev`

### Creating Shikimori app for authorization

To create Shikimori app for NextAuth, go to [Shikimori OAuth Apps](https://shikimori.me/oauth/applications) page and press button with text `Создать` near page title

Fill input fieids with necessary information and fill `Redirect URI` field with such link:

```shell
http://localhost:3000/api/auth/callback/shikimori

# or (replace `example.com` with your domain)
https://example.com/api/auth/callback/shikimori
```

To finish, copy Client ID and Client Secret into `.env` to use NextAuth functionality

### Deploy on Vercel

1. Go to <https://vercel.com/new> and select Github repo with application
2. Prepare enviroment variables for deployment (They should look like on picture below)
   <img width="972" alt="image" src="https://github.com/SecondThundeR/otaquiz/assets/36604233/8b0b8785-67d7-4f34-895d-75eea6cce9c9">

   > Note: I suggest you to set up "Ignored build step" in "Settings/Git" to build only production, since if you doesn't have stable preview link, Shikimori authorization would fail and there is no possible way to test app correctly
3. Click `Deploy` button and wait for deployment to finish
  - If something fails during deployment, push fix to repo and Vercel will automatically pull your commit and re-deploy
4. Check your deployment and you are good to go!

## License

This repository is using [MIT License](LICENSE)

## Acknowledge

This project was built with help of [`create-t3-app`](https://create.t3.gg/) and [these libraries](./package.json)
