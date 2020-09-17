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
        let deadline = "2020-10-10";

        function getRemainingTime(endTime) {
            let t = Date.parse(endTime) - Date.parse(new Date()),
                days = Math.floor((t / 86400000)),
                hours = Math.floor((t / 3600000) % 24),
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

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if ( t.total <= 0) {
                    clearInterval(timeInterval);
                    days.innerHTML = 0;
                    hours.innerHTML = 0;
                    minutes.innerHTML = 0;
                    seconds.innerHTML = 0;
                }
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
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.transfer = 73;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.changeToRub();

      }
      changeToRub() {
          this.price = this.price * this.transfer;
      }
      renderCard() {
          let element = document.createElement("div");

        if(this.classes.length == 0 ){
            this.classes = "menu__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => {
                element.classList.add(className);
             });
        }
           
           element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
          </div>
          `;
          this.parent.append(element);
      }
      
  }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        3,
        ".menu .container",
        

    ).renderCard();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        5,
        ".menu .container",



    ).renderCard();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        4,
        ".menu .container",


    ).renderCard();

    //Forms

  let forms = document.querySelectorAll("form");

  let message = {
      loading: "Загрузка",
      success: "Спасибо! Скоро мы с вами свяжемся",
      failure: "Что-то пошло не так"
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form){
    form.addEventListener("submit", (e)=> {
        e.preventDefault();

        let statusMessage = document.createElement("div");
    statusMessage.classList.add("status");
    statusMessage.textContent = message.loading;
    form.append(statusMessage);
    
    let formData = new FormData(form),
        request = new XMLHttpRequest(),
        object = {};

    formData.forEach(function(value, key){
        object[key] = value;
    });
    
    let json = JSON.stringify(object);

    request.open("POST", "server.php");
    request.setRequestHeader("Content-type", "application/json");
    request.send(json);

    request.addEventListener("load", ()=> {
        if (request.status === 200){
            console.log(request.response);
            statusMessage.textContent = message.success;
            form.reset();
            setTimeout(()=>{
                statusMessage.remove();
            },2000);
        }else {
            statusMessage.textContent = message.failure;
        }
      });
    });
  }
});
