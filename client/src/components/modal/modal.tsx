import React, { useEffect, useRef } from 'react'
import FadeInOnScroll from '../fade-in-on-scroll/fade-in-on-scroll';

type ModalProps = React.ComponentProps<'div'> & {
    showModal: boolean;
    toggleModal(): void;
    render(ref: React.RefObject<HTMLDivElement>): JSX.Element
}


function Modal({ showModal, toggleModal, render }: ModalProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const listenerFunction = (event: MouseEvent) => {
            if (showModal && !ref.current?.contains((event.target as Node))) toggleModal()
        }

        window.addEventListener('mousedown', listenerFunction);

        return () => {
            window.removeEventListener('mousedown', listenerFunction);
        }
    }, [toggleModal, showModal])

    return showModal ? (
        <FadeInOnScroll direction='center' duration={0.25} className='z-100 h-screen absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex justify-center items-center'>
            { render(ref) }
        </FadeInOnScroll> 
    ) : (
        <></>
    )
}

export default Modal;