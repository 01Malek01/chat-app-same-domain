import { Request, Response } from "express";
import Message from "../models/messages";
import { CustomRequest } from "../types";
import Conversation from "../models/conversation";
import { getReceiverSocketId, io } from "../socket/socket";

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    let conversation = await Conversation.findOne({
      // Find the document that contains both sender and receiver ids
      participants: { $all: [senderId, receiverId] }, // Find conversation between sender and receiver
    });

    if (!conversation) {
      // It will be null the first time because it will be the first message
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message,
      conversationId: conversation._id,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    
        await Promise.all([conversation.save(), newMessage.save()]);

    // Socket.io here***************************

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      //we only want to send this event for this receiver
      io.to(receiverSocketId).emit("newMessage", newMessage); 
    }
    

    return res.status(200).json(newMessage);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

export const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user?._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation?.messages;
    return res.status(200).json(messages);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};
