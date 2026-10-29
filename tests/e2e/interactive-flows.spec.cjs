const { test, expect } = require("@playwright/test");

function watchBrowserErrors(page) {
  const pageErrors = [];
  const consoleErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  return { pageErrors, consoleErrors };
}

function expectNoBrowserErrors(errors) {
  expect(errors.pageErrors, "uncaught page errors").toEqual([]);
  expect(errors.consoleErrors, "console.error messages").toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("__gematria_e2e_initialized")) {
      localStorage.clear();
      sessionStorage.setItem("__gematria_e2e_initialized", "true");
    }
  });
});

test("Gematria calculator handles standard and reduced methods", async ({ page }) => {
  const errors = watchBrowserErrors(page);
  await page.goto("/pages/gematria/calculateur-gematria.html");
  await page.locator("#textInput").fill("שלום");
  await page.getByRole("button", { name: /Calculer la Gematria/ }).click();
  await expect(page.locator("#resultValue")).toHaveText("376");
  await expect(page.locator("#letterBreakdown .letter-row")).toHaveCount(4);

  await page.locator('.method-btn[data-method="mispar-katan"]').click();
  await page.getByRole("button", { name: /Calculer la Gematria/ }).click();
  await expect(page.locator("#resultValue")).toHaveText("16");
  await expect(page.locator(".method-btn.active")).toHaveAttribute("data-method", "mispar-katan");
  expectNoBrowserErrors(errors);
});

test("Numerology calculator validates, calculates, and exports a result", async ({ page }) => {
  const errors = watchBrowserErrors(page);
  await page.goto("/pages/numerologie/calculateur-numerologie.html");
  const dialogPromise = page.waitForEvent("dialog").then(async dialog => {
    const message = dialog.message();
    await dialog.accept();
    return message;
  });
  await page.getByRole("button", { name: /Calculer mon thème complet/ }).click();
  expect(await dialogPromise).toContain("remplir tous les champs");

  await page.locator("#fullName").fill("Ada Lovelace");
  await page.locator("#birthDay").fill("15");
  await page.locator("#birthMonth").fill("3");
  await page.locator("#birthYear").fill("1990");
  await page.getByRole("button", { name: /Calculer mon thème complet/ }).click();
  await expect(page.locator("#lifePath")).not.toHaveText("-");
  await expect(page.locator("#expression")).not.toHaveText("-");
  await expect(page.locator("#results")).toHaveClass(/show/);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /Sauvegarder/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^numerologie_Ada_Lovelace\.txt$/);
  expectNoBrowserErrors(errors);
});

test("Rune reading saves to sandboxed local storage and resumes after reload", async ({ page }) => {
  const errors = watchBrowserErrors(page);
  await page.goto("/pages/runes/tirage-runes.html");
  await page.locator("#questionInput").fill("Question de test sans données personnelles");
  await page.locator('.spread-card[onclick="selectSpread(\'three\')"]').click();
  await page.getByRole("button", { name: /Tirer les Runes/ }).click();
  await page.waitForFunction(() => document.querySelectorAll("#runesContainer .rune-stone").length === 3);
  await expect(page.locator("#runesContainer .rune-stone")).toHaveCount(3);

  const dialogPromise = page.waitForEvent("dialog").then(async dialog => {
    const message = dialog.message();
    await dialog.accept();
    return message;
  });
  await page.getByRole("button", { name: /Sauvegarder ce tirage/ }).click();
  expect(await dialogPromise).toContain("sauvegardé");

  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("runeReadings")));
  expect(saved).toHaveLength(1);
  expect(saved[0].question).toBe("Question de test sans données personnelles");
  expect(saved[0].runes).toHaveLength(3);
  await page.reload();
  await expect(page.locator("body")).toContainText("Historique de vos tirages");
  await expect(page.locator("body")).toContainText("Question de test sans données personnelles");

  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator("body")).not.toContainText("Historique de vos tirages");
  expectNoBrowserErrors(errors);
});

