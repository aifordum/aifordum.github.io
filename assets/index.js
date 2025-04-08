// 获取 URL 查询参数
const queryParams = new URLSearchParams(window.location.search);
// 判断是否存在 ref_id 参数
const hasRefId = queryParams.has('ref_id');
const refId = queryParams.get('ref_id');

const links = document.getElementsByClassName('link');
for (let i = 0; i < links.length; i++) {
	const link = links[i];
	if (hasRefId) {
		link.href = `${link.href}signup?ref_id=${refId}`;
	} else {
		link.href = `${link.href}signin`;
	}
}

document.addEventListener('DOMContentLoaded', function () {
	const carouselInner = document.querySelector('.carousel-inner');
	const items = document.querySelectorAll('.carousel-item');
	const prevBtn = document.querySelector('.carousel-control.prev');
	const nextBtn = document.querySelector('.carousel-control.next');
	const indicators = document.querySelectorAll('.indicator');

	// 克隆第一个和最后一个元素以实现无缝循环
	const firstClone = items[0].cloneNode(true);
	const lastClone = items[items.length - 1].cloneNode(true);

	carouselInner.appendChild(firstClone);
	carouselInner.insertBefore(lastClone, items[0]);

	const allItems = document.querySelectorAll('.carousel-item');
	let currentIndex = 1; // 从原始第一个开始
	const totalItems = allItems.length;

	// 设置初始位置
	carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

	// 更新轮播图位置
	function updateCarousel(transition = true) {
		if (transition) {
			carouselInner.style.transition = 'transform 0.5s ease-in-out';
		} else {
			carouselInner.style.transition = 'none';
		}
		carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

		// 更新指示器状态
		const realIndex = (currentIndex - 1 + items.length) % items.length;
		indicators.forEach((indicator, index) => {
			indicator.classList.toggle('active', index === realIndex);
		});
	}

	// 下一张
	function nextSlide() {
		currentIndex++;
		updateCarousel();

		// 检查是否到达克隆的最后一项
		if (currentIndex >= totalItems - 1) {
			setTimeout(() => {
				currentIndex = 1;
				updateCarousel(false);
			}, 500);
		}
	}

	// 上一张
	function prevSlide() {
		currentIndex--;
		updateCarousel();

		// 检查是否到达克隆的第一项
		if (currentIndex <= 0) {
			setTimeout(() => {
				currentIndex = totalItems - 2;
				updateCarousel(false);
			}, 500);
		}
	}

	// 按钮事件
	nextBtn.addEventListener('click', nextSlide);
	prevBtn.addEventListener('click', prevSlide);

	// 指示器点击事件
	indicators.forEach((indicator, index) => {
		indicator.addEventListener('click', function () {
			currentIndex = index + 1;
			updateCarousel();
		});
	});

	// 自动轮播
	let autoPlay = setInterval(nextSlide, 2000);

	// 鼠标悬停暂停
	const carousel = document.querySelector('.carousel');
	carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
	carousel.addEventListener('mouseleave', () => {
		autoPlay = setInterval(nextSlide, 2000);
	});
});
