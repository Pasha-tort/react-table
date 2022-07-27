import { AppService } from "./app.service";
import { TypeBord } from 'dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    setCardsAfterDND(data: TypeBord.setCardsAfterDND.Request): TypeBord.setCardsAfterDND.Response;
    setCellsAfterDND(data: TypeBord.setCellsAfterDND.Request): TypeBord.setCellsAfterDND.Response;
    addCard(data: TypeBord.addCard.Request): TypeBord.addCard.Response;
    addCell(data: TypeBord.addCell.Request): TypeBord.addCell.Response;
    setOneCell(data: TypeBord.setOneCell.Request): TypeBord.setOneCell.Response;
    setOneCard(data: TypeBord.setOneCard.Request): TypeBord.setOneCard.Response;
    getAllData(): TypeBord.getAllData.Response;
}
