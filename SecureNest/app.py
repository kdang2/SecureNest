from flask import Flask, jsonify, render_template, request, redirect, url_for

# Mock data for a simple login system (you can replace this with an actual database)
valid_username = "admin"
valid_password = "password"

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    # Get the form data
    username = request.form['username']
    password = request.form['password']
    
    # Check credentials (simple mock check)
    if username == valid_username and password == valid_password:
        return redirect(url_for('dashboard'))
    else:
        return "Login Failed! Invalid username or password.", 401

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/scan_wifi')
def scan_wifi():

    # Mock Wi-Fi networks data
    wifi_networks = [
        {'ssid': 'HomeNetwork', 'signal': '-40 dBm'},
        {'ssid': 'CoffeeShopWifi', 'signal': '-60 dBm'},
        {'ssid': 'PublicWifi', 'signal': '-80 dBm'},
    ]
    
    return jsonify(networks=wifi_networks)

if __name__ == '__main__':
    app.run(debug=True)
