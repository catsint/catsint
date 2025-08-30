<?php
session_start();

// === Auto tworzony katalog i pliki JSON ===
if (!is_dir(__DIR__ . "/data")) {
    mkdir(__DIR__ . "/data", 0755, true);
}
if (!file_exists(__DIR__ . "/data/maintenance.json")) {
    file_put_contents(__DIR__ . "/data/maintenance.json", json_encode(["enabled" => false]));
}

// === Maintenance check ===
$maintenance = json_decode(file_get_contents(__DIR__ . "/data/maintenance.json"), true);
if ($maintenance["enabled"] === true) {
    echo "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>CATSINT | Maintenance</title>
    <style>
    body{background:#0a0a0a;color:#fff;font-family:Arial, sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;}
    .box{padding:40px;background:#111;border:1px solid #333;border-radius:12px;text-align:center;}
    </style></head><body><div class='box'><h1>🚧 CATSINT is under maintenance</h1><p>Please check back later.</p></div></body></html>";
    exit;
}

// === Invite check ===
if (isset($_GET['invite'])) {
    $_SESSION['invite_code'] = htmlspecialchars($_GET['invite']);
}
$inviteCode = $_SESSION['invite_code'] ?? null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CATSINT | Invite Only CSINT</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <script src="assets/js/app.js" defer></script>
</head>
<body>
  <!-- Background Particles -->
  <canvas id="particles"></canvas>

  <!-- Header -->
  <header class="header">
    <img src="assets/img/logo.png" alt="CATSINT Logo" class="logo">
    <h1 class="title">CATSINT</h1>
    <?php if($inviteCode): ?>
      <p class="invite">🔑 Invite loaded: <b><?= $inviteCode ?></b></p>
    <?php else: ?>
      <p class="invite">🔒 Invite required</p>
    <?php endif; ?>
  </header>

  <!-- Main Content -->
  <main>
    <section class="hero">
      <h2>Exclusive CSINT Project</h2>
      <p>Invite-only access. Secure. Advanced. Elite.</p>
    </section>

    <!-- Pricing -->
    <section class="pricing">
      <div class="plan">
        <h3>Plan #1</h3>
        <ul>
          <li><span class="led"></span> Basic CSINT tools</li>
          <li><span class="led"></span> Dashboard access</li>
        </ul>
      </div>
      <div class="plan">
        <h3>Plan #2</h3>
        <ul>
          <li><span class="led"></span> Advanced CSINT functions</li>
          <li><span class="led"></span> API access</li>
          <li><span class="led"></span> Notifications</li>
        </ul>
      </div>
      <div class="plan">
        <h3>Plan #3</h3>
        <ul>
          <li><span class="led"></span> Full CSINT toolkit</li>
          <li><span class="led"></span> Priority support</li>
          <li><span class="led"></span> Admin utilities</li>
        </ul>
      </div>
    </section>

    <!-- FAQ Button -->
    <button id="faq-btn" class="btn">FAQ</button>
  </main>

  <!-- FAQ Overlay -->
  <div id="faq-overlay" class="overlay hidden">
    <div class="overlay-content">
      <button id="close-faq" class="close-btn">✖</button>
      <h2>FAQ</h2>
      <div class="faq-item">
        <h3>What is CATSINT?</h3>
        <p>CATSINT is an invite-only CSINT platform, private and secure.</p>
      </div>
      <div class="faq-item">
        <h3>How do I join?</h3>
        <p>You need a valid invite code. Without it, you cannot register.</p>
      </div>
      <div class="faq-item">
        <h3>Is my data safe?</h3>
        <p>Yes. Everything is encrypted and securely stored.</p>
      </div>
    </div>
  </div>
</body>
</html>
