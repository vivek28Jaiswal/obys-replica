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
        opacity:0,
    })
    tl.from(".upText h1",{
        y: 120,
        stagger:.25,
        duration:.58,
        // opacity:1
    })
}
function customCursor(){
    document.addEventListener("mousemove", function (dets) {
        gsap.to(".cursor", {
            left:dets.x,
            top:dets.y,
        })
    })
    Shery.makeMagnet(".navpart2 h4, .menu-opener__square",{});
}
loader();
customCursor();
