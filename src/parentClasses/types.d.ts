import Block from "./Block/BLock";

// ----------------Types----------------//

export type PropsType = Record<string, any>;
export type ChildrenType = Record<string, Block>;
export type ListType = Record<string, Block[]>;
export type TBlock = {
	id?: string;
	events?: {
		[key: string]: (event: Event) => void; // Уточняем тип события
	};
	attr?: {
		[key: string]: string;
	};
	lists?: Block[];
	[key: string]: unknown;
};
// ----------------Interfaces----------------//
type a = {
	id?: string;
	events?: {
		[key: string | unknown]: (event: Event) => void;
	};
	attr?: {
		[key: string]: string;
	};
	lists?: Block[];
	[key: string]: unknown;
};