const clearToken = async () => {
    try {
      const response = await fetch("/api/token", { method: "DELETE" });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to clear token");
  
      console.log(data.message); // Success message
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  
export default clearToken;
  