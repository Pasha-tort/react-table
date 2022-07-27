export declare namespace TypeBord {
    type PositionDrop = "before" | "after" | "noDrag";
    class Bord {
        items: Cell[];
    }
    class Card {
        id: string;
        title: string;
        desc: string;
    }
    class Cell {
        id: string;
        title: string;
        list: Card[];
    }
    namespace setCardsAfterDND {
        class Request {
            srcCellId: string;
            srcElId: string;
            finalCellId: string;
            numberCardDrop: number;
            postionDrop: Omit<PositionDrop, "onDrag">;
        }
        class Response extends Bord {
        }
    }
    namespace setCellsAfterDND {
        class Request {
            srcCellId: string;
            numberCellDrop: number;
            positionDrop: Omit<PositionDrop, "noDrag">;
        }
        class Response extends Bord {
        }
    }
    namespace addCard {
        class Request {
            dataCard: Card;
            numberCell: number;
        }
        class Response extends Bord {
        }
    }
    namespace addCell {
        class Request {
            dataCell: Cell;
        }
        class Response extends Bord {
        }
    }
    namespace setOneCard {
        class Request {
            dataCard: Card;
            id: string;
        }
        class Response extends Bord {
        }
    }
    namespace setOneCell {
        class Request {
            dataCell: Cell;
            id: string;
        }
        class Response extends Bord {
        }
    }
    namespace getAllData {
        class Response extends Bord {
        }
    }
}
