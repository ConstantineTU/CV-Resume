
// scroll to top
let toTopBtn = document.getElementById('top__btn')
let btnIsTop = true
let hideTopBtn
window.addEventListener('scroll', function () {
	if (window.pageYOffset >= 300 && toTopBtn.classList[1] === undefined) {
		toTopBtn.classList.add('show')
		btnIsTop = false
		if (!btnIsTop) {
			hideTopBtn = setInterval(() => {
				toTopBtn.classList.remove('show')
				clearInterval(hideTopBtn)
			}, 5000);
		}
	} else if (window.pageYOffset < 300) {
		toTopBtn.classList.remove('show')
		btnIsTop = true
		clearInterval(hideTopBtn)
	}
})
// spoiler
if (document.querySelector('.spoiler__click') && document.querySelectorAll('.spoiler')) {
	const spoilers = document.querySelectorAll('.spoiler')
	const btnSpoiler = document.querySelector('.spoiler__click')
	btnSpoiler.addEventListener('click', function () {
		for (let spoiler of spoilers) {
			if (spoiler.classList[1] === 'show') {
				setTimeout(() => {
					spoiler.classList.remove('show')
					btnSpoiler.classList.remove('active')
					setTimeout(() => {
						spoiler.classList.remove('close')
					}, 400);
				}, 1000);
				spoiler.classList.add('close')
			} else if (spoiler.classList[1] === undefined) {
				btnSpoiler.classList.add('active')
				spoiler.classList.add('show')
				spoiler.classList.remove('close')
			}
		}
	})
}
// burger-menu
const headerBurger = document.querySelector('.header-burger')
const burgerWrap = document.querySelector('.burger-wrap')
const bodyLock = document.querySelector('body')
const itemsMenu = document.querySelectorAll('.header-menu__item')
burgerWrap.onclick = function () {
	headerBurger.classList.toggle('active')
	burgerWrap.classList.toggle('active')
	bodyLock.classList.toggle('_lock')
	burgerWrap.classList.remove('hide')
}
itemsMenu.forEach(item => item.addEventListener('click', function () {
	if (headerBurger.classList[1] === 'active') {
		burgerWrap.classList.remove('active')
		headerBurger.classList.remove('active')
		bodyLock.classList.remove('_lock')
	}
}))
// burger-hide
window.addEventListener('scroll', function () {
	if (window.pageYOffset >= 300) {
		burgerWrap.classList.add('hide')
	} else { burgerWrap.classList.remove('hide') }
})


// ! Slider

let itemsWelcome = document.querySelectorAll('.welcome-carousel-item')
let sliderItemWelcome = document.querySelectorAll('.welcome-slider__item')
let currentItemWlcome = 0
let isEnabled = true

let countSlideWelcome = document.querySelector('.welcome-slider__counter-left')


sliderItemWelcome.forEach(slide => (slide.addEventListener('click', function () {
	if (isEnabled) {
		if (+(slide.dataset.value) > currentItemWlcome) {
			hideItem('to-left')
			changeCurrentItem(+(slide.dataset.value))
			showItem('from-right')
		} else if (+(slide.dataset.value) < currentItemWlcome) {
			hideItem('to-right')
			changeCurrentItem(+(slide.dataset.value))
			showItem('from-left')
		}
	}
})))

function changeCurrentItem(n) {
	for (let bullet of sliderItemWelcome) {
		bullet.classList.remove('active')
	}
	currentItemWlcome = (n + itemsWelcome.length) % itemsWelcome.length
	countSlideWelcome.textContent = `0${(currentItemWlcome + 1)}`
	sliderItemWelcome[currentItemWlcome].classList.add('active')
}

function hideItem(direction) {
	isEnabled = false
	itemsWelcome[currentItemWlcome].classList.add(direction)
	itemsWelcome[currentItemWlcome].addEventListener('animationend', function () {
		this.classList.remove('active', direction)
	})
}

function showItem(direction) {
	itemsWelcome[currentItemWlcome].classList.add('next', direction)
	itemsWelcome[currentItemWlcome].addEventListener('animationend', function () {
		this.classList.remove('next', direction)
		this.classList.add('active')
		isEnabled = true
	})
}

function previousItem(n) {
	hideItem('to-right')
	changeCurrentItem(n - 1)
	showItem('from-left')
}
function nextItem(n) {
	hideItem('to-left')
	changeCurrentItem(n + 1)
	showItem('from-right')
}

document.querySelector('.welcome-slider__arrows-left').addEventListener('click', function () {
	if (isEnabled) {
		previousItem(currentItemWlcome)
	}
})

document.querySelector('.welcome-slider__arrows-right').addEventListener('click', function () {
	if (isEnabled) {
		nextItem(currentItemWlcome)
	}
})

