const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    version: '1.0',
    environment: 'blue',
    timestamp: new Date().toISOString()
  });
});

// Main route
app.get('/', (req, res) => {
  res.send(`
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Blue Deployment | Release v1</title>

  <style>
    :root {
      --primary: #0f4c81;
      --secondary: #1b6ca8;
      --success: #2ecc71;
      --text-dark: #2c3e50;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      min-height: 100vh;
      background: radial-gradient(circle at top, #1b6ca8, #0f4c81);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card {
      background: #ffffff;
      width: 90%;
      max-width: 640px;
      padding: 50px 60px;
      border-radius: 18px;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.35);
      text-align: center;
    }

    .card h1 {
      color: var(--text-dark);
      font-size: 2.3rem;
      margin-bottom: 10px;
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1rem;
      margin-bottom: 30px;
    }

    .release {
      font-size: 2.8rem;
      font-weight: 700;
      color: var(--primary);
      margin: 20px 0;
    }

    .env-tag {
      display: inline-block;
      padding: 14px 34px;
      border-radius: 999px;
      background: var(--primary);
      color: #fff;
      font-size: 1.1rem;
      letter-spacing: 1px;
      margin-bottom: 30px;
    }

    .details {
      text-align: left;
      color: #555;
      font-size: 0.95rem;
      line-height: 1.8;
      margin-top: 25px;
    }

    .label {
      display: inline-block;
      background: var(--success);
      color: #fff;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      margin-left: 8px;
    }

    .footer {
      margin-top: 35px;
      font-size: 0.85rem;
      color: #999;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="card">
    <h1>🚀 Welcome to The CloudDevOpsHub Blue-Green Deployment Demo</h1>
    <div class="subtitle">Blue-Green Release Strategy Demo</div>

    <div class="release">Release v1.0</div>

    <div class="env-tag">BLUE ENVIRONMENT</div>

    <div class="details">
      <p>
        <strong>Deployment State:</strong>
        <span class="label">LIVE</span>
      </p>

      <p>
        This instance represents the active production workload currently
        serving users under the blue deployment phase.
      </p>

      <p>
        <strong>Server Timestamp:</strong><br />
        ${new Date().toISOString()}
      </p>

      <p>
        <strong>Running Host:</strong><br />
        ${require("os").hostname()}
      </p>
    </div>

    <div class="footer">
      Managed deployment • Zero-downtime architecture
    </div>
  </div>
</body>
</html>

  `);
});

// API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    version: '1.0',
    environment: 'blue',
    status: 'production',
    timestamp: new Date().toISOString(),
    hostname: require('os').hostname(),
    platform: process.platform,
    nodeVersion: process.version
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Application v1.0 (Blue Environment) is running on port ${PORT}`);
  console.log(`🌐 Server started at ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});
