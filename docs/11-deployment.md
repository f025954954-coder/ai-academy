# פריסה (Deployment)

## סטטוס
- ✅ פרויקט Git מקומי מסודר עם היסטוריית קומיטים ברורה (`F:\AI_Academy`, branch `main`)
- ✅ `npm run build` עובר נקי — כל 51 העמודים מתקמפלים בהצלחה, 0 שגיאות TypeScript
- ⬜ **דורש פעולה חד-פעמית מהמשתמש**: יצירת ריפו GitHub + חיבור ל-Vercel (ראה למטה בדיוק מה חסר)

## פלטפורמת האחסון שנבחרה: Vercel
Vercel היא היצרנית של Next.js והפלטפורמה הרשמית/מומלצת להרצתו — תמיכה מלאה ב-App Router, Server
Components, Route Handlers (ה-API של ה-Mentor), ו-Edge/Node runtimes ללא קונפיגורציה נוספת. אין
צורך ב-`vercel.json` — Next.js מזוהה אוטומטית.

## מה עדיין חסר ולמה
אין לי (לסוכן) הרשאות ליצור ריפו GitHub חדש או חשבון/טוקן Vercel — אלה פעולות שדורשות זהות המשתמש.
בדקתי: אין `gh` CLI מותקן, אין `GITHUB_TOKEN`/`VERCEL_TOKEN` בסביבה. **לא ניתן ליצור אותם בלעדיך.**

### מה שכן הושלם מראש כדי לצמצם את הפעולות הנדרשות ממך למינימום:
- הריפו המקומי מוכן לחלוטין (8 קומיטים מאורגנים)
- `.gitignore` שלם (node_modules, .next, .env*, screenshots)
- `.env.local.example` מתעד בדיוק אילו משתני סביבה אופציונליים קיימים

## מה שנותר לך לבצע (2 צעדים, ~3 דקות)

### צעד 1 — יצירת ריפו GitHub וחיבורו
```bash
# ב-GitHub: צור ריפו ריק בשם ai-academy (בלי README/gitignore/license — הריפו המקומי כבר מכיל הכל)
cd F:\AI_Academy
git remote add origin git@github.com:<your-username>/ai-academy.git
git push -u origin main
```
(אם תרצה שאני אבצע את ה-push בעצמי — פשוט תן לי את כתובת הריפו אחרי שיצרת אותו ריק, ואני אדאג לשאר.)

### צעד 2 — חיבור ל-Vercel ופריסה
1. היכנס ל-https://vercel.com והתחבר עם GitHub
2. "Add New Project" → בחר את ריפו `ai-academy`
3. **Root Directory:** הגדר ל-`app` (חשוב! הקוד נמצא בתת-תיקייה, לא בשורש הריפו)
4. Framework Preset: Next.js (מזוהה אוטומטית)
5. (אופציונלי) הוסף משתני סביבה תחת Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY`
   (אם תדלג על אלה — האתר יעבוד באופן מלא חוץ מהתחברות אמיתית ו-AI Mentor מלא, בדיוק כמו בסביבת הפיתוח)
6. Deploy

לחלופין: אם תרצה לתת לי גישה זמנית (טוקן Vercel אישי מ-https://vercel.com/account/tokens, בתוקף מוגבל, ולבטל אחרי), אני יכול להריץ את כל תהליך ה-`vercel --prod` בעצמי מכאן.

## פריסות עתידיות
לאחר החיבור הראשוני, **כל push ל-branch `main`** יגרום ל-deploy אוטומטי ב-Vercel (Continuous Deployment) — אין צורך בפעולה נוספת. Vercel גם יוצר Preview Deployment אוטומטי לכל branch/PR נפרד.
