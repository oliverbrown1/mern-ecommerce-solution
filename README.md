## Overview

A MERN full-stack ecommerce solution. MERN stands for Mongo.db, Express.js, React, Node.js. 

## Tech Stack

- **Frontend:** React, Vite, Axios
- **UI:** Tailwind CSS, DaisyUI, Framer Motion
- **Backend:** Node.js, Express.js
- **Database / ODM:** MongoDB, Mongoose
- **Authentication / Security:** JSON Web Tokens, bcryptjs, Upstash Redis
- **Emailing / Account Recovery:** Nodemailer
- **Developer Tooling:** nodemon, ESLint

## Current Features

* JWT-signed Authentication for logins -> utilising refresh + access tokens
* Password resets using one-time JWT tokens and Nodemailer for sending emails
* Redis rate limiting using Upstash
* Middleware session management
* MongoDB items collection seeded by [dummyjson](https://dummyjson.com/docs/products#products-search)

## Installation

### Frontend

1. Ensure you have the latest version of npm installed.
2. ```cd frontend && npm i && npm run build``` to install dependencies
3. Run the frontend by typing ```npm run dev```
4. Explore the frontend pages

### Full-Stack

1. Create an .env file in the backend directory based on the `.env.example` file
2. Ensure your terminal is in the outer-most directory, run ```npm run inst && npm run start```

## Requirements

```
node >= 22.12.0
```

