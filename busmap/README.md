[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=12970621)
# PROG 5010 - Exercise 9 

##  API and Array Functions Review
 
### Instructions:  

- Open this repository in the default GitHub Codespace as shown in class.
- Add the Live Server extension to VS Code as shown in class.
- When satisfied that you have completed all the required changes to the repository folder, **commit & push** the entire folder's contents up to GitHub as shown in class. 
- You must ensure that your solution has been pushed to GitHub in order to get credit for the exercise. 

### Tasks

#### Summary

You will create a solution that will do the following

- Display a map in the browser. (You’ll be given starter files for this)

- Fetch real-time transit data information data from a publicly available API. (Bus data)

- Filter the raw data to a subset with specific criteria.

- **Convert the filtered API data into GeoJSON format**.

- Plot markers on the map to display the current position of vehicles.

- Add functionality that will cause the map to auto refresh after a certain interval of time.

#### Display a geographical map.

For this assignment you will be working with the [**Leaflet.js**](https://leafletjs.com/) mapping library. Leaflet is a leading open-source JavaScript library for mobile-friendly interactive maps. It provides an easy-to-use programming API for customizing and building various types of maps.

Valuable Resources:

[https://leafletjs.com/reference.html](https://leafletjs.com/reference.html)  (Version currently used - 1.9.4)

[https://maptimeboston.github.io/leaflet-intro/](https://maptimeboston.github.io/leaflet-intro/)  (Read this to get an intro to how Leaflet works!)

[https://www.youtube.com/watch?v=6QFkgOeQc0c&list=PLDmvslp_VR0xjh7wGMNd_1kk0zUox6Sue](https://www.youtube.com/watch?v=6QFkgOeQc0c&list=PLDmvslp_VR0xjh7wGMNd_1kk0zUox6Sue)  (The first three videos are particularly relevant)

[https://www.youtube.com/playlist?list=PLOLaRvvlbZ19V-TbQUEOf_v3T_ssd-atd](https://www.youtube.com/playlist?list=PLOLaRvvlbZ19V-TbQUEOf_v3T_ssd-atd)  (YouTube - Leaflet.js Crash Course)

#### Fetch real-time transit data

##### API

For this exercise, you will use:

**Real-time bus data**

The real-time transit data that you can leverage for this exercise can be accessed via [Halifax Transit open data](https://www.halifax.ca/home/open-data/halifax-transit-open-data) Halifax Transit has launched the General Transit Feed Specification (GTFS) open data feed to developers as a beta release. This data is used by Google and other third-party developers to create apps for use by the public.

**API URL:** [https://prog2700.onrender.com/hrmbuses](https://prog2700.onrender.com/hrmbuses)

This API endpoint will return real-time data for all buses currently in service throughout HRM. Your application will need to fetch this data in its raw form and be able to filter the results according to the following criteria.

**Requirement: Filter the resulting data so that you keep buses on routes 1-10 only.**

#### GeoJSON

Leaflet supports and works well with the [GeoJSON](http://geojson.org/) data format. It is a format for encoding a variety of geographic data structures and is widely used in the digital cartography industry.

You can learn more about GeoJSON from these resources:

[https://macwright.org/2015/03/23/geojson-second-bite.html](https://macwright.org/2015/03/23/geojson-second-bite.html)

[http://geojson.io](http://geojson.io)

[https://www.youtube.com/watch?v=8RPfrhzRw2s](https://www.youtube.com/watch?v=8RPfrhzRw2s)

You are required to transform the raw data from your chosen API data into GeoJSON format so that they can be applied to the map for point marking. Focus on Feature arrays or Feature Collections (either will work) when building out your formatted data.

#### Plot Markers on the map using the GeoJSON data.

Once you have your newly transformed data in GeoJSON format. Apply this data to the provided map using the programming API for GeoJSON in Leaflet.

Valuable Resources:

[https://leafletjs.com/examples/geojson/](https://leafletjs.com/examples/geojson/)

[https://www.youtube.com/watch?v=21Z0NW5euAM](https://www.youtube.com/watch?v=21Z0NW5euAM)

#### Apply code to auto refresh the map.

Apply the following functionality to your app which will resemble how real-time transit tracking software behaves.

- After a certain period of time re-fetch the updated API data and perform the transformation as necessary.

- Refresh the map by re-rendering the markers in their new positions.

**Note: adding JavaScript to cause the entire browser page to reload is not an acceptable solution for this requirement.**

**Note: be careful with this requirement. You should never trigger a re-fetch of your data until the previous fetch has been completed and processed. Otherwise, you may cause unintended results in your application.**

#### Other requirements

1. **Custom Vehicle Icon** – Your starter map shows an example of the default marker icon for Leaflet. Update your map to use one of the provided vehicle icons as markers or choose one of your own. (Plane icons if you chose flight data and bus icons if you choose bus data)

2. **Rotate Vehicle Icon** – Your API data will include data relevant to the current direction the vehicle is moving relative to True North (0 degrees). Using the provided Leaflet Plugin (leaflet-rotatedmarker.js) Resource: [https://github.com/bbecquet/Leaflet.RotatedMarker](https://github.com/bbecquet/Leaflet.RotatedMarker) rotate each aircraft marker to indicate the direction it is travelling.

3. **Marker popups** – Leaflet provides the ability to load in data about each marker by leveraging a click event. You could fill this popup with some of the additional data provided by the API and stored as a Property in your GeoJSON feature objects.

#### Code Requirements

1. **Your code must not contain loop structures of any kind.** Select from the available array functions that we’ve been exploring in order to accomplish the goals of the assignment.

#### Extra Notes:

In order to get **IntelliSense** to work for the required libraries in VS Code do the following at the terminal in VS Code: 

- Run: *npm init*
 
- Then: *npm install --save @types/geojson*

- Then: *npm install --save @types/leaflet@1.9.4*
 
- Then: *npm install --save @types/leaflet-rotatedmarker*

#### Marking Scheme  

Final Grade | Requirement  
:---: | ---  
|**10/10**  | Exercise is correctly done (for the most part) and is completed within the allotted in-class time.  
|**8/10**  | Exercise is correctly done (for the most part) and is completed within a 12-hour grace period beginning immediately following the end of in-class time.  
|**6/10**  | Exercise is correctly done (for the most part) and is completed and submitted after the 12-hour grace period has elapsed.   
|**0/10**  | Exercise is not submitted or is largely incomplete.  
  
> Written with [StackEdit](https://stackedit.io/).
