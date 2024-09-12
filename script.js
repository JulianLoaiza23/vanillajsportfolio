(function () {
  let focusedNavItemIdx;

  const navItems = document.querySelectorAll("header ul li");
  const sectionCtns = document.querySelectorAll(".section-ctn");

  function applySmoothScrollingToAnchorTags() {
    const anchorTags = document.querySelectorAll('#root a[href^="#"]');

    anchorTags.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelector(e.target.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  function initTypingAnimation() {
    const words = ["Software Engineer", "Stabbin Dude", "Made with Love <3"];

    let target = document.getElementById("text");
    let con = document.getElementById("focusCursor");

    let visible = true;
    let waiting = false;

    let x = 1;
    let letterCount = 1;

    window.setInterval(() => {
      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.textContent = words[0].substring(0, letterCount);
        window.setTimeout(() => {
          let usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(() => {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (waiting === false) {
        target.textContent = words[0].substring(0, letterCount);
        letterCount += x;
      }
    }, 120);
    window.setInterval(() => {
      if (visible === true) {
        con.className = "focus-cursor flicker";
        visible = false;
      } else {
        con.className = "focus-cursor";

        visible = true;
      }
    }, 800);
  }

  function checkForCtnIntersection(observationTarget, index) {
    const isHome = index === 0;

    const callBack = (entries) => {
      const isIntersecting = entries[0].isIntersecting;

      if (isHome) {
        handleHeaderClassList(isIntersecting);
      }

      if (isIntersecting) {
        removeFocusFromNavItem();
        focusOnNavItem(index);
      } else {
        const topPos = entries[0].boundingClientRect.top;

        if (topPos > 0 && !isHome) {
          removeFocusFromNavItem();
          focusOnNavItem(focusedNavItemIdx - 1);
        }
      }
    };

    const observer = new IntersectionObserver(callBack, {
      threshold: isHome ? 1 : 0.95,
    });

    observer.observe(observationTarget);
  }

  function handleHeaderClassList(isIntersecting) {
    const header = document.querySelector("#root header");
    const hasClass = header.classList.contains("is-scrolling");

    if (isIntersecting && hasClass) {
      header.classList.remove("is-scrolling");
    } else if (!isIntersecting && !hasClass) {
      header.classList.add("is-scrolling");
    }
  }

  function setSectionCtnsObserver() {
    sectionCtns.forEach((ctn, idx) => {
      checkForCtnIntersection(ctn, idx);
    });
  }

  function removeFocusFromNavItem() {
    const focusedElement = document.querySelector(".focused");
    focusedElement?.classList?.remove("focused");
  }

  function focusOnNavItem(index) {
    focusedNavItemIdx = index;
    navItems?.[focusedNavItemIdx]?.classList.add("focused");
  }

  function setPageBeforeUnload() {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }

  //very hacky, figure out something sexier
  function setFocusedToHomeNavItem() {
    setTimeout(() => {
      const homeItem = document.querySelector("#root header li:first-child");
      homeItem?.classList?.add("focused");
    }, 250);
  }

  setPageBeforeUnload();
  setSectionCtnsObserver();
  setFocusedToHomeNavItem();

  initTypingAnimation();
  applySmoothScrollingToAnchorTags();
})();
