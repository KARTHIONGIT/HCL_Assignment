# HCL_Assignment

I have uses React for the fronend and .net core for the backend
The backend 
It uses SQLlite for DB and uses Entity framework, the data/app.db has the data.
The endpoints for CRUD actions is created and listed in the controller and the POST call takes in values from body for security and size coonsideration.
Since no AUTH is implemented I had disabled CORS and made it open for all origins, compromising the security.


For the frontend
Navbar - To toggle between Adduser and list users
AddUsers Page - It is a form to add new users and it performs client side validations like ensuring the length of the char and input type for pincode
List users - Upon successfull or failed api call for getting all the users, a toaster message is shown and proper indication of data unavailability
Also upon adding users in previous page it fetches dynamically in the list page and displays them.
