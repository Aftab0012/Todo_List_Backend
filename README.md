
# Todo list backend

Welcome to the ToDo Backend, a robust and versatile server-side application that empowers you to manage your tasks and collaborate seamlessly. Our backend offers a comprehensive set of API functions, catering to the fundamental actions needed for efficient task management. Whether you're creating, retrieving, updating, deleting, sharing, or searching for tasks, our ToDo Backend provides the functionalities you need.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#Installation-for-local-Environment)

### Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Axios](https://axios-http.com/)
- [Other Dependencies...]

## Installation for local Environment

1. Clone the repository:

   ```bash
   https://github.com/Aftab0012/E-commerce-Backend-Project.git
   ```

2. Change to the project directory:

   ```bash
   cd your-project
   ```

3. Install server dependencies:

   ```bash
   npm install
   ```

4. start server:

   ```bash
   npm start
   ```

5. please add a .env file with following content to run the server:

   ```bash
   SECRET_KEY:{YOUR SECRET KEY GOES HERE}
   DB_URI:{YOUR MONGODB ATLAS CONNECTION STRING GOES HERE}
   ```

   
## API Reference

### Im providing a fully functional and deployed backend link which is deployed on render.com you can use this link to perform below mentioned api actions to get desired responses.


Render backend Link to perform API actions: https://todobackend-jybg.onrender.com

### Note :- Please remember this Render.com deployed link goes to sleep mode after 15mins of inactivity, So when you first interact with this link wait atleast < 1 min after that the api endpoint withh be fully functional

## Authentication API's

## To Signup a user:- 

Example Request (Using POSTMAN)
Set the request type to POST.
Enter the endpoint URL: https://todobackend-jybg.onrender.com/auth/signup
In the request body, provide the user credentials in the required format.
#### req.body JSON format
   ```bash
   {
  "username": "john doe",
  "password": "John@123"
}
   ```

   #### This endpoints response looks like this
   ```bash
   {
	"message": "User registered successfully",
	"user": {
		"username": "demouser",
		"password": "$2b$10$C80SFVZOOyt0BP9lk2aF3ehiXacXh1e1fsIDFZvVr1pwqE9vsmpty",
		"date": "2024-01-04T09:15:11.756Z",
		"_id": "65967effc994760455640698",
		"__v": 0
	}
}
```

## To Login a user:- 

Example Request (Using POSTMAN)
Set the request type to POST.
Enter the endpoint URL: https://todobackend-jybg.onrender.com/auth/login
In the request body, provide the user credentials in the required format.
#### req.body JSON format
   ```bash
   {
  "username": "john doe",
  "password": "John@123"
}
   ```
   #### This endpoint response looks like this
   
   ```bash
{
	"message": "login successful",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpZ2h0IiwiaWF0IjoxNzA0MzYxNjMzLCJleHAiOjIwMTk3MjE2MzN9.hmSyW2_6f7w4JrQHr9WTB2UCz3UQYw57EEU5sOFLDN0",
	"_id": "6596719285e44d82dd5797af",
	"username": "light"
}
   ```

## Note API Endpoint's

## To create a note:- 

Example Request (Using POSTMAN)
Set the request type to POST.
Enter the endpoint URL: https://todobackend-jybg.onrender.com/api/notes/create

#### req.body JSON format
   ```bash
 {
  "title": "My note 5",
  "content": "lorem ipsum random content text"
}
   ```

## To get all notes for the authenticated user:- 

Example Request (Using POSTMAN)
Set the request type to POST.
Enter the endpoint URL: https://todobackend-jybg.onrender.com/api/notes