const swipedetect = (el) => {
	let surface = el
	let startX = 0
	let startY = 0
	let distX = 0
	let distY = 0

	let startTime = 0
	let elapsedTime = 0

	let threshold = 100
	let restraint = 100
	let allowedTime = 400

	surface.addEventListener('mousedown', function (e) {
		startX = e.pageX
		startY = e.pageY
		startTime = new Date().getTime()
		e.preventDefault()
	})

	surface.addEventListener('mouseup', function (e) {
		distX = e.pageX - startX
		distY = e.pageX - startY
		elapsedTime = new Date().getTime() - startTime
		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) > threshold && Math.abs(distY) > restraint) {
				if (distX > 0) {
					if (isEnabled) {
						previousItem(currentItemWlcome)
					}
				} else {
					if (isEnabled) {
						nextItem(currentItemWlcome)
					}
				}
			}
		}
		e.preventDefault()
	})
	let touch = false
	surface.addEventListener('touchstart', function (e) {
		touch = true
		if (e.target.classList.contains('welcome-slider__arrows')) {
			if (e.target.classList.contains('welcome-slider__arrows-right')) {
				if (isEnabled) {
					previousItem(currentItemWlcome)
				}
			} else if (e.target.classList.contains('welcome-slider__arrows-right')) {
				if (isEnabled) {
					nextItem(currentItemWlcome)
				}
			}
		}
		let touchObj = e.changedTouches[0]
		startX = touchObj.pageX
		startY = touchObj.pageY
		startTime = new Date().getTime()
		e.preventDefault()
	})
	surface.addEventListener('touchmove', function (e) {
		if (touch) {
			e.preventDefault()
		}

	})

	surface.addEventListener('touchend', function (e) {

		if (touch) {
			let touchObj = e.changedTouches[0]
			distX = touchObj.pageX - startX
			distY = touchObj.pageX - startY
			elapsedTime = new Date().getTime() - startTime
			if (elapsedTime <= allowedTime) {
				if (Math.abs(distX) > threshold && Math.abs(distY) > restraint) {
					if (distX > 0) {
						if (isEnabled) {
							previousItem(currentItemWlcome)
							touch = false
						}
					} else {
						if (isEnabled) {
							nextItem(currentItemWlcome)
							touch = false
						}
					}
				}
			}
			e.preventDefault()
		}
	})
}
let el = document.querySelector('.welcome-carousel')
swipedetect(el)

// console.group('%cCV Constantine Terentyev. Self-verification:', 'color: red');
// console.log('✅ вёрстка валидная ' + '%c(10)',
// 	'color: red');
// console.log(
// 	'%c	проверено валидатором ' + '%chttps://validator.w3.org/nu/?doc=https%3A%2F%2Fconstantinetu.github.io%2Frsschool-cv%2F' + '%c – Document checking completed. No errors or warnings to show." (+10)',
// 	'color: blue', 'color: green', 'color: blue'
// );
// console.log('✅ вёрстка семантическая ' + '%c(20)',
// 	'color: red');
// console.log(
// 	'%c	используются уникальные семантические теги article, aside, footer, header, main, nav, section - 7*2=14 (+14)',
// 	'color: blue'
// );
// console.log('%c	используются уникальные заголовки h1, h2, h3, h4 - 4*2=8 (+6)', 'color: blue');
// console.log('✅ для оформления СV используются css-стили ' + '%c(10)',
// 	'color: red');
// console.log(
// 	'✅ контент размещается в блоке, который горизонтально центрируется на странице, фоновый цвет, если он есть, тянется во всю ширину страницы ' + '%c(10)',
// 	'color: red'
// );
// console.log(
// 	'✅ вёрстка адаптивная: ни на одном из разрешений экрана до 320px включительно не появляется горизонтальная полоса прокрутки, при этом всё содержание страницы сохраняется ' + '%c(10)',
// 	'color: red'
// );
// console.log(
// 	'✅ есть меню. Ссылки в пунктах меню ведут на основные разделы CV. При кликах по пунктам меню реализована плавная прокрутка по якорям. При уменьшении ширины экрана меню становится адаптивным ' + '%c(10)',
// 	'color: red'
// );
// console.log(
// 	'✅ на странице СV присутствует изображение, пропорции не искажены, есть атрибут alt ' + '%c(10)',
// 	'color: red'
// ); console.log(
// 	'✅ контакты для связи и перечень навыков оформлены в виде списка ul > li ' + '%c(10)',
// 	'color: red'
// );
// console.log(
// 	'✅ CV содержит контакты для связи, краткую информацию о себе, перечень навыков, примеры кода или выполненных проектов, информацию об образовании и уровне английского ' + '%c(10)',
// 	'color: red'
// );
// console.log(
// 	'✅ CV содержит пример вашего кода (например, решение задачи с сайта codewars) с подсветкой кода ' + '%c(10)',
// 	'color: red'
// );
// console.log(
// 	'✅ CV содержит изображения-ссылки на выполненные вами проекты. При клике по изображению страница проекта открывается в новой вкладке. У каждого проекта есть название, небольшое описание, указан перечень используемых технологий ' + '%c(10)',
// 	'color: red'
// );
// console.log(
// 	'✅ CV выполнено на английском языке ' + '%c(10)',
// 	'color: red'
// );
// console.log(
// 	'✅ выполнены требования к Pull Request: есть ссылка на задание, скриншот страницы СV, ссылка на деплой страницы CV на GitHub Pages, выполнена самооценка (самооценку расписываем по пунктам критериев оценки, указывая балл за каждый пункт) ' + '%c(10)',
// 	'color: red'
// );
// console.log(
// 	'✅ есть видеорезюме автора CV на английском языке. В описание видео на YouTube добавлена его транскрипция на английском языке. ' + '%c(10)',
// 	'color: red'
// );
// console.log(
// 	'✅ дизайн, оформление, качество выполнения CV не ниже чем в примерах CV, приведённых в материалах к заданию ' + '%c(10)' + '%c (Считаю, что моё резюме выглядит на уровне лучших) ', 'color: red', 'color: blue'
// );
// console.log(
// 	'%cScore 160/ 160', 'color: green'
// );
// console.log(
// 	'%cСсылка на Pull Request - ' + '%chttps://github.com/ConstantineTU/rsschool-cv/pull/5', 'color: blue', 'color: green'
// );
// console.groupEnd()

