import scapy.all as scapy
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

TARGET_IP = "192.168.1.1/24"
AUTHORIZED_DEVICES = {"00:11:22:33:44:55", "AA:BB:CC:DD:EE:FF"}
EMAIL_ADDRESS = "kobdan2024@gmail.com"
EMAIL_PASSWORD = "Qwerty1234!"
ALERT_RECIPIENT = "kobdan2024@gmail.com"

def scan_network():
    arp_request = scapy.ARP(pdst=TARGET_IP)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast / arp_request
    answered_list = scapy.srp(arp_request_broadcast, timeout=1, verbose=False)[0]

    detected_devices = []
    for element in answered_list:
        detected_devices.append(element[1].hwsrc)
    
    return detected_devices

def check_for_unauthorized_devices(detected_devices):
    unauthorized_devices = set(detected_devices) - AUTHORIZED_DEVICES
    return unauthorized_devices

def send_alert(unauthorized_devices):
    subject = "Unauthorized Device Alert"
    body = "The following unauthorized devices were detected:\n" + "\n".join(unauthorized_devices)

    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = ALERT_RECIPIENT
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
            print("Alert sent successfully!")
    except Exception as e:
        print(f"Failed to send alert: {e}")

def main():
    detected_devices = scan_network()
    unauthorized_devices = check_for_unauthorized_devices(detected_devices)

    if unauthorized_devices:
        print("Unauthorized devices detected!")
        print(unauthorized_devices)
        send_alert(unauthorized_devices)
    else:
        print("No unauthorized devices detected.")

if __name__ == "__main__":
    main()