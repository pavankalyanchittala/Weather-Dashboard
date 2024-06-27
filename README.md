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
