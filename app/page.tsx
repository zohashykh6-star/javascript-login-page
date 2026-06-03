'use client';

const emails = [
  {
    id: 1,
    sender: 'john@gmail.com',
    subject: 'Business Meeting',
    status: 'Unread',
  },
  {
    id: 2,
    sender: 'client@gmail.com',
    subject: 'Project Update',
    status: 'Read',
  },
];

export default function DashboardPage() {
  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <h1 className="logo">
          Email <br />
          Server
        </h1>

        <div className="menu">

          <button className="menu-btn active-btn">
            Dashboard
          </button>

          <button className="menu-btn">
            Emails
          </button>

          <button className="menu-btn">
            Inbox
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="main">

        {/* HERO */}

        <section className="hero">

          <div className="hero-glow"></div>

          <h1 className="hero-title">
            Dashboard
          </h1>

          <p className="hero-subtitle">
            Modern Email Management System
          </p>

        </section>

        {/* STATS */}

        <section className="stats-grid">

          <div className="stat-card">
            <p>Total Emails</p>
            <h2>120</h2>
          </div>

          <div className="stat-card">
            <p>Inbox</p>
            <h2>45</h2>
          </div>

          <div className="stat-card">
            <p>Sent</p>
            <h2>30</h2>
          </div>

          <div className="stat-card">
            <p>Storage</p>
            <h2>80%</h2>
          </div>

        </section>

        {/* TABLE */}

        <section className="table-box">

          <h2 className="table-title">
            Email Records
          </h2>

          <table className="email-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Sender</th>
                <th>Subject</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {emails.map((email) => (
                <tr key={email.id}>

                  <td>{email.id}</td>

                  <td>{email.sender}</td>

                  <td>{email.subject}</td>

                  <td>

                    <span
                      className={
                        email.status === 'Read'
                          ? 'status read'
                          : 'status unread'
                      }
                    >
                      {email.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </section>

        {/* BUTTONS DOWN */}

        <div className="bottom-buttons">

          <button className="bottom-btn">
            Logout
          </button>

          <button className="bottom-btn">
            Add Email
          </button>

        </div>

      </main>

    </div>
  );
}