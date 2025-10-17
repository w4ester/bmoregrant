const STORAGE_KEY = 'grant-tracker.v1';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const state = {
  meta: { name: '', deadline: '' },
  tasks: [],
  budget: [],
  notes: ''
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) Object.assign(state, JSON.parse(raw));
  } catch { /* ignore */ }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateLastSaved();
  updateProgress();
  updateBudgetTotals();
}

function fmtMoney(n) {
  if (Number.isNaN(n) || n === null || n === undefined) return '$0';
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date(); today.setHours(0,0,0,0);
  const due = new Date(dateStr + 'T00:00:00');
  const diff = Math.ceil((due - today) / (1000*60*60*24));
  return diff;
}

function statusBadge(s) {
  const map = {
    'Not started': 'status-not',
    'In progress': 'status-ip',
    'Blocked': 'status-blocked',
    'Done': 'status-done'
  };
  return `<span class="badge ${map[s] || ''}">${s}</span>`;
}

function renderTasks() {
  const tbody = $('#taskTbody');
  tbody.innerHTML = '';

  const q = $('#taskSearch').value.trim().toLowerCase();
  const fStatus = $('#filterStatus').value;
  const fCategory = $('#filterCategory').value;

  const filtered = state.tasks.filter(t => {
    const matchesQ = !q || [t.title, t.owner, t.category, t.priority].some(x => (x||'').toLowerCase().includes(q));
    const matchesS = (fStatus === 'all') || (t.status === fStatus);
    const matchesC = (fCategory === 'all') || (t.category === fCategory);
    return matchesQ && matchesS && matchesC;
  });

  filtered
    .sort((a,b) => {
      // P1 before P2 before P3; then earliest due; then status; then title
      const pr = {P1:0, P2:1, P3:2};
      const d1 = a.due ? new Date(a.due) : new Date(8640000000000000);
      const d2 = b.due ? new Date(b.due) : new Date(8640000000000000);
      return (pr[a.priority]-pr[b.priority]) || (d1 - d2) || a.status.localeCompare(b.status) || a.title.localeCompare(b.title);
    })
    .forEach((t, idx) => {
      const tr = document.createElement('tr');

      const overDue = t.due && (new Date(t.due) < new Date()) && t.status !== 'Done';
      const dueStr = t.due ? new Date(t.due + 'T00:00:00').toLocaleDateString() : '';

      tr.innerHTML = `
        <td>${t.title}</td>
        <td>${t.owner || ''}</td>
        <td>${dueStr} ${overDue ? '⚠️' : ''}</td>
        <td>${statusBadge(t.status)}</td>
        <td>${t.category}</td>
        <td>${t.priority}</td>
        <td>
          <div class="actions">
            <button class="secondary small" data-action="advance" data-idx="${idx}">Advance</button>
            <button class="secondary small" data-action="edit" data-idx="${idx}">Edit</button>
            <button class="danger small" data-action="delete" data-idx="${idx}">Delete</button>
          </div>
        </td>`;
      tbody.appendChild(tr);
    });
}

function updateProgress() {
  const total = state.tasks.length || 0;
  const done = state.tasks.filter(t => t.status === 'Done').length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  $('#progressPct').textContent = `${pct}%`;

  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  $('.ring').setAttribute('stroke-dasharray', `${dash} ${circ - dash}`);
}

