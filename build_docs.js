const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  HeadingLevel, AlignmentType, LevelFormat, BorderStyle,
  Header, Footer, PageNumber, TabStopType, TabStopPosition,
} = require("docx");

const PAGE = {
  size: { width: 12240, height: 15840 },
  margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
};

const styles = {
  default: { document: { run: { font: "Arial", size: 22 } } },
  paragraphStyles: [
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 32, bold: true, font: "Arial", color: "1F4E5F" },
      paragraph: { spacing: { before: 100, after: 240 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 26, bold: true, font: "Arial", color: "2E75B6" },
      paragraph: { spacing: { before: 320, after: 140 }, outlineLevel: 1,
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "2E75B6", space: 2 } } } },
  ],
};

function title(text, subtitleLines) {
  const children = [
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] }),
  ];
  subtitleLines.forEach(line => {
    children.push(new Paragraph({
      children: [new TextRun({ text: line, italics: true, size: 20, color: "555555" })],
      spacing: { after: 80 },
    }));
  });
  children.push(new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "1F4E5F", space: 4 } },
    spacing: { after: 240 },
    children: [new TextRun("")],
  }));
  return children;
}

function sectionHeading(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text, ...opts })],
  });
}

function linkLine(label, url) {
  return new Paragraph({
    spacing: { after: 60 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: label + " ", bold: true, size: 20 }),
      new ExternalHyperlink({
        children: [new TextRun({ text: url, style: "Hyperlink", size: 20 })],
        link: url,
      }),
    ],
  });
}

function bookEntry(name, code, lang, buyUrl, readUrl) {
  return [
    new Paragraph({
      spacing: { before: 160, after: 40 },
      children: [
        new TextRun({ text: "• ", bold: true }),
        new TextRun({ text: name, bold: true }),
        new TextRun({ text: `  [${code}] (${lang})`, italics: true, color: "555555" }),
      ],
    }),
    linkLine("Buy:", buyUrl),
    linkLine("Read Online:", readUrl),
  ];
}

function note(text) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    indent: { left: 360 },
    children: [new TextRun({ text, italics: true, color: "9C5700" })],
  });
}

function footer() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "AWGP Bengaluru Website — Content Reference   |   Page ", size: 18, color: "888888" }),
        new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888" }),
      ],
    })],
  });
}

// ---------------------------------------------------------------------
// DOCUMENT 1: BOOKS
// ---------------------------------------------------------------------
const booksChildren = [];
booksChildren.push(...title(
  "AWGP Book Links — Curated for Website Topics",
  [
    "Only books matching the AWGP Bengaluru site's actual pages (Sanskars, Sadhana, Yoga,",
    "Sanyam / Seva / Swadhyaya, Yagya, Bal Sanskar Shala). Top 3 most relevant per topic,",
    "English / Hindi preferred. Generated 2026-06-18.",
  ]
));

booksChildren.push(bodyText("Link format:", { bold: true }));
booksChildren.push(linkLine("Buy:", "https://www.awgpstore.com/product?id=<CODE>"));
booksChildren.push(new Paragraph({
  indent: { left: 360 },
  spacing: { after: 200 },
  children: [new TextRun({ text: "(reliable pattern)", italics: true, size: 18, color: "888888" })],
}));
booksChildren.push(linkLine("Read Online:", "https://www.awgp.org/en/literature/book/<Name_With_Underscores>/v1"));
booksChildren.push(new Paragraph({
  indent: { left: 360 },
  spacing: { after: 200 },
  children: [new TextRun({ text: "(best-effort slug guess — only 1 example confirmed; spot-check before use)", italics: true, size: 18, color: "888888" })],
}));

