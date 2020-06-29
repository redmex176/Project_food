window.addEventListener("DOMContentLoaded", () => {

    //Tabs---------------------------

    let tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.add("hide");
                item.classList.remove("show", "fade");
            });

            tabs.forEach(item => {
                item.classList.remove("tabheader__item_active");
            });
        }
    
    function showTabContent(i = 0){
        
        tabsContent[i].classList.add("show","fade");
        tabsContent[i].classList.remove("hide");
        
        tabs[i].classList.add("tabheader__item_active");
    } 

    hideTabContent();
    showTabContent();

   tabsParent.addEventListener("click", (event) => {
        let target = event.target;

        if(target && target.classList.contains("tabheader__item")){
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    }); 

    //Timer---------------------------

    let deadline = "2020-07-01";

        function getRemainingTime(endTime) {
            let t = Date.parse(endTime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000  / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);
            
            return {
                    "tottal": t,
                    "days": days,
                    "hours": hours,
                    "minutes": minutes,
                    "seconds": seconds
                };
        }
        
        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        function setClock (selector,endTime) {
            let timer = document.querySelector(selector),
                days = document.querySelector("#days"),
                hours = document.querySelector("#hours"),
                minutes = document.querySelector("#minutes"),
                seconds = document.querySelector("#seconds"),
                timeInterval = setInterval(updateClock, 1000);

                updateClock(); 
                
            function updateClock() {
                let t = getRemainingTime(endTime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if(t.tottal <= 0){
                    clearInterval(timeInterval);
                }
            }
        }
        setClock(".timer",deadline);
        console.log(deadline);
        
});