function updateBudgetTable() {
  const tbody = $('#budgetTbody');
  tbody.innerHTML = '';
  state.budget.forEach((b, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${b.item}</td>
      <td>${fmtMoney(b.amount)}</td>
      <td>${b.status === 'secured' ? 'Secured' : 'Pending'}</td>
      <td>${b.notes || ''}</td>
      <td>
        <div class="actions">
          <button class="secondary small" data-baction="toggle" data-idx="${idx}">${b.status === 'secured' ? 'Mark Pending' : 'Mark Secured'}</button>
          <button class="secondary small" data-baction="edit" data-idx="${idx}">Edit</button>
          <button class="danger small" data-baction="delete" data-idx="${idx}">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
  updateBudgetTotals();
}

function updateBudgetTotals() {
  const total = state.budget.reduce((s,b) => s + Number(b.amount||0), 0);
  const secured = state.budget.filter(b => b.status === 'secured').reduce((s,b) => s + Number(b.amount||0), 0);
  const gap = total - secured;
  $('#budgetTotal').textContent = fmtMoney(total);
  $('#budgetSecured').textContent = fmtMoney(secured);
  $('#budgetGap').textContent = fmtMoney(gap);
}

function updateDeadlineUI() {
  const d = daysUntil(state.meta.deadline);
  const el = $('#daysRemaining');
  if (d === null) { el.textContent = ''; return; }
  if (d > 1) el.textContent = `${d} days remaining`;
  else if (d === 1) el.textContent = `Due tomorrow`;
  else if (d === 0) el.textContent = `Due today`;
  else el.textContent = `${Math.abs(d)} days past due`;
}

function updateLastSaved() {
  const el = $('#lastSaved');
  const t = new Date();
  el.textContent = `Saved ${t.toLocaleString()}`;
}

/* --- Init & Events --- */
document.addEventListener('DOMContentLoaded', () => {
  load();

  // Meta
  $('#grantName').value = state.meta.name || '';
  $('#deadline').value = state.meta.deadline || '';
  updateDeadlineUI();

  $('#grantName').addEventListener('input', (e) => { state.meta.name = e.target.value; save(); });
  $('#deadline').addEventListener('change', (e) => { state.meta.deadline = e.target.value; save(); updateDeadlineUI(); });

  // Tabs
  $$('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.tab').forEach(b => b.classList.remove('active'));
      $$('.section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      const id = btn.dataset.target;
      const section = document.getElementById(id);
      section.classList.add('active');
      section.focus();
    })
  });

  // Tasks
  renderTasks(); updateProgress();

  $('#taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = $('#taskTitle').value.trim();
    if (!title) return;

    const t = {
      title,
      owner: $('#taskOwner').value.trim(),
      due: $('#taskDue').value || '',
      status: $('#taskStatus').value,
      category: $('#taskCategory').value,
      priority: $('#taskPriority').value
    };
    state.tasks.push(t);
    save();

    e.target.reset();
    renderTasks();
  });

  $('#taskTbody').addEventListener('click', (e) => {
    const btn = e.target.closest('button'); if (!btn) return;
    const idx = Number(btn.dataset.idx);
    const t = state.tasks[idx];
    if (!t) return;

    if (btn.dataset.action === 'delete') {
      if (confirm(`Delete task: ${t.title}?`)) {
        state.tasks.splice(idx, 1);
        save(); renderTasks();
      }
    } else if (btn.dataset.action === 'advance') {
      const flow = ['Not started','In progress','Blocked','Done'];
      t.status = flow[(flow.indexOf(t.status) + 1) % flow.length];
      save(); renderTasks();
    } else if (btn.dataset.action === 'edit') {
      const title = prompt('Title', t.title); if (title === null) return;
      const owner = prompt('Owner', t.owner || '') ?? '';
      const due = prompt('Due (YYYY-MM-DD)', t.due || '') ?? '';
      const status = prompt('Status (Not started, In progress, Blocked, Done)', t.status) ?? t.status;
      const category = prompt('Category (Narrative, Budget, Letters, Compliance, Other)', t.category) ?? t.category;
      const priority = prompt('Priority (P1, P2, P3)', t.priority) ?? t.priority;
      Object.assign(t, { title, owner, due, status, category, priority });
      save(); renderTasks();
    }
  });

  ['input','change'].forEach(ev => {
    $('#taskSearch').addEventListener(ev, renderTasks);
    $('#filterStatus').addEventListener(ev, renderTasks);
    $('#filterCategory').addEventListener(ev, renderTasks);
  });

  $('#addSampleTasks').addEventListener('click', () => {
    const samples = [
      {title:'Outline narrative', owner:'', due:'', status:'Not started', category:'Narrative', priority:'P1'},
      {title:'Budget draft v1', owner:'', due:'', status:'In progress', category:'Budget', priority:'P1'},
      {title:'Letters of support – reach out', owner:'', due:'', status:'Not started', category:'Letters', priority:'P2'},
      {title:'Eligibility check – GitLab Foundation FAQ', owner:'', due:'', status:'Done', category:'Compliance', priority:'P2'}
    ];
    state.tasks.push(...samples);
    save(); renderTasks();
  });

  // Budget
  updateBudgetTable();

  $('#budgetForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const item = $('#budgetItem').value.trim();
    const amount = parseFloat($('#budgetAmount').value);
    const status = $('#budgetStatus').value;
    const notes = $('#budgetNotes').value.trim();

    if (!item || !Number.isFinite(amount)) return;

    state.budget.push({ item, amount, status, notes });
    save();
    e.target.reset();
    updateBudgetTable();
  });

  $('#budgetTbody').addEventListener('click', (e) => {
    const btn = e.target.closest('button'); if (!btn) return;
    const idx = Number(btn.dataset.idx);
    const row = state.budget[idx]; if (!row) return;

    const action = btn.dataset.baction;
    if (action === 'delete') {
      if (confirm(`Delete budget item: ${row.item}?`)) {
        state.budget.splice(idx, 1);
        save(); updateBudgetTable();
      }
    } else if (action === 'toggle') {
      row.status = (row.status === 'secured') ? 'pending' : 'secured';
      save(); updateBudgetTable();
    } else if (action === 'edit') {
      const item = prompt('Item', row.item); if (item === null) return;
      const amount = parseFloat(prompt('Amount', row.amount)); if (!Number.isFinite(amount)) return;
      const status = prompt('Status (secured or pending)', row.status) ?? row.status;
      const notes = prompt('Notes', row.notes || '') ?? '';
      Object.assign(row, { item, amount, status, notes });
      save(); updateBudgetTable();
    }
  });

  // Notes
  $('#notes').value = state.notes || '';
  $('#notes').addEventListener('input', (e) => { state.notes = e.target.value; save(); });
  $('#timestampBtn').addEventListener('click', () => {
    const t = new Date().toLocaleString();
    const ta = $('#notes');
    const prefix = ta.value ? '\n\n' : '';
    ta.value += `${prefix}[${t}] `;
    ta.focus();
    state.notes = ta.value;
    save();
  });

  // Utility buttons
  $('#exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const name = (state.meta.name || 'grant-tracker').toLowerCase().replace(/[^a-z0-9]+/g,'-');
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $('#importInput').addEventListener('change', (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const incoming = JSON.parse(reader.result);
        // Shallow validation
        if (!incoming || typeof incoming !== 'object') throw new Error('Invalid JSON');
        Object.assign(state, { meta: incoming.meta || {}, tasks: incoming.tasks || [], budget: incoming.budget || [], notes: incoming.notes || '' });
        save();
        // refresh UI
        $('#grantName').value = state.meta.name || '';
        $('#deadline').value = state.meta.deadline || '';
        updateDeadlineUI();
        $('#notes').value = state.notes || '';
        renderTasks(); updateBudgetTable(); updateProgress();
        alert('Import successful.');
      } catch (err) {
        console.error(err);
        alert('Import failed. Please check the file format.');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  });

  $('#printBtn').addEventListener('click', () => window.print());

  $('#clearBtn').addEventListener('click', () => {
    if (!confirm('This will erase all locally stored data for this tracker. Continue?')) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });
});
