import smtplib
from email.mime.text import MIMEText

def send_signup_email(email: str):
    sender = "your_email@example.com"
    receiver = email
    subject = "Welcome to Resume Doctor!"
    body = "Thanks for signing up. We're excited to have you."

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = receiver

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
            smtp.starttls()
            smtp.login(sender, "your-app-password")
            smtp.sendmail(sender, receiver, msg.as_string())
    except Exception as e:
        print("Email send failed:", e)
