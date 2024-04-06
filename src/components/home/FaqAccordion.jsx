import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from "react-accessible-accordion";
import styles from "./Styles.module.css";

const exampleData = [
    {
        id: 1,
        title: "What services do you offer?",
        answer: "We provide a wide range of services including plumbing, electrical work, gardening, cleaning, moving assistance, painting, tutoring, computer repair, dog walking, and photography."
    },
    {
        id: 2,
        title: "How can I book your services?",
        answer: "Booking our services is simple! You can either call our hotline, visit our website, or use our mobile app to schedule an appointment."
    },
    {
        id: 3,
        title: "Do you offer emergency services?",
        answer: "Yes, we offer emergency services for urgent situations such as plumbing leaks, electrical failures, and cleaning emergencies. Our team is available 24/7 to assist you."
    },
    {
        id: 4,
        title: "What areas do you serve?",
        answer: "We serve customers in the city and surrounding areas. Whether you're located downtown or in the suburbs, we're here to help."
    },
    {
        id: 5,
        title: "Are your workers licensed and insured?",
        answer: "Absolutely! All our workers are licensed professionals with years of experience in their respective fields. Additionally, we provide insurance coverage for your peace of mind."
    },
    {
        id: 6,
        title: "Can I get a quote for your services?",
        answer: "Of course! Simply contact us with details about the services you require, and we'll provide you with a free quote tailored to your needs."
    },
];


const FaqAccordion = () => {
    return (
        <div className="w-full">
            <h1>Popular Questions</h1>
            <Accordion
                className=" p-6 backdrop-blur-xl"
                preExpanded={[1]}
            >
                  {exampleData.map((item, index) => (
                    <AccordionItem uuid={item.id} key={item.id}>
                        <div className={`border border-black rounded-xl ${index !== 0 ? 'mt-4' : ''}`}>
                            <AccordionItemHeading className={`text-black py-3 px-4 text-brand__font__size__base font-brand__font__semibold`}>
                                <AccordionItemButton className={styles.accordion__button}>
                                    {item.title}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="text-black py-3 pl-5 animate-fade__in text-brand__font__size__sm">
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

