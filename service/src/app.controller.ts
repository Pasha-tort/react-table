import { Controller, Get, Post } from '@nestjs/common';
import {AppService} from "./app.service";
import { TypeBord } from './dto';

@Controller("api")
export class AppController {
	constructor(
		private readonly appService: AppService,
	) {}

	@Post("setCardsAfterDND")
	setCardsAfterDND(
		data: TypeBord.setCardsAfterDND.Request
	): TypeBord.setCardsAfterDND.Response {
		return this.appService.setCardsAfterDND(data)
	}

	@Post("setCellsAfterDND")
	setCellsAfterDND(
		data: TypeBord.setCellsAfterDND.Request
	): TypeBord.setCellsAfterDND.Response {
		return this.appService.setCellsAfterDND(data)
	}

	@Post("addCard")
	addCard(
		data: TypeBord.addCard.Request
	): TypeBord.addCard.Response {
		return this.appService.addCard(data);
	}

	@Post("addCell")
	addCell(
		data: TypeBord.addCell.Request
	): TypeBord.addCell.Response {
		return this.appService.addCell(data);
	}

	@Post("setOneCell")
	setOneCell(
		data: TypeBord.setOneCell.Request
	): TypeBord.setOneCell.Response {
		return this.appService.setOneCell(data);
	}

	@Post("setOneCard")
	setOneCard(
		data: TypeBord.setOneCard.Request
	): TypeBord.setOneCard.Response {
		return this.appService.setOneCard(data)
	}

	@Get("getAllData")
	getAllData(): TypeBord.getAllData.Response {
		return this.appService.getAllData();
	}
}