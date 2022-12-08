import { Bot, webhookCallback, session, SessionFlavor, Context } from "grammy";
import { Menu } from "@grammyjs/menu";
import { hydrateFiles } from "@grammyjs/files";
import * as AWS from 'aws-sdk'
import * as fs from 'fs';

import { type Conversation, type ConversationFlavor, conversations, createConversation} from "@grammyjs/conversations";

interface SessionData {
  /** custom session property */
  companys: Array<string>;
  applyedCompanys: Array<string>;
}

type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;
type MyConversation = Conversation<MyContext>;


async function greeting(conversation: MyConversation, ctx: MyContext) {
  const openWords = `ברוך הבא למערכת ג'וב בוט!`;
  await ctx.reply(`${openWords}`);
  await ctx.reply("הפצת קורות חיים בקליק", { reply_markup: menu });
  await ctx.reply("נא לבחור חברה, ולאחר מכן להעלות קורות חיים בפורמט .pdf / .doc ");
}

function onCompanySelection(company: string, currentSelection: Array<string>) {
  if (currentSelection.includes(company)) {
    currentSelection.splice(currentSelection.indexOf(company), 1)
  } else {
    currentSelection.push(company);
  }
}

const Bucket = process.env.BUCKET;
const s3 = new AWS.S3();
// const Path = require('path')
const bot = new Bot<MyContext>("5766441174:AAFQjtij0J0ij-aAaq0S5dw-vX3q-1CXjzk");
bot.api.config.use(hydrateFiles(bot.token));
// Install the session plugin.

// Install the session plugin.
bot.use(session({
  initial: () => ({ companys: [] as Array<string>, applyedCompanys: [] as Array<string> }),
}));

// Install the conversations plugin.
bot.use(conversations());
bot.use(createConversation(greeting));

// export const roboJobot = async (ctx: any) => {
const menu = new Menu<MyContext>('my-menu')
  .text((ctx) => `Matrix ${ctx.session.companys.includes('matrix') ? '✅' : ''}`, (ctx) => {
    onCompanySelection('matrix', ctx.session.companys);
    ctx.menu.update();
    // company = 'matrix';
  }).row()
  .text((ctx) => `SQLINK ${ctx.session.companys.includes('sqlink') ? '✅' : ''}`, (ctx) => {
    onCompanySelection('sqlink', ctx.session.companys)
    ctx.menu.update();
    // company = 'sqlink';
  }).row()
  .text((ctx) => `MALAM TEAM ${ctx.session.companys.includes('malam') ? '✅' : ''}`, (ctx) => {
    onCompanySelection('malam', ctx.session.companys)
    ctx.menu.update();
    // company = 'both';
  }).row()
  .text((ctx) => `אלעד מערכות ${ctx.session.companys.includes('elad') ? '✅' : ''}`, (ctx) => {
    onCompanySelection('elad', ctx.session.companys)
    ctx.menu.update();
    // company = 'both';
  });

bot.use(menu);

bot.command("start", async (ctx) => {
  // await ctx.reply(
  //   `<b>Hi!</b> ${ctx.from?.first_name} <i>Welcome</i> to RoboJobot.`,
  //   { parse_mode: "HTML" },
  // );
  // await ctx.reply("for which compony whould you like to apply your cv?", { reply_markup: menu });
  await ctx.conversation.enter("greeting");
});

// bot.on("message:file", async (ctx) => {
//   ctx.reply("got file!");
//   console.log('type check');
//   console.log(ctx.message.document);
//   if (!ctx.message.document) {
//     ctx.reply("file format must be .pdf / .doc");
//   }
// });

