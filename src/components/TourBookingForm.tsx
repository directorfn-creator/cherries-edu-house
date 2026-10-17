import React, { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { CHERRIES_CONTENT, CHERRIES_INFO } from "@/lib/cherries-data";
import { Calendar, CheckCircle2, MessageCircle, AlertCircle, Clock, Sparkles } from "lucide-react";

// Form tracking types and helper strictly following skill/form-tracking
type StandardTrackingFieldKey = string;
type RegisteredCustomFieldId = string;
type TrackingCustomField = { value?: unknown; label: string };
type TrackingFileField = { file?: File; label: string };
type TrackingImageDataField = { dataUrl?: string; label: string };

const postTrackingEvent = (
  trackingPayload: Record<string, unknown> & {
    formData: Record<StandardTrackingFieldKey, unknown>;
    formLabels: Record<StandardTrackingFieldKey, string>;
  },
  options: {
    customFields?: Record<RegisteredCustomFieldId, TrackingCustomField>;
    fileFields?: Record<RegisteredCustomFieldId, TrackingFileField>;
    imageDataFields?: Record<RegisteredCustomFieldId, TrackingImageDataField>;
  } = {},
) => {
  const { customFields = {}, fileFields = {}, imageDataFields = {} } = options;
  const eventPayload = {
    ...trackingPayload,
    formData: { ...trackingPayload.formData },
    formLabels: { ...trackingPayload.formLabels },
  };
  const body = new FormData();

  for (const [key, field] of Object.entries(customFields)) {
    if (field.value === undefined) continue;
    eventPayload.formData[key] = field.value;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(imageDataFields)) {
    const dataUrl = field.dataUrl;
    if (!dataUrl) continue;
    if (!dataUrl.startsWith("data:image/")) {
      throw new Error("Image data field must be a data:image/* base64 string");
    }
    eventPayload.formData[key] = dataUrl;
    eventPayload.formLabels[key] = field.label;
  }

  for (const [key, field] of Object.entries(fileFields)) {
    const file = field.file;
    if (!file) continue;
    if (file.size > 50 * 1024 * 1024) {
      throw new Error("File must be 50 MB or smaller");
    }
    eventPayload.formData[key] = {
      filename: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
    };
    eventPayload.formLabels[key] = field.label;
    body.append(key, file, file.name);
  }

  for (const key of Object.keys(eventPayload.formData)) {
    eventPayload.formLabels[key] ||= key;
  }

  body.append("event", JSON.stringify(eventPayload));

  fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
    method: "POST",
    headers: {
      version: "2021-07-28",
    },
    body,
  }).catch(() => {}); // Fire-and-forget — don't block form UX
};

const getTrackingSessionId = () => {
  try {
    const sid = document.cookie.match(/(?:^|;\s*)__vibe_sid=([0-9a-f-]{36})(?:;|$)/)?.[1];
    if (sid) return sid;
  } catch {}
  return crypto.randomUUID();
};

