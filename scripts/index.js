

const loadButtons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data=>displayButtons(data.data));
 };

 const displayButtons = (dataArray) => {

//     {
//     "id": 101,
//     "level_no": 1,
//     "lessonName": "Basic Vocabulary"
// }
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

//            <!-- {
//     "id": 94,
//     "level": 2,
//     "word": "Dance",
//     "meaning": "নৃত্য",
//     "pronunciation": "ডান্স"
// } -->
const displayLevel = (levelArray) => {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";
    if(levelArray.data.length == 0) {
        cardsContainer.innerHTML = `
        <div class="bg-[#F8F8F8] col-span-1 md:col-span-2 lg:col-span-3 p-8">
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
        cardDiv.classList.add("w-96");

        cardDiv.innerHTML = `
        <div class="card-body items-center text-center">
                <h2 class="card-title">${card.word}</h2>
                <p>Meaning /Pronounciation</p>
                <h2>${card.meaning} / ${card.pronunciation}</h2>
                <div class="w-full flex items-center justify-between px-14">
                <div class="bg-[#BADEFF26]">
                    <img class="w-6 h-6" src="https://img.icons8.com/?size=160&id=t4ujSfHW9WSb&format=png" alt="">
                </div>
                <div class="bg-[#BADEFF26]">
                    <img class="w-6 h-6" src="https://img.icons8.com/?size=96&id=108790&format=png" alt="">
                </div>
                </div>
            </div>
        `;
        cardsContainer.appendChild(cardDiv);
    });
};


loadButtons();
