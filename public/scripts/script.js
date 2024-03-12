    // Function to fetch server time and update the DOM
    async function fetchTime() {
        try {
          const response = await fetch('/time');
          const data = await response.json();
          const serverTime = new Date(data.time);
          document.getElementById('time').innerText = serverTime.toLocaleTimeString();
        } catch (error) {
          console.error('Error fetching time:', error);
        }
      }
  
      // Update time every second
      setInterval(fetchTime, 1000);
  
      // Initial fetch
      fetchTime();