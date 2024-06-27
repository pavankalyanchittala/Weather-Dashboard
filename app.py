from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = 'ce6493fdcd0f4813a96193916242606'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def weather():
    city = request.form['city']
    current_url = f'http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}&aqi=yes'
    forecast_url = f'http://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={city}&days=7&aqi=no&alerts=no'
    
    current_response = requests.get(current_url)
    forecast_response = requests.get(forecast_url)
    
    current_data = current_response.json()
    forecast_data = forecast_response.json()

    if 'error' not in current_data and 'error' not in forecast_data:
        weather_data = {
            'city': current_data['location']['name'],
            'temperature': current_data['current']['temp_c'],
            'humidity': current_data['current']['humidity'],
            'wind_speed': current_data['current']['wind_kph'],
            'description': current_data['current']['condition']['text'],
            'icon': current_data['current']['condition']['icon'],
            'uv_index': current_data['current']['uv'],
            'air_quality': current_data['current']['air_quality'],
            'sunrise': forecast_data['forecast']['forecastday'][0]['astro']['sunrise'],
            'sunset': forecast_data['forecast']['forecastday'][0]['astro']['sunset'],
            'forecast': forecast_data['forecast']['forecastday']
        }
    else:
        weather_data = None

    return jsonify(weather=weather_data)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
