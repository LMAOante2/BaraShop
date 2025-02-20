<?php
session_start();

$host = "sql7.freesqldatabase.com"; // Replace with your actual host
$username = "sql7763764"; // Your database username
$password = "S1XC6FlnD9"; // Your database password
$database = "sql7763764"; // Your database name

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$review_id = $_POST['review_id'];
$user_id = $_SESSION['user_id']; // Get current user's ID

// Ensure the user can only delete their own reviews
$stmt = $conn->prepare("DELETE FROM reviews WHERE id = ? AND user_id = ?");
$stmt->bind_param("is", $review_id, $user_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Review deleted successfully!";
} else {
    echo "You can only delete your own reviews.";
}

$stmt->close();
$conn->close();
?>
