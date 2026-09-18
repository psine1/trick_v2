import styles from './CartFilter.module.css';
import Image from 'next/image'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import React, { forwardRef } from 'react';
import SvgStrokeCardAboutUs from '../SvgStrokeCardAboutUs/SvgStrokeCardAboutUs';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const CartFilter = forwardRef(({ title, value, seleted, setItem }, ref) => {
	const cardRef = useRef(null);
	const animationRef = useRef(null);
	const shadowStrokeRef = useRef(null);
	const animationShadowRef = useRef(null);
	const spanColorRef = useRef(null);
	const pathBorderColorRef = useRef(null);
	useEffect(() => {

		animationShadowRef.current = gsap.timeline({ paused: true })
			.to(shadowStrokeRef.current, { x: 5, y: 5, duration: 0.3, ease: 'power2.out', })
		animationRef.current = gsap.timeline({ paused: true })
			.to(cardRef.current, { scale: 1.025, duration: 0.3, ease: 'power2.out', })
			.to(spanColorRef.current, {color: "#CDFD8F",duration: 0.3,ease: 'power2.out',}, "<")
			.to(pathBorderColorRef.current, {backgroundColor: "#000000",duration: 0.3,ease: 'power2.out',}, "<")

	}, []);


	useEffect(() => {
		let tl_ = gsap.timeline();
		if (seleted === value) {
			tl_.to(shadowStrokeRef.current, { x: 5, y: 5, duration: 0.3, ease: 'power2.out', })
			tl_.to(cardRef.current, { scale: 1.025, duration: 0.3, ease: 'power2.out', })
					.to(spanColorRef.current, {color: "#000000",duration: 0.3,ease: 'power2.out',}, "<")
					.to(pathBorderColorRef.current, {backgroundColor: "#CDFD8F",duration: 0.3,ease: 'power2.out',}, "<")
		}
		else {
			tl_.to(shadowStrokeRef.current, { x: 0, y: 0, duration: 0, ease: 'power2.out', })
			tl_.to(cardRef.current, { scale: 1, duration: 0, ease: 'power2.out', })
				.to(spanColorRef.current, {color: "#CDFD8F",duration: 0,ease: 'power2.out',}, "<")
				.to(pathBorderColorRef.current, {backgroundColor: "#000000",duration: 0,ease: 'power2.out',}, "<")
		}

	}, [seleted]);

	const handleMouseEnter = () => {
		animationRef.current.play();
		animationShadowRef.current.play();

	};

	const handleMouseLeave = () => {
		if(seleted !== value){
			animationRef.current.reverse();
			animationShadowRef.current.reverse()
		}

	};


	const handleTap = () => {
		const isHovered = cardRef.current.classList.contains('hovered');
		isHovered ? animationRef.current.reverse() : animationRef.current.play();
		cardRef.current.classList.toggle('hovered');

	};

	const handleClick = () => {
		setItem(value)
	};

	return (
		<>
			<div ref={ref} className={` `}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				onTouchStart={handleTap}
			>

				<div ref={cardRef} className='relative'>
					<div ref={shadowStrokeRef} className={` absolute ${styles.wrapStroke}  `}>
						<div className={`${seleted === value ? styles.wrapStrokeSelectHover: styles.wrapStrokeHover }`}>
							<SvgStrokeCardAboutUs />
						</div>
					</div>
					<div className={`${styles.path}`}>
						<div ref={pathBorderColorRef} className={`${styles.pathBorder}`}>
							<span ref={spanColorRef} className={`${styles.titleFilter} nerisSemiBold pb-2`}>{title}</span>
						</div>
					</div>

				</div>
			</div>

		</>
	);
});

CartFilter.displayName = 'CartFilter';


export default CartFilter;