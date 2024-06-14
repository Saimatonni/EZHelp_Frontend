import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import styles from "./Styles.module.css";
import { BASE_URL } from "../../utils/config";

const FaqAccordion = () => {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/question-answers`);
        const result = await response.json();
        if (response.ok) {
          setFaqData(result.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Error fetching FAQ data");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Popular Questions</h1>
      <Accordion preExpanded={[faqData[0]?._id]}>
        {faqData.map((item) => (
          <AccordionItem key={item._id} uuid={item._id}>
            <div className={`border rounded-xl ${item._id !== faqData[0]?._id ? "mt-4" : ""}`}>
              <AccordionItemHeading className="text-black py-3 px-4 font-semibold">
                <AccordionItemButton className={styles.accordion__button}>
                  {item.question}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="text-gray-700 py-3 px-4">
                {item.answer}
              </AccordionItemPanel>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqAccordion;
