export default function Privacy() {
    return (
        <div className="container mx-auto px-4 py-8 rtl">
            <h1 className="text-3xl font-bold mb-8">سياسة الخصوصية وحماية البيانات</h1>

            <div className="prose max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">١. جمع البيانات الشخصية</h2>
                    <p className="mb-4">
                        نقوم بجمع البيانات التالية:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>عنوان IP</li>
                        <li>معلومات المتصفح</li>
                        <li>تفضيلات اللغة</li>
                        <li>سجل التصفح على موقعنا</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">٢. استخدام ملفات تعريف الارتباط</h2>
                    <p className="mb-4">
                        نستخدم ملفات تعريف الارتباط للأغراض التالية:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>تحسين تجربة المستخدم</li>
                        <li>تحليل حركة المرور</li>
                        <li>تخصيص المحتوى</li>
                        <li>حفظ تفضيلات المستخدم</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">٣. حقوق المستخدم</h2>
                    <p className="mb-4">
                        لديك الحق في:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>الوصول إلى بياناتك</li>
                        <li>تصحيح بياناتك</li>
                        <li>حذف بياناتك</li>
                        <li>الاعتراض على معالجة بياناتك</li>
                    </ul>
                </section>
            </div>
        </div>
    );
} 