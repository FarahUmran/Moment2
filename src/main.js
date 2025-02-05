

let courses = [];



window.onload = init;

function init() {

    loadcourse();

    // händelsehanterare för filter
    document.getElementById("search").addEventListener("input", filterData);


}



async function loadcourse() {
    try {
        let response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok) {
            throw new Error("fetch fel");
        }
        courses = await response.json();  // konverterar till json
        printCourses(courses);  // denna funktion ska ta data som är lagrad i variabeln  courses, ligger i global scope



    } catch (error) {
        console.error(error);  // denna rad avsedd för utvecklare för att kunna felsöka

        //om vi vill visa ett felmeddelande till användaren då skriver jag ut meddelandet nedan 
        // i DOM, jag har skapat en div i HTML koden för det
        document.getElementById("error").innerHTML = "Error, prova igen senare"

    }
}


// en funktion som tar emot data som skrivs ut som anropas i async funktionen ovan

function printCourses(data) {
    const tabellEl = document.querySelector("#tabell");

    // Rensar DOM:en först
    tabellEl.innerHTML = "";

    //skapat tabell
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    //skapat tabellhuvudet
    let arr = ["kod", "namn", "progression"];
    let theadTr = document.createElement("tr");
    arr.forEach(headerText => {
        let th = document.createElement("th");
        th.classList.add("sortering");
        th.id = "column-" + headerText; // Använder + för att skapa id
        th.textContent = headerText;
        theadTr.appendChild(th)
    });
    thead.appendChild(theadTr);
    table.appendChild(thead);


    //loppar igenom courses arrayen, ligger i global scope
    data.forEach(item => {
        let tbodyTr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.textContent = item.code;
        tbodyTr.appendChild(td1);


        let td2 = document.createElement("td");
        td2.textContent = item.coursename;
        tbodyTr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.textContent = item.progression;
        tbodyTr.appendChild(td3);

        tbody.appendChild(tbodyTr);
    })


    table.appendChild(tbody);
    tabellEl.appendChild(table);


    
        // Lägger till händelsehanterare för sortering efter att tabellen har skapats
        const sorteringHeaders = document.querySelectorAll(".sortering");
        sorteringHeaders.forEach(header => {
            header.addEventListener("click", sorteringsFunktion);
        });

}


function filterData() {
    const sook = document.getElementById("search").value.toLowerCase();

    //filtrerar
    const filterData = courses.filter(sak =>
        sak.coursename.toLowerCase().includes((sook).toLowerCase()) ||
        sak.code.toLowerCase().includes(sook)
    );


    printCourses(filterData);
}



function sorteringsFunktion(event) {
    const headerText = event.target.textContent.toLowerCase(); // Identifiera vilken kolumn som klickades på

    if (headerText === "kod") {
        courses.sort((a, b) => (a.code > b.code ? 1 : -1)); // Sortera efter kurskod
    } else if (headerText === "namn") {
        courses.sort((a, b) => (a.coursename > b.coursename ? 1 : -1)); // Sortera efter kursnamn
    } else if (headerText === "progression") {
        courses.sort((a, b) => (a.progression > b.progression ? 1 : -1)); // Sortera efter progression
    }

    printCourses(courses); // Uppdaterar tabellen med den sorterade datan
}



const table = document.getElementById("tabell");
table.style.width = "100%";
table.style.backgroundColor = "#f5f5f5";
table.style.lineHeight = "1.7em";
table.style.borderCollapse = "collapse"; // Gör så att linjerna smälter ihop
table.style.border = "1px solid black"; // Lägg till kantlinjer
table.style.borderBottom = "1px solid black";

