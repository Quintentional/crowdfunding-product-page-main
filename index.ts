const modalOverlay = document.querySelector("#modal-overlay") as HTMLElement | null;
const modal = document.querySelector("#modal") as HTMLElement | null;
const modalClose = document.querySelector("#modal-close") as HTMLElement;
const back = document.querySelector("#back") as HTMLElement | null;
const modalSections = document.querySelectorAll(".modal-section") as NodeListOf<HTMLElement>;
const modalSectionsWithId = document.querySelectorAll(".modal-section-with-id") as NodeListOf<HTMLElement>;
const overlay = document.querySelector("#overlay") as HTMLElement | null;
const complete = document.querySelector("#complete") as HTMLElement;
const refresh = document.querySelector("#refresh") as HTMLElement;

// ----------------------------------------------------Display Modal------------------------------------------------

if (back && modal && modalOverlay) {
  back.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
    modal.style.display = "flex";
  });
}

// ---------------------------------------------------Modal Radio Button and Enter Section------------------------------------------------
modalSections.forEach((section) => {
  section.addEventListener("click", () => {
    const radio = section.querySelector(".radio") as HTMLElement | null;
    const radioButton = radio?.querySelector(".radio-button") as HTMLElement | null;
    const modalEnter = section.querySelector(".modal-enter") as HTMLElement | null;
    const continueButton = section.querySelector("button") as HTMLElement | null;

    //Don't display Non-matching Radio Buttons and Enter Sections

    modalSections.forEach((otherSections) => {
      const otherRadio = otherSections.querySelector(".radio") as HTMLElement | null;
      const otherRadioButton = otherRadio?.querySelector(".radio-button") as HTMLElement | null;
      const otherModalEnter = otherSections.querySelector(".modal-enter") as HTMLElement | null;

      if (otherRadioButton && otherModalEnter) {
        otherRadioButton.style.display = "none";
        otherModalEnter.style.display = "none";
      }
    });

    // Display Matching Radio Buttons and Enter Sections

    if (radioButton && modalEnter) {
      radioButton.style.display = "inline-block";
      modalEnter.style.display = "flex";
    }

    // Display Success Section

    if (continueButton && overlay && modalOverlay) {
      continueButton.addEventListener("click", (event) => {
        event.preventDefault();
        overlay.style.display = "flex";
        modalOverlay.style.display = "none";
      });
    }
  });
});

// ----------------------------------------------------------Refresh Page------------------------------------------------

refresh.addEventListener("click", () => {
  location.reload();
});

//---------------------------------------------------------- Mobile Menu------------------------------------------------

const hamburgerClosed = document.querySelector("#hamburger-closed") as HTMLElement;
const hamburgerOpen = document.querySelector("#hamburger-open") as HTMLElement;
const mobileMenu = document.querySelector("#mobile-menu") as HTMLElement;

// Close Mobile Menu

hamburgerClosed.addEventListener("click", () => {
  mobileMenu.style.display = "flex";
  hamburgerClosed.style.display = "none";
  hamburgerOpen.style.display = "inline-block";

  if (overlay) {
    overlay.style.display = "flex";
    complete.style.display = "none";
  }
});

// CLose Mobile Menu

hamburgerOpen.addEventListener("click", () => {
  mobileMenu.style.display = "none";
  hamburgerClosed.style.display = "inline-block";
  hamburgerOpen.style.display = "none";

  if (overlay) {
    overlay.style.display = "none";
    complete.style.display = "flex";
  }
});

// --------------------------------------------------------Bookmark Button------------------------------------------------

const bookmark = document.querySelector("#bookmark") as HTMLElement;
const bookmarkSpan = document.querySelector("#bookmark-span") as HTMLElement;
const circleFill = document.querySelector("#circle-fill") as HTMLElement;
const pathFill = document.querySelector("#path-fill") as HTMLElement;

bookmark.addEventListener("click", () => {
  circleFill.style.fill = "hsl(176, 72%, 28%)";
  pathFill.style.fill = "hsl(0, 0.00%, 100.00%)";
  bookmarkSpan.innerText = "Bookmarked";
});

