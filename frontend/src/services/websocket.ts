import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect() {
    const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:5000';
    
    this.socket = io(wsUrl, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    });

    return this.socket;
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, 1000 * this.reconnectAttempts);
    }
  }

  joinUserRoom(userId: string) {
    if (this.socket) {
      this.socket.emit('join-user-room', userId);
    }
  }

  subscribeToUpdates(preferences: any, callback: (updates: any) => void) {
    if (this.socket) {
      this.socket.emit('subscribe-to-updates', preferences);
      this.socket.on('content-updates', callback);
    }
  }

  subscribeToTrending(callback: (trending: any) => void) {
    if (this.socket) {
      this.socket.on('trending-update', callback);
    }
  }

  realTimeSearch(query: string, callback: (results: any) => void) {
    if (this.socket) {
      this.socket.emit('real-time-search', query);
      this.socket.on('search-results', callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export const wsService = new WebSocketService();