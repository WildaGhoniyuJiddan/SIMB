<?php
// data.php - API untuk data tsunami (statistik + daftar kejadian)

// 1. Include koneksi database
require_once 'koneksi.php';

// 2. Header untuk JSON + (opsional) CORS
header('Content-Type: application/json; charset=utf-8');
// kalau React kamu jalan di origin berbeda, boleh aktifkan ini:
header('Access-Control-Allow-Origin: *');

// 3. Cek koneksi
if (!isset($koneksi) || mysqli_connect_errno()) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Koneksi database gagal',
        'error'   => mysqli_connect_error()
    ]);
    exit;
}

// -----------------------------
// 4. AMBIL DATA UNTUK CHART
// -----------------------------
$tahun_label = [];
$jumlah_data = [];

$sql_chart = "
    SELECT 
        YEAR(tanggal) AS tahun,
        COUNT(*) AS jumlah
    FROM data_tsunami
    WHERE YEAR(tanggal) > 0
    GROUP BY YEAR(tanggal)
    ORDER BY tahun ASC
";

if ($result_chart = mysqli_query($koneksi, $sql_chart)) {
    while ($row = mysqli_fetch_assoc($result_chart)) {
        $tahun_label[] = (int)$row['tahun'];
        $jumlah_data[] = (int)$row['jumlah'];
    }
    mysqli_free_result($result_chart);
}

// -----------------------------
// 5. AMBIL DAFTAR DATA TSUNAMI
// -----------------------------
$records = [];

$sql_table = "SELECT * FROM data_tsunami ORDER BY tanggal DESC";

if ($result_table = mysqli_query($koneksi, $sql_table)) {
    while ($row = mysqli_fetch_assoc($result_table)) {
        // opsional: rapikan format tanggal di sini, 
        // tapi biarkan raw dulu biar bebas diolah dari React
        $records[] = [
            'id'         => isset($row['id']) ? (int)$row['id'] : null,
            'tanggal'    => $row['tanggal'],
            'waktu'      => $row['waktu'],
            'lokasi'     => $row['lokasi'],
            'magnitudo'  => (float)$row['magnitudo'],
            'kedalaman'  => $row['kedalaman'],
            'dampak'     => $row['dampak']
        ];
    }
    mysqli_free_result($result_table);
}

// 6. Kirim response JSON ke frontend
echo json_encode([
    'success' => true,
    'message' => 'Data tsunami berhasil diambil',
    'chart'   => [
        'labels' => $tahun_label,   // contoh: [2004, 2006, 2010, ...]
        'counts' => $jumlah_data    // contoh: [3, 5, 2, ...]
    ],
    'records' => $records          // array daftar kejadian tsunami
], JSON_UNESCAPED_UNICODE);