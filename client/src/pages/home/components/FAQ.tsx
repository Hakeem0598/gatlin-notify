import CustomSection from '../../../components/custom-section/custom-section';
import FadeInOnScroll from '../../../components/fade-in-on-scroll/fade-in-on-scroll';
import FAQItem from '../../../components/faq-item/faq-item';
import { FAQData } from './data';


function FAQ() {
    return (
        <CustomSection heading='frequently asked questions' sectionId='faq'>
            <FadeInOnScroll direction='center' className='space-y-4'>
                {
                    FAQData.map((data) => (
                        <FAQItem key={data.question} {...data} />
                    ))
                }
            </FadeInOnScroll>
        </CustomSection>
    )
}

<div className='space-y-4'>
    
</div>

export default FAQ;
