# graphql-dynamodb
Full-stack GraphQL tutorials with React, Redux and Apollo, DynamoDB

Currently this works with local dynamodb for development stage, you can change aws configuration anytime to use dynamodb on AWS account.

## Setup
1. Server
```bash
   cd server
   npm install
   npm start
```
   GraphQL + DynamoDB Server will be running at localhost:4000
2. Client
```bash
   cd client
   npm install
   npm start
```
   GraphQL + DynamoDB Client will be running at localhost:3000

## Prerequisites
   Please make sure you're running local dynamodb on localhost:8000

   To setup local dynamodb, follow this instruction[Setting Up DynamoDB Local (Downloadable Version)][]

   [Setting Up DynamoDB Local (Downloadable Version)]: http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html

   Create table with the name of configured in getTableName() from ./server/src/dataStore.js.
   **localhost:8000/shell** will help you to operate dynamodb.
   Change table name as you want.

   Table has very simple structure of id as primary key and name attribute.
