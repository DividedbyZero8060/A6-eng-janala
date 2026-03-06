

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




loadButtons();