export function TourBookingForm() {
  const { language, isAr } = useLanguage();
  const t = CHERRIES_CONTENT[language].tour;

  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [contactTime, setContactTime] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!parentName.trim()) {
      setErrorMsg(isAr ? "يرجى كتابة اسم ولي الأمر." : "Please enter the parent/guardian name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(
        isAr ? "يرجى كتابة رقم الهاتف للتواصل." : "Please enter your contact phone number.",
      );
      return;
    }
    if (!consent) {
      setErrorMsg(
        isAr
          ? "يرجى الموافقة على تواصل الحضانة معكم."
          : "Please consent to be contacted regarding this request.",
      );
      return;
    }

    setIsSubmitting(true);

    // Standard fields: phone, first_name/last_name, calendar_notes
    const names = parentName.trim().split(" ");
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ") || "";

    const trackingPayload = {
      type: "external_form_submission",
      timestamp: Date.now(),
      formId: "cherries-tour-booking-form",
      formData: {
        first_name: firstName,
        last_name: lastName,
        phone: phone.trim(),
        calendar_notes: message.trim() || undefined,
      },
      formLabels: {
        first_name: isAr ? "الاسم الأول" : "First Name",
        last_name: isAr ? "اسم العائلة" : "Last Name",
        phone: isAr ? "رقم الهاتف" : "Phone Number",
        calendar_notes: isAr ? "الرسالة والملاحظات" : "Message or Notes",
      },
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      trackingId: "tk_b09aaa71fc944fc3b9c3226f928ed039",
      locationId: "7Te4wntEk0K0x2b3z1Bj",
      projectId: "1792242112629771035",
      sessionId: getTrackingSessionId(),
      properties: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "mobile" : "desktop",
        source: "ai_studio",
        projectId: "1792242112629771035",
        formName: "Cherries Nursery Tour Request",
      },
    };

    // Registered custom fields:
    // 8T7FBDZNHrj5kmXw9WmQ -> Program of Interest
    // EAW77Cfh47xjYFibRcZg -> Preferred Visit Date
    // pK1mwVu6RSkUt2I70Qdj -> Best Time to Contact
    postTrackingEvent(trackingPayload, {
      customFields: {
        "8T7FBDZNHrj5kmXw9WmQ": {
          value: program || (isAr ? "غير محدد" : "Not specified"),
          label: isAr ? "الفصل المطلوب" : "Program of Interest",
        },
        EAW77Cfh47xjYFibRcZg: {
          value: preferredDate || (isAr ? "غير محدد" : "Not specified"),
          label: isAr ? "تاريخ الزيارة المفضل" : "Preferred Visit Date",
        },
        pK1mwVu6RSkUt2I70Qdj: {
          value: contactTime || (isAr ? "غير محدد" : "Not specified"),
          label: isAr ? "أفضل وقت للتواصل" : "Best Time to Contact",
        },
      },
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const getWhatsAppPrefillUrl = () => {
    const text = isAr
      ? `مرحباً حضانة Cherries Edu House، أرغب في طلب حجز زيارة للحضانة:\n- الاسم: ${parentName || "غير محدد"}\n- الهاتف: ${phone || "غير محدد"}\n- الفصل: ${program || "غير محدد"}\n- تاريخ الزيارة المقترح: ${preferredDate || "غير محدد"}\n- وقت التواصل المفضل: ${contactTime || "غير محدد"}\n- ملاحظات: ${message || "لا توجد"}`
      : `Hello Cherries Edu House, I would like to request a nursery tour:\n- Name: ${parentName || "Not specified"}\n- Phone: ${phone || "Not specified"}\n- Program: ${program || "Not specified"}\n- Preferred Visit Date: ${preferredDate || "Not specified"}\n- Best Time to Contact: ${contactTime || "Not specified"}\n- Notes: ${message || "None"}`;
    return `https://wa.me/201277604444?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="tour" className="relative scroll-mt-24">
      <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-lg shadow-primary/5">
        {/* Section Heading inside card */}
        <div className="max-w-2xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/20 text-foreground mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            {t.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.subtitle}
          </p>
          <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-secondary/70 border border-border text-xs text-foreground/80">
            <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{t.notice}</span>
          </div>
        </div>

        {isSubmitted ? (
          <div className="rounded-2xl border border-primary/40 bg-accent/30 p-6 sm:p-8 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{t.form.successTitle}</h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              {t.form.successMsg}
            </p>
            <div className="p-4 rounded-xl bg-card border border-border max-w-md mx-auto text-xs text-muted-foreground space-y-3">
              <p className="font-medium text-foreground">{t.form.whatsappRedirectNote}</p>
              <a
                href={getWhatsAppPrefillUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-95 transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.form.whatsappInstant}</span>
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setParentName("");
                setPhone("");
                setMessage("");
                setConsent(false);
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline pt-2"
            >
              {isAr ? "إرسال طلب زيارة آخر" : "Submit another request"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Parent Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground">
                  {t.form.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder={t.form.namePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground">
                  {t.form.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.form.phonePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Class/Program */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground">
                  {t.form.programLabel}
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                >
                  <option value="">{t.form.programSelectPlaceholder}</option>
                  {t.form.programs.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Visit Date */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground">
                  {t.form.preferredDateLabel}
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>

              {/* Best Time to Contact */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground">
                  {t.form.timeLabel}
                </label>
                <input
                  type="text"
                  value={contactTime}
                  onChange={(e) => setContactTime(e.target.value)}
                  placeholder={t.form.timePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                {t.form.messageLabel}
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.form.messagePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            {/* Consent checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="tour-consent"
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary/40"
              />
              <label
                htmlFor="tour-consent"
                className="text-xs text-muted-foreground leading-normal cursor-pointer"
              >
                {t.form.consentLabel}
              </label>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:brightness-95 transition-all shadow-xs disabled:opacity-50"
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {isSubmitting ? (isAr ? "جاري الإرسال..." : "Submitting...") : t.form.submitBtn}
                </span>
              </button>

              <a
                href={getWhatsAppPrefillUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-accent hover:border-primary/40 transition-all shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                <span>{t.form.whatsappInstant}</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
