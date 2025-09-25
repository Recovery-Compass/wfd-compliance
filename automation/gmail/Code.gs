const RECIPIENTS = [
  { name: "Donna Gallup", email: "donna@example.org" },
  // Add more recipients here
];

const DASHBOARD_URL = "https://your-amplify-domain.example/wow";
const CARDS = [
  "https://your-amplify-domain.example/impact-cards/impact-card-1.svg",
  "https://your-amplify-domain.example/impact-cards/impact-card-2.svg",
  "https://your-amplify-domain.example/impact-cards/impact-card-3.svg",
];

function sendWeeklySummary() {
  const subject = "This week’s impact — live dashboard & story cards";
  const htmlBody = `
    <p>Hi there,</p>
    <p>Your live impact dashboard is updated. Highlights:</p>
    <ul>
      <li><strong>87% housing success rate</strong> in September</li>
      <li><strong>Pet support program launched</strong></li>
      <li><strong>Staff celebration</strong> — because wins matter</li>
    </ul>
    <p>Open the dashboard: <a href="${DASHBOARD_URL}">${DASHBOARD_URL}</a></p>
    <p>Story cards attached — ready for social.</p>
    <p>— Recovery Compass</p>
  `;

  RECIPIENTS.forEach((r) => {
    const options = {
      htmlBody,
      attachments: CARDS.map((url) => UrlFetchApp.fetch(url).getBlob()),
      name: "Recovery Compass",
    };
    GmailApp.sendEmail(r.email, subject, "HTML view required", options);
  });
}

function sendFollowUp(name) {
  const r = RECIPIENTS.find((x) => x.name === name) || RECIPIENTS[0];
  const subject = `Quick preview for ${r.name}`;
  const htmlBody = `
    <p>Hi ${r.name.split(" ")[0]},</p>
    <p>We’re shipping a delight-first experience: Leaderboard, Stories, and Impact Meter — all live.</p>
    <p>Preview: <a href="${DASHBOARD_URL}">${DASHBOARD_URL}</a></p>
    <p>Cards attached. Want weekly summaries in your inbox? I can turn that on.</p>
    <p>— Recovery Compass</p>
  `;
  const options = {
    htmlBody,
    attachments: CARDS.map((url) => UrlFetchApp.fetch(url).getBlob()),
    name: "Recovery Compass",
  };
  GmailApp.sendEmail(r.email, subject, "HTML view required", options);
}

function setUpTriggers() {
  // Weekly at Friday 3pm local time
  ScriptApp.newTrigger("sendWeeklySummary")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(15)
    .create();
}