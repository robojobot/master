"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.roboJobot = void 0;
var grammy_1 = require("grammy");
var menu_1 = require("@grammyjs/menu");
var files_1 = require("@grammyjs/files");
var AWS = require("aws-sdk");
var fs = require("fs");
var conversations_1 = require("@grammyjs/conversations");
function greeting(conversation, ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var openWords;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    openWords = "\u05D1\u05E8\u05D5\u05DA \u05D4\u05D1\u05D0 \u05DC\u05DE\u05E2\u05E8\u05DB\u05EA \u05D2'\u05D5\u05D1 \u05D1\u05D5\u05D8!";
                    return [4 /*yield*/, ctx.reply("".concat(openWords))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ctx.reply("הפצת קורות חיים בקליק", { reply_markup: menu })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, ctx.reply("נא לבחור חברה, ולאחר מכן להעלות קורות חיים בפורמט .pdf / .doc ")];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function onCompanySelection(company, currentSelection) {
    if (currentSelection.includes(company)) {
        currentSelection.splice(currentSelection.indexOf(company), 1);
    }
    else {
        currentSelection.push(company);
    }
}
var Bucket = process.env.BUCKET;
var s3 = new AWS.S3();
// const Path = require('path')
var bot = new grammy_1.Bot("5766441174:AAFQjtij0J0ij-aAaq0S5dw-vX3q-1CXjzk");
bot.api.config.use((0, files_1.hydrateFiles)(bot.token));
// Install the session plugin.
// Install the session plugin.
bot.use((0, grammy_1.session)({
    initial: function () { return ({ companys: [], applyedCompanys: [] }); }
}));
// Install the conversations plugin.
bot.use((0, conversations_1.conversations)());
bot.use((0, conversations_1.createConversation)(greeting));
// export const roboJobot = async (ctx: any) => {
var menu = new menu_1.Menu('my-menu')
    .text(function (ctx) { return "Matrix ".concat(ctx.session.companys.includes('matrix') ? '✅' : ''); }, function (ctx) {
    onCompanySelection('matrix', ctx.session.companys);
    ctx.menu.update();
    // company = 'matrix';
}).row()
    .text(function (ctx) { return "SQLINK ".concat(ctx.session.companys.includes('sqlink') ? '✅' : ''); }, function (ctx) {
    onCompanySelection('sqlink', ctx.session.companys);
    ctx.menu.update();
    // company = 'sqlink';
}).row()
    .text(function (ctx) { return "MALAM TEAM ".concat(ctx.session.companys.includes('malam') ? '✅' : ''); }, function (ctx) {
    onCompanySelection('malam', ctx.session.companys);
    ctx.menu.update();
    // company = 'both';
}).row()
    .text(function (ctx) { return "\u05D0\u05DC\u05E2\u05D3 \u05DE\u05E2\u05E8\u05DB\u05D5\u05EA ".concat(ctx.session.companys.includes('elad') ? '✅' : ''); }, function (ctx) {
    onCompanySelection('elad', ctx.session.companys);
    ctx.menu.update();
    // company = 'both';
});
bot.use(menu);
bot.command("start", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // await ctx.reply(
            //   `<b>Hi!</b> ${ctx.from?.first_name} <i>Welcome</i> to RoboJobot.`,
            //   { parse_mode: "HTML" },
            // );
            // await ctx.reply("for which compony whould you like to apply your cv?", { reply_markup: menu });
            return [4 /*yield*/, ctx.conversation.enter("greeting")];
            case 1:
                // await ctx.reply(
                //   `<b>Hi!</b> ${ctx.from?.first_name} <i>Welcome</i> to RoboJobot.`,
                //   { parse_mode: "HTML" },
                // );
                // await ctx.reply("for which compony whould you like to apply your cv?", { reply_markup: menu });
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// bot.on("message:file", async (ctx) => {
//   ctx.reply("got file!");
//   console.log('type check');
//   console.log(ctx.message.document);
//   if (!ctx.message.document) {
//     ctx.reply("file format must be .pdf / .doc");
//   }
// });
bot.on("message:document", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var file_1, token, fileTos3, path, buffer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ctx.reply("תודה שבחרת ג'וב בוט!");
                console.log(ctx.message);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, ctx.getFile()];
            case 2:
                file_1 = _a.sent();
                token = '5766441174:AAFQjtij0J0ij-aAaq0S5dw-vX3q-1CXjzk';
                console.log("file data!");
                console.log(file_1.file_id);
                console.log(file_1.file_path);
                console.log("file locaiotn!");
                fileTos3 = "https://api.telegram.org/file/bot".concat(token, "/").concat(file_1.file_path);
                console.log(fileTos3);
                return [4 /*yield*/, file_1.download()];
            case 3:
                path = _a.sent();
                console.log('path');
                console.log(path);
                buffer = fs.readFileSync(path);
                ctx.session.companys.forEach(function (company) { return __awaiter(void 0, void 0, void 0, function () {
                    var fileType;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!!ctx.session.applyedCompanys.includes(company)) return [3 /*break*/, 2];
                                return [4 /*yield*/, s3.putObject({ Bucket: Bucket, Key: "".concat(company, "/").concat((_a = ctx.message.document) === null || _a === void 0 ? void 0 : _a.file_name), ACL: 'public-read', Body: buffer }).promise()];
                            case 1:
                                _c.sent();
                                ctx.session.applyedCompanys.push(company);
                                fileType = (_b = file_1.file_path) === null || _b === void 0 ? void 0 : _b.split('.')[1];
                                console.log("file type: ".concat(fileType));
                                _c.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                ctx.reply("error ".concat(error_1));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
bot.on("message", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('ctx.message');
        console.log(ctx.message);
        return [2 /*return*/];
    });
}); });
exports.roboJobot = (0, grammy_1.webhookCallback)(bot, "aws-lambda");
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
