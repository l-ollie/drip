class SvgElements {
	make(svgType) {
		return document.createElementNS('http://www.w3.org/2000/svg', svgType);
	}

	setAttr(attributes, pathElement, itemWidth, itemHeight) {
		const _dripLow = '1 0 0';
		const _dripHigh = '0 0 1';

		const _halfWidth = Math.ceil(itemWidth / 2);
		const _singlePath = `M ${currentXPos} 0 v ${itemHeight} a ${halfWidth} ${halfWidth} ${arc} ${width} 0 v -${height} Z`;

		for (let y = 0; y < attributes.length; y++) {
			_svg.setAttributeNS(null, attributes[y][0], attributes[y][1]);
		}
		if (_svg.tagName.toLowerCase() === 'path') {
			_svg.setAttributeNS(null, 'd', `${_singlePath}`);
			return _svg;
		} else if (_svg.tagName.toLowerCase() === 'animate') {
			const _copiedPath = getPathFromSvg(pathElement.getAttributeNS(null, 'd'));
			_svg.setAttributeNS(null, 'values', `${_copiedPath} ; ${_copiedPath}`);
			return _svg;
		}
	}
}
