<?php
include_once 'connect.php';
if (isset($_POST['type'])) {
    echo $_POST["type"];

    $type = $_POST["type"] == "sp" ? 0 : 1;
    $sql = "INSERT INTO `scores`(`name`,`score`,`type`) VALUES('$_POST[name]', '$_POST[score]', '$type');";
    if (!$conn->query($sql))
        echo mysqli_error($conn);
    else
        echo "Success";
} else if (isset($_GET['type'])) {
    $type = $_GET["type"] == "sp" ? 0 : 1;
    $sql = "SELECT `name`, `score` FROM `scores` WHERE `type`='$type' ORDER BY score DESC LIMIT 10";
    $rows = [];
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
    }

    echo json_encode($rows);
}

mysqli_close($conn);
?>