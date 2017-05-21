/*
 * dataStore.js
 * Data persistency / CRUD layer
 */
'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: "myKeyId", secretAccessKey: "secretKey", region: "us-east-1" });
const dyn = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000')});
const docClient = new AWS.DynamoDB.DocumentClient({
	service : dyn
}),
getTableName = function () {
	return 'prosunshining-graphql-example1';
},
addUser = function (user) {
	const params = {
		TableName: getTableName(),
		Item: {
			id: user.id,
			name: user.name
		}
	};
	console.log(`adding user : {${user.id}, ${user.name}}`);
	return docClient.put(params).promise().then(() => user);
},
getUser = function (userid) {
	const params = {
		TableName: getTableName(),
		AttributesToGet: ['id', 'name']
	};
	if (userid) {
		//search by userid
		params.Key = {id: userid};
		return docClient.get(params).promise()
			.then(data => [data.Item]);
	} else {
		//get all users
		params.Key = {id: 1};
		return docClient.scan(params).promise()
			.then(data => data.Items);
	}
},
deleteUser = function (userid) {
	let toBeDeletedUser;

	return getUser(userid)
		.then(resultArr => {
			toBeDeletedUser = resultArr[0];
			if (!toBeDeletedUser || !toBeDeletedUser.userid) {
				throw `Delete user failed: no user with userid ${userid}`;
			}
		}).then(() => {
			const params = {
				TableName: getTableName(),
				Key: {
					id: userid
				}
			};
			return docClient.delete(params).promise();
		}).then(() => toBeDeletedUser);
}; //deleteUser
module.exports = { addUser: addUser, getUser: getUser, deleteUser: deleteUser };
