import { useState, useEffect } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  TRANSLATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const T = {
  en: {
    appName:"FarmLogic", tagline:"Farm Management Suite",
    dashboard:"Dashboard", livestock:"Livestock", workers:"Workers",
    salaries:"Salaries", leave:"Leave", bookkeeping:"Bookkeeping",
    inventory:"Inventory", vetlog:"Vet & Health", grazing:"Grazing",
    feed:"Feed Calculator", roi:"ROI & Profit", slaughter:"Slaughter Records", tax:"Tax & Payroll",
    totalAnimals:"Total Animals", totalWorkers:"Total Workers",
    monthlyPayroll:"Monthly Payroll", netProfit:"Net Profit (YTD)",
    cattle:"Cattle", sheep:"Sheep", goats:"Goats", pigs:"Pigs",
    addAnimal:"Add Animal", tagNumber:"Tag / ID", breed:"Breed",
    gender:"Gender", dob:"Date of Birth", weight:"Weight (kg)",
    status:"Status", notes:"Notes", save:"Save", cancel:"Cancel",
    edit:"Edit", delete:"Delete", male:"Male", female:"Female",
    active:"Active", sold:"Sold", deceased:"Deceased",
    addWorker:"Add Worker", workerName:"Full Name", idNumber:"ID Number",
    position:"Position", startDate:"Start Date", basicSalary:"Basic Salary (N$)",
    phone:"Phone", farm:"Farm",
    leaveType:"Leave Type", leaveStart:"From", leaveEnd:"To", leaveStatus:"Status",
    applyLeave:"Apply Leave", annual:"Annual", sick:"Sick Leave", family:"Family",
    approved:"Approved", pending:"Pending", rejected:"Rejected",
    generatePayslip:"Generate Payslip", payslip:"Payslip",
    netPay:"Net Pay", grossPay:"Gross Pay", search:"Search...",
    noRecords:"No records found", confirmDelete:"Are you sure you want to delete this record?",
    logout:"Logout", close:"Close", username:"Username",
    password:"Password", loginBtn:"Sign In", wrongCredentials:"Invalid username or password",
    addTransaction:"Add Transaction", transDate:"Date", description:"Description",
    category:"Category", amount:"Amount (N$)", type:"Type", income:"Income", expense:"Expense",
    totalIncome:"Total Income", totalExpenses:"Total Expenses",
    addItem:"Add Item", itemName:"Item Name", itemCategory:"Category",
    quantity:"Quantity", unit:"Unit", minStock:"Min Stock Alert", lowStock:"Low Stock",
    addVetRecord:"Add Health Record", animal:"Animal", medicine:"Medicine",
    dosage:"Dosage", vetDate:"Date", vetNotes:"Notes", nextDue:"Next Due", vetType:"Record Type",
    addCamp:"Add Camp / Paddock", campName:"Camp Name", campSize:"Size (ha)",
    campStatus:"Status", inUse:"In Use", resting:"Resting", available:"Available",
    animalCount:"Animals", lastGrazed:"Last Grazed", rotateIn:"Move In", rotateOut:"Move Out", waterPoint:"Water Point",
    // Feed
    feedCalc:"Feed Calculator", animalType:"Animal Type", headCount:"Number of Animals",
    avgWeight:"Average Live Weight (kg)", suppPrice:"Supplement Price (N$/kg)",
    roughagePrice:"Roughage Price (N$/kg)", calcFeed:"Calculate",
    suppRatio:"Supplement (80%)", roughageRatio:"Roughage (20%)",
    dailySupp:"Daily Supplement", dailyRoughage:"Daily Roughage",
    totalDailyFeed:"Total Daily Feed", dailyCost:"Daily Feed Cost",
    monthlyCost:"Monthly Feed Cost", suppBrand:"Supplement Brand",
    feedPerHead:"Per Head / Day", feedNote:"Based on 80% supplement / 20% roughage ratio",
    // ROI
    roiDashboard:"ROI Dashboard", purchaseCost:"Purchase Cost (N$)",
    feedCostTotal:"Total Feed Cost (N$)", vetCostTotal:"Total Vet Cost (N$)",
    saleValue:"Sale / Slaughter Value (N$)", roi:"ROI %", profit:"Profit (N$)",
    addRoiRecord:"Add Animal ROI", roiAnimalId:"Animal Tag / ID",
    labourAlloc:"Labour Allocation (N$)", roiFarm:"Farm",
    // Slaughter
    addSlaughter:"Add Slaughter Record", slaughterDate:"Slaughter Date",
    liveWeight:"Live Weight (kg)", carcassWeight:"Carcass Weight (kg)",
    dressingPct:"Dressing %", pricePerKg:"Price per kg (N$)",
    totalValue:"Total Value (N$)", grade:"Grade", abattoir:"Abattoir",
    // Tax — Namibia 2024/25
    taxYear:"Tax Year 2024/25", taxableIncome:"Taxable Income",
    taxPayable:"Tax Payable", effectiveRate:"Effective Rate",
    sscEmployee:"SSC Employee (0.9%)", sscEmployer:"SSC Employer (1.8%)",
    vatRate:"VAT Rate (15%)", annualTaxReport:"Annual Tax Report",
    paye:"PAYE", totalCTC:"Cost to Company",
  },
  af: {
    appName:"FarmLogic", tagline:"Plaasbestuurspakket",
    dashboard:"Paneelbord", livestock:"Vee", workers:"Werkers",
    salaries:"Salarisse", leave:"Verlof", bookkeeping:"Boekhouding",
    inventory:"Voorraad", vetlog:"Veearts & Gesondheid", grazing:"Weiding",
    feed:"Voerberekening", roi:"OOI & Wins", slaughter:"Slagrekords", tax:"Belasting & Betaalstaat",
    totalAnimals:"Totale Diere", totalWorkers:"Totale Werkers",
    monthlyPayroll:"Maandelikse Betaalstaat", netProfit:"Netto Wins (JTD)",
    cattle:"Beeste", sheep:"Skape", goats:"Bokke", pigs:"Varke",
    addAnimal:"Voeg Dier By", tagNumber:"Merk / ID", breed:"Ras",
    gender:"Geslag", dob:"Geboortedatum", weight:"Gewig (kg)",
    status:"Status", notes:"Notas", save:"Stoor", cancel:"Kanselleer",
    edit:"Wysig", delete:"Verwyder", male:"Manlik", female:"Vroulik",
    active:"Aktief", sold:"Verkoop", deceased:"Oorlede",
    addWorker:"Voeg Werker By", workerName:"Volle Naam", idNumber:"ID Nommer",
    position:"Posisie", startDate:"Begindatum", basicSalary:"Basiese Salaris (N$)",
    phone:"Telefoon", farm:"Plaas",
    leaveType:"Verloftipe", leaveStart:"Vanaf", leaveEnd:"Tot", leaveStatus:"Status",
    applyLeave:"Dien Verlof In", annual:"Jaarlikse", sick:"Siekverlof", family:"Familie",
    approved:"Goedgekeur", pending:"Uitstaande", rejected:"Afgekeur",
    generatePayslip:"Genereer Betaalstrook", payslip:"Betaalstrook",
    netPay:"Netto Betaling", grossPay:"Bruto Betaling", search:"Soek...",
    noRecords:"Geen rekords gevind nie", confirmDelete:"Wil jy hierdie rekord verwyder?",
    logout:"Teken Uit", close:"Sluit", username:"Gebruikersnaam",
    password:"Wagwoord", loginBtn:"Teken In", wrongCredentials:"Ongeldige besonderhede",
    addTransaction:"Voeg Transaksie By", transDate:"Datum", description:"Beskrywing",
    category:"Kategorie", amount:"Bedrag (N$)", type:"Tipe", income:"Inkomste", expense:"Uitgawe",
    totalIncome:"Totale Inkomste", totalExpenses:"Totale Uitgawes",
    addItem:"Voeg Item By", itemName:"Itemnaam", itemCategory:"Kategorie",
    quantity:"Hoeveelheid", unit:"Eenheid", minStock:"Min Voorraadwaarskuwing", lowStock:"Lae Voorraad",
    addVetRecord:"Voeg Gesondheidsrekord By", animal:"Dier", medicine:"Medisyne",
    dosage:"Dosis", vetDate:"Datum", vetNotes:"Notas", nextDue:"Volgende Datum", vetType:"Rekordtipe",
    addCamp:"Voeg Kamp By", campName:"Kampnaam", campSize:"Grootte (ha)",
    campStatus:"Status", inUse:"In Gebruik", resting:"Rustend", available:"Beskikbaar",
    animalCount:"Diere", lastGrazed:"Laas Bewei", rotateIn:"Beweeg In", rotateOut:"Beweeg Uit", waterPoint:"Waterpunt",
    feedCalc:"Voerberekening", animalType:"Diersoort", headCount:"Aantal Diere",
    avgWeight:"Gemiddelde Lewende Gewig (kg)", suppPrice:"Aanvullingskoste (N$/kg)",
    roughagePrice:"Ruvoerprys (N$/kg)", calcFeed:"Bereken",
    suppRatio:"Aanvulling (80%)", roughageRatio:"Ruvoer (20%)",
    dailySupp:"Daaglikse Aanvulling", dailyRoughage:"Daaglikse Ruvoer",
    totalDailyFeed:"Totale Daaglikse Voer", dailyCost:"Daaglikse Voerkoste",
    monthlyCost:"Maandelikse Voerkoste", suppBrand:"Aanvullingsnaam",
    feedPerHead:"Per Dier / Dag", feedNote:"Gebaseer op 80% aanvulling / 20% ruvoer verhouding",
    roiDashboard:"OOI Paneelbord", purchaseCost:"Aankoopkoste (N$)",
    feedCostTotal:"Totale Voerkoste (N$)", vetCostTotal:"Totale Veeartskoste (N$)",
    saleValue:"Verkoop / Slagwaarde (N$)", roi:"OOI %", profit:"Wins (N$)",
    addRoiRecord:"Voeg Dier OOI By", roiAnimalId:"Dier Merk / ID",
    labourAlloc:"Arbeidstoewysing (N$)", roiFarm:"Plaas",
    addSlaughter:"Voeg Slagrekord By", slaughterDate:"Slagdatum",
    liveWeight:"Lewende Gewig (kg)", carcassWeight:"Karkasmassa (kg)",
    dressingPct:"Uitslagpersentasie %", pricePerKg:"Prys per kg (N$)",
    totalValue:"Totale Waarde (N$)", grade:"Graad", abattoir:"Abattoir",
    taxYear:"Belastingjaar 2024/25", taxableIncome:"Belasbare Inkomste",
    taxPayable:"Belasting Betaalbaar", effectiveRate:"Effektiewe Koers",
    sscEmployee:"SSC Werknemer (0.9%)", sscEmployer:"SSC Werkgewer (1.8%)",
    vatRate:"BTW Koers (15%)", annualTaxReport:"Jaarlikse Belastingverslag",
    paye:"PAYE", totalCTC:"Koste vir Maatskappy",
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SEED DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ── SUBCATEGORY DEFINITIONS ─────────────────────────────────
const SUBCATS = {
  cattle: ["Cow","Heifer","Tolly","Bull","Ox","Calf","Weaner"],
  sheep:  ["Ewe","Ram","Lamb","Wether","Ewe Lamb","Ram Lamb"],
  goats:  ["Doe","Buck","Kid","Wether"],
  pigs:   ["Sow","Boar","Piglet","Weaner"],
  horses: ["Mare","Stallion","Gelding","Filly","Colt","Foal"],
};

const SPECIES_PREFIX = {cattle:"C",sheep:"S",goats:"G",pigs:"P",horses:"H"};

const seedAnimals = [];

// ── FARM IMPLEMENTS SEED ─────────────────────────────────────
const seedImplements = [];

// ── HERD EVENTS SEED (births, deaths, sales, purchases) ──────
const seedHerdEvents = [];
const seedWorkers = [];
const seedLeave = [];
const seedTransactions = [];
const seedInventory = [];
const seedVet = [];
const seedCamps = [];
const seedROI = [];
const seedSlaughter = [];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  NAMIBIA TAX TABLES 2024/25 (NamRA official)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function calcNamibiaTax(annualIncome) {
  // NamRA 2024/25 brackets
  if (annualIncome <= 50000)  return 0;
  if (annualIncome <= 100000) return (annualIncome - 50000) * 0.18;
  if (annualIncome <= 300000) return 9000 + (annualIncome - 100000) * 0.25;
  if (annualIncome <= 500000) return 59000 + (annualIncome - 300000) * 0.30;
  if (annualIncome <= 800000) return 119000 + (annualIncome - 500000) * 0.32;
  if (annualIncome <= 1500000) return 215000 + (annualIncome - 800000) * 0.34;
  return 453000 + (annualIncome - 1500000) * 0.37;
}
function calcSSC(monthlySalary) {
  // SSC employee: 0.9% of gross, capped at N$81 (max insurable N$9,000/mo)
  const insurable = Math.min(monthlySalary, 9000);
  return Math.round(insurable * 0.009);
}
function calcSSCEmployer(monthlySalary) {
  const insurable = Math.min(monthlySalary, 9000);
  return Math.round(insurable * 0.018);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  STYLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg-base:#0a0c0e;--bg-surface:#111416;--bg-card:#161a1d;--bg-hover:#1c2124;
  --border:#242a2e;--border-hi:#2e3740;
  --amber:#d48c2a;--amber-l:#f0a832;--amber-glow:rgba(212,140,42,0.15);
  --text:#e8eaec;--text2:#7a8591;--text3:#4a5560;
  --green:#2dbd6e;--red:#e05252;--blue:#4a9eff;--orange:#f07832;--purple:#a855f7;
  --sw:240px;--hh:64px;--r:10px;--rl:16px;
}
body{background:var(--bg-base);color:var(--text);font-family:'Syne',sans-serif;overflow:hidden}

/* LOGIN */
.lw{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg-base);background-image:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(212,140,42,0.08),transparent 70%)}
.lc{background:var(--bg-card);border:1px solid var(--border-hi);border-radius:var(--rl);padding:48px 40px;width:380px;box-shadow:0 0 60px rgba(0,0,0,.6)}
.ll{font-family:'Bebas Neue',sans-serif;font-size:42px;letter-spacing:3px;color:var(--amber-l);line-height:1}
.lt{color:var(--text2);font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-bottom:36px;margin-top:4px}
.llabel{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text2);margin-bottom:6px;display:block}
.li{width:100%;background:var(--bg-surface);border:1px solid var(--border-hi);border-radius:var(--r);padding:12px 14px;color:var(--text);font-family:'Syne',sans-serif;font-size:14px;margin-bottom:18px;outline:none;transition:border-color .2s}
.li:focus{border-color:var(--amber)}
.lb{width:100%;padding:14px;background:var(--amber);color:#000;border:none;border-radius:var(--r);font-family:'Syne',sans-serif;font-weight:800;font-size:13px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:background .2s}
.lb:hover{background:var(--amber-l)}
.lerr{color:var(--red);font-size:12px;margin-top:-10px;margin-bottom:12px}

/* LAYOUT */
.app{display:flex;height:100vh;overflow:hidden}
.sidebar{width:var(--sw);background:var(--bg-surface);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;background-image:linear-gradient(to bottom,rgba(212,140,42,0.04),transparent 40%)}
.sb{padding:22px 20px 18px;border-bottom:1px solid var(--border)}
.slogo{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:3px;color:var(--amber-l);line-height:1}
.stag{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--text3);margin-top:2px}
.snav{flex:1;padding:12px 10px;display:flex;flex-direction:column;gap:1px;overflow-y:auto}
.snav::-webkit-scrollbar{width:0}
.nsec{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text3);padding:10px 10px 4px}
.ni{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:600;color:var(--text2);transition:all .15s;border:1px solid transparent}
.ni:hover{background:var(--bg-card);color:var(--text)}
.ni.active{background:var(--amber-glow);color:var(--amber-l);border-color:rgba(212,140,42,.2)}
.nicon{font-size:14px;width:18px;text-align:center}
.sf{padding:12px 10px 16px;border-top:1px solid var(--border)}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{height:var(--hh);background:var(--bg-surface);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 28px;flex-shrink:0}
.ttl{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px}
.tr{display:flex;align-items:center;gap:14px}
.ltog{display:flex;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;overflow:hidden}
.lbtn{padding:6px 14px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border:none;background:transparent;color:var(--text3);font-family:'Syne',sans-serif;transition:all .15s}
.lbtn.active{background:var(--amber);color:#000}
.ava{width:34px;height:34px;border-radius:50%;background:var(--amber-glow);border:1px solid var(--amber);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:var(--amber-l)}
.content{flex:1;overflow-y:auto;padding:28px}
.content::-webkit-scrollbar{width:4px}
.content::-webkit-scrollbar-thumb{background:var(--border-hi);border-radius:2px}

/* STATS */
.sg{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.sc{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--rl);padding:20px;position:relative;overflow:hidden;transition:border-color .2s}
.sc:hover{border-color:var(--border-hi)}
.sc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--amber);opacity:.6}
.slabel{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text3);margin-bottom:8px}
.sval{font-family:'Bebas Neue',sans-serif;font-size:40px;letter-spacing:1px;line-height:1}
.ssub{font-size:11px;color:var(--text3);margin-top:5px}
.sicon{position:absolute;right:16px;top:16px;font-size:26px;opacity:.1}

/* CARDS */
.dg{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
.dg3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px}
.card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--rl);padding:22px}
.ctitle{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text3);margin-bottom:14px}
.apill{background:var(--bg-surface);border:1px solid var(--border);border-radius:8px;padding:11px 14px;display:flex;justify-content:space-between;align-items:center}
.apill-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.apl{font-size:12px;font-weight:600;color:var(--text2)}
.apc{font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--amber-l)}
.ait{display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)}
.ait:last-child{border-bottom:none}
.adot{width:7px;height:7px;border-radius:50%;background:var(--amber);margin-top:5px;flex-shrink:0}
.atxt{font-size:12px;color:var(--text2)}
.atm{font-size:10px;color:var(--text3);margin-top:2px}

/* TABLE */
.tw{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--rl);overflow:hidden;margin-bottom:20px}
.tb{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.si{flex:1;background:var(--bg-surface);border:1px solid var(--border);border-radius:8px;padding:8px 14px;color:var(--text);font-family:'Syne',sans-serif;font-size:13px;outline:none;transition:border-color .2s;max-width:280px}
.si:focus{border-color:var(--amber)}
table{width:100%;border-collapse:collapse}
thead th{padding:11px 14px;text-align:left;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text3);border-bottom:1px solid var(--border);background:var(--bg-surface)}
tbody tr{border-bottom:1px solid var(--border);transition:background .1s}
tbody tr:last-child{border-bottom:none}
tbody tr:hover{background:var(--bg-hover)}
tbody td{padding:12px 14px;font-size:13px}
.mono{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--amber-l)}
.nr{padding:40px;text-align:center;color:var(--text3);font-size:13px}

/* BADGES */
.b{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
.bg{background:rgba(45,189,110,.12);color:var(--green);border:1px solid rgba(45,189,110,.2)}
.ba{background:var(--amber-glow);color:var(--amber-l);border:1px solid rgba(212,140,42,.2)}
.br{background:rgba(224,82,82,.12);color:var(--red);border:1px solid rgba(224,82,82,.2)}
.bb{background:rgba(74,158,255,.12);color:var(--blue);border:1px solid rgba(74,158,255,.2)}
.bm{background:rgba(255,255,255,.04);color:var(--text3);border:1px solid var(--border)}
.bp{background:rgba(168,85,247,.12);color:var(--purple);border:1px solid rgba(168,85,247,.2)}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:5px;padding:8px 16px;border-radius:8px;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border:none;transition:all .15s}
.btp{background:var(--amber);color:#000}.btp:hover{background:var(--amber-l)}
.btg{background:transparent;color:var(--text2);border:1px solid var(--border)}.btg:hover{background:var(--bg-hover);color:var(--text);border-color:var(--border-hi)}
.btd{background:rgba(224,82,82,.1);color:var(--red);border:1px solid rgba(224,82,82,.2)}.btd:hover{background:rgba(224,82,82,.2)}
.bte{background:rgba(45,189,110,.1);color:var(--green);border:1px solid rgba(45,189,110,.2)}.bte:hover{background:rgba(45,189,110,.2)}
.btb{background:rgba(74,158,255,.1);color:var(--blue);border:1px solid rgba(74,158,255,.2)}.btb:hover{background:rgba(74,158,255,.2)}
.sm{padding:4px 10px;font-size:10px}

/* TABS */
.tabs{display:flex;gap:2px;background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:3px;margin-bottom:18px;width:fit-content;flex-wrap:wrap}
.tab{padding:7px 18px;border-radius:7px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;cursor:pointer;border:none;background:transparent;color:var(--text3);font-family:'Syne',sans-serif;transition:all .15s}
.tab.active{background:var(--amber);color:#000}

/* MODAL */
.mo{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:100;backdrop-filter:blur(4px)}
.md{background:var(--bg-card);border:1px solid var(--border-hi);border-radius:var(--rl);padding:30px;width:540px;max-height:90vh;overflow-y:auto;box-shadow:0 0 80px rgba(0,0,0,.8)}
.md::-webkit-scrollbar{width:4px}
.md::-webkit-scrollbar-thumb{background:var(--border-hi);border-radius:2px}
.mtitle{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px;margin-bottom:22px;color:var(--amber-l)}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.fg1{grid-column:1/-1}
.fl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text3);margin-bottom:5px;display:block}
.fi,.fsel,.fta{background:var(--bg-surface);border:1px solid var(--border);border-radius:8px;padding:9px 12px;color:var(--text);font-family:'Syne',sans-serif;font-size:13px;outline:none;transition:border-color .2s;width:100%}
.fi:focus,.fsel:focus,.fta:focus{border-color:var(--amber)}
.fsel option{background:var(--bg-card)}
.fta{resize:vertical;min-height:65px}
.ma{display:flex;gap:10px;justify-content:flex-end;margin-top:22px}

