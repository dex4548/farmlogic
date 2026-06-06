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

const seedAnimals = [
  {id:1,type:"cattle",subcat:"Cow",tag:"C-001",breed:"Brahman",dob:"2021-03-14",weight:420,status:"Active",notes:"Good milker",farm:"Farm 1"},
  {id:2,type:"cattle",subcat:"Bull",tag:"C-002",breed:"Simmental",dob:"2020-07-22",weight:580,status:"Active",notes:"Stud bull",farm:"Farm 1"},
  {id:3,type:"cattle",subcat:"Heifer",tag:"C-003",breed:"Hereford",dob:"2022-01-05",weight:380,status:"Active",notes:"",farm:"Farm 2"},
  {id:4,type:"cattle",subcat:"Tolly",tag:"C-004",breed:"Brahman",dob:"2023-03-10",weight:220,status:"Active",notes:"",farm:"Farm 1"},
  {id:5,type:"cattle",subcat:"Calf",tag:"C-005",breed:"Brahman",dob:"2024-08-15",weight:80,status:"Active",notes:"Born on farm",farm:"Farm 1"},
  {id:6,type:"cattle",subcat:"Ox",tag:"C-006",breed:"Afrikaner",dob:"2019-05-01",weight:620,status:"Active",notes:"",farm:"Farm 2"},
  {id:7,type:"sheep",subcat:"Ewe",tag:"S-001",breed:"Dorper",dob:"2022-06-10",weight:62,status:"Active",notes:"",farm:"Farm 1"},
  {id:8,type:"sheep",subcat:"Ram",tag:"S-002",breed:"Merino",dob:"2021-11-18",weight:75,status:"Active",notes:"Prize wool",farm:"Farm 3"},
  {id:9,type:"sheep",subcat:"Lamb",tag:"S-003",breed:"Dorper",dob:"2024-09-01",weight:18,status:"Active",notes:"",farm:"Farm 1"},
  {id:10,type:"goats",subcat:"Doe",tag:"G-001",breed:"Boer",dob:"2023-02-28",weight:45,status:"Active",notes:"",farm:"Farm 2"},
  {id:11,type:"pigs",subcat:"Sow",tag:"P-001",breed:"Large White",dob:"2023-05-01",weight:95,status:"Active",notes:"",farm:"Farm 1"},
  {id:12,type:"horses",subcat:"Mare",tag:"H-001",breed:"Warmblood",dob:"2018-04-12",weight:520,status:"Active",notes:"",farm:"Farm 1"},
];

// ── FARM IMPLEMENTS SEED ─────────────────────────────────────
const seedImplements = [
  {id:1,name:"John Deere Tractor",category:"Tractor",serial:"JD-2024-001",year:"2020",condition:"Good",farm:"Farm 1",notes:"Main tractor"},
  {id:2,name:"Bulldozer CAT D6",category:"Bulldozer",serial:"CAT-D6-112",year:"2015",condition:"Fair",farm:"Farm 2",notes:""},
  {id:3,name:"Padskraper 3m",category:"Padskraper",serial:"",year:"2018",condition:"Good",farm:"Farm 1",notes:""},
  {id:4,name:"Borehole Pump 15kW",category:"Water Equipment",serial:"BP-445",year:"2019",condition:"Good",farm:"Farm 3",notes:""},
  {id:5,name:"Livestock Trailer",category:"Trailer",serial:"LT-2021-009",year:"2021",condition:"Good",farm:"Farm 1",notes:""},
];

