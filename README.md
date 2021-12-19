# **Belli-e-Snelli**
## **"Ingegneria del Software 2021"s project by G35**
In this Repository you can find the web application called "Belli & Snelli". This application is useful for customers who take advantage of a gym membership, specifically for customers who take advantage of the help of a personal trainer. In this application you can search and book the slots, made available by the coaches, for the training sessions. In addition to this booking it is possible to have one or more personalized cards, which are contained in a special web screen. The customer, once booked, can see the most recent reservation in the foreground, but in addition, he can view all the reservations made and in which he was present. The client is one of the three Users we have described including Receptionist and Coach. Of these two, however, we have only described all the actions that they were able to do in the application through UserStories and UserFlow, however, leaving out the application as it is an application made public to the Customers and not to the other two actors. In the Github you will find a folder called "API", where you will find the following folders and files:

- "/node_modules": contains all node.js modules used by the application;
- "/public": in which there will be all the html pages needed for the web application and a "Photo" folder with all the photos we used for this project;
- "/test": contains the script used for testing the APIs.
- "date_slot.md": the free dates that we have entered as an example to be able to test if the application marks the successful reservation and the cancellation of a reservation;
- "index.js": is the main file that contains the main functionalities of the application;
- "/test/index.js": this file contains the tests of the API we tested;
- "package.json": contains information about the application and the packages used by it;
- "package-lock": is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates;

## **How to make it work**
Prerequisites:
- Install [Node.js](https://nodejs.org/it/)

Download the repository and put it wherever you want. Then, in the API folder, open up a terminal and install the following packages:

Name | Install cmds
:--- | :---
body-parser | `npm install body-parser --save`
cors | `npm install cors --save`
express | `npm install express --save`
express-fileupload | `npm install express-fileupload --save`
mongoose | `npm install mongoose --save`
swagger-jsdoc | `npm install swagger-jsdoc --save`
swagger-ui-express | `npm install swagger-ui-express --save`

Or simply paste *this* `npm install body-parser cors express express-fileupload mongoose swagger-jsdoc swagger-ui-express --save`.

Then, to be able to do the APIs testing, you also need:

Name | Install cmd
:--- | :---
supertest | `npm install supertest --save-dev`
tape | `npm install tape`
tap-spec | `npm install tap-spec --save-dev`

## **How to run it**
Open up a terminal inside of the API folder and run `node index.js`. After `IN ASCOLTO SULLA PORTA 3000` and `Collegato con successo al database` appeared in the terminal (make sure port 3000 is free), open your browser at the following [link](http://localhost:3000/) and then you are good to go.

To stop it, you have to brutally press <kbd>Ctrl</kbd> + <kbd>C</kbd> inside the terminal.

## **How to test it**
In the same terminal, run `npm start` and wait until the tests have finished.

## **How to try the APIs using Swagger**
At this [link](http://localhost:3000/api-docs/) you can try the same 4 APIs to check all the expected results. 

For example, inside the 2 POST APIs, you can edit the RequestBody to check all the possible responses sent by the server.

---

## **Some utilities:**

### **- How do I know which dates are available since I don't have permission to see the server?**
[This file](https://github.com/pierofontanive/Belli-e-Snelli/blob/main/date_slot.md) can help you out, or check the ResponseBody by executing the `/api/prenotazioni` [here](http://localhost:3000/api-docs/#/API/get_api_prenotazioni).

### **- What are the credentials to log into the application?**

Username | Password
:--- | :---
`test@unitn.it` | `ingegneriadelsoftware2021`
