
const hideSections = () => {
    document.getElementById("nav-section").classList.add("hidden");
    document.getElementById("cards-section").classList.add("hidden");
    document.getElementById("faq").classList.add("hidden");
    document.getElementById("hero-section").classList.add("block");
    document.getElementById("hero-section").classList.remove("hidden");

}

const showSections = () => {
    
    document.getElementById("hero-section").classList.add("hidden");
    document.getElementById("hero-section").classList.remove("block");
    document.getElementById("nav-section").classList.remove("hidden");
    document.getElementById("cards-section").classList.remove("hidden");
    loadButtons();
    document.getElementById("faq").classList.remove("hidden");
    

}


const loadButtons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data=>displayButtons(data.data));
 };

 const displayButtons = (dataArray) => {

    const buttonContainer = document.getElementById("btn-container");
    dataArray.forEach(data => {
        const btn = document.createElement("button");

        btn.classList.add("btn");
        btn.classList.add("border-[#422AD5]");
        btn.classList.add("text-[#422AD5]","hover:bg-[#422AD5]","hover:text-white");

        btn.id = `btn-${data.level_no}`;
        btn.innerHTML=`Lesson-${data.level_no}`;
        btn.addEventListener("click", function(){
            loadLevel(data.level_no);
        });

        buttonContainer.appendChild(btn);

    })
 };

const loadLevel = (id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res => res.json())
    .then(data => displayLevel(data));
}

const displayLevel = (levelArray) => {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";
    if(levelArray.data.length == 0) {
        cardsContainer.innerHTML = `
        <div class="bg-[#F8F8F8]  col-span-1 md:col-span-2 lg:col-span-3 p-8">
                <img class="mx-auto" src="assets/alert-error.png" alt="">
                <p class="text-center mt-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-2xl font-bold text-center mt-4">নেক্সট Lesson এ যান</h1>
            </div>
        `;
        return;
    }
    levelArray.data.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.classList.add("card-border");
        cardDiv.classList.add("bg-base-100");
        cardDiv.classList.add("w-full");
        cardDiv.classList.add("max-w-sm");
        cardDiv.classList.add("mx-auto");

        cardDiv.innerHTML = `
        <div class="card-body items-center text-center bg-gray-50 rounded-lg mx-8 hover:bg-[#BADEFF26]">
                <h2 class="card-title">${card.word}</h2>
                <p>Meaning /Pronounciation</p>
                <h2>${card.meaning != null? card.meaning : "অর্থ নেই"} / ${card.pronunciation != null? card.pronunciation: "উচ্চারণ নেই"}</h2>
                <div class="w-full flex items-center justify-between px-4">
                <div class="bg-[#BADEFF26]">
                    <img onclick="loadWordDetails(${card.id})" class="w-6 h-6" src="https://img.icons8.com/?size=160&id=t4ujSfHW9WSb&format=png" alt="">
                </div>
                <div class="bg-[#BADEFF26]">
                    <img onclick="pronounceWord('${card.word}')" class="w-6 h-6" src="https://img.icons8.com/?size=96&id=108790&format=png" alt="">
                </div>
                </div>
            </div>
        `;
        cardsContainer.appendChild(cardDiv);
    });
};

const loadWordDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res => res.json())
    .then(data => displayWordDetails(data.data))
}


const getSynonyms = (arr) => {

    const div = document.createElement("div");
    div.classList.add("flex");
    div.classList.add("flex-wrap");
    div.classList.add("gap-2");
    div.classList.add("mt-3");

    if(arr.length == 0) {
        div.innerHTML=`
        <p>No Synonyms Found</p>
        `;
        return div;
    }

    for(let word of arr) {
       const b =  document.createElement("button");
       b.classList.add("bg-[#BADEFF26]");
       b.classList.add("p-3");
       b.classList.add("border-black");
       b.innerText = word;
       div.appendChild(b);
    }

    return div;

};
const displayWordDetails = (word) => {
    console.log(word);
    document.getElementById("word_details").showModal();
    const modalDetails = document.getElementById("modal_details");
    modalDetails.innerHTML = `
            <h1 class="text-2xl font-bold">${word.word}(<img class="w-6 h-6 inline" src="https://img.icons8.com/?size=100&id=9622&format=png" alt="">: ${word.pronunciation}) </h1>

            <p class="py-4 mt-3 font-semibold">Meaning</p>
            <p>${word.meaning != null? word.meaning : "অর্থ নেই"}</p>
            <p class="mt-3 font-semibold">
                Example
            </p>
            <p class="mt-3">
                ${word.sentence}
            </p>
            <p class="mt-3 font-semibold">
                সমার্থক শব্দ গুলো
            </p>
    `;
    const synonymContainer = getSynonyms(word.synonyms);
    modalDetails.appendChild(synonymContainer);
}


document.getElementById("login-btn").addEventListener("click",(event) => {
    event.preventDefault();

    const password = document.getElementById("form-password").value;

    if (password === "123456") {
        Swal.fire({
        title: 'Welcome!',
        text: 'Let\'s learn something new today!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: "#422AD5"
        }).then(() => {
            showSections();
            document.getElementById("form-password").value = "";
        });
    } else {
        Swal.fire({
             title: "Oops!",
            text: "Wrong password! Please try again.",
            icon: "error",
            confirmButtonText: "Try Again",
            confirmButtonColor: "#EF4444"
        });
    }
});

document.getElementById("logout-btn").addEventListener("click", (event) => {
    event.preventDefault();

    hideSections();
});

document.getElementById("learn-btn").addEventListener("click", (event) => {
    event.preventDefault();

    const element = document.getElementById("cards-section");

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

document.getElementById("faq-btn").addEventListener("click", (event) => {
    event.preventDefault();

    const element = document.getElementById("faq");

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


 function pronounceWord(word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-EN';
      window.speechSynthesis.speak(utterance);
    }


hideSections();
