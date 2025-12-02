import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Main API function
async function API(config) {
  try {
    // Inject token into headers
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    // ✔ Correct axios call (no recursion!)
    const response = await api(config);
    return response;

  } catch (err) {

    // Prevent crash if err.response = undefined
    if (!err.response) {
      console.error("Network / CORS error:", err);
      return null;
    }

    // Token expired
    if (err.response.status === 401) {
      try {
        // Get new token
        const { data } = await api.post("/auth/refresh");

        // Save new token
        localStorage.setItem("token", data.accessToken);

        // Attach refreshed token
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${data.accessToken}`,
        };

        // Retry original request
        return await api(config);

      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login";
        return refreshError.response;
      }
    }

    // Return backend error
    return err.response;
  }
}

// Logout function
export const logout = async () => {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    window.location.href = "/login";
  } catch (err) {
    console.log(err);
  }
};

export { API };
