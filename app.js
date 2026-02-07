const { useMemo, useState } = React;

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

const sectorIndicators = {
  Comercial: [
    { title: "Conversão de propostas", value: "38%", status: "success" },
    { title: "Pipeline ativo", value: "R$ 2,4M", status: "success" },
    { title: "Ticket médio", value: "R$ 18,9k", status: "warning" },
    { title: "Churn mensal", value: "2,6%", status: "warning" },
  ],
  "PCP/COMPRAS": [
    { title: "Lead time de compras", value: "9,2 dias", status: "warning" },
    { title: "Eficiência de estoque", value: "93%", status: "success" },
    { title: "Rupturas críticas", value: "4", status: "danger" },
    { title: "Savings negociados", value: "R$ 112k", status: "success" },
  ],
  Produção: [
    { title: "OEE", value: "86%", status: "warning" },
    { title: "Eficiência por turno", value: "92%", status: "success" },
    { title: "Scrap", value: "3,1%", status: "warning" },
    { title: "Backlog", value: "1,6 dias", status: "success" },
  ],
  Qualidade: [
    { title: "RIFs abertas", value: "18", status: "danger" },
    { title: "NC internas", value: "6", status: "warning" },
    { title: "Auditorias em dia", value: "97%", status: "success" },
    { title: "PPM clientes", value: "420", status: "warning" },
  ],
  "Engenharia de Processos": [
    { title: "Tempo de setup", value: "42 min", status: "warning" },
    { title: "Kaizens ativos", value: "9", status: "success" },
    { title: "Desvios de processo", value: "3", status: "warning" },
    { title: "Ganho de capacidade", value: "+6%", status: "success" },
  ],
  "Engenharia de Produto": [
    { title: "Projetos em desenvolvimento", value: "12", status: "success" },
    { title: "Stage-gate on time", value: "84%", status: "warning" },
    { title: "Mudanças de engenharia", value: "7", status: "warning" },
    { title: "Custo alvo", value: "98%", status: "success" },
  ],
  Manutenção: [
    { title: "Disponibilidade", value: "91%", status: "warning" },
    { title: "MTBF", value: "72h", status: "success" },
    { title: "MTTR", value: "2h 12m", status: "success" },
    { title: "Backlog preventivo", value: "14%", status: "warning" },
  ],
  RH: [
    { title: "Turnover", value: "3,4%", status: "warning" },
    { title: "Absenteísmo", value: "1,9%", status: "success" },
    { title: "Treinamentos", value: "86%", status: "success" },
    { title: "Clima organizacional", value: "79", status: "warning" },
  ],
  "Segurança do trabalho": [
    { title: "Taxa de incidentes", value: "0,8", status: "success" },
    { title: "Dias sem acidente", value: "146", status: "success" },
    { title: "Checklist EPI", value: "92%", status: "warning" },
    { title: "Ações corretivas", value: "5", status: "warning" },
  ],
};

const sectorCharts = [
  {
    title: "Indicadores mensais",
    description: "Visão consolidada dos indicadores críticos do período.",
  },
  {
    title: "Desvios vs meta",
    description: "Comparativo entre meta, realizado e tendência.",
  },
  {
    title: "Riscos e alertas",
    description: "Foco nos indicadores fora de padrão e gatilhos.",
  },
  {
    title: "Backlog e prioridades",
    description: "Priorize ações com maior impacto no setor.",
  },
];

const adminCards = [
  {
    title: "Usuários ativos",
    value: "142",
    detail: "12 aguardando convite",
  },
  {
    title: "Perfis cadastrados",
    value: "16",
    detail: "4 perfis críticos",
  },
  {
    title: "Permissões críticas",
    value: "8",
    detail: "Revisão semanal",
  },
];

const permissions = [
  {
    role: "Diretoria",
    user: "Camila Braga",
    scope: "Total",
    status: "active",
  },
  {
    role: "Gestor de Produção",
    user: "Rafael Mendes",
    scope: "Indicadores + Planos",
    status: "active",
  },
  {
    role: "Analista de Qualidade",
    user: "Isabela Torres",
    scope: "Indicadores",
    status: "limited",
  },
  {
    role: "Fornecedor",
    user: "Fornecedor A",
    scope: "Somente relatórios",
    status: "blocked",
  },
];

