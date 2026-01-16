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
    version: '2.0',
    environment: 'green',
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
  <title>Green Deployment | Release v2.0</title>

  <style>
    :root {
      --green-dark: #064e3b;
      --green-mid: #0f766e;
      --green-deep: #14532d;
      --warning: #f59e0b;
      --text-muted: #6b7280;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: "Segoe UI", Tahoma, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(
        145deg,
        var(--green-mid),
        var(--green-deep)
      );
    }

    .panel {
      background: #ffffff;
      padding: 55px 70px;
      max-width: 700px;
      width: 92%;
      border-radius: 20px;
      box-shadow: 0 30px 85px rgba(0, 0, 0, 0.35);
      text-align: center;
    }

    h1 {
      margin: 0;
      color: var(--green-dark);
      font-size: 2.3rem;
    }

    .subtitle {
      margin-top: 8px;
      color: var(--text-muted);
      font-size: 1rem;
    }

    .release {
      margin: 28px 0 8px;
      font-size: 2.9rem;
      font-weight: 700;
      color: var(--green-mid);
    }

    .env-chip {
      display: inline-block;
      padding: 14px 38px;
      border-radius: 999px;
      background: var(--green-dark);
      color: #fff;
      font-size: 1.1rem;
      margin: 18px 0 30px;
      letter-spacing: 1px;
    }

    .info {
      text-align: left;
      font-size: 0.95rem;
      color: #555;
      line-height: 1.8;
    }

    .badge {
      display: inline-block;
      background: var(--warning);
      color: #fff;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      margin-left: 8px;
    }

    .features {
      margin: 25px 0;
      background: #ecfdf5;
      border-left: 6px solid var(--green-dark);
      padding: 18px 22px;
      border-radius: 12px;
    }

    .features h3 {
      margin-top: 0;
      color: var(--green-dark);
      font-size: 1.1rem;
    }

    .features ul {
      padding-left: 18px;
      margin: 10px 0 0;
    }

    .features li {
      margin: 8px 0;
    }

    .footer {
      margin-top: 35px;
      font-size: 0.85rem;
      color: #9ca3af;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="panel">
    <h1>🚀 Welcome to The CloudDevOpsHub Blue-Green Deployment Demo</h1>
    <div class="subtitle">Green Phase – Pre-Production Validation</div>

    <div class="release">Release v2.0</div>
    <div class="env-chip">GREEN ENVIRONMENT</div>

    <div class="info">
      <p>
        <strong>Deployment Stage:</strong>
        <span class="badge">STAGING</span>
      </p>

      <p>
        This instance is the next production candidate currently running in the
        green environment for validation and testing before production deployment.
      </p>

      <div class="features">
        <h3>What’s Included in v2.0</h3>
        <ul>
          <li>Updated interface with improved UX</li>
          <li>Performance optimizations across services</li>
          <li>Security hardening and configuration fixes</li>
          <li>Improved logging and monitoring hooks</li>
          <li>Resolved issues from previous release</li>
        </ul>
      </div>

      <p>
        <strong>Server Time:</strong><br />
        ${new Date().toISOString()}
      </p>

      <p>
        <strong>Running Host:</strong><br />
        ${require("os").hostname()}
      </p>
    </div>

    <div class="footer">
      Blue-Green deployment • Release validation phase
    </div>
  </div>
</body>
</html>
 
  `);
});

// API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    version: '2.0',
    environment: 'green',
    status: 'staging',
    timestamp: new Date().toISOString(),
    hostname: require('os').hostname(),
    platform: process.platform,
    nodeVersion: process.version,
    features: [
      'Refreshed UI',
      'Improved performance',
      'Enhanced security',
      'Better analytics',
      'Bug fixes'
    ]
  });
});

// New feature endpoint (only in v2.0)
app.get('/api/features', (req, res) => {
  res.json({
    version: '2.0',
    newFeatures: [
      {
        name: 'Modern UI',
        description: 'Complete redesign with modern aesthetics',
        status: 'completed'
      },
      {
        name: 'Performance Boost',
        description: '50% faster load times',
        status: 'completed'
      },
      {
        name: 'Advanced Analytics',
        description: 'Real-time insights and reporting',
        status: 'completed'
      }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Application v2.0 (Green Environment) is running on port ${PORT}`);
  console.log(`🌐 Server started at ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});
