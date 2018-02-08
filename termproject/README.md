# csc648-team03

## Overview (Please Read)
I have laid out very specific instructions below are the steps each of us will need to execute in order to get our program up and running on our local machines. Please follow them in order, this is very important. I (Gerren) am using Ubuntu 17.04. That being said, some of the command line instructions will be a tiny bit different for Mac users, but it shouldn't be too hard to Google the changes needed to be made. Please let me know if there are any questions. 

## Initial Downloads
Be sure the following is downloaded first before cloning the github repo
* [PostgreSQL](https://www.postgresql.org/download/) - This is the database we  will be using
* [Node.js](https://nodejs.org/en/download/) - Language we will be using for server side coding (npm will be installed with this)
* [VScode](https://code.visualstudio.com/download) or [Atom](https://atom.io/) - Text editor to write your code in (you only need one, they are pretty similar).

## Tests To Check Downloads
* For node testing, just check to see if you have a version of node installed 
    
    ![](./assets/nodetest.png) 

* For postgres testing on linux this works for me:
    
    ![](./assets/psqltest.png)

  replace "postgres" with the username you used when you downloaded postgres. If you get to this screen, it's downloaded correctly. 

  For mac users the command is a bit different, just google how to access the psql UI, the screen will look similar.

## Instructions To Clone The Repository & Set Up Project 
1.  Create a folder to store the project 
2.  cd into the folder from terminal 
3.  type this command into terminal:
    
    git clone git@github.com:csc648-sp18/csc648-team03.git

4.  Might need to run git fetch to get all branches updated on your local machine
5.  Make your own branch off of the development branch
    
    git checkout development
    
    git checkout -b *your branch name*

6.  Make sure you are in your own branch before continuing, use this command to check:

    git branch

    it should look something like this, but the * should be next your branch name:

    ![](./assets/gitexample.png)

## Download Dependencies
If you look in our package.json file, there's some dependencies that I used to create the initial project. You must download these dependencies before you run the project. Luckily, this is pretty simple: 
* make sure you cd into termproject
* type this command into terminal
    
    npm install 
* npm install will look at the dependencies in our package.json file and downloads them locally. It will also add in the necessary files to our node_modules folder so that we can import them wherever they are needed in our program. 

## Create The Database In Postgres
1.  Open up terminal and access the psql UI, you should be at this screen:
    
    ![](./assets/psqltest.png)

2.  Once you are here, type in this command 
    
    CREATE DATABASE termproject;

3.  This should create the database. Try connecting to the database afterwards  by typing his command:
    
    \c termproject

4.  The UI should look like this now: 

    ![](./assets/connectedToDatabase.png)

5. That's it for now, we'll be creating tables in our database shortly, but if you get to this point, you're in good shape.

## Set Up Environment Variables
Since all of us are going to have local versions of the database on our computers, we're going to need a way to connect to them in our program (this is only for development mode, in production mode it'll be different). We're going to tell our program how to connect to the database locally through a .env file that contains an environment variable that specifies exactly which user to look for in the postgres database as well as the name of the database we're connecting to in our program. 

It is important to note that the .env file is a hidden file so if you're trying to view it in the terminal you will need to use:
    
    ls -a

1.  Make sure you are still in the termproject directory
2.  Type in this command to create the .env file:
    
    touch.env

3.  If the above doesn't work, just create a new file called .env 
4.  Now we need to create the actual environment variable that will be referenced when we connect to the database in our program. You can do this by typing this command: 

    echo DATABASE_URL=postgres://`whoami`@localhost:5432/termproject >> .env
  
  *replace whoami with the name of the superuser on your postgres database

5.  If you do this successfully your .env should just contain something like this:
    DATABASE_URL=postgres://gerren@localhost:5432/termproject 

6.  I already added in the lines of code that will tell the program to look into our .env file for the DATABASE_URL variable that tells the program to connect to our postgres database. If you're interested, look in config/config.js, but please don't change anything in these files. 

## Test Database Connection
So in it's current state, our database (termproject) exists, but there are no tables that are holding any data in the database. Let's create a table in the database to test if our database is connecting to the program correctly. 

Luckily, I've already created a table (look in migrations/users.js), I can explain the details of how this works later, but for now let's just make sure we can create tables in our database. 

1.  I've included a script that will run the sequelize command to run pending migrations. All this means is that when we want to make changes to our database, our program will know how to execute these changes when we run this command:
    
    npm run db:migrate 

2.  The only pending migration we had was the users.js table, so on success, the users table should have been added to the database.

3.  To check if the table has been added go into your terminal and access the psql UI. 

4.  Connect to the termproject database
5.  Use this command to list the tables in the database:

    \dt

6.  You should see this screen:   
    
    ![](./assets/listoftables.png)

7.  If you get to this point, you're good to go! You can also view the table using this command, although it will be empty because we haven't added any data into it. 
    
    ![](./assets/userstable.png)

8.  To quit psql just type 

    \q

## Starting The Program
All that's left to do now is start the program and make sure everything is running. In development mode, we're running nodemon. Nodemon is useful because it will automatically restart our server each time a change is made to our program. This is useful because it allows us to see the changes we made instantly. 

1.  Be sure you're still cd into termproject
2.  Type this command to start the server 

    npm run start:dev

    ![](./assets/terminalstart.png)

3.  If no errors appear on the console open up a browser
4.  Type this for the url and press enter:
    
    localhost:3000
5.  On success, you should just see this:

    ![](./assets/successscreen.png)

6.  To stop the server just press:
    
    ctrl+c