const users = [
  {
    name: "Larissa Duarte",
    role: "Diretoria",
    status: "active",
    email: "larissa@gt.com",
  },
  {
    name: "Rafael Mendes",
    role: "Gestor de Produção",
    status: "active",
    email: "rafael@gt.com",
  },
  {
    name: "Isabela Torres",
    role: "Analista de Qualidade",
    status: "limited",
    email: "isabela@gt.com",
  },
  {
    name: "Daniel Lima",
    role: "Compras",
    status: "active",
    email: "daniel@gt.com",
  },
];

const roles = [
  {
    title: "Diretoria",
    access: "Total",
    users: 5,
  },
  {
    title: "Gestor de Produção",
    access: "Indicadores + Planos",
    users: 12,
  },
  {
    title: "Analista de Qualidade",
    access: "Indicadores",
    users: 18,
  },
  {
    title: "Colaborador",
    access: "Somente leitura",
    users: 96,
  },
];

const actionPlans = [
  {
    title: "Plano de redução de retrabalho",
    owner: "Equipe Qualidade",
    due: "25/09",
    progress: "Em andamento",
    sector: "Qualidade",
  },
  {
    title: "Campanha de compras estratégicas",
    owner: "PCP/Compras",
    due: "30/09",
    progress: "Aguardando aprovação",
    sector: "PCP/COMPRAS",
  },
  {
    title: "Ajuste de setup de máquinas",
    owner: "Manutenção",
    due: "02/10",
    progress: "Programado",
    sector: "Manutenção",
  },
  {
    title: "Plano de aumento de conversão",
    owner: "Comercial",
    due: "15/10",
    progress: "Em execução",
    sector: "Comercial",
  },
];

const pages = [
  { key: "overview", label: "Visão Geral", icon: "⌂" },
  { key: "users", label: "Usuários", icon: "👥" },
  { key: "roles", label: "Cargos", icon: "🧩" },
  { key: "permissions", label: "Permissões", icon: "🔐" },
  { key: "actionPlans", label: "Planos de ação", icon: "📌" },
];

function LoginView({ onContinue }) {
  return (
    <div className="login-screen">
      <div className="login-background">
        <div className="orb orb-large" />
        <div className="orb orb-medium" />
        <div className="orb orb-small" />
        <div className="wave" />
        <div className="wave wave-alt" />
        <div className="dot-grid" />
      </div>
      <div className="login-card">
        <div className="login-logo">
          <span>GT</span>
        </div>
        <h2>Portal da Qualidade</h2>
        <p>Acessar a plataforma</p>
        <button type="button" className="button primary" onClick={onContinue}>
          → Acessar
        </button>
        <div className="login-divider" />
        <span className="login-footer">
          © 2025 • Desenvolvido por William Ferraz
        </span>
      </div>
    </div>
  );
}

