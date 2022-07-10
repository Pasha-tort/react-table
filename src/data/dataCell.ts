import { PositionDrop } from '../redux/types/typeCard';

export let data = [
	{
		id: 1,
		title: "Нужно сделать",
		list: [
			{
				id: 1,
				title: 'First card',
				desc: 'First card desc',
			},
			{
				id: 5,
				title: 'Five card',
				desc: 'Five card desc',
			},
		],
	},
	{
		id: 2,
		title: "В работе",
		list: [
			{
				id: 2,
				title: 'Second card',
				desc: 'Second card desc',
			},
			{
				id: 6,
				title: 'Six card',
				desc: 'Six card desc',
			},
		],
	},
	{
		id: 3,
		title: "В тестировании",
		list: [
			{
				id: 3,
				title: 'Third card',
				desc: 'Third crad desc',
			},
			{
				id: 7,
				title: 'Seven card',
				desc: 'Seven card desc',
			},
		],
	},
	{ 
		id: 4,
		title: "Выполнено",
		list: [
			{
				id: 4,
				title: 'Fourth card',
				desc: 'Fourth crad desc',
			},
			{
				id: 8,
				title: 'Eight card',
				desc: 'Eight card desc',
			},
		],
	},
];

export function changeDataCard(
	srcCellId: number, 
	srcElId: number, 
	finalCellId: number,
	numberCardDrop: number,
	positionDrop: Omit<PositionDrop, 'noDrag'>,
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
		list: positionDrop === 'before' ? 
			[
				...data[indexFinallCell].list.slice(0, numberCardDrop), 
				srcEl, 
				...data[indexFinallCell].list.slice(numberCardDrop),
			] :
			[
				...data[indexFinallCell].list.slice(0, numberCardDrop+1), 
				srcEl, 
				...data[indexFinallCell].list.slice(numberCardDrop+1),
			]
	}
	return data;
};

export function changeDataCell(
	srcCellId: number,
	numberCellDrop: number,
	positionDrop: Omit<PositionDrop, 'noDrag'>,
) {

}

export type TypeCard = {
	id: number;
	title: string,
	desc: string,
}
export type TypeCell = {
	id: number;
	title: string,
	list: TypeCard[],
}

export type TypeBordList = TypeCell[];
