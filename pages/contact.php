<?php

// include "config.php";

// // Check if form is submitted
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     // Get form data
//     $name = $_POST['name'];
//     $email = $_POST['email'];
//     $subject = $_POST['subject'];
//     $message = $_POST['message'];

//     // Insert into database
//     $sql = "INSERT INTO contacts (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";

//     if ($conn->query($sql) === TRUE) {
//         echo "Message sent successfully!";
//     } else {
//         echo "Error: " . $sql . "<br>" . $conn->error;
//     }
// }

// // Close connection
// $conn->close();





// include "config.php"; // Include your database connection


// // Check if form is submitted
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     // Get form data and sanitize inputs
//     $name = mysqli_real_escape_string($conn, trim($_POST['name']));
//     $email = mysqli_real_escape_string($conn, trim($_POST['email']));
//     $subject = mysqli_real_escape_string($conn, trim($_POST['subject']));
//     $message = mysqli_real_escape_string($conn, trim($_POST['message']));
// }
//     // Validate email format
//     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//         // Return a JSON error if email is invalid
//         echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
//         exit;
//     }

//     // Prepare the SQL query using prepared statements to prevent SQL injection
//     $stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
//     $stmt->bind_param("ssss", $name, $email, $subject, $message);

//     // Execute the query
// if ($stmt->execute()) {

//     echo json_encode([
//         "status" => "success",
//         "message" => "Message sent successfully!"
//     ]);

// } else {

//     echo json_encode([
//         "status" => "error",
//         "message" => "Database error: " . $stmt->error
//     ]);
// }





/**
 * Contact Form API
 *
 * Receives contact form data and stores it
 * securely in the MySQL database.
 */

/* =====================================================
   1. RESPONSE SETTINGS
===================================================== */

// Tell the browser that this API returns JSON.
header(
    "Content-Type: application/json; charset=UTF-8"
);

// Prevent browsers from caching API responses.
header(
    "Cache-Control: no-store, no-cache, must-revalidate"
);


/* =====================================================
   2. ALLOW ONLY POST REQUESTS
===================================================== */

// Contact data should only be submitted using POST.
if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed. Use POST."
    ]);

    exit;
}


/* =====================================================
   3. LOAD DATABASE CONNECTION
===================================================== */

require_once __DIR__ . "/config.php";


/* =====================================================
   4. GET AND CLEAN FORM DATA
===================================================== */

/**
 * The null coalescing operator (??) prevents
 * "Undefined array key" warnings.
 */

$name = trim(
    $_POST["name"] ?? ""
);

$email = trim(
    $_POST["email"] ?? ""
);

$subject = trim(
    $_POST["subject"] ?? ""
);

$message = trim(
    $_POST["message"] ?? ""
);


/* =====================================================
   5. VALIDATE REQUIRED FIELDS
===================================================== */

if (
    $name === "" ||
    $email === "" ||
    $subject === "" ||
    $message === ""
) {

    http_response_code(422);

    echo json_encode([
        "status" => "error",
        "message" => "All fields are required."
    ]);

    exit;
}


/* =====================================================
   6. VALIDATE FIELD LENGTHS
===================================================== */

/**
 * These limits should match the database columns.
 */

if (mb_strlen($name) > 255) {

    http_response_code(422);

    echo json_encode([
        "status" => "error",
        "message" => "Name is too long."
    ]);

    exit;
}

if (mb_strlen($email) > 255) {

    http_response_code(422);

    echo json_encode([
        "status" => "error",
        "message" => "Email is too long."
    ]);

    exit;
}

if (mb_strlen($subject) > 255) {

    http_response_code(422);

    echo json_encode([
        "status" => "error",
        "message" => "Subject is too long."
    ]);

    exit;
}


/* =====================================================
   7. VALIDATE EMAIL
===================================================== */

if (
    !filter_var(
        $email,
        FILTER_VALIDATE_EMAIL
    )
) {

    http_response_code(422);

    echo json_encode([
        "status" => "error",
        "message" => "Please enter a valid email address."
    ]);

    exit;
}


/* =====================================================
   8. PREPARE SECURE SQL QUERY
===================================================== */

/**
 * Prepared statements protect against SQL Injection.
 *
 * Do not put user input directly inside SQL queries.
 */

$sql = "
    INSERT INTO contacts
    (
        name,
        email,
        subject,
        message
    )
    VALUES
    (
        ?,
        ?,
        ?,
        ?
    )
";

$stmt = $conn->prepare($sql);


/* =====================================================
   9. CHECK PREPARE ERROR
===================================================== */

if ($stmt === false) {

    // Save technical details in the server log.
    error_log(
        "Contact form prepare error: " .
        $conn->error
    );

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => "Unable to process your request."
    ]);

    $conn->close();

    exit;
}


/* =====================================================
   10. BIND FORM VALUES
===================================================== */

/**
 * "ssss" means:
 *
 * s = string
 * s = string
 * s = string
 * s = string
 */

$stmt->bind_param(
    "ssss",
    $name,
    $email,
    $subject,
    $message
);


/* =====================================================
   11. EXECUTE DATABASE QUERY
===================================================== */

if (!$stmt->execute()) {

    // Log the real error but do not expose it publicly.
    error_log(
        "Contact form insert error: " .
        $stmt->error
    );

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => "Something went wrong. Please try again."
    ]);

    $stmt->close();

    $conn->close();

    exit;
}


/* =====================================================
   12. SUCCESS RESPONSE
===================================================== */

http_response_code(201);

echo json_encode([
    "status" => "success",
    "message" => "Your message was sent successfully."
]);


/* =====================================================
   13. CLOSE DATABASE RESOURCES
===================================================== */

$stmt->close();

$conn->close();

exit;
















// // Check if form data is received
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $name = trim($_POST["name"]);
//     $email = trim($_POST["email"]);
//     $subject = trim($_POST["subject"]);
//     $message = trim($_POST["message"]);

//     // Validate inputs
//     if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
//         die("Invalid email format.");
//     }

//     if (empty($name) || empty($subject) || empty($message)) {
//         die("All fields are required.");
//     }

//     // Prepare SQL query
//     $stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
//     $stmt->bind_param("ssss", $name, $email, $subject, $message);

//     // Execute query and check if successful
//     if ($stmt->execute()) {
//         echo "Message sent successfully!";
//     } else {
//         echo "Error: " . $stmt->error;
//     }

//     // Close statement and connection
//     $stmt->close();
//     $conn->close();
// } else {
//     echo "Invalid request.";
// }
?>