// ── HERD EVENTS SEED (births, deaths, sales, purchases) ──────
const seedHerdEvents = [
  {id:1,date:"2025-01-15",type:"Birth",species:"cattle",subcat:"Calf",count:2,breed:"Brahman",farm:"Farm 1",notes:"Twin calves born",relatedTag:"C-001"},
  {id:2,date:"2025-01-20",type:"Death",species:"cattle",subcat:"Calf",count:1,breed:"Brahman",farm:"Farm 1",notes:"Died shortly after birth",relatedTag:""},
  {id:3,date:"2025-02-05",type:"Sale",species:"sheep",subcat:"Lamb",count:5,breed:"Dorper",farm:"Farm 3",notes:"Sold at Agra auction",relatedTag:""},
  {id:4,date:"2025-02-10",type:"Purchase",species:"cattle",subcat:"Heifer",count:3,breed:"Simmental",farm:"Farm 2",notes:"Bought from Hannes Kotze",relatedTag:""},
];
const seedWorkers = [
  {id:1,name:"Johannes Swartbooi",idNumber:"8501015800085",position:"Farm Manager",startDate:"2018-01-15",salary:12000,phone:"081 234 5678",farm:"Farm 1"},
  {id:2,name:"Maria Katjivena",idNumber:"9203025400082",position:"Herdsman",startDate:"2020-03-01",salary:5500,phone:"081 345 6789",farm:"Farm 2"},
  {id:3,name:"Petrus Hamutenya",idNumber:"7812155200081",position:"General Worker",startDate:"2019-06-12",salary:4200,phone:"081 456 7890",farm:"Farm 1"},
  {id:4,name:"Anna Tjipuka",idNumber:"0004086100083",position:"Livestock Handler",startDate:"2022-02-01",salary:5000,phone:"081 567 8901",farm:"Farm 3"},
];
const seedLeave = [
  {id:1,workerId:1,workerName:"Johannes Swartbooi",type:"Annual",from:"2024-12-20",to:"2025-01-03",status:"Approved",days:10},
  {id:2,workerId:2,workerName:"Maria Katjivena",type:"Sick",from:"2025-01-08",to:"2025-01-09",status:"Approved",days:2},
  {id:3,workerId:3,workerName:"Petrus Hamutenya",type:"Family",from:"2025-02-14",to:"2025-02-15",status:"Pending",days:2},
];
const seedTransactions = [
  {id:1,date:"2025-01-05",description:"Sold 3 Brahman cows",category:"Livestock Sales",type:"income",amount:45000,farm:"Farm 1",doc:""},
  {id:2,date:"2025-01-10",description:"Diesel for tractors",category:"Fuel",type:"expense",amount:3200,farm:"Farm 1",doc:""},
  {id:3,date:"2025-01-15",description:"Enerfeed 500kg",category:"Feed & Supplements",type:"expense",amount:8700,farm:"Farm 2",doc:""},
  {id:4,date:"2025-01-20",description:"Vet vaccinations",category:"Veterinary",type:"expense",amount:2100,farm:"Farm 1",doc:""},
  {id:5,date:"2025-02-01",description:"Sold 10 Dorper sheep",category:"Livestock Sales",type:"income",amount:22000,farm:"Farm 3",doc:""},
];
const seedInventory = [
  {id:1,name:"Lucerne Bales",category:"Feed",quantity:120,unit:"Bales",minStock:20,lastUpdated:"2025-01-18",farm:"Farm 1"},
  {id:2,name:"Enerfeed (25kg)",category:"Feed",quantity:8,unit:"Bags",minStock:10,lastUpdated:"2025-01-20",farm:"Farm 1"},
  {id:3,name:"Diesel",category:"Fuel",quantity:450,unit:"Litres",minStock:100,lastUpdated:"2025-01-22",farm:"Farm 2"},
  {id:4,name:"FMD Vaccine",category:"Medicine",quantity:3,unit:"Vials",minStock:5,lastUpdated:"2025-01-10",farm:"Farm 1"},
];
const seedVet = [
  {id:1,animal:"C-001",type:"Vaccination",medicine:"FMD Vaccine",dosage:"2ml",date:"2025-01-10",nextDue:"2025-07-10",notes:"Annual FMD",farm:"Farm 1"},
  {id:2,animal:"C-002",type:"Treatment",medicine:"Terramycin",dosage:"5ml",date:"2025-01-18",nextDue:"",notes:"Eye infection",farm:"Farm 1"},
  {id:3,animal:"S-001",type:"Deworming",medicine:"Valbazen",dosage:"3ml",date:"2025-01-05",nextDue:"2025-04-05",notes:"",farm:"Farm 1"},
];
const seedCamps = [
  {id:1,name:"Camp A – Northside",size:150,status:"In Use",animalCount:45,lastGrazed:"2025-01-01",waterPoint:true,farm:"Farm 1"},
  {id:2,name:"Camp B – Riverbed",size:200,status:"Resting",animalCount:0,lastGrazed:"2024-12-15",waterPoint:true,farm:"Farm 1"},
  {id:3,name:"Camp C – Hillside",size:80,status:"Available",animalCount:0,lastGrazed:"2024-11-20",waterPoint:false,farm:"Farm 2"},
];
const seedROI = [
  {id:1,animalId:"C-001",farm:"Farm 1",purchaseCost:8500,feedCostTotal:3200,vetCostTotal:450,labourAlloc:600,saleValue:18000},
  {id:2,animalId:"C-003",farm:"Farm 2",purchaseCost:7200,feedCostTotal:2800,vetCostTotal:200,labourAlloc:500,saleValue:15500},
];
const seedSlaughter = [
  {id:1,animalId:"C-001",farm:"Farm 1",date:"2025-01-20",liveWeight:480,carcassWeight:264,pricePerKg:52,grade:"A2",abattoir:"Meatco Windhoek",notes:""},
  {id:2,animalId:"S-002",farm:"Farm 3",date:"2025-02-05",liveWeight:78,carcassWeight:42,pricePerKg:68,grade:"A1",abattoir:"Meatco Okahandja",notes:""},
];

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
  const [u,su]=useState(""); const [p,sp]=useState(""); const [e,se]=useState("");
  const go=()=>{if(u==="admin"&&p==="farmlogic")onLogin();else se(t.wrongCredentials);};
  return <div className="lw"><div className="lc">
    <div className="ll">{t.appName}</div><div className="lt">{t.tagline}</div>
    <label className="llabel">{t.username}</label>
    <input className="li" value={u} onChange={e=>su(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} autoFocus/>
    <label className="llabel">{t.password}</label>
    <input className="li" type="password" value={p} onChange={e=>sp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}/>
    {e&&<div className="lerr">{e}</div>}
    <button className="lb" onClick={go}>{t.loginBtn}</button>
    <div style={{marginTop:14,fontSize:11,color:"var(--text3)",textAlign:"center"}}>admin / farmlogic</div>
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
      <div className="sc"><div className="sicon">👷</div><div className="slabel">{t.totalWorkers}</div><div className="sval">{workers.length}</div><div className="ssub">N${fmt(payroll)}/mo payroll</div></div>
      <div className="sc"><div className="sicon">📈</div><div className="slabel">{t.netProfit}</div><div className="sval" style={{fontSize:26,color:net>=0?"var(--green)":"var(--red)"}}>N${fmt(net)}</div><div className="ssub">Income vs expenses</div></div>
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
      <div className="card"><div className="ctitle">Income (YTD)</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"var(--green)"}}>N${fmt(income)}</div></div>
      <div className="card"><div className="ctitle">Expenses (YTD)</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:"var(--red)"}}>N${fmt(exp)}</div></div>
      <div className="card"><div className="ctitle">Net Profit (YTD)</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:net>=0?"var(--green)":"var(--red)"}}>N${fmt(net)}</div></div>
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
        newA.push({id:Date.now()+i+1,type:eventForm.species,subcat:eventForm.subcat,tag:`${prefix}-${num}`,breed:eventForm.breed||"Unknown",dob:today,weight:0,status:"Active",notes:`Born on farm — ${eventForm.notes}`,farm:eventForm.farm});
      }
      setAnimals(p=>[...p,...newA]);
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
  const handleImportFile=async(e)=>{
    const file=e.target.files[0]; if(!file)return;
    sil(true); sir(null);
    const reader=new FileReader();
    const isImage=file.type.startsWith("image/");
    const isPdf=file.type==="application/pdf";
    const isCsv=file.name.endsWith(".csv")||file.type==="text/csv";
    const isExcel=file.name.endsWith(".xlsx")||file.name.endsWith(".xls");

    reader.onload=async(ev)=>{
      try{
        let messages;
        if(isImage){
          const b64=ev.target.result.split(",")[1];
          messages=[{role:"user",content:[
            {type:"image",source:{type:"base64",media_type:file.type,data:b64}},
            {type:"text",text:"This is a Namibian livestock herd statement or document. Extract all animal counts by type and subcategory."}
          ]}];
        } else if(isPdf){
          const b64=ev.target.result.split(",")[1];
          messages=[{role:"user",content:[
            {type:"document",source:{type:"base64",media_type:"application/pdf",data:b64}},
            {type:"text",text:"This is a Namibian livestock herd statement or document. Extract all animal counts."}
          ]}];
        } else {
          // CSV / Excel / text — send as text
          const text=ev.target.result;
          messages=[{role:"user",content:`This is a livestock document (${file.name}):\n\n${text.substring(0,8000)}\n\nExtract all animal counts by type and subcategory.`}];
        }

        const sys=`You are a Namibian livestock herd statement reader. Extract all animal counts from the document.
Return ONLY valid JSON, no markdown, no explanation:
{
  "source": "Namlits|Agra|Manual|Other",
  "date": "YYYY-MM-DD or null",
  "farm": "farm name or null",
  "animals": [
    {"type":"cattle|sheep|goats|pigs|horses","subcat":"Cow|Heifer|Tolly|Bull|Ox|Calf|Weaner|Ewe|Ram|Lamb|Wether|Doe|Buck|Kid|Sow|Boar|Piglet|Mare|Stallion|Gelding","count":12,"breed":"Brahman or Unknown"}
  ],
  "notes": "any important info"
}
Map Namlits codes: KO/Ko=Cow, VS/VS=Heifer(Vers Skotvee), TO/To=Tolly, BU/Bu=Bull, OS/Os=Ox, KA/Ka=Calf(Kalf), OO/Oo=Ewe(Ooi), RA/Ra=Ram, LA/La=Lamb(Lammer), BO/Bo=Buck(Bok).`;

        const raw=await callClaude(messages,sys);
        const clean=raw.replace(/```json|```/g,"").trim();
        sir(JSON.parse(clean));
      } catch(err){
        console.error(err);
        sir({error:"Could not read document. Try a clearer scan or CSV export from Namlits."});
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
        <thead><tr><th>{t.tagNumber}</th><th>Category</th><th>{t.breed}</th><th>{t.dob}</th><th>{t.weight}</th><th>{t.farm}</th><th>{t.status}</th><th></th></tr></thead>
        <tbody>{filteredAnimals.map(a=><tr key={a.id}>
          <td><span className="mono">{a.tag}</span></td>
          <td><span className="b ba">{a.subcat}</span></td>
          <td>{a.breed}</td><td>{a.dob||"—"}</td><td>{a.weight?`${a.weight} kg`:"—"}</td><td>{a.farm}</td>
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
        <div className="alert alert-green"><div style={{fontWeight:800}}> ✅ {batchDone.count} {batchDone.category} added to {batchDone.farm}</div><div style={{fontSize:12,marginTop:4}}>N${fmt(batchDone.totalCost)} recorded as expense</div></div>
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
        {batch.count&&batch.pricePerHead&&<div className="alert alert-green">{batch.count} × N${fmt(batch.pricePerHead)} = <strong>N${fmt(Number(batch.count)*Number(batch.pricePerHead))} total</strong></div>}
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
//  FARM IMPLEMENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Implements({implements_,setImplements,t}){
  const [modal,sm]=useState(false);
  const [editId,se]=useState(null);
  const [form,sf]=useState({name:"",category:"Tractor",serial:"",year:"",condition:"Good",farm:"Farm 1",notes:""});
  const [q,sq]=useState("");
  const CATS=["Tractor","Bulldozer","Padskraper","Grader","Plough","Harrow","Sprayer","Baler","Combine","Trailer","Water Equipment","Generator","Solar","Pump","Loader","Other"];
  const CONDS=["Excellent","Good","Fair","Poor","Out of Service"];
  const filtered=implements_.filter(i=>(i.name+i.category+i.farm).toLowerCase().includes(q.toLowerCase()));
  const save=()=>{
    if(editId) setImplements(p=>p.map(i=>i.id===editId?{...form,id:editId}:i));
    else setImplements(p=>[...p,{...form,id:Date.now()}]);
    sm(false);se(null);
  };
  const condColor={Excellent:"var(--green)",Good:"var(--green)",Fair:"var(--amber-l)",Poor:"var(--orange)","Out of Service":"var(--red)"};
  return <div>
    <div style={{display:"flex",justifyContent:"flex-end",marginBottom:14}}>
      <button className="btn btp" onClick={()=>{sf({name:"",category:"Tractor",serial:"",year:"",condition:"Good",farm:"Farm 1",notes:""});se(null);sm(true);}}>+ Add Implement</button>
    </div>
    <div className="tw">
      <div className="tb"><input className="si" placeholder="Search implements..." value={q} onChange={e=>sq(e.target.value)}/></div>
      {filtered.length===0?<div className="nr">No implements found</div>:<table>
        <thead><tr><th>Name</th><th>Category</th><th>Serial</th><th>Year</th><th>Condition</th><th>Farm</th><th>Notes</th><th></th></tr></thead>
        <tbody>{filtered.map(item=><tr key={item.id}>
          <td style={{fontWeight:700}}>{item.name}</td>
          <td><span className="b bm">{item.category}</span></td>
          <td><span className="mono">{item.serial||"—"}</span></td>
          <td>{item.year||"—"}</td>
          <td style={{color:condColor[item.condition]||"var(--text)",fontWeight:600}}>{item.condition}</td>
          <td>{item.farm}</td>
          <td style={{fontSize:12,color:"var(--text2)",maxWidth:160}}>{item.notes||"—"}</td>
          <td><div style={{display:"flex",gap:5}}>
            <button className="btn btg sm" onClick={()=>{sf({...item});se(item.id);sm(true);}}>Edit</button>
            <button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setImplements(p=>p.filter(x=>x.id!==item.id));}}>✕</button>
          </div></td>
        </tr>)}</tbody>
      </table>}
    </div>
    {modal&&<Modal title={editId?"Edit Implement":"+ Add Implement"} onClose={()=>sm(false)}>
      <div className="fg">
        <F l="Implement Name" full c={<input className="fi" placeholder="e.g. John Deere 6110M or Padskraper 3m" value={form.name} onChange={e=>sf(p=>({...p,name:e.target.value}))}/>}/>
        <F l="Category" c={<select className="fsel" value={form.category} onChange={e=>sf(p=>({...p,category:e.target.value}))}>{CATS.map(c=><option key={c}>{c}</option>)}</select>}/>
        <F l="Farm" c={<input className="fi" value={form.farm} onChange={e=>sf(p=>({...p,farm:e.target.value}))}/>}/>
        <F l="Serial Number" c={<input className="fi" value={form.serial} onChange={e=>sf(p=>({...p,serial:e.target.value}))}/>}/>
        <F l="Year" c={<input className="fi" type="number" placeholder="e.g. 2020" value={form.year} onChange={e=>sf(p=>({...p,year:e.target.value}))}/>}/>
        <F l="Condition" c={<select className="fsel" value={form.condition} onChange={e=>sf(p=>({...p,condition:e.target.value}))}>{CONDS.map(c=><option key={c}>{c}</option>)}</select>}/>
        <F l="Notes" full c={<textarea className="fta" value={form.notes} onChange={e=>sf(p=>({...p,notes:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AI DOCUMENT READER  (reads any doc → auto-classifies expense/income)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function callClaude(messages, systemPrompt){
  const res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514",
      max_tokens:1000,
      system: systemPrompt,
      messages,
    }),
  });
  const data=await res.json();
  return data.content?.map(b=>b.text||"").join("")||"";
}

function DocReader({transactions,setTransactions,t}){
  const [loading,sl]=useState(false);
  const [result,sr]=useState(null);
  const [farm,sf]=useState("Farm 1");
  const [imgData,si]=useState(null);
  const [imgType,sit]=useState("");
  const [error,se]=useState("");
  const fileRef=useState(null);

  const handleFile=async(e)=>{
    const file=e.target.files[0];
    if(!file){return;}
    se(""); sr(null);
    const reader=new FileReader();
    reader.onload=ev=>{
      const base64=ev.target.result.split(",")[1];
      const mtype=file.type||"image/jpeg";
      si(base64); sit(mtype);
    };
    reader.readAsDataURL(file);
  };

  const analyse=async()=>{
    if(!imgData){se("Please upload a document or image first.");return;}
    sl(true); se(""); sr(null);
    try{
      const isImg=imgType.startsWith("image/");
      const isPdf=imgType==="application/pdf";
      let messages;
      if(isImg){
        messages=[{role:"user",content:[
          {type:"image",source:{type:"base64",media_type:imgType,data:imgData}},
          {type:"text",text:`Farm: ${farm}. Analyse this document. Extract all financial information.`}
        ]}];
      } else if(isPdf){
        messages=[{role:"user",content:[
          {type:"document",source:{type:"base64",media_type:"application/pdf",data:imgData}},
          {type:"text",text:`Farm: ${farm}. Analyse this document. Extract all financial information.`}
        ]}];
      } else {
        se("Please upload an image (JPG/PNG) or PDF file."); sl(false); return;
      }

      const sys=`You are a Namibian farm bookkeeping assistant. Analyse the uploaded document and extract financial data.
Return ONLY valid JSON in this exact format, no markdown, no explanation:
{
  "docType": "invoice|receipt|auction|slaughter|salary|other",
  "transactionType": "income|expense",
  "amount": 12500.00,
  "description": "Short clear description",
  "category": "Livestock Sales|Livestock Purchase|Feed & Supplements|Fuel|Veterinary|Labour|Equipment|Other",
  "date": "YYYY-MM-DD",
  "vendor": "Supplier or buyer name",
  "lineItems": [{"description":"item","qty":1,"unitPrice":100,"total":100}],
  "confidence": "high|medium|low",
  "notes": "Any important details"
}
If you cannot determine a value, use null. For date, use today if not found. Amount must be a number.`;

      const raw=await callClaude(messages,sys);
      const clean=raw.replace(/```json|```/g,"").trim();
      const parsed=JSON.parse(clean);
      sr(parsed);
    } catch(err){
      se("Could not read document. Please try a clearer image or PDF.");
    }
    sl(false);
  };

  const confirm=()=>{
    if(!result) return;
    setTransactions(p=>[{
      id:Date.now(),
      date:result.date||new Date().toISOString().split("T")[0],
      description:result.description||"Document import",
      category:result.category||"Other",
      type:result.transactionType||"expense",
      amount:result.amount||0,
      farm,
      doc:"Scanned document",
    },...p]);
    sr(null); si(null);
    alert("✅ Transaction added to Bookkeeping!");
  };

  return <div>
    <div className="alert alert-info">🤖 Upload any invoice, receipt, statement or auction document — AI will read it and classify it automatically.</div>

    <div className="feed-panel">
      <div className="feed-title">Document Scanner</div>
      <div className="fg" style={{marginBottom:16}}>
        <F l="Farm to assign transaction" c={<input className="fi" value={farm} onChange={e=>sf(e.target.value)}/>}/>
        <F l="Upload Document (PDF or Image)" full c={
          <div>
            <input type="file" accept="image/*,application/pdf" onChange={handleFile} style={{display:"block",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 12px",color:"var(--text)",width:"100%",fontFamily:"'Syne',sans-serif",fontSize:13,cursor:"pointer"}}/>
            {imgData&&<div style={{marginTop:8,fontSize:12,color:"var(--green)"}}>✓ Document loaded — ready to analyse</div>}
          </div>
        }/>
      </div>
      <button className="btn btp" onClick={analyse} disabled={loading||!imgData} style={{width:"100%",justifyContent:"center",padding:12,opacity:(!imgData||loading)?0.5:1}}>
        {loading?"🔍 Reading document...":"🤖 Analyse with AI"}
      </button>
    </div>

    {error&&<div className="alert" style={{marginTop:0}}>{error}</div>}

    {result&&<div className="feed-result">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"var(--amber-l)"}}>AI READING RESULT</div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <span className={`b ${result.confidence==="high"?"bg":result.confidence==="medium"?"ba":"br"}`}>Confidence: {result.confidence}</span>
          <span className={`b ${result.transactionType==="income"?"bg":"br"}`}>{result.transactionType?.toUpperCase()}</span>
        </div>
      </div>
      <div className="fg" style={{marginBottom:16}}>
        {[
          ["Document Type",result.docType],
          ["Date",result.date],
          ["Vendor / Party",result.vendor],
          ["Category",result.category],
        ].map(([l,v])=><div key={l} style={{background:"var(--bg-card)",border:"1px solid var(--border)",borderRadius:8,padding:"10px 12px"}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)",marginBottom:4}}>{l}</div>
          <div style={{fontSize:13,fontWeight:600}}>{v||"—"}</div>
        </div>)}
        <div style={{background:"var(--bg-card)",border:"1px solid var(--border-hi)",borderRadius:8,padding:"10px 12px",gridColumn:"1/-1"}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)",marginBottom:4}}>Description</div>
          <div style={{fontSize:14,fontWeight:600}}>{result.description}</div>
        </div>
      </div>
      {result.lineItems?.length>0&&<div style={{marginBottom:14}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)",marginBottom:8}}>Line Items</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr>{["Description","Qty","Unit Price","Total"].map(h=><th key={h} style={{padding:"6px 10px",textAlign:"left",background:"var(--bg-surface)",fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--text3)"}}>{h}</th>)}</tr></thead>
          <tbody>{result.lineItems.map((li,i)=><tr key={i} style={{borderBottom:"1px solid var(--border)"}}>
            <td style={{padding:"6px 10px"}}>{li.description}</td>
            <td style={{padding:"6px 10px"}}>{li.qty}</td>
            <td style={{padding:"6px 10px"}}>N${fmt(li.unitPrice)}</td>
            <td style={{padding:"6px 10px",fontWeight:700,color:"var(--amber-l)"}}>N${fmt(li.total)}</td>
          </tr>)}</tbody>
        </table>
      </div>}
      <div className="cost-row" style={{borderBottom:"none"}}>
        <span style={{fontWeight:700,fontSize:15}}>TOTAL AMOUNT</span>
        <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:result.transactionType==="income"?"var(--green)":"var(--red)"}}>N${fmt(result.amount)}</span>
      </div>
      {result.notes&&<div style={{fontSize:12,color:"var(--text2)",marginTop:8,padding:"8px 12px",background:"var(--bg-surface)",borderRadius:6}}>📝 {result.notes}</div>}
      <div className="ma" style={{marginTop:16}}>
        <button className="btn btg" onClick={()=>{sr(null);si(null);}}>Discard</button>
        <button className="btn btp" onClick={confirm}>✅ Add to Bookkeeping</button>
      </div>
    </div>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AI AUCTION SCANNER  (reads auction sheet → auto-adds animals)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AuctionScanner({animals,setAnimals,transactions,setTransactions,t}){
  const [loading,sl]=useState(false);
  const [result,sr]=useState(null);
  const [farm,sf]=useState("Farm 1");
  const [imgData,si]=useState(null);
  const [imgType,sit]=useState("");
  const [error,se]=useState("");
  const [done,sd]=useState(false);

  const handleFile=e=>{
    const file=e.target.files[0]; if(!file)return;
    se(""); sr(null); sd(false);
    const reader=new FileReader();
    reader.onload=ev=>{si(ev.target.result.split(",")[1]);sit(file.type||"image/jpeg");};
    reader.readAsDataURL(file);
  };

  const analyse=async()=>{
    if(!imgData){se("Please upload the auction document first.");return;}
    sl(true); se(""); sr(null);
    try{
      const isImg=imgType.startsWith("image/");
      const content=isImg?[
        {type:"image",source:{type:"base64",media_type:imgType,data:imgData}},
        {type:"text",text:`Farm: ${farm}. Read this Namibian livestock auction document.`}
      ]:[
        {type:"document",source:{type:"base64",media_type:"application/pdf",data:imgData}},
        {type:"text",text:`Farm: ${farm}. Read this Namibian livestock auction document.`}
      ];

      const sys=`You are a Namibian livestock auction document reader. Extract all bought and sold animal records.
Return ONLY valid JSON, no markdown:
{
  "auctionHouse": "name",
  "auctionDate": "YYYY-MM-DD",
  "buyer": "name",
  "totalPaid": 0,
  "totalReceived": 0,
  "bought": [
    {"type":"cattle|sheep|goats|pigs","category":"tollies|heifers|cows|bulls|lambs|ewes|etc","count":1,"breed":"Brahman","avgWeight":300,"pricePerHead":7500,"totalPrice":7500,"notes":""}
  ],
  "sold": [
    {"type":"cattle","category":"cows","count":1,"breed":"Simmental","avgWeight":450,"pricePerHead":12000,"totalPrice":12000,"notes":""}
  ]
}
If unsure, make best guess from context. Count must be a number.`;

      const raw=await callClaude([{role:"user",content}],sys);
      const clean=raw.replace(/```json|```/g,"").trim();
      sr(JSON.parse(clean));
    } catch(err){se("Could not read auction document. Please try a clearer image.");}
    sl(false);
  };

  const confirm=()=>{
    if(!result) return;
    const today=new Date().toISOString().split("T")[0];
    const date=result.auctionDate||today;
    const newAnimals=[];

    // Add bought animals
    (result.bought||[]).forEach(lot=>{
      const count=Number(lot.count)||1;
      const prefix={cattle:"C",sheep:"S",goats:"G",pigs:"P"}[lot.type]||"A";
      const existing=animals.filter(a=>a.type===lot.type).length+newAnimals.filter(a=>a.type===lot.type).length;
      for(let i=0;i<count;i++){
        const num=String(existing+i+1).padStart(3,"0");
        newAnimals.push({
          id:Date.now()+Math.random(),
          type:lot.type,
          tag:`${prefix}-${num}`,
          breed:lot.breed||"Unknown",
          gender:["heifers","cows","ewes","does","sows"].includes((lot.category||"").toLowerCase())?"Female":"Male",
          dob:"", weight:Number(lot.avgWeight)||0,
          status:"Active",
          notes:`${lot.category} — Auction ${result.auctionHouse||""} ${date}`,
          farm, purchasePrice:lot.pricePerHead, purchaseDate:date,
        });
      }
      if(lot.totalPrice>0){
        setTransactions(p=>[{
          id:Date.now()+Math.random(),
          date, description:`Auction purchase: ${lot.count} ${lot.category} (${lot.breed||lot.type}) — ${result.auctionHouse||"Auction"}`,
          category:"Livestock Purchase", type:"expense",
          amount:Number(lot.totalPrice), farm, doc:"Auction sheet scan",
        },...p]);
      }
    });

    // Mark sold animals and record income
    (result.sold||[]).forEach(lot=>{
      if(lot.totalPrice>0){
        setTransactions(p=>[{
          id:Date.now()+Math.random(),
          date, description:`Auction sale: ${lot.count} ${lot.category} (${lot.breed||lot.type}) — ${result.auctionHouse||"Auction"}`,
          category:"Livestock Sales", type:"income",
          amount:Number(lot.totalPrice), farm, doc:"Auction sheet scan",
        },...p]);
      }
    });

    if(newAnimals.length>0) setAnimals(p=>[...p,...newAnimals]);
    sd(true);
  };

  return <div>
    <div className="alert alert-info">🤖 Upload a scanned auction document — AI reads what was bought and sold and updates your livestock and bookkeeping automatically.</div>

    <div className="feed-panel">
      <div className="feed-title">Auction Document Scanner</div>
      <div className="fg" style={{marginBottom:16}}>
        <F l="Assign to Farm" c={<input className="fi" value={farm} onChange={e=>sf(e.target.value)}/>}/>
        <F l="Upload Auction Sheet (PDF or Image)" full c={
          <div>
            <input type="file" accept="image/*,application/pdf" onChange={handleFile} style={{display:"block",background:"var(--bg-surface)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 12px",color:"var(--text)",width:"100%",fontFamily:"'Syne',sans-serif",fontSize:13,cursor:"pointer"}}/>
            {imgData&&<div style={{marginTop:8,fontSize:12,color:"var(--green)"}}>✓ Document loaded</div>}
          </div>
        }/>
      </div>
      <button className="btn btp" onClick={analyse} disabled={loading||!imgData} style={{width:"100%",justifyContent:"center",padding:12,opacity:(!imgData||loading)?0.5:1}}>
        {loading?"🔍 Reading auction sheet...":"🤖 Read Auction Document"}
      </button>
    </div>

    {error&&<div className="alert">{error}</div>}

    {done&&<div className="alert alert-green">✅ Auction records imported successfully! Livestock and bookkeeping have been updated.</div>}

    {result&&!done&&<div className="feed-result">
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:2,color:"var(--amber-l)",marginBottom:4}}>AUCTION READING RESULT</div>
      <div style={{fontSize:12,color:"var(--text2)",marginBottom:16}}>{result.auctionHouse} — {result.auctionDate} — Buyer: {result.buyer}</div>

      {result.bought?.length>0&&<div style={{marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--green)",marginBottom:8}}>🐄 BOUGHT ({result.bought.reduce((s,l)=>s+Number(l.count||0),0)} animals)</div>
        {result.bought.map((lot,i)=><div key={i} style={{background:"rgba(45,189,110,0.06)",border:"1px solid rgba(45,189,110,0.2)",borderRadius:8,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><span style={{fontWeight:700}}>{lot.count}× {lot.category}</span><span style={{color:"var(--text2)",marginLeft:8,fontSize:12}}>{lot.breed}</span></div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--green)"}}>N${fmt(lot.totalPrice)}</div>
          </div>
          <div style={{fontSize:11,color:"var(--text3)",marginTop:4}}>N${fmt(lot.pricePerHead)}/head • {lot.avgWeight}kg avg • → {farm}</div>
        </div>)}
      </div>}

      {result.sold?.length>0&&<div style={{marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"var(--amber-l)",marginBottom:8}}>💰 SOLD ({result.sold.reduce((s,l)=>s+Number(l.count||0),0)} animals)</div>
        {result.sold.map((lot,i)=><div key={i} style={{background:"rgba(212,140,42,0.06)",border:"1px solid rgba(212,140,42,0.2)",borderRadius:8,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><span style={{fontWeight:700}}>{lot.count}× {lot.category}</span><span style={{color:"var(--text2)",marginLeft:8,fontSize:12}}>{lot.breed}</span></div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--amber-l)"}}>N${fmt(lot.totalPrice)}</div>
          </div>
          <div style={{fontSize:11,color:"var(--text3)",marginTop:4}}>N${fmt(lot.pricePerHead)}/head • {lot.avgWeight}kg avg</div>
        </div>)}
      </div>}

      <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderTop:"1px solid var(--border)",marginTop:4}}>
        <div style={{fontSize:13}}><span style={{color:"var(--text3)"}}>Total Paid: </span><span style={{fontWeight:700,color:"var(--red)"}}>N${fmt(result.totalPaid)}</span></div>
        <div style={{fontSize:13}}><span style={{color:"var(--text3)"}}>Total Received: </span><span style={{fontWeight:700,color:"var(--green)"}}>N${fmt(result.totalReceived)}</span></div>
      </div>

      <div className="ma">
        <button className="btn btg" onClick={()=>{sr(null);si(null);}}>Discard</button>
        <button className="btn btp" onClick={confirm}>✅ Import to FarmLogic</button>
      </div>
    </div>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WORKERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Workers({workers,setWorkers,t}){
  const [q,sq]=useState(""); const [modal,sm]=useState(null); const [form,sf]=useState({});
  const rows=workers.filter(w=>(w.name+w.position+w.farm).toLowerCase().includes(q.toLowerCase()));
  const save=()=>{
    if(modal==="add")setWorkers(p=>[...p,{...form,id:Date.now(),salary:Number(form.salary)}]);
    else setWorkers(p=>p.map(w=>w.id===form.id?{...form,salary:Number(form.salary)}:w));
    sm(null);
  };
  return <div>
    <div className="tw">
      <div className="tb"><input className="si" placeholder={t.search} value={q} onChange={e=>sq(e.target.value)}/>
        <button className="btn btp" onClick={()=>{sf({name:"",idNumber:"",position:"",startDate:"",salary:"",phone:"",farm:"Farm 1"});sm("add")}}>+ {t.addWorker}</button>
      </div>
      {rows.length===0?<div className="nr">{t.noRecords}</div>:<table>
        <thead><tr><th>{t.workerName}</th><th>{t.idNumber}</th><th>{t.position}</th><th>{t.farm}</th><th>{t.basicSalary}</th><th>{t.phone}</th><th>{t.startDate}</th><th></th></tr></thead>
        <tbody>{rows.map(w=><tr key={w.id}>
          <td style={{fontWeight:600}}>{w.name}</td><td><span className="mono">{w.idNumber}</span></td><td>{w.position}</td><td>{w.farm}</td>
          <td style={{color:"var(--amber-l)",fontWeight:700}}>N${fmt(w.salary)}</td><td>{w.phone}</td><td>{w.startDate}</td>
          <td><div style={{display:"flex",gap:5}}>
            <button className="btn btg sm" onClick={()=>{sf({...w,salary:String(w.salary)});sm("edit")}}>{t.edit}</button>
            <button className="btn btd sm" onClick={()=>{if(window.confirm(t.confirmDelete))setWorkers(p=>p.filter(x=>x.id!==w.id))}}>{t.delete}</button>
          </div></td>
        </tr>)}</tbody>
      </table>}
    </div>
    {modal&&<Modal title={modal==="add"?`+ ${t.addWorker}`:t.edit} onClose={()=>sm(null)}>
      <div className="fg">
        {[["name",t.workerName,"text"],["idNumber",t.idNumber,"text"],["position",t.position,"text"],["startDate",t.startDate,"date"],["salary",t.basicSalary,"number"],["phone",t.phone,"tel"],["farm",t.farm,"text"]].map(([k,l,tp])=><F key={k} l={l} c={<input className="fi" type={tp} value={form[k]||""} onChange={e=>sf(p=>({...p,[k]:e.target.value}))}/>}/>)}
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(null)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  TAX & SALARIES (Namibia-compliant)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function TaxPayroll({workers,t}){
  const [slip,ss]=useState(null);
  const [showReport,sr]=useState(false);
  const month=new Date().toLocaleString("default",{month:"long",year:"numeric"});
  const brackets=[
    {range:"N$0 – N$50,000",rate:"0%",fixed:"N$0"},
    {range:"N$50,001 – N$100,000",rate:"18%",fixed:"N$0"},
    {range:"N$100,001 – N$300,000",rate:"25%",fixed:"N$9,000"},
    {range:"N$300,001 – N$500,000",rate:"30%",fixed:"N$59,000"},
    {range:"N$500,001 – N$800,000",rate:"32%",fixed:"N$119,000"},
    {range:"N$800,001 – N$1,500,000",rate:"34%",fixed:"N$215,000"},
    {range:"Above N$1,500,000",rate:"37%",fixed:"N$453,000"},
  ];
  const totalPayroll=workers.reduce((s,w)=>s+w.salary,0);
  const totalSSCEmployer=workers.reduce((s,w)=>s+calcSSCEmployer(w.salary),0);
  return <div>
    <div className="dg" style={{marginBottom:20}}>
      <div className="card">
        <div className="ctitle">NamRA Tax Brackets 2024/25</div>
        <div style={{marginBottom:8}}><span className="b ba">Official NamRA Rates</span></div>
        {brackets.map((b,i)=><div key={i} className="bracket-row">
          <span style={{fontSize:12,color:"var(--text2)"}}>{b.range}</span>
          <span style={{fontWeight:700,color:"var(--amber-l)"}}>{b.rate}</span>
        </div>)}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div className="card">
          <div className="ctitle">SSC Rates (2024/25)</div>
          <div className="bracket-row"><span style={{color:"var(--text2)"}}>Employee contribution</span><b style={{color:"var(--green)"}}>0.9%</b></div>
          <div className="bracket-row"><span style={{color:"var(--text2)"}}>Employer contribution</span><b style={{color:"var(--amber-l)"}}>1.8%</b></div>
          <div className="bracket-row"><span style={{color:"var(--text2)"}}>Max insurable salary</span><b>N$9,000/mo</b></div>
          <div className="bracket-row"><span style={{color:"var(--text2)"}}>VAT Rate</span><b>15%</b></div>
        </div>
        <div className="card">
          <div className="ctitle">Monthly Payroll Summary</div>
          <div className="bracket-row"><span style={{color:"var(--text2)"}}>Total Gross Payroll</span><b style={{color:"var(--amber-l)"}}>N${fmt(totalPayroll)}</b></div>
          <div className="bracket-row"><span style={{color:"var(--text2)"}}>Total SSC (Employer)</span><b style={{color:"var(--red)"}}>N${fmt(totalSSCEmployer)}</b></div>
          <div className="bracket-row"><span style={{color:"var(--text2)"}}>Total Cost to Company</span><b style={{color:"var(--green)"}}>N${fmt(totalPayroll+totalSSCEmployer)}</b></div>
        </div>
      </div>
    </div>
    <div className="tw">
      <div className="tb"><span style={{fontSize:11,color:"var(--text3)",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{t.taxYear} — {month}</span>
        <button className="btn btb sm" onClick={()=>sr(true)}>📄 Annual Report</button>
      </div>
      <table>
        <thead><tr><th>{t.workerName}</th><th>{t.farm}</th><th>{t.grossPay}</th><th>SSC Emp</th><th>SSC Emplyr</th><th>{t.paye}</th><th>{t.netPay}</th><th>{t.totalCTC}</th><th></th></tr></thead>
        <tbody>{workers.map(w=>{
          const ann=w.salary*12;
          const annTax=calcNamibiaTax(ann);
          const monthlyTax=Math.round(annTax/12);
          const sscEmp=calcSSC(w.salary);
          const sscEr=calcSSCEmployer(w.salary);
          const net=w.salary-sscEmp-monthlyTax;
          const ctc=w.salary+sscEr;
          return <tr key={w.id}>
            <td style={{fontWeight:600}}>{w.name}</td><td>{w.farm}</td>
            <td>N${fmt(w.salary)}</td>
            <td style={{color:"var(--red)"}}>-N${fmt(sscEmp)}</td>
            <td style={{color:"var(--orange)"}}>N${fmt(sscEr)}</td>
            <td style={{color:"var(--red)"}}>-N${fmt(monthlyTax)}</td>
            <td style={{color:"var(--green)",fontWeight:700}}>N${fmt(net)}</td>
            <td style={{color:"var(--amber-l)",fontWeight:700}}>N${fmt(ctc)}</td>
            <td><button className="btn btp sm" onClick={()=>ss(w)}>📄</button></td>
          </tr>;
        })}</tbody>
      </table>
    </div>
    {slip&&(()=>{
      const w=slip;
      const ann=w.salary*12; const annTax=calcNamibiaTax(ann); const mt=Math.round(annTax/12);
      const sscEmp=calcSSC(w.salary); const sscEr=calcSSCEmployer(w.salary);
      const net=w.salary-sscEmp-mt; const ctc=w.salary+sscEr;
      const effRate=ann>0?((annTax/ann)*100).toFixed(1):0;
      return <Modal title={t.payslip} onClose={()=>ss(null)}>
        <div className="ps">
          <div className="psh">
            <div><div className="pslogo">FarmLogic</div><div style={{fontSize:11,color:"#777",marginTop:2}}>{t.payslip} — {month}</div><div style={{fontSize:10,color:"#999",marginTop:2}}>NamRA Compliant 2024/25</div></div>
            <div style={{textAlign:"right",fontSize:12,color:"#555"}}><div style={{fontWeight:700}}>{w.name}</div><div>{w.position}</div><div>{w.farm}</div><div style={{color:"#999",fontSize:10}}>{w.idNumber}</div></div>
          </div>
          <div className="psr"><span>Basic Salary</span><span>N${fmt(w.salary)}</span></div>
          <div className="psr" style={{color:"#c00"}}><span>SSC Employee (0.9%)</span><span>-N${fmt(sscEmp)}</span></div>
          <div className="psr" style={{color:"#c00"}}><span>PAYE (NamRA 2024/25)</span><span>-N${fmt(mt)}</span></div>
          <div style={{height:1,background:"#ddd",margin:"10px 0"}}/>
          <div className="pst"><span>NET PAY</span><span style={{color:"#2dbd6e"}}>N${fmt(net)}</span></div>
          <div style={{marginTop:14,paddingTop:14,borderTop:"1px dashed #ddd"}}>
            <div style={{fontSize:10,color:"#999",marginBottom:6,fontWeight:700,letterSpacing:1}}>EMPLOYER COSTS</div>
            <div className="psr" style={{color:"#888"}}><span>SSC Employer (1.8%)</span><span>N${fmt(sscEr)}</span></div>
            <div className="psr" style={{fontWeight:700}}><span>Total Cost to Company</span><span>N${fmt(ctc)}</span></div>
            <div className="psr" style={{color:"#888"}}><span>Effective Tax Rate</span><span>{effRate}%</span></div>
          </div>
          <div style={{fontSize:9,color:"#bbb",marginTop:14,textAlign:"center"}}>Generated by FarmLogic • {new Date().toLocaleDateString()} • NamRA Tax Year 2024/25</div>
        </div>
        <div className="ma"><button className="btn btg" onClick={()=>ss(null)}>{t.close}</button></div>
      </Modal>;
    })()}
    {showReport&&<Modal title="Annual Tax Report 2024/25" onClose={()=>sr(false)} wide>
      <div className="ps">
        <div className="psh"><div><div className="pslogo">FarmLogic</div><div style={{fontSize:11,color:"#777"}}>Annual Tax Summary — 2024/25</div></div><div style={{textAlign:"right",fontSize:11,color:"#555"}}>Generated: {new Date().toLocaleDateString()}</div></div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{background:"#f5f5f5"}}>{["Employee","Farm","Annual Salary","Annual PAYE","SSC (Emp)","SSC (Emplyr)","Net Annual","Eff. Rate"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",fontWeight:700,fontSize:10,letterSpacing:1}}>{h}</th>)}</tr></thead>
          <tbody>{workers.map(w=>{
            const ann=w.salary*12; const annTax=calcNamibiaTax(ann);
            const sscEmp=calcSSC(w.salary)*12; const sscEr=calcSSCEmployer(w.salary)*12;
            const netAnn=(w.salary*12)-sscEmp-annTax;
            const eff=ann>0?((annTax/ann)*100).toFixed(1):0;
            return <tr key={w.id} style={{borderBottom:"1px solid #eee"}}>
              <td style={{padding:"7px 10px",fontWeight:600}}>{w.name}</td>
              <td style={{padding:"7px 10px"}}>{w.farm}</td>
              <td style={{padding:"7px 10px"}}>N${fmt(ann)}</td>
              <td style={{padding:"7px 10px",color:"#c00"}}>N${fmt(annTax)}</td>
              <td style={{padding:"7px 10px",color:"#c00"}}>N${fmt(sscEmp)}</td>
              <td style={{padding:"7px 10px",color:"#d4812a"}}>N${fmt(sscEr)}</td>
              <td style={{padding:"7px 10px",color:"#2dbd6e",fontWeight:700}}>N${fmt(netAnn)}</td>
              <td style={{padding:"7px 10px"}}>{eff}%</td>
            </tr>;
          })}</tbody>
        </table>
        <div style={{marginTop:16,padding:"10px 0",borderTop:"2px solid #333",display:"flex",justifyContent:"space-between",fontWeight:800}}>
          <span>Total Annual Payroll Cost</span>
          <span>N${fmt(workers.reduce((s,w)=>s+(w.salary*12)+calcSSCEmployer(w.salary)*12,0))}</span>
        </div>
        <div style={{fontSize:9,color:"#bbb",marginTop:12,textAlign:"center"}}>FarmLogic — NamRA Compliant • Social Security Commission • Tax Year 2024/25</div>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sr(false)}>{t.close}</button></div>
    </Modal>}
  </div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LEAVE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Leave({leave,setLeave,workers,t}){
  const [modal,sm]=useState(false); const [form,sf]=useState({workerId:"",type:"Annual",from:"",to:""});
  const save=()=>{
    const w=workers.find(w=>w.id===Number(form.workerId));if(!w)return;
    const days=Math.round((new Date(form.to)-new Date(form.from))/86400000)+1;
    setLeave(p=>[...p,{...form,id:Date.now(),workerName:w.name,days,status:"Pending"}]);sm(false);
  };
  const upd=(id,s)=>setLeave(p=>p.map(l=>l.id===id?{...l,status:s}:l));
  return <div>
    <div className="tw">
      <div className="tb"><button className="btn btp" onClick={()=>sm(true)}>+ {t.applyLeave}</button></div>
      {leave.length===0?<div className="nr">{t.noRecords}</div>:<table>
        <thead><tr><th>{t.workerName}</th><th>{t.leaveType}</th><th>{t.leaveStart}</th><th>{t.leaveEnd}</th><th>Days</th><th>{t.leaveStatus}</th><th></th></tr></thead>
        <tbody>{leave.map(l=><tr key={l.id}>
          <td style={{fontWeight:600}}>{l.workerName}</td><td>{l.type}</td><td>{l.from}</td><td>{l.to}</td><td>{l.days}</td><td><Badge s={l.status}/></td>
          <td>{l.status==="Pending"&&<div style={{display:"flex",gap:5}}>
            <button className="btn bte sm" onClick={()=>upd(l.id,"Approved")}>✓</button>
            <button className="btn btd sm" onClick={()=>upd(l.id,"Rejected")}>✗</button>
          </div>}</td>
        </tr>)}</tbody>
      </table>}
    </div>
    {modal&&<Modal title={`+ ${t.applyLeave}`} onClose={()=>sm(false)}>
      <div className="fg">
        <F l={t.workerName} full c={<select className="fsel" value={form.workerId} onChange={e=>sf(p=>({...p,workerId:e.target.value}))}><option value="">— Select Worker —</option>{workers.map(w=><option key={w.id} value={w.id}>{w.name}</option>)}</select>}/>
        <F l={t.leaveType} c={<select className="fsel" value={form.type} onChange={e=>sf(p=>({...p,type:e.target.value}))}><option>Annual</option><option>Sick</option><option>Family</option></select>}/>
        <F l={t.leaveStart} c={<input className="fi" type="date" value={form.from} onChange={e=>sf(p=>({...p,from:e.target.value}))}/>}/>
        <F l={t.leaveEnd} c={<input className="fi" type="date" value={form.to} onChange={e=>sf(p=>({...p,to:e.target.value}))}/>}/>
      </div>
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
  const cats=["Livestock Sales","Feed & Supplements","Fuel","Veterinary","Labour","Equipment","Other"];
  const rows=filter==="all"?transactions:transactions.filter(x=>x.type===filter);
  const income=transactions.filter(x=>x.type==="income").reduce((s,x)=>s+x.amount,0);
  const exp=transactions.filter(x=>x.type==="expense").reduce((s,x)=>s+x.amount,0);
  const save=()=>{setTransactions(p=>[{...form,id:Date.now(),amount:Number(form.amount)},...p]);sm(false);};
  return <div>
    <div className="smbar">
      <div className="smcard"><div className="smlabel">{t.totalIncome}</div><div className="smval" style={{color:"var(--green)"}}>N${fmt(income)}</div></div>
      <div className="smcard"><div className="smlabel">{t.totalExpenses}</div><div className="smval" style={{color:"var(--red)"}}>N${fmt(exp)}</div></div>
      <div className="smcard"><div className="smlabel">{t.netProfit||"Net Profit"}</div><div className="smval" style={{color:(income-exp)>=0?"var(--green)":"var(--red)"}}>N${fmt(income-exp)}</div></div>
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
          <td style={{fontWeight:700,color:tx.type==="income"?"var(--green)":"var(--red)"}}>{tx.type==="expense"?"-":"+"}N${fmt(tx.amount)}</td>
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
        <F l="Receipt / Invoice Name (optional)" full c={<input className="fi" placeholder="e.g. invoice_jan2025.pdf" value={form.doc} onChange={e=>ff(p=>({...p,doc:e.target.value}))}/>}/>
      </div>
      <div className="ma"><button className="btn btg" onClick={()=>sm(false)}>{t.cancel}</button><button className="btn btp" onClick={save}>{t.save}</button></div>
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
    {overdue.length>0&&<div className="alert">⚠️ {overdue.length} animal(s) overdue for treatment — {overdue.map(v=>v.animal).join(", ")}</div>}
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
        <div className="cm">
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
      <div className="cost-row"><span className="cost-label">Cost Per Animal / Day</span><span className="cost-val" style={{fontSize:18}}>N${(result.perHead).toFixed(2)}</span></div>
      <div className="cost-row"><span className="cost-label">Daily Feed Cost ({result.heads} animals)</span><span className="cost-val" style={{fontSize:22}}>N${result.dailyCost.toFixed(2)}</span></div>
      <div className="cost-row" style={{borderBottom:"none"}}><span className="cost-label" style={{fontWeight:700,fontSize:14}}>Monthly Feed Cost</span><span className="cost-val" style={{fontSize:30}}>N${fmt(Math.round(result.monthlyCost))}</span></div>
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
      <div className="card"><div className="ctitle">Total Slaughter Revenue</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:"var(--green)"}}>N${fmt(Math.round(totalRevenue))}</div></div>
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
          <td>N${s.pricePerKg}</td>
          <td style={{color:"var(--green)",fontWeight:700}}>N${fmt(Math.round(s.totalValue))}</td>
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
        📊 Auto-calculated dressing: {((Number(form.carcassWeight)/Number(form.liveWeight))*100).toFixed(1)}% — Total value: N${fmt(Math.round(Number(form.carcassWeight)*Number(form.pricePerKg)))}
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
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"var(--text3)"}}>Income</span><span style={{color:"var(--green)",fontWeight:700}}>N${fmt(f.income)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"var(--text3)"}}>Expenses</span><span style={{color:"var(--red)"}}>N${fmt(f.expenses)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"var(--text3)"}}>Labour</span><span style={{color:"var(--orange)"}}>N${fmt(f.labour)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid var(--border)",paddingTop:6,marginTop:2}}><span style={{fontWeight:700}}>Net Profit</span><span style={{fontWeight:700,color:f.profit>=0?"var(--green)":"var(--red)"}}>N${fmt(f.profit)}</span></div>
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
              <div className="roi-bar-val" style={{color:c}}>N${fmt(v)}</div>
              <div className="roi-bar-lbl">{l}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:13}}><span style={{color:"var(--text3)"}}>Total Cost: </span><span style={{fontWeight:700}}>N${fmt(totalCost)}</span></div>
          <div style={{fontSize:13}}><span style={{color:"var(--text3)"}}>Profit: </span><span style={{fontWeight:700,color:profit>=0?"var(--green)":"var(--red)"}}>N${fmt(profit)}</span></div>
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
//  APP ROOT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function App(){
  const [lang,sl]=useLS("fl_lang","en");
  const [auth,sa]=useLS("fl_auth",false);
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
        <div className="sf"><div className="ni" style={{color:"var(--red)"}} onClick={()=>sa(false)}><span className="nicon">⏻</span>{t.logout}</div></div>
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
              <div className="ava">A</div>
              <div style={{fontSize:12,fontWeight:700}}>Admin</div>
            </div>
          </div>
        </header>
        <div className="content">
          {page==="dashboard"  &&<Dashboard animals={animals} workers={workers} leave={leave} transactions={transactions} inventory={inventory} vetlog={vetlog} t={t}/>}
          {page==="livestock"  &&<Livestock animals={animals} setAnimals={setAnimals} transactions={transactions} setTransactions={setTx} herdEvents={herdEvents} setHerdEvents={setHerdEvents} t={t}/>}
          {page==="workers"    &&<Workers workers={workers} setWorkers={setWorkers} t={t}/>}
          {page==="leave"      &&<Leave leave={leave} setLeave={setLeave} workers={workers} t={t}/>}
          {page==="bookkeeping"&&<Bookkeeping transactions={transactions} setTransactions={setTx} t={t}/>}
          {page==="docreader"  &&<DocReader transactions={transactions} setTransactions={setTx} t={t}/>}
          {page==="tax"        &&<TaxPayroll workers={workers} t={t}/>}
          {page==="roi"        &&<ROI roiData={roiData} setRoiData={setRoi} workers={workers} transactions={transactions} t={t}/>}
          {page==="feed"       &&<FeedCalc t={t}/>}
          {page==="auction"    &&<AuctionScanner animals={animals} setAnimals={setAnimals} transactions={transactions} setTransactions={setTx} t={t}/>}
          {page==="inventory"  &&<Inventory inventory={inventory} setInventory={setInv} t={t}/>}
          {page==="vetlog"     &&<VetLog vetlog={vetlog} setVetlog={setVet} t={t}/>}
          {page==="grazing"    &&<Grazing camps={camps} setCamps={setCamps} t={t}/>}
          {page==="slaughter"  &&<Slaughter slaughter={slaughter} setSlaughter={setSlaughter} t={t}/>}
          {page==="implements" &&<Implements implements_={implements_} setImplements={setImplements} t={t}/>}
        </div>
      </div>
    </div>
  </>;
}
