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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const typeorm_config_1 = __importDefault(require("./typeorm.config"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./middleware/auth");
dotenv_1.default.config();
const boot = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield typeorm_config_1.default.initialize();
        const server = new apollo_server_1.ApolloServer({
            schema: schema_1.schema,
            // context: ({ req }): Context => ({
            //   conn,
            //   req,
            // }),
            context: ({ req }) => {
                var _a;
                const token = req && ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)
                    ? (0, auth_1.auth)(req.headers.authorization)
                    : null;
                return { conn, userId: token === null || token === void 0 ? void 0 : token.userId };
            },
        });
        server.listen(5000).then(({ url }) => {
            console.log("server running at " + url);
        });
    }
    catch (err) {
        console.log(err);
    }
});
boot();
