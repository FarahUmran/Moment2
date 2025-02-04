
window.onload = init;

function init() {

    loadcourse();
}



async function loadcourse(){
    try{
        let response = await fetch ("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if(response.ok){
            let data = await response.json();
            document.getElementById("tabell").innerHTML = ""; // tämmer tidigare innehåll-lista
            // sen anropar jag en funktion som jag kommer att skapa nedan för en tabell, den ehetr table1
            table1(data);   // jag har data som argument i table1 funktionen, det är data som kommer från länken ovan, vi fetchar ifrån den 
        }
        // jag kunde också skapa en else-sats här .. men är lite för lat
    } catch (error) {
        console.log(error);
    }
}

