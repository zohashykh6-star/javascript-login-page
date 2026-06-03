export default function Home() {
  return (
    <div className="login-page">
      <div className="login-left">
        <div className="mail-icon">✉</div>

        <h1>
          Email <span>Server</span>
        </h1>

        <div className="preview-box">
          <div className="preview-icon">✉</div>
        </div>
      </div>

      <div className="login-card">
        <div className="top-icon">✉</div>

        <h2>
          Email <span>Server</span>
        </h2>

        <p>Access your email server account</p>

        <label>Email Address</label>
        <input type="email" placeholder="admin@example.com" />

        <label>Password</label>
        <input type="password" placeholder="••••••••" />

        <button>Login</button>
      </div>
    </div>
  );
}