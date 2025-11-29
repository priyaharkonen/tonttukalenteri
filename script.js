// ============================================================
//  MODE + DOOR LOCKING
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    const now = new Date();
    const today = (now.getMonth() === 11) ? now.getDate() : 24;  // December only

    const dayButtons = document.querySelectorAll(".dayBox");

    dayButtons.forEach(button => {
        const d = parseInt(button.dataset.day);

        // Lock future days
        if (d > today) {
            button.disabled = true;
            button.classList.add("locked");
        }

        // Normal click opens day page
        button.addEventListener("click", () => {
            if (!button.disabled) {
                window.location.href = `days/day${d}.html`;
            }
        });
    });

    // ============================================================
    // SIMPLE REVEAL SYSTEM (NEW FUNCTIONALITY)
    // ============================================================

    const revealToggle = document.getElementById("revealToggle");
    const revealPanel  = document.getElementById("revealPanel");
    const revealList   = document.getElementById("revealList");

    const openAll      = document.getElementById("openAll");
    const closeAll     = document.getElementById("closeAll");
    const openUntilToday = document.getElementById("openUntilToday");

    // ----- Build 1–24 small buttons -----
    if (revealList) {
        for (let i = 1; i <= 24; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("reveal-item");
            btn.dataset.day = i;

            revealList.appendChild(btn);

            // Toggle the big door open/closed
            btn.addEventListener("click", () => {
                const bigDoor = document.querySelector(`.dayBox[data-day="${i}"]`);

                if (bigDoor) {
                    bigDoor.disabled = !bigDoor.disabled;  // toggle disabled

                    if (bigDoor.disabled) {
                        bigDoor.classList.add("locked");
                    } else {
                        bigDoor.classList.remove("locked");
                    }
                }

                btn.classList.toggle("selected");
            });
        }
    }

    // ----- Open panel -----
    if (revealToggle) {
        revealToggle.addEventListener("click", () => {
            revealPanel.classList.toggle("open");
        });
    }

    // ----- AVAA KAIKKI -----
    if (openAll) {
        openAll.addEventListener("click", () => {
            dayButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove("locked");
            });
        });
    }

    // ----- SULJE KAIKKI -----
    if (closeAll) {
        closeAll.addEventListener("click", () => {
            dayButtons.forEach(btn => {
                btn.disabled = true;
                btn.classList.add("locked");
            });
        });
    }

    // ----- Reset to real calendar (avaa luukut tähän päivään asti) -----
    if (openUntilToday) {
        openUntilToday.addEventListener("click", () => {
            dayButtons.forEach(btn => {
                const d = parseInt(btn.dataset.day);
                btn.disabled = d > today;
                btn.classList.toggle("locked", d > today);
            });
        });
    }

});  // END DOMContentLoaded
    
                const questions = [
      
        {question:"Mitä joulu alun perin juhlistaa?",
            answers: [
                {text:"Kevään tuloa", correct: false},
                {text:"Jeesuksen syntymää", correct: true},
                {text:"Talven loppua", correct:false}
            ]
        },//2
        {question:"Missä joulupukin koti sijaitsee Suomessa?",
            answers:[
                {text:"Lapissa, Korvatunturilla", correct: true},
                {text:"Helsingissä", correct: false},
                {text:"Kuusamo", correct: false}
            ]
        },//3
        {question:"Kuka oli Joulupukin tarinan esikuva?",
            answers: [
                {text:"Pyhä Nikolaus", correct: true},
                {text:"Pyhä Johannes", correct: false},
                {text:"Talven loppua", correct:false}
            ]
        },//4
        {question:"Mikä on yksi tontun tehtävistä?",
            answers: [
                {text:"Pelotella lapsia", correct: false},
                {text:"Valvoa, että lapset ovat käyttäytyvät kiltisti", correct: true},
                {text:"Jakaa lahjoja jouluaattona  ", correct:false}
            ]
        }, //5
        {question:"Mikä eläin vetää joulupukin rekeä?  ",
            answers: [
                {text: "Hevonen", correct: false},
                {text: "Porot", correct: true},
                {text: "Koira ", correct:false}
            ]
        },//6
        {question:"Minä vuonna Suomi itsenäistyi?",
            answers: [
                {text: "1901", correct: false},
                {text: "1947", correct: false},
                {text: "1917", correct: true}
            ]
        }, //7   
         {question:"Mikä on joulukalenterin tarkoitus?",
            answers: [
                {text: "Laskea päiviä jouluun", correct: true},
                {text: "Opettaa matematiikkaa", correct: false},
                {text: "Korvata joululahjat", correct:false}
            ]
        },  //8-1
          
        {question:"Missä maasa lapset jättävät kengät oven eteen 6. joulukuuta saadakseen lahjoja Pyhältä Nikolaus-piispalta?",
            answers: [
                {text: "Ranska", correct: false},
                {text: "Italia", correct: false},
                {text: "Saksa", correct:true}
            ]
        }, //9-2 
        {question:"Missä maassa joulua vietetään kesällä, ja ihmiset kokoontuvat rannalle grillaamaan ja laulamaan joululauluja shortseissa?",
            answers: [
                {text: "Kanada", correct: false},
                {text: "Australia", correct: true},
                {text: "Etelä-Afrikka", correct:false}
            ]
        },  //10-3
        {question:"Missä maassa lahjat jaetaan usein vasta Loppiaisena (6.1.) kolmen tietäjän kunniaksi",
            answers: [
                {text: "Norja", correct: false},
                {text: "Ranska", correct: false},
                {text: "Espanja", correct:true}
            ]
        }, //11-4
        {question:"Mikä ohjelma lähetetään Ruotsissa klo 15 jouluaattona?",
            answers: [
                {text: "ABBA-dokumentti", correct: false},
                {text: "Disney-hahmojen lastenohjelma ”Kalle Anka”", correct: true},
                {text: "”Peppi pelastaa joulun” -animaatio (alkup.nim.”Pippi räddar julen”)", correct: false}
            ]
        }, //12-5
         {question:"Missä maassa juhlitaan Las Posadas -perinnettä, jossa kuljetaan ovelta ovelle kuin Maria ja Joosef? ",
            answers: [
                {text: "Chile", correct: false},
                {text: "Meksiko", correct: true},
                {text: "Brasilia", correct: false}
            ]
        },//13-6
        {question:"Kuka oli vuoden 2024 Lucia-neito, Helsingissä järjestettävässä Lucia-kulkueessa?",
            answers: [
                {text: "Madeleine Amoroso", correct: false},
                {text: "Wilma Grönqvist", correct: false},
                {text: "Daniela Owusu", correct: true}
            ]
        }, //14-7
        {question:"Missä maassa joulun aikaan piilotetaan luudat, jotta noidat eivät pääse lentämään niillä?",
            answers: [
                {text: "Norja", correct: true},
                {text: "Islanti", correct: false},
                {text: "Ruotsi", correct: false}
            ]
        }, //15-1
         {question:"Missä maassa jouluna syödään perinteisesti paistettua kanaa KFC:stä?",
            answers: [
                {text: "Etelä-Korea", correct: false},
                {text: "Japani", correct: true},
                {text: "Kiina", correct: false}
            ]
        }, //16-2
        {question:"Missä maassa joulupöytään kuuluu usein seitsemän erilaista kala-annosta? ",
            answers: [
                {text: "Portugali", correct: false},
                {text: "Italia", correct: true},
                {text: "Ranska", correct: false}
            ]
        },//17-3
    
     {question:"Missä maassa jouluruokaan kuuluu usein “hallaca” eli maissitaikinasta tehty täytetty nyytti, joka kääritään banaaninlehteen?",
            answers: [
                {text: "Venezuela", correct: true},
                {text: "Kolumbia", correct: false},
                {text: "Ecuador", correct: false}
            ]
        },//18-4
    
        {question:"Missä maassa joulun aikaan nautitaan “pierogi”-nyyttejä ja punajuurikeittoa nimeltä “barszcz”? ",
            answers: [
                {text: "Slovakia", correct: false},
                {text: "Puola", correct: true},
                {text: "Venäjä", correct: false}
            ]
        },//19-5
         {question:"Missä maassa nautitaan panettonea, makea hedelmäkakkua?",
            answers: [
                {text: "Venezuela", correct: false},
                {text: "Iso-Britannia", correct: false},
                {text: "Italia", correct: true}
            ]
        },//20-6
         {question:"Minkä seuraavista voit löytää vielä suomalaisesta joulupöydästä?",
            answers: [
                {text: "Janssoninkiusaus", correct: false},
                {text: "Rosolli", correct: true},
                {text: "Yorkshire pudding", correct: false}
            ]
        },//21-7
         {question:"Kuinka monikulmainen on perinteinen joulutortun tähti makea, hedelmäinen leivonnainen, jota nautitaan usein joulun aikaan?",
            answers: [
                {text: "Nelikulmainen", correct: true},
                {text: "Viisikulmainen", correct: false},
                {text: "Kuusikulmainen", correct: false}
            ]
        },//22-1
         {question:"Minkä niminen hahmo esiintyy hollantilaisessa jouluperinteessä ja saapuu laivalla Espanjasta tuomaan lahjoja? ",
            answers: [
                {text: "Sinterklaas", correct: true},
                {text: "Pietari Pyhä", correct: false},
                {text: "Nikolaus Mereltä", correct: false}
            ]
        },//23-2
         {question:"Minkä niminen hahmo esiintyy vanhoissa suomalaisissa tarinoissa ja asuu metsän keskellä, joskus yhdistettynä joulupukkiin?",
            answers: [
                {text: "Tapio", correct: true},
                {text: "Ukko", correct: false},
                {text: "Metsänhsltija", correct: false}
            ]
        },
    ]
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function getRandomQuestions(n) {
        const shuffled = shuffleArray([...questions]);
        return shuffled.slice(0, n);
    }
    
    function showFinalTest() {
        const testQuestions = getRandomQuestions(7);
        let currentIndex = 0;
        let correctCount = 0;
    
        const questionElement = document.getElementById("question");
        const buttonsDiv = document.getElementById("answer-buttons");
        const vastausEl = document.getElementById("vastaus");
        const backBtn = document.getElementById("back-btn");
    
        function showQuestion(index) {
            const q = testQuestions[index];
            questionElement.textContent = `Kysymys ${index+1}/7: ${q.question}`;
            buttonsDiv.innerHTML = "";
            vastausEl.innerHTML = "";
    
            q.answers.forEach(answer => {
                const btn = document.createElement("button");
                btn.textContent = answer.text;
                btn.classList.add("btn", "answer-btn");
                buttonsDiv.appendChild(btn);
    
                btn.addEventListener("click", () => {
                    if(answer.correct){
                        correctCount++;
                    }
    
                    if(index < testQuestions.length - 1){
                        showQuestion(index+1);
                    } else {
     
                        buttonsDiv.innerHTML = "";
                        if(correctCount >= 5){
                            vastausEl.innerHTML = `🎉 Vastasit oikein ${correctCount}/7 → Testi läpäisty! Hyvää joulua!`;
                            backBtn.textContent = "takaisin";
                            backBtn.onclick = () => window.location.href="../index.html";
                        } else {
                            vastausEl.innerHTML = `❌ Vastasit oikein ${correctCount}/7 → Testi ei läpäisty, yritä uudestaan!`;
                            backBtn.textContent = "Aloita uudestaan";
                            backBtn.onclick = () => showFinalTest();
                        }
                    }
                });
            });
        }
    
        showQuestion(currentIndex);
    }
    
    function showQuestionForDay(dayNumber) {
        const questionElement = document.getElementById("question");
        const buttonsDiv = document.getElementById("answer-buttons");
        const vastausEl = document.getElementById("vastaus");
        const backBtn = document.getElementById("back-btn");
    
        //clean old buttons
        buttonsDiv.innerHTML = "";
        vastausEl.innerHTML = "";
    
        const q = questions[dayNumber - 1];
        questionElement.textContent = q.question;
    
        //buttons
        q.answers.forEach(answer => {
            const btn = document.createElement("button");
            btn.textContent = answer.text;
            btn.classList.add("btn"); 
            btn.classList.add("answer-btn");
            buttonsDiv.appendChild(btn);
        btn.addEventListener("click", () => {
            const vastausEl = document.getElementById("vastaus");
            if(answer.correct){
            vastausEl.innerHTML = '<i class="fa-solid fa-calendar-check"></i> oikein!';
                backBtn.textContent = "takaisin"
                backBtn.onclick = () => {
                window.location.href = "../index.html";
    }
            } else {
                vastausEl.innerHTML = '<i class="fa-solid fa-rotate-left"></i> väärin, yritä uudestaan!';
                const backBtn = document.getElementById("back-btn");
                backBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
                backBtn.onclick = () => {
                 showQuestionForDay(dayNumber); // restart the same question
    };        }
        });
        });
    }
    
    
    const leftTree = document.querySelector('.tree.leftTree');
    const rightTree = document.querySelector('.tree.rightTree');
    
    const leftClick = document.querySelector('.tree-click.leftTree');
    const rightClick = document.querySelector('.tree-click.rightTree');
    
    const lightsOff = "../images/treeLightsOf.png";
    const lightsOn = '../images/treeLightsOn.png';
    
    let leftOn = true;
    let rightOn = true;
    
    if (leftClick && rightClick && leftTree && rightTree) {
        leftClick.addEventListener('click', () => {
            leftTree.src = leftOn ? lightsOff : lightsOn;
            leftOn = !leftOn;
        });
    
        rightClick.addEventListener('click', () => {
            rightTree.src = rightOn ? lightsOff : lightsOn;
            rightOn = !rightOn;
        }); 
    }