test("Tarot spread can be drawn, flipped, reset, and drawn again", async ({ page }) => {
  const errors = watchBrowserErrors(page);
  await page.goto("/pages/tarot/tirage-tarot.html");
  await page.locator("#question").fill("Test de navigation et de remise à zéro");
  await page.locator('.spread-btn[onclick="selectSpread(\'three\')"]').click();
  await page.getByRole("button", { name: /Tirer les cartes/ }).click();
  await expect(page.locator("#spreadDisplay .tarot-card")).toHaveCount(3, { timeout: 5000 });
  await expect(page.locator("#readingArea")).toHaveClass(/show/);
  await page.locator("#spreadDisplay .tarot-card").first().click();
  await expect(page.locator("#spreadDisplay .tarot-card").first()).toHaveClass(/flipped|revealed|is-flipped/);
  await page.getByRole("button", { name: /Nouveau Tirage/ }).click();
  await expect(page.locator("#readingArea")).not.toHaveClass(/show/);
  await expect(page.locator("#question")).toHaveValue("");
  expectNoBrowserErrors(errors);
});

test("Hieroglyph exercise feedback and score persist, resume, and reset locally", async ({ page }) => {
  const errors = watchBrowserErrors(page);
  await page.goto("/pages/hieroglyphes/hieroglyphes-exercices-phrases.html");
  const first = page.locator('.exercise-card[data-exercise="1"]');
  await first.locator('.quiz-option[data-answer="wrong"]').first().click();
  await expect(first.locator(".quiz-option.incorrect")).toHaveCount(1);
  await expect(first.locator(".explanation")).toHaveClass(/show/);

  const second = page.locator('.exercise-card[data-exercise="2"]');
  await second.locator('.quiz-option[data-answer="correct"]').click();
  await expect(second.locator(".quiz-option.correct")).toHaveCount(1);
  await expect(page.locator("#score")).toHaveText("1");
  expect(await page.evaluate(() => localStorage.getItem("hieroglyphes-exercise-1"))).toBe("completed");
  expect(await page.evaluate(() => localStorage.getItem("hieroglyphes-exercises-score"))).toBe("1");

  await page.reload();
  await expect(page.locator("#score")).toHaveText("1");
  await expect(first.locator(".explanation")).toHaveClass(/show/);
  await expect(second.locator(".explanation")).toHaveClass(/show/);

  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator("#score")).toHaveText("0");
  await expect(first.locator(".explanation")).not.toHaveClass(/show/);
  expectNoBrowserErrors(errors);
});

test("Hieroglyph quiz returns answer feedback, advances, and restarts", async ({ page }) => {
  const errors = watchBrowserErrors(page);
  await page.goto("/pages/hieroglyphes/hieroglyphes-jeux-interactifs.html");
  await page.locator("#game-menu .game-card").filter({ hasText: "Quiz Éclair" }).click();
  await expect(page.locator("#quiz-game")).toHaveClass(/active/);
  await expect(page.locator("#quiz-question-num")).toHaveText("1/20");

  const correctIndex = await page.evaluate(() => gameState.questions[gameState.currentQuestion].correct);
  const wrongIndex = (correctIndex + 1) % 4;
  const answers = page.locator("#quiz-container .quiz-answer-btn");
  await answers.nth(wrongIndex).click();
  await expect(answers.nth(wrongIndex)).toHaveClass(/incorrect/);
  await expect(answers.nth(correctIndex)).toHaveClass(/correct/);
  await expect(answers.nth(wrongIndex)).toBeDisabled();
  await expect(page.locator("#quiz-question-num")).toHaveText("2/20", { timeout: 4000 });
  await expect(page.locator("#quiz-score")).toHaveText("0/20");

  await page.locator("#quiz-game .back-to-menu").click();
  await page.locator("#game-menu .game-card").filter({ hasText: "Quiz Éclair" }).click();
  await expect(page.locator("#quiz-question-num")).toHaveText("1/20");
  await expect(page.locator("#quiz-score")).toHaveText("0/20");
  expectNoBrowserErrors(errors);
});

