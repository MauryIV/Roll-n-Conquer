const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');


const userData = require('./userData.json');

db.once('open', async () => {
  await cleanDB('User', 'users');

  const insertedUsers = await User.insertMany(userData);
  console.log('Users seeded!');

  for (i = 0; i < insertedUsers.length; i++)
    {
      const RandomFriend = [];
      const friendusername = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
      RandomFriend.push(friendusername);
      const addFriend = await User.findOneAndUpdate(
          {_id: insertedUsers._id},
          {$addToSet: { friendslist: { username: RandomFriend.username }}},
          { new: true }).populate("friendslist");
    }
  console.log('Friendslist updated!');

  process.exit(0);
});
