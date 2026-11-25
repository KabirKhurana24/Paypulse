import React, { useMemo, useRef, useState } from 'react';

const initialTransactions = [
  { id: 'TXN-904821', customer: 'Aarav Mehta', email: 'aarav.m@samplemail.in', amount: 12499, currency: 'INR', gateway: 'Razorpay', method: 'UPI', status: 'Success', time: '10:42:18', date: '25 Nov 2026', reference: 'ORD-78122', reason: '—' },
  { id: 'TXN-904820', customer: 'Mira Kapoor', email: 'mira.k@samplemail.in', amount: 4299, currency: 'INR', gateway: 'Cashfree', method: 'Cards', status: 'Failed', time: '10:40:51', date: '25 Nov 2026', reference: 'ORD-78121', reason: 'Do not honor' },
  { id: 'TXN-904819', customer: 'Ishaan Rao', email: 'ishaan.r@samplemail.in', amount: 1890, currency: 'INR', gateway: 'PayU', method: 'UPI', status: 'Success', time: '10:37:03', date: '25 Nov 2026', reference: 'ORD-78120', reason: '—' },
  { id: 'TXN-904818', customer: 'Ananya Shah', email: 'ananya.s@samplemail.in', amount: 28750, currency: 'INR', gateway: 'Stripe', method: 'Cards', status: 'Pending', time: '10:34:29', date: '25 Nov 2026', reference: 'ORD-78119', reason: 'Awaiting confirmation' },
  { id: 'TXN-904817', customer: 'Vihaan Nair', email: 'vihaan.n@samplemail.in', amount: 999, currency: 'INR', gateway: 'Razorpay', method: 'Wallet', status: 'Success', time: '10:31:44', date: '25 Nov 2026', reference: 'ORD-78118', reason: '—' },
  { id: 'TXN-904816', customer: 'Sara Thomas', email: 'sara.t@samplemail.in', amount: 6480, currency: 'INR', gateway: 'Cashfree', method: 'UPI', status: 'Failed', time: '10:28:17', date: '25 Nov 2026', reference: 'ORD-78117', reason: 'Insufficient funds' },
  { id: 'TXN-904815', customer: 'Reyansh Gupta', email: 'reyansh.g@samplemail.in', amount: 15999, currency: 'INR', gateway: 'PayU', method: 'Cards', status: 'Success', time: '10:24:02', date: '25 Nov 2026', reference: 'ORD-78116', reason: '—' },
  { id: 'TXN-904814', customer: 'Diya Malhotra', email: 'diya.m@samplemail.in', amount: 2200, currency: 'INR', gateway: 'Razorpay', method: 'UPI', status: 'Failed', time: '10:21:39', date: '25 Nov 2026', reference: 'ORD-78115', reason: 'Authentication failed' },
  { id: 'TXN-904813', customer: 'Kabir Sethi', email: 'kabir.s@samplemail.in', amount: 7400, currency: 'INR', gateway: 'Stripe', method: 'Cards', status: 'Success', time: '10:18:53', date: '25 Nov 2026', reference: 'ORD-78114', reason: '—' },
  { id: 'TXN-904812', customer: 'Myra Bose', email: 'myra.b@samplemail.in', amount: 5100, currency: 'INR', gateway: 'Cashfree', method: 'UPI', status: 'Failed', time: '10:16:11', date: '25 Nov 2026', reference: 'ORD-78113', reason: 'Network timeout' },
  { id: 'TXN-904811', customer: 'Arjun Verma', email: 'arjun.v@samplemail.in', amount: 3290, currency: 'INR', gateway: 'Razorpay', method: 'Cards', status: 'Success', time: '10:12:47', date: '25 Nov 2026', reference: 'ORD-78112', reason: '—' },
  { id: 'TXN-904810', customer: 'Tara Iyer', email: 'tara.i@samplemail.in', amount: 11999, currency: 'INR', gateway: 'PayU', method: 'Netbanking', status: 'Pending', time: '10:09:30', date: '25 Nov 2026', reference: 'ORD-78111', reason: 'Awaiting confirmation' },
  { id: 'TXN-904809', customer: 'Neil Dutta', email: 'neil.d@samplemail.in', amount: 875, currency: 'INR', gateway: 'Cashfree', method: 'UPI', status: 'Success', time: '10:05:09', date: '25 Nov 2026', reference: 'ORD-78110', reason: '—' },
  { id: 'TXN-904808', customer: 'Aadhya Roy', email: 'aadhya.r@samplemail.in', amount: 22400, currency: 'INR', gateway: 'Stripe', method: 'Cards', status: 'Failed', time: '10:01:22', date: '25 Nov 2026', reference: 'ORD-78109', reason: 'Do not honor' },
];

