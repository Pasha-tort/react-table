export function isHTMLElemnt(v: unknown): v is HTMLElement {
	console.log(v)
	return true
	// return Boolean((v as HTMLElement).style);
}