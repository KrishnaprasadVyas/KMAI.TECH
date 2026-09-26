export interface EnquiryPayload {
  name: string;
  email: string;
  message?: string;
  description?: string;
  company?: string;
  projectType?: string;
  budgetRange?: string;
  timeline?: string;
  preferredContact?: string;
}

export const submitEnquiry = async (payload: EnquiryPayload): Promise<{ success: boolean; message: string }> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      message: payload.message || payload.description || '',
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Server responded with status ${response.status}`);
  }

  const data = await response.json().catch(() => ({}));
  return {
    success: true,
    message: data.message || 'Your project inquiry has been submitted successfully.',
  };
};
