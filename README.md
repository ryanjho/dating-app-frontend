# Dating App

## Project Demo
Project Demo Link: https://dating-app-fe.herokuapp.com/

## Project Contributors
[Linh Le](https://github.com/linhkhanh), [Ryan Ho](https://github.com/ryanjho) and [Marius Andrian](https://github.com/mariusandrian)

## Application Description
Dating App is an online application that allows users to find and match with potential profiles that match their criteria. Users will be able to chat with other users that have also indicated interest in them. Users will also be able to find and filter potential profiles according to their criteria.


## Database / Storage
* **MongoDB** - NoSQL database using collections and documents
* **Cloudinary** - Cloud media management service that efficiently creates, manages and delivers images, videos and other media, personalized and optimized for every device and channel.


## Technologies Used
* Express.js
* Node.js
* Cors
* Bcrypt
* Express-session
* ReactJS
* Multer
* Socket.io
* Nodemailer
* Fetch
* HTML5, CSS , Bootstrap


## Project Objective
The main objective of this project is to create a CRUD application (Create, Read, Update and Delete) with the MVC framework (Model, View, Controller) using the MERN stack (MongoDB, Express, React and Node.js).

## User Stories
* As a user, I will like to be able to create an account with the following information:
    * Username
    * Age
    * Location
    * Gender
    * Which gender you would like to find profiles for
    * Which age range would you like to find profiles for
    * Add Avatar Image
    * Set Account Password
* As a user, I will like to be able to update my profile information:
    * Username
    * Age
    * Location
    * Gender
    * Which gender you would like to find profiles for
    * Which age range would you like to find profiles for
    * Edit Avatar Image
* As a user, I will like to be able to receive notifications on which profiles have liked me
* As a user, I will like to be able to chat with my matched profiles
* As a user, I will like to be able to see other potential users near me
  

## Approach Taken
* Set up MVC structure with basic CRUD routes for User and Messages in the backend
* Set up database with relevant collections and schema validation in MongoDB 
* Build authentication flow for User in the frontend
* Update UX layer with HTML, CSS enhancements
* Deploy frontend and backend to Heroku

## Accomplishments
* Dating App meets the minimum viable product (MVP) requirements with full CRUD features
* Social Authentication using Facebook Authentication
* Forget Password Email Feature using Nodemailer
* Find Nearby Users Feature
* Like / Skip Users Feature
* Chat Feature for Matched Users

## Difficulties Faced
* Working with Sockets
* Matching algorithm between 2 profiles
* Making chat work between 2 matched users only

## Additional Features
* Additional Social Login Authentication (e.g. Google)
* Further enhancmenets to Chat application using Socket.io
* Additional filters for finding profiles according to additional different criteria (e.g. Education, Occupation, Location, Age, Gender, etc)
* Integrating additional 3rd-party APIs to enhance the application's features (e.g. playing online games with matched profiles, date appointment scheduling, etc.)





