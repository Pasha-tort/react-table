import { TypeBord } from '../dto';
export declare let data: {
    id: string;
    title: string;
    list: {
        id: string;
        title: string;
        desc: string;
    }[];
}[];
export declare function changeDataCard(srcCellId: string, srcElId: string, finalCellId: string, numberCardDrop: number, positionDrop: Omit<TypeBord.PositionDrop, 'noDrag'>): {
    id: string;
    title: string;
    list: {
        id: string;
        title: string;
        desc: string;
    }[];
}[];
export declare function changeDataCell(srcCellId: string, numberCellDrop: number, positionDrop: Omit<TypeBord.PositionDrop, 'noDrag'>): {
    id: string;
    title: string;
    list: {
        id: string;
        title: string;
        desc: string;
    }[];
}[];
export declare function addCard(dataCard: TypeBord.Card, numberCell: number): {
    id: string;
    title: string;
    list: {
        id: string;
        title: string;
        desc: string;
    }[];
}[];
export declare function addCell(dataCell: TypeBord.Cell): {
    id: string;
    title: string;
    list: {
        id: string;
        title: string;
        desc: string;
    }[];
}[];
export declare function setOneCard(dataCard: TypeBord.Card, id: string): {
    id: string;
    title: string;
    list: {
        id: string;
        title: string;
        desc: string;
    }[];
}[];
export declare function setOneCell(dataCell: TypeBord.Cell, id: string): {
    id: string;
    title: string;
    list: {
        id: string;
        title: string;
        desc: string;
    }[];
}[];
export declare function getAllData(): {
    id: string;
    title: string;
    list: {
        id: string;
        title: string;
        desc: string;
    }[];
}[];
