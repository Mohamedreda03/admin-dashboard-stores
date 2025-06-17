# Admin Dashboard Stores

لوحة تحكم إدارية شاملة لإدارة المتاجر والمنتجات.

## المشاكل التي تم إصلاحها

### 1. مشاكل Prisma Schema
- تم إصلاح العلاقات بين النماذج (Relations)
- تم تصحيح أسماء العلاقات في Product, Size, Color, وImage models

### 2. مشاكل API Routes
- تم إضافة معالجة صحيحة للأخطاء في جميع ملفات API
- تم إصلاح مشكلة عدم إرجاع استجابة خطأ في catch blocks

### 3. مشاكل UI Components
- تم إصلاح استخدام params خاطئة في ColorForm
- تم إصلاح استخدام URLs خاطئة في sizes cell-action
- تم تصحيح رسائل التوست (toast messages)

## إعداد المشروع

### 1. متطلبات البيئة
قم بإنشاء ملف `.env.local` في جذر المشروع مع المتغيرات التالية:

```env
# Database URL - MongoDB connection string
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"

# Clerk Auth Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Cloudinary for image uploads
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
```

### 2. تثبيت الحزم
```bash
npm install
```

### 3. إعداد قاعدة البيانات
```bash
# إنشاء Prisma Client
npx prisma generate

# تطبيق Schema على قاعدة البيانات (إذا كانت موجودة)
npx prisma db push
```

### 4. تشغيل المشروع
```bash
npm run dev
```

## خدمات مطلوبة

### 1. MongoDB Database
- يمكنك استخدام MongoDB Atlas (مجاني)
- أو تثبيت MongoDB محلياً

### 2. Clerk Authentication
- أنشئ حساب على [Clerk.dev](https://clerk.dev)
- احصل على API keys من dashboard

### 3. Cloudinary (للصور)
- أنشئ حساب على [Cloudinary](https://cloudinary.com)
- احصل على Cloud Name

## الميزات

- ✅ إدارة المتاجر المتعددة
- ✅ إدارة المنتجات والفئات
- ✅ إدارة الألوان والأحجام
- ✅ إدارة اللوحات الإعلانية (Billboards)
- ✅ إدارة الطلبات
- ✅ تحليلات المبيعات والإيرادات
- ✅ رفع الصور
- ✅ نظام صلاحيات

## التقنيات المستخدمة

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Clerk
- **UI**: Tailwind CSS, Radix UI
- **Forms**: React Hook Form with Zod validation
- **File Upload**: Cloudinary

## هيكل المشروع

```
├── app/
│   ├── (auth)/                 # صفحات المصادقة
│   ├── (dashboard)/           # لوحة التحكم
│   └── api/                   # API endpoints
├── components/                # مكونات UI
├── lib/                      # مكتبات مساعدة
├── prisma/                   # Prisma schema
└── providers/                # React providers
```

## ملاحظات مهمة

1. تأكد من إعداد جميع متغيرات البيئة قبل تشغيل المشروع
2. قم بإنشاء قاعدة بيانات MongoDB قبل تشغيل migrations
3. احرص على أخذ نسخ احتياطية من قاعدة البيانات بانتظام
4. لا تشارك ملف `.env.local` في Git

## المساهمة

إذا واجهت أي مشاكل أو لديك اقتراحات للتحسين، يرجى فتح issue أو pull request.
