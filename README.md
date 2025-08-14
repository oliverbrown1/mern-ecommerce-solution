## Overview

Just started creating a MERN full-stack ecommerce solution. MERN stands for Mongo.db, Express.js, React, Node.js. I am building a foundation for an interesting project using the well known JavaScript-only stack MERN.

This won't end up some e-commerce clone, but is to begin with.

## Current Features

* JWT Authentication for logins -> utilising refresh + access tokens
* Password resets using one-time JWT tokens and Nodemailer for sending emails
* Redis rate limiting using Upstash
* middleware session management

## Installation

### Frontend

1. Ensure you have the latest version of npm installed.
2. Go the frontend directory and run in the terminal: ```npm i && npm run build``` to install dependencies
3. Run the frontend by typing ```npm run dev```
4. Explore the frontend pages

### Full-Stack

1. Create an .env file in the backend directory as shown below
2. Ensure your terminal is in the outer directory, run ```npm run inst && npm run start```

**`main.py`**
```python
MGURL = # You would have to setup your own project using the MongoDB cloud service and you will be prompted with a URL to add to this file
SECRET_KEY = # Secret key used for JWT encryption, should never be shared.
UPSTASH_REDIS_REST_URL = # I setup a rate-limiting middleware component using Redis, available on Upstash
UPSTASH_REDIS_REST_TOKEN = # The token is required as well
MY_EMAIL = # For resetting passwords, you require an email account 
GOOGLE_APP_PASSWORD = # I chose an unused gmail account, which required 2fa for generating app passwords, but its really easy though
FRONTEND_URL="http://localhost:5173"


