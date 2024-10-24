import datetime

import matplotlib.dates as mdates
import matplotlib.pyplot as plt

# Set up the plot style
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['font.family'] = 'serif'
plt.rcParams['font.size'] = 12

# Data loading (assuming this part remains the same)
times = []
requests = []
with open('requests-per-second.txt', 'r') as f:
    for line in f:
        parts = line.split()
        requests.append(int(parts[0]))
        times.append(datetime.datetime.strptime(' '.join(parts[1:4]), '%b %d %H:%M:%S'))

# Create the figure and axis
fig, ax = plt.subplots(figsize=(14, 10))

# Plot the data with area fill
ax.plot(times, requests, color='#1f77b4', linewidth=2)
ax.fill_between(times, requests, alpha=0.2, color='#1f77b4')

# Set the title and labels
ax.set_title('Onetimesecret.com DDoS - Day 4', fontsize=20, fontweight='bold', pad=20)
ax.set_xlabel('Time', fontsize=14, labelpad=10)
ax.set_ylabel('Number of Requests', fontsize=14, labelpad=10)

# Format x-axis with less frequent time labels
ax.xaxis.set_major_formatter(mdates.DateFormatter('%H:%M'))
ax.xaxis.set_major_locator(mdates.MinuteLocator(interval=30))  # Show a label half hour
ax.xaxis.set_minor_locator(mdates.MinuteLocator(interval=15))  # Add minor ticks every 15 minutes
fig.autofmt_xdate(rotation=45, ha='right')

# Customize grid
ax.grid(True, linestyle='--', alpha=0.7, color='#cccccc')
ax.grid(which='minor', linestyle=':', alpha=0.4, color='#dddddd')

# Set background color
ax.set_facecolor('#f5f5f5')

# Adjust layout
plt.tight_layout()
plt.subplots_adjust(bottom=0.30)  # Increase bottom margin

# Add description and metadata
description = ("This chart shows the number of web requests per second over several hours.\n"
               "Data collected on September 12, 2024.")
plt.figtext(0.05, 0.22, description, fontsize=10, ha='left')

current_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
plt.figtext(0.95, 0.22, f"Generated on: {current_date}", fontsize=10, ha='right')

libs_used = "Libraries: matplotlib, datetime"
attribution = "chart.py written by Claude 3.5 Sonnet"
plt.figtext(0.05, 0.17, libs_used, fontsize=8, ha='left', fontstyle='italic')
plt.figtext(0.05, 0.14, attribution, fontsize=8, ha='left', fontstyle='italic', color='blue')

url = "https://blog.onetimesecret.com/"
plt.figtext(0.05, 0.11, f"Updates on our blog: {url}", fontsize=8, ha='left')

# Save the figure
plt.savefig('requests_chart_professional.png', dpi=300, bbox_inches='tight')

print("Professional chart saved as requests_chart_professional.png")
