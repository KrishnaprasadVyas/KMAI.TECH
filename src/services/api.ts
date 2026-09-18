export interface EnquiryPayload {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  description: string;
  preferredContact: string;
}

export const submitEnquiry = async (payload: EnquiryPayload): Promise<{ success: boolean; message: string }> => {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  if (!endpoint) {
    console.error('[API] VITE_CONTACT_ENDPOINT is not defined. Cannot submit enquiry.');
    return { 
      success: false, 
      message: 'Server configuration error: Contact endpoint is not configured. Please use the direct email option below.' 
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json().catch(() => ({}));
    return {
      success: true,
      message: data.message || 'Your project enquiry has been submitted successfully.',
    };
  } catch (error) {
    console.error('[API] Error submitting enquiry:', error);
    return {
      success: false,
      message: 'There was a network error submitting your enquiry. Please try again or use the direct contact options.',
    };
  }
};
