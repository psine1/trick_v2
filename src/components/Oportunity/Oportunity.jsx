import React, { useRef, useEffect } from 'react';
import styles from './Oportunity.module.css';
import Accordion from '../Accordion/Accordion';
import { useState } from 'react';
import { db } from '@/firebase/firebase';
import { getDocs, collection, query, where } from "firebase/firestore";
import Filters from '../Filters/Filters';

const filtersObjs = [
  {
    title: "All",
    value: "All",
  },
  {
    title: "Art",
    value: "Art",
  },
  {
    title: "Engineering",
    value: "Engineering",
  },
  {
    title: "Production",
    value: "Production",
  },
  {
    title: "UX/UI",
    value: "UX/UI",
  },
  {
    title: "QA",
    value: "QA",
  },
  {
    title: "Digital Design",
    value: "Digital Design",
  },

];
const Oportunity = () => {
  const [oportunities, setOportunities] = useState([]);
  const [filters, setFilters] = useState(filtersObjs);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let queryCollection = null
        if (filter == 'All' || filter == null) {

          queryCollection = collection(db, "oportunities");
        }
        else {
          queryCollection = query(collection(db, "oportunities"), where("filterName", "==", filter));
        }
        setFilters(filtersObjs)
        const querySnapshot = await getDocs(queryCollection);
        const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOportunities(itemsData);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <>
      <div className={`relative mx-auto flex flex-col items-center justify-center px-4 md:px-9 gap-4 ${styles.bgOpening}`} >
        <div className={`relative container px-4`}>
        <div className={`${styles.bkgLogo}`}></div>
        <div className='w-full gap-8 '>
          <div className={`flex flex-col w-full md:w-1/2`}>
            <h3 className={`title-900`}><span className={`text-gradient2`}>JOB </span> <br /> <span className={`title-600 text-white`}>OPENINGS</span></h3>
            <p className='text-white max-w-xl py-6 md:py-9'>
            Explore our job openings and be part of a dynamic, creative environment where your skills can thrive.
            </p>
          </div>
        
        </div>
        </div>
       
      </div>
      <div id="oportunity" className='bg-black '>
        <Filters items={filters} selectItem={filter} setItem={setFilter} />
      </div>
      <div>
        {
          oportunities.length > 0 ?
            <Accordion items={oportunities} filter={filter} /> :
            <div id="nojobopening" className={`${styles.bgNoJobOpening} py-4 md:py-5`}>
              <div className={`container mx-auto px-4 ${styles.containerNoJobOpening} `}>
                <img src="/images/noJobOpening.png" alt="noJobOpening" />
                <span className={` ${styles.spanNoJobOpening} `}>No job openings available.</span>
              </div>

            </div>
        }

      </div>
    </>
  );
};

export default Oportunity;