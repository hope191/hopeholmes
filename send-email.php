<?php
/* ============================================
   HOPE HOLMES - SEND EMAIL SCRIPT
   All form details will be sent to this email
   ============================================ */

// ============================================
// YOUR EMAIL ADDRESS - All form data goes here
// ============================================
$to_email = 'info.hopeholmes.io@gmail.com';  // <-- UPDATED

// ===== GET FORM DATA =====
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// ===== VALIDATION =====
$errors = array();

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if (empty($subject)) {
    $errors[] = 'Subject is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// If there are errors, return them
if (!empty($errors)) {
    echo json_encode(array(
        'success' => false,
        'errors' => $errors
    ));
    exit;
}

// ===== PREPARE EMAIL =====
$email_subject = 'New Contact Form Message: ' . $subject;

$email_body = "You have received a new message from your website contact form.\n\n";
$email_body .= "============================================\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Phone: " . ($phone ? $phone : 'Not provided') . "\n";
$email_body .= "Subject: " . $subject . "\n";
$email_body .= "============================================\n\n";
$email_body .= "Message:\n" . $message . "\n\n";
$email_body .= "============================================\n";
$email_body .= "This message was sent from your website contact form.\n";
$email_body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_body .= "Date: " . date('F j, Y, g:i a') . "\n";

// ===== EMAIL HEADERS =====
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ===== SEND EMAIL =====
$mail_sent = mail($to_email, $email_subject, $email_body, $headers);

// ===== RESPONSE =====
if ($mail_sent) {
    echo json_encode(array(
        'success' => true,
        'message' => 'Email sent successfully!'
    ));
} else {
    echo json_encode(array(
        'success' => false,
        'errors' => array('Failed to send email. Please try again later.')
    ));
}
?>