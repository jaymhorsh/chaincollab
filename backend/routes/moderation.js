import config from '../config.js';
import { Chat } from '@pubnub/chat';

export const setRestrictions = async (req, res) => {
  // Get PubNub Admin UUID
  const chat = await Chat.init(config);

  // Parse ChannelID
  const channelID = req.body.channelID;
  const userID = req.body.userID;
  const ban = req.body.ban;
  const mute = req.body.mute;

  if (channelID == null || userID == null) {
    return res.status(500).send({
      message:
        'Error: channelID or userID was called on null. Ensure content-type is application/json and the POST request contains a channelID and a userID parameter',
    });
  }

  if (ban == null) {
    return res.status(500).send({
      message: 'Error: Have to include the current ban status when muting a user',
    });
  }

  // If the channel has been created grab the channel object
  const channelInstance = await chat.getChannel(channelID);
  const userInstance = await chat.getUser(userID);

  if (channelInstance == null || userInstance == null) {
    return res.status(500).send({
      message: `Error: No channel instance matches the ID: ${channelID} or No user Instance matches the ID: ${userID}`,
    });
  }

  await channelInstance.setRestrictions(userInstance, {
    ban: ban,
    mute: mute,
    reason: 'Restricted by admin',
  });

  return res.status(200);
};

//
export const deleteMessage = async (req, res) => {
  // Get PubNub Admin UUID
  const chat = await Chat.init(config);

  const messageID = req.body.messageID;
  const channelID = req.body.channelID;

  // If the channel has been created grab the channel object
  const channelInstance = await chat.getChannel(channelID);

  if (channelInstance == null) {
    return res.status(500).send({
      message: `Error: No channel instance matches the ID: ${channelID}`,
    });
  }

  const message = await channelInstance.getMessage(messageID);

  // Soft delete a message so it is able to be restored
  await message.delete({
    soft: true,
  });

  return res.status(200);
};

export const restoreMessage = async (req, res) => {
  // Get PubNub Admin UUID
  const chat = await Chat.init(config);

  const messageID = req.body.messageID;
  const channelID = req.body.channelID;

  // If the channel has been created grab the channel object
  const channelInstance = await chat.getChannel(channelID);

  if (channelInstance == null) {
    return res.status(500).send({
      message: `Error: No channel instance matches the ID: ${channelID}`,
    });
  }

  const message = await channelInstance.getMessage(messageID);

  await message.restore();

  return res.status(200);
};
