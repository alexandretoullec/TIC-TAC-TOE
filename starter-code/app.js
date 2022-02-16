const infos = document.querySelector('.info')

const cells = document.querySelectorAll('.cell')

let verouillage = true;
let joueurEnCour = "X";

const x = document.createElement("img");
x.src = "./assets/icon-x.svg";

const o = document.createElement("img");
o.src = "./assets/icon-o.svg";

var block = document.getElementById("x");
block.appendChild(x);


// const x = document.createElement("img").src= "./assets/icon-o.svg";
// const y = document.getElementById('y');

console.log(x);

infos.innerHTML = `Au tour de ${joueurEnCour}`;

const alignementsGagnants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let partieEnCour = ["","","","","","","","",""];

cells.forEach(cell => {
    cell.addEventListener('click',clickSurCase)
})

function clickSurCase (e){
    const caseClick = e.target;
    const caseIndex = caseClick.getAttribute('data-index')

    if(partieEnCour[caseIndex] !== "" || !verouillage){
        return;
    }

    partieEnCour[caseIndex] = joueurEnCour;
    caseClick.innerHTML = joueurEnCour; 
    console.log(partieEnCour);

    validationResultats()

    
}

function validationResultats(){
    let finDePartie = false;

    for (let i = 0 ; i < alignementsGagnants.length; i++){

        const checkWin = alignementsGagnants[i];
        let a = partieEnCour[checkWin[0]]
        let b = partieEnCour[checkWin[1]]
        let c = partieEnCour[checkWin[2]]

        if(a === '' || b === '' || c===''){
            continue;
        }

        if(a===b & b===c){
            finDePartie = true;
            break;
        }

    }

    if(finDePartie){
        infos.innerText = `Le joueur ${joueurEnCour} a gagné`
        verouillage = false;
        return;
    }

    let matchNul = !partieEnCour.includes("");
    if(matchNul){
        infos.innerText='Match nul'
        verrouillage = false;
        return;
    }

    changementDeJoueur();
}

function changementDeJoueur() {
    joueurEnCour = joueurEnCour === "X"? "O" : "X";
    infos.innerText = `Au tour de ${joueurEnCour}` 
}
