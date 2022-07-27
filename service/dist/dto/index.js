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
exports.TypeBord = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var TypeBord;
(function (TypeBord) {
    let Bord = class Bord {
    };
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(() => Cell),
        (0, class_validator_1.ValidateNested)(),
        __metadata("design:type", Array)
    ], Bord.prototype, "items", void 0);
    Bord = __decorate([
        (0, class_transformer_1.Exclude)()
    ], Bord);
    TypeBord.Bord = Bord;
    let Card = class Card {
    };
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], Card.prototype, "id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], Card.prototype, "title", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], Card.prototype, "desc", void 0);
    Card = __decorate([
        (0, class_transformer_1.Exclude)()
    ], Card);
    TypeBord.Card = Card;
    let Cell = class Cell {
    };
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], Cell.prototype, "id", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        __metadata("design:type", String)
    ], Cell.prototype, "title", void 0);
    __decorate([
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Type)(() => Card),
        (0, class_validator_1.ValidateNested)(),
        __metadata("design:type", Array)
    ], Cell.prototype, "list", void 0);
    Cell = __decorate([
        (0, class_transformer_1.Exclude)()
    ], Cell);
    TypeBord.Cell = Cell;
    let setCardsAfterDND;
    (function (setCardsAfterDND) {
        let Request = class Request {
        };
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", String)
        ], Request.prototype, "srcCellId", void 0);
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", String)
        ], Request.prototype, "srcElId", void 0);
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", String)
        ], Request.prototype, "finalCellId", void 0);
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", Number)
        ], Request.prototype, "numberCardDrop", void 0);
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", Object)
        ], Request.prototype, "postionDrop", void 0);
        Request = __decorate([
            (0, class_transformer_1.Exclude)()
        ], Request);
        setCardsAfterDND.Request = Request;
        class Response extends Bord {
        }
        setCardsAfterDND.Response = Response;
    })(setCardsAfterDND = TypeBord.setCardsAfterDND || (TypeBord.setCardsAfterDND = {}));
    let setCellsAfterDND;
    (function (setCellsAfterDND) {
        let Request = class Request {
        };
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", String)
        ], Request.prototype, "srcCellId", void 0);
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", Number)
        ], Request.prototype, "numberCellDrop", void 0);
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", Object)
        ], Request.prototype, "positionDrop", void 0);
        Request = __decorate([
            (0, class_transformer_1.Exclude)()
        ], Request);
        setCellsAfterDND.Request = Request;
        class Response extends Bord {
        }
        setCellsAfterDND.Response = Response;
    })(setCellsAfterDND = TypeBord.setCellsAfterDND || (TypeBord.setCellsAfterDND = {}));
    let addCard;
    (function (addCard) {
        let Request = class Request {
        };
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", Card)
        ], Request.prototype, "dataCard", void 0);
        Request = __decorate([
            (0, class_transformer_1.Exclude)()
        ], Request);
        addCard.Request = Request;
        class Response extends Bord {
        }
        addCard.Response = Response;
        ;
    })(addCard = TypeBord.addCard || (TypeBord.addCard = {}));
    let addCell;
    (function (addCell) {
        let Request = class Request {
        };
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", Cell)
        ], Request.prototype, "dataCell", void 0);
        Request = __decorate([
            (0, class_transformer_1.Exclude)()
        ], Request);
        addCell.Request = Request;
        class Response extends Bord {
        }
        addCell.Response = Response;
        ;
    })(addCell = TypeBord.addCell || (TypeBord.addCell = {}));
    let setOneCard;
    (function (setOneCard) {
        let Request = class Request {
        };
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", Card)
        ], Request.prototype, "dataCard", void 0);
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", String)
        ], Request.prototype, "id", void 0);
        Request = __decorate([
            (0, class_transformer_1.Exclude)()
        ], Request);
        setOneCard.Request = Request;
        class Response extends Bord {
        }
        setOneCard.Response = Response;
        ;
    })(setOneCard = TypeBord.setOneCard || (TypeBord.setOneCard = {}));
    let setOneCell;
    (function (setOneCell) {
        let Request = class Request {
        };
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", Cell)
        ], Request.prototype, "dataCell", void 0);
        __decorate([
            (0, class_transformer_1.Expose)(),
            __metadata("design:type", String)
        ], Request.prototype, "id", void 0);
        Request = __decorate([
            (0, class_transformer_1.Exclude)()
        ], Request);
        setOneCell.Request = Request;
        class Response extends Bord {
        }
        setOneCell.Response = Response;
        ;
    })(setOneCell = TypeBord.setOneCell || (TypeBord.setOneCell = {}));
    let getAllData;
    (function (getAllData) {
        class Response extends Bord {
        }
        getAllData.Response = Response;
        ;
    })(getAllData = TypeBord.getAllData || (TypeBord.getAllData = {}));
})(TypeBord = exports.TypeBord || (exports.TypeBord = {}));
//# sourceMappingURL=index.js.map