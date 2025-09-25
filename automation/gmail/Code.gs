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
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family:Montserrat,Open Sans,Arial,sans-serif;">
      <tr><td style="padding:16px;background:linear-gradient(90deg,#002f34,#005c6a,#003d4f,#071c29);color:#fff;">
        <span style="font-weight:800;letter-spacing:0.03em;">RECOVERY COMPASS</span>
      </td></tr>
      <tr><td style="padding:20px;background:#ffffff;">
        <img src="https://YOUR_CDN/wfd-logo.png" alt="Whittier First Day" height="36" style="display:block;margin-bottom:12px;">
        <p style="margin:0 0 6px 0;color:#1E3A5F;font-size:14px;font-weight:600;">Finding Solutions to Homelessness</p>
        <h1 style="margin:6px 0 8px 0;color:#1E3A5F;font-size:18px;">This week’s impact — live dashboard & story cards</h1>
        <ul style="margin:8px 0 12px 18px;color:#333;">
          <li><strong>87% housing success rate</strong> in September</li>
          <li><strong>Pet support program launched</strong></li>
          <li><strong>Staff celebration</strong> — because wins matter</li>
        </ul>
        <a href="${DASHBOARD_URL}"
           style="display:inline-block;background:#1E3A5F;color:#fff;text-transform:uppercase;padding:10px 16px;border-radius:10px;text-decoration:none;">Open Dashboard</a>
        <p style="margin-top:12px;color:#333;">Story cards attached — ready for social.</p>
        <p style="color:#333;">— Recovery Compass</p>
      </td></tr>
    </table>
  `;
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
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family:Montserrat,Open Sans,Arial,sans-serif;">
      <tr><td style="padding:16px;background:linear-gradient(90deg,#002f34,#005c6a,#003d4f,#071c29);color:#fff;">
        <span style="font-weight:800;letter-spacing:0.03em;">RECOVERY COMPASS</span>
      </td></tr>
      <tr><td style="padding:20px;background:#ffffff;">
        <img src="https://YOUR_CDN/wfd-logo.png" alt="Whittier First Day" height="36" style="display:block;margin-bottom:12px;">
        <p style="margin:0 0 6px 0;color:#1E3A5F;font-size:14px;font-weight:600;">Finding Solutions to Homelessness</p>
        <p style="margin:0 0 12px 0;color:#333;">Hi ${r.name.split(" ")[0]},</p>
        <p style="margin:0 0 12px 0;color:#333;">We’re shipping a delight-first experience: Leaderboard, Stories, and Impact Meter — all live.</p>
        <a href="${DASHBOARD_URL}"
           style="display:inline-block;background:#1E3A5F;color:#fff;text-transform:uppercase;padding:10px 16px;border-radius:10px;text-decoration:none;">Open Dashboard</a>
        <p style="margin-top:12px;color:#333;">Cards attached. Want weekly summaries in your inbox? I can turn that on.</p>
        <p style="color:#333;">— Recovery Compass</p>
      </td></tr>
    </table>
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