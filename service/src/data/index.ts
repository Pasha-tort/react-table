import { TypeBord } from '../dto';

export let data = [
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

export function changeDataCard(
	srcCellId: string, 
	srcElId: string, 
	finalCellId: string,
	numberCardDrop: number,
	positionDrop: Omit<TypeBord.PositionDrop, 'noDrag'>,
) {
	const indexSrcCell = data.findIndex(item => item.id === srcCellId);
	const indexSrcCard = data[indexSrcCell].list.findIndex(item => item.id === srcElId);
	const indexFinallCell = data.findIndex(item => item.id === finalCellId);

	const srcEl = data[indexSrcCell].list[indexSrcCard];
	data[indexSrcCell] = {
		...data[indexSrcCell],
		list: data[indexSrcCell].list.filter(item => {
			return item.id !== srcEl.id
		}),
	}

	data[indexFinallCell] = {
		...data[indexFinallCell],
		list: indexFinallCell === indexSrcCell ?
		[
			...data[indexFinallCell].list.slice(0, numberCardDrop - 1), 
			srcEl, 
			...data[indexFinallCell].list.slice(numberCardDrop - 1),
		] :
		[
			...data[indexFinallCell].list.slice(0, numberCardDrop), 
			srcEl, 
			...data[indexFinallCell].list.slice(numberCardDrop),
		],
			
	}
	return data;
};

export function changeDataCell(
	srcCellId: string,
	numberCellDrop: number,
	positionDrop: Omit<TypeBord.PositionDrop, 'noDrag'>,
) {
	const indexSrcCell = data.findIndex(cell => cell.id === srcCellId);
	const srcEll = data[indexSrcCell];

	data = data.filter(cell => cell.id !== srcEll.id);

	data = positionDrop === "before" ?
		[
			...data.slice(0, numberCellDrop - 1),
			srcEll,
			...data.slice(numberCellDrop - 1),
		] :
		[
			...data.slice(0, numberCellDrop),
			srcEll,
			...data.slice(numberCellDrop),
		];
	return data;
}

export function addCard(dataCard: TypeBord.Card, numberCell: number) {
	data[numberCell].list.push(dataCard);
	return data;
}
export function addCell(dataCell: TypeBord.Cell) {
	data.push(dataCell);
	return data;
}

export function setOneCard(dataCard: TypeBord.Card) {
	for (const cell of data) {
		let result: boolean = false;
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
	return data;
}
export function setOneCell(dataCell: TypeBord.Cell, id: string) {
	for (const cell of data) {
		if (cell.id === id) {
			cell.title = dataCell.title;
			break;
		}
	}
	return data;
}

export function getAllData() {
	return data;
}
