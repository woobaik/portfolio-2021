(() => {
  let yOffSet = 0;
  let currentScene = 0;
  let prevScrollHeight = 0;
  let enterNewScene = true;

  const scene_info = [
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1],
      },
    },
    {
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.getElementById("scroll-section-1"),
      },
    },
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  const setLayout = () => {
    for (let i = 0; i < scene_info.length; i++) {
      scene_info[i].scrollHeight = window.innerHeight * scene_info[i].heightNum;
      scene_info[
        i
      ].objs.container.style.height = `${scene_info[i].scrollHeight}px`;
    }

    let totalScrollHeight = 0;

    for (let i = 0; i < scene_info[i]; i++) {
      totalScrollHeight += scene_info.scrollHeight;
      if (yOffSet <= totalScrollHeight) {
        currentScene = i;
        break;
      }
    }
  };

  const calcValues = (values, currentYOffset) => {
    let rv;
    const scrollHeight = scene_info[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
    }
    rv = parseFloat(scrollRatio * (values[1] - values[0]));

    return rv;
  };

  const playAnimation = () => {
    const currentObj = scene_info[currentScene].objs;
    const currentYOffset = yOffSet - prevScrollHeight;
    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(
          scene_info[currentScene].values.messageA_opacity,
          currentYOffset
        );

        console.log("hi", messageA_opacity_in);
        currentObj.messageA.style.opacity = messageA_opacity_in;

        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;

      default:
        break;
    }
  };

  const scrollLoop = () => {
    prevScrollHeight = 0;
    enterNewScene = false;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += scene_info[i].scrollHeight;
    }

    if (yOffSet > prevScrollHeight + scene_info[currentScene].scrollHeight) {
      currentScene += 1;
      enterNewScene = true;
    }

    if (yOffSet < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) {
        return;
      }
      currentScene -= 1;
    }
    if (enterNewScene) return;
    playAnimation();
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  };

  window.addEventListener("scroll", () => {
    yOffSet = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout);
})();
