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

$result = $conn->query("SELECT id, review, rating, user_id FROM reviews ORDER BY id DESC");

while ($row = $result->fetch_assoc()) {
    $stars = "";
    $fullStars = floor($row['rating']);
    $halfStar = ($row['rating'] - $fullStars) >= 0.5 ? true : false;

    for ($i = 0; $i < $fullStars; $i++) {
        $stars .= "⭐";  // Full star
    }
    if ($halfStar) {
        $stars .= "⭐️";  // Half star
    }

    echo "<div class='review'>
            <p>{$row['review']}</p>
            <p class='stars'>$stars</p>";

    // Show delete button only if the user owns this review
    if ($_SESSION['user_id'] == $row['user_id']) {
        echo "<button class='delete-btn' onclick='deleteReview({$row['id']})'>Delete</button>";
    }

    echo "</div>";
}

$conn->close();
?>

