import React from 'react';
import styles from './MainLink.module.css';
import SvgStrokeCardAboutUs from '../SvgStrokeCardAboutUs/SvgStrokeCardAboutUs';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const MainLink = ({ title, isBorder = true, isLast,link,targetOp= "_self", onClick }) => {



	useEffect(() => {


	}, []);


	return (
		
		 <Link href={link} passHref target={targetOp}>
			<div style={{ paddingRight: isLast ? '1.5rem' : '0rem' }} onClick={onClick}>
				<div className='relative'>
					{
						isBorder && <div className={` absolute ${styles.wrapStroke}  ${styles.clipPath} `}>
							<div className={`${styles.wrapStrokeHover}  ${styles.clipPath}`}>
								<SvgStrokeCardAboutUs />
							</div>
						</div>
					}

					<div className={`${!isBorder && styles.pathNotClipPath} ${isBorder && styles.path} ${isBorder && styles.clipPath}`}>
						<div className={`${!isBorder && styles.pathBorderNotClipPath} ${isBorder && styles.pathBorder} ${isBorder && styles.clipPath}`}>
							<span className={`${styles.title} ${!isBorder && styles.titleLink} ${isBorder && styles.titleLinkClipPath} nerisSemiBold pb-2`}>{title}</span>
						</div>
					</div>

				</div>
			</div>
		</Link>
		
	);
};

export default MainLink;