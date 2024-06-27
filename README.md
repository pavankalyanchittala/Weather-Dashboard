# Weather-Dashboard

## Project Structure
```
weather_dashboard/
├── app.py
├── templates/
│   ├── index.html
│   ├── weather.html
├── static/
│   ├── style.css
│   ├── main.js
├── requirements.txt
├── README.md
```
## Step-by-Step Process
### Set Up Your Environment
1.**Create Project Directory:**
```
sh
mkdir weather_dashboard
cd weather_dashboard
```
2.**Create Virtual Environment:**
```
sh
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3.**Install Required Packages:**
```
sh
pip install flask requests
```
4.**Create requirements.txt:**
```
sh
pip freeze > requirements.txt
```

## Explanation

## Backend (Flask App)

### Setup and Configuration:
- The Flask app is initialized with `Flask(__name__)`.
- An API key for the weather service is stored in the variable `API_KEY`.

### Routes:
#### Index Route (`/`):
- Renders the main HTML page (`index.html`), which contains the user interface for the weather dashboard.

#### Weather Route (`/weather`):
- Handles POST requests to fetch weather data for a specified city.
- Retrieves the city name from the form data (`request.form['city']`).

### Fetching Weather Data:
- Constructs URLs for the current weather and forecast data using the city name and API key.
- Sends GET requests to these URLs to fetch the data.
- Parses the responses into JSON format.

### Processing Data:
- Checks for errors in the API responses.
- If no errors are found, extracts relevant weather information, including:
  - Temperature
  - Humidity
  - Wind speed
  - Weather description
  - UV index
  - Air quality
  - Sunrise
  - Sunset
  - 7-day forecast
- Organizes this data into a dictionary (`weather_data`).

### Returning Data:
- Returns the processed weather data as a JSON response using `jsonify`.

## Frontend (HTML and JavaScript)

### HTML Structure:
- The main HTML file (`index.html`) contains placeholders for displaying weather information.
- Includes a form for entering the city name and a button to fetch the weather.

### JavaScript:
- Handles form submission and sends an AJAX request to the `/weather` route.
- Processes the JSON response and updates the HTML elements with the fetched weather data.
- Displays an error message if the city is not found.

## Deployment
- The app is deployed using Netlify.
