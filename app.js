const { useState } = React;

const sectors = [
  "Comercial",
  "PCP/COMPRAS",
  "Produção",
  "Qualidade",
  "Engenharia de Processos",
  "Engenharia de Produto",
  "Manutenção",
  "RH",
  "Segurança do trabalho",
];

const kpiCards = [
  {
    title: "Eficiência Global",
    value: "92,4%",
    status: "success",
    subtitle: "Meta 90%",
  },
  {
    title: "Custo por Unidade",
    value: "R$ 14,32",
    status: "warning",
    subtitle: "Meta R$ 13,50",
  },
  {
    title: "SLA de Entregas",
    value: "88%",
    status: "danger",
    subtitle: "Meta 95%",
  },
];

const permissionRows = [
  {
    role: "Diretoria",
    user: "Camila Braga",
    access: "Total",
    status: "active",
  },
  {
    role: "Gestor de Produção",
    user: "Rafael Mendes",
    access: "Indicadores + Planos",
    status: "active",
  },
  {
    role: "Analista de Qualidade",
    user: "Isabela Torres",
    access: "Indicadores",
    status: "limited",
  },
  {
    role: "Terceiro",
    user: "Fornecedor A",
    access: "Somente relatórios",
    status: "blocked",
  },
];

const actionPlans = [
  {
    title: "Plano de redução de retrabalho",
    owner: "Equipe Qualidade",
    due: "25/09",
    progress: "Em andamento",
  },
  {
    title: "Campanha de compras estratégicas",
    owner: "PCP/Compras",
    due: "30/09",
    progress: "Aguardando aprovação",
  },
  {
    title: "Ajuste de setup de máquinas",
    owner: "Manutenção",
    due: "02/10",
    progress: "Programado",
  },
];

const indicatorRows = [
  {
    name: "Lead time médio",
    description: "Tempo entre pedido e entrega",
    status: "warning",
    value: "11,4 dias",
  },
  {
    name: "Índice de satisfação",
    description: "NPS dos clientes",
    status: "success",
    value: "78",
  },
  {
    name: "Disponibilidade operacional",
    description: "Tempo produtivo vs total",
    status: "danger",
    value: "81%",
  },
];

function LoginView({ onContinue }) {
  return (
    <div className="login-screen">
      <section className="login-hero">
        <div>
          <div className="brand">
            <div className="brand-logo">GT</div>
            <h1>GT Indicators</h1>
          </div>
          <h2>Inteligência para decisões críticas.</h2>
          <p>
            Plataforma ERP e indicadores em tempo real conectada ao Auth0, Google
            Sheets e banco PostgreSQL na Neon.
          </p>
        </div>
        <ul>
          <li>✔️ Controle de permissões e cargos com auditoria.</li>
          <li>✔️ Portais setoriais com filtros inteligentes.</li>
          <li>✔️ Planos de ação integrados aos desvios de meta.</li>
        </ul>
      </section>
      <section className="login-panel">
        <h3>Acesse seu ambiente seguro</h3>
        <p>
          Use o login corporativo via Auth0 para validar perfis, multi-fator e
          políticas de acesso.
        </p>
        <form>
          <input type="email" placeholder="E-mail corporativo" />
          <input type="password" placeholder="Senha" />
          <button type="button" className="button primary" onClick={onContinue}>
            Entrar com Auth0
          </button>
        </form>
        <button type="button" className="button ghost" onClick={onContinue}>
          Acesso demonstrativo
        </button>
      </section>
    </div>
  );
}

