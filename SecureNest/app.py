from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import subprocess

app = Flask(__name__)
app.secret_key = 'kobdan'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    # Simple user authentication
    if username == 'admin' and password == 'password':
        session['logged_in'] = True
        return redirect(url_for('dashboard'))
    else:
        return 'Invalid credentials', 401

@app.route('/dashboard')
def dashboard():
    if 'logged_in' in session and session['logged_in']:
        return render_template('dashboard.html')
    else:
        return redirect(url_for('home'))

@app.route('/scan_wifi', methods=['POST'])
def scan_wifi():
    if 'logged_in' in session and session['logged_in']:
        try:
            networks = ["WiFi_Network_1", "WiFi_Network_2", "WiFi_Network_3"]
            return jsonify(networks=networks)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return redirect(url_for('home'))

@app.route('/perform_action', methods=['POST'])
def perform_action():
    if 'logged_in' in session and session['logged_in']:
        try:
            result = "Action successfully performed."
            return jsonify(result=result)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return redirect(url_for('home'))

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)