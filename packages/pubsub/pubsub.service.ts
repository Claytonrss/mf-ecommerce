type Callback = (message: any) => void;

class PubSubService {
  private topics: Record<string, Callback[]> = {};

  subscribe(topic: string, callback: Callback) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    this.topics[topic].push(callback);
  }

  publish(topic: string, message: any) {
    if (!this.topics[topic]) {
      return;
    }

    for (const callback of this.topics[topic]) {
      callback(message);
    }
  }

  unsubscribe(topic: string, callback: Callback) {
    if (!this.topics[topic]) {
      return;
    }

    this.topics[topic] = this.topics[topic].filter((cb) => cb !== callback);
  }
}

export const pubSubService = new PubSubService();