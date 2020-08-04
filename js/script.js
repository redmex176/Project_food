"use stirct";

//Tabs

window.addEventListener("DOMContentLoaded", ()=> {
    let tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

        function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.add("hide");
                item.classList.remove("show", "fade");

            });

            tabs.forEach(item  => {
                item.classList.remove("tabheader__item_active");
            });
        }

        hideTabContent ();

        function showTabContent(i = 0) {
            tabsContent[i].classList.add("show", "fade");
            tabsContent[i].classList.remove("hide");
            tabs[i].classList.add("tabheader__item_active");
        }

        showTabContent();

        tabsParent.addEventListener("click", (event) => {
            let target = event.target;

            if(target && target.classList.contains("tabheader__item")){
                tabs.forEach((item,i) => {
                    if (item == target) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });

//Timer
        let deadline = "2020-08-10";

        function getRemainingTime(endTime) {
            let t = Date.parse(endTime) - Date.parse(new Date()),
                days = Math.floor((t / 86400000) % 24),
                hours = Math.floor((t / 3600000) % 60),
                minutes = Math.floor((t / 60000) % 60),
                seconds = Math.floor((t / 1000) % 60);
         
         return {
             "total": t,
             "days":days,
             "hours":hours,
             "minutes":minutes,
             "seconds":seconds
         }; 

        }

        function getZero(num) {
            if (num < 10) {
                return `0${num}`;
            }else {
                return num;
            }
        }

        function setClock(endTime, selector){ 
            let timer = document.querySelector(selector),
                days = document.querySelector("#days"),
                hours = document.querySelector("#hours"),
                minutes = document.querySelector("#minutes"),
                seconds = document.querySelector("#seconds"),
                timeInterval = setInterval(updateClock,1000);
                
                updateClock();

            function updateClock(){
                let t = getRemainingTime(endTime);

                if (timeInterval <= 0) {
                    clearInterval(timeInterval);
                }

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

            }
        }

        getRemainingTime(deadline);

        setClock(deadline, ".timer");

//Modal 
        let modal = document.querySelector(".modal"),
            modalCloseBtn = document.querySelector(".modal__close"),
            modalTrigger = document.querySelectorAll("[data-modal]"),
            modalTimer = setTimeout(openModal,300000000);

        function openModal() {
            modal.classList.add("show");
            document.body.style.overflow = "hidden";
            clearInterval(modalTimer);   
        }

        function closeModal() {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        }

        modalTrigger.forEach(item => {
            item.addEventListener("click", openModal);
        });

        modalCloseBtn.addEventListener("click",closeModal);

        modal.addEventListener("click", (event) => {
            if (event.target == modal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (event) => {
            if(event.code == "Escape" && modal.classList.contains("show")){
                closeModal();
            }
        });
       
        function scrollModal () {
            if (window.pageYOffset + document.documentElement.clientHeight == document.documentElement.scrollHeight){
                openModal(); 
                window.removeEventListener("scroll", scrollModal);
            }
        }
        
        window.addEventListener("scroll", scrollModal);

        
    //MenuCard 

    class MenuCard {

        constructor (src, alt, title, descr, price, parentSelector) { 
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.cost = 70;
            this.changeToRub();
            this.parent = document.querySelector(parentSelector);
        }

        changeToRub() {
           this.price = this.price * this.cost;
        }

        createMenu() {
            let element = document.createElement("div");

            element.innerHTML = `<div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
        </div>`;

        this.parent.append(element);
        }
        
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        3,
        ".menu .container"

    ).createMenu();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        5,
        ".menu .container"

    ).createMenu();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        4,
        ".menu .container"

    ).createMenu();

});
