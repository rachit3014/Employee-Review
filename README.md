# Project : Employee Review System

## Description 

A full stack app, in which there are two types of user
- admin
- employee
Admin can assign the employees, to review each other on the basic of their work. The admin has a special power, to make any other employee as the new admin. Admin can also make the new employee, and they can also assign, the reviewer and review. The admin can see the current employee, and the admin can remove the employee. The employee can also see who reviews them. 

## Technologies Used
- NodeJS
- Express
- EJS
- MongoDB

## To Run Locally

Clone the project

```bash
  git clone https://github.com/rachit3014/Employee-Review
```

Go to the project directory

```bash
  cd empnode
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
The Server should now be running at http://localhost:8000/

## If you want to login with admin then use this email id superadmin@gmail.com and password is superadmin12345

## Folder Structure

```bash
empnode
├───assets
│   └───css
│       ├───addreview.css
│       ├───admin.css
│       ├───assign.css
│       ├───layout.css      
│       ├───list_of_emp.css  
│       ├───login.css  
│       ├───review.css  
│       └───signup.css
│             
├───config
│   ├───midilware.js
│   ├───mongoose.js
│   └───passport-local-stragety 
│         
├───controllers
│    ├───admin.js
│    ├───review.js
│    └───user.js
│
├───models
│   ├───assign.js
│   ├───feedback.js
│   └───users.js
│  
├───routes
│   ├───admin.js
│   ├───index.js
│   ├───review.js
│   └───user.js 
│
├───views
│   ├───_header.ejs
│   ├───addreview.ejs
│   ├───admin.ejs
│   ├───layout.ejs
│   ├───list_of_emp.ejs
│   ├───assign.ejs
│   ├───login.ejs
│   ├───review.ejs
│   └───signup.ejs
│
├───.gitignore
├───index.js
├───package-lock.json
├───package.json
└───README.md

```