/* PAYSLIP */
.ps{background:#fff;color:#111;padding:28px;border-radius:var(--r);font-family:'Syne',sans-serif}
.psh{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #d4812a;padding-bottom:14px;margin-bottom:18px}
.pslogo{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:2px;color:#d4812a}
.psr{display:flex;justify-content:space-between;padding:5px 0;font-size:13px;border-bottom:1px solid #eee}
.pst{display:flex;justify-content:space-between;padding:9px 0;font-size:14px;font-weight:800}

/* FEED CALC */
.feed-panel{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--rl);padding:26px;margin-bottom:20px}
.feed-title{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:2px;color:var(--amber-l);margin-bottom:6px}
.feed-note{font-size:11px;color:var(--text3);margin-bottom:22px;letter-spacing:.5px}
.feed-ratio{display:grid;grid-template-columns:4fr 1fr;gap:4px;height:28px;border-radius:8px;overflow:hidden;margin-bottom:20px}
.fr-supp{background:var(--amber);display:flex;align-items:center;padding:0 12px;font-size:11px;font-weight:800;color:#000;letter-spacing:1px}
.fr-rough{background:var(--bg-surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--text2)}
.feed-result{background:var(--bg-surface);border:1px solid var(--border-hi);border-radius:var(--rl);padding:22px;margin-top:20px}
.feed-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:16px}
.fres{text-align:center;padding:14px;background:var(--bg-card);border-radius:var(--r);border:1px solid var(--border)}
.fres-val{font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--amber-l);line-height:1}
.fres-lbl{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--text3);margin-top:4px}
.cost-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border)}
.cost-row:last-child{border-bottom:none}
.cost-label{font-size:13px;color:var(--text2)}
.cost-val{font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--green)}

/* ROI */
.roi-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--rl);padding:20px;margin-bottom:12px}
.roi-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.roi-id{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--amber-l);font-weight:500}
.roi-pct{font-family:'Bebas Neue',sans-serif;font-size:36px;line-height:1}
.roi-bars{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.roi-bar-item{text-align:center}
.roi-bar-val{font-size:12px;font-weight:700;margin-bottom:4px}
.roi-bar-lbl{font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--text3)}

/* SLAUGHTER */
.slaughter-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--rl);padding:18px;position:relative;overflow:hidden}
.slaughter-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--amber)}

/* TAX */
.tax-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
.tax-table-wrap{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--rl);overflow:hidden;margin-bottom:20px}
.bracket-row{display:flex;justify-content:space-between;padding:10px 16px;border-bottom:1px solid var(--border);font-size:13px}
.bracket-row:last-child{border-bottom:none}
.bracket-row.active{background:var(--amber-glow)}
.tax-summary{background:var(--bg-surface);border:1px solid var(--border-hi);border-radius:var(--rl);padding:20px}

/* SUMMARY BAR */
.smbar{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px}
.smcard{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--rl);padding:18px;text-align:center}
.smlabel{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text3);margin-bottom:8px}
.smval{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:1px}

/* INV CARDS */
.inv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px}
.inv-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--rl);padding:16px;position:relative;overflow:hidden}
.inv-card.low{border-color:rgba(224,82,82,.3)}.inv-card.low::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--red)}
.inv-card.ok::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--green)}

/* CAMP CARDS */
.cg{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.cc{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--rl);padding:18px;position:relative;overflow:hidden}
.cc.iu::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--amber)}
.cc.rs::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--blue)}
.cc.av::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--green)}
.cm{font-size:11px;color:var(--text3);display:flex;flex-direction:column;gap:4px;margin-top:10px}
.cm span{display:flex;justify-content:space-between}.cm b{color:var(--text2)}

