export const API = {
  async getProducts() {
    const res = await fetch('/api/products');
    return res.json();
  },

  async saveDesign(design: any) {
    const res = await fetch('/api/save-design', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ design }),
    });
    return res.json();
  },
};
