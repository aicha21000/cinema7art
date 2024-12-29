interface ArabicNewsItem {
    id: string;
    title: string;
    content: string;
    source: string;
    publishDate: Date;
    category: 'نجوم' | 'شائعات' | 'أخبار' | 'نقد' | 'مقابلات';
    type: 'خبر' | 'شائعة' | 'نميمة' | 'تحليل' | 'مقال';
    reliability: 'موثوق' | 'غير مؤكد' | 'شائعة';
    celebrities?: {
        name: string;
        arabicName: string;
        role: string;
    }[];
    movies?: {
        title: string;
        arabicTitle: string;
        year: number;
    }[];
    images?: string[];
    tags: string[];
} 