# Belli-e-Snelli
## "Ingegneria del Software 2021"s project by G35
In this Repository you can find the web application called "Belli & Snelli". This application is useful for customers who take advantage of a gym membership, specifically for customers who take advantage of the help of a personal trainer. In this application you can search and book the slots, made available by the coaches, for the training sessions. In addition to this booking it is possible to have one or more personalized cards, which are contained in a special web screen. The customer, once booked, can see the most recent reservation in the foreground, but in addition, he can view all the reservations made and in which he was present. The client is one of the three Users we have described including Receptionist and Coach. Of these two, however, we have only described all the actions that they were able to do in the application through UserStories and UserFlow, however, leaving out the application as it is an application made public to the Customers and not to the other two actors. In the Github you will find a folder called "API", where you will find the following folders:

- "node_modules": contains all node.js modules used by the application;
- "public": in which there will be all the html pages needed for the web application and a "Photo" folder with all the photos we used for this project;
- "date_slot": the free dates that we have entered as an example to be able to test if the application marks the successful reservation and the cancellation of a reservation;
- "index.js": is the main file that contains the main functionalities of the application;
- "package.json": contains information about the application and the packages used by it;
- "package-lock": is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates;

## How to make it work?
You need to have Node.js installed in you machine for this application to work.
Also you need to install these packages:
- body-parser
- cors
- express
- express-fileupload
- mongoose
- swagger-jsdoc
- swagger-ui-express

To set up all the things you need, choose a folder that will contain the application, open a terminal inside in that folder and run `npm init`.
When you are done, in the same terminal run `npm install body-parser cors express express-fileupload mongoose swagger-jsdoc swagger-ui-express --save` to install all the packages needed.

After you finished, just run `node index.js`, wait that the database connection is established, open your browser and search for http://localhost:3000/

## How to test it?
You need all the packages listed above, also you need to install some more packages in the same folder as the other ones:
- supertest
- tape
- tape-spec

Run the following commands: `npm install supertest --save-dev`,`npm install tape` and `npm install tap-spec --save-dev`

Then, in the same terminal, just run `npm test` and it *should* work.
