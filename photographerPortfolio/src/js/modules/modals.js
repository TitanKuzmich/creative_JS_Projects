import gsap from "gsap";

const modals = () => {

    let btnPressed = false;


    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        const tl = gsap.timeline({paused: true})

        tl
            .to(modal, {
                duration: .01,
                left: 0
            })
            .to(modal, {
                opacity: 1,
                duration: .9,
                ease: "power1"
            })

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target){
                    e.preventDefault();
                }

                btnPressed = true;

                if(destroy){
                    item.remove();
                }

                windows.forEach(item => {
                    tl.play();
                })

                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                tl.reverse();
            })

            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal){
                windows.forEach(item => {
                    tl.reverse();
                })

                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function calcScroll(){
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('.btn-call-modal', '.modal-overlay', '.modal-close');
};

export default modals;