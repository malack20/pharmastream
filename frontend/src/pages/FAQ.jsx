import React from 'react'
import FAQAccordion from '../components/FAQAccordion'

const FAQ = () => {
  const faqItems = [
    { question: 'How long does delivery take?', answer: 'Delivery usually takes 2-4 hours within Nairobi.' },
    { question: 'Do I need a prescription?', answer: 'Yes, for prescription-only medicines, you must upload a valid prescription.' },
  ]
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <FAQAccordion items={faqItems} />
      </div>
    </div>
  )
}

export default FAQ
