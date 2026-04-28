/**
 * Keep-Alive Service for Render Free Tier
 * Prevents cold start by sending periodic requests to the backend
 * Runs a ping every 10 minutes (600,000 ms) to keep service active within 15-min window
 */

class KeepAliveService {
  constructor() {
    this.intervalId = null;
    this.isRunning = false;
    this.pingInterval = 10 * 60 * 1000; // 10 minutes in milliseconds
  }

  /**
   * Start the keep-alive pinger
   */
  start() {
    if (this.isRunning) {
      console.warn('[KeepAlive] Service already running');
      return;
    }

    this.isRunning = true;
    console.log('[KeepAlive] Service started - pinging every 10 minutes');

    // Send immediate ping on start
    this.ping();

    // Set up interval for periodic pings
    this.intervalId = setInterval(() => {
      this.ping();
    }, this.pingInterval);
  }

  /**
   * Stop the keep-alive pinger
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('[KeepAlive] Service stopped');
  }

  /**
   * Send a ping request to the backend
   */
  async ping() {
    try {
      const response = await fetch('/api/keep-alive/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[KeepAlive] Ping successful at', data.timestamp);
      } else {
        console.warn('[KeepAlive] Ping failed with status', response.status);
      }
    } catch (error) {
      console.error('[KeepAlive] Ping error:', error);
      // Silently fail - don't break the app if ping fails
    }
  }
}

// Export singleton instance
export default new KeepAliveService();
