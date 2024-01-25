/**
 * Gets local system metrics data
 * @returns system data
 */
export const localLiveMonitoring = async (url = 'http://localhost:9091/dataSys') => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}