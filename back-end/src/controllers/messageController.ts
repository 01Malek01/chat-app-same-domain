import { Request, Response } from "express";
import Message from "../models/messages";
import { CustomRequest } from "../types";
import Conversation from "../models/conversation";

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;
    let conversation = await Conversation.findOne({
      //find the doc that contains both sender and receiver ids
      participants: { $all: [senderId, receiverId] }, //find conversation between sender and receiver
    });
    if (!conversation) {
      //it will be null in the first time bc it will be first message
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

    //socket.io here***************************

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
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
      res.status(200).json([]);
    }
    const messages = conversation?.messages
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
