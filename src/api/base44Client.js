/**
 * API Client for Biryani House Backend
 * Connects to Express.js + MongoDB backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Response Error:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new Error(
          errorData.error?.message ||
            errorData.message ||
            `API request failed: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  get entities() {
    return {
      MenuItem: {
        list: async (orderBy) => {
          const queryParams = new URLSearchParams();
          // orderBy is not used in the current implementation
          const data = await this.request("/menu-items");
          return data;
        },

        filter: async (filters) => {
          const queryParams = new URLSearchParams(filters);
          const data = await this.request(`/menu-items?${queryParams}`);
          return data;
        },

        create: async (itemData) => {
          const data = await this.request("/menu-items", {
            method: "POST",
            body: JSON.stringify(itemData),
          });
          return data;
        },

        update: async (id, itemData) => {
          const data = await this.request(`/menu-items/${id}`, {
            method: "PUT",
            body: JSON.stringify(itemData),
          });
          return data;
        },

        delete: async (id) => {
          const data = await this.request(`/menu-items/${id}`, {
            method: "DELETE",
          });
          return data;
        },
      },

      Order: {
        list: async (orderBy) => {
          const queryParams = new URLSearchParams();
          if (orderBy === "-created_date") {
            queryParams.append("sort", "-order_date");
          }
          const data = await this.request(`/orders?${queryParams}`);
          return data;
        },

        filter: async (filters) => {
          const queryParams = new URLSearchParams(filters);
          const data = await this.request(`/orders?${queryParams}`);
          return data;
        },

        create: async (orderData) => {
          const data = await this.request("/orders", {
            method: "POST",
            body: JSON.stringify(orderData),
          });
          return data;
        },

        updateStatus: async (id, status) => {
          const data = await this.request(`/orders/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
          });
          return data;
        },

        delete: async (id) => {
          const data = await this.request(`/orders/${id}`, {
            method: "DELETE",
          });
          return data;
        },
      },
    };
  }
}

// Export singleton instance
export const base44 = new APIClient(API_BASE_URL);
