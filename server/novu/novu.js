const { Novu } = require('@novu/node');
const dotenv = require('dotenv');


exports.module = inAppNotification = async (description, Id) => {
    const novu = new Novu(process.env.NOVU_API_KEY);
    await novu.subscribers.identify(Id, {
      firstName: "inAppSubscriber",
    });
  
    await novu.trigger("in-app", {
      to: {
        subscriberId: "Sumit",
      },
      payload: {
        description: description
      },
    });
  };