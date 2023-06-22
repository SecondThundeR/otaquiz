# AniGuessr

Some random anime quiz web application. Build with T3 Stack, powered by Shikimori API _(Currently in development)_

## Brief Description

This application contains quiz game, which queries random animes, shows screenshots _(or description, if there are no screenshots)_ and gives buttons for user to guess, which anime name is correct*

> *Subject to change **(Currently, some mentioned functionality haven't developed yet or will be developed in other way)**

## Getting started

### Installation

To start working with app sources, clone this repository and run

```shell
pnpm i
pnpm prisma db push
```

To launch app, simply run `pnpm dev`

### Creating Shikimori app

To create Shikimori app for NextAuth, go to [Shikimori OAuth Apps](https://shikimori.me/oauth/applications) page and press button with text `Создать` near page title

Fill input fieids with necessary information and **(IMPORTANT!!!)** fill `Redirect URI` field with such link:

```shell
https://localhost:3001/api/auth/callback/shikimori

# or (replace `example.com` with your domain)
https://example.com/api/auth/callback/shikimori
```

To finish, copy Client ID and Client Secret into `.env` to use NextAuth login functionality

Currently, Shikimori doesn't allow usage of HTTP URI's, so for development, see next section for launching HTTPS proxy

### Launching localhost with HTTPS proxy

> This section describes steps for launching HTTPS proxy for macOS. To use such proxy on Windows/Linux, just google how to :c

Install `mkcert` for creating certificate authority and localhost certificate

```shell
brew install mkcert
brew install nss # if you use Firefox
```

Run this commands for installing `mkcert` and creating certificates:

```shell
mkcert -install
...
cd aniguessr
mkcert -key-file key.pem -cert-file cert.pem localhost\
```

Then, we will use [`local-ssl-proxy`]((https://github.com/cameronhunter/local-ssl-proxy)) to create HTTPS proxy for localhost:

```shell
# Launch app before proxy creation
pnpm dev
...
# Create proxy
pnpm dlx local-ssl-proxy --source 3001 --target 3000 --key key.pem --cert cert.pem
```

Now, try to go to `https://localhost:3001` and check if it's working (and login button is also working)!

> Note: Don't forget to change `NEXTAUTH_URL` in `.env` for correct redirect URI

### Build and deploy app

`TODO`

## License

This repository is licensed with [MIT License](LICENSE)

## Acknowledge

This project was build with help of [`create-t3-app`](https://create.t3.gg/) and such libraries:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
