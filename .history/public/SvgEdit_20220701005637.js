class SvgEdit {
	constructor() {}

	make(svgType) {
		return document.createElementNS('http://www.w3.org/2000/svg', svgType);
	}

	setAttr(attributes, svgObject, copyPathFromElement, itemWidth, itemHeight, isLowDroplet) {
		const _dripLow = '1 0 0';
		const _dripHigh = '0 0 1';

		const _halfWidth = Math.ceil(itemWidth / 2);
		const _singlePath = `M ${currentXPos} 0 v ${itemHeight} a ${_halfWidth} ${_halfWidth} ${isLowDroplet
			? _dripLow
			: _dripHigh} ${width} 0 v -${height} Z`;

		for (let y = 0; y < attributes.length; y++) {
			svgObject.setAttributeNS(null, attributes[y][0], attributes[y][1]);
		}
		if (svgObject.tagName.toLowerCase() === 'path') {
			svgObject.setAttributeNS(null, 'd', `${_singlePath}`);
			return svgObject;
		} else if (svgObject.tagName.toLowerCase() === 'animate') {
			const _copiedPath = getPathFromSvg(pathElement.getAttributeNS(null, 'd'));
			svgObject.setAttributeNS(null, 'values', `${_copiedPath} ; ${_copiedPath}`);
			return svgObject;
		}
	}

	msg(text) {
		return text;
	}
}

export default SvgEdit;