#### Response from the given endpoint fro currently loggedin /authenticated user.
   ```bash
  {
	"notes": [
		{
			"_id": "65965ca268a38bf941b45473",
			"title": "user2 note",
			"content": "This is the content of the current note with updateed content.",
			"user": {
				"_id": "65965ae77671f42bee5b2976",
				"username": "goku"
			},
			"sharedWith": [
				{
					"_id": "65965a412d0bcf490fce0f5a",
					"username": "ichigo"
				},
				{
					"_id": "65965a412d0bcf490fce0f5a",
					"username": "ichigo"
				}
			],
			"date": "2024-01-04T07:19:22.675Z",
			"__v": 3
		},
		{
			"_id": "659663b5874edc6ed4cc5b10",
			"title": "My note 4",
			"content": "This is the content of the current note with updateed content.",
			"user": {
				"_id": "65965ae77671f42bee5b2976",
				"username": "goku"
			},
			"sharedWith": [],
			"date": "2024-01-04T07:46:11.686Z",
			"__v": 0
		},
		{
			"_id": "65967752c99476045564066e",
			"title": "My note 5",
			"content": "This is the content of the current note with updateed content.",
			"user": {
				"_id": "65965ae77671f42bee5b2976",
				"username": "goku"
			},
			"sharedWith": [],
			"date": "2024-01-04T09:15:12.956Z",
			"__v": 0
		}
	]
}
   ```

## To get single note of authenticated user:- 

Example Request (Using POSTMAN)
Set the request type to POST.
Enter the endpoint URL: https://todobackend-jybg.onrender.com/api/notes/{note_id}
In the request body, provide the user credentials in the required format.
#### response of this endpoint
   ```bash
 {
	"note": {
		"_id": "65965ca268a38bf941b45473",
		"title": "user2 note",
		"content": "This is the content of the current note with updateed content.",
		"user": "65965ae77671f42bee5b2976",
		"sharedWith": [
			"65965a412d0bcf490fce0f5a",
			"65965a412d0bcf490fce0f5a"
		],
		"date": "2024-01-04T07:19:22.675Z",
		"__v": 3
	}
}
   ```

## To update a note:- 

Example Request (Using POSTMAN)
Set the request type to POST.
Enter the endpoint URL: https://todobackend-jybg.onrender.com/api/notes/{note_id}

#### response of this endpoint
   ```bash
  {
	"message": "Note updated successfully",
	"note": {
		"_id": "65965ca268a38bf941b45473",
		"title": "My note 6",
		"content": "This is the content of the current note with updateed content.",
		"user": "65965ae77671f42bee5b2976",
		"sharedWith": [
			"65965a412d0bcf490fce0f5a",
			"65965a412d0bcf490fce0f5a"
		],
		"date": "2024-01-04T07:19:22.675Z",
		"__v": 3
	}
}
   ```

## To Delete a note:- 

Example Request (Using POSTMAN)
Set the request type to POST.
Enter the endpoint URL: https://todobackend-jybg.onrender.com/api/notes/{note_id}

#### response of this endpoint
   ```bash
  {
	"message": "Note deleted successfully",
	"note": {
		"_id": "65965ca268a38bf941b45473",
		"title": "My note 6",
		"content": "This is the content of the current note with updateed content.",
		"user": "65965ae77671f42bee5b2976",
		"sharedWith": [
			"65965a412d0bcf490fce0f5a",
			"65965a412d0bcf490fce0f5a"
		],
		"date": "2024-01-04T07:19:22.675Z",
		"__v": 3
	}
}
   ```

## To share a note with any user:- 

Example Request (Using POSTMAN)
Set the request type to POST.
Enter the endpoint URL: https://todobackend-jybg.onrender.com/api/notes/{note_id}/share

#### req.body JSON format
   ```bash
  {
	"sharedWith": { Id Of The User To Share With }
}
   ```


#### response of this endpoint
   ```bash
  {
	"message": "Note shared successfully"
}
   ```

## To search a note:- 

Example Request (Using POSTMAN)
Set the request type to POST.
Enter the endpoint URL: https://todobackend-jybg.onrender.com/api/notes/search?q={yourSearchQueryGoesHere}

#### response of this enpoint
   ```bash
{
	"message": [
		{
			"_id": "65967bc4c994760455640683",
			"title": "lights first note",
			"content": "some random text",
			"user": "65965ae77671f42bee5b2976",
			"sharedWith": [
				"65965a412d0bcf490fce0f5a"
			],
			"date": "2024-01-04T09:15:12.956Z",
			"__v": 1
		}
	]
}
   ```

