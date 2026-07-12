import nodemailer from 'nodemailer';
import path from 'path';

// Load email credentials
const user = process.env.GMAIL_USER;
const clientId = process.env.GMAIL_CLIENT_ID;
const clientSecret = process.env.GMAIL_CLIENT_SECRET;
const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
const adminEmails = process.env.ADMIN_EMAIL || 'madhavannadar23@gmail.com';

const canSendEmail = user && clientId && clientSecret && refreshToken;

let transporter = null;

if (canSendEmail) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: user,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken
        }
    });
    console.log('📧 Mailer: Transporter initialized successfully with OAuth2 credentials.');
} else {
    console.warn('⚠️ Mailer: Gmail OAuth2 credentials missing in .env. Email notifications will be skipped.');
}

/**
 * Sends a premium formatted HTML email to the admin notifying them of a new candidate application.
 * 
 * @param {Object} details Candidate details
 * @param {string} details.name Candidate name
 * @param {string} details.email Candidate email
 * @param {string} details.mobile Candidate mobile
 * @param {string} details.role Applied role
 * @param {string} details.platform Division platform (pmc or epc)
 * @param {string} details.fileName Original filename of the resume
 * @param {string} details.filePath Absolute URL/local path of the uploaded resume
 */
export const sendApplicationEmail = async (details) => {
    if (!transporter) {
        console.warn('⚠️ Mailer: Email service is not configured. Skipping email dispatch.');
        return;
    }

    try {
        const { name, email, mobile, role, platform, fileName, filePath } = details;
        const displayPlatform = (platform || 'pmc').toUpperCase();
        
        // Define color scheme matching light-mode website (PMC/EPC)
        const isEpc = displayPlatform === 'EPC';
        const brandColor = isEpc ? '#6f42c1' : '#0366d6';
        const badgeBg = isEpc ? '#f5f0ff' : '#dbedff';
        const badgeBorder = isEpc ? 'rgba(111, 66, 193, 0.4)' : 'rgba(3, 102, 214, 0.4)';

        // Applied Role Badge styling
        const roleBadgeColor = '#0366d6';
        const roleBadgeBg = '#f1f8ff';
        const roleBadgeBorder = 'rgba(3, 102, 214, 0.2)';

        // Format dates
        const formattedDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });

        // Determine resume access link
        let downloadLink = filePath;
        if (filePath && !filePath.startsWith('http')) {
            // Local path fallback (point to the local backend port 8001 /resumes/view/)
            const cleanFileName = path.basename(filePath);
            downloadLink = `http://localhost:8001/api/resumes/view/${cleanFileName}`;
        }

        // Visually premium LIGHT (WHITE) MODE HTML template using fully-compatible TABLE layouts
        const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Job Application Received</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #f6f8fa;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    color: #24292e;
                }
                a {
                    color: #0366d6;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f6f8fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #24292e;">
            <div style="width: 100%; background-color: #f6f8fa; padding: 40px 0;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e1e4e8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                    
                    <!-- Header Banner -->
                    <div style="background-color: #fafbfc; padding: 30px; text-align: center; border-bottom: 1px solid #e1e4e8;">
                        <h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 1.5px; color: #24292e; text-transform: uppercase;">
                            MANO CAREERS
                        </h1>
                    </div>

                    <!-- Main Content Container -->
                    <div style="padding: 40px 30px;">
                        <div style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #24292e;">
                            Hello Admin,<br><br>
                            A new candidate has submitted their resume application on the website. Below are the application details:
                        </div>
                        
                        <!-- Table structure ensures perfect compatibility in all email clients (Gmail/Outlook/iOS) -->
                        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e1e4e8; border-radius: 8px; overflow: hidden;">
                            <tbody>
                                <tr>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 13px; font-weight: 600; color: #586069; width: 160px; vertical-align: middle;">
                                        Candidate Name
                                    </td>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 14px; font-weight: bold; color: #24292e; vertical-align: middle;">
                                        ${name}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 13px; font-weight: 600; color: #586069; width: 160px; vertical-align: middle;">
                                        Email Address
                                    </td>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 14px; font-weight: bold; color: ${email ? '#0366d6' : '#8b949e'}; vertical-align: middle;">
                                        ${email ? `<a href="mailto:${email}" style="color: #0366d6; text-decoration: none;">${email}</a>` : '<span style="font-weight: normal; color: #8b949e;">-</span>'}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 13px; font-weight: 600; color: #586069; width: 160px; vertical-align: middle;">
                                        Mobile Number
                                    </td>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 14px; font-weight: bold; color: #24292e; vertical-align: middle;">
                                        <a href="tel:${mobile}" style="color: #24292e; text-decoration: none;">${mobile}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 13px; font-weight: 600; color: #586069; width: 160px; vertical-align: middle;">
                                        Platform Division
                                    </td>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 14px; vertical-align: middle;">
                                        <span style="display: inline-block; padding: 3px 10px; font-size: 11px; font-weight: bold; border-radius: 4px; text-transform: uppercase; background-color: ${badgeBg}; border: 1px solid ${badgeBorder}; color: ${brandColor}; letter-spacing: 0.5px;">
                                            ${displayPlatform}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 13px; font-weight: 600; color: #586069; width: 160px; vertical-align: middle;">
                                        Applied Position
                                    </td>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 14px; vertical-align: middle;">
                                        <span style="display: inline-block; padding: 4px 10px; font-size: 12px; font-weight: bold; border-radius: 6px; background-color: ${roleBadgeBg}; border: 1px solid ${roleBadgeBorder}; color: ${roleBadgeColor};">
                                            ${role}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 13px; font-weight: 600; color: #586069; width: 160px; vertical-align: middle;">
                                        Date Applied
                                    </td>
                                    <td style="padding: 14px 16px; border-bottom: 1px solid #e1e4e8; font-size: 14px; color: #586069; vertical-align: middle;">
                                        ${formattedDate}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 14px 16px; font-size: 13px; font-weight: 600; color: #586069; width: 160px; vertical-align: middle;">
                                        Resume Attachment
                                    </td>
                                    <td style="padding: 14px 16px; font-size: 14px; font-weight: bold; color: #0366d6; vertical-align: middle; word-break: break-all;">
                                        <a href="${downloadLink}" target="_blank" style="color: #0366d6; text-decoration: none;">
                                            📂 ${fileName}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- CTA Button -->
                        <div style="text-align: center; margin: 35px 0 10px;">
                            <a href="http://localhost:5173/mano-admin-portal-dashboard-secure" style="display: inline-block; padding: 12px 24px; background-color: #2c974b; color: #ffffff !important; text-decoration: none; font-weight: bold; font-size: 14px; border-radius: 6px; border: 1px solid #2c974b;" target="_blank">
                                Open Admin Dashboard
                            </a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #fafbfc; padding: 25px 30px; text-align: center; font-size: 11px; color: #586069; border-top: 1px solid #e1e4e8; line-height: 1.5;">
                        This is an automated notification from the MANO Careers Portal.<br>
                        Please log in to the <a href="http://localhost:5173/mano-admin-portal-dashboard-secure" target="_blank" style="color: #0366d6; text-decoration: none;">Admin Portal</a> to manage this application.<br><br>
                        &copy; 2026 MANO. All rights reserved.
                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        // Configure attachment path (S3 url or absolute local filesystem path)
        const attachments = [];
        if (filePath) {
            attachments.push({
                filename: fileName,
                path: filePath.startsWith('http') ? filePath : path.join(process.cwd(), filePath)
            });
        }

        // Send to multiple emails if configured
        const targets = adminEmails.split(',').map(e => e.trim());
        for (const recipient of targets) {
            if (!recipient) continue;
            await transporter.sendMail({
                from: `"MANO Careers Portal" <${user}>`,
                to: recipient,
                subject: `[New Candidate Application] - ${name} (${role})`,
                html: htmlTemplate,
                attachments
            });
        }
        
        console.log(`✅ Mailer: Application email sent successfully to ${targets.join(', ')}`);
    } catch (emailErr) {
        console.error('❌ Mailer: Failed to send job application email:', emailErr);
    }
};