const bookTopics = [
  { title: "Sanskar: Punsavan (Pregnancy)", books: [
    ["Punsavan Sanskar Vivechan", "YS12", "Hindi", "YS12", "Punsavan_Sanskar_Vivechan"],
    ["Telagu Punsavan Sansakar Vivechan", "TL0301", "Telugu", "TL0301", "Telagu_Punsavan_Sansakar_Vivechan"],
  ]},
  { title: "Sanskar: Naamkaran (Naming)", books: [
    ["Namkaran Sanskar Vivechan", "YS13", "Hindi", "YS13", "Namkaran_Sanskar_Vivechan"],
  ]},
  { title: "Sanskar: Annaprashan (First Feeding)", books: [
    ["Anna Prashan Sanskar Vivechan", "YS14", "Hindi", "YS14", "Anna_Prashan_Sanskar_Vivechan"],
  ]},
  { title: "Sanskar: Mundan (Tonsure)", books: [
    ["Chuda Karm Sanskar Vivechan", "YS15", "Hindi", "YS15", "Chuda_Karm_Sanskar_Vivechan"],
    ["Telugu Chudakarm Vivechan", "TL302", "Telugu", "TL302", "Telugu_Chudakarm_Vivechan"],
  ]},
  { title: "Sanskar: Vidyarambh (Education Initiation)", books: [
    ["Vidyarambh Sanskar Vivechan", "YS16", "Hindi", "YS16", "Vidyarambh_Sanskar_Vivechan"],
  ]},
  { title: "Sanskar: Yagyopaveet (Sacred Thread)", books: [
    ["Gayatri Aur Yagyopavit", "GT05", "Hindi", "GT05", "Gayatri_Aur_Yagyopavit"],
    ["Yagyopavit Sanskar Padhhati", "YS49", "Hindi", "YS49", "Yagyopavit_Sanskar_Padhhati"],
    ["Yagyopavit Sanskar Vivechan", "YS17", "Hindi", "YS17", "Yagyopavit_Sanskar_Vivechan"],
  ]},
  { title: "Sanskar: Deeksha (Initiation)", books: [
    ["Bachcho Ki Shiksha Hi Nahi Diksha Bhi", "PN14", "Hindi", "PN14", "Bachcho_Ki_Shiksha_Hi_Nahi_Diksha_Bhi"],
    ["Diksha Aur Uska Swaroop", "SJ58", "Hindi", "SJ58", "Diksha_Aur_Uska_Swaroop"],
    ["Tamil Bachcho Ki Shiksha Hi Nahi Diksha Bhi", "TM96", "Tamil", "TM96", "Tamil_Bachcho_Ki_Shiksha_Hi_Nahi_Diksha_Bhi"],
  ]},
  { title: "Sanskar: Janm-Divas (Birthday)", books: [
    ["Premophar", "VN23", "Hindi", "VN23", "premopahar", "v2"],
    ["Janm Divas Sanskar Padhhati", "YS50", "Hindi", "YS50", "sanskar_parampara", "v1.12"],
  ]},
  { title: "Sanskar: Vivah-Divas (Marriage / Anniversary)", books: [
    ["Married Life A Perfect Yoga", "EP86", "English", "EP86", "Married_Life_A_Perfect_Yoga"],
    ["Kya Vidhwa Vivah Shastr Viruddh Hai ?", "NJ17", "Hindi", "NJ17", "Kya_Vidhwa_Vivah_Shastr_Viruddh_Hai"],
    ["Saphal Dampatya Jivan Ke Siddhant", "PN11", "Hindi", "PN11", "Saphal_Dampatya_Jivan_Ke_Siddhant"],
  ]},
  { title: "Sanskar: Tarpan (Ancestral Offering)", books: [
    ["Jivem Shradh Shatam-41", "VS41", "Hindi", "VS41", "Jivem_Shradh_Shatam41"],
  ]},
  { title: "Sanskar: Antyesti (Funeral Rites)", books: [
    ["Antyesti Sanskar Vivechan", "YS20", "Hindi", "YS20", "Antyesti_Sanskar_Vivechan"],
    ["Marnottar Jivan Aur Sachai", "AV49", "Hindi", "AV49", "Marnottar_Jivan_Aur_Sachai"],
    ["Marnottar Jivan Tathya Satya-16", "VS16", "Hindi", "VS16", "Marnottar_Jivan_Tathya_Satya16"],
  ]},
  { title: "Program: Yoga", books: [
    ["Asan Aur Pranayam", "SA12", "Hindi", "SA12", "Asan_Aur_Pranayam"],
    ["Asan Pranayam Se Adhi Vyadhi Nivaran", "SV09", "Hindi", "SV09", "Asan_Pranayam_Se_Adhi_Vyadhi_Nivaran"],
    ["Ashan Pranayam Bandhmudra Panchkosh", "SA37", "Hindi", "SA37", "Ashan_Pranayam_Bandhmudra_Panchkosh"],
  ]},
  { title: "Program: Meditation / Dhyan", books: [
    ["Jap Tap Dhyan-The Tripple Path Of Sadhna", "EP50", "English", "EP50", "Jap_Tap_Dhyanthe_Tripple_Path_Of_Sadhna"],
    ["Brahma Varchas Ki Dhyan Dharna", "AV44", "Hindi", "AV44", "Brahma_Varchas_Ki_Dhyan_Dharna"],
    ["Khate Samay In Baton Ka Dhyan", "SV50", "Hindi", "SV50", "Khate_Samay_In_Baton_Ka_Dhyan"],
  ]},
  { title: "Sadhana — General / Gayatri Sadhana", books: [
    ["Gayatri Sadhana Truth", "EP06", "English", "EP06", "Gayatri_Sadhana_Truth"],
    ["Gayatri Sadhna Why And How ?", "EP29", "English", "EP29", "Gayatri_Sadhna_Why_And_How"],
    ["Gayatri Sadhna Aur Yagya Prakriya", "GD01", "Hindi", "GD01", "Gayatri_Sadhna_Aur_Yagya_Prakriya"],
  ]},
  { title: "Sadhana sub-program: Akhand Jap", books: [], note: "No catalog match found — needs a manually sourced book/resource." },
  { title: "Sadhana sub-program: Mataji Jap / Jap (general)", books: [
    ["Jap Tap Dhyan-The Tripple Path Of Sadhna", "EP50", "English", "EP50", "Jap_Tap_Dhyanthe_Tripple_Path_Of_Sadhna"],
    ["Upasna Ke Do Charan Jap Dhyan", "SA06", "Hindi", "SA06", "Upasna_Ke_Do_Charan_Jap_Dhyan"],
    ["Bangla Upasna Ke Do Charan Jap Aur Dhyan", "BG0036", "Bengali", "BG0036", "Bangla_Upasna_Ke_Do_Charan_Jap_Aur_Dhyan"],
  ]},
  { title: "Sadhana sub-program: Anusthan", books: [
    ["Gayatri Ki Anusthan Purascharan Sadhna", "GD16", "Hindi", "GD16", "Gayatri_Ki_Anusthan_Purascharan_Sadhna"],
    ["Vivahon Ka Vatavaran Dharm Anusthan Jaise Ho", "SN36", "Hindi", "SN36", "Vivahon_Ka_Vatavaran_Dharm_Anusthan_Jaise_Ho"],
    ["Guj. Gayatri Anusthan Purashcharan", "GJ64", "Gujarati", "GJ64", "Guj_Gayatri_Anusthan_Purashcharan"],
  ]},
  { title: "Sadhana sub-program: Antahurja / Antahkaran", books: [
    ["Antah Urja Jagaran Satra", "SA13", "Hindi", "SA13", "Antah_Urja_Jagaran_Satra"],
    ["Guj.Antah Urja Jagran", "GJ28", "Gujarati", "GJ28", "Gujantah_Urja_Jagran"],
  ]},
  { title: "Sadhana sub-program: Chandrayan Kalp", books: [
    ["Chandrayan Kalp Sadhna", "SA22", "Hindi", "SA22", "Chandrayan_Kalp_Sadhna"],
  ]},
  { title: "Sanyam (Self-Discipline)", books: [
    ["Indriya Sanyam", "GP11", "Hindi", "GP11", "Indriya_Sanyam"],
    ["Sanyam Hamari Mahtaw Purna Awasyakata", "VN75", "Hindi", "VN75", "Sanyam_Hamari_Mahtaw_Purna_Awasyakata"],
    ["Guj. Indriya Sanyam", "GJ111", "Gujarati", "GJ111", "Guj_Indriya_Sanyam"],
  ]},
  { title: "Seva (Service) / Samaj Nirman", books: [
    ["Apna Sudhar Sansar Ki Sabase Badi Seva", "VN16", "Hindi", "VN16", "Apna_Sudhar_Sansar_Ki_Sabase_Badi_Seva"],
    ["Jeevan Ka Utrardh Lokseva Me Lagaye", "SN33", "Hindi", "SN33", "Jeevan_Ka_Utrardh_Lokseva_Me_Lagaye"],
    ["Samaj Nirman Ke Kuchh Shashvat", "SN46", "Hindi", "SN46", "Samaj_Nirman_Ke_Kuchh_Shashvat"],
  ]},
  { title: "Swadhyaya (Scriptural Study)", books: [
    ["Guj. Swadhyaya Aur Satsang", "GJ122", "Gujarati", "GJ122", "Guj_Swadhyaya_Aur_Satsang"],
  ]},
  { title: "Yagya (Fire Ritual / Festivals)", books: [
    ["Deep Yagya", "EP02", "English", "EP02", "Deep_Yagya"],
    ["Gayatri Yagya Vidhi", "EP_62", "English", "EP_62", "Gayatri_Yagya_Vidhi"],
    ["Reviving Of Vedic Culture Of Yagya", "EP30", "English", "EP30", "Reviving_Of_Vedic_Culture_Of_Yagya"],
  ]},
  { title: "Bal Sanskar Shala (Children)", books: [
    ["Baccho Ke Shasak Nahi Sahayak Bane", "PN15", "Hindi", "PN15", "Baccho_Ke_Shasak_Nahi_Sahayak_Bane"],
    ["Bal Sanskar Shala Margdarshika", "SS35", "Hindi", "SS35", "Bal_Sanskar_Shala_Margdarshika"],
    ["Bal Sanskar Shalaye Is Tarah Chale", "SS07", "Hindi", "SS07", "Bal_Sanskar_Shalaye_Is_Tarah_Chale"],
  ]},
];

