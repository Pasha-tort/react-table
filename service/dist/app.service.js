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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const data_1 = require("./data");
let AppService = class AppService {
    constructor() { }
    setCardsAfterDND({ srcCellId, srcElId, finalCellId, numberCardDrop, postionDrop, }) {
        const items = (0, data_1.changeDataCard)(srcCellId, srcElId, finalCellId, numberCardDrop, postionDrop);
        return { items };
    }
    setCellsAfterDND({ srcCellId, numberCellDrop, positionDrop, }) {
        const items = (0, data_1.changeDataCell)(srcCellId, numberCellDrop, positionDrop);
        return { items };
    }
    addCard({ dataCard, numberCell, }) {
        const items = (0, data_1.addCard)(dataCard, numberCell);
        return { items };
    }
    addCell({ dataCell, }) {
        const items = (0, data_1.addCell)(dataCell);
        return { items };
    }
    setOneCard({ dataCard, id, }) {
        const items = (0, data_1.setOneCard)(dataCard, id);
        return { items };
    }
    setOneCell({ dataCell, id, }) {
        const items = (0, data_1.setOneCell)(dataCell, id);
        return { items };
    }
    getAllData() {
        const items = (0, data_1.getAllData)();
        return { items };
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map