function Sidebar({ activePage, onSelectPage, activeSector, onSelectSector }) {
  const [collapsed, setCollapsed] = useState(true);
  const [hovered, setHovered] = useState(false);
  const expanded = !collapsed || hovered;

  return (
    <aside
      className={`sidebar ${expanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="brand">
        <div className="brand-logo">GT</div>
        {expanded && (
          <div>
            <h1>GT Indicators</h1>
            <span>ERP Analytics</span>
          </div>
        )}
        <button
          type="button"
          className="collapse-toggle"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label="Alternar menu"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>
      <nav>
        <span className="nav-section">Módulos</span>
        {pages.map((page) => (
          <div
            key={page.key}
            className={`nav-item ${activePage === page.key ? "active" : ""}`}
            onClick={() => onSelectPage(page.key)}
          >
            <span className="nav-icon">{page.icon}</span>
            {expanded && <span>{page.label}</span>}
          </div>
        ))}
        <span className="nav-section">Setores</span>
        {sectors.map((sector) => (
          <div
            key={sector}
            className={`nav-item ${activeSector === sector ? "active" : ""}`}
            onClick={() => {
              onSelectSector(sector);
              onSelectPage("sector");
            }}
          >
            <span className="nav-icon">•</span>
            {expanded && <span>{sector}</span>}
            {expanded && (
              <span className="nav-badge">{Math.floor(Math.random() * 8) + 6}</span>
            )}
          </div>
        ))}
      </nav>
      {expanded && (
        <div className="sidebar-footer">
          <strong>Ambiente seguro</strong>
          <span>SSO + MFA | Auth0</span>
          <span>Neon PostgreSQL + Google Sheets</span>
        </div>
      )}
    </aside>
  );
}

function TopBar({ onDownload }) {
  return (
    <header className="topbar">
      <div className="greeting">
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
      <div className="topbar-actions">
        <button type="button" className="button ghost" onClick={onDownload}>
          Relatório geral
        </button>
        <button type="button" className="button secondary" onClick={onDownload}>
          Exportar painel
        </button>
      </div>
    </header>
  );
}

function PermissionTable() {
  return (
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
        {permissions.map((row) => (
          <tr key={`${row.role}-${row.user}`}>
            <td>{row.role}</td>
            <td>{row.user}</td>
            <td>{row.scope}</td>
            <td>
              <span className={`status-pill ${row.status}`}>{row.status}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SectorDashboard({ sector, onOpenPlans }) {
  const indicators = sectorIndicators[sector] || [];

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>{sector}</h2>
          <p>Indicadores estratégicos com visão executiva e acompanhamento.</p>
        </div>
        <div className="action-buttons">
          <button className="button ghost" type="button">
            Atualizar dados
          </button>
          <button className="button primary" type="button" onClick={onOpenPlans}>
            Ver planos de ação
          </button>
        </div>
      </div>

      <div className="filters-bar">
        <div className="filters-group">
          <div className="filter-chip">RIFs</div>
          <div className="filter-chip active">OPT</div>
          <div className="filter-chip">NC Interna</div>
          <div className="filter-chip">NC Externa</div>
        </div>
        <div className="filters-group">
          <select>
            <option>Fevereiro</option>
            <option>Janeiro</option>
            <option>Março</option>
          </select>
          <select>
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
          <button className="button ghost" type="button">
            Atualizar
          </button>
          <button className="button secondary" type="button">
            Baixar relatório
          </button>
        </div>
      </div>

      <div className="grid columns-4" style={{ marginTop: 24 }}>
        {indicators.map((card) => (
          <div className="card kpi-card" key={card.title}>
            <div className="kpi-header">
              <h3>{card.title}</h3>
              <span className={`badge ${card.status}`}>Meta</span>
            </div>
            <div className="metric">{card.value}</div>
            <p className="kpi-source">Origem: {card.status === "success" ? "Neon" : "Sheets"}</p>
          </div>
        ))}
      </div>

      <div className="grid columns-2" style={{ marginTop: 24 }}>
        {sectorCharts.slice(0, 2).map((chart) => (
          <div className="card" key={chart.title}>
            <h3>{chart.title}</h3>
            <p className="muted">{chart.description}</p>
            <div className="chart-placeholder">Gráfico dinâmico (API pronta)</div>
          </div>
        ))}
      </div>

      <div className="grid columns-2" style={{ marginTop: 24 }}>
        {sectorCharts.slice(2).map((chart) => (
          <div className="card" key={chart.title}>
            <h3>{chart.title}</h3>
            <p className="muted">{chart.description}</p>
            <div className="chart-placeholder">Gráfico dinâmico (API pronta)</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function OverviewPage({ onOpenPlans }) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Visão Geral</h2>
          <p>Panorama executivo com conexões, segurança e performance global.</p>
        </div>
        <div className="action-buttons">
          <button className="button ghost" type="button">
            Ver KPIs
          </button>
          <button className="button primary" type="button" onClick={onOpenPlans}>
            Planos de ação
          </button>
        </div>
      </div>
      <div className="grid columns-3" style={{ marginTop: 24 }}>
        {adminCards.map((card) => (
          <div className="card" key={card.title}>
            <h3>{card.title}</h3>
            <div className="metric">{card.value}</div>
            <p className="muted">{card.detail}</p>
          </div>
        ))}
      </div>
      <section className="grid columns-2" style={{ marginTop: 24 }}>
        <div className="card">
          <h3>Conexões de dados</h3>
          <p className="muted">
            Integração ativa com Google Sheets para operações táticas e Neon
            PostgreSQL para histórico e analytics avançado.
          </p>
          <div className="stack" style={{ marginTop: 16 }}>
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
          <p className="muted">
            Single Sign-On, trilhas de auditoria e gestão de acessos por cargo
            com autenticação via Auth0.
          </p>
          <div className="stack" style={{ marginTop: 16 }}>
            <div className="kpi-item">
              <div>
                <strong>MFA obrigatório</strong>
                <div>
                  <span>92% dos acessos com MFA habilitado</span>
                </div>
              </div>
              <span className="badge success">Ativo</span>
            </div>
            <div className="kpi-item">
              <div>
                <strong>Auditoria</strong>
                <div>
                  <span>Última revisão há 2 dias</span>
                </div>
              </div>
              <span className="badge warning">Revisar</span>
            </div>
          </div>
          <div className="table-card" style={{ marginTop: 16 }}>
            <h4 style={{ marginBottom: 8 }}>Gestão de permissões</h4>
            <PermissionTable />
          </div>
        </div>
      </section>
    </section>
  );
}

function UsersPage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Gestão de usuários</h2>
          <p>Criação, edição e controle de usuários integrados ao Auth0.</p>
        </div>
        <div className="action-buttons">
          <button className="button ghost" type="button">
            Importar CSV
          </button>
          <button className="button primary" type="button">
            Criar usuário
          </button>
        </div>
      </div>
      <div className="card table-card">
        <table className="permission-table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Cargo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`status-pill ${user.status}`}>{user.status}</span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="button ghost" type="button">
                      Editar
                    </button>
                    <button className="button danger" type="button">
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RolesPage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Gerenciamento de cargos</h2>
          <p>Crie perfis, configure acessos e vincule permissões.</p>
        </div>
        <div className="action-buttons">
          <button className="button ghost" type="button">
            Revisar políticas
          </button>
          <button className="button primary" type="button">
            Novo cargo
          </button>
        </div>
      </div>
      <div className="grid columns-2" style={{ marginTop: 24 }}>
        {roles.map((role) => (
          <div className="card" key={role.title}>
            <h3>{role.title}</h3>
            <p className="muted">Escopo: {role.access}</p>
            <div className="metric">{role.users} usuários</div>
            <div className="action-buttons" style={{ marginTop: 12 }}>
              <button className="button ghost" type="button">
                Editar
              </button>
              <button className="button ghost" type="button">
                Clonar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PermissionsPage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Permissões e acessos</h2>
          <p>Revise permissões, fluxos de aprovação e regras por centro de custo.</p>
        </div>
        <div className="action-buttons">
          <button className="button ghost" type="button">
            Revisar acessos
          </button>
          <button className="button primary" type="button">
            Nova permissão
          </button>
        </div>
      </div>
      <div className="card table-card">
        <h3>Gestão de permissões</h3>
        <p className="muted">
          Controle granular por perfil, cargo e centro de custo.
        </p>
        <PermissionTable />
      </div>
    </section>
  );
}

function ActionPlansPage({ activeSector }) {
  const plans = useMemo(() => {
    if (!activeSector) {
      return actionPlans;
    }
    return actionPlans.filter((plan) => plan.sector === activeSector);
  }, [activeSector]);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Planos de ação</h2>
          <p>Monitoramento dedicado para indicadores fora da meta.</p>
        </div>
        <div className="action-buttons">
          <button className="button ghost" type="button">
            Exportar
          </button>
          <button className="button primary" type="button">
            Novo plano de ação
          </button>
        </div>
      </div>
      <div className="grid columns-2" style={{ marginTop: 24 }}>
        {plans.map((plan) => (
          <div className="card" key={plan.title}>
            <h3>{plan.title}</h3>
            <p className="muted">Setor: {plan.sector}</p>
            <div className="stack" style={{ marginTop: 16 }}>
              <div className="kpi-item">
                <div>
                  <strong>Responsável</strong>
                  <div>
                    <span>{plan.owner}</span>
                  </div>
                </div>
                <span className="badge success">{plan.progress}</span>
              </div>
              <div className="kpi-item">
                <div>
                  <strong>Prazo</strong>
                  <div>
                    <span>{plan.due}</span>
                  </div>
                </div>
                <span className="badge warning">Acompanhar</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PortalLayout() {
  const [activeSector, setActiveSector] = useState(sectors[0]);
  const [activePage, setActivePage] = useState("overview");

  const handleDownload = () => {
    window.alert("Relatório exportado com sucesso!");
  };

  const content = (() => {
    if (activePage === "overview") {
      return <OverviewPage onOpenPlans={() => setActivePage("actionPlans")} />;
    }
    if (activePage === "users") {
      return <UsersPage />;
    }
    if (activePage === "roles") {
      return <RolesPage />;
    }
    if (activePage === "permissions") {
      return <PermissionsPage />;
    }
    if (activePage === "actionPlans") {
      return <ActionPlansPage activeSector={activeSector} />;
    }
    return (
      <SectorDashboard
        sector={activeSector}
        onOpenPlans={() => setActivePage("actionPlans")}
      />
    );
  })();

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onSelectPage={setActivePage}
        activeSector={activeSector}
        onSelectSector={setActiveSector}
      />
      <main className="main-content">
        <TopBar onDownload={handleDownload} />
        {content}
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
