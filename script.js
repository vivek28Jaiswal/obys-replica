function smooths() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
function loader() {
    var tl = gsap.timeline()
    tl.from(".line h1", {
        y: 150,
        stagger: .25,
        duration: .6,
        delay: .5
    });
    tl.from(".countdown", {
        opacity: 0,
        onStart: function () {
            h5 = document.querySelector(".countdown h5");
            var time = 0;
            setInterval(function () {
                if (time < 100) {
                    h5.innerHTML = time++
                } else {
                    h5.innerHTML = time
                }
            }, 28)
        }
    }, "same")
    tl.to(".line h2", {
        animationName: "nowAnime",
        opacity: 1,
        duration: .5,
    }, "same")
    tl.to(".loader", {
        opacity: 0,
        duration: .4,
        delay: 3,
    })
    tl.from(".page1", {
        y: 1500,
        // opacity: 0,
        duration: .65,
        ease: "power4.out",
    })
    tl.to(".loader", {
        display: "none",
    })
    tl.from("nav", {
        opacity: 0,
    })
    tl.from(".upText h1", {
        y: 120,
        stagger: .25,
        duration: .58,
        // opacity:1
    })
    tl.from(".zero-one, .page2",{
        opacity:0
    },"-=2")
}
function customCursor() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to(".cursor", {
            left: dets.x,
            top: dets.y,
        })
    })
    Shery.makeMagnet(".navpart2 h4, .menu-opener__square", {});
}
loader();
customCursor();
smooths();