const gatewayData = [
  { name: 'Razorpay', code: 'RZ', color: '#635bff', share: 42, success: 96.8, latency: 420, volume: '₹1.04 Cr', cost: '1.85%' },
  { name: 'Cashfree', code: 'CF', color: '#159c83', share: 26, success: 94.9, latency: 510, volume: '₹64.5 L', cost: '1.72%' },
  { name: 'PayU', code: 'PU', color: '#ef9b37', share: 19, success: 92.7, latency: 680, volume: '₹47.1 L', cost: '1.90%' },
  { name: 'Stripe', code: 'ST', color: '#4278e8', share: 13, success: 91.4, latency: 730, volume: '₹32.2 L', cost: '2.10%' },
];

const timeSeries = [
  { label: '04 Nov', amount: 44, rate: 91.6 }, { label: '06 Nov', amount: 53, rate: 92.4 },
  { label: '08 Nov', amount: 48, rate: 91.9 }, { label: '10 Nov', amount: 67, rate: 93.3 },
  { label: '12 Nov', amount: 61, rate: 92.8 }, { label: '14 Nov', amount: 75, rate: 93.7 },
  { label: '16 Nov', amount: 70, rate: 93.1 }, { label: '18 Nov', amount: 83, rate: 94.4 },
  { label: '20 Nov', amount: 77, rate: 93.9 }, { label: '22 Nov', amount: 91, rate: 94.8 },
  { label: '24 Nov', amount: 87, rate: 94.1 }, { label: '25 Nov', amount: 98, rate: 94.2 },
];

const initialRecon = [
  { id: 'REC-2081', gateway: 'Razorpay', date: '25 Nov 2026', source: '₹12,499.00', internal: '₹12,499.00', variance: '₹0.00', state: 'Matched' },
  { id: 'REC-2080', gateway: 'Cashfree', date: '25 Nov 2026', source: '₹4,299.00', internal: '₹4,299.00', variance: '₹0.00', state: 'Matched' },
  { id: 'REC-2079', gateway: 'PayU', date: '25 Nov 2026', source: '₹6,480.00', internal: '₹6,180.00', variance: '₹300.00', state: 'Review' },
  { id: 'REC-2078', gateway: 'Stripe', date: '24 Nov 2026', source: '₹28,750.00', internal: '₹28,750.00', variance: '₹0.00', state: 'Matched' },
  { id: 'REC-2077', gateway: 'Razorpay', date: '24 Nov 2026', source: '₹2,200.00', internal: '₹2,200.00', variance: '₹0.00', state: 'Matched' },
  { id: 'REC-2076', gateway: 'Cashfree', date: '24 Nov 2026', source: '₹5,100.00', internal: '₹5,000.00', variance: '₹100.00', state: 'Review' },
];

const declineCauses = [
  { name: 'Issuer declined', key: 'do_not_honor', count: 2084, share: 38, note: 'Issuer returned a generic decline. Retry with a different instrument or contact the issuer.' },
  { name: 'Insufficient funds', key: 'insufficient_funds', count: 1315, share: 24, note: 'Offer a lower amount, split payment, or an alternate payment method.' },
  { name: 'Authentication failed', key: 'authentication_failed', count: 877, share: 16, note: 'Review 3DS / OTP completion and improve the retry experience.' },
  { name: 'Suspected fraud', key: 'suspected_fraud', count: 603, share: 11, note: 'Keep manual review for high-risk signals; avoid blind retries.' },
  { name: 'Network timeout', key: 'network_timeout', count: 438, share: 8, note: 'Use idempotent retry with exponential backoff and gateway health checks.' },
  { name: 'Other / unknown', key: 'other', count: 165, share: 3, note: 'Map raw processor codes to a standard decline taxonomy.' },
];

const navItems = [
  { id: 'overview', label: 'Overview', icon: '◫', group: 'WORKSPACE' },
  { id: 'transactions', label: 'Transactions', icon: '⇄', group: 'MONITOR' },
  { id: 'gateways', label: 'Gateway analytics', icon: '▥', group: 'MONITOR' },
  { id: 'declines', label: 'Decline intelligence', icon: '⌁', group: 'MONITOR' },
  { id: 'reconciliation', label: 'Reconciliation', icon: '◎', group: 'OPERATIONS', badge: '2' },
  { id: 'routing', label: 'Routing lab', icon: '⌘', group: 'OPTIMISE' },
];

const money = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(n || 0));
const shortMoney = (n) => `₹${(n / 10000000).toFixed(2)} Cr`;

