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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const config_1 = __importDefault(require("./database/config"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.config({ path: path_1.resolve(__dirname, '..', '.env') });
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.middleware();
        this.routes();
        this.connectDB();
    }
    connectDB() {
        new config_1.default();
    }
    middleware() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(cors_1.default());
    }
    routes() {
        this.app = routing_controllers_1.createExpressServer({
            routePrefix: 'api',
            controllers: [__dirname + '/controllers/*.ts']
        });
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.port || process.env.PORT || 3000);
            console.log('Server on port : ', this.port);
        });
    }
}
exports.App = App;
