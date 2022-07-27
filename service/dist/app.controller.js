"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const dto_1 = require("./dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    setCardsAfterDND(data) {
        return this.appService.setCardsAfterDND(data);
    }
    setCellsAfterDND(data) {
        return this.appService.setCellsAfterDND(data);
    }
    addCard(data) {
        return this.appService.addCard(data);
    }
    addCell(data) {
        return this.appService.addCell(data);
    }
    setOneCell(data) {
        return this.appService.setOneCell(data);
    }
    setOneCard(data) {
        return this.appService.setOneCard(data);
    }
    getAllData() {
        return this.appService.getAllData();
    }
};
__decorate([
    (0, common_1.Post)("setCardsAfterDND"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TypeBord.setCardsAfterDND.Request]),
    __metadata("design:returntype", dto_1.TypeBord.setCardsAfterDND.Response)
], AppController.prototype, "setCardsAfterDND", null);
__decorate([
    (0, common_1.Post)("setCellsAfterDND"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TypeBord.setCellsAfterDND.Request]),
    __metadata("design:returntype", dto_1.TypeBord.setCellsAfterDND.Response)
], AppController.prototype, "setCellsAfterDND", null);
__decorate([
    (0, common_1.Post)("addCard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TypeBord.addCard.Request]),
    __metadata("design:returntype", dto_1.TypeBord.addCard.Response)
], AppController.prototype, "addCard", null);
__decorate([
    (0, common_1.Post)("addCell"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TypeBord.addCell.Request]),
    __metadata("design:returntype", dto_1.TypeBord.addCell.Response)
], AppController.prototype, "addCell", null);
__decorate([
    (0, common_1.Post)("setOneCell"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TypeBord.setOneCell.Request]),
    __metadata("design:returntype", dto_1.TypeBord.setOneCell.Response)
], AppController.prototype, "setOneCell", null);
__decorate([
    (0, common_1.Post)("setOneCard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TypeBord.setOneCard.Request]),
    __metadata("design:returntype", dto_1.TypeBord.setOneCard.Response)
], AppController.prototype, "setOneCard", null);
__decorate([
    (0, common_1.Get)("getAllData"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", dto_1.TypeBord.getAllData.Response)
], AppController.prototype, "getAllData", null);
AppController = __decorate([
    (0, common_1.Controller)("api"),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map