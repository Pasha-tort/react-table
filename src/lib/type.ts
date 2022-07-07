export const searchParent = (
	node: HTMLElement, 
	searchParentEl: HTMLElement
): HTMLElement | Function => {
	if (node === searchParentEl) return node;
	else return searchParent(node.parentElement!, searchParentEl);
}