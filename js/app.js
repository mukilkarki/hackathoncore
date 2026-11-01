const SUPABASE_CONFIG = window.NEXUS_SUPABASE_CONFIG || {};
const hasSupabaseConfig = Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
const hasPartialSupabaseConfig = Boolean(SUPABASE_CONFIG.url || SUPABASE_CONFIG.anonKey);
const supabaseClient = window.supabase?.createClient && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey
  ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)
  : null;

/**
 * SQUAD CONFIGURATION & INITIAL STATE
 * Local demo data is used until a Supabase project is configured.
 */
    const INITIAL_MEMBERS = [
      // 6 Core Squad Members
      {
        id: "mem-1",
        name: "Kaviyan S",
        dept: "Computer Science (CSE)",
        role: "Team Lead & System Architect",
        tier: "core", // "core" or "backup"
        skills: ["System Architecture", "FastAPI", "Docker", "Pitch Lead"],
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "mem-2",
        name: "Dharshini R",
        dept: "Information Tech (IT)",
        role: "Frontend & UI/UX Developer",
        tier: "core",
        skills: ["Next.js", "Tailwind CSS", "Figma", "Three.js"],
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "mem-3",
        name: "Ashwin Balaji",
        dept: "CSE (Cybersecurity)",
        role: "Backend & Database Engineer",
        tier: "core",
        skills: ["Node.js", "PostgreSQL", "Redis", "OAuth2 & JWT"],
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "mem-4",
        name: "Sneha Murugan",
        dept: "Artificial Intelligence (AI & DS)",
        role: "AI & ML Specialist",
        tier: "core",
        skills: ["PyTorch", "LangChain", "OpenCV", "Fine-tuning LLMs"],
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "mem-5",
        name: "Vigneshwaran K",
        dept: "Electronics & Comm (ECE)",
        role: "Hardware & IoT Specialist",
        tier: "core",
        skills: ["ESP32 / Arduino", "MQTT", "Circuit Design", "Embedded C"],
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "mem-6",
        name: "Harish V",
        dept: "Management Studies / MBA",
        role: "QA Engineer & Stage Pitcher",
        tier: "core",
        skills: ["Market Validation", "Financial Model", "Selenium QA", "Keynote Demo"],
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80"
      },
      // 2 Backup Standby Members
      {
        id: "mem-7",
        name: "Manoj Kumar",
        dept: "Computer Science (CSE)",
        role: "Standby 1: Full-Stack Generalist",
        tier: "backup",
        skills: ["Express.js", "React Native", "Tailwind", "REST APIs"],
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80"
      },
      {
        id: "mem-8",
        name: "Pooja Venkatesh",
        dept: "Media Tech & Visual Comm",
        role: "Standby 2: Visual Content & UX",
        tier: "backup",
        skills: ["Figma Systems", "Motion Graphics", "Slide Pitch Deck", "Micro-copy"],
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80"
      }
    ];

    const INITIAL_PROJECTS = [
      {
        id: "proj-1",
        title: "AgriVision AI - Plant Disease Drone Radar",
        desc: "Autonomous edge drone imagery system analyzing crop fungal infections in under 4 seconds using YOLOv8 and offline ESP32 LoRa nodes.",
        tags: ["PyTorch", "FastAPI", "React Native", "LoRa IoT"],
        github: "https://github.com",
        demo: "https://demo.nexus.io"
      },
      {
        id: "proj-2",
        title: "ResQGrid - Disaster Mesh Network",
        desc: "Zero-telecom emergency mesh app allowing flood survivors to send geo-coordinates and health triage via peer-to-peer Wi-Fi Direct.",
        tags: ["Go", "WebRTC", "Leaflet Maps", "IndexedDB"],
        github: "https://github.com",
        demo: "https://demo.nexus.io"
      },
      {
        id: "proj-3",
        title: "MedVigil - ICU Realtime Telemetry",
        desc: "Hospital ICU monitor alerting nurse desks to critical arrhythmia patterns before conventional monitors using synthetic ECG transformers.",
        tags: ["Next.js", "Tailwind", "Python", "MQTT"],
        github: "https://github.com",
        demo: "https://demo.nexus.io"
      }
    ];

    const INITIAL_TASKS = [
      { id: "task-1", title: "Train and quantize YOLOv8n to ONNX format", assignee: "Sneha Murugan", priority: "High", status: "todo" },
      { id: "task-2", title: "Build responsive Pitch Presentation slides (10-slide deck)", assignee: "Harish V", priority: "Medium", status: "todo" },
      { id: "task-3", title: "Configure JWT Auth with Redis Refresh Tokens", assignee: "Ashwin Balaji", priority: "High", status: "progress" },
      { id: "task-4", title: "Design live radar UI components with Tailwind", assignee: "Dharshini R", priority: "Medium", status: "progress" },
      { id: "task-5", title: "System Architecture & API specifications written", assignee: "Kaviyan S", priority: "High", status: "done" }
    ];

    const INITIAL_APPLICATIONS = [
      {
        id: "app-1",
        name: "Sanjay Raman",
        email: "sanjay.r@college.edu",
        dept: "ECE",
        year: "3rd Year",
        targetRole: "Hardware / IoT Specialist",
        skills: "Raspberry Pi, ESP32, CAN Bus, C++",
        portfolio: "https://github.com/sanjay-iot",
        reason: "Participated in Smart India Hackathon internal rounds. Built autonomous obstacle robot. Can work continuously 40 hours with hardware debugging tools.",
        status: "pending"
      }
    ];

    const INITIAL_CHATS = [
      { id: "msg-1", author: "Kaviyan (Lead)", role: "lead", text: "Team, hackathon problem statement drops tonight at 8 PM. Ensure everyone's local dev docker containers are warm!", time: "10:14 AM" },
      { id: "msg-2", author: "Dharshini (Frontend)", role: "member", text: "Figma design system and color palette ready for dark mode!", time: "10:18 AM" },
      { id: "msg-3", author: "Ashwin (Backend)", role: "member", text: "Database schemas and boilerplate FastAPI server tested.", time: "10:22 AM" }
    ];

    // Local Storage State Loader
    function loadStorage(key, fallback) {
      try {
        const item = localStorage.getItem('nexus_' + key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.error(`Unable to load ${key} from local storage:`, e);
        return fallback;
      }
    }

    function saveStorage(key, data) {
      try {
        localStorage.setItem('nexus_' + key, JSON.stringify(data));
      } catch (e) {
        console.error(`Unable to save ${key} to local storage:`, e);
        showToast("This browser could not save the latest changes.", "error");
      }

      if (supabaseClient && !(key === 'applications' && currentUser?.role !== 'admin')) {
        supabaseClient
          .from('workspace_data')
          .upsert({ collection: key, records: data }, { onConflict: 'collection' })
          .then(({ error }) => {
            if (error) throw error;
          })
          .catch(error => {
            console.error(`Unable to save ${key} to Supabase:`, error);
            showToast(`Could not sync ${key} with the workspace database.`, "error");
          });
      }
    }

    // Reactive State
    let members = loadStorage('members', INITIAL_MEMBERS);
    let projects = loadStorage('projects', INITIAL_PROJECTS);
    let tasks = loadStorage('tasks', INITIAL_TASKS);
    let applications = loadStorage('applications', INITIAL_APPLICATIONS);
    let chats = loadStorage('chats', INITIAL_CHATS);
    let announcements = loadStorage('announcements', [
      { id: "anno-1", text: "🎉 Shortlisted for National Hackathon Finals 2026! Pre-sprint setup in progress.", link: "" }
    ]);

    // Active Auth User State
    let currentUser = null;

    function setDatabaseStatus(label, tone) {
      const status = document.getElementById('database-status');
      if (!status) return;
      const dot = status.querySelector('span');
      status.lastElementChild.textContent = label;
      dot.className = `h-1.5 w-1.5 rounded-full ${tone}`;
    }

    async function getWorkspaceUser(user) {
      const { data: roleRecord, error } = await supabaseClient
        .from('workspace_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (!roleRecord) {
        throw new Error("Your account is awaiting administrator approval. You can sign in to the workspace after your application is approved.");
      }

      const metadata = user.user_metadata || {};
      return {
        id: user.id,
        name: metadata.full_name || user.email?.split('@')[0] || 'Workspace member',
        email: user.email,
        role: roleRecord.role,
        avatar: metadata.avatar_url || null,
        department: metadata.department || '',
        title: metadata.title || '',
        skills: Array.isArray(metadata.skills) ? metadata.skills.join(', ') : metadata.skills || '',
        github: metadata.github || '',
        linkedin: metadata.linkedin || ''
      };
    }

    async function loadWorkspaceData() {
      if (!supabaseClient) return;

      const collections = ['members', 'projects', 'announcements'];
      if (currentUser) collections.push('tasks', 'chats');
      if (currentUser?.role === 'admin') collections.push('applications');

      const stateSetters = {
        members: value => members = value,
        projects: value => projects = value,
        tasks: value => tasks = value,
        applications: value => applications = value,
        chats: value => chats = value,
        announcements: value => announcements = value
      };

      const results = await Promise.all(collections.map(collection =>
        supabaseClient.from('workspace_data').select('records').eq('collection', collection).maybeSingle()
      ));

      results.forEach((result, index) => {
        if (result.error) throw result.error;
        if (Array.isArray(result.data?.records)) {
          stateSetters[collections[index]](result.data.records);
        }
      });
    }

    async function initializeApp() {
      initCountdown();
      const accountFields = document.getElementById('join-account-fields');
      const joinPassword = document.getElementById('join-password');
      const joinPasswordConfirm = document.getElementById('join-password-confirm');
      const joinSubmitButton = document.getElementById('join-submit-button');
      accountFields.classList.toggle('hidden', !supabaseClient);
      [joinPassword, joinPasswordConfirm].forEach(input => {
        input.required = Boolean(supabaseClient);
        input.disabled = !supabaseClient;
      });
      document.getElementById('join-password-note').classList.toggle('hidden', !supabaseClient);
      joinSubmitButton.textContent = supabaseClient ? "Create Account & Apply" : "Submit Application";

      if (!supabaseClient) {
        if (hasPartialSupabaseConfig) {
          setDatabaseStatus("Setup needed", "bg-red-400");
          showToast(
            hasSupabaseConfig
              ? "Supabase SDK did not load. Check your internet connection and reload."
              : "Add both the Supabase project URL and publishable key to js/config.js.",
            "error"
          );
          renderAll();
          return;
        }
        setDatabaseStatus("Local demo", "bg-amber-400");
        renderAll();
        return;
      }

      setDatabaseStatus("Connecting", "bg-amber-400");
      members = [];
      projects = [];
      tasks = [];
      applications = [];
      chats = [];
      announcements = [];
      try {
        const { data, error } = await supabaseClient.auth.getSession();
        if (error) throw error;
        if (data.session?.user) {
          try {
            currentUser = await getWorkspaceUser(data.session.user);
          } catch (roleError) {
            await supabaseClient.auth.signOut();
            throw roleError;
          }
        }
        await loadWorkspaceData();
        setDatabaseStatus("Cloud synced", "bg-emerald-400");
      } catch (error) {
        console.error("Unable to initialize the workspace database:", error);
        currentUser = null;
        setDatabaseStatus("Connection issue", "bg-red-400");
        showToast(error.message || "Unable to connect to the workspace database.", "error");
      }
      if (currentUser) renderProfileForm();
      renderAll();
    }

    // ===============================================================
    // ROUTING & VIEW CONTROLLER
    // ===============================================================
    function switchView(viewName) {
      document.querySelectorAll('.view-content').forEach(el => el.classList.add('hidden'));
      
      const target = document.getElementById(`view-${viewName}`);
      if (target) {
        target.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Update Active Navigation Styles
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-view') === viewName) {
          link.classList.add('text-brand-400', 'bg-slate-800');
        } else {
          link.classList.remove('text-brand-400', 'bg-slate-800');
        }
      });

      // Guard check for tabs
      if (viewName === 'member-portal' && !currentUser) {
        showToast("Please log in to enter the team workspace", "warning");
        openLoginModal();
        switchView('home');
        return;
      }

      if (viewName === 'admin-dashboard' && (!currentUser || currentUser.role !== 'admin')) {
        showToast("Access restricted: Admin privileges required", "error");
        switchView('home');
        return;
      }

      renderAll();
    }

    function toggleMobileNav() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    }

    function dismissBanner() {
      document.getElementById('announcement-banner').style.display = 'none';
    }

    // ===============================================================
    // RENDER FUNCTIONS
    // ===============================================================
    function renderAll() {
      renderAnnouncements();
      renderTeamMembers();
      renderProjects();
      renderAuthBar();
      renderTasks();
      renderChat();
      renderAdminDashboard();
    }

    // 1. Announcements
    function renderAnnouncements() {
      const tickerText = document.getElementById('ticker-text');
      if (announcements.length > 0) {
        tickerText.textContent = announcements[0].text;
      } else {
        tickerText.textContent = "Welcome to NexusZero Hackathon Team Portal!";
      }

      const adminAnnoList = document.getElementById('admin-announcements-list');
      if (adminAnnoList) {
        adminAnnoList.innerHTML = announcements.map(a => `
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span class="text-slate-200 truncate pr-2">${escapeHtml(a.text)}</span>
            <button onclick="deleteAnnouncement('${a.id}')" class="text-slate-400 hover:text-red-400 transition ml-2">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `).join('') || '<p class="text-xs text-slate-500">No active announcements.</p>';
      }
    }

    // 2. Team Members Showcase
    function renderTeamMembers() {
      const coreGrid = document.getElementById('core-members-grid');
      const backupGrid = document.getElementById('backup-members-grid');

      const coreMembers = members.filter(m => m.tier === 'core');
      const backupMembers = members.filter(m => m.tier === 'backup');

      // Render Core
      coreGrid.innerHTML = coreMembers.map(m => createMemberCard(m, true)).join('');

      // Render Backup
      backupGrid.innerHTML = backupMembers.map(m => createMemberCard(m, false)).join('');

      // Populate Member select in task creation modal
      const taskAssigneeSelect = document.getElementById('task-assignee');
      if (taskAssigneeSelect) {
        taskAssigneeSelect.innerHTML = members.map(m =>
          `<option value="${escapeHtml(m.name)}">${escapeHtml(m.name)} (${escapeHtml(m.role)})</option>`
        ).join('');
      }
    }

    function createMemberCard(member, isCore) {
      const avatarFallback = `https://placehold.co/150x150/4f46e5/ffffff?text=${encodeURIComponent(String(member.name || '?').charAt(0))}`;
      const avatar = safeExternalUrl(member.avatar);
      const avatarUrl = avatar === '#' ? avatarFallback : avatar;
      const tierBadge = isCore 
        ? `<span class="px-2.5 py-1 bg-brand-950/80 border border-brand-700/60 text-brand-300 rounded-full text-[10px] font-semibold tracking-wider uppercase">CORE MEMBER</span>`
        : `<span class="px-2.5 py-1 bg-amber-950/80 border border-amber-700/60 text-amber-300 rounded-full text-[10px] font-semibold tracking-wider uppercase"><i class="fa-solid fa-arrows-rotate mr-1"></i>STANDBY BACKUP</span>`;

      return `
        <div class="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl group">
          <div>
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="flex items-center space-x-3">
                <img src="${escapeHtml(avatarUrl)}" 
                     alt="${escapeHtml(member.name)}" 
                     onerror="this.onerror=null;this.src='${avatarFallback}'"
                     class="w-14 h-14 rounded-2xl object-cover border-2 border-slate-800 group-hover:border-brand-500 transition">
                <div>
                  <h4 class="text-base font-bold text-white leading-tight">${escapeHtml(member.name)}</h4>
                  <p class="text-xs text-brand-400 font-medium mt-0.5">${escapeHtml(member.role)}</p>
                  <p class="text-[11px] text-slate-400">${escapeHtml(member.dept)}</p>
                </div>
              </div>
            </div>

            <div class="mb-4">
              ${tierBadge}
            </div>

            <div class="flex flex-wrap gap-1.5 mb-5">
              ${(member.skills || []).map(skill => `
                <span class="text-[10px] font-mono bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">${escapeHtml(skill)}</span>
              `).join('')}
            </div>
          </div>

          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span class="text-[11px] font-mono text-emerald-400"><i class="fa-solid fa-circle text-[8px] mr-1"></i>Active Sprint</span>
            <div class="flex items-center space-x-3">
              <a href="${escapeHtml(safeExternalUrl(member.github))}" target="_blank" rel="noopener noreferrer" class="hover:text-white transition" title="GitHub"><i class="fa-brands fa-github text-sm"></i></a>
              <a href="${escapeHtml(safeExternalUrl(member.linkedin))}" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition" title="LinkedIn"><i class="fa-brands fa-linkedin text-sm"></i></a>
            </div>
          </div>
        </div>
      `;
    }

    // 3. Projects Showcase
    function renderProjects() {
      const grid = document.getElementById('projects-grid');
      grid.innerHTML = projects.map(proj => `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
          <div>
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600/20 to-cyan-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-4">
              <i class="fa-solid fa-cube text-lg"></i>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">${escapeHtml(proj.title)}</h3>
            <p class="text-xs text-slate-400 leading-relaxed mb-4">${escapeHtml(proj.desc)}</p>
            <div class="flex flex-wrap gap-1.5 mb-6">
              ${(proj.tags || []).map(t => `<span class="text-[10px] bg-slate-950 text-indigo-300 px-2.5 py-1 rounded-md border border-slate-800 font-mono">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
            <a href="${escapeHtml(safeExternalUrl(proj.github))}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white flex items-center gap-1.5 transition">
              <i class="fa-brands fa-github"></i> <span>Repository</span>
            </a>
            <a href="${escapeHtml(safeExternalUrl(proj.demo))}" target="_blank" rel="noopener noreferrer" class="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1 transition">
              <span>Live Prototype</span> <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>
      `).join('');

      // Admin Project List
      const adminProjList = document.getElementById('admin-projects-list');
      if (adminProjList) {
        adminProjList.innerHTML = projects.map(p => `
          <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <p class="font-bold text-white">${escapeHtml(p.title)}</p>
              <p class="text-[11px] text-slate-400">${escapeHtml(p.tags.join(', '))}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button onclick="editProject('${p.id}')" class="text-indigo-400 hover:text-indigo-300"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="deleteProject('${p.id}')" class="text-slate-400 hover:text-red-400"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `).join('') || '<p class="text-xs text-slate-500">No projects added yet.</p>';
      }
    }

    // 4. Tasks Kanban Board
    function renderTasks() {
      const todoBox = document.getElementById('todo-tasks-container');
      const progBox = document.getElementById('prog-tasks-container');
      const doneBox = document.getElementById('done-tasks-container');

      if (!todoBox || !progBox || !doneBox) return;

      const todoList = tasks.filter(t => t.status === 'todo');
      const progList = tasks.filter(t => t.status === 'progress');
      const doneList = tasks.filter(t => t.status === 'done');

      document.getElementById('todo-count').textContent = todoList.length;
      document.getElementById('prog-count').textContent = progList.length;
      document.getElementById('done-count').textContent = doneList.length;

      todoBox.innerHTML = todoList.map(t => createTaskCard(t)).join('') || '<div class="h-full flex items-center justify-center text-[11px] text-slate-600">No tasks</div>';
      progBox.innerHTML = progList.map(t => createTaskCard(t)).join('') || '<div class="h-full flex items-center justify-center text-[11px] text-slate-600">No tasks</div>';
      doneBox.innerHTML = doneList.map(t => createTaskCard(t)).join('') || '<div class="h-full flex items-center justify-center text-[11px] text-slate-600">No tasks</div>';
    }

    function createTaskCard(t) {
      const priorityColors = {
        'High': 'text-red-400 bg-red-950/60 border-red-800/60',
        'Medium': 'text-amber-400 bg-amber-950/60 border-amber-800/60',
        'Low': 'text-slate-400 bg-slate-800 border-slate-700'
      };

      return `
        <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-2">
          <p class="text-xs font-medium text-slate-200 leading-snug">${escapeHtml(t.title)}</p>
          <div class="flex items-center justify-between text-[10px]">
            <span class="text-slate-400 font-medium"><i class="fa-regular fa-user mr-1"></i>${escapeHtml(t.assignee)}</span>
            <span class="px-1.5 py-0.5 rounded border font-mono ${priorityColors[t.priority] || ''}">${t.priority}</span>
          </div>
          <div class="flex items-center justify-end space-x-1 pt-1 border-t border-slate-900">
            ${t.status !== 'todo' ? `<button onclick="moveTask('${t.id}', 'todo')" title="Move to To-Do" class="text-slate-500 hover:text-amber-400 px-1"><i class="fa-solid fa-angles-left"></i></button>` : ''}
            ${t.status !== 'progress' ? `<button onclick="moveTask('${t.id}', 'progress')" title="Move to In-Progress" class="text-slate-500 hover:text-cyan-400 px-1"><i class="fa-solid fa-play"></i></button>` : ''}
            ${t.status !== 'done' ? `<button onclick="moveTask('${t.id}', 'done')" title="Mark Done" class="text-slate-500 hover:text-emerald-400 px-1"><i class="fa-solid fa-check"></i></button>` : ''}
            <button onclick="deleteTask('${t.id}')" title="Delete" class="text-slate-600 hover:text-red-400 px-1"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      `;
    }

    // 5. Team Group Chatbox
    function renderChat() {
      const feed = document.getElementById('chat-messages');
      if (!feed) return;

      feed.innerHTML = chats.map(msg => {
        const isMe = currentUser && (currentUser.name === msg.author || currentUser.email === msg.author);
        return `
          <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'}">
            <div class="flex items-center space-x-1.5 mb-1 text-[11px]">
              <span class="font-bold ${isMe ? 'text-brand-300' : 'text-indigo-300'}">${escapeHtml(msg.author)}</span>
              <span class="text-[9px] text-slate-500 font-mono">${escapeHtml(msg.time)}</span>
            </div>
            <div class="max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${isMe ? 'bg-brand-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'}">
              ${escapeHtml(msg.text)}
            </div>
          </div>
        `;
      }).join('');

      feed.scrollTop = feed.scrollHeight;
    }

    // 6. Admin Management Dashboard
    function renderAdminDashboard() {
      // Statistics Counts
      const coreCount = members.filter(m => m.tier === 'core').length;
      const backupCount = members.filter(m => m.tier === 'backup').length;
      const pendingApps = applications.filter(a => a.status === 'pending');

      const coreStat = document.getElementById('stat-core-count');
      if (coreStat) coreStat.textContent = `${coreCount} / 6`;
      const backupStat = document.getElementById('stat-backup-count');
      if (backupStat) backupStat.textContent = `${backupCount} / 2`;
      const projStat = document.getElementById('stat-project-count');
      if (projStat) projStat.textContent = projects.length;
      const pendStat = document.getElementById('stat-pending-count');
      if (pendStat) pendStat.textContent = pendingApps.length;
      const pendBadge = document.getElementById('pending-badge-count');
      if (pendBadge) pendBadge.textContent = `${pendingApps.length} Waiting`;

      // Applications Table
      const appsBody = document.getElementById('applications-table-body');
      if (appsBody) {
        if (pendingApps.length === 0) {
          appsBody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-500 text-xs">No pending recruitment applications at this time.</td></tr>`;
        } else {
          appsBody.innerHTML = pendingApps.map(app => `
            <tr class="hover:bg-slate-800/40 transition">
              <td class="py-3 px-4">
                <p class="font-bold text-white">${escapeHtml(app.name)}</p>
                <p class="text-[11px] text-slate-400">${escapeHtml(app.email)}</p>
              </td>
              <td class="py-3 px-4 font-mono">${escapeHtml(app.dept)} <span class="text-slate-500">(${escapeHtml(app.year)})</span></td>
              <td class="py-3 px-4">
                <span class="text-brand-300 font-medium block">${escapeHtml(app.targetRole)}</span>
                <span class="text-[10px] text-slate-400 font-mono">${escapeHtml(app.skills)}</span>
              </td>
              <td class="py-3 px-4 max-w-xs truncate text-[11px] text-slate-300" title="${escapeHtml(app.reason)}">
                ${escapeHtml(app.reason)}
              </td>
              <td class="py-3 px-4">
                <a href="${escapeHtml(safeExternalUrl(app.portfolio))}" target="_blank" rel="noopener noreferrer" class="text-brand-400 hover:underline flex items-center gap-1 font-mono">
                  Link <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                </a>
              </td>
              <td class="py-3 px-4 text-right space-x-2">
                <button onclick="approveApplication('${app.id}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium transition" title="Accept & Add to Team">
                  <i class="fa-solid fa-check mr-1"></i> Accept
                </button>
                <button onclick="rejectApplication('${app.id}')" class="px-2 py-1 bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-300 rounded transition" title="Reject">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </td>
            </tr>
          `).join('');
        }
      }

      // Member Management Roster Table
      const rosterBody = document.getElementById('admin-roster-body');
      if (rosterBody) {
        rosterBody.innerHTML = members.map(m => {
          const isCore = m.tier === 'core';
          return `
            <tr class="hover:bg-slate-800/40 transition">
              <td class="py-3 px-4 font-medium text-white flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full ${isCore ? 'bg-brand-500' : 'bg-amber-400'}"></span>
                <span>${escapeHtml(m.name)}</span>
              </td>
              <td class="py-3 px-4 text-slate-400 font-mono">${escapeHtml(m.dept)}</td>
              <td class="py-3 px-4 text-brand-300">${escapeHtml(m.role)}</td>
              <td class="py-3 px-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${isCore ? 'bg-brand-950 text-brand-300 border border-brand-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}">
                  ${m.tier}
                </span>
              </td>
              <td class="py-3 px-4 text-right space-x-2">
                <button onclick="toggleMemberTier('${m.id}')" class="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] border border-slate-700" title="Switch between Core and Backup">
                  <i class="fa-solid fa-arrows-rotate mr-1 text-brand-400"></i> ${isCore ? 'Move to Backup' : 'Promote to Core'}
                </button>
                <button onclick="deleteMember('${m.id}')" class="px-2 py-1 text-slate-500 hover:text-red-400 rounded transition" title="Remove member">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    // 7. Dynamic Auth Bar
    function renderAuthBar() {
      const unlogged = document.getElementById('auth-unlogged');
      const logged = document.getElementById('auth-logged');
      const memberPortalBtn = document.getElementById('nav-member-portal');
      const adminDashBtn = document.getElementById('nav-admin-dashboard');
      const mobilePortalLinks = document.getElementById('mobile-portal-links');

      if (currentUser) {
        unlogged.classList.add('hidden');
        logged.classList.remove('hidden');

        document.getElementById('user-display-name').textContent = currentUser.name;
        document.getElementById('user-role-badge').textContent = currentUser.role;
        const avatarFallback = `https://placehold.co/100x100/6366f1/ffffff?text=${encodeURIComponent(String(currentUser.name || '?').charAt(0))}`;
        const avatarUrl = safeExternalUrl(currentUser.avatar);
        document.getElementById('user-avatar').src = avatarUrl === '#' ? avatarFallback : avatarUrl;
        
        const portalUserName = document.getElementById('portal-user-name');
        if (portalUserName) portalUserName.textContent = `${currentUser.name} (${currentUser.role})`;

        // Show navigation items based on role
        memberPortalBtn.classList.remove('hidden');
        if (currentUser.role === 'admin') {
          adminDashBtn.classList.remove('hidden');
        } else {
          adminDashBtn.classList.add('hidden');
        }

        // Mobile portal links
        mobilePortalLinks.innerHTML = `
          <button onclick="switchView('member-portal'); toggleMobileNav();" class="block w-full text-left py-2 px-3 rounded text-emerald-400 bg-emerald-950/40">Workspace Portal</button>
          ${currentUser.role === 'admin' ? `<button onclick="switchView('admin-dashboard'); toggleMobileNav();" class="block w-full text-left py-2 px-3 rounded text-amber-400 bg-amber-950/40">Admin Hub</button>` : ''}
        `;

      } else {
        unlogged.classList.remove('hidden');
        logged.classList.add('hidden');
        memberPortalBtn.classList.add('hidden');
        adminDashBtn.classList.add('hidden');
        mobilePortalLinks.innerHTML = '';
      }
    }

    function renderProfileForm() {
      if (!currentUser) return;

      document.getElementById('profile-name').value = currentUser.name;
      document.getElementById('profile-department').value = currentUser.department;
      document.getElementById('profile-title').value = currentUser.title;
      document.getElementById('profile-skills').value = currentUser.skills;
      document.getElementById('profile-github').value = currentUser.github;
      document.getElementById('profile-linkedin').value = currentUser.linkedin;
      document.getElementById('profile-avatar').value = currentUser.avatar || '';
    }

    // ===============================================================
    // AUTHENTICATION LOGIC
    // ===============================================================
    function openLoginModal() {
      document.getElementById('modal-login').classList.remove('hidden');
      document.getElementById('login-error-msg').classList.add('hidden');
    }

    function closeLoginModal() {
      document.getElementById('modal-login').classList.add('hidden');
    }

    async function handleLoginSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;
      const errBox = document.getElementById('login-error-msg');

      errBox.textContent = '';
      errBox.classList.add('hidden');

      if (!supabaseClient) {
        errBox.textContent = "Sign-in is unavailable in local demo mode. Configure Supabase to enable workspace accounts.";
        errBox.classList.remove('hidden');
        return;
      }

      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        currentUser = await getWorkspaceUser(data.user);
        await loadWorkspaceData();
        renderProfileForm();
        closeLoginModal();
        renderAll();
        showToast(`Welcome to your workspace, ${currentUser.name}.`, "success");
        switchView(currentUser.role === 'admin' ? 'admin-dashboard' : 'member-portal');
        setDatabaseStatus("Cloud synced", "bg-emerald-400");
      } catch (error) {
        await supabaseClient.auth.signOut();
        currentUser = null;
        errBox.textContent = error.message || "Unable to sign in. Check your credentials and workspace access.";
        errBox.classList.remove('hidden');
      }
    }

    async function handleSaveProfile(e) {
      e.preventDefault();
      const errBox = document.getElementById('profile-error-msg');
      const saveButton = document.getElementById('profile-save-button');
      errBox.textContent = '';
      errBox.classList.add('hidden');

      if (!supabaseClient || !currentUser) {
        errBox.textContent = "Sign in to a configured workspace before editing your profile.";
        errBox.classList.remove('hidden');
        return;
      }

      const profile = {
        full_name: document.getElementById('profile-name').value.trim(),
        department: document.getElementById('profile-department').value.trim(),
        title: document.getElementById('profile-title').value.trim(),
        skills: document.getElementById('profile-skills').value.trim(),
        github: document.getElementById('profile-github').value.trim(),
        linkedin: document.getElementById('profile-linkedin').value.trim(),
        avatar_url: document.getElementById('profile-avatar').value.trim()
      };

      if (!profile.full_name) {
        errBox.textContent = "Enter your full name before saving your profile.";
        errBox.classList.remove('hidden');
        return;
      }

      saveButton.disabled = true;
      saveButton.textContent = "Saving...";
      try {
        const { data, error } = await supabaseClient.auth.updateUser({ data: profile });
        if (error) throw error;
        if (!data.user) throw new Error("Supabase did not return the updated account.");

        currentUser = await getWorkspaceUser(data.user);
        renderAuthBar();
        renderProfileForm();
        renderChat();
        showToast("Your profile has been updated.", "success");
      } catch (error) {
        console.error("Unable to update workspace profile:", error);
        errBox.textContent = error.message || "Your profile could not be updated. Please try again.";
        errBox.classList.remove('hidden');
      } finally {
        saveButton.disabled = false;
        saveButton.textContent = "Save Profile";
      }
    }

    async function logoutUser() {
      if (supabaseClient) {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
          console.error("Unable to sign out:", error);
          showToast("Sign out failed. Please try again.", "error");
          return;
        }
      }
      currentUser = null;
      localStorage.removeItem('nexus_session_user');
      renderAll();
      showToast("Logged out successfully", "info");
      switchView('home');
    }

    // ===============================================================
    // ACTIONS & INTERACTION LOGIC
    // ===============================================================

    // 1. Member Registration and Join Application
    async function handleJoinSubmit(e) {
      e.preventDefault();
      const form = document.getElementById('join-form');
      const errorBox = document.getElementById('join-error-msg');
      const submitButton = document.getElementById('join-submit-button');
      const password = document.getElementById('join-password').value;
      const passwordConfirm = document.getElementById('join-password-confirm').value;

      errorBox.textContent = '';
      errorBox.classList.add('hidden');

      if (supabaseClient && currentUser) {
        errorBox.textContent = "Log out before creating a separate member account.";
        errorBox.classList.remove('hidden');
        return;
      }

      if (supabaseClient && password !== passwordConfirm) {
        errorBox.textContent = "The passwords do not match.";
        errorBox.classList.remove('hidden');
        return;
      }

      const newApp = {
        id: 'app-' + Date.now(),
        name: document.getElementById('join-name').value.trim(),
        email: document.getElementById('join-email').value.trim(),
        dept: document.getElementById('join-dept').value.trim(),
        year: document.getElementById('join-year').value,
        targetRole: document.getElementById('join-role').value,
        skills: document.getElementById('join-skills').value.trim(),
        portfolio: document.getElementById('join-portfolio').value.trim(),
        linkedin: document.getElementById('join-linkedin').value.trim(),
        reason: document.getElementById('join-reason').value.trim(),
        status: 'pending'
      };

      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
      let accountCreated = false;
      try {
        if (supabaseClient) {
          const { data, error } = await supabaseClient.auth.signUp({
            email: newApp.email,
            password,
            options: {
              data: {
                full_name: newApp.name,
                department: newApp.dept,
                title: newApp.targetRole,
                skills: newApp.skills,
                github: newApp.portfolio,
                linkedin: newApp.linkedin,
                avatar_url: ''
              }
            }
          });
          if (error) throw error;
          accountCreated = true;

          if (data.session) {
            const { error: signOutError } = await supabaseClient.auth.signOut();
            if (signOutError) throw signOutError;
          }

          const { error: applicationError } = await supabaseClient.rpc('submit_workspace_application', {
            application_data: newApp
          });
          if (applicationError) throw applicationError;
        } else {
          applications.unshift(newApp);
          saveStorage('applications', applications);
        }

        form.reset();
        const successMsg = document.getElementById('join-success-msg');
        document.getElementById('join-success-copy').textContent = supabaseClient
          ? "Account created and application received. Confirm your email if requested; Workspace access is enabled only after admin approval."
          : "Application received. The team will follow up about your application.";
        successMsg.classList.remove('hidden');

        setTimeout(() => {
          successMsg.classList.add('hidden');
        }, 7000);

        renderAdminDashboard();
        showToast(supabaseClient
          ? "Account created. Confirm your email if requested; workspace access is pending admin approval."
          : "Application saved in this browser only. Configure Supabase for shared access.", "success");
      } catch (error) {
        console.error("Unable to complete member registration:", error);
        errorBox.textContent = accountCreated
          ? `Your account was created, but the application could not be submitted: ${error.message || "Please try again."}`
          : error.message || "Your account and application could not be submitted. Please try again.";
        errorBox.classList.remove('hidden');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = supabaseClient ? "Create Account & Apply" : "Submit Application";
      }
    }

    // 2. Application Approvals (Creates active member account)
    async function approveApplication(appId) {
      const idx = applications.findIndex(a => a.id === appId);
      if (idx === -1) return;

      const app = applications[idx];
      if (supabaseClient) {
        try {
          const { error } = await supabaseClient.rpc('approve_workspace_application', {
            application_id: appId
          });
          if (error) throw error;
        } catch (error) {
          console.error("Unable to approve workspace application:", error);
          showToast(error.message || "Application approval failed. Confirm the applicant signed up and verified their email.", "error");
          return;
        }
      }

      app.status = 'approved';

      // Decide tier: if core is under 6, make core, otherwise backup
      const coreCount = members.filter(m => m.tier === 'core').length;
      const tier = coreCount < 6 ? 'core' : 'backup';

      const newMember = {
        id: 'mem-' + Date.now(),
        name: app.name,
        dept: app.dept,
        role: app.targetRole,
        tier: tier,
        skills: app.skills.split(',').map(s => s.trim()),
        github: app.portfolio,
        linkedin: app.linkedin || "https://linkedin.com",
        avatar: `https://placehold.co/150x150/4f46e5/ffffff?text=${app.name.charAt(0)}`
      };

      members.push(newMember);
      saveStorage('members', members);
      saveStorage('applications', applications);

      // Post an automatic announcement
      announcements.unshift({
        id: 'anno-' + Date.now(),
        text: `👋 Welcome ${app.name} (${app.dept}) as our new ${app.targetRole} (${tier.toUpperCase()})!`,
        link: ""
      });
      saveStorage('announcements', announcements);

      renderAll();
      showToast(`${app.name} approved and promoted to ${tier.toUpperCase()} team!`, "success");
    }

    function rejectApplication(appId) {
      applications = applications.filter(a => a.id !== appId);
      saveStorage('applications', applications);
      renderAdminDashboard();
      showToast("Application rejected and archived", "info");
    }

    // 3. Member Tier Swapping (Core <-> Backup)
    function toggleMemberTier(memberId) {
      const member = members.find(m => m.id === memberId);
      if (!member) return;

      const previousTier = member.tier;
      member.tier = previousTier === 'core' ? 'backup' : 'core';
      saveStorage('members', members);
      renderAll();
      showToast(`${member.name} moved from ${previousTier.toUpperCase()} to ${member.tier.toUpperCase()}`, "info");
    }

    function deleteMember(memberId) {
      members = members.filter(m => m.id !== memberId);
      saveStorage('members', members);
      renderAll();
      showToast("Member removed from roster", "info");
    }

    // 4. Chat Messages
    function handleSendChat(e) {
      e.preventDefault();
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMsg = {
        id: 'msg-' + Date.now(),
        author: currentUser ? currentUser.name : 'Squad Guest',
        role: currentUser ? currentUser.role : 'member',
        text: text,
        time: timeStr
      };

      chats.push(newMsg);
      saveStorage('chats', chats);
      input.value = '';
      renderChat();
    }

    // 5. Sprint Tasks Management
    function openAddTaskModal() {
      document.getElementById('modal-task').classList.remove('hidden');
    }

    function closeTaskModal() {
      document.getElementById('modal-task').classList.add('hidden');
      document.getElementById('task-form').reset();
    }

    function handleSaveTask(e) {
      e.preventDefault();
      const newTask = {
        id: 'task-' + Date.now(),
        title: document.getElementById('task-title').value.trim(),
        assignee: document.getElementById('task-assignee').value,
        priority: document.getElementById('task-priority').value,
        status: 'todo'
      };

      tasks.push(newTask);
      saveStorage('tasks', tasks);
      closeTaskModal();
      renderTasks();
      showToast("Task added to sprint board!", "success");
    }

    function moveTask(taskId, newStatus) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.status = newStatus;
        saveStorage('tasks', tasks);
        renderTasks();
      }
    }

    function deleteTask(taskId) {
      tasks = tasks.filter(t => t.id !== taskId);
      saveStorage('tasks', tasks);
      renderTasks();
      showToast("Task removed", "info");
    }

    // 6. Project Management (CMS)
    function openNewProjectModal() {
      document.getElementById('proj-edit-id').value = '';
      document.getElementById('project-form').reset();
      document.getElementById('project-modal-title').textContent = "Add Hackathon Project";
      document.getElementById('modal-project').classList.remove('hidden');
    }

    function closeProjectModal() {
      document.getElementById('modal-project').classList.add('hidden');
    }

    function editProject(id) {
      const p = projects.find(item => item.id === id);
      if (!p) return;

      document.getElementById('proj-edit-id').value = p.id;
      document.getElementById('proj-title').value = p.title;
      document.getElementById('proj-desc').value = p.desc;
      document.getElementById('proj-tags').value = p.tags.join(', ');
      document.getElementById('proj-github').value = p.github;
      document.getElementById('proj-demo').value = p.demo;
      document.getElementById('project-modal-title').textContent = "Edit Project";
      document.getElementById('modal-project').classList.remove('hidden');
    }

    function handleSaveProject(e) {
      e.preventDefault();
      const editId = document.getElementById('proj-edit-id').value;
      const title = document.getElementById('proj-title').value.trim();
      const desc = document.getElementById('proj-desc').value.trim();
      const tags = document.getElementById('proj-tags').value.split(',').map(t => t.trim());
      const github = document.getElementById('proj-github').value.trim();
      const demo = document.getElementById('proj-demo').value.trim();

      if (editId) {
        const p = projects.find(item => item.id === editId);
        if (p) {
          p.title = title;
          p.desc = desc;
          p.tags = tags;
          p.github = github;
          p.demo = demo;
        }
      } else {
        projects.unshift({
          id: 'proj-' + Date.now(),
          title, desc, tags, github, demo
        });
      }

      saveStorage('projects', projects);
      closeProjectModal();
      renderProjects();
      showToast("Project catalog updated!", "success");
    }

    function deleteProject(id) {
      projects = projects.filter(p => p.id !== id);
      saveStorage('projects', projects);
      renderProjects();
      showToast("Project deleted", "info");
    }

    // 7. Announcements Management
    function openAnnouncementModal() {
      document.getElementById('announcement-form').reset();
      document.getElementById('modal-announcement').classList.remove('hidden');
    }

    function closeAnnouncementModal() {
      document.getElementById('modal-announcement').classList.add('hidden');
    }

    function handleSaveAnnouncement(e) {
      e.preventDefault();
      const text = document.getElementById('anno-content').value.trim();
      const link = document.getElementById('anno-link').value.trim();

      announcements.unshift({
        id: 'anno-' + Date.now(),
        text, link
      });

      saveStorage('announcements', announcements);
      closeAnnouncementModal();
      renderAnnouncements();
      showToast("New announcement pushed to live ticker!", "success");
    }

    function deleteAnnouncement(id) {
      announcements = announcements.filter(a => a.id !== id);
      saveStorage('announcements', announcements);
      renderAnnouncements();
      showToast("Announcement removed", "info");
    }

    // 8. Custom Member Add Modal
    function openAddMemberModal() {
      document.getElementById('member-form').reset();
      document.getElementById('modal-member').classList.remove('hidden');
    }

    function closeMemberModal() {
      document.getElementById('modal-member').classList.add('hidden');
    }

    function handleSaveCustomMember(e) {
      e.preventDefault();
      const name = document.getElementById('new-mem-name').value.trim();
      const dept = document.getElementById('new-mem-dept').value.trim();
      const tier = document.getElementById('new-mem-tier').value;
      const role = document.getElementById('new-mem-role').value.trim();
      const skills = document.getElementById('new-mem-skills').value.split(',').map(s => s.trim());

      members.push({
        id: 'mem-' + Date.now(),
        name, dept, role, tier, skills,
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        avatar: `https://placehold.co/150x150/6366f1/ffffff?text=${name.charAt(0)}`
      });

      saveStorage('members', members);
      closeMemberModal();
      renderAll();
      showToast(`Added ${name} to squad roster!`, "success");
    }

    // ===============================================================
    // HACKATHON COUNTDOWN TIMER
    // ===============================================================
    function initCountdown() {
      // Countdown target: 7 days from now
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);
      targetDate.setHours(targetDate.getHours() + 14);

      function updateClock() {
        const now = new Date().getTime();
        const difference = targetDate.getTime() - now;

        if (difference < 0) return;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('timer-days').textContent = String(days).padStart(2, '0');
        document.getElementById('timer-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('timer-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('timer-seconds').textContent = String(seconds).padStart(2, '0');
      }

      updateClock();
      setInterval(updateClock, 1000);
    }

    // ===============================================================
    // TOAST NOTIFICATIONS & SANITIZATION UTILS
    // ===============================================================
    function showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      const icon = document.getElementById('toast-icon');
      const msg = document.getElementById('toast-msg');

      msg.textContent = message;

      if (type === 'success') {
        icon.className = 'fa-solid fa-circle-check text-emerald-400';
      } else if (type === 'error') {
        icon.className = 'fa-solid fa-circle-xmark text-red-400';
      } else if (type === 'warning') {
        icon.className = 'fa-solid fa-triangle-exclamation text-amber-400';
      } else {
        icon.className = 'fa-solid fa-circle-info text-blue-400';
      }

      toast.classList.remove('translate-y-24', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
      }, 3500);
    }

    function escapeHtml(string) {
      if (!string) return '';
      return String(string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function safeExternalUrl(value) {
      try {
        const url = new URL(String(value || ''));
        return ['http:', 'https:'].includes(url.protocol) ? url.href : '#';
      } catch {
        return '#';
      }
    }

    window.addEventListener('load', initializeApp);
