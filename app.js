(function () {
  const C = window.RV_CONFIG;
  const fill = (s) => s.replaceAll("{name}", C.name);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A text-message link with the message already typed out.
  // The "?&body=" form works on both iPhone and Android.
  const smsLink = (message) => `sms:${C.phoneLink}?&body=${encodeURIComponent(message)}`;
  const boxMessage = (box) => `Hi! I'm writing about Box ${box} in the RV Personals.`;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  // --- Config values into the page ---
  document.querySelectorAll("[data-name]").forEach((n) => (n.textContent = C.name));
  document.querySelectorAll("[data-phone]").forEach((n) => (n.textContent = C.phoneDisplay));
  document.querySelectorAll("[data-show]").forEach((n) => (n.textContent = C.showName));
  document.querySelector("[data-address]").textContent = C.address;
  document.querySelector("[data-lastday]").textContent = C.lastDay;
  document.querySelector("[data-lastclose]").textContent = C.lastDayClose;
  document.querySelector("[data-text-link]").href = smsLink("Hi! I found the RV Personals and want to come see the RVs.");
  const hours = document.querySelector("[data-hours]");
  hours.append(el("dt", null, "Hours"));
  C.hours.forEach(([days, time]) => hours.append(el("dd", null, `${days}, ${time}`)));

  // --- Ads ---
  const replyLink = (box, message) => {
    const a = el("a", "ad__reply", `Reply to Box ${box}`);
    a.href = smsLink(message || boxMessage(box));
    return a;
  };

  const renderAd = (ad, opts = {}) => {
    const n = el("article", opts.line ? "ad ad--line" : "ad");
    if (!opts.line) n.id = `box-${ad.box}`;
    if (ad.kind) n.append(el("p", "ad__kind", ad.kind));
    const p = el("p", "ad__text");
    p.append(el("strong", "ad__lead", fill(ad.lead) + " "));
    p.append(document.createTextNode(fill(ad.body)));
    n.append(p);
    n.append(replyLink(ad.box, opts.message));
    return n;
  };

  const personals = document.querySelector("[data-personals]");
  window.RV_PERSONALS.forEach((ad) => personals.append(renderAd(ad)));

  const missed = document.querySelector("[data-missed]");
  window.RV_MISSED.forEach((ad) => missed.append(renderAd(ad, { line: true })));

  const wanted = document.querySelector("[data-wanted]");
  const W = window.RV_WANTED;
  const wantedAd = renderAd({ lead: W.lead, body: W.body }, { line: true });
  wantedAd.classList.add("ad--wanted");
  wantedAd.querySelector(".ad__reply").remove();
  const wantedLink = el("a", "ad__reply", "Text about a trade");
  wantedLink.href = smsLink(W.message);
  wantedAd.append(wantedLink);
  wanted.append(wantedAd);

  // --- The red marker circle ---
  // A hand-drawn loop that overshoots where it started, like a real pen.
  // Points are on a 200 x 100 grid and get stretched to the ad's real size,
  // so the line stays the same thickness all the way around.
  const LOOP = [
    ["M", 34, 20],
    ["C", 72, 3, 158, 4, 188, 30],
    ["C", 206, 52, 182, 89, 110, 95],
    ["C", 48, 100, 7, 83, 9, 52],
    ["C", 11, 27, 46, 9, 96, 7],
    ["C", 122, 6, 152, 10, 170, 19],
  ];

  const loopPath = (w, h) =>
    LOOP.map(([cmd, ...pts]) =>
      cmd + pts.map((v, i) => (i % 2 ? (v / 100) * h : (v / 200) * w).toFixed(1)).join(" ")
    ).join(" ");

  const circleAd = (box) => {
    document.querySelectorAll(".marker").forEach((m) => m.remove());
    const ad = document.getElementById(`box-${box}`);
    if (!ad) return null;

    const wrap = el("div", "marker");
    wrap.setAttribute("aria-hidden", "true");
    ad.append(wrap);
    const { width: w, height: h } = wrap.getBoundingClientRect();

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "marker__loop");
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", loopPath(w, h));
    svg.append(path);
    wrap.append(svg, el("span", "marker__note", "your match"));

    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    ad.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    // Start drawing once the scroll has mostly landed.
    setTimeout(() => {
      wrap.classList.add("marker--draw");
      path.style.strokeDashoffset = 0;
    }, reducedMotion ? 0 : 550);
    return ad;
  };

  // --- Questionnaire ---
  const Q = window.RV_QUIZ;
  const quiz = document.getElementById("quiz");
  const qWrap = quiz.querySelector("[data-questions]");
  const result = quiz.querySelector("[data-result]");

  Q.questions.forEach((q) => {
    const fs = el("fieldset", "question");
    fs.append(el("legend", "question__text", q.text));
    q.options.forEach(([value, label]) => {
      const lab = el("label", "choice");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = q.id;
      input.value = value;
      lab.append(input, el("span", null, label));
      fs.append(lab);
    });
    qWrap.append(fs);
  });

  quiz.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(quiz);
    const answers = {};
    const missing = [];
    Q.questions.forEach((q) => {
      const v = data.get(q.id);
      if (v) answers[q.id] = v;
      else missing.push(q.text);
    });

    result.textContent = "";
    if (missing.length) {
      result.append(el("p", "result__error", `Answer "${missing[0]}" to find your match.`));
      return;
    }

    const box = Q.match(answers);
    const ad = window.RV_PERSONALS.find((p) => p.box === box);
    result.append(el("p", "result__line", `Your match is Box ${box}: ${ad.kind}.`));
    const link = replyLink(box);
    link.className = "button button--reply";
    result.append(link);
    circleAd(box);
  });
})();
