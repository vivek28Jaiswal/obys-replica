function smooths() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loader() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });
  tl.from(
    ".countdown",
    {
      opacity: 0,
      onStart: function () {
        h5 = document.querySelector(".countdown h5");
        var time = 0;
        setInterval(function () {
          if (time < 100) {
            h5.innerHTML = time++;
          } else {
            h5.innerHTML = time;
          }
        }, 28);
      },
    },
    "same"
  );
  tl.to(
    ".line h2",
    {
      animationName: "nowAnime",
      opacity: 1,
      duration: 0.5,
    },
    "same"
  );
  tl.to(".loader", {
    opacity: 0,
    duration: 0.4,
    delay: 3,
  });
  tl.from(".page1", {
    y: 1500,
    // opacity: 0,
    duration: 0.65,
    ease: "power4.out",
  });
  tl.to(".loader", {
    display: "none",
  });
  tl.from("nav", {
    opacity: 0,
  });
  tl.from(".upText h1", {
    y: 120,
    stagger: 0.25,
    duration: 0.58,
    // opacity:1
  });
  tl.from(
    ".zero-one, .page2",
    {
      opacity: 0,
    },
    "-=2"
  );
}
function customCursor() {
  Shery.mouseFollower({
    //Parameters are optional.
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  Shery.makeMagnet(".navpart2 h4, .menu-opener__square", {});
}
function sheryAnimation() {
  Shery.imageEffect(".img-div", {
    style: 5 /*OR 5 for different variant */,
    // debug:true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: 9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7917349903853899 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.2, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.69, range: [0, 10] },
      metaball: { value: 0.56, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.3, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
    gooey: true,
  });
}
function videoPlaying() {
  var videoContainer = document.querySelector(".video-container");
  var videoCrsr = document.querySelector(".video-cursor");
  var playvideo = document.querySelector(".video-container video");

  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(".mousefollower", {
        opacity: 0,
      });
      gsap.to(".video-cursor", {
        left: dets.x - 500,
        y: dets.y - 100,
      });
    });
  });
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    gsap.to(".video-cursor", {
      left: "70%",
    });
  });

  // play and pause video by clicking code
  var flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag == 0) {
      playvideo.play();
      playvideo.style.opacity = 1;
      document.querySelector(
        ".video-cursor"
      ).innerHTML = `<i class="ri-pause-large-fill"></i>`;
      gsap.to(videoCrsr, {
        scale: 0.5,
      });
      flag = 1;
    } else {
      playvideo.pause();
      playvideo.style.opacity = 1;
      document.querySelector(
        ".video-cursor"
      ).innerHTML = `<i class="ri-play-large-fill"></i>`;
      gsap.to(videoCrsr, {
        scale: 1,
      });
      flag = 0;
    }
  });
}
function flagAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".flag", {
      x: dets.x,
      y: dets.y,
    });
  });
  var mousePoint = document.querySelector(".mousePoint");
  mousePoint.addEventListener("mouseenter", function () {
    gsap.to(".flag", {
      opacity: 1,
    });
  });
  mousePoint.addEventListener("mouseleave", function () {
    gsap.to(".flag", {
      opacity: 0,
    });
  });
}
function footerAnimation() {
  const footerText = document.querySelector(".italictxt")

  const intialStyle = {
    fontFamily: 'plain light',
    fontWeight: '600',
    webkitTextStroke: 'none',
    color: 'white',
  };
  const afterHover = {
    fontFamily: 'silk serif',
    fontWeight: "100",
    webkitTextStroke: "1px white",
    color: "transparent",
  };

  footerText.addEventListener("mouseenter", function () {
    footerText.style.fontFamily = afterHover.fontFamily;
    footerText.style.fontWeight = afterHover.fontWeight;
    footerText.style.webkitTextStroke = afterHover.webkitTextStroke;
    footerText.style.color = afterHover.color;

    // gsap.from(footerText, {
    //   opacity: 0,
    //   delay: .3,
    //   duration: 1,
    //   onStart: function () {
    //     $('.italictxt').textillate({ in: { effect: 'fadeInRight' } });
    //     footerText.style.fontFamily = afterHover.fontFamily;
    //     footerText.style.fontWeight = afterHover.fontWeight;
    //     footerText.style.webkitTextStroke = afterHover.webkitTextStroke;
    //     footerText.style.color = afterHover.color;
    //   }
    // })
  });
  footerText.addEventListener("mouseleave", function () {
    footerText.style.fontFamily = intialStyle.fontFamily;
    footerText.style.fontWeight = intialStyle.fontWeight;
    footerText.style.webkitTextStroke = intialStyle.webkitTextStroke;
    footerText.style.color = intialStyle.color;

    // gsap.to(footerText, {
    //   delay: .3,
    //   duration: 1,
    //   onStart: function () {
    //     $('.italictxt').textillate({ out: { effect: 'fadeOut' } });
    //     footerText.style.fontFamily = intialStyle.fontFamily;
    //     footerText.style.fontWeight = intialStyle.fontWeight;
    //     footerText.style.webkitTextStroke = intialStyle.webkitTextStroke;
    //     footerText.style.color = intialStyle.color;
    //   }
    // })
  });

}

sheryAnimation();
loader();
customCursor();
smooths();
videoPlaying();
flagAnimation();
footerAnimation();

