import { gsap } from "gsap";
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.registerEffect({
    name: "fadeUp",
    effect: (targets, config) => {
        return gsap.from(targets, {
            duration: config.duration,
            y: config.y,
            opacity: 0,
            ease: 'power1',
            delay: config.delay,
            stagger: config.stagger
        });
    },
    defaults: {duration: 2, delay: 0, stagger: 0, y: 40},
    extendTimeline: true
})

let needReverseScroll = false

const sections = document.querySelectorAll(".section");

const scrollToTopShow = gsap.timeline({
    paused: true,
    scrollTrigger:{
        trigger: "#contacts",
        start: "85% bottom"
    }
})

export const headerAnim = () => {

    const tl = gsap.timeline();

    ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
            tl
                .fadeUp(".header-title", {
                    duration: .5,
                    stagger: .2,
                    delay: .3
                })
                .fadeUp(".btn-header", {
                    duration: .3,
                    stagger: .2,
                    delay: .3
                }, 0)
                .from(".menu-wrapper", {
                    x: 100,
                    opacity: 0,
                    duration: .5,
                    ease: "power1"
                }, "-=.4")
                .from(".animate-icon--menu", {
                    x: 100,
                    opacity: 0,
                    duration: .5,
                    ease: "power1",
                    stagger: .15
                },"-=.3")
        }
    })

    ScrollTrigger.matchMedia({
        "(max-width: 768px)": function () {
            tl
                .fadeUp(".header-title", {
                    duration: .5,
                    stagger: .2,
                    delay: .3
                })
                .fadeUp(".btn-header", {
                    duration: .3,
                    stagger: .2,
                    delay: .3
                }, 0)
                .from(".menu-wrapper", {
                    y: -50,
                    opacity: 0,
                    duration: .5,
                    ease: "power1"
                }, "-=.4")
                .from(".animate-icon--menu", {
                    y: -50,
                    opacity: 0,
                    duration: .5,
                    ease: "power1",
                    stagger: .15
                },"-=.3")

            const  showAnim = gsap.from(".menu-wrapper", {
                    yPercent: -100,
                    paused: true,
                    duration: 0.3,
                }).progress(1);

            ScrollTrigger.create({
                trigger: 'html',
                start: "top top",
                end: 'bottom bottom',
                onUpdate: (self) => {
                    self.direction === -1 ? showAnim.play() : showAnim.reverse()
                }
            });
        }
    })
}

export const navigationAnim = () => {
    const burger = document.querySelector(".hamburger"),
        navigation = document.querySelector(".navigation"),
        links = document.querySelectorAll(".nav-link"),
        scrollToTopBtn = document.querySelector(".scrollToTop"),
        scrollToWorksBtn = document.querySelector(".scroll-to-works");

    const navTl = gsap.timeline({
        paused: true,
        defaults: {
            duration: .4,
            ease: "power1"
        }
    })

    let reversed = false;

    navTl
        .to(navigation, {
            x: "100%",
            duration: .7,
        }, 0)
        .to(".social-link", {
            y: -10,
            stagger: .1,
        }, 0)
        .to("#firstBar", {
            y: 9,
            rotation: "-45deg"
        }, .15)
        .to("#secondBar", {
            x: 50,
            opacity: 0
        }, 0)
        .to("#thirdBar", {
            rotation: "45deg",
            y: -9,
        }, .15)
        .to(".social-link", {
            y: 0,
            stagger: .1,
        }, .4)



    scrollToTopShow
        .to(".scrollToTopWrapper", {
            duration: .7,
            scaleY: 1,
            ease: "power1"
        })
        .to(".scrollToTop", {
            duration: .7,
            y: 100,
            ease: "power1"
        })
        .to(".scrollToTop", {
            duration: .6,
            y: "+=20",
            ease: "power1",
            repeat: -1,
            repeatDelay: .1,
            yoyo: true
        })

    scrollToWorksBtn.addEventListener("click", (e) => {
        e.preventDefault();

        gsap.timeline().to(window, {
            duration: .7,
            ease: "power1",
            scrollTo: `${e.target.hash}`
        })
    })

    burger.addEventListener("click", () => {
        if(reversed) {
            navTl.reverse(.8)
            if((document.documentElement.scrollTop + window.innerHeight) > (document.body.scrollHeight - 100
                || document.documentElement.scrollHeight - 100
                || document.body.offsetHeight - 100
                || document.documentElement.offsetHeight - 100
                || document.body.clientHeight - 100)) {
                scrollToTopShow.play();
            }
        } else {
            navTl.play();
            if((document.documentElement.scrollTop + window.innerHeight) > (document.body.scrollHeight - 100
            || document.documentElement.scrollHeight - 100
            || document.body.offsetHeight - 100
            || document.documentElement.offsetHeight - 100
            || document.body.clientHeight - 100)) {
                scrollToTopShow.reverse(1.2);
            }
        }
        reversed = !reversed;
    })

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            navTl.reverse(.8);
            gsap.timeline().to(window, {duration: .7, scrollTo: `${e.target.hash}`}, 0)

            reversed = !reversed;
        })
    })

    scrollToTopBtn.addEventListener("click", () => {
        scrollToTopShow
            .reverse(1.2)
        gsap.timeline().to(window, {duration: 1.5, ease: "power1", scrollTo: ".header"})
    })

}

