// The ads. {name} is replaced with the name in config.js.
//
// BEFORE GOING LIVE: every personal must describe a real unit on his lot.
// "unit" is what to match it to; "verify" is what to confirm with him first.
// Nothing here states a length, sleeping count, weight or price on purpose.
// Add those only once they're checked against the real unit.

window.RV_PERSONALS = [
  {
    box: 7,
    kind: "Fifth wheel",
    unit: "Alliance Avenue (on the Prescott flyer)",
    verify: "Which Avenue floorplan is on the lot",
    lead: "Tall, roomy fifth wheel, an Alliance Avenue.",
    body: "Bedroom up front, a few steps above everything else. A living room you can actually stand around in. Seeking a retired couple ready to follow the weather. Must own a truck with a hitch in the bed, or be open to meeting one.",
  },
  {
    box: 3,
    kind: "Travel trailer",
    unit: "Keystone Outback (on the Prescott flyer)",
    verify: "Which Outback floorplan is on the lot",
    lead: "Easygoing travel trailer, goes by Outback.",
    body: "Happiest behind a pickup on a forest road with nowhere to be by dinner. Seeking a family that's tired of motel pools and 11 a.m. checkout. No experience required. I'll show you how the awning works.",
  },
  {
    box: 12,
    kind: "Class C motorhome",
    unit: "Class C on a Mercedes Sprinter chassis (on the Prescott flyer)",
    verify: "Make and model",
    lead: "Compact Class C on a Mercedes Sprinter.",
    body: "Diesel and sensible. You drive me, so there's no truck to buy and no trailer to back in. Seeking a couple who would rather drive than tow.",
  },
  {
    box: 9,
    kind: "Travel trailer",
    unit: "Lightest travel trailer on the lot",
    verify: "Dry weight, and that it's light enough for this pitch",
    lead: "Small, light travel trailer, new to all this too.",
    body: "I might be light enough that you don't need a new truck. Ask {name} what yours can pull before you fall for me. Seeking a first-timer who wants to try this without betting the house on it.",
  },
  {
    box: 2,
    kind: "Travel trailer",
    unit: "A bunkhouse floorplan",
    verify: "That the bunk room has its own door",
    lead: "Bunkhouse travel trailer with a door between rooms.",
    body: "The kids get their own bunk room. You get a door to close. Seeking a family that has outgrown the tent.",
  },
  {
    box: 5,
    kind: "Class A motorhome",
    unit: "A Class A, if one is on the lot",
    verify: "That there is a Class A at Prescott",
    lead: "Big Class A motorhome, the kind kids wave at.",
    body: "Brings the whole house along: full kitchen, real shower, a couch you'll fall asleep on. Seeking someone who means it. Looking for long trips, not weekend flings.",
  },
  {
    box: 11,
    kind: "Model year 2026",
    unit: "Any new 2026 unit still on the lot",
    verify: "That 2026 units are there and the show is pushing them",
    lead: "Last year's model, and fine with that.",
    body: "Still brand new, never titled, never slept in. The 2027s just showed up and everyone's looking at them. I'm ready to make a deal before winter.",
  },
];

window.RV_MISSED = [
  {
    box: 3,
    lead: "You: towing a pop-up that's seen better days, gas station on Highway 69.",
    body: "Me: brand new, hard sides, nothing to crank. You looked tired of cranking that roof up.",
  },
  {
    box: 12,
    lead: "You: retired couple in the checkout line on Glassford Hill, holding a camping magazine.",
    body: "Me: Class C, been nowhere yet. We could fix that.",
  },
  {
    box: 2,
    lead: "You: unloading three kids and a cooler at a motel off Gurley Street.",
    body: "Me: a bunk room with a door. Nobody has to share a bed with Grandpa this time.",
  },
];

window.RV_WANTED = {
  lead: "Your old RV.",
  body: "Sitting in the side yard? Out back at the storage lot? Bring it by or text a few photos, and {name} will get it appraised before it sits through another winter.",
  message: "Hi! I saw the Wanted ad in the RV Personals. I have an RV to trade.",
};

// The matchmaker's questionnaire. Each answer has a key; match() turns the
// three keys into a box number.
window.RV_QUIZ = {
  questions: [
    {
      id: "who",
      text: "Who's coming along?",
      options: [
        ["two", "Just the two of us"],
        ["kids", "The kids, too"],
        ["dog", "Me and the dog"],
      ],
    },
    {
      id: "drive",
      text: "What do you drive now?",
      options: [
        ["truck", "A truck that tows"],
        ["car", "A car or SUV"],
        ["none", "I'd rather drive the RV itself"],
      ],
    },
    {
      id: "time",
      text: "How long will you be gone?",
      options: [
        ["weekends", "Long weekends"],
        ["weeks", "A few weeks at a time"],
        ["winter", "All winter"],
      ],
    },
  ],
  match(a) {
    if (a.drive === "none") return a.time === "winter" ? 5 : 12;
    if (a.drive === "car") return 9;
    if (a.who === "kids") return 2;
    if (a.time === "weekends") return 3;
    return 7;
  },
};