/* ALERT */
.alert{background:rgba(224,82,82,.08);border:1px solid rgba(224,82,82,.25);border-radius:var(--r);padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;gap:10px;font-size:13px;color:var(--red);font-weight:600}
.alert-info{background:rgba(74,158,255,.08);border:1px solid rgba(74,158,255,.25);color:var(--blue)}
.alert-green{background:rgba(45,189,110,.08);border:1px solid rgba(45,189,110,.25);color:var(--green)}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function useLS(k,init){
  const [v,sv]=useState(()=>{try{const s=localStorage.getItem(k);return s?JSON.parse(s):init;}catch{return init;}});
  useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}},[k,v]);
  return [v,sv];
}
function Badge({s}){
  const m={Active:"bg",Aktief:"bg",Sold:"bm",Verkoop:"bm",Deceased:"br",Oorlede:"br",
    Approved:"bg",Goedgekeur:"bg",Pending:"ba",Uitstaande:"ba",Rejected:"br",Afgekeur:"br",
    "In Use":"ba","In Gebruik":"ba",Resting:"bb",Rustend:"bb",Available:"bg",Beskikbaar:"bg",
    income:"bg",expense:"br","A1":"bg","A2":"ba","B":"bm",
  };
  return <span className={`b ${m[s]||"bm"}`}>{s}</span>;
}
function F({l,c,full}){return <div className={full?"fg1":""}><label className="fl">{l}</label>{c}</div>}
function Modal({title,onClose,children,wide}){
  return <div className="mo" onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div className="md" style={wide?{width:620}:{}}><div className="mtitle">{title}</div>{children}</div>
  </div>;
}
function fmt(n){return Number(n).toLocaleString();}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LOGIN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Login({onLogin,t}){
  const [screen,setScreen]=useState("login"); // "login"|"create"|"select"
  const [accounts,setAccounts]=useState(()=>{
    try{const a=localStorage.getItem("fl_accounts");return a?JSON.parse(a):[{id:"admin",username:"admin",password:"farmlogic",displayName:"Admin",createdAt:new Date().toISOString()}];}
    catch{return [{id:"admin",username:"admin",password:"farmlogic",displayName:"Admin",createdAt:new Date().toISOString()}];}
  });
  const [u,su]=useState(""); const [p,sp]=useState(""); const [err,se]=useState("");
  const [newName,snn]=useState(""); const [newUser,snu]=useState(""); const [newPass,snp]=useState(""); const [newPass2,snp2]=useState(""); const [createErr,sce]=useState("");

  const saveAccounts=(accs)=>{localStorage.setItem("fl_accounts",JSON.stringify(accs));setAccounts(accs);};

  const go=()=>{
    const acc=accounts.find(a=>a.username.toLowerCase()===u.toLowerCase()&&a.password===p);
    if(acc){
      localStorage.setItem("fl_current_user",acc.id);
      onLogin(acc);
    } else se(t.wrongCredentials);
  };

  const createAccount=()=>{
    sce("");
    if(!newName.trim()){sce("Please enter your full name.");return;}
    if(!newUser.trim()){sce("Please choose a username.");return;}
    if(newPass.length<4){sce("Password must be at least 4 characters.");return;}
    if(newPass!==newPass2){sce("Passwords do not match.");return;}
    if(accounts.find(a=>a.username.toLowerCase()===newUser.toLowerCase())){sce("Username already taken. Choose another.");return;}
    const newAcc={id:"user_"+Date.now(),username:newUser.trim(),password:newPass,displayName:newName.trim(),createdAt:new Date().toISOString()};
    saveAccounts([...accounts,newAcc]);
    su(newUser.trim()); sp(newPass);
    setScreen("login");
    se("Account created! You can now log in.");
  };

  const clearData=()=>{
    if(window.confirm("This will delete ALL data for all accounts and start fresh. Are you sure?")){
      if(window.confirm("Last warning — ALL data will be permanently deleted. Continue?")){
        localStorage.clear(); window.location.reload();
      }
    }
  };

  if(screen==="create") return <div className="lw"><div className="lc" style={{width:420}}>
    <div className="ll">FarmLogic</div>
    <div className="lt">Create Account</div>
    <label className="llabel">Full Name</label>
    <input className="li" placeholder="e.g. Maria van Zyl" value={newName} onChange={e=>snn(e.target.value)}/>
    <label className="llabel">Username</label>
    <input className="li" placeholder="Choose a username" value={newUser} onChange={e=>snu(e.target.value)}/>
    <label className="llabel">Password</label>
    <input className="li" type="password" placeholder="Min 4 characters" value={newPass} onChange={e=>snp(e.target.value)}/>
    <label className="llabel">Confirm Password</label>
    <input className="li" type="password" value={newPass2} onChange={e=>snp2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&createAccount()}/>
    {createErr&&<div className="lerr">{createErr}</div>}
    <button className="lb" onClick={createAccount}>Create Account</button>
    <button onClick={()=>{setScreen("login");sce("");}} style={{width:"100%",marginTop:10,padding:"10px",background:"transparent",border:"1px solid var(--border)",borderRadius:8,color:"var(--text2)",fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer"}}>← Back to Login</button>
  </div></div>;

  return <div className="lw"><div className="lc">
    <div className="ll">FarmLogic</div>
    <div className="lt">{t.tagline}</div>
    <label className="llabel">{t.username}</label>
    <input className="li" value={u} onChange={e=>su(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} autoFocus/>
    <label className="llabel">{t.password}</label>
    <input className="li" type="password" value={p} onChange={e=>sp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}/>
    {err&&<div className="lerr" style={{color:err.includes("created")?"var(--green)":"var(--red)"}}>{err}</div>}
    <button className="lb" onClick={go}>{t.loginBtn}</button>
    <button onClick={()=>{setScreen("create");se("");}} style={{width:"100%",marginTop:10,padding:"12px",background:"transparent",border:"1px solid var(--amber)",borderRadius:8,color:"var(--amber-l)",fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer"}}>+ Create New Account</button>
    {accounts.length>1&&<div style={{marginTop:14}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)",marginBottom:8,textAlign:"center"}}>Existing Accounts</div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {accounts.map(a=><div key={a.id} onClick={()=>{su(a.username);sp("");}} style={{padding:"8px 12px",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600,color:"var(--text2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>👤 {a.displayName}</span>
          <span style={{fontSize:10,color:"var(--text3)"}}>{a.username}</span>
        </div>)}
      </div>
    </div>}
    <div style={{marginTop:16,fontSize:11,color:"var(--text3)",textAlign:"center"}}>FarmLogic — Farm Management Suite</div>
    <div style={{marginTop:16,paddingTop:14,borderTop:"1px solid var(--border)"}}>
      <button onClick={clearData} style={{width:"100%",padding:"9px",background:"transparent",border:"1px solid rgba(224,82,82,0.3)",borderRadius:8,color:"var(--red)",fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer"}}>🗑️ Clear All Data &amp; Start Fresh</button>
    </div>
  </div></div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  DASHBOARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Dashboard({animals,workers,leave,transactions,inventory,vetlog,t}){
  const income=transactions.filter(x=>x.type==="income").reduce((s,x)=>s+x.amount,0);
  const exp=transactions.filter(x=>x.type==="expense").reduce((s,x)=>s+x.amount,0);
  const payroll=workers.reduce((s,w)=>s+w.salary,0);
  const pending=leave.filter(l=>l.status==="Pending").length;
  const today=new Date().toISOString().split("T")[0];
  const overdueVet=vetlog.filter(v=>v.nextDue&&v.nextDue<=today).length;
  const lowStock=inventory.filter(i=>i.quantity<=i.minStock).length;
  const counts={cattle:animals.filter(a=>a.type==="cattle").length,sheep:animals.filter(a=>a.type==="sheep").length,goats:animals.filter(a=>a.type==="goats").length,pigs:animals.filter(a=>a.type==="pigs").length};
  const net=income-exp;
  const activity=[
    {t:"FMD Vaccination overdue for C-001",time:"Today"},
    {t:"Enerfeed stock running low on Farm 1",time:"2 hours ago"},
    {t:"Payslip generated — Johannes Swartbooi",time:"Yesterday"},
    {t:"Leave request from Petrus Hamutenya",time:"2 days ago"},
    {t:"Slaughter record added — Meatco Windhoek",time:"3 days ago"},
  ];
  return <div>
    {(overdueVet>0||lowStock>0)&&<div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
      {overdueVet>0&&<div className="alert">⚠️ {overdueVet} animal(s) overdue for vaccination or treatment</div>}
      {lowStock>0&&<div className="alert">📦 {lowStock} inventory item(s) below minimum stock level</div>}
    </div>}
    <div className="sg">
      <div className="sc"><div className="sicon">🐄</div><div className="slabel">{t.totalAnimals}</div><div className="sval">{animals.length}</div><div className="ssub">{animals.filter(a=>a.status==="Active").length} active</div></div>
      <div className="sc"><div className="sicon">👷</div><div className="slabel">{t.totalWorkers}</div><div className="sval">{workers.length}</div><div className="ssub">{"N$"}{fmt(payroll)}/mo payroll</div></div>
      <div className="sc"><div className="sicon">📈</div><div className="slabel">{t.netProfit}</div><div className="sval" style={{fontSize:26,color:net>=0?"var(--green)":"var(--red)"}}>{"N$"}{fmt(net)}</div><div className="ssub">Income vs expenses</div></div>
      <div className="sc"><div className="sicon">📋</div><div className="slabel">{t.pendingLeave||"Pending Leave"}</div><div className="sval">{pending}</div><div className="ssub">Awaiting approval</div></div>
    </div>
    <div className="dg">
      <div className="card"><div className="ctitle">{t.livestock} Breakdown</div>
        <div className="apill-grid">
          {[["🐄",t.cattle,counts.cattle],["🐑",t.sheep,counts.sheep],["🐐",t.goats,counts.goats],["🐷",t.pigs,counts.pigs]].map(([ic,lb,ct])=>(
            <div className="apill" key={lb}><span style={{fontSize:16}}>{ic}</span><span className="apl">{lb}</span><span className="apc">{ct}</span></div>
          ))}
        </div>
      </div>
      <div className="card"><div className="ctitle">Recent Activity</div>
        {activity.map((a,i)=><div className="ait" key={i}><div className="adot"/><div><div className="atxt">{a.t}</div><div className="atm">{a.time}</div></div></div>)}
      </div>
    </div>
    <div className="dg3">
      <div className="card"><div className="ctitle">Income (YTD)</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"var(--green)"}}>{"N$"}{fmt(income)}</div></div>
      <div className="card"><div className="ctitle">Expenses (YTD)</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"var(--red)"}}>{"N$"}{fmt(exp)}</div></div>
      <div className="card"><div className="ctitle">Net Profit (YTD)</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:net>=0?"var(--green)":"var(--red)"}}>{"N$"}{fmt(net)}</div></div>
    </div>
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LIVESTOCK  — subcategories, births, deaths, Namlits import
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Livestock({animals,setAnimals,transactions,setTransactions,herdEvents,setHerdEvents,t}){
  const [tab,st]=useState("cattle");
  const [subTab,sst]=useState("all");
  const [q,sq]=useState("");
  const [modal,sm]=useState(null);
  const [form,sf]=useState({});
  const [eventModal,sem]=useState(false);
  const [eventForm,sef]=useState({date:new Date().toISOString().split("T")[0],type:"Birth",species:"cattle",subcat:"Calf",count:"1",breed:"",farm:"Farm 1",notes:"",relatedTag:""});
  const [importModal,sim]=useState(false);
  const [importResult,sir]=useState(null);
  const [importLoading,sil]=useState(false);
  const [batch,sb]=useState({animalType:"cattle",category:"tollies",count:"",breed:"",avgWeight:"",farm:"Farm 1",pricePerHead:"",seller:"",date:new Date().toISOString().split("T")[0],notes:""});
  const [batchDone,sbd]=useState(null);

  const SPECIES_TABS=[
    ["cattle","🐄","Cattle"],
    ["sheep","🐑","Sheep"],
    ["goats","🐐","Goats"],
    ["pigs","🐷","Pigs"],
    ["horses","🐴","Horses"],
  ];

  const subcats = SUBCATS[tab]||[];
  const activeAnimals = animals.filter(a=>a.status==="Active"&&a.type===tab);
  const filteredAnimals = activeAnimals
    .filter(a=>subTab==="all"||a.subcat===subTab)
    .filter(a=>(a.tag+a.breed+a.farm+(a.subcat||"")).toLowerCase().includes(q.toLowerCase()));

  // Count per subcat for summary pills
  const subcatCounts = {};
  subcats.forEach(s=>{ subcatCounts[s]=activeAnimals.filter(a=>a.subcat===s).length; });
  const totalActive = activeAnimals.length;

  const BATCH_CATS={
    cattle:["Tollies","Heifers","Cows","Bulls","Calves","Weaners","Oxen"],
    sheep:["Ewes","Rams","Lambs","Wethers"],
    goats:["Does","Bucks","Kids"],
    pigs:["Sows","Boars","Weaners","Porkers"],
    horses:["Mares","Stallions","Geldings","Fillies","Colts"],
  };

  const saveSingle=()=>{
    if(modal==="add") setAnimals(p=>[...p,{...form,id:Date.now(),weight:Number(form.weight||0)}]);
    else setAnimals(p=>p.map(a=>a.id===form.id?{...form,weight:Number(form.weight||0)}:a));
    sm(null);
  };

  const saveEvent=()=>{
    const count=Number(eventForm.count)||1;
    const ev={...eventForm,id:Date.now(),count};
    setHerdEvents(p=>[ev,...p]);

    // Auto-update livestock based on event type
    const prefix=SPECIES_PREFIX[eventForm.species]||"A";
    const today=eventForm.date;

    if(eventForm.type==="Birth"){
      const existing=animals.filter(a=>a.type===eventForm.species).length;
      const newA=[];
      for(let i=0;i<count;i++){
        const num=String(existing+i+1).padStart(3,"0");
        newA.push({id:Date.now()+i+1,type:eventForm.species,subcat:eventForm.subcat,tag:`${prefix}-${num}`,breed:eventForm.breed||"Unknown",dob:today,weight:0,status:"Active",notes:`Born on farm — ${eventForm.notes}`,farm:eventForm.farm,motherId:eventForm.relatedTag||""});
      }
      setAnimals(p=>[...p,...newA]);
      // Auto-increment calf count on mother
      if(eventForm.relatedTag){
        setAnimals(p=>p.map(a=>a.tag===eventForm.relatedTag?{...a,calfCount:(Number(a.calfCount)||0)+count}:a));
      }
    }
    if(eventForm.type==="Death"){
      // Mark most recent matching animals as deceased
      let toMark=count;
      setAnimals(p=>p.map(a=>{
        if(toMark>0&&a.type===eventForm.species&&a.subcat===eventForm.subcat&&a.farm===eventForm.farm&&a.status==="Active"){
          toMark--;
          return {...a,status:"Deceased"};
        }
        return a;
      }));
    }
    if(eventForm.type==="Sale"){
      let toMark=count;
      setAnimals(p=>p.map(a=>{
        if(toMark>0&&a.type===eventForm.species&&a.subcat===eventForm.subcat&&a.farm===eventForm.farm&&a.status==="Active"){
          toMark--;
          return {...a,status:"Sold"};
        }
        return a;
      }));
    }
    if(eventForm.type==="Purchase"){
      const existing=animals.filter(a=>a.type===eventForm.species).length;
      const newA=[];
      for(let i=0;i<count;i++){
        const num=String(existing+i+1).padStart(3,"0");
        newA.push({id:Date.now()+i+100,type:eventForm.species,subcat:eventForm.subcat,tag:`${prefix}-${num}`,breed:eventForm.breed||"Unknown",dob:"",weight:0,status:"Active",notes:`Purchased — ${eventForm.notes}`,farm:eventForm.farm});
      }
      setAnimals(p=>[...p,...newA]);
    }
    sem(false);
  };

  const saveBatch=()=>{
    const count=Number(batch.count); const pph=Number(batch.pricePerHead);
    if(!count||count<1){alert("Enter a valid number of animals.");return;}
    const prefix=SPECIES_PREFIX[batch.animalType]||"A";
    const existing=animals.filter(a=>a.type===batch.animalType).length;
    const subcatKey=Object.keys(SUBCATS[batch.animalType]||{});
    // map category label to subcat
    const catToSubcat={
      tollies:"Tolly",heifers:"Heifer",cows:"Cow",bulls:"Bull",calves:"Calf",weaners:"Weaner",oxen:"Ox",
      ewes:"Ewe",rams:"Ram",lambs:"Lamb",wethers:"Wether",
      does:"Doe",bucks:"Buck",kids:"Kid",
      sows:"Sow",boars:"Boar",porkers:"Weaner",
      mares:"Mare",stallions:"Stallion",geldings:"Gelding",fillies:"Filly",colts:"Colt",
    };
    const subcat=catToSubcat[batch.category.toLowerCase()]||batch.category;
    const newA=[];
    for(let i=0;i<count;i++){
      const num=String(existing+i+1).padStart(3,"0");
      newA.push({id:Date.now()+i,type:batch.animalType,subcat,tag:`${prefix}-${num}`,breed:batch.breed||"Unknown",dob:"",weight:Number(batch.avgWeight)||0,status:"Active",notes:`${batch.category} — from ${batch.seller||"auction"} @ N$${pph}/head`,farm:batch.farm,purchasePrice:pph,purchaseDate:batch.date});
    }
    setAnimals(p=>[...p,...newA]);
    if(pph>0) setTransactions(p=>[{id:Date.now()+9999,date:batch.date,description:`Purchased ${count} ${batch.category} (${batch.breed||batch.animalType}) from ${batch.seller||"auction"}`,category:"Livestock Purchase",type:"expense",amount:count*pph,farm:batch.farm,doc:""},...p]);
    sbd({count,category:batch.category,farm:batch.farm,totalCost:count*pph});
  };

  // ── Namlits / CSV / Excel import ────────────────────────────
  // Direct Namlits CSV parser — no AI needed
  const parseNamlitsCSV=(text)=>{
    const NAMLITS_MAP={
      // Cattle
      "KO":"Cow","KOEI":"Cow","COW":"Cow",
      "VS":"Heifer","HEIFER":"Heifer","VERS SKOTVEE":"Heifer","VERS":"Heifer",
      "TO":"Tolly","TOLLY":"Tolly",
      "BU":"Bull","BUL":"Bull","BULL":"Bull",
      "OS":"Ox","OX":"Ox",
      "KA":"Calf","KAL":"Calf","KALF":"Calf","CALF":"Calf",
      "SP":"Weaner","SPEEN":"Weaner","WEANER":"Weaner","SPEEN BEESTE":"Weaner",
      // Sheep
      "OO":"Ewe","OOIS":"Ewe","OOI":"Ewe","EWE":"Ewe",
      "RA":"Ram","RAM":"Ram",
      "LA":"Lamb","LAM":"Lamb","LAMMER":"Lamb","LAMB":"Lamb",
      "HA":"Wether","HAMMEL":"Wether","WETHER":"Wether",
      "OOL":"Ewe Lamb","EWE LAMB":"Ewe Lamb",
      // Goats
      "DO":"Doe","DOE":"Doe",
      "BO":"Buck","BOK":"Buck","BUCK":"Buck",
      "KI":"Kid","KID":"Kid",
      // Pigs
      "SO":"Sow","SOW":"Sow",
      "BE":"Boar","BOAR":"Boar","VARK":"Boar",
      "BIG":"Piglet","PIGLET":"Piglet",
      // Horses
      "ME":"Mare","MARE":"Mare","MERRIE":"Mare",
      "HE":"Stallion","HENGSTE":"Stallion","STALLION":"Stallion",
      "RU":"Gelding","RUIN":"Gelding","GELDING":"Gelding",
    };
    const SPECIES_MAP={
      "Cow":"cattle","Heifer":"cattle","Tolly":"cattle","Bull":"cattle",
      "Ox":"cattle","Calf":"cattle","Weaner":"cattle",
      "Ewe":"sheep","Ram":"sheep","Lamb":"sheep","Wether":"sheep","Ewe Lamb":"sheep","Ram Lamb":"sheep",
      "Doe":"goats","Buck":"goats","Kid":"goats",
      "Sow":"pigs","Boar":"pigs","Piglet":"pigs",
      "Mare":"horses","Stallion":"horses","Gelding":"horses","Filly":"horses","Colt":"horses",
    };
    const lines=text.split(/?
/).filter(l=>l.trim());
    const animals=[];
    let farmName=null;
    let dateFound=null;

    lines.forEach(line=>{
      // Try to find farm name
      if(!farmName&&(line.toLowerCase().includes("plaas")||line.toLowerCase().includes("farm")||line.toLowerCase().includes("boerdery"))){
        const parts=line.split(/[,;:	]+/);
        parts.forEach(p=>{if(p.trim().length>2&&p.trim().length<50)farmName=p.trim();});
      }
      // Try to find date
      const dateMatch=line.match(/\d{4}[-\/]\d{2}[-\/]\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4}/);
      if(dateMatch&&!dateFound)dateFound=dateMatch[0];

      // Parse animal lines - try different delimiters
      const parts=line.split(/[,;	|]+/).map(p=>p.trim()).filter(p=>p);
      if(parts.length>=2){
        // Look for code + number pattern
        for(let i=0;i<parts.length-1;i++){
          const code=parts[i].toUpperCase().trim();
          const numStr=parts[i+1].replace(/[^\d]/g,"");
          const num=parseInt(numStr);
          if(num>0&&num<10000){
            // Direct code match
            if(NAMLITS_MAP[code]){
              const subcat=NAMLITS_MAP[code];
              const type=SPECIES_MAP[subcat]||"cattle";
              const existing=animals.find(a=>a.subcat===subcat&&a.type===type);
              if(existing)existing.count+=num;
              else animals.push({type,subcat,count:num,breed:"Unknown"});
            }
            // Try partial match
            else{
              for(const [k,v] of Object.entries(NAMLITS_MAP)){
                if(code.includes(k)||k.includes(code)){
                  const subcat=v;
                  const type=SPECIES_MAP[subcat]||"cattle";
                  const existing=animals.find(a=>a.subcat===subcat&&a.type===type);
                  if(existing)existing.count+=num;
                  else animals.push({type,subcat,count:num,breed:"Unknown"});
                  break;
                }
              }
            }
          }
        }
      }
    });

    if(animals.length>0){
      return{source:"Namlits",date:dateFound||new Date().toISOString().split("T")[0],farm:farmName,animals,notes:"Parsed directly from CSV — "+animals.reduce((s,a)=>s+a.count,0)+" animals found"};
    }
    return null;
  };

  const handleImportFile=async(e)=>{
    const file=e.target.files[0]; if(!file)return;
    sil(true); sir(null);
    const reader=new FileReader();
    const isImage=file.type.startsWith("image/");
    const isPdf=file.type==="application/pdf";
    const isCsv=file.name.endsWith(".csv")||file.type==="text/csv"||file.type==="text/plain"||file.name.endsWith(".txt");

    reader.onload=async(ev)=>{
      try{
        // ── Try direct CSV parse first (no AI, instant, always works) ──
        if(isCsv||(!isImage&&!isPdf)){
          const text=ev.target.result;
          const directResult=parseNamlitsCSV(text);
          if(directResult&&directResult.animals.length>0){
            sir(directResult);
            sil(false);
            return;
          }
          // CSV parse found nothing — fall through to AI
        }

        // ── AI fallback for PDFs, images, and unrecognised CSV formats ──
        let messages;
        if(isImage){
          const b64=ev.target.result.split(",")[1];
          messages=[{role:"user",content:[
            {type:"image",source:{type:"base64",media_type:file.type,data:b64}},
            {type:"text",text:"This is a Namibian livestock document. List every animal category and count you can see. Include any numbers next to animal categories like KO, VS, TO, BU, OS, KA, OO, RA, LA etc."}
          ]}];
        } else if(isPdf){
          const b64=ev.target.result.split(",")[1];
          messages=[{role:"user",content:[
            {type:"document",source:{type:"base64",media_type:"application/pdf",data:b64}},
            {type:"text",text:"This is a Namibian livestock document. List every animal category and count you can see."}
          ]}];
        } else {
          const text=ev.target.result;
          messages=[{role:"user",content:"Namlits livestock CSV ("+file.name+"):\n\n"+text.substring(0,6000)+"\n\nExtract all animal counts."}];
        }

        const sys="You are a Namibian livestock document reader. ALWAYS return valid JSON. NEVER say the document is unclear. If you can see ANY numbers next to ANY animal categories, return them.\n\nNamlits codes: KO=Cow, VS=Heifer, TO=Tolly, BU=Bull, OS=Ox, KA=Calf, SP=Weaner, OO=Ewe, RA=Ram, LA=Lamb, HA=Wether, DO=Doe, BO=Buck, KI=Kid, SO=Sow, BE=Boar\n\nReturn ONLY this JSON format:\n{\"source\":\"Namlits\",\"date\":\"YYYY-MM-DD\",\"farm\":null,\"animals\":[{\"type\":\"cattle|sheep|goats|pigs|horses\",\"subcat\":\"Cow|Heifer|Tolly|Bull|Ox|Calf|Weaner|Ewe|Ram|Lamb|Wether|Doe|Buck|Kid|Sow|Boar\",\"count\":5,\"breed\":\"Unknown\"}],\"notes\":\"\"}\n\nEven if you only find 1 animal type, return it. Never return an error.";

        const raw=await callClaude(messages,sys);
        const clean=raw.replace(/```json|```/g,"").trim();
        // Find JSON in response even if there is extra text
        const jsonMatch=clean.match(/\{[\s\S]*\}/);
        if(jsonMatch){
          const parsed=JSON.parse(jsonMatch[0]);
          if(parsed.animals&&parsed.animals.length>0){
            sir(parsed);
          } else {
            sir({error:"No animal data found in this document. Make sure it is a livestock herd statement."});
          }
        } else {
          sir({error:"Could not read this document. Try saving from Namlits as CSV and uploading that instead."});
        }
      } catch(err){
        console.error("Import error:",err);
        sir({error:"Import failed: "+err.message+". Try saving from Namlits as CSV and uploading that file."});
      }
      sil(false);
    };

    if(isImage||isPdf) reader.readAsDataURL(file);
    else reader.readAsText(file);
  };

  const confirmImport=(result,targetFarm)=>{
    if(!result||result.error||!result.animals) return;
    const newAnimals=[];
    result.animals.forEach(lot=>{
      const prefix=SPECIES_PREFIX[lot.type]||"A";
      const existing=animals.filter(a=>a.type===lot.type).length+newAnimals.filter(a=>a.type===lot.type).length;
      for(let i=0;i<(lot.count||0);i++){
        const num=String(existing+i+1).padStart(3,"0");
        newAnimals.push({id:Date.now()+Math.random(),type:lot.type,subcat:lot.subcat||"Unknown",tag:`${prefix}-${num}`,breed:lot.breed||"Unknown",dob:"",weight:0,status:"Active",notes:`Imported from ${result.source||"document"}`,farm:targetFarm||result.farm||"Farm 1"});
      }
    });
    setAnimals(p=>[...p,...newAnimals]);
    sim(false); sir(null);
    alert(`✅ Imported ${newAnimals.length} animals successfully!`);
  };

  return <div>
    {/* Species tabs */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
      <div className="tabs" style={{margin:0}}>
        {SPECIES_TABS.map(([k,ic,lb])=><button key={k} className={`tab ${tab===k?"active":""}`} onClick={()=>{st(k);sst("all");}}>{ic} {lb}</button>)}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <button className="btn btb sm" onClick={()=>{sir(null);sim(true);}}>📥 Import / Namlits</button>
        <button className="btn btb sm" onClick={()=>{sbd(null);sm("batch");}}>📦 Batch Purchase</button>
        <button className="btn bte sm" onClick={()=>{sef({date:new Date().toISOString().split("T")[0],type:"Birth",species:tab,subcat:SUBCATS[tab]?.[0]||"",count:"1",breed:"",farm:"Farm 1",notes:"",relatedTag:""});sem(true);}}>+ Record Event</button>
      </div>
    </div>

    {/* Summary pills — subcat counts */}
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
      <div
        onClick={()=>sst("all")}
        style={{background:subTab==="all"?"var(--amber)":"var(--bg-card)",color:subTab==="all"?"#000":"var(--text2)",border:`1px solid ${subTab==="all"?"var(--amber)":"var(--border)"}`,borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:700,letterSpacing:.5}}>
        All ({totalActive})
      </div>
      {subcats.map(s=><div
        key={s}
        onClick={()=>sst(s)}
        style={{background:subTab===s?"var(--amber)":"var(--bg-card)",color:subTab===s?"#000":"var(--text2)",border:`1px solid ${subTab===s?"var(--amber)":"var(--border)"}`,borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:700,letterSpacing:.5}}>
        {s} ({subcatCounts[s]||0})
      </div>)}
    </div>

    {/* Main table */}
    <div className="tw">
      <div className="tb">
        <input className="si" placeholder={t.search} value={q} onChange={e=>sq(e.target.value)}/>
        <button className="btn btp" onClick={()=>{sf({type:tab,subcat:SUBCATS[tab]?.[0]||"",tag:"",breed:"",dob:"",weight:"",status:"Active",notes:"",farm:"Farm 1"});sm("add");}}>+ {t.addAnimal}</button>
      </div>
      {filteredAnimals.length===0?<div className="nr">{t.noRecords}</div>:<table>
        <thead><tr><th>{t.tagNumber}</th><th>Category</th><th>{t.breed}</th><th>{t.dob}</th><th>{t.weight}</th><th>{t.farm}</th><th>Offspring</th><th>{t.status}</th><th></th></tr></thead>
        <tbody>{filteredAnimals.map(a=><tr key={a.id}>
          <td><span className="mono">{a.tag}</span></td>
          <td><span className="b ba">{a.subcat}</span></td>
          <td>{a.breed}</td><td>{a.dob||"—"}</td><td>{a.weight?`${a.weight} kg`:"—"}</td><td>{a.farm}</td>
          <td>{a.calfCount>0?<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"var(--amber-l)"}}>{a.calfCount}</span>:<span style={{color:"var(--text3)"}}>—</span>}</td>
          <td><Badge s={a.status}/></td>
          <td><div style={{display:"flex",gap:5}}>
            <button className="btn btg sm" onClick={()=>{sf({...a});sm("edit");}}>{t.edit}</button>
            <button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setAnimals(p=>p.filter(x=>x.id!==a.id));}}>{t.delete}</button>
          </div></td>
        </tr>)}</tbody>
      </table>}
    </div>

    {/* Herd events log */}
    {herdEvents.filter(e=>e.species===tab).length>0&&<div className="tw">
      <div className="tb" style={{paddingTop:10,paddingBottom:10}}><span style={{fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)"}}>Recent Events — {tab}</span></div>
      <table>
        <thead><tr><th>Date</th><th>Event</th><th>Category</th><th>Count</th><th>Breed</th><th>Farm</th><th>Notes</th></tr></thead>
        <tbody>{herdEvents.filter(e=>e.species===tab).slice(0,10).map(e=><tr key={e.id}>
          <td className="mono">{e.date}</td>
          <td><span className={`b ${e.type==="Birth"?"bg":e.type==="Death"?"br":e.type==="Sale"?"ba":"bb"}`}>{e.type}</span></td>
          <td>{e.subcat}</td><td style={{fontWeight:700}}>{e.count}</td><td>{e.breed||"—"}</td><td>{e.farm}</td>
          <td style={{fontSize:12,color:"var(--text2)"}}>{e.notes||"—"}</td>
        </tr>)}</tbody>
      </table>
    </div>}

    {/* SINGLE ANIMAL MODAL */}
    {(modal==="add"||modal==="edit")&&<Modal title={modal==="add"?`+ ${t.addAnimal}`:t.edit} onClose={()=>sm(null)}>
      <div className="fg">
        <F l="Category" c={<select className="fsel" value={form.subcat||""} onChange={e=>sf(p=>({...p,subcat:e.target.value}))}>
          {(SUBCATS[form.type||tab]||[]).map(s=><option key={s}>{s}</option>)}
        </select>}/>
        <F l={t.tagNumber} c={<input className="fi" value={form.tag||""} onChange={e=>sf(p=>({...p,tag:e.target.value}))}/>}/>
        <F l={t.breed} c={<input className="fi" value={form.breed||""} onChange={e=>sf(p=>({...p,breed:e.target.value}))}/>}/>
        <F l={t.dob} c={<input className="fi" type="date" value={form.dob||""} onChange={e=>sf(p=>({...p,dob:e.target.value}))}/>}/>
        <F l={t.weight} c={<input className="fi" type="number" value={form.weight||""} onChange={e=>sf(p=>({...p,weight:e.target.value}))}/>}/>
        <F l={t.farm} c={<input className="fi" value={form.farm||""} onChange={e=>sf(p=>({...p,farm:e.target.value}))}/>}/>
        <F l={t.status} c={<select className="fsel" value={form.status||"Active"} onChange={e=>sf(p=>({...p,status:e.target.value}))}><option>Active</option><option>Sold</option><option>Deceased</option></select>}/>
        {(form.subcat==="Cow"||form.subcat==="Ewe"||form.subcat==="Doe"||form.subcat==="Sow"||form.subcat==="Mare")&&<F l="Total Calves / Offspring Produced" c={<input className="fi" type="number" min="0" placeholder="0" value={form.calfCount||""} onChange={e=>sf(p=>({...p,calfCount:Number(e.target.value)||0}))}/>}/>}
        <F l="Mother Tag (if applicable)" c={<input className="fi" placeholder="e.g. C-001" value={form.motherId||""} onChange={e=>sf(p=>({...p,motherId:e.target.value}))}/>}/>
        <F l={t.notes} full c={<textarea className="fta" value={form.notes||""} onChange={e=>sf(p=>({...p,notes:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(null)}>{t.cancel}</button><button className="btn btp" onClick={saveSingle}>{t.save}</button></div>
    </Modal>}

    {/* RECORD EVENT MODAL */}
    {eventModal&&<Modal title="+ Record Herd Event" onClose={()=>sem(false)}>
      <div className="alert alert-info" style={{marginBottom:14}}>Recording a Birth will automatically add animals. Death or Sale will mark existing animals accordingly.</div>
      <div className="fg">
        <F l="Event Type" c={<select className="fsel" value={eventForm.type} onChange={e=>sef(p=>({...p,type:e.target.value}))}>
          <option>Birth</option><option>Death</option><option>Sale</option><option>Purchase</option>
        </select>}/>
        <F l="Date" c={<input className="fi" type="date" value={eventForm.date} onChange={e=>sef(p=>({...p,date:e.target.value}))}/>}/>
        <F l="Species" c={<select className="fsel" value={eventForm.species} onChange={e=>sef(p=>({...p,species:e.target.value,subcat:SUBCATS[e.target.value]?.[0]||""}))}>
          <option value="cattle">Cattle</option><option value="sheep">Sheep</option><option value="goats">Goats</option><option value="pigs">Pigs</option><option value="horses">Horses</option>
        </select>}/>
        <F l="Category" c={<select className="fsel" value={eventForm.subcat} onChange={e=>sef(p=>({...p,subcat:e.target.value}))}>
          {(SUBCATS[eventForm.species]||[]).map(s=><option key={s}>{s}</option>)}
        </select>}/>
        <F l="Number of Animals" c={<input className="fi" type="number" min="1" value={eventForm.count} onChange={e=>sef(p=>({...p,count:e.target.value}))}/>}/>
        <F l="Breed" c={<input className="fi" value={eventForm.breed} onChange={e=>sef(p=>({...p,breed:e.target.value}))}/>}/>
        <F l="Farm" c={<input className="fi" value={eventForm.farm} onChange={e=>sef(p=>({...p,farm:e.target.value}))}/>}/>
        <F l="Related Tag (optional)" c={<input className="fi" placeholder="e.g. C-001 (mother)" value={eventForm.relatedTag} onChange={e=>sef(p=>({...p,relatedTag:e.target.value}))}/>}/>
        <F l="Notes" full c={<textarea className="fta" value={eventForm.notes} onChange={e=>sef(p=>({...p,notes:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sem(false)}>{t.cancel}</button><button className="btn btp" onClick={saveEvent}>✅ Save &amp; Update Herd</button></div>
    </Modal>}

    {/* BATCH PURCHASE MODAL */}
    {modal==="batch"&&<Modal title="📦 Batch Purchase" onClose={()=>sm(null)} wide>
      {batchDone?<div>
        <div className="alert alert-green"><div style={{fontWeight:800}}> ✅ {batchDone.count} {batchDone.category} added to {batchDone.farm}</div><div style={{fontSize:12,marginTop:4}}>{"N$"}{fmt(batchDone.totalCost)} recorded as expense</div></div>
        <div className="ma"><button className="btn btg" onClick={()=>sm(null)}>Close</button><button className="btn btp" onClick={()=>sbd(null)}>Add Another</button></div>
      </div>:<div>
        <div className="alert alert-info" style={{marginBottom:14}}>Animals are auto-tagged and purchase cost recorded as expense automatically.</div>
        <div className="fg">
          <F l="Animal Type" c={<select className="fsel" value={batch.animalType} onChange={e=>sb(p=>({...p,animalType:e.target.value,category:(BATCH_CATS[e.target.value]||[""])[0].toLowerCase()}))}>
            <option value="cattle">Cattle</option><option value="sheep">Sheep</option><option value="goats">Goats</option><option value="pigs">Pigs</option><option value="horses">Horses</option>
          </select>}/>
          <F l="Category" c={<select className="fsel" value={batch.category} onChange={e=>sb(p=>({...p,category:e.target.value}))}>
            {(BATCH_CATS[batch.animalType]||[]).map(c=><option key={c} value={c.toLowerCase()}>{c}</option>)}
          </select>}/>
          <F l="Number of Animals" c={<input className="fi" type="number" min="1" placeholder="e.g. 6" value={batch.count} onChange={e=>sb(p=>({...p,count:e.target.value}))}/>}/>
          <F l="Breed" c={<input className="fi" placeholder="e.g. Brahman" value={batch.breed} onChange={e=>sb(p=>({...p,breed:e.target.value}))}/>}/>
          <F l="Avg Weight (kg)" c={<input className="fi" type="number" value={batch.avgWeight} onChange={e=>sb(p=>({...p,avgWeight:e.target.value}))}/>}/>
          <F l="Farm" c={<input className="fi" value={batch.farm} onChange={e=>sb(p=>({...p,farm:e.target.value}))}/>}/>
          <F l="Price Per Head (N$)" c={<input className="fi" type="number" value={batch.pricePerHead} onChange={e=>sb(p=>({...p,pricePerHead:e.target.value}))}/>}/>
          <F l="Seller / Auction" c={<input className="fi" placeholder="e.g. Agra Windhoek" value={batch.seller} onChange={e=>sb(p=>({...p,seller:e.target.value}))}/>}/>
          <F l="Date" c={<input className="fi" type="date" value={batch.date} onChange={e=>sb(p=>({...p,date:e.target.value}))}/>}/>
          <F l="Notes" full c={<textarea className="fta" value={batch.notes} onChange={e=>sb(p=>({...p,notes:e.target.value}))}/>}/>
        </div>
        {batch.count&&batch.pricePerHead&&<div className="alert alert-green">{batch.count} × {"N$"}{fmt(batch.pricePerHead)} = <strong>{"N$"}{fmt(Number(batch.count)*Number(batch.pricePerHead))} total</strong></div>}
        <div className="ma"><button className="btn btg" onClick={()=>sm(null)}>{t.cancel}</button><button className="btn btp" onClick={saveBatch}>✅ Confirm &amp; Add</button></div>
      </div>}
    </Modal>}

    {/* NAMLITS / IMPORT MODAL */}
    {importModal&&<Modal title="📥 Import from Namlits / Document" onClose={()=>sim(false)} wide>
      <div className="alert alert-info" style={{marginBottom:14}}>
        Upload a Namlits herd statement (PDF, CSV, Excel, scanned image) — AI reads the animal counts and updates your herd automatically.
        <br/><strong style={{display:"block",marginTop:6}}>Supported: PDF • CSV • XLS/XLSX • JPG/PNG scans</strong>
      </div>
      {!importResult&&<div>
        <div style={{marginBottom:16}}>
          <label className="fl">Target Farm</label>
          <input className="fi" id="importFarm" defaultValue="Farm 1" style={{marginBottom:14}}/>
        </div>
        <label className="fl">Upload Namlits / Herd Statement</label>
        <input type="file" accept=".csv,.xlsx,.xls,.pdf,image/*" onChange={handleImportFile}
          style={{display:"block",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:8,padding:"10px 12px",color:"var(--text)",width:"100%",fontFamily:"'Syne',sans-serif",fontSize:13,cursor:"pointer",marginBottom:14}}/>
        {importLoading&&<div className="alert alert-info">🔍 Reading document...</div>}
      </div>}
      {importResult&&!importResult.error&&<div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"var(--amber-l)",marginBottom:12}}>IMPORT PREVIEW</div>
        <div style={{fontSize:12,color:"var(--text2)",marginBottom:14}}>Source: {importResult.source} • Date: {importResult.date||"Unknown"} • {importResult.notes||""}</div>
        <table style={{width:"100%",borderCollapse:"collapse",marginBottom:16}}>
          <thead><tr>{["Species","Category","Count","Breed"].map(h=><th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)",background:"var(--bg-surface)",borderBottom:"1px solid var(--border)"}}>{h}</th>)}</tr></thead>
          <tbody>{(importResult.animals||[]).map((a,i)=><tr key={i} style={{borderBottom:"1px solid var(--border)"}}>
            <td style={{padding:"8px 12px"}}>{a.type}</td>
            <td style={{padding:"8px 12px"}}><span className="b ba">{a.subcat}</span></td>
            <td style={{padding:"8px 12px",fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"var(--amber-l)"}}>{a.count}</td>
            <td style={{padding:"8px 12px",color:"var(--text2)"}}>{a.breed||"Unknown"}</td>
          </tr>)}</tbody>
        </table>
        <div className="ma">
          <button className="btn btg" onClick={()=>sir(null)}>Back</button>
          <button className="btn btp" onClick={()=>confirmImport(importResult,document.getElementById("importFarm")?.value||"Farm 1")}>✅ Import {(importResult.animals||[]).reduce((s,a)=>s+(a.count||0),0)} Animals</button>
        </div>
      </div>}
      {importResult?.error&&<div className="alert">{importResult.error}</div>}
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FARM SETTINGS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Settings({settings,setSettings}){
  const [form,sf]=useState({...settings});
  const save=()=>{setSettings(form);alert("Settings saved! Your name will now appear on all payslips.");};
  return <div>
    <div className="alert alert-info" style={{marginBottom:16}}>Your name and details will appear on all printed payslips and salary sheets.</div>
    <div className="feed-panel">
      <div className="feed-title">Owner / Business Details</div>
      <div className="fg">
        <F l="Owner Name" full c={<input className="fi" placeholder="e.g. JW van Zyl Farming" value={form.ownerName||""} onChange={e=>sf(p=>({...p,ownerName:e.target.value}))}/>}/>
        <F l="Farm / Business Name" c={<input className="fi" placeholder="e.g. Rooiwater Farm" value={form.farmName||""} onChange={e=>sf(p=>({...p,farmName:e.target.value}))}/>}/>
        <F l="Registration Number" c={<input className="fi" placeholder="e.g. CC/2010/1234" value={form.regNumber||""} onChange={e=>sf(p=>({...p,regNumber:e.target.value}))}/>}/>
        <F l="Address" c={<input className="fi" value={form.address||""} onChange={e=>sf(p=>({...p,address:e.target.value}))}/>}/>
        <F l="Phone" c={<input className="fi" value={form.phone||""} onChange={e=>sf(p=>({...p,phone:e.target.value}))}/>}/>
        <F l="Email" c={<input className="fi" type="email" value={form.email||""} onChange={e=>sf(p=>({...p,email:e.target.value}))}/>}/>
        <F l="Bank Name" c={<input className="fi" placeholder="e.g. FNB Namibia" value={form.bank||""} onChange={e=>sf(p=>({...p,bank:e.target.value}))}/>}/>
        <F l="Bank Account" c={<input className="fi" value={form.bankAcc||""} onChange={e=>sf(p=>({...p,bankAcc:e.target.value}))}/>}/>
      </div>
      <button className="btn btp" style={{marginTop:16,width:"100%",justifyContent:"center",padding:12}} onClick={save}>Save Settings</button>
    </div>
    <div className="feed-panel" style={{marginTop:20,border:"1px solid rgba(224,82,82,0.3)"}}>
      <div className="feed-title" style={{color:"var(--red)"}}>Danger Zone</div>
      <div style={{fontSize:13,color:"var(--text2)",marginBottom:16}}>This will permanently delete ALL farm data including animals, workers, transactions and settings. Cannot be undone.</div>
      <button className="btn btd" style={{width:"100%",justifyContent:"center",padding:12}} onClick={()=>{
        if(window.confirm("Are you sure? This will delete ALL your data and cannot be undone.")){
          if(window.confirm("Last warning — ALL data will be permanently deleted. Continue?")){
            localStorage.clear();
            window.location.reload();
          }
        }
      }}>🗑️ Clear All Data &amp; Start Fresh</button>
    </div>
  </div>;
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WORKERS  — SSC number, leave accrual setting
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Workers({workers,setWorkers,t}){
  const [q,sq]=useState("");
  const [modal,sm]=useState(null);
  const [form,sf]=useState({});

  const emptyForm={name:"",idNumber:"",sscNumber:"",position:"",startDate:"",salary:"",phone:"",farm:"Farm 1",leaveAccrualPerMonth:"1.5",leaveBalance:"0",payeTaxable:true,sscApplicable:true};

  const rows=workers.filter(w=>(w.name+w.position+w.farm).toLowerCase().includes(q.toLowerCase()));

  const save=()=>{
    const w={...form,salary:Number(form.salary),leaveAccrualPerMonth:Number(form.leaveAccrualPerMonth||1.5),leaveBalance:Number(form.leaveBalance||0),payeTaxable:form.payeTaxable!==false,sscApplicable:form.sscApplicable!==false};
    if(modal==="add") setWorkers(p=>[...p,{...w,id:Date.now()}]);
    else setWorkers(p=>p.map(x=>x.id===w.id?w:x));
    sm(null);
  };

  return <div>
    <div className="tw">
      <div className="tb">
        <input className="si" placeholder={t.search} value={q} onChange={e=>sq(e.target.value)}/>
        <button className="btn btp" onClick={()=>{sf({...emptyForm});sm("add")}}>+ {t.addWorker}</button>
      </div>
      {rows.length===0?<div className="nr">{t.noRecords}</div>:<table>
        <thead><tr><th>{t.workerName}</th><th>SSC No.</th><th>{t.position}</th><th>{t.farm}</th><th>{t.basicSalary}</th><th>Leave Balance</th><th>PAYE</th><th>SSC</th><th></th></tr></thead>
        <tbody>{rows.map(w=><tr key={w.id}>
          <td style={{fontWeight:600}}>{w.name}<div style={{fontSize:10,color:"var(--text3)"}}>{w.idNumber}</div></td>
          <td><span className="mono" style={{fontSize:11}}>{w.sscNumber||"—"}</span></td>
          <td>{w.position}</td>
          <td>{w.farm}</td>
          <td style={{color:"var(--amber-l)",fontWeight:700}}>{"N$"}{fmt(w.salary)}</td>
          <td><span style={{fontWeight:700,color:"var(--blue)"}}>{Number(w.leaveBalance||0).toFixed(1)} days</span></td>
          <td><span className={`b ${w.payeTaxable!==false?"bg":"br"}`}>{w.payeTaxable!==false?"On":"Off"}</span></td>
          <td><span className={`b ${w.sscApplicable!==false?"bg":"br"}`}>{w.sscApplicable!==false?"On":"Off"}</span></td>
          <td><div style={{display:"flex",gap:5}}>
            <button className="btn btg sm" onClick={()=>{sf({...emptyForm,...w,salary:String(w.salary),leaveAccrualPerMonth:String(w.leaveAccrualPerMonth||1.5),leaveBalance:String(w.leaveBalance||0)});sm("edit")}}>{t.edit}</button>
            <button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setWorkers(p=>p.filter(x=>x.id!==w.id))}}>{t.delete}</button>
          </div></td>
        </tr>)}</tbody>
      </table>}
    </div>
    {modal&&<Modal title={modal==="add"?`+ ${t.addWorker}`:t.edit} onClose={()=>sm(null)} wide>
      <div className="fg">
        <F l={t.workerName} c={<input className="fi" value={form.name||""} onChange={e=>sf(p=>({...p,name:e.target.value}))}/>}/>
        <F l={t.idNumber} c={<input className="fi" value={form.idNumber||""} onChange={e=>sf(p=>({...p,idNumber:e.target.value}))}/>}/>
        <F l="SSC Number" c={<input className="fi" placeholder="e.g. SSC-123456" value={form.sscNumber||""} onChange={e=>sf(p=>({...p,sscNumber:e.target.value}))}/>}/>
        <F l={t.position} c={<input className="fi" value={form.position||""} onChange={e=>sf(p=>({...p,position:e.target.value}))}/>}/>
        <F l={t.startDate} c={<input className="fi" type="date" value={form.startDate||""} onChange={e=>sf(p=>({...p,startDate:e.target.value}))}/>}/>
        <F l={t.basicSalary} c={<input className="fi" type="number" value={form.salary||""} onChange={e=>sf(p=>({...p,salary:e.target.value}))}/>}/>
        <F l={t.phone} c={<input className="fi" type="tel" value={form.phone||""} onChange={e=>sf(p=>({...p,phone:e.target.value}))}/>}/>
        <F l={t.farm} c={<input className="fi" value={form.farm||""} onChange={e=>sf(p=>({...p,farm:e.target.value}))}/>}/>
        <F l="Leave Accrual (days/month)" c={<input className="fi" type="number" step="0.5" placeholder="e.g. 1.5" value={form.leaveAccrualPerMonth||""} onChange={e=>sf(p=>({...p,leaveAccrualPerMonth:e.target.value}))}/>}/>
        <F l="Current Leave Balance (days)" c={<input className="fi" type="number" step="0.5" value={form.leaveBalance||""} onChange={e=>sf(p=>({...p,leaveBalance:e.target.value}))}/>}/>
        <F l="PAYE Tax" c={<select className="fsel" value={form.payeTaxable!==false?"yes":"no"} onChange={e=>sf(p=>({...p,payeTaxable:e.target.value==="yes"}))}>
          <option value="yes">Enabled (taxable)</option>
          <option value="no">Disabled (not taxable)</option>
        </select>}/>
        <F l="SSC Contribution" c={<select className="fsel" value={form.sscApplicable!==false?"yes":"no"} onChange={e=>sf(p=>({...p,sscApplicable:e.target.value==="yes"}))}>
          <option value="yes">Enabled</option>
          <option value="no">Disabled</option>
        </select>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(null)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LEAVE  — linked to balance, auto-accrual
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Leave({leave,setLeave,workers,setWorkers,t}){
  const [modal,sm]=useState(false);
  const [form,sf]=useState({workerId:"",type:"Annual",from:"",to:""});
  const [accrualDone,sad]=useState(false);

  const save=()=>{
    const w=workers.find(w=>w.id===Number(form.workerId));if(!w)return;
    const days=Math.round((new Date(form.to)-new Date(form.from))/86400000)+1;
    setLeave(p=>[...p,{...form,id:Date.now(),workerName:w.name,days,status:"Pending"}]);
    sm(false);
  };

  const upd=(id,status)=>{
    setLeave(p=>p.map(l=>{
      if(l.id!==id)return l;
      // When approved, deduct days from worker leave balance
      if(status==="Approved"){
        setWorkers(pw=>pw.map(w=>{
          if(w.name===l.workerName){
            const newBal=Math.max(0,Number(w.leaveBalance||0)-l.days);
            return{...w,leaveBalance:newBal};
          }
          return w;
        }));
      }
      return{...l,status};
    }));
  };

  // Monthly accrual — add leave days to all workers
  const runAccrual=()=>{
    setWorkers(p=>p.map(w=>{
      const accrual=Number(w.leaveAccrualPerMonth||1.5);
      return{...w,leaveBalance:Number((Number(w.leaveBalance||0)+accrual).toFixed(1))};
    }));
    sad(true);
    setTimeout(()=>sad(false),3000);
  };

  return <div>
    {/* Leave balances per worker */}
    <div style={{marginBottom:20}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"var(--text2)",marginBottom:12}}>LEAVE BALANCES</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,marginBottom:14}}>
        {workers.map(w=><div key={w.id} style={{background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px"}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{w.name}</div>
          <div style={{fontSize:10,color:"var(--text3)",marginBottom:8}}>{w.farm}</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"var(--blue)",lineHeight:1}}>{Number(w.leaveBalance||0).toFixed(1)}</div>
          <div style={{fontSize:11,color:"var(--text3)"}}>days available</div>
          <div style={{fontSize:10,color:"var(--text3)",marginTop:4}}>+{w.leaveAccrualPerMonth||1.5} days/month</div>
        </div>)}
      </div>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        <button className="btn btp" onClick={runAccrual}>📅 Run Monthly Accrual</button>
        {accrualDone&&<span style={{color:"var(--green)",fontSize:13,fontWeight:700}}>✓ Leave days added to all workers!</span>}
        <span style={{fontSize:12,color:"var(--text3)"}}>Click this at the start of each month</span>
      </div>
    </div>

    <div className="tw">
      <div className="tb"><button className="btn btp" onClick={()=>sm(true)}>+ {t.applyLeave}</button></div>
      {leave.length===0?<div className="nr">{t.noRecords}</div>:<table>
        <thead><tr><th>{t.workerName}</th><th>{t.leaveType}</th><th>{t.leaveStart}</th><th>{t.leaveEnd}</th><th>Days</th><th>{t.leaveStatus}</th><th></th></tr></thead>
        <tbody>{leave.map(l=><tr key={l.id}>
          <td style={{fontWeight:600}}>{l.workerName}</td><td>{l.type}</td><td>{l.from}</td><td>{l.to}</td><td>{l.days}</td><td><Badge s={l.status}/></td>
          <td>{l.status==="Pending"&&<div style={{display:"flex",gap:5}}>
            <button className="btn bte sm" onClick={()=>upd(l.id,"Approved")}>✓ Approve</button>
            <button className="btn btd sm" onClick={()=>upd(l.id,"Rejected")}>✗ Reject</button>
          </div>}</td>
        </tr>)}</tbody>
      </table>}
    </div>
    {modal&&<Modal title={`+ ${t.applyLeave}`} onClose={()=>sm(false)}>
      <div className="fg">
        <F l={t.workerName} full c={<select className="fsel" value={form.workerId} onChange={e=>sf(p=>({...p,workerId:e.target.value}))}>
          <option value="">— Select Worker —</option>
          {workers.map(w=><option key={w.id} value={w.id}>{w.name} ({Number(w.leaveBalance||0).toFixed(1)} days left)</option>)}
        </select>}/>
        <F l={t.leaveType} c={<select className="fsel" value={form.type} onChange={e=>sf(p=>({...p,type:e.target.value}))}><option>Annual</option><option>Sick</option><option>Family</option></select>}/>
        <F l={t.leaveStart} c={<input className="fi" type="date" value={form.from} onChange={e=>sf(p=>({...p,from:e.target.value}))}/>}/>
        <F l={t.leaveEnd} c={<input className="fi" type="date" value={form.to} onChange={e=>sf(p=>({...p,to:e.target.value}))}/>}/>
      </div>
      {form.from&&form.to&&<div className="alert alert-info" style={{marginTop:8}}>
        {Math.round((new Date(form.to)-new Date(form.from))/86400000)+1} days will be deducted from leave balance when approved.
      </div>}
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  BOOKKEEPING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Bookkeeping({transactions,setTransactions,t}){
  const [modal,sm]=useState(false); const [filter,sf]=useState("all");
  const [form,ff]=useState({date:"",description:"",category:"Fuel",type:"expense",amount:"",farm:"Farm 1",doc:""});
  const cats=["Livestock Sales","Livestock Purchase","Feed & Supplements","Fuel","Veterinary","Labour","Equipment","Other"];
  const rows=filter==="all"?transactions:transactions.filter(x=>x.type===filter);
  const income=transactions.filter(x=>x.type==="income").reduce((s,x)=>s+x.amount,0);
  const exp=transactions.filter(x=>x.type==="expense").reduce((s,x)=>s+x.amount,0);
  const save=()=>{setTransactions(p=>[{...form,id:Date.now(),amount:Number(form.amount)},...p]);sm(false);};
  return <div>
    <div className="smbar">
      <div className="smcard"><div className="smlabel">{t.totalIncome}</div><div className="smval" style={{color:"var(--green)"}}>{"N$"}{fmt(income)}</div></div>
      <div className="smcard"><div className="smlabel">{t.totalExpenses}</div><div className="smval" style={{color:"var(--red)"}}>{"N$"}{fmt(exp)}</div></div>
      <div className="smcard"><div className="smlabel">Net Profit</div><div className="smval" style={{color:(income-exp)>=0?"var(--green)":"var(--red)"}}>{"N$"}{fmt(income-exp)}</div></div>
    </div>
    <div className="tw">
      <div className="tb">
        <div className="tabs" style={{margin:0}}>{[["all","All"],["income",t.income],["expense",t.expense]].map(([k,l])=><button key={k} className={`tab ${filter===k?"active":""}`} onClick={()=>sf(k)}>{l}</button>)}</div>
        <button className="btn btp" onClick={()=>sm(true)}>+ {t.addTransaction}</button>
      </div>
      {rows.length===0?<div className="nr">{t.noRecords}</div>:<table>
        <thead><tr><th>{t.transDate}</th><th>{t.description}</th><th>{t.category}</th><th>{t.farm}</th><th>{t.type}</th><th>{t.amount}</th><th>Doc</th><th></th></tr></thead>
        <tbody>{rows.map(tx=><tr key={tx.id}>
          <td className="mono">{tx.date}</td><td>{tx.description}</td>
          <td><span className="b bm">{tx.category}</span></td><td>{tx.farm}</td>
          <td><Badge s={tx.type}/></td>
          <td style={{fontWeight:700,color:tx.type==="income"?"var(--green)":"var(--red)"}}>{tx.type==="expense"?"-":"+"}{"N$"}{fmt(tx.amount)}</td>
          <td>{tx.doc?<span style={{fontSize:11,color:"var(--blue)"}}>📎 {tx.doc}</span>:<span style={{color:"var(--text3)",fontSize:11}}>—</span>}</td>
          <td><button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setTransactions(p=>p.filter(x=>x.id!==tx.id))}}>✕</button></td>
        </tr>)}</tbody>
      </table>}
    </div>
    {modal&&<Modal title={`+ ${t.addTransaction}`} onClose={()=>sm(false)}>
      <div className="fg">
        <F l={t.transDate} c={<input className="fi" type="date" value={form.date} onChange={e=>ff(p=>({...p,date:e.target.value}))}/>}/>
        <F l={t.farm} c={<input className="fi" value={form.farm} onChange={e=>ff(p=>({...p,farm:e.target.value}))}/>}/>
        <F l={t.description} full c={<input className="fi" value={form.description} onChange={e=>ff(p=>({...p,description:e.target.value}))}/>}/>
        <F l={t.category} c={<select className="fsel" value={form.category} onChange={e=>ff(p=>({...p,category:e.target.value}))}>{cats.map(c=><option key={c}>{c}</option>)}</select>}/>
        <F l={t.type} c={<select className="fsel" value={form.type} onChange={e=>ff(p=>({...p,type:e.target.value}))}><option value="income">{t.income}</option><option value="expense">{t.expense}</option></select>}/>
        <F l={t.amount} c={<input className="fi" type="number" value={form.amount} onChange={e=>ff(p=>({...p,amount:e.target.value}))}/>}/>
        <F l="Receipt / Invoice Name" full c={<input className="fi" placeholder="e.g. invoice_jan2025.pdf" value={form.doc} onChange={e=>ff(p=>({...p,doc:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  TAX & SALARIES — PAYE/SSC toggle, preview, fixed print
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const DEFAULT_DEDUCTION_TYPES=[
  {id:"ssc",label:"SSC (0.9%)",auto:true,type:"pct",value:0.9,removable:false},
  {id:"paye",label:"PAYE (NamRA)",auto:true,type:"tax",value:0,removable:false},
  {id:"union",label:"Union Fee",auto:false,type:"fixed",value:0,removable:true},
  {id:"loan",label:"Salary Advance",auto:false,type:"fixed",value:0,removable:true},
  {id:"store",label:"Store Account",auto:false,type:"fixed",value:0,removable:true},
  {id:"accom",label:"Accommodation",auto:false,type:"fixed",value:0,removable:true},
];

function buildPayslipHTML(w,c,month,ownerLine,settings){
  const customRows=c.customDeds.filter(d=>d.amount>0).map(d=>"<tr><td>"+d.label+"</td><td class='red'>-N$"+fmt(d.amount)+"</td></tr>").join("");
  const sscRow=w.sscApplicable!==false?"<tr><td>SSC Employee (0.9%)"+(w.sscNumber?" — "+w.sscNumber:"")+"</td><td class='red'>-N$"+fmt(c.sscEmp)+"</td></tr>":"";
  const payeRow=w.payeTaxable!==false?"<tr><td>PAYE (NamRA 2024/25)</td><td class='red'>-N$"+fmt(c.paye)+"</td></tr>":"";
  return "<div class='section'>"
    +"<div style='display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #d4812a;padding-bottom:12px;margin-bottom:16px'>"
    +"<div><div style='font-size:24px;font-weight:900;color:#d4812a;letter-spacing:2px'>FarmLogic</div>"
    +(settings?.ownerName?"<div style='font-size:12px;color:#555'>"+settings.ownerName+"</div>":"")
    +(settings?.address?"<div style='font-size:11px;color:#888'>"+settings.address+"</div>":"")
    +(settings?.phone?"<div style='font-size:11px;color:#888'>"+settings.phone+"</div>":"")
    +"</div><div style='text-align:right'>"
    +"<div style='font-size:14px;font-weight:700'>"+w.name+"</div>"
    +"<div style='font-size:11px;color:#555'>"+w.position+" — "+w.farm+"</div>"
    +"<div style='font-size:11px;color:#888'>ID: "+(w.idNumber||"—")+"</div>"
    +(w.sscNumber?"<div style='font-size:11px;color:#888'>SSC: "+w.sscNumber+"</div>":"")
    +"<div style='font-size:11px;color:#888'>Payslip: "+month+"</div>"
    +"</div></div>"
    +"<table><tr><th>Description</th><th style='text-align:right'>Amount</th></tr>"
    +"<tr><td>Basic Salary</td><td class='amber' style='text-align:right'>N$"+fmt(w.salary)+"</td></tr>"
    +sscRow+payeRow+customRows
    +"<tr class='total-row'><td>Total Deductions</td><td class='red' style='text-align:right'>-N$"+fmt(c.totalDed)+"</td></tr>"
    +"<tr style='background:#e8f5e9'><td><strong>NET PAY</strong></td><td class='green' style='text-align:right;font-size:14px'><strong>N$"+fmt(c.net)+"</strong></td></tr>"
    +"</table>"
    +"<table style='margin-top:8px'>"
    +"<tr><td style='color:#888'>SSC Employer (1.8%)</td><td style='text-align:right'>N$"+fmt(c.sscEr)+"</td></tr>"
    +"<tr><td style='color:#888'>Cost to Company</td><td style='text-align:right;font-weight:700'>N$"+fmt(c.ctc)+"</td></tr>"
    +"<tr><td style='color:#888'>Effective Tax Rate</td><td style='text-align:right'>"+c.effRate+"%</td></tr>"
    +"</table>"
    +"</div>";
}

function printSalarySheet(html){
  const w=window.open("","_blank","width=900,height=700,scrollbars=yes");
  if(!w){alert("Pop-up blocked! Please allow pop-ups for this app in your browser settings, then try again.");return;}
  const css="*{box-sizing:border-box}body{font-family:Arial,sans-serif;padding:20px;color:#111;font-size:12px;margin:0}h1{font-size:22px;color:#d4812a;margin-bottom:2px;letter-spacing:2px}h2{font-size:12px;color:#555;font-weight:normal;margin-bottom:16px}table{width:100%;border-collapse:collapse;margin-bottom:12px}th{background:#1a1a1a;color:#fff;padding:6px 10px;text-align:left;font-size:10px;letter-spacing:1px;text-transform:uppercase}td{padding:6px 10px;border-bottom:1px solid #eee;font-size:11px}tr:nth-child(even) td{background:#fafafa}.total-row td{background:#f5f5f5;font-weight:bold}.red{color:#c00}.green{color:#1a8a3a}.amber{color:#d4812a}.section{margin-bottom:24px;page-break-inside:avoid}.footer{font-size:9px;color:#aaa;text-align:center;margin-top:20px;border-top:1px solid #eee;padding-top:8px}@media print{body{padding:10px}.no-print{display:none}@page{margin:1cm}}";
  const footer="<div class='footer'>FarmLogic — NamRA Compliant 2024/25 — "+new Date().toLocaleString()+"</div>";
  const printBtn="<div class='no-print' style='position:fixed;top:12px;right:12px;display:flex;gap:8px'><button onclick='window.print()' style='padding:10px 20px;background:#d48c2a;color:#000;border:none;border-radius:6px;font-weight:700;font-size:13px;cursor:pointer'>🖨️ Print</button><button onclick='window.close()' style='padding:10px 20px;background:#eee;color:#333;border:none;border-radius:6px;font-weight:700;font-size:13px;cursor:pointer'>✕ Close</button></div>";
  w.document.write("<!DOCTYPE html><html><head><title>FarmLogic Salary Sheet</title><meta charset='utf-8'><style>"+css+"</style></head><body>"+printBtn+html+footer+"</body></html>");
  w.document.close();
}

function TaxPayroll({workers,settings,leave,t}){
  const [deductionTypes,setDT]=useState(DEFAULT_DEDUCTION_TYPES);
  const [workerDeductions,setWD]=useState({});
  const [showDeductMgr,sdm]=useState(false);
  const [newDedLabel,sndl]=useState("");
  const [selectedMonth,ssm]=useState(new Date().toISOString().slice(0,7));
  const [previewWorker,spw]=useState(null);

  const month=new Date(selectedMonth+"-01").toLocaleString("default",{month:"long",year:"numeric"});
  const getWorkerDed=(wId,dId)=>Number(workerDeductions?.[wId]?.[dId]||0);
  const setWorkerDed=(wId,dId,val)=>setWD(p=>({...p,[wId]:{...(p[wId]||{}),[dId]:Number(val)||0}}));

  const calcWorker=(w)=>{
    const ann=w.salary*12;
    const annTax=w.payeTaxable!==false?calcNamibiaTax(ann):0;
    const paye=w.payeTaxable!==false?Math.round(annTax/12):0;
    const sscEmp=w.sscApplicable!==false?calcSSC(w.salary):0;
    const sscEr=w.sscApplicable!==false?calcSSCEmployer(w.salary):0;
    const customDeds=deductionTypes.filter(d=>!d.auto&&d.id!=="ssc"&&d.id!=="paye").map(d=>({...d,amount:getWorkerDed(w.id,d.id)}));
    const totalCustom=customDeds.reduce((s,d)=>s+d.amount,0);
    const totalDed=sscEmp+paye+totalCustom;
    const net=w.salary-totalDed;
    const ctc=w.salary+sscEr;
    const effRate=ann>0?((annTax/ann)*100).toFixed(1):0;
    return{ann,annTax,paye,sscEmp,sscEr,customDeds,totalCustom,totalDed,net,ctc,effRate};
  };

  const addDeduction=()=>{if(!newDedLabel.trim())return;setDT(p=>[...p,{id:"c_"+Date.now(),label:newDedLabel.trim(),auto:false,type:"fixed",value:0,removable:true}]);sndl("");};
  const removeDeduction=(id)=>setDT(p=>p.filter(d=>d.id!==id));

  const printSlip=(w)=>{
    const c=calcWorker(w);
    const html=buildPayslipHTML(w,c,month,"",settings);
    printSalarySheet(html);
  };

  const printAllSlips=()=>{
    const html=workers.map(w=>{
      const c=calcWorker(w);
      return buildPayslipHTML(w,c,month,"",settings)+"<div style='page-break-after:always'></div>";
    }).join("");
    printSalarySheet("<h1>FarmLogic</h1><h2>All Payslips — "+month+"</h2>"+html);
  };

  const printSummarySheet=()=>{
    const customActive=deductionTypes.filter(d=>!d.auto);
    const totals=workers.reduce((acc,w)=>{const c=calcWorker(w);acc.gross+=w.salary;acc.sscEmp+=c.sscEmp;acc.paye+=c.paye;acc.custom+=c.totalCustom;acc.net+=c.net;acc.ctc+=c.ctc;return acc;},{gross:0,sscEmp:0,paye:0,custom:0,net:0,ctc:0});
    const customHeaders=customActive.map(d=>"<th>"+d.label+"</th>").join("");
    const rows=workers.map(w=>{
      const c=calcWorker(w);
      const customCells=customActive.map(d=>{const amt=c.customDeds.find(x=>x.id===d.id)?.amount||0;return "<td class='red'>"+(amt>0?"N$"+fmt(amt):"—")+"</td>";}).join("");
      return "<tr><td><strong>"+w.name+"</strong><br><small style='color:#888'>"+(w.sscNumber||"")+"</small></td><td>"+w.position+"</td><td>"+w.farm+"</td><td class='amber'>N$"+fmt(w.salary)+"</td><td class='red'>"+(w.sscApplicable!==false?"N$"+fmt(c.sscEmp):"—")+"</td><td class='red'>"+(w.payeTaxable!==false?"N$"+fmt(c.paye):"—")+"</td>"+customCells+"<td class='red'><strong>N$"+fmt(c.totalDed)+"</strong></td><td class='green'><strong>N$"+fmt(c.net)+"</strong></td><td class='amber'>N$"+fmt(c.ctc)+"</td><td style='min-width:100px'></td></tr>";
    }).join("");
    const totRow="<tr class='total-row'><td colspan='3'><strong>TOTALS</strong></td><td>N$"+fmt(totals.gross)+"</td><td>N$"+fmt(totals.sscEmp)+"</td><td>N$"+fmt(totals.paye)+"</td>"+customActive.map(()=>"<td>—</td>").join("")+"<td>N$"+fmt(totals.sscEmp+totals.paye+totals.custom)+"</td><td>N$"+fmt(totals.net)+"</td><td>N$"+fmt(totals.ctc)+"</td><td></td></tr>";
    const ownerLine=settings?.ownerName?"<h2>"+settings.ownerName+" — Monthly Salary Sheet — "+month+"</h2>":"<h2>Monthly Salary Sheet — "+month+"</h2>";
    const html="<h1>FarmLogic</h1>"+ownerLine+"<table><tr><th>Employee</th><th>Position</th><th>Farm</th><th>Gross</th><th>SSC</th><th>PAYE</th>"+customHeaders+"<th>Total Ded.</th><th>Net Pay</th><th>CTC</th><th>Signature</th></tr>"+rows+totRow+"</table>";
    printSalarySheet(html);
  };

  const brackets=[{range:"N$0 – N$50,000",rate:"0%"},{range:"N$50,001 – N$100,000",rate:"18%"},{range:"N$100,001 – N$300,000",rate:"25%"},{range:"N$300,001 – N$500,000",rate:"30%"},{range:"N$500,001 – N$800,000",rate:"32%"},{range:"N$800,001 – N$1,500,000",rate:"34%"},{range:"Above N$1,500,000",rate:"37%"}];
  const totalPayroll=workers.reduce((s,w)=>s+w.salary,0);
  const totalSSCEr=workers.reduce((s,w)=>s+calcSSCEmployer(w.salary),0);
  const totalNet=workers.reduce((s,w)=>s+calcWorker(w).net,0);
  const customActiveDeds=deductionTypes.filter(d=>!d.auto);

  return <div>
    <div className="dg3" style={{marginBottom:20}}>
      <div className="card"><div className="ctitle">Total Gross</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:"var(--amber-l)"}}>{"N$"}{fmt(totalPayroll)}</div><div style={{fontSize:11,color:"var(--text3)",marginTop:4}}>{month}</div></div>
      <div className="card"><div className="ctitle">Total Net Pay</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:"var(--green)"}}>{"N$"}{fmt(totalNet)}</div></div>
      <div className="card"><div className="ctitle">Cost to Company</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:"var(--red)"}}>{"N$"}{fmt(totalPayroll+totalSSCEr)}</div></div>
    </div>

    <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
      <input type="month" value={selectedMonth} onChange={e=>ssm(e.target.value)} style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 12px",color:"var(--text)",fontFamily:"'Syne',sans-serif",fontSize:13,outline:"none"}}/>
      <button className="btn btp" onClick={printSummarySheet}>🖨️ Print Salary Sheet</button>
      <button className="btn btb" onClick={printAllSlips}>📄 Print All Payslips</button>
      <button className="btn btg" onClick={()=>sdm(true)}>⚙ Manage Deductions</button>
    </div>

    <div className="tw" style={{overflowX:"auto"}}>
      <table>
        <thead><tr>
          <th>Employee</th><th>Farm</th><th>Gross</th><th>SSC</th><th>PAYE</th>
          {customActiveDeds.map(d=><th key={d.id}>{d.label}</th>)}
          <th>Total Ded.</th><th style={{color:"var(--green)"}}>Net Pay</th><th>CTC</th><th>Actions</th>
        </tr></thead>
        <tbody>{workers.map(w=>{
          const c=calcWorker(w);
          return <tr key={w.id}>
            <td style={{fontWeight:600}}>{w.name}<div style={{fontSize:10,color:"var(--text3)"}}>{w.position}</div></td>
            <td>{w.farm}</td>
            <td style={{color:"var(--amber-l)",fontWeight:700}}>{"N$"}{fmt(w.salary)}</td>
            <td>{w.sscApplicable!==false?<span style={{color:"var(--red)"}}>-{"N$"}{fmt(c.sscEmp)}</span>:<span className="b bm">Off</span>}</td>
            <td>{w.payeTaxable!==false?<span style={{color:"var(--red)"}}>-{"N$"}{fmt(c.paye)}</span>:<span className="b bm">Off</span>}</td>
            {customActiveDeds.map(d=>{
              const amt=getWorkerDed(w.id,d.id);
              return <td key={d.id}><input type="number" min="0" value={amt||""} placeholder="0" onChange={e=>setWorkerDed(w.id,d.id,e.target.value)} style={{width:80,background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:6,padding:"4px 8px",color:amt>0?"var(--red)":"var(--text3)",fontFamily:"'Syne',sans-serif",fontSize:12,outline:"none",textAlign:"right"}}/></td>;
            })}
            <td style={{color:"var(--red)",fontWeight:700}}>-{"N$"}{fmt(c.totalDed)}</td>
            <td style={{color:"var(--green)",fontWeight:800}}>{"N$"}{fmt(c.net)}</td>
            <td style={{color:"var(--amber-l)"}}><span style={{fontSize:11}}>{"N$"}{fmt(c.ctc)}</span></td>
            <td><div style={{display:"flex",gap:4}}>
              <button className="btn btg sm" onClick={()=>spw(w)} title="Preview payslip">👁</button>
              <button className="btn btp sm" onClick={()=>printSlip(w)}>🖨️</button>
            </div></td>
          </tr>;
        })}</tbody>
        <tfoot><tr style={{borderTop:"2px solid var(--border-hi)"}}>
          <td colSpan={2} style={{fontWeight:800,padding:"12px 14px"}}>TOTALS</td>
          <td style={{color:"var(--amber-l)",fontWeight:800}}>{"N$"}{fmt(totalPayroll)}</td>
          <td style={{color:"var(--red)"}}>{"N$"}{fmt(workers.reduce((s,w)=>s+calcWorker(w).sscEmp,0))}</td>
          <td style={{color:"var(--red)"}}>{"N$"}{fmt(workers.reduce((s,w)=>s+calcWorker(w).paye,0))}</td>
          {customActiveDeds.map(d=><td key={d.id} style={{color:"var(--red)"}}>{"N$"}{fmt(workers.reduce((s,w)=>s+getWorkerDed(w.id,d.id),0))}</td>)}
          <td style={{color:"var(--red)",fontWeight:800}}>{"N$"}{fmt(workers.reduce((s,w)=>s+calcWorker(w).totalDed,0))}</td>
          <td style={{color:"var(--green)",fontWeight:800}}>{"N$"}{fmt(totalNet)}</td>
          <td style={{color:"var(--amber-l)",fontWeight:800}}>{"N$"}{fmt(totalPayroll+totalSSCEr)}</td>
          <td></td>
        </tr></tfoot>
      </table>
    </div>

    <div className="dg" style={{marginTop:20}}>
      <div className="card"><div className="ctitle">NamRA Tax Brackets 2024/25</div>{brackets.map((b,i)=><div key={i} className="bracket-row"><span style={{fontSize:12,color:"var(--text2)"}}>{b.range}</span><span style={{fontWeight:700,color:"var(--amber-l)"}}>{b.rate}</span></div>)}</div>
      <div className="card"><div className="ctitle">SSC Rates 2024/25</div>
        <div className="bracket-row"><span style={{color:"var(--text2)"}}>Employee (0.9%)</span><b style={{color:"var(--green)"}}>Max N$81/mo</b></div>
        <div className="bracket-row"><span style={{color:"var(--text2)"}}>Employer (1.8%)</span><b style={{color:"var(--amber-l)"}}>Max N$162/mo</b></div>
        <div className="bracket-row"><span style={{color:"var(--text2)"}}>Insurable ceiling</span><b>N$9,000/mo</b></div>
      </div>
    </div>

    {/* PAYSLIP PREVIEW MODAL */}
    {previewWorker&&(()=>{
      const w=previewWorker; const c=calcWorker(w);
      return <Modal title={"Payslip Preview — "+w.name} onClose={()=>spw(null)} wide>
        <div style={{background:"#fff",color:"#111",padding:24,borderRadius:8,fontFamily:"Arial,sans-serif",fontSize:12}}>
          <div style={{display:"flex",justifyContent:"space-between",borderBottom:"2px solid #d4812a",paddingBottom:12,marginBottom:16}}>
            <div>
              <div style={{fontSize:22,fontWeight:900,color:"#d4812a",letterSpacing:2}}>FarmLogic</div>
              {settings?.ownerName&&<div style={{fontSize:12,color:"#555"}}>{settings.ownerName}</div>}
              {settings?.address&&<div style={{fontSize:11,color:"#888"}}>{settings.address}</div>}
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontWeight:700,fontSize:14}}>{w.name}</div>
              <div style={{fontSize:11,color:"#555"}}>{w.position} — {w.farm}</div>
              <div style={{fontSize:11,color:"#888"}}>ID: {w.idNumber||"—"}</div>
              {w.sscNumber&&<div style={{fontSize:11,color:"#888"}}>SSC: {w.sscNumber}</div>}
              <div style={{fontSize:11,color:"#888"}}>{month}</div>
            </div>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",marginBottom:10}}>
            <thead><tr><th style={{background:"#1a1a1a",color:"#fff",padding:"6px 10px",textAlign:"left",fontSize:10,letterSpacing:1,textTransform:"uppercase"}}>Description</th><th style={{background:"#1a1a1a",color:"#fff",padding:"6px 10px",textAlign:"right",fontSize:10,letterSpacing:1,textTransform:"uppercase"}}>Amount</th></tr></thead>
            <tbody>
              <tr><td style={{padding:"6px 10px",borderBottom:"1px solid #eee"}}>Basic Salary</td><td style={{padding:"6px 10px",borderBottom:"1px solid #eee",textAlign:"right",color:"#d4812a",fontWeight:700}}>{"N$"}{fmt(w.salary)}</td></tr>
              {w.sscApplicable!==false&&<tr><td style={{padding:"6px 10px",borderBottom:"1px solid #eee"}}>SSC Employee (0.9%){w.sscNumber?" — "+w.sscNumber:""}</td><td style={{padding:"6px 10px",borderBottom:"1px solid #eee",textAlign:"right",color:"#c00"}}>-{"N$"}{fmt(c.sscEmp)}</td></tr>}
              {w.payeTaxable!==false&&<tr><td style={{padding:"6px 10px",borderBottom:"1px solid #eee"}}>PAYE (NamRA 2024/25)</td><td style={{padding:"6px 10px",borderBottom:"1px solid #eee",textAlign:"right",color:"#c00"}}>-{"N$"}{fmt(c.paye)}</td></tr>}
              {c.customDeds.filter(d=>d.amount>0).map(d=><tr key={d.id}><td style={{padding:"6px 10px",borderBottom:"1px solid #eee"}}>{d.label}</td><td style={{padding:"6px 10px",borderBottom:"1px solid #eee",textAlign:"right",color:"#c00"}}>-{"N$"}{fmt(d.amount)}</td></tr>)}
              <tr style={{background:"#f5f5f5"}}><td style={{padding:"6px 10px",borderBottom:"1px solid #eee",fontWeight:700}}>Total Deductions</td><td style={{padding:"6px 10px",borderBottom:"1px solid #eee",textAlign:"right",color:"#c00",fontWeight:700}}>-{"N$"}{fmt(c.totalDed)}</td></tr>
              <tr style={{background:"#e8f5e9"}}><td style={{padding:"6px 10px",fontWeight:800,fontSize:14}}>NET PAY</td><td style={{padding:"6px 10px",textAlign:"right",color:"#1a8a3a",fontWeight:800,fontSize:14}}>{"N$"}{fmt(c.net)}</td></tr>
            </tbody>
          </table>
          <div style={{fontSize:11,color:"#888",marginTop:8}}>Cost to Company: {"N$"}{fmt(c.ctc)} &nbsp;|&nbsp; Effective Tax Rate: {c.effRate}%</div>
        </div>
        <div className="ma">
          <button className="btn btg" onClick={()=>spw(null)}>Close</button>
          <button className="btn btp" onClick={()=>{printSlip(w);spw(null);}}>🖨️ Print This Payslip</button>
        </div>
      </Modal>;
    })()}

    {/* DEDUCTION MANAGER */}
    {showDeductMgr&&<Modal title="Manage Deductions" onClose={()=>sdm(false)}>
      <div style={{marginBottom:16}}>
        {deductionTypes.map(d=><div key={d.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:"var(--bg-surface)",borderRadius:8,marginBottom:6,border:"1px solid var(--border)"}}>
          <div><span style={{fontWeight:600,fontSize:13}}>{d.label}</span>{d.auto&&<span className="b ba" style={{marginLeft:8,fontSize:9}}>Auto</span>}</div>
          {d.removable&&<button className="btn btd sm" onClick={()=>removeDeduction(d.id)}>✕ Remove</button>}
        </div>)}
      </div>
      <div style={{display:"flex",gap:10}}>
        <input className="fi" placeholder="New deduction e.g. Housing, Tools..." value={newDedLabel} onChange={e=>sndl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addDeduction()} style={{flex:1}}/>
        <button className="btn btp" onClick={addDeduction}>+ Add</button>
      </div>
      <div className="ma"><button className="btn btp" onClick={()=>sdm(false)}>Done</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  INVENTORY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Inventory({inventory,setInventory,t}){
  const [modal,sm]=useState(false); const [eid,se]=useState(null);
  const [form,sf]=useState({name:"",category:"Feed",quantity:"",unit:"",minStock:"",farm:"Farm 1"});
  const cats=["Feed","Medicine","Fuel","Equipment","Other"];
  const save=()=>{
    if(eid)setInventory(p=>p.map(i=>i.id===eid?{...form,id:eid,quantity:Number(form.quantity),minStock:Number(form.minStock),lastUpdated:new Date().toISOString().split("T")[0]}:i));
    else setInventory(p=>[...p,{...form,id:Date.now(),quantity:Number(form.quantity),minStock:Number(form.minStock),lastUpdated:new Date().toISOString().split("T")[0]}]);
    sm(false);se(null);
  };
  return <div>
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:14}}>
      <button className="btn btp" onClick={()=>{sf({name:"",category:"Feed",quantity:"",unit:"",minStock:"",farm:"Farm 1"});se(null);sm(true)}}>+ {t.addItem}</button>
    </div>
    <div className="inv-grid">
      {inventory.map(item=>{
        const low=item.quantity<=item.minStock;
        return <div key={item.id} className={`inv-card ${low?"low":"ok"}`}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:3}}>{item.name}</div>
          <div style={{fontSize:10,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)",marginBottom:10}}>{item.category}</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:"var(--amber-l)",lineHeight:1}}>{item.quantity}</div>
          <div style={{fontSize:11,color:"var(--text3)",marginTop:2}}>{item.unit}</div>
          {low&&<div style={{marginTop:8}}><span className="b br">⚠ {t.lowStock}</span></div>}
          <div style={{fontSize:11,color:"var(--text2)",marginTop:8}}>📍 {item.farm}</div>
          <div style={{display:"flex",gap:5,marginTop:10}}>
            <button className="btn btg sm" onClick={()=>{sf({...item,quantity:String(item.quantity),minStock:String(item.minStock)});se(item.id);sm(true)}}>{t.edit}</button>
            <button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setInventory(p=>p.filter(i=>i.id!==item.id))}}>{t.delete}</button>
          </div>
        </div>;
      })}
    </div>
    {modal&&<Modal title={eid?t.edit:`+ ${t.addItem}`} onClose={()=>sm(false)}>
      <div className="fg">
        <F l={t.itemName} full c={<input className="fi" value={form.name} onChange={e=>sf(p=>({...p,name:e.target.value}))}/>}/>
        <F l={t.itemCategory} c={<select className="fsel" value={form.category} onChange={e=>sf(p=>({...p,category:e.target.value}))}>{cats.map(c=><option key={c}>{c}</option>)}</select>}/>
        <F l={t.farm} c={<input className="fi" value={form.farm} onChange={e=>sf(p=>({...p,farm:e.target.value}))}/>}/>
        <F l={t.quantity} c={<input className="fi" type="number" value={form.quantity} onChange={e=>sf(p=>({...p,quantity:e.target.value}))}/>}/>
        <F l={t.unit} c={<input className="fi" placeholder="Bales / Bags / Litres" value={form.unit} onChange={e=>sf(p=>({...p,unit:e.target.value}))}/>}/>
        <F l={t.minStock} c={<input className="fi" type="number" value={form.minStock} onChange={e=>sf(p=>({...p,minStock:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  VET & HEALTH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function VetLog({vetlog,setVetlog,t}){
  const [modal,sm]=useState(false); const [form,sf]=useState({animal:"",type:"Vaccination",medicine:"",dosage:"",date:"",nextDue:"",notes:"",farm:"Farm 1"});
  const today=new Date().toISOString().split("T")[0];
  const overdue=vetlog.filter(v=>v.nextDue&&v.nextDue<=today);
  const save=()=>{setVetlog(p=>[{...form,id:Date.now()},...p]);sm(false);};
  return <div>
    {overdue.length>0&&<div className="alert">⚠️ {overdue.length} animal(s) overdue — {overdue.map(v=>v.animal).join(", ")}</div>}
    <div className="tw">
      <div className="tb"><button className="btn btp" onClick={()=>{sf({animal:"",type:"Vaccination",medicine:"",dosage:"",date:"",nextDue:"",notes:"",farm:"Farm 1"});sm(true)}}>+ {t.addVetRecord}</button></div>
      {vetlog.length===0?<div className="nr">{t.noRecords}</div>:<table>
        <thead><tr><th>{t.animal}</th><th>{t.vetType}</th><th>{t.medicine}</th><th>{t.dosage}</th><th>{t.vetDate}</th><th>{t.nextDue}</th><th>{t.farm}</th><th>{t.vetNotes}</th><th></th></tr></thead>
        <tbody>{vetlog.map(v=><tr key={v.id}>
          <td><span className="mono">{v.animal}</span></td>
          <td><span className={`b ${v.type==="Vaccination"?"bb":v.type==="Treatment"?"br":v.type==="Deworming"?"ba":"bm"}`}>{v.type}</span></td>
          <td>{v.medicine}</td><td>{v.dosage}</td><td>{v.date}</td>
          <td style={{color:v.nextDue&&v.nextDue<=today?"var(--red)":"var(--text)"}}>{v.nextDue||"—"}</td>
          <td>{v.farm}</td><td style={{fontSize:12,color:"var(--text2)",maxWidth:140}}>{v.notes||"—"}</td>
          <td><button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setVetlog(p=>p.filter(x=>x.id!==v.id))}}>✕</button></td>
        </tr>)}</tbody>
      </table>}
    </div>
    {modal&&<Modal title={`+ ${t.addVetRecord}`} onClose={()=>sm(false)}>
      <div className="fg">
        <F l={t.animal} c={<input className="fi" placeholder="Tag e.g. C-001" value={form.animal} onChange={e=>sf(p=>({...p,animal:e.target.value}))}/>}/>
        <F l={t.vetType} c={<select className="fsel" value={form.type} onChange={e=>sf(p=>({...p,type:e.target.value}))}>{["Vaccination","Treatment","Deworming","Check-up"].map(x=><option key={x}>{x}</option>)}</select>}/>
        <F l={t.medicine} c={<input className="fi" value={form.medicine} onChange={e=>sf(p=>({...p,medicine:e.target.value}))}/>}/>
        <F l={t.dosage} c={<input className="fi" placeholder="e.g. 2ml" value={form.dosage} onChange={e=>sf(p=>({...p,dosage:e.target.value}))}/>}/>
        <F l={t.vetDate} c={<input className="fi" type="date" value={form.date} onChange={e=>sf(p=>({...p,date:e.target.value}))}/>}/>
        <F l={t.nextDue} c={<input className="fi" type="date" value={form.nextDue} onChange={e=>sf(p=>({...p,nextDue:e.target.value}))}/>}/>
        <F l={t.farm} c={<input className="fi" value={form.farm} onChange={e=>sf(p=>({...p,farm:e.target.value}))}/>}/>
        <F l={t.vetNotes} full c={<textarea className="fta" value={form.notes} onChange={e=>sf(p=>({...p,notes:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  GRAZING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Grazing({camps,setCamps,t}){
  const [modal,sm]=useState(false); const [form,sf]=useState({name:"",size:"",status:"Available",animalCount:0,lastGrazed:"",waterPoint:false,farm:"Farm 1"});
  const sk={"In Use":"iu",Resting:"rs",Available:"av"};
  const save=()=>{setCamps(p=>[...p,{...form,id:Date.now(),size:Number(form.size),animalCount:Number(form.animalCount)}]);sm(false);};
  const rot=(id,s)=>setCamps(p=>p.map(c=>c.id===id?{...c,status:s,animalCount:s==="Available"?0:c.animalCount,lastGrazed:s==="Resting"?new Date().toISOString().split("T")[0]:c.lastGrazed}:c));
  return <div>
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:14}}>
      <button className="btn btp" onClick={()=>{sf({name:"",size:"",status:"Available",animalCount:0,lastGrazed:"",waterPoint:false,farm:"Farm 1"});sm(true)}}>+ {t.addCamp}</button>
    </div>
    <div className="cg">
      {camps.map(c=><div key={c.id} className={`cc ${sk[c.status]||""}`}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:8}}>{c.name}</div>
        <Badge s={c.status}/>
        <div className="cm" style={{marginTop:10}}>
          <span><span>Size</span><b>{c.size} ha</b></span>
          <span><span>Animals</span><b>{c.animalCount}</b></span>
          <span><span>Last Grazed</span><b>{c.lastGrazed||"—"}</b></span>
          <span><span>Water</span><b>{c.waterPoint?"✓ Yes":"✗ No"}</b></span>
          <span><span>Farm</span><b>{c.farm}</b></span>
        </div>
        <div style={{display:"flex",gap:5,marginTop:12,flexWrap:"wrap"}}>
          {c.status==="Available"&&<button className="btn btp sm" onClick={()=>rot(c.id,"In Use")}>🐄 {t.rotateIn}</button>}
          {c.status==="In Use"&&<button className="btn btg sm" onClick={()=>rot(c.id,"Resting")}>💤 {t.rotateOut}</button>}
          {c.status==="Resting"&&<button className="btn bte sm" onClick={()=>rot(c.id,"Available")}>✓ Available</button>}
          <button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setCamps(p=>p.filter(x=>x.id!==c.id))}}>✕</button>
        </div>
      </div>)}
    </div>
    {modal&&<Modal title={`+ ${t.addCamp}`} onClose={()=>sm(false)}>
      <div className="fg">
        <F l={t.campName} full c={<input className="fi" value={form.name} onChange={e=>sf(p=>({...p,name:e.target.value}))}/>}/>
        <F l={t.campSize} c={<input className="fi" type="number" value={form.size} onChange={e=>sf(p=>({...p,size:e.target.value}))}/>}/>
        <F l={t.farm} c={<input className="fi" value={form.farm} onChange={e=>sf(p=>({...p,farm:e.target.value}))}/>}/>
        <F l={t.campStatus} c={<select className="fsel" value={form.status} onChange={e=>sf(p=>({...p,status:e.target.value}))}><option>Available</option><option>In Use</option><option>Resting</option></select>}/>
        <F l={t.animalCount} c={<input className="fi" type="number" value={form.animalCount} onChange={e=>sf(p=>({...p,animalCount:e.target.value}))}/>}/>
        <F l={t.lastGrazed} c={<input className="fi" type="date" value={form.lastGrazed} onChange={e=>sf(p=>({...p,lastGrazed:e.target.value}))}/>}/>
        <F l={t.waterPoint} full c={<select className="fsel" value={form.waterPoint?"yes":"no"} onChange={e=>sf(p=>({...p,waterPoint:e.target.value==="yes"}))}><option value="yes">Yes</option><option value="no">No</option></select>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AI DOCUMENT READER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function callClaude(messages,systemPrompt){
  const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:systemPrompt,messages})});
  const data=await res.json();
  return data.content?.map(b=>b.text||"").join("")||"";
}
function DocReader({transactions,setTransactions,t}){
  const [loading,sl]=useState(false); const [result,sr]=useState(null);
  const [farm,sf]=useState("Farm 1"); const [imgData,si]=useState(null); const [imgType,sit]=useState(""); const [error,se]=useState("");
  const handleFile=async(e)=>{
    const file=e.target.files[0];if(!file)return;se("");sr(null);
    const reader=new FileReader();
    reader.onload=ev=>{si(ev.target.result.split(",")[1]);sit(file.type||"image/jpeg");};
    reader.readAsDataURL(file);
  };
  const analyse=async()=>{
    if(!imgData){se("Please upload a document first.");return;}
    sl(true);se("");sr(null);
    try{
      const isImg=imgType.startsWith("image/");
      const messages=[{role:"user",content:isImg?[{type:"image",source:{type:"base64",media_type:imgType,data:imgData}},{type:"text",text:"Farm: "+farm+". Analyse this financial document."}]:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:imgData}},{type:"text",text:"Farm: "+farm+". Analyse this financial document."}]}];
      const sys=`You are a Namibian farm bookkeeping assistant. Return ONLY valid JSON:\n{"docType":"invoice|receipt|auction|slaughter|salary|other","transactionType":"income|expense","amount":0,"description":"","category":"Livestock Sales|Livestock Purchase|Feed & Supplements|Fuel|Veterinary|Labour|Equipment|Other","date":"YYYY-MM-DD","vendor":"","lineItems":[{"description":"","qty":1,"unitPrice":0,"total":0}],"confidence":"high|medium|low","notes":""}`;
      const raw=await callClaude(messages,sys);
      sr(JSON.parse(raw.replace(/\`\`\`json|\`\`\`/g,"").trim()));
    }catch(err){se("Could not read document. Try a clearer image or PDF.");}
    sl(false);
  };
  const confirm=()=>{
    if(!result)return;
    setTransactions(p=>[{id:Date.now(),date:result.date||new Date().toISOString().split("T")[0],description:result.description||"Document import",category:result.category||"Other",type:result.transactionType||"expense",amount:result.amount||0,farm,doc:"Scanned document"},...p]);
    sr(null);si(null);alert("Transaction added to Bookkeeping!");
  };
  return <div>
    <div className="alert alert-info">🤖 Upload any invoice, receipt or document — AI reads it and classifies it automatically.</div>
    <div className="feed-panel">
      <div className="feed-title">Document Scanner</div>
      <div className="fg" style={{marginBottom:16}}>
        <F l="Farm" c={<input className="fi" value={farm} onChange={e=>sf(e.target.value)}/>}/>
        <F l="Upload Document (PDF or Image)" full c={<div><input type="file" accept="image/*,application/pdf" onChange={handleFile} style={{display:"block",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 12px",color:"var(--text)",width:"100%",fontFamily:"'Syne',sans-serif",fontSize:13,cursor:"pointer"}}/>{imgData&&<div style={{marginTop:8,fontSize:12,color:"var(--green)"}}>✓ Document loaded</div>}</div>}/>
      </div>
      <button className="btn btp" onClick={analyse} disabled={loading||!imgData} style={{width:"100%",justifyContent:"center",padding:12,opacity:(!imgData||loading)?0.5:1}}>{loading?"🔍 Reading...":"🤖 Analyse with AI"}</button>
    </div>
    {error&&<div className="alert">{error}</div>}
    {result&&<div className="feed-result">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"var(--amber-l)"}}>AI RESULT</div>
        <div style={{display:"flex",gap:6}}><span className={`b ${result.confidence==="high"?"bg":result.confidence==="medium"?"ba":"br"}`}>Confidence: {result.confidence}</span><span className={`b ${result.transactionType==="income"?"bg":"br"}`}>{result.transactionType?.toUpperCase()}</span></div>
      </div>
      <div className="fg" style={{marginBottom:14}}>
        {[["Type",result.docType],["Date",result.date],["Vendor",result.vendor],["Category",result.category]].map(([l,v])=><div key={l} style={{background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)",marginBottom:4}}>{l}</div><div style={{fontSize:13,fontWeight:600}}>{v||"—"}</div></div>)}
        <div style={{background:"var(--bg-card)",border:"1px solid var(--border-hi)",borderRadius:8,padding:"10px 12px",gridColumn:"1/-1"}}><div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)",marginBottom:4}}>Description</div><div style={{fontSize:14,fontWeight:600}}>{result.description}</div></div>
      </div>
      <div className="cost-row" style={{borderBottom:"none"}}><span style={{fontWeight:700,fontSize:15}}>TOTAL</span><span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:result.transactionType==="income"?"var(--green)":"var(--red)"}}>{"N$"}{fmt(result.amount)}</span></div>
      <div className="ma" style={{marginTop:16}}>
        <button className="btn btg" onClick={()=>{sr(null);si(null);}}>Discard</button>
        <button className="btn btp" onClick={confirm}>✅ Add to Bookkeeping</button>
      </div>
    </div>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AUCTION SCANNER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AuctionScanner({animals,setAnimals,transactions,setTransactions,t}){
  const [loading,sl]=useState(false); const [result,sr]=useState(null);
  const [farm,sf]=useState("Farm 1"); const [imgData,si]=useState(null); const [imgType,sit]=useState("");
  const [error,se]=useState(""); const [done,sd]=useState(false);
  const handleFile=e=>{const file=e.target.files[0];if(!file)return;se("");sr(null);sd(false);const reader=new FileReader();reader.onload=ev=>{si(ev.target.result.split(",")[1]);sit(file.type||"image/jpeg");};reader.readAsDataURL(file);};
  const analyse=async()=>{
    if(!imgData){se("Please upload the auction document first.");return;}
    sl(true);se("");sr(null);
    try{
      const isImg=imgType.startsWith("image/");
      const content=isImg?[{type:"image",source:{type:"base64",media_type:imgType,data:imgData}},{type:"text",text:"Farm: "+farm+". Read this livestock auction document."}]:[{type:"document",source:{type:"base64",media_type:"application/pdf",data:imgData}},{type:"text",text:"Farm: "+farm+". Read this livestock auction document."}];
      const sys='You are a Namibian livestock auction document reader. Return ONLY valid JSON:\n{"auctionHouse":"","auctionDate":"YYYY-MM-DD","buyer":"","totalPaid":0,"totalReceived":0,"bought":[{"type":"cattle|sheep|goats|pigs","category":"tollies|heifers|cows|bulls|lambs|ewes","count":1,"breed":"","avgWeight":0,"pricePerHead":0,"totalPrice":0}],"sold":[{"type":"cattle","category":"cows","count":1,"breed":"","avgWeight":0,"pricePerHead":0,"totalPrice":0}]}';
      const raw=await callClaude([{role:"user",content}],sys);
      sr(JSON.parse(raw.replace(/\`\`\`json|\`\`\`/g,"").trim()));
    }catch(err){se("Could not read auction document.");}
    sl(false);
  };
  const confirm=()=>{
    if(!result)return;
    const date=result.auctionDate||new Date().toISOString().split("T")[0];
    const newAnimals=[];
    (result.bought||[]).forEach(lot=>{
      const count=Number(lot.count)||1;
      const prefix={cattle:"C",sheep:"S",goats:"G",pigs:"P"}[lot.type]||"A";
      const existing=animals.filter(a=>a.type===lot.type).length+newAnimals.filter(a=>a.type===lot.type).length;
      for(let i=0;i<count;i++){const num=String(existing+i+1).padStart(3,"0");newAnimals.push({id:Date.now()+Math.random(),type:lot.type,tag:prefix+"-"+num,breed:lot.breed||"Unknown",dob:"",weight:Number(lot.avgWeight)||0,status:"Active",notes:lot.category+" — Auction "+date,farm,purchasePrice:lot.pricePerHead,purchaseDate:date});}
      if(lot.totalPrice>0)setTransactions(p=>[{id:Date.now()+Math.random(),date,description:"Auction purchase: "+lot.count+" "+lot.category+" ("+lot.breed+") — "+(result.auctionHouse||"Auction"),category:"Livestock Purchase",type:"expense",amount:Number(lot.totalPrice),farm,doc:"Auction sheet"},...p]);
    });
    (result.sold||[]).forEach(lot=>{if(lot.totalPrice>0)setTransactions(p=>[{id:Date.now()+Math.random(),date,description:"Auction sale: "+lot.count+" "+lot.category+" — "+(result.auctionHouse||"Auction"),category:"Livestock Sales",type:"income",amount:Number(lot.totalPrice),farm,doc:"Auction sheet"},...p]);});
    if(newAnimals.length>0)setAnimals(p=>[...p,...newAnimals]);
    sd(true);
  };
  return <div>
    <div className="alert alert-info">🤖 Upload a scanned auction document — AI reads what was bought and sold and updates livestock and bookkeeping automatically.</div>
    <div className="feed-panel">
      <div className="feed-title">Auction Document Scanner</div>
      <div className="fg" style={{marginBottom:16}}>
        <F l="Assign to Farm" c={<input className="fi" value={farm} onChange={e=>sf(e.target.value)}/>}/>
        <F l="Upload Auction Sheet" full c={<div><input type="file" accept="image/*,application/pdf" onChange={handleFile} style={{display:"block",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 12px",color:"var(--text)",width:"100%",fontFamily:"'Syne',sans-serif",fontSize:13,cursor:"pointer"}}/>{imgData&&<div style={{marginTop:8,fontSize:12,color:"var(--green)"}}>✓ Document loaded</div>}</div>}/>
      </div>
      <button className="btn btp" onClick={analyse} disabled={loading||!imgData} style={{width:"100%",justifyContent:"center",padding:12,opacity:(!imgData||loading)?0.5:1}}>{loading?"🔍 Reading...":"🤖 Read Auction Document"}</button>
    </div>
    {error&&<div className="alert">{error}</div>}
    {done&&<div className="alert alert-green">✅ Auction records imported! Livestock and bookkeeping updated.</div>}
    {result&&!done&&<div className="feed-result">
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"var(--amber-l)",marginBottom:4}}>AUCTION RESULT</div>
      <div style={{fontSize:12,color:"var(--text2)",marginBottom:14}}>{result.auctionHouse} — {result.auctionDate}</div>
      {result.bought?.length>0&&<div style={{marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--green)",marginBottom:8}}>BOUGHT ({result.bought.reduce((s,l)=>s+Number(l.count||0),0)} animals)</div>
        {result.bought.map((lot,i)=><div key={i} style={{background:"rgba(45,189,110,0.06)",border:"1px solid rgba(45,189,110,0.2)",borderRadius:8,padding:"10px 12px",marginBottom:6}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:700}}>{lot.count}x {lot.category} ({lot.breed})</span><span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"var(--green)"}}>{"N$"}{fmt(lot.totalPrice)}</span></div>
          <div style={{fontSize:11,color:"var(--text3)",marginTop:3}}>{"N$"}{fmt(lot.pricePerHead)}/head</div>
        </div>)}
      </div>}
      {result.sold?.length>0&&<div style={{marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--amber-l)",marginBottom:8}}>SOLD ({result.sold.reduce((s,l)=>s+Number(l.count||0),0)} animals)</div>
        {result.sold.map((lot,i)=><div key={i} style={{background:"rgba(212,140,42,0.06)",border:"1px solid rgba(212,140,42,0.2)",borderRadius:8,padding:"10px 12px",marginBottom:6}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:700}}>{lot.count}x {lot.category} ({lot.breed})</span><span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"var(--amber-l)"}}>{"N$"}{fmt(lot.totalPrice)}</span></div>
        </div>)}
      </div>}
      <div className="ma"><button className="btn btg" onClick={()=>{sr(null);si(null);}}>Discard</button><button className="btn btp" onClick={confirm}>✅ Import to FarmLogic</button></div>
    </div>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PART NUMBER DATABASE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PART_DB={
  "oil filter":[{make:"Ford",model:"5000/6600/7600",partNo:"D8NN6714AA"},{make:"John Deere",model:"3040/4040",partNo:"RE504836"},{make:"Massey Ferguson",model:"35/65/135",partNo:"1447082M1"},{make:"Case IH",model:"JX/JXU",partNo:"84229621"}],
  "air filter":[{make:"Ford",model:"5000/6600",partNo:"C5NN9601A"},{make:"John Deere",model:"3040/4040",partNo:"RE59259"},{make:"Massey Ferguson",model:"135/165",partNo:"1695299M1"}],
  "fuel filter":[{make:"Ford",model:"5000/6600/7600",partNo:"83912351"},{make:"John Deere",model:"3040/4040",partNo:"RE522878"},{make:"Massey Ferguson",model:"135/165",partNo:"1447082M91"}],
  "fan belt":[{make:"Ford",model:"5000/6600",partNo:"C5NN8620E"},{make:"John Deere",model:"3040",partNo:"L31076"},{make:"Massey Ferguson",model:"135",partNo:"897268M1"}],
  "hydraulic filter":[{make:"Ford",model:"5000/6600",partNo:"83912444"},{make:"John Deere",model:"3040",partNo:"AT167942"},{make:"Massey Ferguson",model:"135/165",partNo:"1851547M1"}],
  "water pump":[{make:"Ford",model:"5000/6600",partNo:"C5NN8505B"},{make:"John Deere",model:"3040",partNo:"AR55094"},{make:"Massey Ferguson",model:"135/165",partNo:"1884682M91"}],
  "injector":[{make:"Ford",model:"5000/6600",partNo:"C5NE9F593A"},{make:"John Deere",model:"3040",partNo:"AR26509"},{make:"Massey Ferguson",model:"135/165",partNo:"1447067M91"}],
  "starter motor":[{make:"Ford",model:"5000/6600",partNo:"D6NN11001B"},{make:"John Deere",model:"3040",partNo:"TY6758"},{make:"Massey Ferguson",model:"135",partNo:"1447059M91"}],
  "alternator":[{make:"Ford",model:"5000/6600",partNo:"D6NN10316A"},{make:"John Deere",model:"3040",partNo:"TY6674"},{make:"Massey Ferguson",model:"135",partNo:"1447058M92"}],
  "glow plug":[{make:"Ford",model:"5000/6600",partNo:"C7NN12A379B"},{make:"John Deere",model:"3040",partNo:"RE500194"},{make:"Massey Ferguson",model:"135",partNo:"1447086M1"}],
  "brake pads":[{make:"Ford",model:"5000/6600",partNo:"C5NN2218D"},{make:"John Deere",model:"3040",partNo:"L63922"}],
  "tyre":[{make:"Titan",model:"18.4-34",partNo:"18.4R34"},{make:"Firestone",model:"14.9-28",partNo:"14.9-28"},{make:"BKT",model:"16.9-30",partNo:"16.9R30"}],
};
function lookupParts(desc){
  const d=(desc||"").toLowerCase();
  for(const [k,v] of Object.entries(PART_DB)){if(d.includes(k))return v;}
  return [];
}
function conditionScore(jobCards,implId){
  const cards=jobCards.filter(c=>c.implementId===implId);
  if(!cards.length)return{score:100,label:"No Issues",color:"var(--green)"};
  const now=new Date();
  const last90=cards.filter(c=>(now-new Date(c.date))/(864e5)<=90).length;
  if(last90>=5)return{score:20,label:"Critical",color:"var(--red)"};
  if(last90>=3)return{score:45,label:"Poor",color:"var(--red)"};
  if(last90>=2)return{score:65,label:"Fair",color:"var(--orange)"};
  if(last90>=1)return{score:80,label:"Good",color:"var(--amber-l)"};
  return{score:95,label:"Excellent",color:"var(--green)"};
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FARM IMPLEMENTS  — job cards, part numbers, condition score
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Implements({implements_,setImplements,jobCards,setJobCards,t}){
  const [modal,sm]=useState(false);
  const [editId,se]=useState(null);
  const [form,sf]=useState({name:"",category:"Tractor",serial:"",year:"",farm:"Farm 1",notes:""});
  const [q,sq]=useState("");
  const [selImpl,ssi]=useState(null);
  const [jobModal,sjm]=useState(false);
  const [jobForm,sjf]=useState({date:new Date().toISOString().split("T")[0],description:"",partNumber:"",partName:"",cost:"",mechanic:"",notes:"",implementId:""});
  const [partSugg,sps]=useState([]);
  const CATS=["Tractor","Bulldozer","Padskraper","Grader","Plough","Harrow","Sprayer","Baler","Combine","Trailer","Water Equipment","Generator","Solar","Pump","Loader","Vehicle","Other"];
  const filtered=implements_.filter(i=>(i.name+i.category+i.farm).toLowerCase().includes(q.toLowerCase()));
  const save=()=>{
    if(editId)setImplements(p=>p.map(i=>i.id===editId?{...form,id:editId}:i));
    else setImplements(p=>[...p,{...form,id:Date.now()}]);
    sm(false);se(null);
  };
  const saveJob=()=>{
    setJobCards(p=>[{...jobForm,id:Date.now(),cost:Number(jobForm.cost)||0},...p]);
    sjm(false);
    sjf(p=>({...p,description:"",partNumber:"",partName:"",cost:"",notes:""}));
    sps([]);
  };
  const handleDesc=(val)=>{sjf(p=>({...p,description:val}));sps(lookupParts(val));};
  const implJobs=selImpl?jobCards.filter(c=>c.implementId===selImpl.id):[];

  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
      <input className="si" placeholder="Search implements..." value={q} onChange={e=>sq(e.target.value)} style={{maxWidth:280}}/>
      <button className="btn btp" onClick={()=>{sf({name:"",category:"Tractor",serial:"",year:"",farm:"Farm 1",notes:""});se(null);sm(true);}}>+ Add Implement</button>
    </div>
    <div className="cg" style={{marginBottom:20}}>
      {filtered.map(item=>{
        const cs=conditionScore(jobCards,item.id);
        const cards=jobCards.filter(c=>c.implementId===item.id);
        const totalCost=cards.reduce((s,c)=>s+c.cost,0);
        return <div key={item.id} className="cc" style={{borderTop:"3px solid "+cs.color}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{item.name}</div>
          <span className="b bm" style={{fontSize:10}}>{item.category}</span>
          <div style={{marginTop:12,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontSize:10,color:"var(--text3)",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Condition Score</span>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:cs.color}}>{cs.score}/100</span>
            </div>
            <div style={{height:6,background:"var(--bg-surface)",borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",width:cs.score+"%",background:cs.color,borderRadius:3}}/>
            </div>
            <div style={{fontSize:11,color:cs.color,marginTop:3,fontWeight:700}}>{cs.label}</div>
          </div>
          <div className="cm">
            <span><span>Farm</span><b>{item.farm}</b></span>
            <span><span>Year</span><b>{item.year||"—"}</b></span>
            <span><span>Serial</span><b>{item.serial||"—"}</b></span>
            <span><span>Job Cards</span><b style={{color:cards.length>0?"var(--amber-l)":"var(--text2)"}}>{cards.length}</b></span>
            <span><span>Total Repairs</span><b style={{color:"var(--red)"}}>{"N$"}{fmt(totalCost)}</b></span>
          </div>
          <div style={{display:"flex",gap:5,marginTop:12,flexWrap:"wrap"}}>
            <button className="btn btp sm" onClick={()=>{ssi(item);sjf(p=>({...p,implementId:item.id}));}}>📋 Job Cards ({cards.length})</button>
            <button className="btn btg sm" onClick={()=>{sf({...item});se(item.id);sm(true);}}>Edit</button>
            <button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setImplements(p=>p.filter(x=>x.id!==item.id));}}>✕</button>
          </div>
        </div>;
      })}
    </div>

    {selImpl&&<div className="feed-panel">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
        <div>
          <div className="feed-title">{selImpl.name}</div>
          <div style={{fontSize:12,color:"var(--text2)"}}>Total repair cost: {"N$"}{fmt(implJobs.reduce((s,c)=>s+c.cost,0))} • {implJobs.length} job cards</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btp" onClick={()=>{sjf({date:new Date().toISOString().split("T")[0],description:"",partNumber:"",partName:"",cost:"",mechanic:"",notes:"",implementId:selImpl.id});sps([]);sjm(true);}}>+ Open Job Card</button>
          <button className="btn btg sm" onClick={()=>ssi(null)}>✕ Close</button>
        </div>
      </div>
      {implJobs.length===0?<div className="nr">No job cards yet.</div>:
        <table>
          <thead><tr><th>Date</th><th>Description</th><th>Part Name</th><th>Part No.</th><th>Cost</th><th>By</th><th>Notes</th><th></th></tr></thead>
          <tbody>{implJobs.map(j=><tr key={j.id}>
            <td className="mono">{j.date}</td>
            <td style={{fontWeight:600}}>{j.description}</td>
            <td>{j.partName||"—"}</td>
            <td><span className="mono" style={{fontSize:11,color:"var(--blue)"}}>{j.partNumber||"—"}</span></td>
            <td style={{color:"var(--red)",fontWeight:700}}>{"N$"}{fmt(j.cost)}</td>
            <td style={{fontSize:12}}>{j.mechanic||"—"}</td>
            <td style={{fontSize:11,color:"var(--text2)",maxWidth:130}}>{j.notes||"—"}</td>
            <td><button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setJobCards(p=>p.filter(x=>x.id!==j.id));}}>✕</button></td>
          </tr>)}</tbody>
        </table>
      }
    </div>}

    {modal&&<Modal title={editId?"Edit Implement":"+ Add Implement"} onClose={()=>sm(false)}>
      <div className="fg">
        <F l="Name" full c={<input className="fi" placeholder="e.g. Ford 5000 or Padskraper 3m" value={form.name} onChange={e=>sf(p=>({...p,name:e.target.value}))}/>}/>
        <F l="Category" c={<select className="fsel" value={form.category} onChange={e=>sf(p=>({...p,category:e.target.value}))}>{CATS.map(c=><option key={c}>{c}</option>)}</select>}/>
        <F l="Farm" c={<input className="fi" value={form.farm} onChange={e=>sf(p=>({...p,farm:e.target.value}))}/>}/>
        <F l="Serial" c={<input className="fi" value={form.serial} onChange={e=>sf(p=>({...p,serial:e.target.value}))}/>}/>
        <F l="Year" c={<input className="fi" type="number" value={form.year} onChange={e=>sf(p=>({...p,year:e.target.value}))}/>}/>
        <F l="Notes" full c={<textarea className="fta" value={form.notes} onChange={e=>sf(p=>({...p,notes:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}

    {jobModal&&<Modal title={"Open Job Card — "+(selImpl?.name||"")} onClose={()=>sjm(false)} wide>
      <div className="fg">
        <F l="Date" c={<input className="fi" type="date" value={jobForm.date} onChange={e=>sjf(p=>({...p,date:e.target.value}))}/>}/>
        <F l="Mechanic / Done By" c={<input className="fi" placeholder="Who did the work?" value={jobForm.mechanic} onChange={e=>sjf(p=>({...p,mechanic:e.target.value}))}/>}/>
        <F l="Description of Work" full c={<input className="fi" placeholder="e.g. oil filter replaced, fan belt replaced" value={jobForm.description} onChange={e=>handleDesc(e.target.value)}/>}/>
        {partSugg.length>0&&<div style={{gridColumn:"1/-1",background:"var(--bg-surface)",border:"1px solid var(--amber)",borderRadius:8,padding:12}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--amber-l)",marginBottom:8}}>Suggested Part Numbers</div>
          {partSugg.map((p,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid var(--border)",fontSize:12}}>
            <span><b>{p.make}</b> {p.model}</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span className="mono" style={{color:"var(--blue)"}}>{p.partNo}</span>
              <button className="btn btp sm" onClick={()=>sjf(pv=>({...pv,partNumber:p.partNo,partName:jobForm.description}))}>Use</button>
            </div>
          </div>)}
          <div style={{fontSize:10,color:"var(--text3)",marginTop:6}}>Or enter your own part number below</div>
        </div>}
        <F l="Part Name" c={<input className="fi" placeholder="e.g. Oil Filter" value={jobForm.partName} onChange={e=>sjf(p=>({...p,partName:e.target.value}))}/>}/>
        <F l="Part Number" c={<input className="fi" placeholder="e.g. D8NN6714AA" value={jobForm.partNumber} onChange={e=>sjf(p=>({...p,partNumber:e.target.value}))}/>}/>
        <F l="Cost (N$)" c={<input className="fi" type="number" value={jobForm.cost} onChange={e=>sjf(p=>({...p,cost:e.target.value}))}/>}/>
        <F l="Notes" full c={<textarea className="fta" value={jobForm.notes} onChange={e=>sjf(p=>({...p,notes:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sjm(false)}>{t.cancel}</button><button className="btn btp" onClick={saveJob}>Save Job Card</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  VEHICLE LICENCES  — 60-day warning per Namibian law
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Licences({licences,setLicences,t}){
  const [modal,sm]=useState(false);
  const [editId,se]=useState(null);
  const [form,sf]=useState({name:"",regNumber:"",make:"",model:"",year:"",licenceExpiry:"",roadworthyExpiry:"",insuranceExpiry:"",farm:"Farm 1",notes:""});
  const today=new Date();
  const warn=new Date(today); warn.setDate(warn.getDate()+60);
  const status=(ds)=>{
    if(!ds)return{label:"Not Set",color:"var(--text3)",urgent:false};
    const d=new Date(ds);
    if(d<today)return{label:"EXPIRED",color:"var(--red)",urgent:true};
    if(d<warn)return{label:"Expiring Soon",color:"var(--orange)",urgent:true};
    return{label:"Valid",color:"var(--green)",urgent:false};
  };
  const daysLeft=(ds)=>{if(!ds)return null;return Math.round((new Date(ds)-today)/(864e5));};
  const expiring=licences.filter(l=>status(l.licenceExpiry).urgent||status(l.roadworthyExpiry).urgent||status(l.insuranceExpiry).urgent);
  const save=()=>{
    if(editId)setLicences(p=>p.map(l=>l.id===editId?{...form,id:editId}:l));
    else setLicences(p=>[...p,{...form,id:Date.now()}]);
    sm(false);se(null);
  };
  return <div>
    {expiring.length>0&&<div className="alert" style={{flexDirection:"column",alignItems:"flex-start",gap:4,marginBottom:14}}>
      <div style={{fontWeight:800}}>{"⚠️"} {expiring.length} vehicle(s) need attention</div>
      {expiring.map(l=>{
        const items=[];
        if(status(l.licenceExpiry).urgent)items.push("Licence disc");
        if(status(l.roadworthyExpiry).urgent)items.push("Roadworthy");
        if(status(l.insuranceExpiry).urgent)items.push("Insurance");
        return <div key={l.id} style={{fontSize:12}}>{l.name} ({l.regNumber||"—"}) — {items.join(", ")}</div>;
      })}
    </div>}
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:14}}>
      <button className="btn btp" onClick={()=>{sf({name:"",regNumber:"",make:"",model:"",year:"",licenceExpiry:"",roadworthyExpiry:"",insuranceExpiry:"",farm:"Farm 1",notes:""});se(null);sm(true);}}>+ Add Vehicle</button>
    </div>
    <div className="tw">
      {licences.length===0?<div className="nr">No vehicles added yet.</div>:
        <table>
          <thead><tr><th>Vehicle</th><th>Reg</th><th>Farm</th><th>Licence Disc</th><th>Roadworthy</th><th>Insurance</th><th></th></tr></thead>
          <tbody>{licences.map(l=>{
            const lic=status(l.licenceExpiry); const rw=status(l.roadworthyExpiry); const ins=status(l.insuranceExpiry);
            return <tr key={l.id}>
              <td><div style={{fontWeight:700}}>{l.name}</div><div style={{fontSize:11,color:"var(--text3)"}}>{l.make} {l.model} {l.year}</div></td>
              <td><span className="mono">{l.regNumber||"—"}</span></td>
              <td>{l.farm}</td>
              <td><div style={{color:lic.color,fontWeight:700,fontSize:12}}>{lic.label}</div><div style={{fontSize:11,color:"var(--text3)"}}>{l.licenceExpiry||"—"}{daysLeft(l.licenceExpiry)!==null&&<span style={{color:lic.color}}> ({daysLeft(l.licenceExpiry)}d)</span>}</div></td>
              <td><div style={{color:rw.color,fontWeight:700,fontSize:12}}>{rw.label}</div><div style={{fontSize:11,color:"var(--text3)"}}>{l.roadworthyExpiry||"—"}{daysLeft(l.roadworthyExpiry)!==null&&<span style={{color:rw.color}}> ({daysLeft(l.roadworthyExpiry)}d)</span>}</div></td>
              <td><div style={{color:ins.color,fontWeight:700,fontSize:12}}>{ins.label}</div><div style={{fontSize:11,color:"var(--text3)"}}>{l.insuranceExpiry||"—"}{daysLeft(l.insuranceExpiry)!==null&&<span style={{color:ins.color}}> ({daysLeft(l.insuranceExpiry)}d)</span>}</div></td>
              <td><div style={{display:"flex",gap:5}}>
                <button className="btn btg sm" onClick={()=>{sf({...l});se(l.id);sm(true);}}>Edit</button>
                <button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setLicences(p=>p.filter(x=>x.id!==l.id));}}>✕</button>
              </div></td>
            </tr>;
          })}</tbody>
        </table>
      }
    </div>
    <div className="card" style={{marginTop:16}}>
      <div className="ctitle">Namibian Vehicle Law Reference</div>
      <div style={{fontSize:12,color:"var(--text2)",lineHeight:2}}>
        <div>{"•"} <b style={{color:"var(--text)"}}>Licence disc (NaTIS)</b> — Renew annually. FarmLogic warns 60 days before expiry.</div>
        <div>{"•"} <b style={{color:"var(--text)"}}>Roadworthy certificate</b> — Required annually for vehicles over 1 year old.</div>
        <div>{"•"} <b style={{color:"var(--text)"}}>Insurance</b> — Third party compulsory under Motor Vehicle Accidents Fund Act.</div>
        <div>{"•"} <b style={{color:"var(--text)"}}>Penalty</b> — Fine up to N$2,000 or imprisonment. Road Traffic and Transport Act No. 22 of 1999.</div>
      </div>
    </div>
    {modal&&<Modal title={editId?"Edit Vehicle":"+ Add Vehicle"} onClose={()=>sm(false)}>
      <div className="fg">
        <F l="Vehicle Name" full c={<input className="fi" placeholder="e.g. Ford Ranger Bakkie" value={form.name} onChange={e=>sf(p=>({...p,name:e.target.value}))}/>}/>
        <F l="Registration Number" c={<input className="fi" placeholder="e.g. N 12345 W" value={form.regNumber} onChange={e=>sf(p=>({...p,regNumber:e.target.value}))}/>}/>
        <F l="Make" c={<input className="fi" placeholder="e.g. Ford" value={form.make} onChange={e=>sf(p=>({...p,make:e.target.value}))}/>}/>
        <F l="Model" c={<input className="fi" placeholder="e.g. Ranger" value={form.model} onChange={e=>sf(p=>({...p,model:e.target.value}))}/>}/>
        <F l="Year" c={<input className="fi" type="number" value={form.year} onChange={e=>sf(p=>({...p,year:e.target.value}))}/>}/>
        <F l="Farm" c={<input className="fi" value={form.farm} onChange={e=>sf(p=>({...p,farm:e.target.value}))}/>}/>
        <F l="Licence Disc Expiry" c={<input className="fi" type="date" value={form.licenceExpiry} onChange={e=>sf(p=>({...p,licenceExpiry:e.target.value}))}/>}/>
        <F l="Roadworthy Expiry" c={<input className="fi" type="date" value={form.roadworthyExpiry} onChange={e=>sf(p=>({...p,roadworthyExpiry:e.target.value}))}/>}/>
        <F l="Insurance Expiry" c={<input className="fi" type="date" value={form.insuranceExpiry} onChange={e=>sf(p=>({...p,insuranceExpiry:e.target.value}))}/>}/>
        <F l="Notes" full c={<textarea className="fta" value={form.notes} onChange={e=>sf(p=>({...p,notes:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FEED CALCULATOR (80% supplement / 20% roughage)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FEED_RATES = {
  cattle:  { intakePct: 0.025 }, // 2.5% of body weight per day
  sheep:   { intakePct: 0.030 },
  goats:   { intakePct: 0.030 },
  pigs:    { intakePct: 0.040 },
};
function FeedCalc({t}){
  const [type,st]=useState("cattle");
  const [heads,sh]=useState(25);
  const [avgW,sw]=useState(400);
  const [suppP,ssp]=useState(8.50);
  const [roughP,srp]=useState(2.20);
  const [brand,sb]=useState("Enerfeed");
  const [result,sr]=useState(null);

  const calc=()=>{
    const rate=FEED_RATES[type]||FEED_RATES.cattle;
    const totalDailyIntake=heads*avgW*rate.intakePct; // kg/day total herd
    const suppKg=totalDailyIntake*0.80;  // 80% supplement
    const roughKg=totalDailyIntake*0.20; // 20% roughage
    const dailyCost=(suppKg*suppP)+(roughKg*roughP);
    const monthlyCost=dailyCost*30;
    const perHead=dailyCost/heads;
    sr({totalDailyIntake,suppKg,roughKg,dailyCost,monthlyCost,perHead,heads});
  };

  return <div>
    <div className="alert alert-info">ℹ️ {t.feedNote}</div>
    <div className="feed-panel">
      <div className="feed-title">{t.feedCalc}</div>
      <div className="feed-ratio">
        <div className="fr-supp">80% SUPPLEMENT ({brand})</div>
        <div className="fr-rough">20% ROUGHAGE</div>
      </div>
      <div className="fg" style={{marginBottom:20}}>
        <F l={t.animalType} c={<select className="fsel" value={type} onChange={e=>st(e.target.value)}>
          <option value="cattle">{t.cattle}</option>
          <option value="sheep">{t.sheep}</option>
          <option value="goats">{t.goats}</option>
          <option value="pigs">{t.pigs}</option>
        </select>}/>
        <F l={t.suppBrand} c={<select className="fsel" value={brand} onChange={e=>sb(e.target.value)}>
          <option>Enerfeed</option><option>Chop</option><option>Feedmaster</option><option>Molatek</option><option>Custom Mix</option>
        </select>}/>
        <F l={t.headCount} c={<input className="fi" type="number" value={heads} onChange={e=>sh(Number(e.target.value))}/>}/>
        <F l={t.avgWeight} c={<input className="fi" type="number" value={avgW} onChange={e=>sw(Number(e.target.value))}/>}/>
        <F l={`${t.suppPrice} (${brand})`} c={<input className="fi" type="number" step="0.01" value={suppP} onChange={e=>ssp(Number(e.target.value))}/>}/>
        <F l={t.roughagePrice} c={<input className="fi" type="number" step="0.01" value={roughP} onChange={e=>srp(Number(e.target.value))}/>}/>
      </div>
      <button className="btn btp" onClick={calc} style={{width:"100%",justifyContent:"center",padding:"12px"}}>🧮 {t.calcFeed}</button>
    </div>
    {result&&<div className="feed-result">
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"var(--amber-l)",marginBottom:16}}>RESULTS — {result.heads} {type.toUpperCase()}</div>
      <div className="feed-res-grid">
        <div className="fres">
          <div className="fres-val">{result.suppKg.toFixed(1)} kg</div>
          <div className="fres-lbl">Daily Supplement (80%)</div>
        </div>
        <div className="fres">
          <div className="fres-val">{result.roughKg.toFixed(1)} kg</div>
          <div className="fres-lbl">Daily Roughage (20%)</div>
        </div>
        <div className="fres">
          <div className="fres-val">{result.totalDailyIntake.toFixed(1)} kg</div>
          <div className="fres-lbl">Total Daily Feed</div>
        </div>
      </div>
      <div className="cost-row"><span className="cost-label">Cost Per Animal / Day</span><span className="cost-val" style={{fontSize:18}}>{"N$"}{(result.perHead).toFixed(2)}</span></div>
      <div className="cost-row"><span className="cost-label">Daily Feed Cost ({result.heads} animals)</span><span className="cost-val" style={{fontSize:22}}>{"N$"}{result.dailyCost.toFixed(2)}</span></div>
      <div className="cost-row" style={{borderBottom:"none"}}><span className="cost-label" style={{fontWeight:700,fontSize:14}}>Monthly Feed Cost</span><span className="cost-val" style={{fontSize:30}}>{"N$"}{fmt(Math.round(result.monthlyCost))}</span></div>
    </div>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SLAUGHTER RECORDS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Slaughter({slaughter,setSlaughter,t}){
  const [modal,sm]=useState(false);
  const [form,sf]=useState({animalId:"",farm:"Farm 1",date:"",liveWeight:"",carcassWeight:"",pricePerKg:"",grade:"A2",abattoir:"Meatco Windhoek",notes:""});
  const save=()=>{
    const lw=Number(form.liveWeight); const cw=Number(form.carcassWeight); const ppk=Number(form.pricePerKg);
    const dressingPct=lw>0?((cw/lw)*100).toFixed(1):0;
    const totalValue=(cw*ppk).toFixed(2);
    setSlaughter(p=>[{...form,id:Date.now(),liveWeight:lw,carcassWeight:cw,pricePerKg:ppk,dressingPct:Number(dressingPct),totalValue:Number(totalValue)},...p]);
    sm(false);
  };
  const totalRevenue=slaughter.reduce((s,x)=>s+x.totalValue,0);
  const avgDressing=slaughter.length>0?(slaughter.reduce((s,x)=>s+x.dressingPct,0)/slaughter.length).toFixed(1):0;
  return <div>
    <div className="dg3" style={{marginBottom:20}}>
      <div className="card"><div className="ctitle">Total Slaughter Revenue</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:"var(--green)"}}>{"N$"}{fmt(Math.round(totalRevenue))}</div></div>
      <div className="card"><div className="ctitle">Records</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30}}>{slaughter.length}</div></div>
      <div className="card"><div className="ctitle">Avg Dressing %</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:"var(--amber-l)"}}>{avgDressing}%</div></div>
    </div>
    <div className="tw">
      <div className="tb"><button className="btn btp" onClick={()=>{sf({animalId:"",farm:"Farm 1",date:"",liveWeight:"",carcassWeight:"",pricePerKg:"",grade:"A2",abattoir:"Meatco Windhoek",notes:""});sm(true)}}>+ {t.addSlaughter}</button></div>
      {slaughter.length===0?<div className="nr">{t.noRecords}</div>:<table>
        <thead><tr><th>Animal</th><th>{t.slaughterDate}</th><th>{t.liveWeight}</th><th>{t.carcassWeight}</th><th>{t.dressingPct}</th><th>{t.pricePerKg}</th><th>{t.totalValue}</th><th>{t.grade}</th><th>{t.abattoir}</th><th></th></tr></thead>
        <tbody>{slaughter.map(s=><tr key={s.id}>
          <td><span className="mono">{s.animalId}</span></td>
          <td>{s.date}</td>
          <td>{s.liveWeight} kg</td>
          <td>{s.carcassWeight} kg</td>
          <td style={{color:"var(--blue)"}}>{s.dressingPct}%</td>
          <td>{"N$"}{s.pricePerKg}</td>
          <td style={{color:"var(--green)",fontWeight:700}}>{"N$"}{fmt(Math.round(s.totalValue))}</td>
          <td><Badge s={s.grade}/></td>
          <td style={{fontSize:12,color:"var(--text2)"}}>{s.abattoir}</td>
          <td><button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setSlaughter(p=>p.filter(x=>x.id!==s.id))}}>✕</button></td>
        </tr>)}</tbody>
      </table>}
    </div>
    {modal&&<Modal title={`+ ${t.addSlaughter}`} onClose={()=>sm(false)} wide>
      <div className="fg">
        <F l="Animal Tag / ID" c={<input className="fi" placeholder="e.g. C-001" value={form.animalId} onChange={e=>sf(p=>({...p,animalId:e.target.value}))}/>}/>
        <F l={t.farm} c={<input className="fi" value={form.farm} onChange={e=>sf(p=>({...p,farm:e.target.value}))}/>}/>
        <F l={t.slaughterDate} c={<input className="fi" type="date" value={form.date} onChange={e=>sf(p=>({...p,date:e.target.value}))}/>}/>
        <F l={t.abattoir} c={<select className="fsel" value={form.abattoir} onChange={e=>sf(p=>({...p,abattoir:e.target.value}))}>
          <option>Meatco Windhoek</option><option>Meatco Okahandja</option><option>Meatco Mariental</option><option>Meatco Katima Mulilo</option><option>Other</option>
        </select>}/>
        <F l={t.liveWeight} c={<input className="fi" type="number" placeholder="kg" value={form.liveWeight} onChange={e=>sf(p=>({...p,liveWeight:e.target.value}))}/>}/>
        <F l={t.carcassWeight} c={<input className="fi" type="number" placeholder="kg" value={form.carcassWeight} onChange={e=>sf(p=>({...p,carcassWeight:e.target.value}))}/>}/>
        <F l={t.pricePerKg} c={<input className="fi" type="number" step="0.01" placeholder="N$/kg" value={form.pricePerKg} onChange={e=>sf(p=>({...p,pricePerKg:e.target.value}))}/>}/>
        <F l={t.grade} c={<select className="fsel" value={form.grade} onChange={e=>sf(p=>({...p,grade:e.target.value}))}><option>A1</option><option>A2</option><option>A3</option><option>B</option><option>C</option><option>AB</option></select>}/>
        <F l={t.notes} full c={<textarea className="fta" value={form.notes} onChange={e=>sf(p=>({...p,notes:e.target.value}))}/>}/>
      </div>
      {form.liveWeight&&form.carcassWeight&&<div className="alert alert-green" style={{marginTop:12}}>
        📊 Auto-calculated dressing: {((Number(form.carcassWeight)/Number(form.liveWeight))*100).toFixed(1)}% — Total value: {"N$"}{fmt(Math.round(Number(form.carcassWeight)*Number(form.pricePerKg)))}
      </div>}
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ROI DASHBOARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ROI({roiData,setRoiData,workers,transactions,t}){
  const [modal,sm]=useState(false);
  const [form,sf]=useState({animalId:"",farm:"Farm 1",purchaseCost:"",feedCostTotal:"",vetCostTotal:"",labourAlloc:"",saleValue:""});

  const calcROI=(r)=>{
    const totalCost=r.purchaseCost+r.feedCostTotal+r.vetCostTotal+r.labourAlloc;
    const profit=r.saleValue-totalCost;
    const roi=totalCost>0?((profit/totalCost)*100).toFixed(1):0;
    return {totalCost,profit,roi};
  };

  const save=()=>{
    setRoiData(p=>[...p,{...form,id:Date.now(),purchaseCost:Number(form.purchaseCost),feedCostTotal:Number(form.feedCostTotal),vetCostTotal:Number(form.vetCostTotal),labourAlloc:Number(form.labourAlloc),saleValue:Number(form.saleValue)}]);
    sm(false);
  };

  // Farm-level ROI from transactions
  const farms=[...new Set(transactions.map(x=>x.farm))];
  const farmROI=farms.map(farm=>{
    const inc=transactions.filter(x=>x.farm===farm&&x.type==="income").reduce((s,x)=>s+x.amount,0);
    const exp=transactions.filter(x=>x.farm===farm&&x.type==="expense").reduce((s,x)=>s+x.amount,0);
    const labour=workers.filter(w=>w.farm===farm).reduce((s,w)=>s+w.salary,0);
    const totalCost=exp+labour;
    const profit=inc-totalCost;
    const roi=totalCost>0?((profit/totalCost)*100).toFixed(1):0;
    return {farm,income:inc,expenses:exp,labour,profit,roi};
  });

  return <div>
    <div style={{marginBottom:20}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"var(--text2)",marginBottom:14}}>FARM PROFITABILITY</div>
      <div className="dg3">
        {farmROI.map(f=><div key={f.farm} className="card">
          <div className="ctitle">{f.farm}</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color:f.profit>=0?"var(--green)":"var(--red)",lineHeight:1}}>{f.roi}%</div>
          <div style={{fontSize:11,color:"var(--text3)",marginTop:4,marginBottom:12}}>Return on Investment</div>
          <div style={{fontSize:12,display:"flex",flexDirection:"column",gap:5}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"var(--text3)"}}>Income</span><span style={{color:"var(--green)",fontWeight:700}}>{"N$"}{fmt(f.income)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"var(--text3)"}}>Expenses</span><span style={{color:"var(--red)"}}>{"N$"}{fmt(f.expenses)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"var(--text3)"}}>Labour</span><span style={{color:"var(--orange)"}}>{"N$"}{fmt(f.labour)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid var(--border)",paddingTop:6,marginTop:2}}><span style={{fontWeight:700}}>Net Profit</span><span style={{fontWeight:700,color:f.profit>=0?"var(--green)":"var(--red)"}}>{"N$"}{fmt(f.profit)}</span></div>
          </div>
        </div>)}
      </div>
    </div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"var(--text2)"}}>ANIMAL ROI RECORDS</div>
      <button className="btn btp" onClick={()=>{sf({animalId:"",farm:"Farm 1",purchaseCost:"",feedCostTotal:"",vetCostTotal:"",labourAlloc:"",saleValue:""});sm(true)}}>+ {t.addRoiRecord}</button>
    </div>
    {roiData.length===0?<div style={{textAlign:"center",padding:40,color:"var(--text3)",fontSize:13}}>{t.noRecords}</div>:roiData.map(r=>{
      const {totalCost,profit,roi}=calcROI(r);
      const roiNum=Number(roi);
      return <div key={r.id} className="roi-card">
        <div className="roi-top">
          <div><span className="mono" style={{fontSize:15}}>{r.animalId}</span><span style={{marginLeft:10,fontSize:12,color:"var(--text3)"}}>{r.farm}</span></div>
          <div className="roi-pct" style={{color:roiNum>=0?"var(--green)":"var(--red)"}}>{roi}% ROI</div>
        </div>
        <div className="roi-bars">
          {[["Purchase","var(--text2)",r.purchaseCost],["Feed","var(--amber-l)",r.feedCostTotal],["Vet","var(--blue)",r.vetCostTotal],["Labour","var(--orange)",r.labourAlloc],["Sale Value","var(--green)",r.saleValue]].map(([l,c,v])=>(
            <div key={l} className="roi-bar-item">
              <div className="roi-bar-val" style={{color:c}}>{"N$"}{fmt(v)}</div>
              <div className="roi-bar-lbl">{l}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:13}}><span style={{color:"var(--text3)"}}>Total Cost: </span><span style={{fontWeight:700}}>{"N$"}{fmt(totalCost)}</span></div>
          <div style={{fontSize:13}}><span style={{color:"var(--text3)"}}>Profit: </span><span style={{fontWeight:700,color:profit>=0?"var(--green)":"var(--red)"}}>{"N$"}{fmt(profit)}</span></div>
          <button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setRoiData(p=>p.filter(x=>x.id!==r.id))}}>✕</button>
        </div>
      </div>;
    })}
    {modal&&<Modal title={`+ ${t.addRoiRecord}`} onClose={()=>sm(false)}>
      <div className="fg">
        <F l="Animal Tag / ID" c={<input className="fi" placeholder="e.g. C-001" value={form.animalId} onChange={e=>sf(p=>({...p,animalId:e.target.value}))}/>}/>
        <F l={t.roiFarm} c={<input className="fi" value={form.farm} onChange={e=>sf(p=>({...p,farm:e.target.value}))}/>}/>
        <F l={t.purchaseCost} c={<input className="fi" type="number" value={form.purchaseCost} onChange={e=>sf(p=>({...p,purchaseCost:e.target.value}))}/>}/>
        <F l={t.feedCostTotal} c={<input className="fi" type="number" value={form.feedCostTotal} onChange={e=>sf(p=>({...p,feedCostTotal:e.target.value}))}/>}/>
        <F l={t.vetCostTotal} c={<input className="fi" type="number" value={form.vetCostTotal} onChange={e=>sf(p=>({...p,vetCostTotal:e.target.value}))}/>}/>
        <F l={t.labourAlloc} c={<input className="fi" type="number" value={form.labourAlloc} onChange={e=>sf(p=>({...p,labourAlloc:e.target.value}))}/>}/>
        <F l={t.saleValue} c={<input className="fi" type="number" value={form.saleValue} onChange={e=>sf(p=>({...p,saleValue:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AI ASSISTANT  — Phase 4
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AIAssistant({animals,workers,transactions,leave,vetlog,slaughter,settings,t}){
  const [messages,sm]=useState([{role:"assistant",text:"Hello! I'm your FarmLogic AI assistant. Ask me anything about your farm — animals, finances, workers, health records, or performance. For example:\n\n• How many cattle do I have?\n• What is my net profit this year?\n• Which animals are overdue for vaccination?\n• What is my most profitable farm?\n• How much have I spent on feed?"}]);
  const [input,si]=useState("");
  const [loading,sl]=useState(false);
  const endRef=useState(null);

  const farmSummary=()=>{
    const income=transactions.filter(x=>x.type==="income").reduce((s,x)=>s+x.amount,0);
    const expenses=transactions.filter(x=>x.type==="expense").reduce((s,x)=>s+x.amount,0);
    const today=new Date().toISOString().split("T")[0];
    const overdueVet=vetlog.filter(v=>v.nextDue&&v.nextDue<=today);
    const farms=[...new Set([...animals.map(a=>a.farm),...workers.map(w=>w.farm)])];
    return {
      owner:settings?.ownerName||"Farm Owner",
      totalAnimals:animals.filter(a=>a.status==="Active").length,
      cattle:animals.filter(a=>a.type==="cattle"&&a.status==="Active").length,
      sheep:animals.filter(a=>a.type==="sheep"&&a.status==="Active").length,
      goats:animals.filter(a=>a.type==="goats"&&a.status==="Active").length,
      pigs:animals.filter(a=>a.type==="pigs"&&a.status==="Active").length,
      horses:animals.filter(a=>a.type==="horses"&&a.status==="Active").length,
      totalWorkers:workers.length,
      monthlyPayroll:workers.reduce((s,w)=>s+w.salary,0),
      income,expenses,netProfit:income-expenses,
      overdueVaccinations:overdueVet.length,
      overdueAnimals:overdueVet.map(v=>v.animal).join(", "),
      farms,
      totalFarms:farms.length,
      transactions:transactions.slice(0,20),
      recentSlaughter:slaughter.slice(0,10),
      pendingLeave:leave.filter(l=>l.status==="Pending").length,
    };
  };

  const ask=async()=>{
    if(!input.trim()||loading)return;
    const userMsg=input.trim();
    si("");
    sm(p=>[...p,{role:"user",text:userMsg}]);
    sl(true);

    try{
      const data=farmSummary();
      const sys=`You are FarmLogic AI, a helpful farm management assistant for ${data.owner} in Namibia.

CURRENT FARM DATA:
- Total active animals: ${data.totalAnimals} (Cattle: ${data.cattle}, Sheep: ${data.sheep}, Goats: ${data.goats}, Pigs: ${data.pigs}, Horses: ${data.horses})
- Total workers: ${data.totalWorkers}, Monthly payroll: N$${data.monthlyPayroll.toLocaleString()}
- Total income (YTD): N$${data.income.toLocaleString()}
- Total expenses (YTD): N$${data.expenses.toLocaleString()}
- Net profit (YTD): N$${data.netProfit.toLocaleString()}
- Overdue vaccinations: ${data.overdueVaccinations} animals (${data.overdueAnimals||"none"})
- Pending leave requests: ${data.pendingLeave}
- Farms tracked: ${data.farms.join(", ")||"none yet"}
- Recent transactions: ${JSON.stringify(data.transactions)}
- Recent slaughter records: ${JSON.stringify(data.recentSlaughter)}

Answer questions about this farm data clearly and helpfully. Use N$ for currency. Be concise but thorough. If asked about something not in the data, say so and suggest how to add it.`;

      const response=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:sys,
          messages:[{role:"user",content:userMsg}]
        })
      });
      const result=await response.json();
      const answer=result.content?.map(b=>b.text||"").join("")||"Sorry, I could not get a response. Please try again.";
      sm(p=>[...p,{role:"assistant",text:answer}]);
    }catch(err){
      sm(p=>[...p,{role:"assistant",text:"Connection error. Please check your internet and try again."}]);
    }
    sl(false);
  };

  const quickQuestions=[
    "How many cattle do I have?",
    "What is my net profit this year?",
    "Which animals are overdue for vaccination?",
    "How much is my monthly payroll?",
    "What is my most expensive expense category?",
    "How many workers do I have per farm?",
  ];

  return <div>
    <div className="alert alert-info" style={{marginBottom:16}}>
      🤖 <b>AI Assistant</b> — Ask anything about your farm in plain English. Powered by Claude AI. Requires internet connection.
    </div>

    {/* Chat window */}
    <div style={{background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:"var(--rl)",overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"12px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:18}}>🤖</span>
        <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:2,color:"var(--amber-l)"}}>FARMLOGIC AI ASSISTANT</span>
      </div>
      <div style={{height:400,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:12}}>
        {messages.map((msg,i)=>(
          <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start"}}>
            <div style={{
              maxWidth:"80%",padding:"10px 14px",borderRadius:12,fontSize:13,lineHeight:1.6,
              background:msg.role==="user"?"var(--amber)":"var(--bg-surface)",
              color:msg.role==="user"?"#000":"var(--text)",
              border:msg.role==="assistant"?"1px solid var(--border)":"none",
              whiteSpace:"pre-wrap",
            }}>{msg.text}</div>
          </div>
        ))}
        {loading&&<div style={{display:"flex",justifyContent:"flex-start"}}>
          <div style={{background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:12,padding:"10px 14px",fontSize:13,color:"var(--text3)"}}>
            🤔 Thinking...
          </div>
        </div>}
      </div>
      <div style={{padding:12,borderTop:"1px solid var(--border)",display:"flex",gap:10}}>
        <input
          className="fi" placeholder="Ask anything about your farm..."
          value={input} onChange={e=>si(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&ask()}
          style={{flex:1}}
        />
        <button className="btn btp" onClick={ask} disabled={loading||!input.trim()} style={{opacity:loading||!input.trim()?0.5:1}}>
          {loading?"...":"Send"}
        </button>
      </div>
    </div>

    {/* Quick questions */}
    <div>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)",marginBottom:10}}>Quick Questions</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {quickQuestions.map((q,i)=>(
          <button key={i} onClick={()=>{si(q);}} className="btn btg sm" style={{fontSize:11}}>
            {q}
          </button>
        ))}
      </div>
    </div>
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  APP ROOT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function App(){
  // Version bump clears old demo data on first load
  useEffect(()=>{
    const ver=localStorage.getItem("fl_version");
    if(ver!=="2.1"){
      const keep=["fl_lang"];
      Object.keys(localStorage).forEach(k=>{ if(!keep.includes(k)) localStorage.removeItem(k); });
      localStorage.setItem("fl_version","2.1");
    }
  },[]);
  const [lang,sl]=useLS("fl_lang","en");
  const [auth,sa]=useLS("fl_auth",false);
  const [currentUser,scu]=useState(()=>{try{const u=localStorage.getItem("fl_current_user");return u||"admin";}catch{return "admin";}});
  const [displayName,sdn]=useState(()=>{try{const accs=JSON.parse(localStorage.getItem("fl_accounts")||"[]");const u=localStorage.getItem("fl_current_user");const acc=accs.find(a=>a.id===u);return acc?.displayName||"Admin";}catch{return "Admin";}});
  const [page,sp]=useState("dashboard");
  const [animals,setAnimals]=useLS("fl_animals",seedAnimals);
  const [workers,setWorkers]=useLS("fl_workers",seedWorkers);
  const [leave,setLeave]=useLS("fl_leave",seedLeave);
  const [transactions,setTx]=useLS("fl_tx",seedTransactions);
  const [inventory,setInv]=useLS("fl_inv",seedInventory);
  const [vetlog,setVet]=useLS("fl_vet",seedVet);
  const [camps,setCamps]=useLS("fl_camps",seedCamps);
  const [roiData,setRoi]=useLS("fl_roi",seedROI);
  const [slaughter,setSlaughter]=useLS("fl_slaughter",seedSlaughter);
  const [herdEvents,setHerdEvents]=useLS("fl_herdEvents",seedHerdEvents);
  const [implements_,setImplements]=useLS("fl_implements",seedImplements);
  const [jobCards,setJobCards]=useLS("fl_jobCards",[]);
  const [licences,setLicences]=useLS("fl_licences",[]);
  const [settings,setSettings]=useLS("fl_settings",{ownerName:"",farmName:"",regNumber:"",address:"",phone:"",email:"",bank:"",bankAcc:""});
  const t=T[lang];

  const nav=[
    {id:"dashboard",icon:"⊞",label:t.dashboard,sec:"Main"},
    {id:"livestock",icon:"🐄",label:t.livestock,sec:"Main"},
    {id:"workers",icon:"👷",label:t.workers,sec:"Main"},
    {id:"leave",icon:"📋",label:t.leave,sec:"Main"},
    {id:"bookkeeping",icon:"📊",label:t.bookkeeping,sec:"Finance"},
    {id:"docreader",icon:"📄",label:"Doc Scanner",sec:"Finance"},
    {id:"tax",icon:"🧾",label:t.tax,sec:"Finance"},
    {id:"roi",icon:"📈",label:t.roi,sec:"Finance"},
    {id:"feed",icon:"🌾",label:t.feed,sec:"Farm"},
    {id:"auction",icon:"🔨",label:"Auction Scanner",sec:"Farm"},
    {id:"inventory",icon:"📦",label:t.inventory,sec:"Farm"},
    {id:"vetlog",icon:"💉",label:t.vetlog,sec:"Farm"},
    {id:"grazing",icon:"🌿",label:t.grazing,sec:"Farm"},
    {id:"slaughter",icon:"🥩",label:t.slaughter,sec:"Farm"},
    {id:"implements",icon:"🚜",label:"Farm Implements",sec:"Farm"},
    {id:"licences",icon:"🪪",label:"Vehicle Licences",sec:"Farm"},
    {id:"ai",icon:"🤖",label:"AI Assistant",sec:"System"},
    {id:"settings",icon:"⚙",label:"Settings",sec:"System"},
  ];

  if(!auth) return <><style>{styles}</style><Login onLogin={()=>sa(true)} t={t}/></>;

  return <>
    <style>{styles}</style>
    <div className="app">
      <aside className="sidebar">
        <div className="sb"><div className="slogo">{t.appName}</div><div className="stag">{t.tagline}</div></div>
        <nav className="snav">
          {["Main","Finance","Farm"].map(sec=><div key={sec}>
            <div className="nsec">{sec}</div>
            {nav.filter(n=>n.sec===sec).map(n=><div key={n.id} className={`ni ${page===n.id?"active":""}`} onClick={()=>sp(n.id)}>
              <span className="nicon">{n.icon}</span>{n.label}
            </div>)}
          </div>)}
        </nav>
        <div className="sf"><div className="ni" style={{color:"var(--red)"}} onClick={()=>{sa(false);localStorage.removeItem("fl_current_user");}}><span className="nicon">⏻</span>{t.logout}</div></div>
      </aside>
      <div className="main">
        <header className="topbar">
          <div className="ttl">{nav.find(n=>n.id===page)?.label}</div>
          <div className="tr">
            <div className="ltog">
              <button className={`lbtn ${lang==="en"?"active":""}`} onClick={()=>sl("en")}>EN</button>
              <button className={`lbtn ${lang==="af"?"active":""}`} onClick={()=>sl("af")}>AF</button>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div className="ava">{displayName?displayName[0].toUpperCase():"A"}</div>
              <div style={{fontSize:12,fontWeight:700}}>{displayName||"Admin"}</div>
            </div>
          </div>
        </header>
        <div className="content">
          {page==="dashboard"  &&<Dashboard animals={animals} workers={workers} leave={leave} transactions={transactions} inventory={inventory} vetlog={vetlog} t={t}/>}
          {page==="livestock"  &&<Livestock animals={animals} setAnimals={setAnimals} transactions={transactions} setTransactions={setTx} herdEvents={herdEvents} setHerdEvents={setHerdEvents} t={t}/>}
          {page==="workers"    &&<Workers workers={workers} setWorkers={setWorkers} t={t}/>}
          {page==="leave"      &&<Leave leave={leave} setLeave={setLeave} workers={workers} setWorkers={setWorkers} t={t}/>}
          {page==="bookkeeping"&&<Bookkeeping transactions={transactions} setTransactions={setTx} t={t}/>}
          {page==="docreader"  &&<DocReader transactions={transactions} setTransactions={setTx} t={t}/>}
          {page==="tax"        &&<TaxPayroll workers={workers} settings={settings} leave={leave} t={t}/>}
          {page==="roi"        &&<ROI roiData={roiData} setRoiData={setRoi} workers={workers} transactions={transactions} t={t}/>}
          {page==="feed"       &&<FeedCalc t={t}/>}
          {page==="auction"    &&<AuctionScanner animals={animals} setAnimals={setAnimals} transactions={transactions} setTransactions={setTx} t={t}/>}
          {page==="inventory"  &&<Inventory inventory={inventory} setInventory={setInv} t={t}/>}
          {page==="vetlog"     &&<VetLog vetlog={vetlog} setVetlog={setVet} t={t}/>}
          {page==="grazing"    &&<Grazing camps={camps} setCamps={setCamps} t={t}/>}
          {page==="slaughter"  &&<Slaughter slaughter={slaughter} setSlaughter={setSlaughter} t={t}/>}
          {page==="implements" &&<Implements implements_={implements_} setImplements={setImplements} jobCards={jobCards} setJobCards={setJobCards} t={t}/>}
          {page==="licences"   &&<Licences licences={licences} setLicences={setLicences} t={t}/>}
          {page==="ai"         &&<AIAssistant animals={animals} workers={workers} transactions={transactions} leave={leave} vetlog={vetlog} slaughter={slaughter} settings={settings} t={t}/>}
          {page==="settings"   &&<Settings settings={settings} setSettings={setSettings} t={t}/>}
        </div>
      </div>
    </div>
  </>;
}
