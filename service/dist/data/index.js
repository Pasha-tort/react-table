"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllData = exports.setOneCell = exports.setOneCard = exports.addCell = exports.addCard = exports.changeDataCell = exports.changeDataCard = exports.data = void 0;
exports.data = [
    {
        id: '1',
        title: "Нужно сделать",
        list: [
            {
                id: '1',
                title: 'First card',
                desc: 'First card desc',
            },
            {
                id: '5',
                title: 'Five card',
                desc: 'Five card desc',
            },
        ],
    },
    {
        id: '2',
        title: "В работе",
        list: [
            {
                id: '2',
                title: 'Second card',
                desc: 'Second card desc',
            },
            {
                id: '6',
                title: 'Six card',
                desc: 'Six card desc',
            },
        ],
    },
    {
        id: '3',
        title: "В тестировании",
        list: [
            {
                id: '3',
                title: 'Third card',
                desc: 'Third crad desc',
            },
            {
                id: '7',
                title: 'Seven card',
                desc: 'Seven card desc',
            },
        ],
    },
    {
        id: '4',
        title: "Выполнено",
        list: [
            {
                id: '4',
                title: 'Fourth card',
                desc: 'Fourth crad desc',
            },
            {
                id: '8',
                title: 'Eight card',
                desc: 'Eight card desc',
            },
        ],
    },
];
function changeDataCard(srcCellId, srcElId, finalCellId, numberCardDrop, positionDrop) {
    const indexSrcCell = exports.data.findIndex(item => item.id === srcCellId);
    const indexSrcCard = exports.data[indexSrcCell].list.findIndex(item => item.id === srcElId);
    const indexFinallCell = exports.data.findIndex(item => item.id === finalCellId);
    const srcEl = exports.data[indexSrcCell].list[indexSrcCard];
    exports.data[indexSrcCell] = Object.assign(Object.assign({}, exports.data[indexSrcCell]), { list: exports.data[indexSrcCell].list.filter(item => {
            return item.id !== srcEl.id;
        }) });
    exports.data[indexFinallCell] = Object.assign(Object.assign({}, exports.data[indexFinallCell]), { list: indexFinallCell === indexSrcCell ?
            [
                ...exports.data[indexFinallCell].list.slice(0, numberCardDrop - 1),
                srcEl,
                ...exports.data[indexFinallCell].list.slice(numberCardDrop - 1),
            ] :
            [
                ...exports.data[indexFinallCell].list.slice(0, numberCardDrop),
                srcEl,
                ...exports.data[indexFinallCell].list.slice(numberCardDrop),
            ] });
    return exports.data;
}
exports.changeDataCard = changeDataCard;
;
function changeDataCell(srcCellId, numberCellDrop, positionDrop) {
    const indexSrcCell = exports.data.findIndex(cell => cell.id === srcCellId);
    const srcEll = exports.data[indexSrcCell];
    exports.data = exports.data.filter(cell => cell.id !== srcEll.id);
    exports.data = positionDrop === "before" ?
        [
            ...exports.data.slice(0, numberCellDrop - 1),
            srcEll,
            ...exports.data.slice(numberCellDrop - 1),
        ] :
        [
            ...exports.data.slice(0, numberCellDrop),
            srcEll,
            ...exports.data.slice(numberCellDrop),
        ];
    return exports.data;
}
exports.changeDataCell = changeDataCell;
function addCard(dataCard, numberCell) {
    exports.data[numberCell].list.push(dataCard);
    return exports.data;
}
exports.addCard = addCard;
function addCell(dataCell) {
    exports.data.push(dataCell);
    return exports.data;
}
exports.addCell = addCell;
function setOneCard(dataCard) {
    for (const cell of exports.data) {
        let result = false;
        for (const card of cell.list) {
            if (card.id === dataCard.id) {
                card.title = dataCard.title;
                card.desc = dataCard.desc;
                result = true;
            }
        }
        if (result)
            break;
    }
    return exports.data;
}
exports.setOneCard = setOneCard;
function setOneCell(dataCell, id) {
    for (const cell of exports.data) {
        if (cell.id === id) {
            cell.title = dataCell.title;
            break;
        }
    }
    return exports.data;
}
exports.setOneCell = setOneCell;
function getAllData() {
    return exports.data;
}
exports.getAllData = getAllData;
//# sourceMappingURL=index.js.map