bookTopics.forEach(topic => {
  booksChildren.push(sectionHeading(topic.title));
  if (topic.note) {
    booksChildren.push(note(topic.note));
  }
  topic.books.forEach(b => {
    const [name, code, lang, buyCode, slug, ver] = b;
    const buyUrl = `https://www.awgpstore.com/product?id=${buyCode}`;
    const readUrl = `https://www.awgp.org/en/literature/book/${slug}/${ver || "v1"}`;
    booksChildren.push(...bookEntry(name, code, lang, buyUrl, readUrl));
  });
});

const booksDoc = new Document({
  styles,
  sections: [{
    properties: { page: PAGE },
    footers: { default: footer() },
    children: booksChildren,
  }],
});

// ---------------------------------------------------------------------
// DOCUMENT 2: YOUTUBE LINKS
// ---------------------------------------------------------------------
const ytChildren = [];
ytChildren.push(...title(
  "AWGP YouTube Links — Curated for Website Topics",
  [
    "Best matching video per topic, verified to genuinely belong to one of the 3 official",
    "AWGP YouTube channels supplied by the user (verification done via YouTube's oEmbed",
    "endpoint, which returns the true channel owner of each video — not just keyword/title",
    "matching). Generated 2026-06-18.",
  ]
));

ytChildren.push(bodyText("Official source channels (only these 3 were treated as valid):", { bold: true }));
[
  ["Shantikunjvideo Pragya Geet-AWGP", "@PragyaGeet", "devotional songs"],
  ["Shantikunjvideo Gayatri Pariwar", "@shantikunjvideo", "main official channel, 4700+ videos"],
  ["Shantikunj Rishi Chintan-AWGP", "@RishiChintan", "discourses/teachings"],
].forEach(([name, handle, desc], i) => {
  ytChildren.push(new Paragraph({
    indent: { left: 360 },
    spacing: { after: 60 },
    children: [
      new TextRun({ text: `${i + 1}. ${name}`, bold: true }),
      new TextRun({ text: `  —  ${handle}  (${desc})`, color: "555555" }),
    ],
  }));
});

