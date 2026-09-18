import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Observer } from 'gsap/Observer';

//import { InertiaPlugin } from 'gsap/InertiaPlugin';

import styles from './GalleryWorks2.module.css';
import Image from 'next/image';
import FloatingParticles from '../FloatingParticles/FloatingParticles';


const images = [
  
  '/images/gelleryWorks/cliente-01.jpg',
  '/images/gelleryWorks/cliente-02.jpg',
  '/images/gelleryWorks/cliente-03.jpg',
  '/images/gelleryWorks/cliente-04.jpg',
  '/images/gelleryWorks/cliente-05.jpg',
  '/images/gelleryWorks/cliente-06.jpg',
  '/images/gelleryWorks/cliente-07.jpg',
  '/images/gelleryWorks/cliente-08.jpg',
  '/images/gelleryWorks/cliente-09.jpg',
  '/images/gelleryWorks/cliente-10.jpg',
  // '/images/gelleryWorks/twolg-among-us2-port.png',
  '/images/gelleryWorks/at-games-port.jpg',
  '/images/gelleryWorks/azra-games-port.jpg',
  //'/images/gelleryWorks/farbridge-port.jpg',
  '/images/gelleryWorks/free-rage-games-port.jpg',
  '/images/gelleryWorks/marvel-snap-port.jpg',
  '/images/gelleryWorks/play-to-win-port.jpg',
  // '/images/gelleryWorks/twolg-among-us-port.jpg',
  //'/images/gelleryWorks/twolg-among-us2-port.jpg',
  '/images/gelleryWorks/superjump-port.jpg',
];

const images2 = [
  '/images/gelleryWorks/at-games-port.jpg',
  '/images/gelleryWorks/azra-games-port.jpg',
  '/images/gelleryWorks/free-rage-games-port.jpg',
  '/images/gelleryWorks/marvel-snap-port.jpg',
  '/images/gelleryWorks/play-to-win-port.jpg',
  '/images/gelleryWorks/superjump-port.jpg',
  '/images/gelleryWorks/cliente-05.jpg',
  '/images/gelleryWorks/cliente-06.jpg',
  '/images/gelleryWorks/cliente-07.jpg',
  '/images/gelleryWorks/cliente-08.jpg',
  '/images/gelleryWorks/cliente-09.jpg',
  '/images/gelleryWorks/cliente-10.jpg',
  '/images/gelleryWorks/cliente-11.jpg',
  '/images/gelleryWorks/cliente-12.jpg',
  '/images/gelleryWorks/cliente-13.jpg',
  '/images/gelleryWorks/cliente-03.jpg',


];

const overlay = [
  
  '/images/gelleryWorks/overlay-01.png',
  '/images/gelleryWorks/overlay-02.png',
  '/images/gelleryWorks/overlay-03.png',
  '/images/gelleryWorks/overlay-04.png',
  '/images/gelleryWorks/overlay-05.png',
  '/images/gelleryWorks/overlay-06.png',
  '/images/gelleryWorks/overlay-07.png',
  '/images/gelleryWorks/overlay-08.png',
  '/images/gelleryWorks/overlay-09.png',
  '/images/gelleryWorks/overlay-10.png',
  '/images/gelleryWorks/at-games-logo-overlay.png',
  '/images/gelleryWorks/azra-games-logo-overlay.png',
  '/images/gelleryWorks/free-rage-games-logo-overlay.png',
  '/images/gelleryWorks/marvel-snap-logo-overlay.png',
  '/images/gelleryWorks/play-to-win-logo-overlay.png',
  '/images/gelleryWorks/superjump-logo-overlay.png',
];

const overlay2 = [
  '/images/gelleryWorks/at-games-logo-overlay.png',
  '/images/gelleryWorks/azra-games-logo-overlay.png',
  '/images/gelleryWorks/free-rage-games-logo-overlay.png',
  '/images/gelleryWorks/marvel-snap-logo-overlay.png',
  '/images/gelleryWorks/play-to-win-logo-overlay.png',
  '/images/gelleryWorks/superjump-logo-overlay.png',
  '/images/gelleryWorks/overlay-05.png',
  '/images/gelleryWorks/overlay-06.png',
  '/images/gelleryWorks/overlay-07.png',
  '/images/gelleryWorks/overlay-08.png',
  '/images/gelleryWorks/overlay-09.png',
  '/images/gelleryWorks/overlay-10.png',
  '/images/gelleryWorks/overlay-11.png',
  '/images/gelleryWorks/overlay-12.png',
  '/images/gelleryWorks/overlay-13.png',
  '/images/gelleryWorks/overlay-03.png',

];



