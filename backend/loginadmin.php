<?php
// loginadmin.php - API login admin

require_once 'koneksi.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Hanya izinkan POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Metode tidak diizinkan. Gunakan POST.'
    ]);
    exit;
}

// Ambil input
$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');

// Validasi sederhana
if ($username === '' || $password === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Username dan password wajib diisi.'
    ]);
    exit;
}

// Cek koneksi
if (!isset($koneksi) || mysqli_connect_errno()) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Koneksi database gagal',
        'error'   => mysqli_connect_error()
    ]);
    exit;
}

// Ambil user dari tabel admin
// (sesuaikan nama tabel & kolom, misal: admin(username, password, id))
$stmt = mysqli_prepare($koneksi, "SELECT id, username, password FROM admin WHERE username = ? LIMIT 1");
mysqli_stmt_bind_param($stmt, 's', $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    // CATATAN:
    // - Kalau password di DB disimpan PLAIN TEXT -> pakai perbandingan biasa
    // - Kalau sudah di-hash -> ganti dengan password_verify()

    if ($row['password'] === $password) {
        // Set session (kalau nanti mau dipakai di pageadmin.php)
        session_start();
        $_SESSION['admin_id'] = $row['id'];
        $_SESSION['admin_username'] = $row['username'];

        echo json_encode([
            'success' => true,
            'message' => 'Login berhasil',
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Password salah.'
        ]);
    }
} else {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Username tidak ditemukan.'
    ]);
}

mysqli_stmt_close($stmt);