ytChildren.push(bodyText("", {}));
ytChildren.push(bodyText("Link format:", { bold: true }));
ytChildren.push(linkLine("Watch:", "https://www.youtube.com/watch?v=<VIDEO_ID>"));
ytChildren.push(new Paragraph({
  indent: { left: 360 },
  spacing: { after: 200 },
  children: [new TextRun({ text: "(Channel: <verified channel name>)", italics: true, size: 18, color: "888888" })],
}));

ytChildren.push(note(
  "Note: Several videos that looked relevant in search results (matching titles like " +
  "“Bal Sanskar Shala”, “Yoga/Pranayam”, “Akhand Jap”, “Tarpan”, “Swadhyay”) turned out on " +
  "verification to belong to OTHER, unofficial/unrelated channels (e.g. Navyug Dal, Gayatridham " +
  "Sendhwa, Bal Sanskar Kendra, Sadhana Path, Padam Chand Gandhi, AWGP Youth TV, Shantikunjvideo " +
  "Regional). These were rejected. Topics with no genuine match from the 3 official channels are " +
  "explicitly flagged below — please search the channels directly or use AWGP's own website/app " +
  "(which has 4700+ categorized videos) for these."
));

function ytEntry(videoId, channel, extra) {
  const out = [linkLine("Watch:", `https://www.youtube.com/watch?v=${videoId}`)];
  out.push(new Paragraph({
    indent: { left: 360 },
    spacing: { after: extra ? 20 : 100 },
    children: [new TextRun({ text: `(Channel: ${channel})`, italics: true, size: 20, color: "555555" })],
  }));
  if (extra) {
    out.push(new Paragraph({
      indent: { left: 360 },
      spacing: { after: 100 },
      children: [new TextRun({ text: `(${extra})`, italics: true, size: 18, color: "888888" })],
    }));
  }
  return out;
}

