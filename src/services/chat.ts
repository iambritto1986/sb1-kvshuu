export const openTeamsChat = (email: string) => {
  // Opens Teams chat with the specified user
  const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}`;
  window.open(teamsUrl, '_blank');
};

export const openSlackDM = (email: string) => {
  // In a real implementation, this would use Slack's Web API to find the user's Slack ID
  // For now, we'll just open Slack with a deep link
  const slackUrl = `slack://user?team=YOUR_TEAM_ID&id=USER_ID`;
  window.open(slackUrl, '_blank');
  
  // Fallback for web
  setTimeout(() => {
    window.open('https://slack.com/app_redirect?channel=YOUR_CHANNEL_ID', '_blank');
  }, 1000);
};