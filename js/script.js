(() => {
  let yOffSet = 0;
  let currentScene = 0;
  let prevScrollHeight = 0;

  const scene_info = [
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
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
  };

  const scrollLoop = () => {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += scene_info[i].scrollHeight;
    }

    if (yOffSet > prevScrollHeight + scene_info[currentScene].scrollHeight) {
      console.log("yes it worked");
      currentScene += 1;
    }

    if (yOffSet < prevScrollHeight) {
      currentScene -= 1;
    }

    console.log("currentScene", currentScene);
  };

  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffSet = window.pageYOffset;
    scrollLoop();
  });
  setLayout();
})();
