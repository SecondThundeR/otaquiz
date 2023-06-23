# AniGuessr

Some random anime quiz web application. Built with T3 Stack, powered by Shikimori API _(Currently in development)_

## Brief Description

This is an anime quiz game, which queries random animes, shows screenshots _(or description, if there are no screenshots)_ and gives buttons for user to guess, which anime name is correct*

> *Subject to change **(Currently, some mentioned functionality haven't developed yet or will be developed in other way)**

## Getting started

### Installation

To start working with sources, clone this repository and run

```shell
pnpm i
pnpm prisma db push
```

To launch app, simply run `pnpm dev`

### Creating Shikimori app for authorization

To create Shikimori app for NextAuth, go to [Shikimori OAuth Apps](https://shikimori.me/oauth/applications) page and press button with text `Создать` near page title

Fill input fieids with necessary information and **(IMPORTANT!!!)** fill `Redirect URI` field with such link:

```shell
https://localhost:3001/api/auth/callback/shikimori

# or (replace `example.com` with your domain)
https://example.com/api/auth/callback/shikimori
```

To finish, copy Client ID and Client Secret into `.env` to use NextAuth functionality

Bear in mind, Shikimori doesn't allow use of HTTP URI's, so to use authorization in dev build, see next section for configuring HTTPS proxy

### Using localhost with HTTPS proxy

This section describes steps for launching HTTPS proxy for macOS

> To use such proxy on Windows/Linux, just google how to do this

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

Then, use [`local-ssl-proxy`]((https://github.com/cameronhunter/local-ssl-proxy)) to create HTTPS proxy for localhost:

```shell
# Launch app before proxy creation
pnpm dev
...
# Create proxy
pnpm dlx local-ssl-proxy --source 3001 --target 3000 --key key.pem --cert cert.pem
```

Now, try to go to `https://localhost:3001` and check if app and authentication working!

> Reminder: Don't forget to change `NEXTAUTH_URL` in `.env` for correct generation of redirect URI

### Build and deploy app (Vercel)

`TODO`

## License

This repository is using [MIT License](LICENSE)

## Acknowledge

This project was built with help of [`create-t3-app`](https://create.t3.gg/) and these libraries:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
