import {
    type Conversation,
    type ConversationFlavor,
    conversations,
    createConversation,
  } from "@grammyjs/conversations";
import { Context } from "grammy";


  type MyContext = Context & ConversationFlavor;
  type MyConversation = Conversation<MyContext>;
  
