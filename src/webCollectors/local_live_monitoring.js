
export async function localLiveMonitoring() {
    try {
      const response = await fetch('http://localhost:3000/dataSys');
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}