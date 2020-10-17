# food-app-front

Food-app-front is a simple, vue based frontend for the food-app. Food-app is intended to help organize yourself at food and diet oriented manners.

## Disclaimer

Right now, backend of food-app is hosted at free-tier heroku. Because of this, API calls can take a while, especially when logging, up to 10 seconds.

## Food-app Features

- User authorization (native, google, facebook) using [Passport.js](http://www.passportjs.org/) and [Firebase](https://firebase.google.com/)
- Saving recipes using your own data or provided by [Edamam API](https://developer.edamam.com/)
- Browsing recipes powered by [Edamam API](https://developer.edamam.com/)
- Scheduling your recipes in a calendar

## Todo

- More feedback for the user after saving, deleting and editing recipes
- Do not show recipes that are already saved by the user

## Presentation

Example of a search result
![Search result](https://i.imgur.com/QVPVKJJ.png)

Calendar and schedule recipe section
![Calendar](https://i.imgur.com/ShtEGLv.png)
![Add recipe](https://i.imgur.com/Z7a0MY3.png)

Saved recipes list
![Saved recipes](https://i.imgur.com/3EkKOvA.png)

Create recipe
![Create recipe view](https://i.imgur.com/xet5F1X.png)

## Project setup

Project was created with Vue CLI

To install dependencies

```
npm install
```

To compile for the dev

```
npm run serve
```

To compile for production

```
npm run build
```
