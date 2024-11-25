
# Learning Management System

A digital marketplace where educators create, publish, and monetize comprehensive online courses across diverse domains, enabling learners to discover, purchase, and consume high-quality educational content.




## Appendix

This project have two section 
 - Frontend 
 - Server


## Tech Stack

**Client:** React, Redux, RTK Query, TailwindCSS, shadcn, react-hook-form, react-router-dom, stripe

**Server:** Node, Express, mongoose, jsonwebtoken, cookie-parser, express-validator, multer 


## Frontend
### Environment Variables

To run this project, you will need to a `.env` file.


So, first create a `.env.` file into root directory of our project and the following environment variables to your .env file

`VITE_BACKEND_URL`= backendURL




## Server
### Environment Variables

To run this project, you will need to a `.env` file.


So, first create a `.env.` file into root directory of our project and the following environment variables to your .env file

`NODE_ENV`=development

`PORT`=8000

`MONGO_URL`=mongodb+srv://...

`ORIGIN_URL`=

`ACCESS_TOKEN_SECRET`=

`CLOUDINARY_CLOUD_NAME`=

`CLOUDINARY_API_KEY`=

`CLOUDINARY_API_SECRET_KEY`=

`STRIPE_SECRET_KEY`=

`STRIPE_PUBLISHABLE_KEY`=

`WEBHOOK_ENDPOINT_SECRET`=


## Documentation

[Documentation](https://documenter.getpostman.com/view/32458305/2sAYBUCXmX)


## Run Locally

Clone the project and run into your local machine

```bash
  git clone https://github.com/mdArshad10/LMS.git
```

Go to the frontend directory for **frontend**

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Go to the server directory for **server**

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```
