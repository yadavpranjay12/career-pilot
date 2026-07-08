export const getUserIdFromToken = () => {
  const token = localStorage.getItem('careerpilot_token');
  if (!token) return null;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );
    
    const payload = JSON.parse(jsonPayload);
    // Use payload.userId as per the backend JWT structure
    return payload.userId;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};