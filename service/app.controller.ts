import { Controller, Get, Post } from '@nestjs/common';
import {AppService} from "./app.service";

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
	) {}

	@Post()
	setCardsAfterDND() {
		this.appService
	}

	@Post()
	setCellsAfterDND() {
		
	}

	@Post()
	setOneCell() {

	}

	@Post()
	setOneCard() {

	}

	@Get()
	getAllData() {

	}
}