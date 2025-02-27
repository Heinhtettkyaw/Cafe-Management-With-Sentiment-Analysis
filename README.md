# Cafe Management System

This project is a **Cafe Management System** built using **Spring Boot** for the backend and **React.js** for the frontend. The system allows admins and customers to interact with the cafe's operations, including managing orders, feedback, and visualizing data with charts.

### Features

1. **User Authentication**:
    - User login and registration using **JWT authentication**.
    - Users can manage their profiles and change passwords.

2. **Admin Features**:
    - **Manage Menu Items**: Admins can add, update, or delete menu items.
    - **Manage Orders**: Admins can view orders, update their status, and track sales.
    - **Order Analysis**: Admins can view the best-selling products in a pie chart, as well as order statuses like "Completed", "Pending", etc.
    - **View All Feedback**: Admins can view feedback from users.
    - **Sentiment Analysis**: Admins can view the percentage of positive and negative feedback in Pie Chart.
    - **Best Selling Products**: Admin can review e top-selling items in the cafe.

3. **Customer Features**:
    - **Browse Menu**: Customers can browse available menu items.
    - **Place Orders**: Customers can place orders with multiple items.
    - **Submit Feedback**: Customers can leave feedback about the products and services.
    - **Order History**: Customers can view their past orders.

4. **Sentiment Analysis**:
    - Customers' feedback is analyzed for sentiment (Positive/Negative) and stored in the database.

5. **WhiteMode/DarkMode**:
    - The UI supports **Light Mode** and **Dark Mode**, allowing users to toggle between the two themes for better user experience.

6. **Chart Visualizations**:
    - **Feedback Sentiment** is visualized in a **pie chart** to show the percentage of positive and negative feedback.
    - **Best-Selling Products** is displayed in a **pie chart** to visualize the top-selling items in the cafe.

---

### Tech Stack

- **Backend**: 
    - **Spring Boot** (Java)
    - **JWT Authentication**
    - **MySQL Database**
    - **REST APIs**
  
- **Frontend**:
    - **React.js**
    - **TailwindCSS** (for responsive design)
    - **Chart.js** (for visualizations)
    - **React Router** (for navigation)
    - **Axios** (for making HTTP requests)
      
- **Python (Sentiment Analysis)**:
    - **Flask** (for the sentiment analysis API)
    - **scikit-learn**, **pandas**, **numpy** (for model processing)
    - **pickle** (for loading the trained model)

---

### Setup Instructions

#### Backend Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-repo/cafe-management.git
    ```

2. **Install Dependencies**:
    Make sure you have **Maven** installed to manage dependencies. Navigate to the backend folder and run:
    ```bash
    mvn install
    ```

3. **Run the Spring Boot Application**:
    From the backend directory, run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```
    This will start the backend server on **`localhost:8081`**.

#### Frontend Setup

1. **Clone the Repository**:
    If you haven't already, clone the frontend repository (if separate) and navigate to the frontend directory.

2. **Install Dependencies**:
    Ensure you have **Node.js** and **npm** installed. Then run:
    ```bash
    npm install
    ```

3. **Run the React Application**:
    To start the frontend, run:
    ```bash
    npm start
    ```
    This will start the frontend server on **`localhost:3000`**.

4. **Configure CORS**:
    If you're running the frontend and backend on different ports (i.e., `3000` for React and `8081` for Spring Boot), ensure that **CORS** is properly configured to allow communication between the frontend and backend.

---

### Python Setup (Sentiment Analysis)

For the **Sentiment Analysis** feature, we use a **Python-based model** to process and analyze customer feedback. This module is powered by **Flask** and uses libraries like **scikit-learn** and **pandas** for processing.

#### 1. **Install Python Dependencies**

To set up the Python environment for sentiment analysis, follow these steps:

1. **Create a Python Virtual Environment** (optional but recommended):
    ```bash
    python -m venv venv
    ```

2. **Activate the Virtual Environment**:
    - On Windows:
      ```bash
      venv\Scripts\activate
      ```
    - On macOS/Linux:
      ```bash
      source venv/bin/activate
      ```

3. **Install Python Dependencies**:
    You will need **Flask**, **scikit-learn**, **pandas**, and **numpy** for running the sentiment analysis model. Create a `requirements.txt` file with the following content:

    ```txt
    Flask==2.2.2
    flask-cors==3.1.1
    scikit-learn==1.0.2
    pandas==1.3.3
    numpy==1.21.2
    pickle5==0.0.11
    ```

    Then, install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run the Sentiment Analysis Flask API**:
    Navigate to the folder containing your **Flask** API (`sentiment_analysis.py`), and run:
    ```bash
    python sentiment_analysis.py
    ```
    This will start the sentiment analysis API server on **`localhost:5000`**.

---


### Features in Detail

#### **WhiteMode/DarkMode**:

The UI supports both **Light Mode** and **Dark Mode**. Users can toggle between the two modes for a personalized experience. The mode preference is stored in local storage, so it persists across page reloads.

1. **Toggling Themes**:
    - The default theme is **Light Mode**.
    - Users can toggle between **Light Mode** and **Dark Mode** using a button in the header.

2. **Automatic Theme Switching**:
    - The application automatically detects and applies the stored theme from local storage on page load.

#### **Sentiment Analysis**:

When a customer submits feedback, the **Sentiment Analysis** feature is triggered. The feedback message is sent to the backend, where it is processed and classified as either **Positive** or **Negative**. This sentiment is stored in the database along with the feedback message.

- The feedback page includes a **pie chart** showing the sentiment distribution (Positive vs. Negative feedback).
  
#### **Order Analysis**:

Admins can view **best-selling products** in a **pie chart**, which visually shows the distribution of orders for each product. This chart is updated dynamically as new orders are placed.

- Admins can also view the **order status** (e.g., **Pending**, **Completed**, **Cancelled**) in the **Order Dashboard**.

---

### API Documentation

#### **1. User Authentication**:

- **POST** `/auth/login`: User login.
- **POST** `/auth/register`: User registration.
  
#### **2. Feedback**:

- **GET** `/api/feedback/all`: Fetch all feedback.
- **POST** `/api/feedback/submit`: Submit feedback (with sentiment analysis).

#### **3. Orders**:

- **GET** `/api/orders/all`: Fetch all orders.
- **GET** `/api/orders/best-selling-products`: Fetch the best-selling products.

#### **4. Sentiment Analysis (Python API)**:

- **POST** `/predict`: Sentiment analysis for feedback message.
---

### Testing

1. **Backend Tests**:
    - You can test the **REST APIs** using **Postman** or **cURL**.

2. **Frontend Tests**:
    - Use the browser to test the frontend. Ensure that your frontend is correctly fetching data from the backend and that charts are displaying correctly.

---

### Conclusion

This project provides a fully functional **Cafe Management System** with user authentication, order management, feedback sentiment analysis, and various visualizations. The **WhiteMode/DarkMode** feature enhances the user experience by allowing the user to toggle between light and dark themes.

Feel free to contribute or modify this project as needed!


