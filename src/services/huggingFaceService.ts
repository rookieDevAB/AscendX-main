import axios from 'axios';

export interface NCERTChapter {
  id: string;
  title: string;
  subject: string;
  class: string;
  language: string;
  content: string;
  chapterNumber: number;
}

// Replace with your actual dataset name and organization
const DATASET_OWNER = 'KadamParth';
const DATASET_NAME = 'Ncert_Dataset';

interface RawHFChapterItem {
  id?: string;
  title: string;
  subject: string;
  class: string;
  language: string;
  content: string;
  chapterNumber?: number;
  chapter_number?: number;
}

export const fetchNCERTChapters = async (language: string): Promise<NCERTChapter[]> => {
  try {
    // Hugging Face API endpoint for datasets
    const response = await axios.get(
      `https://huggingface.co/api/datasets/${DATASET_OWNER}/${DATASET_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`
        }
      }
    );
    
    // Filter by language and map to our interface
    // Note: Adjust this based on your actual dataset structure
    const rawData = Array.isArray(response.data) ? (response.data as RawHFChapterItem[]) : [];
    const chapters = rawData
      .filter((item: RawHFChapterItem) => item.language === language)
      .map((item: RawHFChapterItem) => ({
        id: item.id || `${item.language}_${item.subject}_${item.chapterNumber ?? item.chapter_number ?? 0}`,
        title: item.title,
        subject: item.subject,
        class: item.class,
        language: item.language,
        content: item.content,
        chapterNumber: item.chapterNumber ?? item.chapter_number ?? 0
      }));
    
    return chapters;
  } catch (error) {
    console.error('Error fetching NCERT chapters:', error);
    throw error;
  }
};