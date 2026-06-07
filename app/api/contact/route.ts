import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getPurposeLabel(purpose: string) {
  if (purpose === "quote") return "Quotation Request";
  if (purpose === "job") return "Job Application";
  return "General Inquiry";
}

function getPurposeBadgeColor(purpose: string) {
  if (purpose === "quote") return "#facc15";
  if (purpose === "job") return "#38bdf8";
  return "#34d399";
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    purpose,
    fullName,
    email,
    secondaryEmail,
    phone,
    city,
    message,
    cvFileName,
    cvFileType,
    cvFileUrl,
  } = body;

  if (!purpose || !fullName?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { message: "Please provide your name, email, purpose, and message." },
      { status: 400 }
    );
  }

  const cleanPurpose = String(purpose).trim();
  const cleanFullName = String(fullName).trim();
  const cleanEmail = String(email).trim();
  const cleanSecondaryEmail = secondaryEmail?.trim() || null;
  const cleanPhone = phone?.trim() || null;
  const cleanCity = city?.trim() || null;
  const cleanMessage = String(message).trim();

  try {
    const result = await prisma.contactMessage.create({
      data: {
        purpose: cleanPurpose,
        fullName: cleanFullName,
        email: cleanEmail,
        secondaryEmail: cleanSecondaryEmail || null,
        phone: cleanPhone,
        city: cleanCity,
        company: null,
        guards: null,
        message: cleanMessage,
        cvFileName: cvFileName?.trim() || null,
        cvFileType: cvFileType?.trim() || null,
        cvFileUrl: cvFileUrl?.trim() || null,
      },
    });

    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || "anasnadkar23@gmail.com";

    const purposeLabel = getPurposeLabel(cleanPurpose);
    const badgeColor = getPurposeBadgeColor(cleanPurpose);

    const subject =
      cleanPurpose === "quote"
        ? "New Quotation Request - Lajun Website"
        : cleanPurpose === "job"
          ? "New Job Application - Lajun Website"
          : "New Contact Inquiry - Lajun Website";

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from:
          process.env.CONTACT_FROM_EMAIL ||
          "Lajun Website <onboarding@resend.dev>",
        to: receiverEmail,
        subject,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>

            <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, Helvetica, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 32px 16px;">
                <tr>
                  <td align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 680px; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);">
                      
                      <tr>
                        <td style="background-color: #0f172a; padding: 32px;">
                          <p style="margin: 0 0 12px; color: #facc15; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                            Lajun Website
                          </p>

                          <h1 style="margin: 0; color: #ffffff; font-size: 26px; line-height: 1.3;">
                            ${escapeHtml(subject)}
                          </h1>

                          <p style="margin: 14px 0 0; color: #cbd5e1; font-size: 15px; line-height: 1.7;">
                            A new form submission has been received from the website.
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 28px 32px 10px;">
                          <span style="display: inline-block; background-color: ${badgeColor}; color: #0f172a; padding: 8px 14px; border-radius: 999px; font-size: 13px; font-weight: 700;">
                            ${escapeHtml(purposeLabel)}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 18px 32px 8px;">
                          <h2 style="margin: 0 0 18px; color: #0f172a; font-size: 18px;">
                            Contact Details
                          </h2>

                          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0 10px;">
                            <tr>
                              <td style="width: 38%; padding: 14px 16px; background-color: #f8fafc; border-radius: 12px 0 0 12px; color: #64748b; font-size: 14px; font-weight: 700;">
                                Full Name
                              </td>
                              <td style="padding: 14px 16px; background-color: #f8fafc; border-radius: 0 12px 12px 0; color: #0f172a; font-size: 14px; font-weight: 600;">
                                ${escapeHtml(cleanFullName)}
                              </td>
                            </tr>

                            <tr>
                              <td style="width: 38%; padding: 14px 16px; background-color: #f8fafc; border-radius: 12px 0 0 12px; color: #64748b; font-size: 14px; font-weight: 700;">
                                Primary Email
                              </td>
                              <td style="padding: 14px 16px; background-color: #f8fafc; border-radius: 0 12px 12px 0; color: #0f172a; font-size: 14px; font-weight: 600;">
                                ${escapeHtml(cleanEmail)}
                              </td>
                            </tr>

                            <tr>
                              <td style="width: 38%; padding: 14px 16px; background-color: #f8fafc; border-radius: 12px 0 0 12px; color: #64748b; font-size: 14px; font-weight: 700;">
                                Secondary Email
                              </td>
                              <td style="padding: 14px 16px; background-color: #f8fafc; border-radius: 0 12px 12px 0; color: #0f172a; font-size: 14px; font-weight: 600;">
                                ${escapeHtml(cleanSecondaryEmail || "Not provided")}
                              </td>
                            </tr>

                            <tr>
                              <td style="width: 38%; padding: 14px 16px; background-color: #f8fafc; border-radius: 12px 0 0 12px; color: #64748b; font-size: 14px; font-weight: 700;">
                                Phone
                              </td>
                              <td style="padding: 14px 16px; background-color: #f8fafc; border-radius: 0 12px 12px 0; color: #0f172a; font-size: 14px; font-weight: 600;">
                                ${escapeHtml(cleanPhone || "Not provided")}
                              </td>
                            </tr>

                            <tr>
                              <td style="width: 38%; padding: 14px 16px; background-color: #f8fafc; border-radius: 12px 0 0 12px; color: #64748b; font-size: 14px; font-weight: 700;">
                                City
                              </td>
                              <td style="padding: 14px 16px; background-color: #f8fafc; border-radius: 0 12px 12px 0; color: #0f172a; font-size: 14px; font-weight: 600;">
                                ${escapeHtml(cleanCity || "Not provided")}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 22px 32px 8px;">
                          <h2 style="margin: 0 0 14px; color: #0f172a; font-size: 18px;">
                            Message
                          </h2>

                          <div style="background-color: #f8fafc; border-left: 4px solid #facc15; border-radius: 14px; padding: 18px; color: #334155; font-size: 15px; line-height: 1.8; white-space: pre-line;">
                            ${escapeHtml(cleanMessage)}
                          </div>
                        </td>
                      </tr>

                      ${
                        cvFileUrl
                          ? `
                            <tr>
                              <td style="padding: 22px 32px 8px;">
                                <h2 style="margin: 0 0 14px; color: #0f172a; font-size: 18px;">
                                  Uploaded CV
                                </h2>

                                <div style="background-color: #f8fafc; border-radius: 14px; padding: 18px;">
                                  <p style="margin: 0 0 8px; color: #334155; font-size: 14px;">
                                    <strong>File Name:</strong> ${escapeHtml(cvFileName || "CV")}
                                  </p>

                                  <p style="margin: 0 0 16px; color: #334155; font-size: 14px;">
                                    <strong>File Type:</strong> ${escapeHtml(cvFileType || "Not provided")}
                                  </p>

                                  <a href="${escapeHtml(cvFileUrl)}" target="_blank" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 12px; font-size: 14px; font-weight: 700;">
                                    View Uploaded CV
                                  </a>
                                </div>
                              </td>
                            </tr>
                          `
                          : ""
                      }

                      <tr>
                        <td style="padding: 28px 32px 32px;">
                          <div style="border-top: 1px solid #e2e8f0; padding-top: 18px;">
                            <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.7;">
                              This email was generated automatically from the Lajun website contact form.
                            </p>
                          </div>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Contact form submission failed", error);

    return NextResponse.json(
      { message: "Failed to submit contact form." },
      { status: 500 }
    );
  }
}