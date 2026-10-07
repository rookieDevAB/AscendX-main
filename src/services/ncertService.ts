import { ncertBooks } from '@/data/ncertBooks';

export interface Book {
  id: string;
  title: string;
  subject: string;
  class: string;
  pdfUrl: string;
  pages?: number;
  category?: string;
  rating?: number;
  coverImage?: string;
  isRecommended?: boolean;
  isOwned?: boolean;
}

export const fetchNCERTBooks = async (language: string): Promise<Book[]> => {
  try {
    // Use the actual data from ncertBooks
    if (language && ncertBooks[language as keyof typeof ncertBooks]) {
      return ncertBooks[language as keyof typeof ncertBooks];
    }
    
    // If language not found, return English books as default
    return ncertBooks.english;
  } catch (error) {
    console.error('Error fetching NCERT books:', error);
    throw error;
  }
};