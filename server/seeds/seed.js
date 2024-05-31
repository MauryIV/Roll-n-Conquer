const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');


const userData = require('./userData.json');

db.once('open', async () => {
  await cleanDB('User', 'users');

  const insertedUsers = await User.insertMany(userData);
  console.log('Users seeded!');

  // const userIds = insertedUsers.map(user => user._id);
  
  // console.log("++++++++++++++++");
  // console.log(typeof(insertedUsers));
  // console.log(insertedUsers);
  // console.log("++++++++++++++++");


  for (i = 0; i < insertedUsers.length; i++)
    {
      const RandomFriend = [];
      const friendusername = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
      RandomFriend.push(friendusername);

      // console.log("++++++++++++++++");
      // console.log(insertedUsers[0]);
      // console.log(RandomFriend);
      // console.log("++++++++++++++++");
      const addFriend = await User.findOneAndUpdate(
          {_id: insertedUsers._id},
          {$addToSet: { friendslist: { username: RandomFriend.username }}},
          { new: true }).populate("friendslist");
    }

  // funciton to grab random friends
  // const getRandomFriends = (thisUserId, friendAmount) => {
  //   const friendlist = [];
  //   while (friendlist.length < friendAmount) {
  //     const friendId = userIds[Math.floor(Math.random() * userIds.length)];
  //     if (friendId !== thisUserId && !friendlist.includes(friendId)) {
  //       friendlist.push(friendId);
  //     }
  //   }
  //   return friendlist;
  // };

  // // function to get random Amount of friends
  // for (const user of insertedUsers) {
  //   const friendslist = getRandomFriends(user._id, Math.floor(Math.random() * 4));
  //   await User.findByIdAndUpdate(user._id, { friendslist });
  // }

  // const addFriend = await User.findOneAndUpdate(
  //   {_id: context.user._id},
  //   {$addToSet: { friendslist: { username: username }}},
  //   { new: true }).populate("friendslist");
  //   return addFriend;

  console.log('Friendslist updated!');

  process.exit(0);
});