function App() {
  const [page, setPage] = useState('overview');
  const [period, setPeriod] = useState('30D');
  const [transactions, setTransactions] = useState(initialTransactions);
  const [recon, setRecon] = useState(initialRecon);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [gatewayFilter, setGatewayFilter] = useState('All gateways');
  const [routeMode, setRouteMode] = useState('Balanced');
  const [simulation, setSimulation] = useState(false);
  const [toast, setToast] = useState('');
  const fileRef = useRef(null);

  const titleMap = {
    overview: ['Payments overview', 'Monitor payment health, gateway performance and settlement signals.'],
    transactions: ['Transactions', 'Search, filter and investigate individual payment attempts.'],
    gateways: ['Gateway analytics', 'Compare processor performance, latency, volume and cost.'],
    declines: ['Decline intelligence', 'Understand why payments fail and prioritise recovery actions.'],
    reconciliation: ['Reconciliation', 'Match gateway settlements against your internal payment ledger.'],
    routing: ['Routing lab', 'Simulate routing strategies against observed gateway performance.'],
  };

  const filteredTransactions = useMemo(() => transactions.filter((tx) => {
    const q = query.trim().toLowerCase();
    const queryMatch = !q || [tx.id, tx.customer, tx.email, tx.gateway, tx.reference, tx.reason].join(' ').toLowerCase().includes(q);
    const statusMatch = statusFilter === 'All statuses' || tx.status === statusFilter;
    const gatewayMatch = gatewayFilter === 'All gateways' || tx.gateway === gatewayFilter;
    return queryMatch && statusMatch && gatewayMatch;
  }), [transactions, query, statusFilter, gatewayFilter]);

  const flash = (message) => {
    setToast(message);
    window.clearTimeout(flash.timer);
    flash.timer = window.setTimeout(() => setToast(''), 2800);
  };

  const exportCsv = () => {
    const cols = ['id', 'customer', 'email', 'amount', 'currency', 'gateway', 'method', 'status', 'date', 'time', 'reference', 'reason'];
    const rows = [cols.join(','), ...filteredTransactions.map((tx) => cols.map((k) => `"${String(tx[k] ?? '').replaceAll('"', '""')}"`).join(','))];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'paypulse-transactions.csv'; a.click(); URL.revokeObjectURL(url);
    flash('CSV export prepared.');
  };

  const importCsv = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) { flash('The CSV does not contain transaction rows.'); return; }
    const parseLine = (line) => line.match(/("(?:[^"]|"")*"|[^,]*)(?:,|$)/g)?.map((v) => v.replace(/,$/, '').replace(/^"|"$/g, '').replaceAll('""', '"')) ?? [];
    const headers = parseLine(lines[0]).map((h) => h.trim().toLowerCase());
    const imported = lines.slice(1).map((line, index) => {
      const values = parseLine(line);
      const row = Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']));
      const amount = Number(row.amount ?? row.amount_inr ?? row.value ?? 0);
      const statusRaw = String(row.status ?? 'Pending').toLowerCase();
      const status = statusRaw.includes('success') || statusRaw.includes('paid') ? 'Success' : statusRaw.includes('fail') || statusRaw.includes('declin') ? 'Failed' : 'Pending';
      return {
        id: row.id || row.transaction_id || `IMPORTED-${String(index + 1).padStart(4, '0')}`,
        customer: row.customer || row.customer_name || 'Imported customer',
        email: row.email || '', amount, currency: row.currency || 'INR',
        gateway: row.gateway || row.processor || 'Unspecified',
        method: row.method || row.payment_method || 'Other', status,
        time: row.time || '—', date: row.date || row.timestamp || 'Imported',
        reference: row.reference || row.order_id || '—',
        reason: row.reason || row.failure_reason || '—',
      };
    }).filter((tx) => tx.amount >= 0);
    if (!imported.length) { flash('No usable transaction rows found.'); return; }
    setTransactions((current) => [...imported, ...current]);
    setPage('transactions');
    setQuery(''); setStatusFilter('All statuses'); setGatewayFilter('All gateways');
    flash(`${imported.length} transaction${imported.length === 1 ? '' : 's'} imported.`);
    event.target.value = '';
  };

  const resolveRecon = (id) => {
    setRecon((rows) => rows.map((row) => row.id === id ? { ...row, state: 'Resolved' } : row));
    flash(`${id} marked as resolved.`);
  };

  const runSimulation = () => {
    setSimulation(true);
    flash(`${routeMode} routing simulation completed.`);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark"><span></span><span></span><span></span></div>
          <div><div className="brand-name">paypulse<span>.</span></div><div className="brand-subtitle">PAYMENT INTELLIGENCE</div></div>
        </div>
        <div className="workspace-switcher">
          <div className="workspace-avatar">NS</div>
          <div className="workspace-copy"><strong>Northstar Commerce</strong><small>Demo workspace</small></div>
          <span className="chevron">⌄</span>
        </div>
        <nav className="side-nav">
          {['WORKSPACE', 'MONITOR', 'OPERATIONS', 'OPTIMISE'].map((group) => {
            const items = navItems.filter((item) => item.group === group);
            if (!items.length) return null;
            return <div className="nav-group" key={group}>
              <div className="nav-label">{group}</div>
              {items.map((item) => <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => setPage(item.id)}>
                <span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>)}
            </div>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon">?</div><strong>Need a hand?</strong><p>Explore the demo data and workflows.</p><button onClick={() => flash('This is a self-guided demo workspace.')}>Visit help centre <span>↗</span></button></div>
          <div className="profile-row"><div className="profile-avatar">KK</div><div className="profile-meta"><strong>Workspace Admin</strong><small>admin@northstar.demo</small></div><span className="more-dots">···</span></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>{titleMap[page][0]}</strong></div>
          <div className="top-actions">
            <span className="live-indicator"><i></i> DEMO ENVIRONMENT</span>
            <button className="icon-button" title="Notifications" onClick={() => flash('You are all caught up.')}>♧<i className="notification-dot"></i></button>
            <div className="top-avatar">KK</div>
          </div>
        </header>
        <div className="page-content">
          <div className="page-heading-row">
            <div><div className="eyebrow">PAYMENT OPERATIONS <span>•</span> WEDNESDAY, 25 NOVEMBER 2026</div><h1>{titleMap[page][0]}</h1><p className="page-description">{titleMap[page][1]}</p></div>
            <div className="page-actions">
              <input ref={fileRef} type="file" accept=".csv,text/csv" hidden onChange={importCsv} />
              <button className="button button-quiet" onClick={() => fileRef.current?.click()}><span>↑</span> Import CSV</button>
              <button className="button button-primary" onClick={exportCsv}><span>↓</span> Export data</button>
            </div>
          </div>

          {page === 'overview' && <Overview transactions={transactions} period={period} setPeriod={setPeriod} setPage={setPage} />}
          {page === 'transactions' && <Transactions transactions={filteredTransactions} query={query} setQuery={setQuery} statusFilter={statusFilter} setStatusFilter={setStatusFilter} gatewayFilter={gatewayFilter} setGatewayFilter={setGatewayFilter} />}
          {page === 'gateways' && <Gateways />}
          {page === 'declines' && <Declines />}
          {page === 'reconciliation' && <Reconciliation recon={recon} resolveRecon={resolveRecon} />}
          {page === 'routing' && <Routing routeMode={routeMode} setRouteMode={setRouteMode} simulation={simulation} runSimulation={runSimulation} />}

          <footer className="app-footer"><span>PayPulse <b>v1.0.0</b></span><span>Illustrative demo data · Not connected to live payment processors</span><span>© 2026 PayPulse</span></footer>
        </div>
      </main>
      {toast && <div className="toast"><span className="toast-check">✓</span>{toast}</div>}
    </div>
  );
}

function Overview({ transactions, period, setPeriod, setPage }) {
  const successCount = transactions.filter((t) => t.status === 'Success').length;
  const failedCount = transactions.filter((t) => t.status === 'Failed').length;
  return <>
    <div className="overview-toolbar"><div className="data-context"><span className="pulse-dot"></span> Data updated 2 minutes ago <span className="context-divider">|</span> All payment channels</div><div className="period-switch">{['7D', '30D', '90D'].map((p) => <button key={p} onClick={() => setPeriod(p)} className={period === p ? 'selected' : ''}>{p}</button>)}</div></div>
    <section className="metric-grid">
      <Metric label="Total processed volume" value="₹2.48 Cr" change="12.8%" detail="vs. previous period" icon="↗" tone="teal" spark={[25, 32, 29, 44, 39, 53, 48, 62]} />
      <Metric label="Payment success rate" value="94.2%" change="2.4%" detail="vs. previous period" icon="✓" tone="blue" spark={[34, 38, 35, 44, 42, 51, 49, 61]} />
      <Metric label="Failed transactions" value="5,482" change="8.1%" detail="vs. previous period" icon="!" tone="orange" negative spark={[55, 49, 53, 42, 46, 35, 37, 31]} />
      <Metric label="Reconciliation match" value="99.6%" change="0.6%" detail="vs. previous period" icon="◎" tone="purple" spark={[37, 39, 43, 42, 49, 51, 57, 61]} />
    </section>
    <section className="chart-grid">
      <div className="panel performance-panel">
        <div className="panel-heading"><div><h2>Payment performance</h2><p>Processed volume and success rate over time</p></div><button className="more-button" onClick={() => setPage('transactions')}>View transactions <span>→</span></button></div>
        <div className="chart-legend"><span><i className="legend-volume"></i> Volume (₹ Lakhs)</span><span><i className="legend-success"></i> Success rate</span></div>
        <PerformanceChart />
      </div>
      <div className="panel gateway-mix-panel">
        <div className="panel-heading"><div><h2>Gateway mix</h2><p>Share of processed volume</p></div><button className="dots-button" onClick={() => setPage('gateways')}>···</button></div>
        <div className="gateway-mix-content"><div className="donut-wrap"><div className="donut"><div className="donut-label"><strong>₹2.48</strong><small>Cr volume</small></div></div></div>
          <div className="mix-legend">{gatewayData.map((g) => <div className="mix-row" key={g.name}><span className="mix-name"><i style={{ background: g.color }}></i>{g.name}</span><strong>{g.share}%</strong></div>)}</div></div>
        <div className="mix-footnote"><span className="mini-check">✓</span> 4 active gateways contributing to volume</div>
      </div>
    </section>
    <section className="lower-grid">
      <div className="panel gateway-health-panel">
        <div className="panel-heading"><div><h2>Gateway health</h2><p>Real-time processor performance snapshot</p></div><button className="more-button" onClick={() => setPage('gateways')}>See all <span>→</span></button></div>
        <div className="gateway-table-head"><span>GATEWAY</span><span>SUCCESS RATE</span><span>AVG. LATENCY</span><span>STATUS</span></div>
        {gatewayData.map((g) => <div className="gateway-health-row" key={g.name}><div className="gateway-ident"><span className="gateway-logo" style={{ color: g.color, background: `${g.color}14` }}>{g.code}</span><strong>{g.name}</strong></div><div className="rate-cell"><strong>{g.success}%</strong><div className="tiny-progress"><i style={{ width: `${g.success}%`, background: g.color }}></i></div></div><strong className="latency-cell">{g.latency} ms</strong><span className={`health-status ${g.success > 94 ? 'healthy' : 'watch'}`}><i></i>{g.success > 94 ? 'Healthy' : 'Watch'}</span></div>)}
      </div>
      <div className="panel insights-panel">
        <div className="panel-heading"><div><h2>Pulse insights</h2><p>Signals worth your attention</p></div><span className="insight-count">3 NEW</span></div>
        <Insight color="orange" icon="↘" title="PayU success rate dipped" text="Success rate is 1.8 percentage points below its 7-day baseline." tag="GATEWAY ALERT" />
        <Insight color="blue" icon="⌁" title="UPI is your strongest channel" text="UPI contributes 61% of volume with a 96.1% success rate." tag="CHANNEL TREND" />
        <Insight color="purple" icon="◎" title="Two settlement variances" text="Two items need review before today's reconciliation is closed." tag="ACTION REQUIRED" />
      </div>
    </section>
    <section className="panel recent-panel"><div className="panel-heading"><div><h2>Recent transactions</h2><p>Latest payment activity across all gateways</p></div><button className="more-button" onClick={() => setPage('transactions')}>View all transactions <span>→</span></button></div><TransactionTable transactions={transactions.slice(0, 6)} compact /></section>
  </>;
}

function Metric({ label, value, change, detail, icon, tone, negative, spark }) {
  const points = spark.map((v, i) => `${i * 11},${37 - v * .42}`).join(' ');
  return <div className="metric-card"><div className="metric-top"><span>{label}</span><span className={`metric-icon ${tone}`}>{icon}</span></div><div className="metric-value-row"><strong>{value}</strong><svg className="sparkline" viewBox="0 0 78 40" aria-hidden="true"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className="metric-bottom"><span className={`metric-change ${negative ? 'down' : ''}`}>{negative ? '↘' : '↗'} {change}</span><span>{detail}</span></div></div>;
}

function PerformanceChart() {
  const points = timeSeries.map((d, i) => ({ x: 30 + i * 57, y: 196 - d.amount * 1.45 }));
  const line = points.map((p) => `${p.x},${p.y}`).join(' ');
  const area = `30,205 ${line} 657,205`;
  const success = timeSeries.map((d, i) => ({ x: 30 + i * 57, y: 190 - (d.rate - 90) * 20 }));
  const successLine = success.map((p) => `${p.x},${p.y}`).join(' ');
  return <div className="performance-chart"><svg viewBox="0 0 690 245" preserveAspectRatio="none" role="img" aria-label="Payment volume and success rate trend"><defs><linearGradient id="volumeFade" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3e8dff" stopOpacity=".22"/><stop offset="100%" stopColor="#3e8dff" stopOpacity="0"/></linearGradient></defs>
    {[35, 78, 121, 164, 207].map((y) => <line key={y} x1="30" y1={y} x2="660" y2={y} stroke="#edf0f5" strokeDasharray="4 5" />)}
    <polygon points={area} fill="url(#volumeFade)"/><polyline points={line} fill="none" stroke="#4289ed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><polyline points={successLine} fill="none" stroke="#18a68e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5"/>
    {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.2" fill="#fff" stroke="#4289ed" strokeWidth="2" />)}
    {['04 Nov', '08 Nov', '12 Nov', '16 Nov', '20 Nov', '25 Nov'].map((label, i) => <text key={label} x={30 + i * 126} y="232" fill="#9aa4b3" fontSize="10">{label}</text>)}
  </svg><div className="chart-y-labels"><span>₹100L</span><span>₹75L</span><span>₹50L</span><span>₹25L</span><span>₹0</span></div></div>;
}

function Insight({ color, icon, title, text, tag }) {
  return <div className="insight-row"><span className={`insight-icon ${color}`}>{icon}</span><div className="insight-copy"><div className="insight-title-row"><strong>{title}</strong><span className={`insight-tag ${color}`}>{tag}</span></div><p>{text}</p></div></div>;
}

function Transactions({ transactions, query, setQuery, statusFilter, setStatusFilter, gatewayFilter, setGatewayFilter }) {
  return <>
    <section className="metric-grid compact-metrics">
      <Metric label="Visible transactions" value={transactions.length.toLocaleString('en-IN')} change="Live view" detail="current filter" icon="⇄" tone="blue" spark={[34, 40, 38, 49, 44, 53, 58, 62]} />
      <Metric label="Successful" value={transactions.filter((t) => t.status === 'Success').length.toLocaleString('en-IN')} change="Captured" detail="in visible results" icon="✓" tone="teal" spark={[27, 34, 36, 43, 46, 52, 56, 62]} />
      <Metric label="Failed / declined" value={transactions.filter((t) => t.status === 'Failed').length.toLocaleString('en-IN')} change="Needs review" detail="in visible results" icon="!" tone="orange" spark={[59, 54, 51, 45, 42, 36, 33, 29]} />
      <Metric label="Pending" value={transactions.filter((t) => t.status === 'Pending').length.toLocaleString('en-IN')} change="In progress" detail="in visible results" icon="◷" tone="purple" spark={[25, 29, 34, 33, 39, 42, 47, 51]} />
    </section>
    <section className="panel transactions-panel"><div className="table-toolbar"><div><h2>All transactions</h2><p>{transactions.length} records match your current filters</p></div><div className="filters"><div className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ID, customer, gateway..." /></div><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All statuses</option><option>Success</option><option>Failed</option><option>Pending</option></select><select value={gatewayFilter} onChange={(e) => setGatewayFilter(e.target.value)}><option>All gateways</option>{gatewayData.map((g) => <option key={g.name}>{g.name}</option>)}</select></div></div><TransactionTable transactions={transactions} /></section>
    <div className="source-note">Showing imported and illustrative transaction records. Use <strong>Import CSV</strong> to append your own sample data in this browser session.</div>
  </>;
}

function TransactionTable({ transactions, compact = false }) {
  if (!transactions.length) return <div className="empty-state"><span>⌕</span><strong>No matching transactions</strong><p>Try a different search term or clear the filters.</p></div>;
  return <div className="table-scroll"><table className="data-table"><thead><tr><th>TRANSACTION</th><th>CUSTOMER</th><th>GATEWAY</th><th>METHOD</th><th>AMOUNT</th><th>TIME</th><th>STATUS</th></tr></thead><tbody>{transactions.map((tx) => <tr key={`${tx.id}-${tx.time}`}><td><strong className="mono-id">{tx.id}</strong><small className="subcell">{tx.reference}</small></td><td><strong>{tx.customer}</strong><small className="subcell">{tx.email || '—'}</small></td><td><span className="gateway-cell"><i className={`gateway-mini ${tx.gateway.toLowerCase().slice(0, 2)}`}>{tx.gateway.slice(0, 1)}</i>{tx.gateway}</span></td><td>{tx.method}</td><td className="amount-cell">{money(tx.amount)}</td><td><span>{tx.time}</span><small className="subcell">{tx.date}</small></td><td><Status status={tx.status} /></td></tr>)}</tbody></table></div>;
}

function Status({ status }) { return <span className={`status-pill ${status.toLowerCase()}`}><i></i>{status}</span>; }

function Gateways() {
  return <>
    <section className="metric-grid compact-metrics"><Metric label="Active gateways" value="4" change="Connected" detail="demo processors" icon="▥" tone="blue" spark={[42, 42, 42, 42, 42, 42, 42, 42]} /><Metric label="Best performer" value="Razorpay" change="96.8%" detail="success rate" icon="✦" tone="teal" spark={[42, 48, 44, 53, 57, 53, 63, 68]} /><Metric label="Avg. authorisation" value="94.2%" change="+2.4%" detail="vs. previous period" icon="✓" tone="purple" spark={[31, 35, 39, 38, 44, 49, 52, 58]} /><Metric label="Avg. response time" value="585 ms" change="-4.2%" detail="vs. previous period" icon="◷" tone="orange" spark={[63, 57, 53, 51, 47, 43, 40, 36]} /></section>
    <section className="panel gateway-detail-panel"><div className="panel-heading"><div><h2>Processor scorecard</h2><p>Compare success rate, response time and cost by gateway</p></div><span className="period-chip">LAST 30 DAYS</span></div><div className="gateway-score-list">{gatewayData.map((g, i) => <div className="gateway-score" key={g.name}><div className="gateway-score-name"><span className="gateway-logo large" style={{ color: g.color, background: `${g.color}14` }}>{g.code}</span><div><strong>{g.name}</strong><small>{['Primary acquiring partner', 'Secondary UPI partner', 'Cards & netbanking', 'International cards'][i]}</small></div></div><div className="score-metric"><strong>{g.success}%</strong><small>Success rate</small><div className="score-track"><i style={{ width: `${g.success}%`, background: g.color }}></i></div></div><div className="score-metric"><strong>{g.latency} <small>ms</small></strong><small>Avg. latency</small></div><div className="score-metric"><strong>{g.volume}</strong><small>Processed volume</small></div><div className="score-metric"><strong>{g.cost}</strong><small>Indicative fee</small></div><Status status={g.success > 94 ? 'Success' : 'Pending'} /></div>)}</div></section>
    <section className="two-card-grid"><div className="panel"><div className="panel-heading"><div><h2>Gateway observations</h2><p>Signals from this demo period</p></div></div><div className="observation"><span className="observation-dot teal-dot"></span><div><strong>Razorpay is leading on authorisation</strong><p>Highest observed success rate at 96.8%, with the fastest response time.</p></div></div><div className="observation"><span className="observation-dot orange-dot"></span><div><strong>Stripe needs latency attention</strong><p>Average response time is 730 ms, the slowest among configured processors.</p></div></div></div><div className="panel"><div className="panel-heading"><div><h2>Suggested next steps</h2><p>Operational actions to consider</p></div></div><ul className="action-list"><li>Review PayU issuer-decline codes and retry policy.</li><li>Track Stripe p95 latency before changing traffic allocation.</li><li>Validate fee assumptions against your commercial contracts.</li></ul></div></section>
  </>;
}

function Declines() {
  return <>
    <section className="metric-grid compact-metrics"><Metric label="Declined attempts" value="5,482" change="8.1%" detail="vs. previous period" icon="!" tone="orange" negative spark={[59, 52, 55, 48, 43, 39, 34, 28]} /><Metric label="Recoverable declines" value="62%" change="Est. opportunity" detail="heuristic classification" icon="↗" tone="teal" spark={[30, 36, 34, 41, 48, 45, 56, 62]} /><Metric label="Top decline category" value="Issuer" change="38%" detail="of all declines" icon="⌁" tone="blue" spark={[61, 60, 60, 60, 60, 60, 60, 60]} /><Metric label="Potential recovered value" value="₹8.4 L" change="Illustrative" detail="based on assumed recovery" icon="₹" tone="purple" spark={[25, 28, 33, 39, 42, 49, 54, 60]} /></section>
    <section className="panel decline-panel"><div className="panel-heading"><div><h2>Decline reason breakdown</h2><p>Standardised categories across payment attempts</p></div><span className="period-chip">LAST 30 DAYS</span></div>{declineCauses.map((cause, i) => <div className="decline-row" key={cause.key}><div className="decline-name"><span className={`decline-rank rank-${i + 1}`}>{String(i + 1).padStart(2, '0')}</span><div><strong>{cause.name}</strong><small>{cause.key}</small></div></div><div className="decline-bar"><i style={{ width: `${cause.share}%` }}></i></div><strong className="decline-count">{cause.count.toLocaleString('en-IN')}</strong><strong className="decline-share">{cause.share}%</strong></div>)}</section>
    <section className="panel recovery-panel"><div className="panel-heading"><div><h2>Recovery playbook</h2><p>Suggested interventions mapped to decline patterns</p></div><span className="ai-label">✦ PRODUCT INSIGHTS</span></div><div className="recovery-grid">{declineCauses.slice(0, 4).map((cause) => <div className="recovery-card" key={cause.key}><span className="recovery-tag">{cause.share}% OF DECLINES</span><h3>{cause.name}</h3><p>{cause.note}</p><span className="recovery-link">View affected transactions <b>→</b></span></div>)}</div></section>
  </>;
}

function Reconciliation({ recon, resolveRecon }) {
  const matched = recon.filter((r) => r.state === 'Matched' || r.state === 'Resolved').length;
  const needsReview = recon.filter((r) => r.state === 'Review').length;
  return <>
    <section className="metric-grid compact-metrics"><Metric label="Matched records" value={`${matched}/${recon.length}`} change="Reconciled" detail="current sample" icon="✓" tone="teal" spark={[30, 35, 40, 45, 49, 54, 58, 64]} /><Metric label="Needs review" value={String(needsReview)} change="Open items" detail="requires investigation" icon="!" tone="orange" spark={[64, 59, 53, 47, 44, 39, 34, 29]} /><Metric label="Match rate" value={`${recon.length ? (matched / recon.length * 100).toFixed(1) : '0.0'}%`} change="Current batch" detail="record-level match" icon="◎" tone="blue" spark={[32, 41, 44, 48, 50, 56, 60, 65]} /><Metric label="Variance under review" value="₹400" change="2 exceptions" detail="illustrative sample" icon="₹" tone="purple" spark={[52, 50, 48, 46, 44, 42, 40, 38]} /></section>
    <section className="panel reconciliation-panel"><div className="table-toolbar"><div><h2>Settlement matching</h2><p>Gateway settlement lines vs. internal ledger</p></div><span className="period-chip">BATCH · 25 NOV 2026</span></div><div className="recon-table-wrap"><table className="data-table recon-table"><thead><tr><th>RECON ID</th><th>GATEWAY</th><th>SETTLEMENT DATE</th><th>GATEWAY AMOUNT</th><th>INTERNAL AMOUNT</th><th>VARIANCE</th><th>STATUS / ACTION</th></tr></thead><tbody>{recon.map((r) => <tr key={r.id}><td><strong className="mono-id">{r.id}</strong></td><td>{r.gateway}</td><td>{r.date}</td><td className="amount-cell">{r.source}</td><td className="amount-cell">{r.internal}</td><td className={r.variance === '₹0.00' ? 'muted-cell' : 'variance-cell'}>{r.variance}</td><td>{r.state === 'Review' ? <button className="resolve-button" onClick={() => resolveRecon(r.id)}>Mark resolved</button> : <Status status={r.state === 'Matched' ? 'Success' : 'Pending'} />}</td></tr>)}</tbody></table></div></section>
    <div className="recon-note"><span className="note-icon">i</span><div><strong>How to read this workspace</strong><p>Matched rows have equal source and internal values. Review rows contain an illustrative variance and should be investigated against the underlying settlement file before closing a real batch.</p></div></div>
  </>;
}

function Routing({ routeMode, setRouteMode, simulation, runSimulation }) {
  const modes = {
    Balanced: { subtitle: 'Balance authorisation performance and processing cost.', success: '96.1%', cost: '1.84%', allocation: [48, 27, 17, 8], recommendation: 'Route eligible UPI and domestic card traffic to Razorpay first; fail over to Cashfree when latency or error thresholds are breached.' },
    'Maximise success': { subtitle: 'Prioritise the gateway with the strongest observed approval rate.', success: '96.8%', cost: '1.91%', allocation: [65, 20, 10, 5], recommendation: 'Concentrate eligible traffic on Razorpay, retaining Cashfree as the immediate fallback to avoid a single-processor dependency.' },
    'Minimise cost': { subtitle: 'Prefer the lowest indicative processing fee within health guardrails.', success: '94.8%', cost: '1.74%', allocation: [25, 40, 25, 10], recommendation: 'Increase Cashfree allocation for eligible low-risk payments; maintain a success-rate floor before routing more volume.' },
  };
  const active = modes[routeMode];
  return <>
    <section className="routing-intro"><div className="routing-intro-copy"><span className="ai-label">✦ ROUTING DECISION WORKBENCH</span><h2>Make every payment attempt count.</h2><p>Explore how different routing objectives change processor allocation using the illustrative gateway signals in this workspace.</p></div><div className="routing-orb"><div className="orb-core">↗</div><span className="orb-node node-a">RZ</span><span className="orb-node node-b">CF</span><span className="orb-node node-c">PU</span><span className="orb-node node-d">ST</span></div></section>
    <section className="panel strategy-panel"><div className="panel-heading"><div><h2>Routing strategy</h2><p>Choose an objective to calculate an illustrative traffic split</p></div><span className="period-chip">SIMULATION MODE</span></div><div className="strategy-options">{Object.keys(modes).map((mode, i) => <button key={mode} onClick={() => { setRouteMode(mode); }} className={`strategy-option ${routeMode === mode ? 'chosen' : ''}`}><span className="strategy-radio">{routeMode === mode && <i />}</span><div><strong>{mode}</strong><p>{modes[mode].subtitle}</p></div><span className="strategy-number">0{i + 1}</span></button>)}</div><div className="strategy-footer"><span>Simulation uses gateway success, latency and fee assumptions shown in this demo.</span><button className="button button-primary" onClick={runSimulation}>Run simulation <span>→</span></button></div></section>
    <section className="routing-results"><div className="panel routing-result-panel"><div className="panel-heading"><div><h2>Projected outcome</h2><p>{simulation ? `${routeMode} strategy · simulation complete` : 'Preview based on selected strategy'}</p></div><span className="result-status"><i></i>{simulation ? 'SIMULATED' : 'PREVIEW'}</span></div><div className="projected-metrics"><div><small>Estimated success rate</small><strong>{active.success}</strong><span className="positive-text">↑ +1.9 pts vs. baseline</span></div><div><small>Indicative processing fee</small><strong>{active.cost}</strong><span className="neutral-text">Weighted average assumption</span></div></div><div className="allocation-heading"><strong>Traffic allocation</strong><span>Illustrative share by gateway</span></div>{gatewayData.map((g, i) => <div className="allocation-row" key={g.name}><div className="allocation-gateway"><span className="allocation-dot" style={{ background: g.color }}></span>{g.name}</div><div className="allocation-track"><i style={{ width: `${active.allocation[i]}%`, background: g.color }}></i></div><strong>{active.allocation[i]}%</strong></div>)}</div><div className="panel routing-advice"><div className="advice-icon">✦</div><span className="ai-label">PULSE RECOMMENDATION</span><h3>Suggested routing policy</h3><p>{active.recommendation}</p><div className="advice-disclaimer">Recommendations are illustrative only. A production policy needs live gateway health, payment-method eligibility, commercial terms, idempotency controls and risk rules.</div></div></section>
  </>;
}

export default App;
