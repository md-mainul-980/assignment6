const login_sec = document.getElementById("login_section");
const name = document.getElementById("name");
const password = document.getElementById("password");
const login_btn = document.getElementById("login_btn");

const lessons_section = document.getElementById("lesson-section");
const faq = document.getElementById("faq");
const nav = document.getElementById("nav");

const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("grid-container").classList.add("hidden");
};
const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("grid-container").classList.remove("hidden");
};

const logout = () => {
    location.reload(true);
};

function check_password(name, password) {
    
    if (name.value.length < 3) {
        return "name error";
    }

    if (password.value === "123456") {
        return "ok";
    } else {
        return "password error";
    }
}

function login() {
    if (check_password(name, password) === "ok") {
        Swal.fire({
            title: "You are logged in",
            text: "Enjoy your session",
            icon: "success"
        });
        
        login_sec.classList.add("hidden");

        nav.classList.remove("hidden");
        faq.classList.remove("hidden");
        lessons_section.classList.remove("hidden");

    } else if (check_password(name, password) === "name error") {
        Swal.fire({
            icon: "error",
            title: "Invalid credentials",
            text: "Enter a valid name",
        });
        name.focus();
    } else if (check_password(name, password) === "password error") {
        Swal.fire({
            icon: "error",
            title: "Invalid credentials",
            text: "Enter a valid password",
        });
        password.focus();
    }
}

const faq_sec = () => {
    faq.scrollIntoView({ behavior: "smooth", block: "start" });
};

const learn_sec = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

const loadLessonBtn = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
      .then((res) => res.json())
      .then((data) => displayLessonBtn(data.data));
};

const loadGridData = (btnId) => {
    showLoader();
    const gridURL = `https://openapi.programming-hero.com/api/level/${btnId}`;
    fetch(gridURL)
      .then((res) => res.json())
      .then((data) => displayGridData(data.data));
    const clickedBtn = document.getElementById(`btn-${btnId}`);
    removeActiveClass();
    clickedBtn.classList.add("active");
};

const loadDetails = (detailBtnId) => {
    const detailsURL = `https://openapi.programming-hero.com/api/word/${detailBtnId}`;
    fetch(detailsURL)
      .then((res) => res.json())
      .then((data) => displayDetails(data.data));
};

const displayLessonBtn = (lessonBtns) => {
    for (const lessonBtn of lessonBtns) {
      const newlessonBtn = document.createElement("div");
      newlessonBtn.innerHTML = ` <button id= "btn-${lessonBtn.level_no}" onclick ="loadGridData(${lessonBtn.level_no})"
            class="btn btn-primary btn-outline text-sm text-indigo-700 hover:bg-black"
          >
            <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.6424 0.652344C16.1346 0.625 16.5721 1.00781 16.5447 1.47266V10.7148C16.5447 11.1523 16.1893 11.5352 15.7244 11.5625C14.3846 11.6172 11.6502 11.8906 9.76348 12.8477C9.4627 12.9844 9.10723 12.793 9.10723 12.4648V2.51172C9.10723 2.375 9.18926 2.23828 9.32598 2.15625C11.158 1.03516 14.1385 0.734375 15.6424 0.652344ZM8.04082 2.15625C8.17754 2.23828 8.25957 2.375 8.25957 2.51172V12.4648C8.25957 12.793 7.9041 12.9844 7.60332 12.8477C5.7166 11.8906 2.98223 11.6172 1.64238 11.5625C1.17754 11.5352 0.82207 11.1523 0.82207 10.7148V1.47266C0.82207 1.00781 1.23223 0.625 1.72441 0.652344C3.22832 0.734375 6.20879 1.03516 8.04082 2.15625Z" fill="#422AD5"/>
            </svg>
            Lesson-${lessonBtn.level_no}
          </button>`;
      document.getElementById("lesson-btn-container").appendChild(newlessonBtn);
    }
  };

const displayGridData = (wordBoxes) => {
    let gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";
    if (wordBoxes.length === 0) {
      hideLoader();
      gridContainer.innerHTML = ` 
      <div
            class="mx-auto py-24 rounded-4xl text-center space-y-3 flex flex-col items-center col-span-3"
          >
            <img src="assets/alert-error.png" alt="" class="" />
            <p class="hind-siliguri">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h1 class="text-4xl font-semibold hind-siliguri">অন্য Lesson এ যান</h1>
          </div>
      `;
    }
    for (const wordBox of wordBoxes) {
      let newWordBox = document.createElement("div");
      newWordBox.innerHTML = `
      <div class="bg-white text-center rounded-lg p-13 shadow-md  lg:h-80 h-96 overflow-hidden  transition-all duration-400 hover:bg-slate-100 ">
            <div class="space-y-4 mb-10">
              <p class="font-semibold text-3xl">${wordBox.word}</p>
              <p class="text-lgl">Meaning/Pronounciation</p>
              <p class="font-hind font-semibold text-2xl">"${
                wordBox.meaning ? wordBox.meaning : "অর্থ নাই"
              } / ${wordBox.pronunciation}"  </p>
            </div>
            <div class="flex justify-between">
              <i onclick="loadDetails(${wordBox.id})" 
                class="fa-solid fa-circle-info bg-slate-300 p-2 rounded-xl text-2xl text-slate-700 cursor-pointer"
              >
              <img src="assets/info.svg" alt="" class="w-6 h-6">
              </i>
              <i  onclick="pronounceWord('${wordBox.word}')"
                class="fa-solid fa-volume-high bg-slate-300 p-2 rounded-xl text-xl text-slate-700 cursor-pointer"
              >
              <img src="assets/fi-sr-volume.svg" alt="" class="w-6 h-6">
              </i>
            </div>
          </div>
      `;
  
      gridContainer.appendChild(newWordBox);
      hideLoader();
    }
};

const displayDetails = (detailsData) => {
    modal.showModal();
    document.getElementById("modal").innerHTML = `
   <div class="modal-box">
        <div class="border border-slate-300 rounded-lg p-5">
            <h3 class="font-black text-3xl mb-5 flex">
                ${detailsData.word} (<img src="assets/microphone.svg" alt="" class="w-6 h-9">:${detailsData.pronunciation})
            </h3>
            <h4 class="font-semibold text-xl mb-1">Meaning</h4>
            <p class="text-xl mb-5 font-hind">${
                detailsData.meaning ? detailsData.meaning : "অর্থ নাই"
            }</p>
            <h4 class="font-semibold text-xl mb-1">Example</h4>
            <p class="text-xl mb-5">${detailsData.sentence}</p>
            <h4 class="text-xl mb-3 font-hind font-semibold">সমার্থক শব্দ গুলো</h4>
            <div id="synonym-buttons" class="flex gap-2 flex-wrap">
            
            </div>
        </div>
        
        <div class="modal-action justify-start">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">
                    Complete Learning
                </button>
            </form>
        </div>
        
    </div>
`;

const synonymButtons = document.getElementById("synonym-buttons");
    synonymButtons.innerHTML = "";
    if (!detailsData.synonyms || detailsData.synonyms.length === 0) {
      synonymButtons.innerHTML = `<button class="btn">No similar word found at this time</button>`;
    } else {
      for (const synonym of detailsData.synonyms) {
        let synonymBtn = document.createElement("div");
        synonymBtn.innerHTML = `<button class="btn ">${synonym}</button>`;
        synonymButtons.appendChild(synonymBtn);
      }
    }
  };

loadLessonBtn();

const pronounceWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; 
    window.speechSynthesis.speak(utterance);
};
  