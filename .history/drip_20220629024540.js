// svg.appendChild(r);

function lowDrip(width, height, i) {
	const dripLow = '1 0 0';
	const dripHigh = '0 0 1';
	let isLow;
	let arc;
	const idNames = [ 'drip', 'curve' ];
	let idName;
	const random = Math.random() * 50;

	if (i % 2 !== 0) {
		console.log('drip true');
		isLow = true;
		arc = dripLow;
		height = height + random;
	} else {
		console.log('drip false');
		isLow = false;
		arc = dripHigh;
		height = height - random;
	}

	function setAttributeNSForSvg(createElement, attributes, isPath) {
		let _svg = document.createElementNS('http://www.w3.org/2000/svg', createElement);

		for (let y = 0; y < attributes.length; y++) {
			_svg.setAttributeNS(null, attributes[y][0], attributes[y][1]);
		}
		if (isPath) {
			const _singlePath = `M ${i * width} 0 v ${height} a ${width / 2} ${width /
				2} ${arc} ${width} 0 v -${height} Z`;

			_svg.setAttributeNS(null, 'd', `${_singlePath}`);
			return _svg;
		} else {
			return _svg;
		}
	}

	const attributesDripPath = [ [ 'id', `${isLow ? idNames[0] : idNames[1]}${i}` ], [ 'fill', 'red' ] ];
	let _path = setAttributeNSForSvg('path', attributesDripPath, true);
	if (isLow) console.log('adding cursur to ' + `${_path.getAttributeNS(null, 'id')}`);

	if (isLow === false) {
		console.log('stoppkng');
		return _path;
	} else {
		_path.setAttributeNS(null, 'class', 'point-cursor');
		const attributesDripAnim = [
			[ 'id', `dripAnim${i}` ],
			[ 'attributeName', 'd' ],
			[ 'dur', '0.5' ],
			[ 'type', 'translate' ],
			[ 'begin', 'indefinite; ' ],
			[ 'repeatCount', '1' ],
			[ 'calcMode', 'spline' ],
			[ 'keySplines', '.21,.3,.01,.98' ]
		];
		let _anim = setAttributeNSForSvg('animate', attributesDripAnim, false);
		_path.appendChild(_anim);

		return _path;
	}
}

function makeSVG() {
	const amount = 15;
	const width = 50;
	const height = 200;

	const svgWidth = window.innerWidth / amount;
	console.log(svgWidth);
	let svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svgElement.setAttributeNS(null, 'width', '100%');
	svgElement.setAttributeNS(null, 'height', '100%');

	for (let i = 0; i < amount; i++) {
		svgElement.appendChild(lowDrip(svgWidth, height, i));
	}
	document.getElementById('container').appendChild(svgElement);
}

makeSVG();
window.onresize = makeSVG;

container.onmousedown = function(e) {
	const dripIDRegex = /drip/;
	let el = e.target.correspondingUseElement ? e.target.correspondingUseElement : e.target;
	const elementId = el.getAttributeNS(null, 'id');
	const dripName = dripIDRegex.exec(elementId);
	console.log(dripIDRegex.exec(elementId));
	if (dripName === null) {
		return;
	}
	document.addEventListener('mousemove', onMouseMove);
	const dripNum = /[0-9]+/.exec(elementId);
	const clickBeginYPos = e.pageY;
	let dragLength = 0;
	let pathD = el.getAttribute('d');

	function onMouseMove(e) {
		dragLength = e.pageY - clickBeginYPos;
		el.setAttributeNS(null, 'd', addLength(pathD, dragLength));
	}

	function addLength(oldLength, dragLength) {
		const regex = /v+ +[0-9]+|v+ +-+[0-9]+/g;
		const drippingPoints = oldLength.match(regex);
		const drippingLength = Number(/[0-9]+/.exec(drippingPoints[0]));
		let newDrippingPoints = oldLength.replace(drippingPoints[0], `v ${drippingLength + dragLength}`);
		newDrippingPoints = newDrippingPoints.replace(drippingPoints[1], `v -${drippingLength + dragLength}`);
		return newDrippingPoints;
	}

	onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		container.onmouseup = null;
		changeAnimation();
	};
	function changeAnimation() {
		if (dragLength === 0) {
			return;
		}
		const animId = Number(/[0-9]+/.exec(elementId));
		console.log(`dripAnim${animId}`);
		const regex = /M+ +[0-9]+ +[0-9]+ +v+ +[0-9]+ +a+ +[0-9]+ +[0-9]+ +[0-9]+ +[0-9]+ +[0-9]+ +[0-9]+ +[0-9]+ +v+ +-+[0-9]+ +Z/g;
		let svgAnimation = document.getElementById(`dripAnim${animId}`);
		const valuesProp = svgAnimation.getAttributeNS(null, 'values');
		const values = valuesProp.match(regex);
		const changedValue = valuesProp.replace(values[0], addLength(values[1], dragLength));
		svgAnimation.setAttributeNS(null, 'values', changedValue);
		svgAnimation.beginElement();
		el.setAttributeNS(null, 'd', pathD);
		dragLength = 0;
	}
};