gsap.registerPlugin(Draggable);

const GalleryWorks2 = () => {
  const containerRef = useRef(null);
  
  const timelineGallery1Ref = useRef(null);



  useEffect(() => { 





    let ctx = gsap.context(() => {
      let tl = gsap.timeline({});    
      tl
      .to(`[data-element="item"]`, 0.75, { scale: 0.95, ease: "none"}, "<")

    }); 

    let ctx2 = gsap.context(() => {
      let tl2 = gsap.timeline({});    
      tl2
      .to(`[data-element="item"]`, 0.75, { scale: 0.95, ease: "none"}, "<")


    }); 



    setTimeout(() => { 

      timelineGallery1Ref.current = slider('[data-element="container"]', '[data-element="item"]');

      function slider(elem, itemName) {
        gsap.utils.toArray(elem).forEach(container => {
          let tl = horizontalLoop(gsap.utils.toArray(itemName), { draggable: true, speed: 0.3, repeat: -1 }),
              clamp = gsap.utils.clamp(-10, 10),
              isOver, reversedOnPause;        
                    
          
          Observer.create({
            target: document.scrollingElement,
            type: "scroll,wheel",
            onChangeY: self => {
              tl.timeScale(clamp(self.velocityY * 0.03));
              if (isOver) {
                gsap.to(tl, { timeScale: 1, duration: 1, overwrite: true });
              }
            }
          });
    
        });
      }
    
    
      function horizontalLoop(items, config) {
        items = gsap.utils.toArray(items);
        config = config || {};
        let onChange = config.onChange,
            lastIndex = 0,
            tl = gsap.timeline({repeat: config.repeat, onUpdate: onChange && function() {
              let i = tl.closestIndex()
              if (lastIndex !== i) {
                lastIndex = i;
                onChange(items[i], i);
              }
            }, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
            length = items.length,
            startX = items[0].offsetLeft,
            times = [],
            widths = [],
            spaceBefore = [],
            xPercents = [],
            curIndex = 0,
            center = config.center,
            pixelsPerSecond = (config.speed || 1) * 101,
            snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), 
            timeOffset = 0, 
            container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
            totalWidth,
            getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + spaceBefore[0] + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0),
            populateWidths = () => {
              let b1 = container.getBoundingClientRect(), b2;
              items.forEach((el, i) => {
                widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
                b2 = el.getBoundingClientRect();
                spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
                b1 = b2;
              });
              gsap.set(items, { 
                xPercent: i => xPercents[i]
              });
              totalWidth = getTotalWidth();
            },
            timeWrap,
            populateOffsets = () => {
              timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
              center && times.forEach((t, i) => {
                times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
              });
            },
            getClosest = (values, value, wrap) => {
              let i = values.length,
                closest = 1e10,
                index = 0, d;
              while (i--) {
                d = Math.abs(values[i] - value);
                if (d > wrap / 2) {
                  d = wrap - d;
                }
                if (d < closest) {
                  closest = d;
                  index = i;
                }
              }
              return index;
            },
    
    
            populateTimeline = () => {
              let i, item, curX, distanceToStart, distanceToLoop;
              tl.clear();
              for (i = 0; i < length; i++) {
                item = items[i];
                curX = xPercents[i] / 100 * widths[i];
                distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
                distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX")  ;
                tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 101), duration: distanceToLoop / pixelsPerSecond}, 0)
                  .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
                  .add("label" + i, distanceToStart / pixelsPerSecond);    
                times[i] = distanceToStart / pixelsPerSecond;
              }
              timeWrap = gsap.utils.wrap(0, tl.duration());
            }, 
    
            
            refresh = (deep) => {
               let progress = tl.progress();
               tl.progress(0, true);
               populateWidths();
               deep && populateTimeline();
               populateOffsets();
               deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
            },
            proxy;
        gsap.set(items, {x: 0});
        populateWidths();
        populateTimeline();
        populateOffsets();
        window.addEventListener("resize", () => refresh(true));
        function toIndex(index, vars) {
          vars = vars || {};
          (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); 
          let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
          if (time > tl.time() !== index > curIndex) { 
            time += tl.duration() * (index > curIndex ? 1 : -1);
          }
          if (time < 0 || time > tl.duration()) {
            vars.modifiers = {time: timeWrap};
          }
          curIndex = newIndex;
          vars.overwrite = true;
          gsap.killTweensOf(proxy);
          return tl.tweenTo(time, vars);
        }
        tl.next = vars => toIndex(curIndex+1, vars);
        tl.previous = vars => toIndex(curIndex-1, vars);
        tl.current = () => curIndex;
        tl.toIndex = (index, vars) => toIndex(index, vars);
        tl.closestIndex = setCurrent => {
          let index = getClosest(times, tl.time(), tl.duration());
          setCurrent && (curIndex = index);
          return index;
        };
        tl.times = times;
        tl.progress(1, true).progress(0, true);
        if (config.reversed) {
          tl.vars.onReverseComplete();
          tl.reverse();
        }
        if (config.draggable && typeof(Draggable) === "function") {
          proxy = document.createElement("div");
          let wrap = gsap.utils.wrap(0, 1),
              ratio, startProgress, draggable, velocity = 0, inertiaTween,
              align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
              syncIndex = () => tl.closestIndex(true),
              lastX = 0, lastTime = Date.now();
        
          draggable = Draggable.create(proxy, {
            trigger: items[0].parentNode,
            type: "x",
            onPressInit() {
              if (inertiaTween) inertiaTween.kill(); 
              gsap.killTweensOf(tl);
              startProgress = tl.progress();
              refresh();
              ratio = 1 / totalWidth;
              gsap.set(proxy, {x: startProgress / -ratio});
              tl.timeScale(0);
              lastX = draggable.x;
              lastTime = Date.now();
            },
            onDrag: function() {
              align();
              let currentTime = Date.now();
              velocity = (draggable.x - lastX) / (currentTime - lastTime);
              lastX = draggable.x;
              lastTime = currentTime;
            },
            onDragEnd: function() {
              let inertiaDistance = velocity * 100; 
              inertiaTween = gsap.to(draggable, {
                duration: 2, 
                x: "+=" + inertiaDistance,
                ease: "power2.out",
                onUpdate: align,
                onComplete: syncIndex
              });
            },
            onRelease: syncIndex
          })[0];
        
          tl.draggable = draggable;
        }
        tl.closestIndex(true);
        onChange && onChange(items[curIndex], curIndex);
        return tl;
      }
    

  }, 500);



  }, []);


  return (

    <>

<div ref={containerRef} data-element="container" className={`${styles.containerWrap} draggable`}>

    <div className={`${styles.sliderWrap}`}>
      <div data-element="loop" className={`${styles.loop}`}>
      {images.map((src, index) => (
          <div 
            key={index}
            data-element="item"
            className={`${styles.item}`}
          >                
            <Image 
              className={`${styles.itemInner}`}
              src={src}
              alt={`img-${index}`}
              width={500}  
              height={500} 
            />

            <Image 
                  className={`${styles.itemInner} ${styles.overlayImage}`}
                  src={overlay[index]} 
                  alt={`overlay-${index}`}
                  width={500}  
                  height={500} 
                />

            <div className={`${styles.itemInner2} `}>
                <Image 
                      className={``}
                      src={images2[index]} 
                      alt={`overlay-${index}`}
                      width={500}  
                      height={500} 
                    />    

                <Image 
                      className={`${styles.overlayImage2}`}
                      src={overlay2[index]} 
                      alt={`overlay-${index}`}
                      width={500}  
                      height={500} 
                    />
            </div>

          </div>
        ))}
      </div>                        
    </div>

    <FloatingParticles />


</div>    

<div className={`${styles.fix}`}></div>




    </>
  );
};

export default GalleryWorks2;