function noMatch(text) {
  return note("NO OFFICIAL CHANNEL MATCH FOUND. " + text);
}

const ytTopics = [
  { title: "Sanskar: Punsavan (Pregnancy)", entry: ["vpX6B6q7Fkc", "@PragyaGeet"] },
  { title: "Sanskar: Naamkaran (Naming)", entry: ["_zrkUYlXrCQ", "@shantikunjvideo"] },
  { title: "Sanskar: Annaprashan (First Feeding)", entry: ["VuNg5k6X6eY", "@shantikunjvideo"] },
  { title: "Sanskar: Mundan (Tonsure)", entry: ["GBTq2E0iGm8", "@shantikunjvideo"] },
  { title: "Sanskar: Vidyarambh (Education Initiation)", entry: ["yZquDvmtKeI", "@shantikunjvideo"] },
  { title: "Sanskar: Yagyopaveet (Sacred Thread)", entry: ["HFGuMX9Zg-8", "@shantikunjvideo", "This video also covers Deeksha — see below"] },
  { title: "Sanskar: Deeksha (Initiation)", entry: ["0vfgzcE4iYw", "@shantikunjvideo"] },
  { title: "Sanskar: Janm-Divas (Birthday)", entry: ["WBYIZ9He8_g", "@shantikunjvideo", "Note: this topic had no matching book in the prior book-curation task — this is the only confirmed AWGP resource found for it so far"] },
  { title: "Sanskar: Vivah (Marriage)", entry: ["6FqsZdw2WRg", "@shantikunjvideo"] },
  { title: "Sanskar: Vivah-Divas (Wedding Anniversary)", entry: ["4KeGFbE3ss8", "@shantikunjvideo"] },
  { title: "Sanskar: Tarpan (Ancestral Offering)", noMatchText: "(Candidate “Tarpan Vidhi” belongs to channel “Sadhana Path” — not one of the 3 official channels — and was rejected.)" },
  { title: "Sanskar: Antyesti (Funeral Rites)", entry: ["lXo5HJVbPio", "@shantikunjvideo"] },
  { title: "Program: Yoga", noMatchText: "(Search results were dominated by unrelated yoga-instructor channels; no Pranayam/Asana-specific video could be confirmed as belonging to @shantikunjvideo, @PragyaGeet, or @RishiChintan. The Shantikunj Video mobile app does carry a dedicated “Yog” category — recommend pulling a link directly from there.)" },
  { title: "Program: Meditation / Dhyan", entry: ["vZBMcTjV89E", "@shantikunjvideo"] },
  { title: "Gayatri Sadhana (General)", entry: ["iU89vUPTuWI", "@shantikunjvideo"] },
  { title: "Sadhana Sub-Program: Akhand Jap", noMatchText: "(Closest candidates — Gayatri Jayanti 2025 live broadcasts of Akhand Jap/Mahayagya — belong to “Shantikunjvideo Regional-AWGP,” a related but separate channel from the 3 specified, so they were not included.)" },
  { title: "Sadhana Sub-Program: Mataji Jap", entry: ["roaVdhHhaqg", "@PragyaGeet"] },
  { title: "Sadhana Sub-Program: Anusthan", entry: ["frTQBrWZVwI", "@RishiChintan"] },
  { title: "Sadhana Sub-Program: Antahurja / Antahkaran", entry: ["Sm-1xhPt-3M", "@RishiChintan", "“Antdarshan Ka Dhyan” — Dr. Pranav Pandya"] },
  { title: "Sadhana Sub-Program: Chandrayan Kalp", entry: ["n2Dx4ZM8-qQ", "@shantikunjvideo"] },
  { title: "Sanyam (Self-Restraint)", entry: ["C5PyndZAMws", "@RishiChintan", "“Indriya Sanyam” — Pt. Shriram Sharma Acharya"] },
  { title: "Seva (Service)", entry: ["TLo_Z_R7U8Y", "@RishiChintan"] },
  { title: "Swadhyaya (Self-Study)", noMatchText: "(Candidates “SWADHYAY CHINTAN 55” and “Chintan #29 — SWADHYAY” belong to unrelated channels and were rejected.)" },
  { title: "Yagya (Fire Ritual)", entry: ["b5zY1do0KC8", "@shantikunjvideo", "“Sankshipt Yagya Vidhi” — Grihe-Grihe Gayatri Yagya, 17-min mobile pandit"] },
  { title: "Bal Sanskar Shala (Children's Values School)", noMatchText: "(Multiple “Bal Sanskar Shala” videos surfaced in search but each belongs to a different unofficial/local channel — Navyug Dal, Gayatridham Sendhwa, Bal Sanskar Kendra, Yuva VANI/Shantikunj Youthcell — none of which is one of the 3 specified official channels. None could be confirmed.)" },
];

