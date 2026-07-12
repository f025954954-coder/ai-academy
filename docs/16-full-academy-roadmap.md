# הצעה: אקדמיה מלאה למהנדס תוכנת AI מקצועי (מוצג לאישור — טרם מומש)

זהו מסמך **הצעה**, לא תוכנית מבוצעת. הבקשה החדשה מרחיבה את היעד באופן מהותי: לא רק ללמד
Claude Code, אלא ללמד **איך בונים תוכנת AI אמיתית** — CRM, תוכנה משפטית, SaaS, סוכנים,
RAG, MCP, ואפליקציות עסקיות אמיתיות — כשClaude Code הוא סביבת הפיתוח הראשית לאורך כל הדרך.
זה שינוי כיוון אסטרטגי גדול מהמבנה בן 6 המודולים הנוכחי, ולכן מוצג לאישור לפני שממשיכים לבנות.

## עקרון מארגן
המבנה הנוכחי (foundations → programming-essentials → ai-foundations → prompt-engineering →
claude-code-mastery → ai-integration → ai-agents → production-ai → saas-capstone) נשאר
השלד הכללי, אבל **claude-code-mastery כבר לא "עוד טראק"** — הוא הופך לסביבת העבודה שדרכה
כל שאר הטראקים מלמדים את התוכן שלהם. במקום "טראק MCP" שמלמד MCP בבידוד, יש "טראק MCP" שבו
**כל שיעור מבוצע דרך Claude Code**, ומניב יכולת אמיתית באחד מכמה "פרויקטי עוגן" (ולא רק
ב-AtlasDesk לבד).

## פרויקטי עוגן מוצעים (לא רק AtlasDesk)
AtlasDesk (AI customer support SaaS) ימשיך להיות פרויקט העוגן המרכזי, אבל בהיקף הזה כדאי
2-3 פרויקטי עוגן נוספים, קטנים ומתמחים, שממחישים תחומים עסקיים שונים:
- **עוגן CRM/משפטי** — מערכת ניהול תיקים/לקוחות פשוטה (בהשראת הפרויקטים האמיתיים של המשתמש —
  ר' [[caseflow-app]] ב-memory) — ילמד auth/authz/multi-tenancy/OCR/Word add-ins בהקשר טבעי.
- **עוגן אוטומציה עסקית** — סוכן שמבצע browser automation + API integrations אמיתיים.
- AtlasDesk עצמו ממשיך לצבור: MCP, RAG, agents, multi-agent, billing, monitoring.

## מבנה טראקים מוצע (הרחבה, לא תחליף למה שכבר קיים)

### קיים ונשאר כפי שהוא
- Foundations (מקוצר) ✅ בנוי
- Programming Essentials for AI ✅ בנוי
- AI Foundations (ML/DL/LLMs) ✅ בנוי
- Prompt Engineering ✅ בנוי
- **Claude Code Mastery** ✅ מודולים 1-2 בנויים (4-6 ממתינים) — הופך ל"ציר" לא רק טראק

### טראקים חדשים מוצעים (לפי סדר לימוד)
1. **MCP ו-Tool Calling מעשי** — לא רק תיאוריה: לבנות שרת MCP אמיתי עם Claude Code, לחבר אותו
   ל-AtlasDesk, ולהבין tool schema/function calling מהצד המפתח.
2. **Embeddings, RAG ומסדי נתונים וקטוריים** — מעבדת embeddings אינטראקטיבית + RAG אמיתי על
   מסמכי AtlasDesk (knowledge base), pgvector/Supabase כמסד וקטורי.
3. **AI Agents יסודיים** — לולאת agent, memory, tool use, decision loop — סוכן תמיכה אמיתי
   שמקבל החלטות.
4. **Multi-Agent Systems** — orchestration, handoff בין סוכנים, escalation — AtlasDesk מקבל
   "צוות סוכנים".
5. **אבטחה, Auth ו-Authorization** — JWT/sessions, RBAC, multi-tenancy — נבנה על עוגן ה-CRM.
6. **אינטגרציות עסקיות מעשיות** — OCR (מסמכים סרוקים), browser automation (Playwright/
   Puppeteer), Word/Office add-ins, webhooks, API integrations חיצוניים אמיתיים.
7. **ארכיטקטורת רקע ואירועים** — background workers, queues (BullMQ/similar), event-driven
   architecture — למשל: עיבוד מסמכים אסינכרוני ב-AtlasDesk.
8. **Testing, Refactoring ואיכות קוד עם Claude Code** — TDD מעמיק, refactoring בטוח בקנה
   מידה, code review workflows — זה כבר מכוסה חלקית במודול 3 של Claude Code Mastery ומורחב כאן.
9. **תוכנת SaaS: Multi-tenancy, Billing, Payments** — Stripe-like billing simulation,
   הפרדת租 דיירים (tenants), תמחור.
10. **ניטור, Logging, ו-Production Debugging** — observability אמיתי (לא רק "מושג"), חקירת
    incident, לוגים מובנים.
11. **סקאלה וביצועים** — caching, database indexing, load testing בסיסי.
12. **Capstone עסקי אמיתי** — התלמיד בוחר: להרחיב את AtlasDesk, או לבנות עוגן חדש (CRM/משפטי/
    אוטומציה) מאפס, תוך יישום כל מה שנלמד — עם Claude Code כסביבת הפיתוח לאורך כל הדרך.

### נושא נפרד: Cursor מול Claude Code
מוצע שיעור/מודול משווה קצר (לא טראק שלם) בתוך Claude Code Mastery או כתוסף: מתי משתלם IDE-first
agentic tool (Cursor) מול CLI-first (Claude Code), יתרונות/חסרונות, ואיך לשלב את שניהם בפועל.

## מה נשאר לא ברור וטעון החלטת משתמש
1. **סדר**: האם MCP/RAG/Agents (המשך הרצף המקורי) קודמים, או שהאבטחה/Auth/CRM chunk
   (עוגן עסקי חדש) צריך לבוא מוקדם יותר כי הוא infrastructure שכל השאר בונה עליו?
2. **היקף עוגן CRM/משפטי**: לבנות פרויקט עוגן שני אמיתי (עומס עבודה גדול), או ללמד את
   אותם נושאים (auth/OCR/Word) כתוספות ל-AtlasDesk עצמו כדי לא לפצל מיקוד?
3. **עומק מול רוחב**: 12 הטראקים המוצעים לעיל, בעומק של Claude Code Mastery (5-6 שיעורים
   עמוקים לכל מודול), הם קוריקולום של שנים, לא חודשים. האם לתכנן לטווח כזה במפורש, או
   לתעדף קבוצת-על ("MVP ראשון" של הרחבה: MCP+RAG+Agents+Security) ולהמשיך משם?

**המלצה**: להתחיל בסבב הבא ב-MCP+RAG+Agents (המשך טבעי של הרצף שכבר קיים ב-data.ts), ובמקביל
להעשיר רטרואקטיבית את 73 שאלות הבוחן הישנות ואת עומק שיעורי היסודות (מ-[15-product-review.md](15-product-review.md)),
לפני שמתחילים בטראקים העסקיים (CRM/Security/Integrations) שדורשים החלטת עיצוב נוספת מהמשתמש.
