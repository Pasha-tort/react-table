import { TypeBord } from './dto';
export declare class AppService {
    constructor();
    setCardsAfterDND({ srcCellId, srcElId, finalCellId, numberCardDrop, postionDrop, }: TypeBord.setCardsAfterDND.Request): TypeBord.setCardsAfterDND.Response;
    setCellsAfterDND({ srcCellId, numberCellDrop, positionDrop, }: TypeBord.setCellsAfterDND.Request): TypeBord.setCellsAfterDND.Response;
    addCard({ dataCard, numberCell, }: TypeBord.addCard.Request): TypeBord.addCard.Response;
    addCell({ dataCell, }: TypeBord.addCell.Request): TypeBord.addCell.Response;
    setOneCard({ dataCard, id, }: TypeBord.setOneCard.Request): TypeBord.setOneCard.Response;
    setOneCell({ dataCell, id, }: TypeBord.setOneCell.Request): TypeBord.setOneCell.Response;
    getAllData(): TypeBord.getAllData.Response;
}
