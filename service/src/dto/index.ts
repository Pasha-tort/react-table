import {Exclude, Expose, Type} from "class-transformer";
import {ValidateNested} from "class-validator";

export namespace TypeBord {
	export type PositionDrop = "before" | "after" | "noDrag";

	@Exclude()
	export class Bord {
		@Expose()
		@Type(() => Cell)
		@ValidateNested()
		items: Cell[];
	}
	@Exclude()
	export class Card {
		@Expose()
		id: string;

		@Expose()
		title: string;

		@Expose()
		desc: string;
	}
	@Exclude()
	export class Cell {
		@Expose()
		id: string;

		@Expose()
		title: string;

		@Expose()
		@Type(() => Card)
		@ValidateNested()
		list: Card[];
	}

	export namespace setCardsAfterDND {
		@Exclude()
		export class Request {
			@Expose()
			srcCellId: string;
			@Expose()
			srcElId: string;
			@Expose()
			finalCellId: string;
			@Expose()
			numberCardDrop: number;
			@Expose()
			positionDrop: "after" | "before";
		}
		
		export class Response extends Bord {}
	}

	export namespace setCellsAfterDND {
		@Exclude()
		export class Request {
			@Expose()
			srcCellId: string;
			@Expose()
			numberCellDrop: number;
			@Expose()
			positionDrop: Omit<PositionDrop, "noDrag">
		}
		export class Response extends Bord {}
	}

	export namespace addCard {
		@Exclude()
		export class Request {
			@Expose()
			dataCard: Card;
			numberCell: number;
		}
		export class Response extends Bord {};
	}

	export namespace addCell {
		@Exclude()
		export class Request {
			@Expose()
			dataCell: Cell;
		}
		export class Response extends Bord {};
	}

	export namespace setOneCard {
		@Exclude()
		export class Request {
			@Expose()
			dataCard: Card;
		} 
		export class Response extends Bord {};
	}

	export namespace setOneCell {
		@Exclude()
		export class Request {
			@Expose()
			dataCell: Cell;
			@Expose()
			id: string;
		}
		export class Response extends Bord {};

	}

	export namespace getAllData {
		export class Response extends Bord {};
	}
}