test("Gematria navigation returns from a lesson to the academy", async ({ page }) => {
  const errors = watchBrowserErrors(page);
  await page.goto("/pages/gematria/gematria-debutant.html");
  await page.getByRole("link", { name: /Accueil/ }).first().click();
  await expect(page).toHaveURL(/\/index\.html$/);
  await expect(page.locator("h1")).toBeVisible();
  expectNoBrowserErrors(errors);
});


test("Home day and night modes use distinct palettes and account controls stay left of language selector", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const body = page.locator("body");
  await expect(body).toHaveClass(/dark-mode/);
  const nightBackground = await body.evaluate(element => getComputedStyle(element).backgroundImage);

  await page.locator(".cosmic-btn-dark").click();
  await expect(body).toHaveClass(/light-mode/);
  await expect(body).not.toHaveClass(/dark-mode/);
  const dayBackground = await body.evaluate(element => getComputedStyle(element).backgroundImage);
  expect(dayBackground).not.toBe(nightBackground);

  await expect(page.locator("#login-button")).toHaveCSS("order", "-2");
  await expect(page.locator("#profile-button")).toHaveCSS("order", "-1");

  const stylesheetVersions = await page.locator('link[href*="assets/css/main/"]').evaluateAll(links =>
    links.filter(link => /(?:style|fix-contrast|cosmic-header-styles)\.css/.test(link.href))
      .map(link => new URL(link.href).searchParams.get("v"))
  );
  expect(stylesheetVersions).toEqual(["20261029-2", "20261029-2", "20261029-2"]);

  await page.evaluate(() => {
    const panel = document.createElement("aside");
    panel.id = "ga-language-panel";
    Object.assign(panel.style, {
      position: "fixed", top: "10px", right: "10px",
      width: "390px", height: "52px", zIndex: "2147483000"
    });
    document.body.append(panel);
  });
  const controls = await page.locator(".header-buttons-cosmic").boundingBox();
  const languagePanel = await page.locator("#ga-language-panel").boundingBox();
  expect(controls.x).toBeLessThanOrEqual(20);
  expect(controls.x + controls.width).toBeLessThanOrEqual(languagePanel.x);
});


test("Learning paths schedule varied active-recall practice", async ({ page }) => {
  const errors = watchBrowserErrors(page);
  await page.goto("/parcours-apprentissage.html");
  await expect(page.locator("#domain-count")).toHaveText("18");
  await expect(page.locator("#review-count")).toHaveText("0");
  await expect(page.locator("#review-start")).toBeDisabled();

  await page.locator(".check").first().check();
  await expect(page.locator("#review-count")).toHaveText("1");
  await page.locator("#review-start").click();
  await expect(page.locator("#review-session")).toBeVisible();
  await expect(page.locator("#review-step-title")).not.toBeEmpty();
  await expect(page.locator("#review-type")).toContainText("Rappel");
  await page.locator("#review-answer").fill("Je rappelle les idées principales de la leçon avec un exemple que je formule de mémoire.");
  await page.locator("#review-reveal").click();
  await expect(page.locator("#review-hint")).toBeVisible();
  await expect(page.locator("#review-ratings")).toBeVisible();
  await page.locator('[data-review-rating="good"]').click();

  await expect(page.locator("#review-count")).toHaveText("0");
  await expect(page.locator("#review-session")).toBeHidden();
  const schedule = await page.evaluate(() => JSON.parse(localStorage.getItem("gematria_spaced_reviews_v1")));
  expect(schedule["runes.0"].repetitions).toBe(1);
  expect(schedule["runes.0"].dueAt - Date.now()).toBeGreaterThan(20 * 60 * 60 * 1000);
  expectNoBrowserErrors(errors);
});