bot.on("message:document", async (ctx) => {
  ctx.reply("תודה שבחרת ג'וב בוט!");
  console.log(ctx.message);
  try {
    const file = await ctx.getFile();
    const token = '5766441174:AAFQjtij0J0ij-aAaq0S5dw-vX3q-1CXjzk';
    console.log(`file data!`);
    console.log(file.file_id);
    console.log(file.file_path);
    console.log(`file locaiotn!`);
    const fileTos3 = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
    console.log(fileTos3)
    // @ts-ignore
    const path = await file.download();
    console.log('path');
    console.log(path);
    var buffer = fs.readFileSync(path);
    ctx.session.companys.forEach(async (company) => {
      if (!ctx.session.applyedCompanys.includes(company)) {
        await s3.putObject({ Bucket: Bucket as string, Key: `${company}/${ctx.message.document?.file_name}` as string, ACL: 'public-read', Body: buffer }).promise();
        ctx.session.applyedCompanys.push(company);
        const fileType = file.file_path?.split('.')[1];
        console.log(`file type: ${fileType}`);
        // ctx.reply('upload to s3')
      }

    });
    // console.log("File saved at ", path);
  } catch (error) {
    ctx.reply(`error ${error}`)
  }

});

bot.on("message", async (ctx) => {
  console.log('ctx.message')
  console.log(ctx.message)

});

export const roboJobot = webhookCallback(bot, "aws-lambda");

//   const body = JSON.parse(ctx.body);
//   const { chat, text } = body.message;

//   if (text) {
//     let message = text;
//     console.log(ctx);
//     console.log('-------------------------------------------------------');
//     console.log('body');
//     console.log(body);
//     console.log('-------------------------------------------------------');
//     console.log('body message');
//     console.log(body.message);
//     console.log('-------------------------------------------------------');
//     console.log('chat');
//     console.log(chat);
//     // bot.on("message", async (ctx) => {
//     //   await sendToUser(chat.id, 'bot.on work as expected');
//     //   console.log('ctx.message')
//     //   console.log(`${ctx ? ctx.message : 'ctx message empty'}`)
//     // });
//     try {
//       // await ctx.reply(
//       //   `<b>Hi!</b> ${ctx.from?.first_name} <i>Welcome</i> to RoboJobot.`,
//       //   { parse_mode: "HTML" },
//       // );
//       bot.command("start", async (ctx) => {
//         // Send the menu:
//         await ctx.reply("Check out this menu:", { reply_markup: menu });
//       });
//       await bot.api.sendMessage(chat.id,
//         `<b>Hi!</b> ${chat.first_name} <i>Welcome</i> to RoboJobot.`,
//         { parse_mode: "HTML" },
//       );

//       await bot.api.sendMessage(chat.id, "for which compony whould you like to apply your cv?", { reply_markup: menu });
//       // await ctx.reply("for which compony whould you like to apply your cv?", { reply_markup: menu });
//     } catch (error) {
//       await bot.api.sendMessage(chat.id, "Hi!");
//       await sendToUser(chat.id, `${error ? error : 'no error'}`);
//     }
//   }

//   return { statusCode: 200 };
// };

// async function sendToUser(chat_id: any, text: any) {
//   const options = {
//     method: 'GET',
//     uri: `https://api.telegram.org/bot5766441174:AAFQjtij0J0ij-aAaq0S5dw-vX3q-1CXjzk/sendMessage`,
//     qs: {
//       chat_id,
//       text
//     }
//   };

//   return rp(options);
// }

// async function startHandler(bot:Bot,message) {
//   await bot.api.sendMessage(
//     `<b>Hi!</b> ${ctx.from?.first_name} <i>Welcome</i> to RoboJobot.`,
//     { parse_mode: "HTML" },
//   );
//   await ctx.reply("for which compony whould you like to apply your cv?", { reply_markup: menu });
// }


// Handle other messages.
// bot.on("message:document", async (ctx) => {
  //   ctx.reply("I'm about to find you'r dream job in a minute!");
  //   console.log(ctx.message);
  //   const file = await ctx.getFile();
  //   const token = '5766441174:AAFQjtij0J0ij-aAaq0S5dw-vX3q-1CXjzk';
//   console.log(`file data!`);
//   console.log(file.file_id);
//   console.log(file.file_path);
//   console.log(`file locaiotn!`);
//   console.log(`https://api.telegram.org/file/bot${token}/${file.file_path}`);
//   //@ts-ignore
//   const path = await file.download(`./cvs/${company}/${index}-${ctx.message.document?.file_name}`);
//   const fileType = file.file_path?.split('.')[1];
//   console.log(`file type: ${fileType}`);
//   console.log("File saved at ", path);

//   index++;
// });

// bot.start();
