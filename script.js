// broj indeksa : 177

let ucitaniPodaci = false;
let podaciNiz = [];

const podaci = () => {

    if(ucitaniPodaci){
        alert('Podaci su vec ucitani!');
        return false;
    }

    fetch('https://restapiexample.wrd.app.fit.ba/Ispit20220625/Get6Ponuda')
        .then(response => {
            if(!response.ok) {
                throw Error(response);
            }
            return response.json();
        })
        .then(data => {
            prikaziPodatke(data);
            podaciNiz = data;
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })

        ucitaniPodaci = true;
}

const prikaziPodatke = podaci => {
    const containter = document.getElementById('spoljni');
    
    podaci.forEach(podatak => {
        const prviDiv = document.createElement('div');
        prviDiv.setAttribute('style', 'width:16.667%');

        const id = document.createElement('h4');
        id.innerHTML = podatak.id;
        prviDiv.appendChild(id);

        const drzava = document.createElement('h4');
        drzava.innerHTML = podatak.drzava;
        prviDiv.appendChild(drzava);

        const cijena = document.createElement('h4');
        cijena.innerHTML = podatak.cijena;
        prviDiv.appendChild(cijena);

        const slika = document.createElement('img');
        slika.setAttribute('src', `${podatak.slikaUrl}`);
        slika.setAttribute('style', 'width:300px');
        prviDiv.appendChild(slika);

        const rezerviraj = document.createElement('button');
        rezerviraj.innerHTML = 'Rezerviraj';
        rezerviraj.setAttribute('onclick', `dodajRezervaciju('${podatak.id}')`);
        prviDiv.appendChild(rezerviraj);

        containter.appendChild(prviDiv);
    });
}

const dodajRezervaciju = id => {
    const formaID = document.getElementById('putovanjeID');
    formaID.value = id;
}

const posaljiNarudzbu = () => {
    const imeForma = document.getElementById('ime').value;
    const prezimeForma = document.getElementById('prezime').value;
    const adresaForma = document.getElementById('adresa').value;
    const putovanjeIDForma = document.getElementById('putovanjeID').value;
    const komadaForma = document.getElementById('komada').value;
    const emailForma = document.getElementById('email').value;

    if(!imeForma || !prezimeForma || !adresaForma ||!putovanjeIDForma || !komadaForma || !emailForma) {
        alert('Morate unijeti sve podatke!');
        return false;
    }

    const objekat = {
        ime: imeForma,
        prezime: prezimeForma,
        adresa: adresaForma,
        putovanjeID: putovanjeIDForma,
        komada: komadaForma,
        email: emailForma
    }

    console.log(objekat);
}

// ------------------------ DODATNA FUNKCIONALNOST ------------------------------
// ---------------------------------BONUS ---------------------------------------

const budgetSave = () => {

    if(podaciNiz.length === 0) {
        alert('Prvo morate ucitati podatke!');
        return false;
    }

    //u varijablu najjeftiniji se smjesta objekat sa najmanjom cijenom
    const najjeftiniji = podaciNiz.reduce((prethodni, trenutni) => {
        return (prethodni.cijena < trenutni.cijena ? prethodni : trenutni);
    })
    //putovanje s najmanjom cijenom se dobija metodom reduce za ucitani niz podataka

    console.log(najjeftiniji);
    const mjestoZaPrikaz = document.getElementById('najjeftinijePutovanje');
    mjestoZaPrikaz.innerHTML = `Drzava: ${najjeftiniji.drzava} i Cijena: ${najjeftiniji.cijena} KM`;
}