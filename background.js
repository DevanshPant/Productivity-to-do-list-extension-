// Function to authenticate the user using Google OAuth 2.0
async function authenticateUser() {
    return new Promise((resolve, reject) => {
      chrome.identity.launchWebAuthFlow(
        {
          url: `https://accounts.google.com/o/oauth2/auth?client_id=959270308026-up25u4j8gb67f0gj9noum2sooo13q0l3.apps.googleusercontent.com&response_type=token&redirect_uri=https://${chrome.runtime.id}.chromiumapp.org/&scope=https://www.googleapis.com/auth/tasks.readonly https://www.googleapis.com/auth/calendar.readonly`,
          interactive: true,
        },
        (redirectUrl) => {
          if (chrome.runtime.lastError || !redirectUrl) {
            reject(chrome.runtime.lastError || "Authentication failed");
            return;
          }
  
          const url = new URL(redirectUrl);
          const accessToken = url.hash.split("&")[0].split("=")[1];
          resolve(accessToken);
        }
      );
    });
  }
  
  // Fetch Google Tasks
  async function fetchGoogleTasks(accessToken) {
    const response = await fetch("https://www.googleapis.com/tasks/v1/users/@me/lists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    const data = await response.json();
    console.log("Tasks:", data.items);
    return data.items;
  }
  
  // Fetch Google Calendar Events
  async function fetchGoogleCalendar(accessToken) {
    const today = new Date().toISOString();
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${today}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  
    const data = await response.json();
    console.log("Calendar Events:", data.items);
    return data.items;
  }
  
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
  });
  