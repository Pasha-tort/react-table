import { Injectable } from '@nestjs/common';
import { TypeBord } from 'dto';
import { 
	changeDataCard,
	changeDataCell,
	addCard,
	addCell, 
	setOneCard,
	setOneCell,
	getAllData,
} from 'data';

@Injectable()
export class AppService {
	constructor() {}

	setCardsAfterDND(
		{
			srcCellId,
			srcElId,
			finalCellId,
			numberCardDrop,
			postionDrop,
		}: TypeBord.setCardsAfterDND.Request
	): TypeBord.setCardsAfterDND.Response {
		const items = changeDataCard(
			srcCellId,
			srcElId,
			finalCellId,
			numberCardDrop,
			postionDrop
		)
		return {items};
	}

	setCellsAfterDND(
		{
			srcCellId,
			numberCellDrop,
			positionDrop,
		}: TypeBord.setCellsAfterDND.Request
	): TypeBord.setCellsAfterDND.Response {
		const items = changeDataCell(
			srcCellId,
			numberCellDrop,
			positionDrop,
		)
		return {items};
	}

	addCard(
		{
			dataCard,
			numberCell,
		}: TypeBord.addCard.Request
	): TypeBord.addCard.Response {
		const items = addCard(dataCard, numberCell);
		return {items};
	}

	addCell(
		{
			dataCell,
		}: TypeBord.addCell.Request
	): TypeBord.addCell.Response {
		const items = addCell(dataCell);
		return {items};
	}

	setOneCard(
		{
			dataCard,
			id,
		}: TypeBord.setOneCard.Request
	): TypeBord.setOneCard.Response {
		const items = setOneCard(dataCard, id);
		return {items};
	}

	setOneCell(
		{
			dataCell,
			id,
		}: TypeBord.setOneCell.Request
	): TypeBord.setOneCell.Response {
		const items = setOneCell(dataCell, id);
		return {items};
	}

	getAllData(): TypeBord.getAllData.Response {
		const items = getAllData();
		return {items};
	}
}