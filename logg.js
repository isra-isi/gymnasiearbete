//personligheter namn, gränser 
//vänter grupper visas inte. höger grupper namn visas
var PERSONLIGHETER = {
  openness: {
    namn: "Openness",
    text: "Du litar på det du ser och går gärna med på saker. Du är en person som andra kan förlita sig på."
  },
  conscientiousness: {
    namn: "Conscientiousness",
    text: "Du bryr dig mycket och märker direkt när något inte fungerar som det ska. Du ger inte upp utan att säga ifrån."
  },
  extraversion: {
    namn: "Extraversion",
    text: "Du fattar beslut snabbt och går på känsla. Du vill framåt och slösar inte tid på detaljer."
  },
  agreeableness: {
    namn: "Agreeableness",
    text: "Du tar dig tid att tänka igenom varje steg. Du vill göra rätt hellre än fort."
  },
  neuroticism: {
    namn: "Neuroticism",
    text: "Du håller ett jämnt tempo och låter dig inte stressas. Du är en trygg person att ha omkring sig."
  }
};

// Gränser för vilken grupp man hamnar i. Ändra siffrorna fritt.
var GRANSER = {
  popupsKlickade: 5,   // så här många pop-ups klickade på => "openness"
  manyFelklick: 15,    // så här många felklick eller fler => "conscientiousness"
  snabbSek: 180,        // snabbare än så här många sekunder => "extraversion"
  langsamSek: 360,      // långsammare än så här många sekunder => "agreeableness"
};

// Regeln: den första som stämmer vinner (uppifrån och ner)
function valjTyp(l) {
  var sek = l.tidMs / 1000;
  if (l.popupsKlickade >= GRANSER.popupsKlickade && l.felklick <= GRANSER.felklick && sek < GRANSER.langsamSek) return "openness";
  if (l.felklick >= GRANSER.felklick && l.popupsKlickade < GRANSER.popupsKlickade && sek < GRANSER.langsamSek && sek >= GRANSER.snabbSek) return "conscientiousness";
  if (sek < GRANSER.snabbSek && l.felklick < GRANSER.felklick && l.popupsKlickade > GRANSER.popupsKlickade) return "extraversion";
  if (sek > GRANSER.langsamSek && l.felklick < GRANSER.felklick && l.popupsKlickade < GRANSER.popupsKlickade) return "neuroticism";
  return "agreeableness";
}

// Gör om millisekunder till text, till exempel "2 min 35 s"
function formatTid(ms) {
  var s = Math.round(ms / 1000);
  var min = Math.floor(s / 60);
  var rest = s % 60;
  return min > 0 ? min + " min " + rest + " s" : rest + " s";
}



// logg.js – samlar beteendedata i localStorage
function hamtaLogg() {
  try {
    return JSON.parse(localStorage.getItem("beteende"));
  } catch (e) {
    return null;
  }
}

function sparaLogg(l) {
  try {
    localStorage.setItem("beteende", JSON.stringify(l));
  } catch (e) {}
}

function startaLogg() {
  if (hamtaLogg()) return;
  sparaLogg({
    start: Date.now(),
    slut: null,
    tidMs: null,
    felklick: 0,
    popupsStangda: 0,
    popupsKlickade: 0
  });
}

function loggaFelklick() {
  const l = hamtaLogg();
  if (!l) return;
  l.felklick++;
  sparaLogg(l);
}

function loggaPopup(typ) { // "stangd" eller "klickad"
  const l = hamtaLogg();
  if (!l) return;
  if (typ === "stangd") l.popupsStangda++;
  if (typ === "klickad") l.popupsKlickade++;
  sparaLogg(l);
}

function loggaSlut() {
  const l = hamtaLogg();
  if (!l || l.slut) return;
  l.slut = Date.now();
  l.tidMs = l.slut - l.start;
  sparaLogg(l);
}

function nollstallLogg() {
  localStorage.removeItem("beteende");
}

// Klick som inte träffar något klickbart räknas som felklick
document.addEventListener("click", (e) => {
  if (!e.target.closest("button, a, input, select, label, .steg")) loggaFelklick();
});