ytTopics.forEach(topic => {
  ytChildren.push(sectionHeading(topic.title));
  if (topic.entry) {
    const [id, channel, extra] = topic.entry;
    ytChildren.push(...ytEntry(id, channel, extra));
  } else {
    ytChildren.push(noMatch(topic.noMatchText));
  }
});

ytChildren.push(new Paragraph({
  spacing: { before: 300, after: 100 },
  border: { top: { style: BorderStyle.SINGLE, size: 6, color: "2E75B6", space: 4 } },
  children: [new TextRun({ text: "SUMMARY", bold: true, size: 24, color: "1F4E5F" })],
}));
ytChildren.push(bodyText(
  "19 of 24 topics have a confirmed official-channel video. 5 topics (Tarpan, Yoga, Akhand Jap, " +
  "Swadhyaya, Bal Sanskar Shala) have no verified match from the 3 official channels and are " +
  "flagged above — consider checking the channels' full video libraries directly, or the AWGP " +
  "mobile app (70+ categories, 4700+ videos), for these."
));

const ytDoc = new Document({
  styles,
  sections: [{
    properties: { page: PAGE },
    footers: { default: footer() },
    children: ytChildren,
  }],
});

// ---------------------------------------------------------------------
Promise.all([
  Packer.toBuffer(booksDoc).then(buf => fs.writeFileSync("AWGP_Books_For_Website_Topics.docx", buf)),
  Packer.toBuffer(ytDoc).then(buf => fs.writeFileSync("AWGP_YouTube_Links_For_Website_Topics.docx", buf)),
]).then(() => console.log("DONE"));
