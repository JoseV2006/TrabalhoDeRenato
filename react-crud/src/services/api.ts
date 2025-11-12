export const API_URL = 'http://localhost:5173/items';

export async function getItems() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addItem(item: any) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function updateItem(id: number, item: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function deleteItem(id: number) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}
