<?php
session_start(); // Start session to track users
$host = "sql7.freesqldatabase.com"; // Replace with your actual host
$username = "sql7763764"; // Your database username
$password = "S1XC6FlnD9"; // Your database password
$database = "sql7763764"; // Your database name

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Assign a unique user ID (Normally, this would be from a login system)
if (!isset($_SESSION['user_id'])) {
    $_SESSION['user_id'] = uniqid(); // Generates a unique user ID
}

$review = $_POST['review'];
$rating = $_POST['rating'];
$user_id = $_SESSION['user_id']; // Get the current user's ID

$stmt = $conn->prepare("INSERT INTO reviews (review, rating, user_id) VALUES (?, ?, ?)");
$stmt->bind_param("sds", $review, $rating, $user_id);
$stmt->execute();

echo "Review saved successfully!";

$stmt->close();
$conn->close();
?>

