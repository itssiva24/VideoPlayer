const timeline = document.getElementById('timeline');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const stop = document.getElementById('stop');
let startTime,
	fraction,
	marginRight = 60 * 5,
	startHours = 15,
	numberOfFragments = 60,
	textWidth = 59.45,
	currentZoom = 6;
let elementsWidth = marginRight + textWidth;
let d = numberOfFragments * elementsWidth;
createTimeline();

function operation() {
	console.log('operation began');
	const x = 12 * 12 * 2;
	let j;
	for (let i = 0; i < 24; i++) {
		for (j = 0; j < 60; j++) {
			if (i < 10) {
				j < 10
					? (document.getElementById(`s${60 * i + j}`).innerText = `0${i}:0${j}:00`)
					: (document.getElementById(`s${60 * i + j}`).innerText = `0${i}:${j}:00`);
			} else {
				j < 10
					? (document.getElementById(`s${60 * i + j}`).innerText = `${i}:0${j}:00`)
					: (document.getElementById(`s${60 * i + j}`).innerText = `${i}:${j}:00`);
			}
		}
	}
}
function createTimeline() {
	for (let i = 0; i < 24 * 60; i++) {
		const s = document.createElement('div');
		s.setAttribute('id', `s${i}`);
		s.style.marginRight = '300px';
		timeline.append(s);

		if (i === 24 * 60 - 1) operation();
	}
}
const vid = document.querySelector('video');

let isDown = false,
	startX,
	scrollLeft;

vid.addEventListener('timeupdate', (e) => {
	fraction = vid.currentTime / vid.duration;
	startTime =
		currentZoom === 1
			? numberOfFragments * elementsWidth * startHours - timeline.offsetWidth / 2
			: numberOfFragments * elementsWidth * startHours -
				timeline.offsetWidth / 2 +
				18 -
				d * (5.517 / vid.duration);
	timeline.scrollLeft = fraction * d + startTime;
});

document.body.addEventListener('resize', () => {
	fraction = vid.currentTime / vid.duration;
	timeline.scrollLeft = fraction * d + startTime;
});

timeline.addEventListener('mousedown', (e) => {
	isDown = true;
	startX = e.pageX - timeline.offsetLeft;
	scrollLeft = timeline.scrollLeft;
});

timeline.addEventListener('mouseleave', () => {
	isDown = false;
});

timeline.addEventListener('mouseup', () => {
	isDown = false;
});

timeline.addEventListener('mousemove', (e) => {
	if (!isDown) return; // stop the fn from running
	const prevTime = vid.currentTime;
	e.cancelBubble = true;
	e.stopPropagation();
	e.preventDefault();
	timeline.style.cursor = 'drag';
	const x = e.pageX - timeline.offsetLeft;
	const walk = x - startX; //slider effect
	timeline.scrollLeft = currentZoom === 1 ? scrollLeft - walk : scrollLeft - walk * 4;
	vid.currentTime = prevTime - walk * (vid.duration / d); //Conversion factor(d/vid.duration);
});

play.addEventListener('click', (e) => {
	vid.play();
});

pause.addEventListener('click', (e) => {
	vid.pause();
});

stop.addEventListener('click', (e) => {
	vid.currentTime = 0;
	vid.pause();
});

timeline.addEventListener('wheel', (e) => {
	// console.log(e.deltaY);
	const elements = Array.from(timeline.children);
	for (item of elements) {
		item.style.display = 'block';
	}
	e.deltaY > 0
		? currentZoom === 1 ? (currentzoom = 1) : currentZoom--
		: currentZoom === 6 ? (currentzoom = 6) : currentZoom++;
	switch (currentZoom) {
		case 6:
			for (item of elements) {
				item.style.marginRight = '300px';
				marginRight = 60 * 5;
				elementsWidth = marginRight + textWidth;
				numberOfFragments = 60;
				d = numberOfFragments * elementsWidth;
			}
			break;
		case 5:
			for (item of elements) {
				const num = item.id.split('s');
				if (num[1] % 2 !== 0) {
					item.style.display = 'none';
				} else {
					item.style.marginRight = '240px';
					marginRight = 60 * 4;
					elementsWidth = marginRight + textWidth;
					numberOfFragments = 30;
					d = numberOfFragments * elementsWidth;
				}
			}
			break;
		case 4:
			for (item of elements) {
				const num = item.id.split('s');
				if (num[1] % 5 !== 0) {
					item.style.display = 'none';
				} else {
					item.style.marginRight = '180px';
					marginRight = 60 * 3;
					elementsWidth = marginRight + textWidth;
					numberOfFragments = 12;
					d = numberOfFragments * elementsWidth;
				}
			}
			break;
		case 3:
			for (item of elements) {
				const num = item.id.split('s');
				if (num[1] % 10 !== 0) {
					item.style.display = 'none';
				} else {
					item.style.marginRight = '120px';
					marginRight = 60 * 2;
					elementsWidth = marginRight + textWidth;
					numberOfFragments = 6;
					d = numberOfFragments * elementsWidth;
				}
			}
			break;
		case 2:
			for (item of elements) {
				const num = item.id.split('s');
				if (num[1] % 30 !== 0) {
					item.style.display = 'none';
				} else {
					item.style.marginRight = '60px';
					marginRight = 60;
					elementsWidth = marginRight + textWidth;
					numberOfFragments = 2;
					d = numberOfFragments * elementsWidth;
				}
			}
			break;
		case 1:
			for (item of elements) {
				const num = item.id.split('s');
				if (num[1] % 60 !== 0) {
					item.style.display = 'none';
				} else {
					item.style.marginRight = '30px';
					marginRight = 60 / 2;
					elementsWidth = marginRight + textWidth;
					numberOfFragments = 1;
					d = numberOfFragments * elementsWidth;
					console.log(d);
				}
			}
			break;
	}
	startTime =
		currentZoom === 1
			? numberOfFragments * elementsWidth * startHours - timeline.offsetWidth / 2
			: numberOfFragments * elementsWidth * startHours -
				timeline.offsetWidth / 2 +
				18 -
				d * (5.517 / vid.duration);
	timeline.scrollLeft = fraction * d + startTime;
});
