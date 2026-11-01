const JOIN_CONFIG = window.NEXUS_SUPABASE_CONFIG || {};
const joinHasSupabaseConfig = Boolean(JOIN_CONFIG.url && JOIN_CONFIG.anonKey);
const joinHasPartialConfig = Boolean(JOIN_CONFIG.url || JOIN_CONFIG.anonKey);
const joinSupabaseClient = window.supabase?.createClient && joinHasSupabaseConfig
  ? window.supabase.createClient(JOIN_CONFIG.url, JOIN_CONFIG.anonKey)
  : null;

function showJoinError(message) {
  const errorBox = document.getElementById('join-error-msg');
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

function initializeJoinPage() {
  const accountFields = document.getElementById('join-account-fields');
  const joinPassword = document.getElementById('join-password');
  const joinPasswordConfirm = document.getElementById('join-password-confirm');
  const submitButton = document.getElementById('join-submit-button');

  accountFields.classList.toggle('hidden', !joinSupabaseClient);
  [joinPassword, joinPasswordConfirm].forEach(input => {
    input.required = Boolean(joinSupabaseClient);
    input.disabled = !joinSupabaseClient;
  });
  document.getElementById('join-password-note').classList.toggle('hidden', !joinSupabaseClient);
  submitButton.textContent = joinSupabaseClient ? "Create Account & Apply" : "Submit Application";

  if (joinHasPartialConfig && !joinSupabaseClient) {
    showJoinError("Supabase is only partially configured. Add both the project URL and publishable key to js/config.js.");
  } else if (joinHasSupabaseConfig && !window.supabase?.createClient) {
    showJoinError("The Supabase SDK did not load. Check your internet connection and reload this page.");
  }

  document.getElementById('join-form').addEventListener('submit', handleJoinSubmit);
}

async function handleJoinSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const errorBox = document.getElementById('join-error-msg');
  const submitButton = document.getElementById('join-submit-button');
  const password = document.getElementById('join-password').value;
  const passwordConfirm = document.getElementById('join-password-confirm').value;

  errorBox.textContent = '';
  errorBox.classList.add('hidden');

  if (joinHasPartialConfig && !joinSupabaseClient) {
    showJoinError("Complete the Supabase setup before submitting an application.");
    return;
  }

  if (joinSupabaseClient && password !== passwordConfirm) {
    showJoinError("The passwords do not match.");
    return;
  }

  const newApplication = {
    id: `app-${Date.now()}`,
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
    if (joinSupabaseClient) {
      const { data: sessionData, error: sessionError } = await joinSupabaseClient.auth.getSession();
      if (sessionError) throw sessionError;
      if (sessionData.session) {
        throw new Error("You are already signed in. Sign out from the portfolio page before creating a new member account.");
      }

      const { data, error } = await joinSupabaseClient.auth.signUp({
        email: newApplication.email,
        password,
        options: {
          data: {
            full_name: newApplication.name,
            department: newApplication.dept,
            title: newApplication.targetRole,
            skills: newApplication.skills,
            github: newApplication.portfolio,
            linkedin: newApplication.linkedin,
            avatar_url: ''
          }
        }
      });
      if (error) throw error;
      if (!data.user || data.user.identities?.length === 0) {
        throw new Error("An account may already exist for this email. Try signing in or use a different email.");
      }
      accountCreated = true;

      if (data.session) {
        const { error: signOutError } = await joinSupabaseClient.auth.signOut();
        if (signOutError) throw signOutError;
      }

      const { error: applicationError } = await joinSupabaseClient.rpc('submit_workspace_application', {
        application_data: newApplication
      });
      if (applicationError) throw applicationError;
    } else {
      let existingApplications;
      try {
        existingApplications = JSON.parse(localStorage.getItem('nexus_applications') || '[]');
      } catch (error) {
        console.error("Unable to read local applications:", error);
        throw new Error("This browser could not load saved applications.");
      }
      if (!Array.isArray(existingApplications)) {
        throw new Error("Saved application data is invalid. Configure Supabase to submit a shared application.");
      }
      try {
        localStorage.setItem('nexus_applications', JSON.stringify([newApplication, ...existingApplications]));
      } catch (error) {
        console.error("Unable to save local application:", error);
        throw new Error("This browser could not save the application.");
      }
    }

    form.reset();
    document.getElementById('join-success-copy').textContent = joinSupabaseClient
      ? "Account created and application received. Confirm your email if requested; Workspace access is enabled only after admin approval."
      : "Application received. The team will follow up about your application.";
    document.getElementById('join-success-msg').classList.remove('hidden');
  } catch (error) {
    console.error("Unable to complete member registration:", error);
    showJoinError(accountCreated
      ? `Your account was created, but the application could not be submitted: ${error.message || "Please try again."}`
      : error.message || "Your account and application could not be submitted. Please try again.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = joinSupabaseClient ? "Create Account & Apply" : "Submit Application";
  }
}

window.addEventListener('DOMContentLoaded', initializeJoinPage);
