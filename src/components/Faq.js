import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const FAQSection = () => {
    const [active, setActive] = useState(null);

    const toggleAccordion = (id) => {
        setActive(active === id ? null : id);
    };

    const faqs = [
        {
            id: 1,
            question: 'How this theme is different from others in market?',
            answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.'
        },
        {
            id: 2,
            question: 'Does this theme support plugins?',
            answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.'
        },
        {
            id: 3,
            question: 'Do you provide any moneyback guarantee in this product?',
            answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.'
        },
        {
            id: 4,
            question: 'What payment method do you support?',
            answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.'
        },
        {
            id: 5,
            question: 'Will I get money back if I am not satisfied?',
            answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.'
        },
        {
            id: 6,
            question: 'How do you provide support?',
            answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.'
        },
    ];

    return (
        <section className="mt-10">
            <div className=" mx-auto max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Frequently asked questions
                    </h2>
                    <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">
                        Ask everything you need to know about our products and services.
                    </p>
                </div>

                <div className="mx-auto mt-12 overflow-hidden border border-gray-200 divide-y divide-gray-200 sm:mt-16 rounded-xl">
                    {faqs.map((faq) => (
                        <div key={faq.id} >
                            <h3>
                                <button
                                    onClick={() => toggleAccordion(faq.id)}
                                    aria-expanded={active === faq.id}
                                    className="flex items-center justify-between w-full px-6 py-5 text-lg font-semibold text-left text-gray-900 sm:p-6"
                                >
                                    <span> Q. {faq.question} </span>
                                    <span className="ml-4">
                                        {active === faq.id ? (
                                            <AiOutlineMinus className="w-6 h-6 text-gray-900" />
                                        ) : (
                                            <AiOutlinePlus className="w-6 h-6 text-gray-900" />
                                        )}
                                    </span>
                                </button>
                            </h3>
                            {active === faq.id && (
                                <div className="px-6 pb-6">
                                    <p className="text-base text-gray-600">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mx-auto mt-8 overflow-hidden text-center bg-gray-100 sm:mt-12 rounded-xl">
                    <div className="py-12 sm:p-12">
                        <div className="max-w-sm mx-auto">
                            <div className="relative z-0 flex items-center justify-center -space-x-2 overflow-hidden">
                                <img
                                    className="relative z-10 inline-block rounded-full w-14 h-14 ring-4 ring-gray-100"
                                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/faq/1/avatar-male.png"
                                    alt=""
                                />
                                <img
                                    className="relative z-30 inline-block w-16 h-16 rounded-full ring-4 ring-gray-100"
                                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/faq/1/avatar-female-1.png"
                                    alt=""
                                />
                                <img
                                    className="relative z-10 inline-block rounded-full w-14 h-14 ring-4 ring-gray-100"
                                    src="https://landingfoliocom.imgix.net/store/collection/saasui/images/faq/1/avatar-female-2.png"
                                    alt=""
                                />
                            </div>

                            <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                                Still have questions?
                            </h3>
                            <p className="mt-2 text-base font-normal text-gray-600">
                                Please Contact Us.
                            </p>
                            <div className="mt-6">
                                <a
                                    href="#"
                                    title=""
                                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                                    role="button"
                                >
                                   Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
