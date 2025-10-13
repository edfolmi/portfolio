import type { Project } from '../types';

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch('/api/projects'); // replace with real endpoint
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function submitContact(payload: { name: string; email: string; message: string }) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit contact');
  return res.json();
}
