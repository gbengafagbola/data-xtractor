## Web-based Driver's License Data Extraction
This web application enables users to extract data from a driver's license using their device's webcam. Upon successful extraction, the application displays the extracted data in an accessible and user-friendly format. The extracted information includes the user's full name, address, and driver's license issuance and expiration dates. The data is extracted individually, allowing for seamless integration with APIs for further processing.

### Architecture - Algorithm
- Caputre Image --> process captured image for accurate reading --> pass processed image to Tesseract for OCR processing --> filter data into respective data field

### Features
- Webcam Data Extraction: Utilize your device's webcam to capture driver's license information.
- Individual Field Extraction: Extract user's full name, address, and DL issuance & expiration date separately.
- API Integration: Easily pass the extracted data to an API for future processing.
- User-Friendly Display: Present the extracted information in a clear and user-friendly format.
- Accessibility: Ensure the application is accessible to a wide range of users.
- Progress bar

### How to Use
- Access the Web Application: Open the web application in your browser.
- Grant Webcam Access: Allow the application to access your device's webcam.
- Capture Driver's License: Position your driver's license in front of the webcam and capture the image.
- Kindly Note on first iteration, the processed image that would deplict a much accurate reading would require a double click of the button
- Review Extracted Data: The application will extract the user's full name, address, and DL issuance & expiration date.

API Integration (Not Implemented): Use the extracted data and integrate it with APIs for additional processing.

### Technologies Used
- React: Front-end framework for building the user interface.
- WebRTC: Web Real-Time Communication for accessing the device's webcam.
- Tesseract.js: Optical Character Recognition (OCR) library for text extraction.
- Headless UI for modal implementation

### API Integration (Example): Demonstrates how the extracted data can be sent to an API.
Setup
Clone the Repository: git clone https://github.com/yourusername/driver-license-extraction.git
Install Dependencies: npm install | yarn 
Run the Application: npm start | yarn dev
Access the Application: Open http://localhost:3000 in your browser.

### Difficulty
- Regex extracting the right data type
- Research in other to process the image properly before data extraction is carried out

License
This project is licensed under the MIT License.




