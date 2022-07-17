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

	export namespace setAfterDND {
		@Exclude()
		export class Request {

		}
		@Exclude()
		export class Response {

		}
	}

	export namespace setOneCard {
		@Exclude()
		export class Request {

		} 
		@Exclude()
		export class Response {
			
		}
	}

	export namespace setOneCell {
		@Exclude()
		export class Request {

		}
		@Exclude()
		export class Response {

		}
	}

	export namespace getAllData {
		@Exclude()
		export class Request {

		}
		@Exclude()
		export class Response {

		}
	}
}