// --------------------------------------------------------Select Reward------------------------------------------------

const selectRewardButton = document.querySelectorAll(".select-reward") as NodeListOf<HTMLElement>;

// Button click to open the modal and activate matching section
selectRewardButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (modalOverlay) modalOverlay.style.display = "flex";

    const rewardId = button.dataset.rewardId;

    // Clear all sections first
    modalSectionsWithId.forEach((section) => toggleSectionState(section, false));

    // Activate the section matching the button's reward ID
    const matchingSection = Array.from(modalSectionsWithId).find(
      (section) => section.dataset.rewardId === rewardId
    );

    if (matchingSection) toggleSectionState(matchingSection, true);
  });
});

// Allow clicking any modal section to switch the active state
modalSections.forEach((section) => {
  section.addEventListener("click", () => {
    // Clear all sections' states first
    modalSections.forEach((s) => toggleSectionState(s, false));

    // Activate the clicked section
    toggleSectionState(section, true);
  });
});

// Helper function to handle showing/hiding sections' radio buttons & enter sections
function toggleSectionState(section: Element, isActive: boolean) {
  const radioButton = section.querySelector(".radio-button") as HTMLElement | null;
  const enterSection = section.querySelector(".modal-enter") as HTMLElement | null;

  if (radioButton) radioButton.classList.toggle("selected", isActive);
  if (enterSection) enterSection.classList.toggle("selected", isActive);

  console.log(`${isActive ? "Activated" : "Deactivated"} section:`, section);
}


// selectRewardButton.forEach((button) => {
//   button.addEventListener("click", () => {
//     if (modalOverlay) modalOverlay.style.display = "flex";
    

//     const rewardId = button.dataset.rewardId;

//     modalSectionsWithId.forEach((section) => {

//       // Prevent Displaying Radio and Enter on non-matching section

//       const radioButton = section.querySelector(".radio-button") as HTMLElement | null;
//       const enterSection = section.querySelector(".modal-enter") as HTMLElement | null;

//           if (radioButton) radioButton.classList.remove("selected");
//           if (enterSection) enterSection.classList.remove("selected");

//     });

//           //Display Radio and Enter on matching section

//           modalSectionsWithId.forEach((section) => {

//             if (section.dataset.rewardId === rewardId) {
//               console.log("Matching section found:", section);
      
//               const closestRadio = section.querySelector(".radio-button") as HTMLElement | null;
//               const closestEnter = section.querySelector(".modal-enter") as HTMLElement | null;
      
//               if (closestRadio) {
//                 closestRadio.classList.add("selected");
//                 console.log("Radio button set to inline-block");
//               } else {
//                 console.warn("Radio button not found inside:", section);
//               }
      
//               if (closestEnter) {
//                 closestEnter.classList.add("selected");
//                 console.log("Modal enter set to flex");
//               } else {
//                 console.warn("Modal enter not found inside:", section);
//               }
              
//             }
//           })

//   });
// });

//----------------------------------------------------CLose Modal------------------------------------------------

modalClose.addEventListener('click', () => {

  console.log('x was clicked');
  console.log("Button exists:", modalClose);
console.log("Button offset:", modalClose.getBoundingClientRect());


  modalSections.forEach((section) => {
    const resetRadioButton = section.querySelector('.radio-button') as HTMLElement | null;
    const resetEnterSection = section.querySelector('.modal-enter') as HTMLElement | null;


      if(modalOverlay) {
        modalOverlay.style.display="none";
      }
    

    if(resetRadioButton) {
      resetRadioButton.classList.remove('selected');
      resetRadioButton.style.display='none'
      console.log('Radio button reset', resetRadioButton);
    }else{
      console.log('No resetRadioButton found');
    }

    if(resetEnterSection) {
      resetEnterSection.classList.remove('selected');
      resetEnterSection.style.display='none'
      console.log('Enter section reset', resetEnterSection);
    }else{
      console.log('No resetEnterSection found');
    }
  })
})