export const sectionScrollAnim = () => {

    function goToSection(i, section) {

        let addHeight = section.offsetTop;
        gsap.to(window, {
            scrollTo: {y: addHeight, autoKill: false},
            duration: 1
        });
    }

    sections.forEach((section, i) => {
        // ScrollTrigger.create({
        //     trigger: section,
        //     onEnter: () => goToSection(i, section)
        // });

        ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            snap: 1
        });
    });
}

export const contentInSectionsAnim = () => {

    const works = document.querySelectorAll(".work");

    works.forEach((work, i) => {

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: work,
                start: "top 80%",
                end: "bottom bottom"
            }
        });

        if(i % 3 === 0){
            tl.fadeUp(work, {
                y: 60,
                duration: .5,
            })
        }

        else if(i%3 === 1){
            tl.fadeUp(work, {
                y: 60,
                duration: .5,
                delay: .25
            })
        }

        else if(i%3 === 2){
            tl.fadeUp(work, {
                y: 60,
                duration: .5,
                delay: .5
            })
        }
    })
}

export const sectionsTitleAnim = () => {
    const titles = document.querySelectorAll(".section-title")

    titles.forEach((title, i) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: title,
                start: "top 80%"
            }
        })

        tl.from(title, {
            x: "-100px",
            duration: .5,
            opacity: 0,
            ease: "power1"
        })
    });
}

export const flipCardAnim = () => {
    const flipCards = document.querySelectorAll(".tariffs-item");

    flipCards.forEach((card) => {
        const moreBtn = card.querySelector(".btn--more"),
            backBtn = card.querySelector(".btn--back");

        const tl = gsap.timeline({paused: true, reversed: false});

        tl
            .to(card.querySelector(".tariffs-front"),{
                rotationY: "-180deg"
            })
            .to(card.querySelector(".tariffs-back"),{
                rotationY: 0
            }, 0);

        moreBtn.addEventListener("click", (e) => {
            e.preventDefault();
            tl.play();
        })
        backBtn.addEventListener("click", (e) => {
            e.preventDefault();
            tl.reverse();
        })
    })
}

export const scrollToContacts = () => {
    const anchorsToContacts = document.querySelectorAll(".scroll-to-contacts");

    anchorsToContacts.forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();

            gsap.timeline().to(window, {duration: 1, scrollTo: "#contacts"})
        })
    })
}

export const contactsAnim = () => {
    const contacts = document.querySelector(".contacts");

    const textTl = gsap.timeline({
        scrollTrigger: {
            trigger: contacts,
            start: "top 40%",
            end: "bottom bottom"
        }
    })

    textTl
        .fadeUp(".contacts-text", {
            duration: .9,
            stagger: .15,
            delay: .2
        })
        .from(".social-link-contacts", {
            duration: .5,
            x: "100px",
            opacity: 0,
            ease: "power1"
        }, .35)
        .from(".btn-contacts", {
            duration: .2,
            x: "-50px",
            opacity: 0,
            ease: "power1"
        }, .35)
        .call(() => needReverseScroll = true)

    window.addEventListener("scroll", () => {
        if(needReverseScroll && ((contacts.offsetTop - window.innerHeight) > (window.scrollY || window.pageYOffset)) && !scrollToTopShow.reversed()){
            scrollToTopShow.reverse(1.2)
        }

    })
}