function Sidebar({ activeSector, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">GT</div>
        <div>
          <h1>GT Indicators</h1>
          <span>ERP Analytics</span>
        </div>
      </div>
      <nav>
        <span className="nav-section">Módulos</span>
        <div className="nav-item active">Visão Geral</div>
        <div className="nav-item">Permissões</div>
        <div className="nav-item">Usuários</div>
        <span className="nav-section">Setores</span>
        {sectors.map((sector) => (
          <div
            key={sector}
            className={`nav-item ${activeSector === sector ? "active" : ""}`}
            onClick={() => onSelect(sector)}
          >
            <span>{sector}</span>
            <span className="nav-badge">{Math.floor(Math.random() * 8) + 6}</span>
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <strong>Ambiente seguro</strong>
        <span>SSO + MFA | Auth0</span>
        <span>Neon PostgreSQL + Google Sheets</span>
      </div>
    </aside>
  );
}

function TopBar({ onDownload }) {
  return (
    <header className="topbar">
      <div>
        <strong>Olá, Larissa</strong>
        <div style={{ color: "var(--gray-600)" }}>
          Gestão executiva • Última atualização há 3 min
        </div>
      </div>
      <div className="search">
        <input type="text" placeholder="Buscar indicadores, áreas ou relatórios" />
      </div>
      <div className="user-chip">
        <div>
          <div style={{ fontWeight: 600 }}>Larissa Duarte</div>
          <div style={{ fontSize: 12, color: "var(--gray-600)" }}>Diretoria</div>
        </div>
        <div className="user-avatar">LD</div>
      </div>
      <button type="button" className="button secondary" onClick={onDownload}>
        Exportar painel
      </button>
    </header>
  );
}

function PermissionTable() {
  return (
    <div className="card">
      <h3>Gestão de permissões</h3>
      <p style={{ color: "var(--gray-600)", marginBottom: 12 }}>
        Controle granular por perfil, cargo e centro de custo.
      </p>
      <table className="permission-table">
        <thead>
          <tr>
            <th>Cargo</th>
            <th>Usuário</th>
            <th>Escopo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {permissionRows.map((row) => (
            <tr key={row.role}>
              <td>{row.role}</td>
              <td>{row.user}</td>
              <td>{row.access}</td>
              <td>
                <span className={`status-pill ${row.status}`}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectorDashboard({ sector }) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>{sector}</h2>
          <p>
            Indicadores estratégicos, filtros inteligentes e planos de ação para
            garantir metas por setor.
          </p>
        </div>
        <div className="action-buttons">
          <button className="button primary" type="button">
            Novo plano de ação
          </button>
          <button className="button ghost" type="button">
            Atualizar dados
          </button>
        </div>
      </div>

      <div className="filter-panel">
        <select>
          <option>Período: Últimos 30 dias</option>
          <option>Período: Trimestre atual</option>
          <option>Período: Ano</option>
        </select>
        <select>
          <option>Meta: Geral</option>
          <option>Meta: Crítica</option>
          <option>Meta: Potencial</option>
        </select>
        <select>
          <option>Fonte: Google Sheets</option>
          <option>Fonte: Neon PostgreSQL</option>
        </select>
        <input type="text" placeholder="Filtrar por indicador" />
      </div>

      <div className="grid columns-3" style={{ marginTop: 24 }}>
        {kpiCards.map((card) => (
          <div className="card" key={card.title}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{card.title}</h3>
              <span className={`badge ${card.status}`}>{card.subtitle}</span>
            </div>
            <div className="metric">{card.value}</div>
            <p style={{ color: "var(--gray-600)" }}>
              Origem: {card.status === "success" ? "Neon" : "Sheets"}
            </p>
          </div>
        ))}
      </div>

      <div className="grid columns-2" style={{ marginTop: 24 }}>
        <div className="card">
          <h3>Performance do setor</h3>
          <div className="chart-placeholder">Gráfico dinâmico (API pronta)</div>
        </div>
        <div className="card">
          <h3>Plano de ação & acompanhamento</h3>
          <div className="actions-board">
            {actionPlans.map((action) => (
              <div className="action-card" key={action.title}>
                <strong>{action.title}</strong>
                <div style={{ fontSize: 13, color: "var(--gray-600)" }}>
                  Responsável: {action.owner}
                </div>
                <div style={{ fontSize: 13, color: "var(--gray-600)" }}>
                  Prazo: {action.due} • {action.progress}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className="section-title">Indicadores críticos</h3>
      <div className="kpi-list">
        {indicatorRows.map((row) => (
          <div className="kpi-item" key={row.name}>
            <div>
              <strong>{row.name}</strong>
              <div>
                <span>{row.description}</span>
              </div>
            </div>
            <div className="kpi-status">
              <span className={`badge ${row.status}`}>{row.value}</span>
              <button className="button ghost" type="button">
                Baixar relatório
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PortalLayout() {
  const [activeSector, setActiveSector] = useState(sectors[0]);

  const handleDownload = () => {
    window.alert("Relatório exportado com sucesso!");
  };

  return (
    <div className="app-shell">
      <Sidebar activeSector={activeSector} onSelect={setActiveSector} />
      <main className="main-content">
        <TopBar onDownload={handleDownload} />
        <section className="grid columns-2">
          <div className="card">
            <h3>Conexões de dados</h3>
            <p style={{ color: "var(--gray-600)" }}>
              Integração ativa com Google Sheets para operações táticas e Neon
              PostgreSQL para histórico e analytics avançado.
            </p>
            <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
              <div className="kpi-item">
                <div>
                  <strong>Google Sheets</strong>
                  <div>
                    <span>12 planilhas sincronizadas</span>
                  </div>
                </div>
                <span className="badge success">Online</span>
              </div>
              <div className="kpi-item">
                <div>
                  <strong>Neon PostgreSQL</strong>
                  <div>
                    <span>Clusters em tempo real</span>
                  </div>
                </div>
                <span className="badge success">Online</span>
              </div>
            </div>
          </div>
          <div className="card">
            <h3>Segurança e conformidade</h3>
            <p style={{ color: "var(--gray-600)" }}>
              Single Sign-On, trilhas de auditoria e gestão de acessos por cargo
              com autenticação via Auth0.
            </p>
            <PermissionTable />
          </div>
        </section>
        <SectorDashboard sector={activeSector} />
      </main>
    </div>
  );
}

function App() {
  const [stage, setStage] = useState("login");

  if (stage === "login") {
    return <LoginView onContinue={() => setStage("portal")} />;
  }

  return <PortalLayout />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
